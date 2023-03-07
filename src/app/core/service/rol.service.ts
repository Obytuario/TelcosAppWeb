import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { RequestResult } from '../models/Service/requestResult';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResponseSelectDto } from '../models/Service/responseSelectDto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class RolService extends UnsubscribeOnDestroyAdapter {
  
  snackBar : MatSnackBar;
  dataChange: BehaviorSubject<ResponseSelectDto[]> = new BehaviorSubject<
  ResponseSelectDto[]
  >([]);
  constructor(private httpClient: HttpClient) {
    super();
   }
   get data(): ResponseSelectDto[] {
    return this.dataChange.value;
  }
  getAllRol(): void {
    this.httpClient
      .get<RequestResult<ResponseSelectDto[]>>(`${environment.apiUrl}/Api/Roles/GetAllRol`)
      .subscribe(
        (requestResult) => {
          
          if (requestResult.isSuccessful) {
            //this.isTblLoading = false;
            this.dataChange.next(requestResult.result);         
          
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
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }
}
