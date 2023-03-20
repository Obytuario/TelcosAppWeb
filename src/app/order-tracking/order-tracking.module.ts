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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { EditEquipmentComponent } from './tracking/equipment/Dialogs-equipment/edit-equipment/edit-equipment.component';
import { DeleteEquipmentComponent } from './tracking/equipment/Dialogs-equipment/delete-equipment/delete-equipment.component';
import { DetailEquipmentComponent } from './tracking/equipment/Dialogs-equipment/detail-equipment/detail-equipment.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    MaterialComponent,
    EquipmentComponent,
    EditEquipmentComponent,
    DeleteEquipmentComponent,
    DetailEquipmentComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    MatPaginatorModule,
    MatTableExporterModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,    
    MatDatepickerModule,
    MatFormFieldModule,
    SharedModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSortModule,
    ComponentsModule,
    OrderTrackingRoutingModule
  ]
})
export class OrderTrackingModule { }
