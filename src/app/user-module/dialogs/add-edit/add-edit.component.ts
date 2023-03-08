import { Component, OnInit,Inject } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModuleService } from '../../user-module.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormControl
} from '@angular/forms';
import { AdvanceUser } from '../../user-module.model';
import { MatOptionSelectionChange, MAT_DATE_LOCALE } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { SubSink } from '../../../shared/sub-sink';
import { SubscriptionLike } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { RolService } from '../../../core/service/rol.service';
import { HttpClient } from '@angular/common/http';
import { ResponseSelectDto } from '../../../core/models/Service/responseSelectDto';
import { ChargeService } from '../../../core/service/charge.service';
import { OperationCenterService } from '../../../core/service/operation-center.service';
import { AnyMxRecord } from 'dns';
interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class AddEditComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  action: string;
  dialogTitle: string;
  advanceTableForm: UntypedFormGroup;
  advanceTable: AdvanceUser;
  rolDatabase: RolService | null;
  cargoDatabase: ChargeService | null;
  centroOperacionDatabase: OperationCenterService | null;
  selectDataRol;selectDataCargo;selectDataCentroOperaciones : ResponseSelectDto[]=[]; 
  selectRol: ResponseSelectDto; selectCargo: ResponseSelectDto; selectCentroOperaciones : ResponseSelectDto; 

  
  constructor(    
    public dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userModuleService: UserModuleService,
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    public httpClient: HttpClient
  ) { 
    super();
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle =
        data.advanceTable.fName + ' ' + data.advanceTable.lName;
      this.advanceTable = data.advanceTable;
    } else {
      this.dialogTitle = 'Nuevo Usuario';
      this.advanceTable = new AdvanceUser({});
    }
    this.advanceTableForm = this.createContactForm();
  }

  ngOnInit(): void {
    this.loadData();
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
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.advanceTable.id],      
      img: [this.advanceTable.img],
      fName: [this.advanceTable.fName, [Validators.required]],
      lName: [this.advanceTable.lName, [Validators.required]],
      email: [
        this.advanceTable.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      numberDocument: [this.advanceTable.numberDocument,[Validators.required,Validators.minLength(10)]],
      active: [this.advanceTable.active],          
      idRol: [this.advanceTable.idRol, [Validators.required]],
      idCharge: [this.advanceTable.idCharge, [Validators.required]],
      idOperationCenter: [this.advanceTable.idOperationCenter, [Validators.required]],
      mobile: [this.advanceTable.mobile, [Validators.required]]      
    
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  optionRolChangeSelected(event: ResponseSelectDto) {
    // datos rol
    if(event)
        this.selectRol = event;    
}
optionChargeChangeSelected(event: ResponseSelectDto) {
  // datos rol
  if(event)
      this.selectCargo = event;
}
optionOperationCenterChangeSelected(event: ResponseSelectDto) {
  // datos rol
  if(event)
      this.selectCentroOperaciones = event;  
}
  public confirmAdd(): void {
      

    this.advanceTable = this.advanceTableForm.getRawValue();
    this.advanceTable.rol = this.selectRol.descripcionDto;
    this.advanceTable.charge = this.selectCargo.descripcionDto;
    this.advanceTable.operationCenter = this.selectCentroOperaciones.descripcionDto;

    


    this.subs.sink = this.userModuleService
        .addUserTable(this.advanceTable)
        .subscribe(
          (res) => {
            
            if (res.isSuccessful) {
              // const token = this.authService.currentUserValue.token;
              // if (token) {
              //   this.router.navigate(['/dashboard/main']);
              // }
              this.dialogRef.close(1);
            } else {
              this.showNotification(
                'snackbar-warning',
                 res.messages,
                'bottom',
                'center'
              );
              this.dialogRef.close();
              //this.error = 'Credenciales Invalidas';
            }
          },
          (error) => {
            this.dialogRef.close();  
            this.showNotification(
              'snackbar-danger',
              'No se pudo crear el Usuario, Valide con el administrador...!!!',
              'bottom',
              'center'
            );         
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

  public loadData() {
    this.rolDatabase = new RolService(this.httpClient);
    this.rolDatabase.getAllRol();
    this.rolDatabase.dataChange.subscribe( s => {
      this.selectDataRol = s;
      console.log(this.selectDataRol);
    }); 
    
    this.cargoDatabase = new ChargeService(this.httpClient);
    this.cargoDatabase.getAllCharge();
    this.cargoDatabase.dataChange.subscribe( s => {
      this.selectDataCargo = s;
      console.log(this.selectDataCargo);
    }); 

    this.centroOperacionDatabase = new OperationCenterService(this.httpClient);
    this.centroOperacionDatabase.getAllOperationCenter();
    this.centroOperacionDatabase.dataChange.subscribe( s => {
      this.selectDataCentroOperaciones = s;
      console.log(this.selectDataCentroOperaciones);
    }); 
    
  }

}

