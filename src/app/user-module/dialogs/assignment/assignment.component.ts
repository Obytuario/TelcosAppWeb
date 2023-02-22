import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, ElementRef, Inject,OnInit, ViewChild } from '@angular/core';
import { UserModuleService } from '../../user-module.service';
import { DataSource } from '@angular/cdk/collections';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { AdvanceUser } from '../../user-module.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { Observable, merge, BehaviorSubject,fromEvent } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { UnsubscribeOnDestroyAdapter } from '../../../shared/UnsubscribeOnDestroyAdapter';
import { DeleteAssignmentComponent } from '../delete-assignment/delete-assignment.component';

export interface User {
  name: string;
}

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class AssignmentComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  action: string;
  dialogTitle: string;
  liderSuperior: string;
  dataUserAssignment = [];
  assignmentForm: UntypedFormGroup;
  advanceTable: AdvanceUser;
  userAssignment = new UntypedFormControl();
  options: User[] = [{ name: '1030525189-Ariel Bejarano' }, { name: '1030525188-Roger Fonseca' }, { name: '1017543222-Andres Bocanegra' }];
  filteredOptions: Observable<User[]>;
  id: number;
  
  displayedColumns = [
    //'select',
    //'img',
    //'id',
    'numberDocument',
    'fName',   
    'rol',  
    'actions'
  ];
  exampleDatabase: UserModuleService | null;
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<AssignmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public httpClient: HttpClient,
    private snackBar: MatSnackBar,
    public userModuleService: UserModuleService,
    private fb: UntypedFormBuilder
  ) { 
    super();
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.liderSuperior='Carlos Contreras';
      this.dialogTitle =
        data.advanceTable.fName + ' ' + data.advanceTable.lName+' - '+data.advanceTable.rol;
      this.advanceTable = data.advanceTable;
      this.dataUserAssignment = data.advanceTable.userAssignment
      console.log(this.dataUserAssignment);
    } else {
      this.dialogTitle = 'Nueva jerarquia';
      this.advanceTable = new AdvanceUser({});
    }
    this.assignmentForm = this.createContactForm();
  }
 

  ngOnInit(): void {
    this.filteredOptions = this.userAssignment.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.options.slice()))
    );
        
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }
  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  formControl = new UntypedFormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
 
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  public confirmAdd(): void {
    // this.advanceTableService.addAdvanceTable(
    //   this.advanceTableForm.getRawValue()
    // );
  }
  public loadData() {
    this.exampleDatabase = new UserModuleService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }
 

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.advanceTable.id],
      email: [
        this.advanceTable.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ]
     
      
    });
  }
  fetchAssignment(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/adv-tbl-data.json');
    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };
    req.send();
  }
  onSort(event) {
    // event was triggered, start sort sequence
    setTimeout(() => {
      const rows = [this.dataUserAssignment];
      // this is only for demo purposes, normally
      // your server would return the result for
      // you and you would just set the rows prop
      const sort = event.sorts[0];
      rows.sort((a, b) => {
        return (
          a[sort.prop].localeCompare(b[sort.prop]) *
          (sort.dir === 'desc' ? -1 : 1)
        );
      });

      this.dataUserAssignment = rows;
    }, 1000);
  }

  deleteItem(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(DeleteAssignmentComponent, {
      data: row,
      direction: tempDirection
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
        this.showNotification(
          'snackbar-danger',
          'Delete Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }

}
export class ExampleDataSource extends DataSource<AdvanceUser> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: AdvanceUser[] = [];
  renderedData: AdvanceUser[] = [];
  constructor(
    public exampleDatabase: UserModuleService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<AdvanceUser[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page
    ];
    this.exampleDatabase.getAllAdvanceTables();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((advanceTable: AdvanceUser) => {
            const searchStr = (
              advanceTable.fName +
              advanceTable.lName +
              advanceTable.email +
              advanceTable.mobile +           
              advanceTable.bDate +
              advanceTable.address 
             
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: AdvanceUser[]): AdvanceUser[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'fName':
          [propertyA, propertyB] = [a.fName, b.fName];
          break;
        case 'lName':
          [propertyA, propertyB] = [a.lName, b.lName];
          break;
        case 'email':
          [propertyA, propertyB] = [a.email, b.email];
          break;
        case 'address':
          [propertyA, propertyB] = [a.address, b.address];
          break;
        case 'mobile':
          [propertyA, propertyB] = [a.mobile, b.mobile];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
