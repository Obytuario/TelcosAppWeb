import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

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
    MatSnackBarModule,
    OrderTrackingRoutingModule
  ]
})
export class OrderTrackingModule { }
