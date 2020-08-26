import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ComponentsComponent } from './components/components.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AuthGuard } from './guards/auth.guard';

const APP_ROUTES: Routes = [
  { 
    path: '', 
    component: ComponentsComponent,
    loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
  },
  { path: 'login', component: LoginComponent,},
  { path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [ AuthGuard ],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
