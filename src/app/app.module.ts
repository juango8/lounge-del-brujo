import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
// RUTAS
import {APP_ROUTING} from './app.router';

import {HttpClientModule} from '@angular/common/http';
import {GoogleMapsModule} from '@angular/google-maps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AboutComponent} from './components/about/about.component';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './shared/header/header.component';
import {FooterComponent} from './shared/footer/footer.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CartaComponent} from './components/carta/carta.component';
import { FormComponent } from './components/form/form.component';
import { FindUsComponent } from './components/find-us/find-us.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CardComponent } from './components/form/card/card.component';
import { PlinComponent } from './components/form/plin/plin.component';
import { TransferenceComponent } from './components/form/transference/transference.component';
import { CashComponent } from './components/form/cash/cash.component';
import { YapeComponent } from './components/form/yape/yape.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FirstviewComponent } from './components/dashboard/firstview/firstview.component';
import { SecondviewComponent } from './components/dashboard/secondview/secondview.component';
import { LogoBarComponent } from './shared/logo-bar/logo-bar.component';
import { LoginComponent } from './components/login/login.component';
import { ComponentsComponent } from './components/components.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CategoriesComponent,
    CartaComponent,
    FormComponent,
    FindUsComponent,
    NavbarComponent,
    CardComponent,
    PlinComponent,
    TransferenceComponent,
    CashComponent,
    YapeComponent,
    DashboardComponent,
    FirstviewComponent,
    SecondviewComponent,
    LogoBarComponent,
    LoginComponent,
    ComponentsComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    GoogleMapsModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
