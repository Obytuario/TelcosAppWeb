import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { OrderTrackingRoutingModule } from './order-tracking-routing.module';
import { MaterialComponent } from './tracking/material/material.component';
import { EquipmentComponent } from './tracking/equipment/equipment.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    MaterialComponent,
    EquipmentComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    OrderTrackingRoutingModule
  ]
})
export class OrderTrackingModule { }
