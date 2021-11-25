import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';


import { ToastrModule } from 'ngx-toastr';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { AddRentalComponent } from './components/add-rental/add-rental.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrandAddComponent } from './components/admin/brand-add/brand-add.component';
import { BrandManagerComponent } from './components/admin/brand-manager/brand-manager.component';
import { BrandDeleteComponent } from './components/admin/brand-delete/brand-delete.component';
import { BrandUpdateComponent } from './components/admin/brand-update/brand-update.component';
import { ColorAddComponent } from './components/admin/color-add/color-add.component';
import { ColorManagerComponent } from './components/admin/color-manager/color-manager.component';
import { ColorDeleteComponent } from './components/admin/color-delete/color-delete.component';
import { ColorUpdateComponent } from './components/admin/color-update/color-update.component';
import { CarAddComponent } from './components/admin/car-add/car-add.component';
import { CarManagerComponent } from './components/admin/car-manager/car-manager.component';
import { CarDeleteComponent } from './components/admin/car-delete/car-delete.component';
import { CarUpdateComponent } from './components/admin/car-update/car-update.component';
import { HomepageComponent } from './components/homepage/homepage.component';



@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    NaviComponent,
    CarDetailComponent,
    FilterPipePipe,
    CartSummaryComponent,
    AddRentalComponent,
    FooterComponent,
    BrandAddComponent,
    BrandManagerComponent,
    BrandDeleteComponent,
    BrandUpdateComponent,
    ColorAddComponent,
    ColorManagerComponent,
    ColorDeleteComponent,
    ColorUpdateComponent,
    CarAddComponent,
    CarManagerComponent,
    CarDeleteComponent,
    CarUpdateComponent,
    HomepageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    BrowserAnimationsModule,
    NgxBootstrapIconsModule,
    CarouselModule,
    CommonModule,
  ],
  providers: [{provide: DEFAULT_CURRENCY_CODE, useValue: '₺'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
