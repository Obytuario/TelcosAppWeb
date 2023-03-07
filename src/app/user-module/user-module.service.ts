import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { AdvanceUser } from './user-module.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';
import { RequestResult } from '../core/models/Service/requestResult';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserModuleService extends UnsubscribeOnDestroyAdapter{

  private readonly API_URL = 'assets/data/advanceTable.json';
  isTblLoading = true;
  snackBar : MatSnackBar;
  dataChange: BehaviorSubject<AdvanceUser[]> = new BehaviorSubject<
  AdvanceUser[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  dialogUserHierarchyData:any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): AdvanceUser[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAdvanceTables(): void {
    this.subs.sink = this.httpClient
      .get<RequestResult<AdvanceUser[]>>(`${environment.apiUrl}/Api/User/GetAllUsers`)
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
  
  addUserTable(addUser: AdvanceUser) {       
    
    addUser.idRol = "DB8EA50A-3199-44BF-A443-55D50FB05F89";
    return this.httpClient
    .post<RequestResult<AdvanceUser>>(`${environment.apiUrl}/Api/User/SaveUser`, addUser)
    .pipe(
      map((requestResult) => {        
        this.isTblLoading = false;
        addUser.id = requestResult.result.id;
        this.dialogData = addUser;
        return requestResult;
      }),
      catchError(this.errorHandler)
    );   
}
 
  updateAdvanceTable(advanceTable: AdvanceUser): void {
    this.dialogData = advanceTable;

    /* this.httpClient.put(this.API_URL + advanceTable.id, advanceTable).subscribe(data => {
      this.dialogData = advanceTable;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteAdvanceTable(id: number): void {
    console.log(id);

    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
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
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }
}
