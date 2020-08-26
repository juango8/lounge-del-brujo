import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {CartaComponent} from './components/carta/carta.component';
import {FormComponent} from './components/form/form.component';
import {FindUsComponent} from './components/find-us/find-us.component';

const childRoutes:Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'find-us', component: FindUsComponent},
  { path: 'carta', component: CartaComponent},
  { path: 'form', component: FormComponent,},
  { path: '', pathMatch: 'full', redirectTo: 'home'},
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
