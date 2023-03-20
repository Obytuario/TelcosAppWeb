import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ResponseSelectDto } from 'src/app/core/models/Service/responseSelectDto';
import { DetailWorkOrderFollowequipment, paramGenericDto } from 'src/app/order-tracking/order-tracking.model';
import { OrderTrackingService } from 'src/app/order-tracking/order-tracking.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-equipment',
  templateUrl: './edit-equipment.component.html',
  styleUrls: ['./edit-equipment.component.sass']
})
export class EditEquipmentComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  action: string;
  detailEquipment: DetailWorkOrderFollowequipment;  
  editEquipmentForm: UntypedFormGroup;
  selectDataEquipo : ResponseSelectDto[]=[]; 
  selectDataMovimiento : ResponseSelectDto[]=[]; 
  selectMovimiento: ResponseSelectDto;
  options: paramGenericDto[] = [];
  filteredOptions: Observable<paramGenericDto[]>;
  equipmentAssignment = new UntypedFormControl();
  followDatabase: OrderTrackingService | null;

  constructor(
    public dialogRef: MatDialogRef<EditEquipmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    public orderTrackingService: OrderTrackingService,
    public httpClient: HttpClient
  ) {
    super();
    this.action = data.action;
    if (this.action === 'edit') {    
      this.detailEquipment = data.detailEquipment;    
    } 
    this.editEquipmentForm = this.createContactForm();
    console.log(this.editEquipmentForm);
   }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.followDatabase = new OrderTrackingService(this.httpClient);
    this.followDatabase.GetActyvitiEquipmentByFile(this.detailEquipment.idCarpeta);
    this.followDatabase.dataParamGenericChange.subscribe(
      s => {
        this.options = s; 
        this.filteredOptions = this.equipmentAssignment.valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value.nombreEquipoActividad)),
        map((name) => (name ? this._filter(name) : this.options.slice()))
      );
      }
    );  
    this.followDatabase.GetMovimientoEquipment();
    this.followDatabase.dataGenericChange.subscribe( s => {
      this.selectDataMovimiento = s;
      
    });   
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      idDetalle: [this.detailEquipment.idDetalle],   
      idCarpeta: [this.detailEquipment.idCarpeta],   
      idParamActividad: [this.detailEquipment.idParamActividad],      
      serialEquipo: [this.detailEquipment.serialEquipo,[Validators.required]],
      idMovimiento: [this.detailEquipment.idMovimiento, [Validators.required]],
      nombreEquipoActividad: [this.detailEquipment.nombreEquipo+'-'+this.detailEquipment.nombreActividad],
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
    this.detailEquipment = this.editEquipmentForm.getRawValue();
    this.detailEquipment.idParamActividad = (this.equipmentAssignment.value) ? this.equipmentAssignment.value.idParamGenericActividad :this.detailEquipment.idParamActividad;
    this.followDatabase.EditActyvitiEquipment(this.detailEquipment).subscribe(
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
          'No se pudo Actualizar el equipo, Valide con el administrador...!!!',
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
