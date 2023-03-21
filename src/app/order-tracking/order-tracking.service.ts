import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { RequestResult } from '../core/models/Service/requestResult';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';
import { OrderTracking, FilterDates, DetailWorkOrderFollowequipment, paramGenericDto, DetailWorkOrderFollowMaterial } from './order-tracking.model';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseSelectDto } from '../core/models/Service/responseSelectDto';

@Injectable({
  providedIn: 'root'
})
export class OrderTrackingService extends UnsubscribeOnDestroyAdapter {
  dataChange: BehaviorSubject<OrderTracking[]> = new BehaviorSubject<
  OrderTracking[]
  >([]);
  dataChangeEquipment: BehaviorSubject<DetailWorkOrderFollowequipment[]> = new BehaviorSubject<
  DetailWorkOrderFollowequipment[]
  >([]);
  dataChangeMaterial: BehaviorSubject<DetailWorkOrderFollowMaterial[]> = new BehaviorSubject<
  DetailWorkOrderFollowMaterial[]
  >([]);
  dataParamGenericChange: BehaviorSubject<paramGenericDto[]> = new BehaviorSubject<
  paramGenericDto[]
  >([]);
  dataGenericChange: BehaviorSubject<ResponseSelectDto[]> = new BehaviorSubject<
  ResponseSelectDto[]
  >([]);
  
  snackBar : MatSnackBar;
  isTblLoading = true;
  // Temporarily stores data from dialogs
  dialogDataDetailEquipment: any; 
  dialogDataDetailmaterial: any; 
  //assignmentData:any;

  constructor(private httpClient: HttpClient) {
    super()
   }

   get data(): OrderTracking[] {
    return this.dataChange.value;
  }
  get dataDetailEquipment(): DetailWorkOrderFollowequipment[] {
    return this.dataChangeEquipment.value;
  }
  get dataDetailMaterial(): DetailWorkOrderFollowMaterial[] {
    return this.dataChangeMaterial.value;
  }
  get dataSelectMovimiento(): ResponseSelectDto[] {
    return this.dataGenericChange.value;
  }

  getDialogDataDetailEquipment() {
    return this.dialogDataDetailEquipment;
  }
  getDialogDataDetailMaterial() {
    return this.dialogDataDetailmaterial;
  }
  

