import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetailWorkOrderFollowMaterial } from 'src/app/order-tracking/order-tracking.model';
import { OrderTrackingService } from 'src/app/order-tracking/order-tracking.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-delete-material',
  templateUrl: './delete-material.component.html',
  styleUrls: ['./delete-material.component.sass']
})
export class DeleteMaterialComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  action: string;
  detailMaterial: DetailWorkOrderFollowMaterial;
  editMaterialForm: UntypedFormGroup;
  // selectDataEquipo : ResponseSelectDto[]=[]; 
  // selectDataMovimiento : ResponseSelectDto[]=[]; 
  // selectMovimiento: ResponseSelectDto;
  // options: paramGenericDto[] = [];
  // filteredOptions: Observable<paramGenericDto[]>;
  // equipmentAssignment = new UntypedFormControl();
  followDatabase: OrderTrackingService | null;

  constructor(
    public dialogRef: MatDialogRef<DeleteMaterialComponent>,
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
    this.editMaterialForm = this.createContactForm();
   
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.followDatabase = new OrderTrackingService(this.httpClient);

  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      idDetalle: [this.detailMaterial.idDetalle],
      idCarpeta: [this.detailMaterial.idCarpeta],
      idParamActividad: [this.detailMaterial.idParamActividad],     
      cantidadMaterial: [this.detailMaterial.cantidadMaterial,[Validators.required]],   
      nombreMaterialActividad: [this.detailMaterial.nombreMaterial + '-' + this.detailMaterial.nombreActividad],
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
    this.detailMaterial = this.editMaterialForm.getRawValue();
    //this.detailEquipment.idParamActividad = (this.equipmentAssignment.value) ? this.equipmentAssignment.value.idParamGenericActividad :this.detailEquipment.idParamActividad;
    this.followDatabase.DeleteActyvitiMaterial(this.detailMaterial).subscribe(
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
          'No se pudo Eliminar material, Valide con el administrador...!!!',
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
