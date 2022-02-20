import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneraterComponent } from './components/generater/generater.component';


const routes: Routes = [
  {
    path: '',
    component: GeneraterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneraterRoutingModule { }