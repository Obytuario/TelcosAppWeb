import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentComponent } from './tracking/equipment/equipment.component';
import { MaterialComponent } from './tracking/material/material.component';

const routes: Routes = [
  {
    path: 'management-material',
    component: MaterialComponent
  },
  {
    path: 'management-equipment',
    component: EquipmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderTrackingRoutingModule { }
