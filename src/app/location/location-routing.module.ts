import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnicalComponent } from './technical/technical.component';
import { WorkOrdersComponent } from './work-orders/work-orders.component';

const routes: Routes = [
  {
    path: 'technical',
    component: TechnicalComponent
  },
  {
    path: 'work-orders',
    component: WorkOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
