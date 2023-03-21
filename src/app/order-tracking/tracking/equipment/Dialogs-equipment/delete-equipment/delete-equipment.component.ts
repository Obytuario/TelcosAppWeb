import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetailWorkOrderFollowequipment } from 'src/app/order-tracking/order-tracking.model';
import { OrderTrackingService } from 'src/app/order-tracking/order-tracking.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-delete-equipment',
  templateUrl: './delete-equipment.component.html',
  styleUrls: ['./delete-equipment.component.sass']
})
export class DeleteEquipmentComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  action: string;
  detailEquipment: DetailWorkOrderFollowequipment;
  editEquipmentForm: UntypedFormGroup;
  // selectDataEquipo : ResponseSelectDto[]=[]; 
  // selectDataMovimiento : ResponseSelectDto[]=[]; 
  // selectMovimiento: ResponseSelectDto;
  // options: paramGenericDto[] = [];
  // filteredOptions: Observable<paramGenericDto[]>;
  // equipmentAssignment = new UntypedFormControl();
  followDatabase: OrderTrackingService | null;

  constructor(
    public dialogRef: MatDialogRef<DeleteEquipmentComponent>,
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
  loadData() {
    this.followDatabase = new OrderTrackingService(this.httpClient);

  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      idDetalle: [this.detailEquipment.idDetalle],
      idCarpeta: [this.detailEquipment.idCarpeta],
      idParamActividad: [this.detailEquipment.idParamActividad],
      serialEquipo: [this.detailEquipment.serialEquipo, [Validators.required]],
      idMovimiento: [this.detailEquipment.idMovimiento, [Validators.required]],
      nombreEquipoActividad: [this.detailEquipment.nombreEquipo + '-' + this.detailEquipment.nombreActividad],
      observacionModificacion: ['', [Validators.required]]

    });

  }

  submit() {

    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmDelete() {
    this.detailEquipment = this.editEquipmentForm.getRawValue();
    //this.detailEquipment.idParamActividad = (this.equipmentAssignment.value) ? this.equipmentAssignment.value.idParamGenericActividad :this.detailEquipment.idParamActividad;
    this.followDatabase.DeleteActyvitiEquipment(this.detailEquipment).subscribe(
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
          'No se pudo Eliminar el equipo, Valide con el administrador...!!!',
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
    })
  }

}
