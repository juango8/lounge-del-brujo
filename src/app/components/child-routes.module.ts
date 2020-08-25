import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from '../components/home/home.component';
import {AboutComponent} from '../components/about/about.component';
import {CartaComponent} from '../components/carta/carta.component';
import {FormComponent} from '../components/form/form.component';
import {FindUsComponent} from '../components/find-us/find-us.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { LoginComponent } from '../components/login/login.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'find-us', component: FindUsComponent},
  { path: 'carta', component: CartaComponent},
  { path: 'form', component: FormComponent,},
  { path: 'dashboard', component: DashboardComponent,},
  { path: 'login', component: LoginComponent,},
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ChildRoutesModule { }
