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
import { DetailEquipmentComponent } from './Dialogs-equipment/detail-equipment/detail-equipment.component';
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
  public orderTrackingService: OrderTrackingService,
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
detailEquipment(row) {
  let tempDirection;
  if (localStorage.getItem('isRtl') === 'true') {
    tempDirection = 'rtl';
  } else {
    tempDirection = 'ltr';
  }
  const dialogRef = this.dialog.open(DetailEquipmentComponent, {
    data: {
      orderTrackingTable: row,
      action: 'edit'
    },
    direction: tempDirection
  });
  this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    if (result === 1) {
      // After dialog is closed we're doing frontend updates
      // For add we're just pushing a new row inside DataService
      //const userAdicionado = this.orderTrackingService.getDialogData();
      // si no lo encuentra lo adiciona     
      // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
      //   (x) => x.idOrden === userAdicionado?.id
      // );
      // if(foundIndex === -1)
      // {
      //   this.exampleDatabase.dataChange.value.unshift(
      //     this.orderTrackingService.getDialogData()
      //   );
      // }
      
      
      this.refreshTable();
      this.showNotification(
        'snackbar-success',
        'Equipo Actualizado...!!!',
        'bottom',
        'center'
      );
    }
    
  });
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

