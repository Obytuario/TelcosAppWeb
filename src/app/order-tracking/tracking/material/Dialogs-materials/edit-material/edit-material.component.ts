import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ResponseSelectDto } from 'src/app/core/models/Service/responseSelectDto';
import { DetailWorkOrderFollowMaterial, paramGenericDto } from 'src/app/order-tracking/order-tracking.model';
import { OrderTrackingService } from 'src/app/order-tracking/order-tracking.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.sass']
})
export class EditMaterialComponent extends UnsubscribeOnDestroyAdapter implements OnInit  {

  action: string;
  detailMaterial: DetailWorkOrderFollowMaterial;  
  editEquipmentForm: UntypedFormGroup;
  selectDataEquipo : ResponseSelectDto[]=[]; 
  selectDataMovimiento : ResponseSelectDto[]=[]; 
  selectMovimiento: ResponseSelectDto;
  options: paramGenericDto[] = [];
  filteredOptions: Observable<paramGenericDto[]>;
  materialAssignment = new UntypedFormControl();
  followDatabase: OrderTrackingService | null;

  constructor(
    public dialogRef: MatDialogRef<EditMaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    public orderTrackingService: OrderTrackingService,
    public httpClient: HttpClient
  ) {
    super();
    this.action = data.action;
    if (this.action === 'edit') {    
      this.detailMaterial = data.detailMaterial;    
    } 
    this.editEquipmentForm = this.createContactForm();
    console.log(this.editEquipmentForm);
   }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.followDatabase = new OrderTrackingService(this.httpClient);
    this.followDatabase.GetActyvitiMaterialtByFile(this.detailMaterial.idCarpeta);
    this.followDatabase.dataParamGenericChange.subscribe(
      s => {
        this.options = s; 
        this.filteredOptions = this.materialAssignment.valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value.nombreMaterialActividad)),
        map((name) => (name ? this._filter(name) : this.options.slice()))
      );
      }
    );  
     
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      idDetalle: [this.detailMaterial.idDetalle],   
      idCarpeta: [this.detailMaterial.idCarpeta],   
      idParamActividad: [this.detailMaterial.idParamActividad],      
      cantidadMaterial: [this.detailMaterial.cantidadMaterial,[Validators.required]],    
      nombreMaterialActividad: [this.detailMaterial.nombreMaterial+'-'+this.detailMaterial.nombreActividad],
      observacionModificacion: ['', [Validators.required]]   
       
    });
    
  }
  
  displayFn(param: paramGenericDto): string {
    if(param && param.nombreGeneric)
    {    
      return  param.nombreGeneric+ ' ' +param.nombreActividad;      
    }
    else{    
      return '';
    }
    //return user && user.numberDocument ? user.numberDocument+ ' ' +user.fName+ ' ' +user.lName : '';
  }
  private _filter(name: string): paramGenericDto[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      (option) => option.nombreGeneric.toLowerCase().indexOf(filterValue) === 0
    );
  }
  submit() {

    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  optionChargeChangeSelected(event: ResponseSelectDto) {
    // datos rol
    if(event)
        this.selectMovimiento = event;
  }
  public confirmEdit(){    
    this.detailMaterial = this.editEquipmentForm.getRawValue();
    this.detailMaterial.idParamActividad = (this.materialAssignment.value) ? this.materialAssignment.value.idParamGenericActividad :this.detailMaterial.idParamActividad;
    this.followDatabase.EditActyvitiMaterial(this.detailMaterial).subscribe(
      (res) => {
            
        if (res.isSuccessful) {
          this.loadData();   
          this.dialogRef.close(1);                
        } else {
          this.showNotification(
            'snackbar-warning',
             res.messages,
            'bottom',
            'center'
          );
          this.dialogRef.close(0);        
        }
      },
      (error) => {
        this.dialogRef.close();  
        this.showNotification(
          'snackbar-danger',
          'No se pudo Actualizar el Material, Valide con el administrador...!!!',
          'bottom',
          'center'
        );         
      }
    )
    
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
