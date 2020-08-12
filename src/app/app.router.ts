import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {CartaComponent} from './components/carta/carta.component';
import {FormComponent} from './components/form/form.component';
import {FindUsComponent} from './components/find-us/find-us.component';
import { CardComponent } from './components/form/card/card.component';
import { CashComponent } from './components/form/cash/cash.component';
import { YapeComponent } from './components/form/yape/yape.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'find-us', component: FindUsComponent},
  { path: 'carta', component: CartaComponent},
  { path: 'form', component: FormComponent},
  { path: 'card', component: CardComponent},
  { path: 'cash', component: CashComponent},
  { path: 'yape', component: YapeComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
