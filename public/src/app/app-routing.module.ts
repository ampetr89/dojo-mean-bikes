import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './home/login/login.component'
import { RegisterComponent } from './home/register/register.component'
import { BrowseComponent } from './browse/browse.component';
import { ListComponent } from './list/list.component'

import { AuthGuardService } from './services/auth.guard.service';
import { LoginGuardService } from './services/login.guard.service';


// thank you https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
// for route guard solution
const routes: Routes = [
  {
    path: 'welcome',
    component: HomeComponent,
    canActivate: [LoginGuardService],
    children: [
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'register',
          component: RegisterComponent
        }
      ]
  },
  {
    path: 'welcome',
    pathMatch: 'full',
    redirectTo: 'welcome/login'
  },
  {
    path: 'browse',
    pathMatch: 'full',
    component: BrowseComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/browse'
  },
  {
    path: 'listings',
    pathMatch: 'full',
    component: ListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**', // probably overkill thanks to server catchall
    pathMatch: 'full',
    redirectTo: 'browse'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
