import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RequestResult } from '../core/models/Service/requestResult';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';
import { OrderTracking, FilterDates } from './order-tracking.model';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class OrderTrackingService extends UnsubscribeOnDestroyAdapter {
  dataChange: BehaviorSubject<OrderTracking[]> = new BehaviorSubject<
  OrderTracking[]
  >([]);
  snackBar : MatSnackBar;
  isTblLoading = true;

  constructor(private httpClient: HttpClient) {
    super()
   }

   get data(): OrderTracking[] {
    return this.dataChange.value;
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

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }
}
