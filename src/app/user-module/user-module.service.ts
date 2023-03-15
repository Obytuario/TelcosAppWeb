import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { AdvanceUser } from './user-module.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
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
  dataAssignmentChange: BehaviorSubject<AdvanceUser[]> = new BehaviorSubject<
  AdvanceUser[]
  >([]);
  dataRolChange: BehaviorSubject<AdvanceUser[]> = new BehaviorSubject<
  AdvanceUser[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any; 
  assignmentData:any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): AdvanceUser[] {
    return this.dataChange.value;
  }
  get dataAssignment(): AdvanceUser[] {
    return this.dataAssignmentChange.value;
  }
  get dataRol(): AdvanceUser[] {
    return this.dataRolChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getDialogAssignmentData() {
    return this.assignmentData;
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
  getAllUsersAssignment(findUser: AdvanceUser): void {
    const user = findUser.id;
    const params = new HttpParams({ fromObject: { user } }); 
    this.subs.sink = this.httpClient
      .get<RequestResult<AdvanceUser[]>>(`${environment.apiUrl}/Api/User/GetAssignmentById`,{ params })
      .subscribe(
        (requestResult) => {
          
          if (requestResult.isSuccessful) {
            this.isTblLoading = false;
            this.dataAssignmentChange.next(requestResult.result);         
          
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
  getAllUsersRol(findUser: AdvanceUser): void {
    const rol = findUser.idRol;
    const params = new HttpParams({ fromObject: { rol } }); 
    this.subs.sink = this.httpClient
      .get<RequestResult<AdvanceUser[]>>(`${environment.apiUrl}/Api/User/GetAssignmentByRol`,{ params })
      .subscribe(
        (requestResult) => {
          
          if (requestResult.isSuccessful) {
            this.isTblLoading = false;
            this.dataRolChange.next(requestResult.result);         
          
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
addUserAssignment(addUser: AdvanceUser) {    
   
  return this.httpClient
  .post<RequestResult<AdvanceUser>>(`${environment.apiUrl}/Api/User/SaveAssignmentUser`, addUser)
  .pipe(
    map((requestResult) => {        
      this.isTblLoading = false;
      addUser.id = requestResult.result.id;
      this.assignmentData = addUser;
      return requestResult;
    }),
    catchError(this.errorHandler)
  );   
}
 
  updateUserTable(editUser: AdvanceUser){
    return this.httpClient
    .post<RequestResult<AdvanceUser>>(`${environment.apiUrl}/Api/User/UpdateUser`, editUser)
    .pipe(
      map((requestResult) => {        
        this.isTblLoading = false;
        //editUser.id = requestResult.result.id;
        this.dialogData = editUser;
        return requestResult;
      }),
      catchError(this.errorHandler)
    ); 
  }

  deleteUserAssignment(User: AdvanceUser){
    //console.log(id);
    return this.httpClient
    .post<RequestResult<AdvanceUser>>(`${environment.apiUrl}/Api/User/SaveAssignmentUser`, User)
    .pipe(
      map((requestResult) => {        
        this.isTblLoading = false;
        User.id = requestResult.result.id;
        this.assignmentData = User;
        return requestResult;
      }),
      catchError(this.errorHandler)
    );   
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
