import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Component, Inject ,OnInit} from '@angular/core';
import { UserModuleService } from '../../user-module.service';

@Component({
  selector: 'app-delete-assignment',
  templateUrl: './delete-assignment.component.html',
  styleUrls: ['./delete-assignment.component.sass']
})
export class DeleteAssignmentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteAssignmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userModuleService: UserModuleService
  ) {}
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.userModuleService.deleteAdvanceTable(this.data.id);
  }

}
