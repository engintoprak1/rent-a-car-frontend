import { CarManagerComponent } from './components/admin/car-manager/car-manager.component';
import { ColorManagerComponent } from './components/admin/color-manager/color-manager.component';
import { RentalComponent } from './components/rental/rental.component';
import { AddRentalComponent } from './components/add-rental/add-rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandManagerComponent } from './components/admin/brand-manager/brand-manager.component';



const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"carDetails", component:CarComponent},
  {path:"carDetails/brand/:brandId", component:CarComponent},
  {path:"carDetails/color/:colorId", component:CarComponent},
  {path:"cars/carDetail/:carId", component:CarDetailComponent},
  {path:"rental/add/:carId", component:AddRentalComponent},
  {path:"rental/rentals", component:RentalComponent},
  {path:"brand/brandManager", component:BrandManagerComponent},
  {path:"color/colorManager", component:ColorManagerComponent},
  {path:"car/carManager", component:CarManagerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
