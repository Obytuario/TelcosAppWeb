import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { AdvanceUser } from './user-module.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';
import { RequestResult } from '../core/models/Service/requestResult';

@Injectable({
  providedIn: 'root'
})
export class UserModuleService extends UnsubscribeOnDestroyAdapter{

  private readonly API_URL = 'assets/data/advanceTable.json';
  isTblLoading = true;
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
    console.log("consumo"+this.dialogData);
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAdvanceTables(): void {
    this.subs.sink = this.httpClient
      .get<AdvanceUser[]>(this.API_URL)
      .subscribe(
        (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        }
      );
  }
  
  addUserTable(addUser: AdvanceUser) {
       
    addUser.numberDocument = "1030525188";
    addUser.idRol = "DB8EA50A-3199-44BF-A443-55D50FB05F89";
    return this.httpClient
    .post<RequestResult<AdvanceUser>>(`${environment.apiUrl}/Api/User/SaveUser`, addUser)
    .pipe(
      map((requestResult) => {        
        this.isTblLoading = false;
        this.dialogData = requestResult.result;
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
}
