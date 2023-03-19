import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UserModuleService } from 'src/app/user-module/user-module.service';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { AdvanceUser } from 'src/app/user-module/user-module.model';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, fromEvent, Observable, merge, map } from 'rxjs';
import { FilterDates, OrderTracking } from '../../order-tracking.model';
import { OrderTrackingService } from '../../order-tracking.service';
// declare const M: any;
interface Gender {
  id: string;
  value: string;
}
@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.sass']
})
export class EquipmentComponent extends UnsubscribeOnDestroyAdapter
implements OnInit
{
displayedColumns = [  
  //'idOrden',
  'numeroOrden',
  'nombreTecnico',
  'numeroDocumento',
  'estadoOrden',
  'fechaOrdenTrabajo',
  'nombreCarpeta',  
  'actions'
];
exampleDatabase: OrderTrackingService | null;
dataSource: ExampleDataSource | null;
selection = new SelectionModel<OrderTracking>(true, []);
id: string;
orderTable: OrderTracking | null;

breadscrums = [
  {
    title: 'Gestion Usuarios',
    items: ['Home'],
    active: 'Equipo'
  }
];

constructor(
  public httpClient: HttpClient,
  public dialog: MatDialog,
  public userModuleService: UserModuleService,
  private snackBar: MatSnackBar
) {
  super();
}
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
@ViewChild('filter', { static: true }) filter: ElementRef;
@ViewChild(MatMenuTrigger)
contextMenu: MatMenuTrigger;
contextMenuPosition = { x: '0px', y: '0px' };
filterDates = new FilterDates({});
date = new UntypedFormControl(new Date());
ngOnInit() {
  this.loadData();
}
refresh() {
  this.loadData();
} 
addNew() {
  let tempDirection;
  if (localStorage.getItem('isRtl') === 'true') {
    tempDirection = 'rtl';
  } else {
    tempDirection = 'ltr';
  }
  // const dialogRef = this.dialog.open(AddEditComponent, {
  //   data: {
  //     advanceTable: this.advanceTable,
  //     action: 'add'
  //   },
  //   direction: tempDirection
  // });
  // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
  //   if (result === 1) {
  //     // After dialog is closed we're doing frontend updates
  //     // For add we're just pushing a new row inside DataService
  //     const userAdicionado = this.userModuleService.getDialogData();
  //     // si no lo encuentra lo adiciona     
  //     const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
  //       (x) => x.id === userAdicionado?.id
  //     );
  //     if(foundIndex === -1)
  //     {
  //       this.exampleDatabase.dataChange.value.unshift(
  //         this.userModuleService.getDialogData()
  //       );
  //     }
      
      
  //     this.refreshTable();
  //     this.showNotification(
  //       'snackbar-success',
  //       'Usuario Creado...!!!',
  //       'bottom',
  //       'center'
  //     );
  //   }
    
  // });
}
editCall(row) {
  console.log(row);
  this.id = row.id;
  let tempDirection;
  if (localStorage.getItem('isRtl') === 'true') {
    tempDirection = 'rtl';
  } else {
    tempDirection = 'ltr';
  }
  // const dialogRef = this.dialog.open(AddEditComponent, {
  //   data: {
  //     advanceTable: row,
  //     action: 'edit'
  //   },
  //   direction: tempDirection
  // });
  // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
  //   if (result === 1) {
  //     // When using an edit things are little different, firstly we find record inside DataService by id
  //     const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
  //       (x) => x.id === this.id
  //     );
  //     // Then you update that record using data from dialogData (values you enetered)
  //     this.exampleDatabase.dataChange.value[foundIndex] =   this.userModuleService.getDialogData();
  //     // And lastly refresh table
      
  //     this.refreshTable();
  //     this.showNotification(
  //       'black',
  //       'Usuario Modificado...!!!',
  //       'bottom',
  //       'center'
  //     );
  //   }
  // });
}
editJerarquia(row) {
  this.id = row.id;
  let tempDirection;
  if (localStorage.getItem('isRtl') === 'true') {
    tempDirection = 'rtl';
  } else {
    tempDirection = 'ltr';
  }
  // const dialogRef = this.dialog.open(AssignmentComponent, {
  //   data: {
  //     advanceTable: row,
  //     action: 'edit'
  //   },
  //   direction: tempDirection
  // });
  // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
  //   if (result === 1) {
  //     // When using an edit things are little different, firstly we find record inside DataService by id
  //     const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
  //       (x) => x.id === this.id
  //     );
  //     // Then you update that record using data from dialogData (values you enetered)
  //     // this.exampleDatabase.dataChange.value[foundIndex] =
  //     //   this.userModuleService.getDialogData();
  //     // And lastly refresh table
  //     this.refreshTable();
  //     this.showNotification(
  //       'black',
  //       'Edit Record Successfully...!!!',
  //       'bottom',
  //       'center'
  //     );
  //   }
  // });
}
deleteItem(row) {
  this.id = row.id;
  let tempDirection;
  if (localStorage.getItem('isRtl') === 'true') {
    tempDirection = 'rtl';
  } else {
    tempDirection = 'ltr';
  }
}
private refreshTable() {
  this.paginator._changePageSize(this.paginator.pageSize);
}
/** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.renderedData.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected()
    ? this.selection.clear()
    : this.dataSource.renderedData.forEach((row) =>
        this.selection.select(row)
      );
}
removeSelectedRows() {
  const totalSelect = this.selection.selected.length;
  this.selection.selected.forEach((item) => {
    const index: number = this.dataSource.renderedData.findIndex(
      (d) => d === item
    );
    // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
    this.exampleDatabase.dataChange.value.splice(index, 1);
    this.refreshTable();
    this.selection = new SelectionModel<OrderTracking>(true, []);
  });
  this.showNotification(
    'snackbar-danger',
    totalSelect + ' Record Delete Successfully...!!!',
    'bottom',
    'center'
  );
}
public loadData() {
  this.exampleDatabase = new OrderTrackingService(this.httpClient);
  this.dataSource = new ExampleDataSource(
    this.exampleDatabase,
    this.paginator,
    this.sort,
    this.filterDates
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
validationDataInit(event) {
  // get the value of the key pressed and make it lowercase
  const value = event.target.value.toLowerCase();  
  this.filterDates.fechaInicio = value;
  this.validateDataTime();
  
}
validationDataEnd(event) {
  // get the value of the key pressed and make it lowercase
  const value = event.target.value.toLowerCase(); 
  this.filterDates.fechaFin = value;
  this.validateDataTime();
  return this.filterDates.fechaFin;
}

validateDataTime(){
  const dateInit = new Date(Date.parse(this.filterDates.fechaInicio));
  const dateEnd = new Date(Date.parse(this.filterDates.fechaFin));
  if ( dateInit > dateEnd || dateEnd < dateInit){
    this.showNotification(
      'snackbar-info',
      ' Rango fechas Invalido, Valide nuevamente. ',
      'bottom',
      'center'
    );
    this.filterDates = new FilterDates({});
    return;
    } 
  const diferenciaData = dateInit.getMonth() - dateEnd.getMonth();
  //si es mayor a tres meses
  if(diferenciaData > 3){
    this.showNotification(
      'snackbar-info',
      'El rango de fechas supera los tres meses. ',
      'bottom',
      'center'
    );
    this.filterDates = new FilterDates({});
    return;
  }
  else{
    this.loadData();
  }
  
}
myFilter = (d: Date | null): boolean => {
  const day = (d || new Date()).getDay();
  // Prevent Saturday and Sunday from being selected.
  return day !== 0 && day !== 6;
};
showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, '', {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName
  });
}

// context menu
onContextMenu(event: MouseEvent, item: OrderTracking) {
  event.preventDefault();
  this.contextMenuPosition.x = event.clientX + 'px';
  this.contextMenuPosition.y = event.clientY + 'px';
  this.contextMenu.menuData = { item: item };
  this.contextMenu.menu.focusFirstItem('mouse');
  this.contextMenu.openMenu();
}
}
export class ExampleDataSource extends DataSource<OrderTracking> {
filterChange = new BehaviorSubject('');
get filter(): string {
  return this.filterChange.value;
}
set filter(filter: string) {
  this.filterChange.next(filter);
}
filteredData: OrderTracking[] = [];
renderedData: OrderTracking[] = [];
constructor(
  public exampleDatabase: OrderTrackingService,
  public paginator: MatPaginator,
  public _sort: MatSort,
  public filterDates: FilterDates
) {
  super();
  // Reset to the first page when the user changes the filter.
  //this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
}
/** Connect function called by the table to retrieve one stream containing the data to render. */
connect(): Observable<OrderTracking[]> {
  // Listen for any changes in the base data, sorting, filtering, or pagination
  const displayDataChanges = [
    this.exampleDatabase.dataChange,
    this._sort.sortChange,
    this.filterChange,
    this.paginator.page
  ];
  this.exampleDatabase.getAllOrderTables(this.filterDates);
  return merge(...displayDataChanges).pipe(
    map(() => {
      // Filter data
      this.filteredData = this.exampleDatabase.data
        .slice()
        .filter((advanceTable: OrderTracking) => {
          const searchStr = (
            advanceTable.numeroOrden+
            advanceTable.nombreTecnico +            
            advanceTable.numeroDocumento +
            advanceTable.estadoOrden +
            advanceTable.fechaOrdenTrabajo +
            advanceTable.nombreCarpeta 
            //advanceTable.bDate +
           
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
sortData(data: OrderTracking[]): OrderTracking[] {
  if (!this._sort.active || this._sort.direction === '') {
    return data;
  }
  return data.sort((a, b) => {
    let propertyA: number | string = '';
    let propertyB: number | string = '';
    switch (this._sort.active) {
      // case 'id':
      //   [propertyA, propertyB] = [a.id, b.id];
      //   break;
      case 'numeroOrden':
        [propertyA, propertyB] = [a.numeroOrden, b.numeroOrden];
        break;
      case 'nombreTecnico':
        [propertyA, propertyB] = [a.nombreTecnico, b.nombreTecnico];
        break;
      case 'numeroDocumento':
        [propertyA, propertyB] = [a.numeroDocumento, b.numeroDocumento];
        break;
      case 'estadoOrden':
        [propertyA, propertyB] = [a.estadoOrden, b.estadoOrden];
        break;
      case 'fechaOrdenTrabajo':
        [propertyA, propertyB] = [a.fechaOrdenTrabajo, b.fechaOrdenTrabajo];
        break;
      case 'nombreCarpeta':
        [propertyA, propertyB] = [a.nombreCarpeta, b.nombreCarpeta];
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
// export class EquipmentComponent implements OnInit {
//   @ViewChild('roleTemplate', { static: true }) roleTemplate: TemplateRef<any>;
//   @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
//   rows = [];
//   selectedRowData: selectRowInterface;
//   selectedRowEquipoData: selectRowEquipoInterface;
//   newUserImg = 'assets/images/user/user1.jpg';
//   data = [];
//   filteredData = [];
//   editForm: UntypedFormGroup;
//   editFormEquipo: UntypedFormGroup;  
//   register: UntypedFormGroup;
//   selectedOption: string;
//   columns = [
//     { name: 'ID' },
//     { name: 'Image' },
//     { name: 'First Name' },
//     { name: 'Last Name' },
//     { name: 'Gender' },
//     { name: 'Phone' },
//     { name: 'Email' },
//     { name: 'Address' }
//   ];
//   genders = [
//     { id: '1', value: 'Male' },
//     { id: '2', value: 'Female' }
//   ];
//   foods = [
//     { value: 'steak-0', viewValue: 'Steak' },
//     { value: 'pizza-1', viewValue: 'Pizza' },
//     { value: 'tacos-2', viewValue: 'Tacos' }
//   ];
//   // Table 2
//   tb2columns = [
//     { name: 'First Name' },
//     { name: 'Last Name' },
//     { name: 'Address' }
//   ];
//   tb2data = [];
//   tb2filteredData = [];
//   @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
//   breadscrums = [
//     {
//       title: 'Insumos',
//       items: ['Table'],
//       active: 'Material'
//     }
//   ];

//   constructor(
//     private fb: UntypedFormBuilder,
//     private _snackBar: MatSnackBar,
//     private modalService: NgbModal
//   ) {
//     this.editForm = this.fb.group({
//       id: new UntypedFormControl(),
//       img: new UntypedFormControl(),
//       firstName: new UntypedFormControl(),
//       lastName: new UntypedFormControl(),
//       phone: new UntypedFormControl(),
//       email: new UntypedFormControl(),
//       address: new UntypedFormControl()
//     });
//     this.editFormEquipo = this.fb.group({
//       id: new UntypedFormControl(),
//       equipo: new UntypedFormControl(),
//       serial: new UntypedFormControl(),
//       movimiento: new UntypedFormControl()
      
//     });
//    }

//   ngOnInit(): void {
//     this.fetch((data) => {
//       this.data = data;
//       this.filteredData = data;
//     });
//     // Table 2
//     this.tb2fetch((data) => {
//       this.tb2data = data;
//       this.tb2filteredData = data;
//     });
//     this.register = this.fb.group({
//       id: [''],
//       img: [''],
//       firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
//       lastName: [''],
//       phone: ['', [Validators.required]],
//       gender: ['', [Validators.required]],
//       email: [
//         '',
//         [Validators.required, Validators.email, Validators.minLength(5)]
//       ],
//       address: ['']
//     });
//   }
//   fetch(cb) {
//     const req = new XMLHttpRequest();
//     req.open('GET', 'assets/data/adv-tbl-data.json');
//     req.onload = () => {
//       const data = JSON.parse(req.response);
//       cb(data);
//     };
//     req.send();
//   }
//   // Table 2
//   tb2fetch(cb) {
//     const req = new XMLHttpRequest();
//     req.open('GET', 'assets/data/ngx-data.json');
//     req.onload = () => {
//       const data = JSON.parse(req.response);
//       cb(data);
//     };
//     req.send();
//   }
//   // Table 2
//   tb2filterDatatable(event) {
//     // get the value of the key pressed and make it lowercase
//     const val = event.target.value.toLowerCase();
//     // get the amount of columns in the table
//     const colsAmt = this.tb2columns.length;
//     // get the key names of each column in the dataset
//     const keys = Object.keys(this.tb2filteredData[0]);
//     // assign filtered matches to the active datatable
//     this.tb2data = this.tb2filteredData.filter(function (item) {
//       // iterate through each row's column data
//       for (let i = 0; i < colsAmt; i++) {
//         // check for a match
//         if (
//           item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 ||
//           !val
//         ) {
//           // found match, return true to add to result set
//           return true;
//         }
//       }
//     });
//     // whenever the filter changes, always go back to the first page
//     this.table2.offset = 0;
//   }
//   editRow(row, rowIndex, content) {
//     this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
//     this.editForm.setValue({
//       id: row.id,
//       firstName: row.firstName,
//       lastName: row.lastName,
//       phone: row.phone,
//       email: row.email,
//       address: row.address,
//       img: row.img
//     });
//     this.selectedRowData = row;
//   }
//   editEquipoRow(row, rowIndex, content) {
//     this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
//     this.editFormEquipo.setValue({
//       id: row.id,
//       equipo: row.firstName,
//       serial: row.lastName,
//       movimiento: row.phone,     
//     });
//     this.selectedRowEquipoData = row;
//   }
//   addRow(content) {
//     this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
//     this.register.patchValue({
//       id: this.getId(10, 100),
//       img: this.newUserImg
//     });
//   }
//   deleteRow(row) {
//     this.data = this.arrayRemove(this.data, row.id);
//     this.showNotification(
//       'bg-red',
//       'Delete Record Successfully',
//       'bottom',
//       'right'
//     );
//   }
//   arrayRemove(array, id) {
//     return array.filter(function (element) {
//       return element.id != id;
//     });
//   }
//   onEditSave(form: UntypedFormGroup) {
//     this.data = this.data.filter((value, key) => {
//       if (value.id == form.value.id) {
//         value.firstName = form.value.firstName;
//         value.lastName = form.value.lastName;
//         value.phone = form.value.phone;
//         value.gender = form.value.gender;
//         value.email = form.value.email;
//         value.address = form.value.address;
//       }
//       this.modalService.dismissAll();
//       return true;
//     });
//     this.showNotification(
//       'bg-black',
//       'Edit Record Successfully',
//       'bottom',
//       'right'
//     );
//   }
//   onAddRowSave(form: UntypedFormGroup) {
//     this.data.push(form.value);
//     this.data = [...this.data];
//     // console.log(this.data);
//     form.reset();
//     this.modalService.dismissAll();
//     this.showNotification(
//       'bg-green',
//       'Add Record Successfully',
//       'bottom',
//       'right'
//     );
//   }
//   filterDatatable(event) {
//     // get the value of the key pressed and make it lowercase
//     const value = event.target.value.toLowerCase();

//     // get the amount of columns in the table
//     const count = this.columns.length;

//     // get the key names of each column in the dataset
//     const keys = Object.keys(this.filteredData[0]);

//     // assign filtered matches to the active datatable
//     this.data = this.filteredData.filter((item) => {
//       // iterate through each row's column data
//       for (let i = 0; i <= count; i++) {
//         // check for a match
//         if (
//           (item[keys[i]] &&
//             item[keys[i]].toString().toLowerCase().indexOf(value) !== -1) ||
//           !value
//         ) {
//           // found match, return true to add to result set
//           return true;
//         }
//       }
//     });

//     // Whenever the filter changes, always go back to the first page
//     this.table.offset = 0;
//   }

//   onSort(event) {
//     // event was triggered, start sort sequence
//     setTimeout(() => {
//       const rows = [this.rows];
//       // this is only for demo purposes, normally
//       // your server would return the result for
//       // you and you would just set the rows prop
//       const sort = event.sorts[0];
//       rows.sort((a, b) => {
//         return (
//           a[sort.prop].localeCompare(b[sort.prop]) *
//           (sort.dir === 'desc' ? -1 : 1)
//         );
//       });

//       this.rows = rows;
//     }, 1000);
//   }

//   getId(min, max) {
//     // min and max included
//     return Math.floor(Math.random() * (max - min + 1) + min);
//   }
//   openSnackBar(message: string) {
//     this._snackBar.open(message, '', {
//       duration: 2000,
//       verticalPosition: 'bottom',
//       horizontalPosition: 'right',
//       panelClass: ['bg-red']
//     });
//   }
//   showNotification(colorName, text, placementFrom, placementAlign) {
//     this._snackBar.open(text, '', {
//       duration: 2000,
//       verticalPosition: placementFrom,
//       horizontalPosition: placementAlign,
//       panelClass: colorName
//     });
//   }  

// }
// export interface selectRowInterface {
//   img: String;
//   firstName: String;
//   lastName: String;
// }
// export interface selectRowEquipoInterface {
//   id: String;
//   equipo: String;
//   serial: String;
//   Movimiento: String;
// }
