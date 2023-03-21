import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, map, merge, Observable } from 'rxjs';
import { DetailWorkOrderFollowequipment, FilterDates, OrderTracking } from 'src/app/order-tracking/order-tracking.model';
import { OrderTrackingService } from 'src/app/order-tracking/order-tracking.service';
import { DataSource } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditEquipmentComponent } from '../edit-equipment/edit-equipment.component';
import { DeleteEquipmentComponent } from '../delete-equipment/delete-equipment.component';

@Component({
  selector: 'app-detail-equipment',
  templateUrl: './detail-equipment.component.html',
  styleUrls: ['./detail-equipment.component.sass']
})
export class DetailEquipmentComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  action: string;
  orderTrackingTable: OrderTracking;  
  editForm: UntypedFormGroup;
  dataOrderForm: UntypedFormGroup;
  exampleDatabase: OrderTrackingService | null;
  dataSource: ExampleDataSource | null;  
  displayedColumns = [
    'codigoEquipo',
    'nombreEquipo',   
    'serial',  
    'Actividad',  
    'Movimiento',  
    'actions'
  ];
  constructor(
    public dialogRef: MatDialogRef<DetailEquipmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    public dialog: MatDialog,
    public orderTrackingService: OrderTrackingService,
    public httpClient: HttpClient,
    private snackBar: MatSnackBar
  ) {
    super();
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {    
      this.orderTrackingTable = data.orderTrackingTable;    
    } 
    this.dataOrderForm = this.createContactForm();   
   
   }

  ngOnInit(): void {
    this.loadData();
  }
  public loadData() {    
    
    this.exampleDatabase = new OrderTrackingService(this.httpClient);  
    
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      //this.paginator,
      //this.sort,
      this.orderTrackingTable
    );
    // this.userModuleService.getAllUsersRol(this.advanceTable);
    // this.userModuleService.dataRolChange.subscribe(
    //   s => {
    //     this.options = s;
    //     this.filteredOptions = this.userAssignment.valueChanges.pipe(
    //     startWith(''),
    //     map((value) => (typeof value === 'string' ? value : value.name)),
    //     map((name) => (name ? this._filter(name) : this.options.slice()))
    //   );
    //   }
    // );    
    console.log(this.dataSource);
  }
  

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      idOrden: [this.orderTrackingTable.idOrden],
      numeroOrden: [this.orderTrackingTable.numeroOrden],  
      idCarpeta: [this.orderTrackingTable.idCarpeta],   
      nombreTecnico: [this.orderTrackingTable.nombreTecnico],   
      fechaOrdenTrabajo: [
        formatDate(new Date(this.orderTrackingTable.fechaOrdenTrabajo), 'yyyy-MM-dd', 'en')]   
    });
  }
  editEquipment(row) {
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(EditEquipmentComponent, {
      data: {
        detailEquipment: row,
        action: 'edit'
      },
      direction: tempDirection
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {         
        this.refreshTable();
        this.showNotification(
          'black',
          'Equipo Actualizado...!!!',
          'bottom',
          'center'
        );
      }
      
    });
  }
  deleteEquipment(row) {
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(DeleteEquipmentComponent, {
      data: {
        detailEquipment: row,
        action: 'edit'
      },
      direction: tempDirection
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {         
        this.refreshTable();
        this.showNotification(
          'black',
          'Equipo Eliminado...!!!',
          'bottom',
          'center'
        );
      }
      
    });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }
  refreshTable() {
    this.loadData();
  } 
  onNoClick(): void {
    this.dialogRef.close();
  }

}
export class ExampleDataSource extends DataSource<DetailWorkOrderFollowequipment> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: DetailWorkOrderFollowequipment[] = [];
  renderedData: DetailWorkOrderFollowequipment[] = [];
  constructor(
    public exampleDatabase: OrderTrackingService,
    // public paginator: MatPaginator,
    // public _sort: MatSort,
    public order: OrderTracking
  ) {
    super();   
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<DetailWorkOrderFollowequipment[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChangeEquipment,
      //this._sort.sortChange,
      this.filterChange
      //this.paginator.page
    ];
    this.exampleDatabase.getDetailOrderEquipmentTables(this.order);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.renderedData = this.exampleDatabase.dataDetailEquipment
          .slice()
          .filter((detailEquipmentTable: DetailWorkOrderFollowequipment) => {
            const searchStr = (
              detailEquipmentTable.codigoEquipo+
              detailEquipmentTable.nombreEquipo +  
              detailEquipmentTable.serialEquipo +          
              detailEquipmentTable.nombreMovimiento         
             
              //advanceTable.bDate +
             
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // // Sort filtered data
        // const sortedData = this.sortData(this.filteredData.slice());
        // // Grab the page's slice of the filtered sorted data.
        // const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        // this.renderedData = sortedData.splice(
        //   startIndex,
        //   this.paginator.pageSize
        // );
        return this.renderedData;
      })
    );
  }
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  // sortData(data: DetailWorkOrderFollowequipment[]): DetailWorkOrderFollowequipment[] {
  //   if (!this._sort.active || this._sort.direction === '') {
  //     return data;
  //   }
  //   return data.sort((a, b) => {
  //     let propertyA: number | string = '';
  //     let propertyB: number | string = '';
  //     switch (this._sort.active) {
  //       // case 'id':
  //       //   [propertyA, propertyB] = [a.id, b.id];
  //       //   break;
  //       case 'codigoEquipo':
  //         [propertyA, propertyB] = [a.codigoEquipo, b.codigoEquipo];
  //         break;
  //       case 'nombreEquipo':
  //         [propertyA, propertyB] = [a.nombreEquipo, b.nombreEquipo];
  //         break;
  //       case 'serialEquipo':
  //         [propertyA, propertyB] = [a.serialEquipo, b.serialEquipo];
  //         break;
  //       case 'nombreMovimiento':
  //         [propertyA, propertyB] = [a.nombreMovimiento, b.nombreMovimiento];
  //         break;
       
  //     }
  //     const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
  //     const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
  //     return (
  //       (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
  //     );
  //   });
  // }
  }
