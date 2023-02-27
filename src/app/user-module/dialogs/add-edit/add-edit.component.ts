import { Component, OnInit,Inject } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModuleService } from '../../user-module.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { AdvanceUser } from '../../user-module.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { SubSink } from '../../../shared/sub-sink';
import { SubscriptionLike } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

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
  constructor(    
    public dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userModuleService: UserModuleService,
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar
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
      numberDocument: [this.advanceTable.numberDocument],
      img: [this.advanceTable.img],
      fName: [this.advanceTable.fName, [Validators.required]],
      lName: [this.advanceTable.lName, [Validators.required]],
      email: [
        this.advanceTable.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      active: [this.advanceTable.active],
      bDate: [
        formatDate(this.advanceTable.bDate, 'yyyy-MM-dd', 'en'),
        [Validators.required]
      ],
      rol: [this.advanceTable.rol],
      mobile: [this.advanceTable.mobile, [Validators.required]],
      operationCenter: [this.advanceTable.operationCenter],
      charge: [this.advanceTable.charge]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.subs.sink = this.userModuleService
        .addUserTable(this.advanceTableForm.getRawValue())
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

}
