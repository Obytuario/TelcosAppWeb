import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject,OnInit } from '@angular/core';
import { UserModuleService } from '../../user-module.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { AdvanceTable } from '../../user-module.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
export interface User {
  name: string;
}

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.sass']
})
export class AssignmentComponent implements OnInit {
  action: string;
  dialogTitle: string;
  liderSuperior: string;
  advanceTableForm: UntypedFormGroup;
  advanceTable: AdvanceTable;
  myControl = new UntypedFormControl();
  options: User[] = [{ name: '1030525189-Ariel Bejarano' }, { name: '1030525188-Roger Fonseca' }, { name: '1017543222-Andres Bocanegra' }];
  filteredOptions: Observable<User[]>;

  constructor(
    public dialogRef: MatDialogRef<AssignmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userModuleService: UserModuleService,
    private fb: UntypedFormBuilder
  ) { 
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.liderSuperior='Carlos Contreras';
      this.dialogTitle =
        data.advanceTable.fName + ' ' + data.advanceTable.lName+' - '+data.advanceTable.address;
      this.advanceTable = data.advanceTable;
    } else {
      this.dialogTitle = 'Nueva jerarquia';
      this.advanceTable = new AdvanceTable({});
    }
    this.advanceTableForm = this.createContactForm();
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.options.slice()))
    );
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
      active: [this.advanceTable.active],
      bDate: [
        formatDate(this.advanceTable.bDate, 'yyyy-MM-dd', 'en'),
        [Validators.required]
      ],
      address: [this.advanceTable.address],
      mobile: [this.advanceTable.mobile, [Validators.required]],
      operationCenter: [this.advanceTable.operationCenter]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }
  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
  public confirmAdd(): void {
    // this.advanceTableService.addAdvanceTable(
    //   this.advanceTableForm.getRawValue()
    // );
  }

}
