import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

//import { CookieModule } from 'ngx-cookie';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BrowseComponent } from './browse/browse.component';

import { ListComponent } from './list/list.component';
import { CreateComponent } from './list/create/create.component';
import { MyListComponent } from './list/my-list/my-list.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';

import { PostService } from './services/post.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth.guard.service';
import { LoginGuardService } from './services/login.guard.service';
import { RandomComponent } from './home/random/random.component';

import { ErrorPipe } from './error.pipe';

/*
console.log('Appcomponent', AppComponent);
console.log('MyListComponent', MyListComponent);
console.log('BrowseComponent', BrowseComponent);
*/

@NgModule({
  declarations: [
    AppComponent,
    BrowseComponent,
    ListComponent,
    CreateComponent,
    MyListComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RandomComponent,
    ErrorPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
    //CookieModule.forRoot()
  ],
  providers: [PostService, AuthService, AuthGuardService, LoginGuardService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
