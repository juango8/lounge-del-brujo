import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {CartaComponent} from './components/carta/carta.component';
import {FormComponent} from './components/form/form.component';
import {FindUsComponent} from './components/find-us/find-us.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'find-us', component: FindUsComponent},
  { path: 'carta', component: CartaComponent},
  { path: 'form', component: FormComponent,},
  { path: 'dashboard', component: DashboardComponent,},
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
