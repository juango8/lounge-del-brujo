import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
// RUTAS
import {APP_ROUTING} from './app.router';

import {HttpClientModule} from '@angular/common/http';
import {GoogleMapsModule} from '@angular/google-maps';

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
    FindUsComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    GoogleMapsModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
