import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"carDetails", component:CarComponent},
  {path:"cars/carDetail/:carId", component:CarDetailComponent},
  {path:"carDetails/brand/:brandId", component:CarComponent},
  {path:"carDetails/color/:colorId", component:CarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
