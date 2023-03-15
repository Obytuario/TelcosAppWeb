import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Component, Inject ,OnInit} from '@angular/core';
import { UserModuleService } from '../../user-module.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdvanceUser } from '../../user-module.model';

@Component({
  selector: 'app-delete-assignment',
  templateUrl: './delete-assignment.component.html',
  styleUrls: ['./delete-assignment.component.sass']
})
export class DeleteAssignmentComponent implements OnInit {
  userAssingment: AdvanceUser;

  constructor(
    public dialogRef: MatDialogRef<DeleteAssignmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userModuleService: UserModuleService,
    private snackBar: MatSnackBar
  ) {
    this.userAssingment = data;
  }
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.userAssingment.idSuperior = null;
    this.userModuleService.deleteUserAssignment(this.userAssingment).subscribe(
      (res) => {
        
        if (res.isSuccessful) {
          
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
