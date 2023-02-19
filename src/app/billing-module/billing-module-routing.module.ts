import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementBillingComponent } from './management-billing/management-billing.component';

const routes: Routes = [
  {
    path: 'management-billing',
    component: ManagementBillingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingModuleRoutingModule { }
