import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { BillingModuleRoutingModule } from './billing-module-routing.module';
import { ManagementBillingComponent } from './management-billing/management-billing.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    ManagementBillingComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    MatSnackBarModule,
    BillingModuleRoutingModule
  ]
})
export class BillingModuleModule { }