   getAllOrderTables(fechas : FilterDates): void {
    this.subs.sink = this.httpClient
      .post<RequestResult<OrderTracking[]>>(`${environment.apiUrl}/Api/WorkOrderFollowUp/GetWorkOrderFollow`,fechas)
      .subscribe(
        (requestResult) => {
          
          if (requestResult.isSuccessful) {
            this.isTblLoading = false;
            this.dataChange.next(requestResult.result);         
          
          } else {
            this.isTblLoading = false;
            this.showNotification(
              'snackbar-warning',
              requestResult.messages,
              'bottom',
              'center'
            );          
          }
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        }
      );
  }
  getDetailOrderEquipmentTables(currentOrder : OrderTracking): void {
    const order = currentOrder.idOrden;
    const params = new HttpParams({ fromObject: { order } }); 
    this.subs.sink = this.httpClient
      .get<RequestResult<DetailWorkOrderFollowequipment[]>>(`${environment.apiUrl}/Api/WorkOrderFollowUp/GetDetailEquipmentByOrder`,{ params })
      .subscribe(
        (requestResult) => {
          
          if (requestResult.isSuccessful) {
            this.isTblLoading = false;
            this.dataChangeEquipment.next(requestResult.result);         
          
          } else {
            this.isTblLoading = false;
            this.showNotification(
              'snackbar-warning',
              requestResult.messages,
              'bottom',
              'center'
            );          
          }
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        }
      );
  }
  getDetailOrderMaterialTables(currentOrder : OrderTracking): void {
    const order = currentOrder.idOrden;
    const params = new HttpParams({ fromObject: { order } }); 
    this.subs.sink = this.httpClient
      .get<RequestResult<DetailWorkOrderFollowMaterial[]>>(`${environment.apiUrl}/Api/WorkOrderFollowUp/GetDetailMaterialByOrder`,{ params })
      .subscribe(
        (requestResult) => {
          
          if (requestResult.isSuccessful) {
            this.isTblLoading = false;
            this.dataChangeMaterial.next(requestResult.result);         
          
          } else {
            this.isTblLoading = false;
            this.showNotification(
              'snackbar-warning',
              requestResult.messages,
              'bottom',
              'center'
            );          
          }
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        }
      );
  }
  GetActyvitiEquipmentByFile(currentCarpeta : string): void {
    const file = currentCarpeta;
    const params = new HttpParams({ fromObject: { file } }); 
    this.httpClient
      .get<RequestResult<paramGenericDto[]>>(`${environment.apiUrl}/Api/Files/GetActyvitiEquipmentByFile`,{ params })
      .subscribe(
        (requestResult) => {
          
          if (requestResult.isSuccessful) {
            //this.isTblLoading = false;
            this.dataParamGenericChange.next(requestResult.result);         
          
          } else {
            //this.isTblLoading = false;
            this.showNotification(
              'snackbar-warning',
              requestResult.messages,
              'bottom',
              'center'
            );          
          }
        },
        (error: HttpErrorResponse) => {
          //this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        }
      );
  }
  GetActyvitiMaterialtByFile(currentCarpeta : string): void {
    const file = currentCarpeta;
    const params = new HttpParams({ fromObject: { file } }); 
    this.httpClient
      .get<RequestResult<paramGenericDto[]>>(`${environment.apiUrl}/Api/Files/GetActyvitiMaterialByFile`,{ params })
      .subscribe(
        (requestResult) => {
          
          if (requestResult.isSuccessful) {
            //this.isTblLoading = false;
            this.dataParamGenericChange.next(requestResult.result);         
          
          } else {
            //this.isTblLoading = false;
            this.showNotification(
              'snackbar-warning',
              requestResult.messages,
              'bottom',
              'center'
            );          
          }
        },
        (error: HttpErrorResponse) => {
          //this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        }
      );
  }
  GetMovimientoEquipment(): void {
   
    this.httpClient
      .get<RequestResult<ResponseSelectDto[]>>(`${environment.apiUrl}/Api/WorkOrderFollowUp/GetAllMovimientoEquipment`)
      .subscribe(
        (requestResult) => {
          
          if (requestResult.isSuccessful) {
            //this.isTblLoading = false;
            this.dataGenericChange.next(requestResult.result);         
          
          } else {
            //this.isTblLoading = false;
            this.showNotification(
              'snackbar-warning',
              requestResult.messages,
              'bottom',
              'center'
            );          
          }
        },
        (error: HttpErrorResponse) => {
          //this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        }
      );
  }
  EditActyvitiEquipment(detail: DetailWorkOrderFollowequipment) {    
   
    return this.httpClient
    .post<RequestResult<DetailWorkOrderFollowequipment>>(`${environment.apiUrl}/Api/WorkOrderFollowUp/UpdateDetailEquipmentFollow`, detail)
    .pipe(
      map((requestResult) => {        
        this.isTblLoading = false;
        detail.idDetalle = requestResult.result.idDetalle;
        this.dialogDataDetailEquipment = detail;
        return requestResult;
      }),
      catchError(this.errorHandler)
    );   
  }
  EditActyvitiMaterial(detail: DetailWorkOrderFollowMaterial) {    
   
    return this.httpClient
    .post<RequestResult<DetailWorkOrderFollowMaterial>>(`${environment.apiUrl}/Api/WorkOrderFollowUp/UpdateDetailMaterialFollow`, detail)
    .pipe(
      map((requestResult) => {        
        this.isTblLoading = false;
        detail.idDetalle = requestResult.result.idDetalle;
        this.dialogDataDetailmaterial = detail;
        return requestResult;
      }),
      catchError(this.errorHandler)
    );   
  }
  DeleteActyvitiEquipment(detail: DetailWorkOrderFollowequipment) {    
   
    return this.httpClient
    .post<RequestResult<DetailWorkOrderFollowequipment>>(`${environment.apiUrl}/Api/WorkOrderFollowUp/DeleteDetailEquipmentFollow`, detail)
    .pipe(
      map((requestResult) => {        
        this.isTblLoading = false;
        detail.idDetalle = requestResult.result.idDetalle;
        this.dialogDataDetailEquipment = detail;
        return requestResult;
      }),
      catchError(this.errorHandler)
    );   
  }
  DeleteActyvitiMaterial(detail: DetailWorkOrderFollowMaterial) {    
   
    return this.httpClient
    .post<RequestResult<DetailWorkOrderFollowMaterial>>(`${environment.apiUrl}/Api/WorkOrderFollowUp/DeleteDetailMaterialFollow`, detail)
    .pipe(
      map((requestResult) => {        
        this.isTblLoading = false;
        detail.idDetalle = requestResult.result.idDetalle;
        this.dialogDataDetailmaterial = detail;
        return requestResult;
      }),
      catchError(this.errorHandler)
    );   
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }
  errorHandler(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
