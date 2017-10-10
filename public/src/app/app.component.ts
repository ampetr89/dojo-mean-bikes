import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { //implements AfterViewInit
  //is_authed: Boolean = false;
  // I want to have the logout button in the app-component
  // and show/hide it based on is_authed. But cant figure out how
  // to trigger change to this variable upon login. only if you refresh
  // the page does the logout button appear..

  constructor(/*private _authService: AuthService, private _router: Router*/){
   // this.checkAuth();
  }

  /*checkAuth(){
    this.is_authed = this._authService.isAuthed();
  }*/

  ngOnInIt(){
    //this.checkAuth();
  }

  /*ngAfterViewInit(){
    console.log('running ngAfterViewInit');
    this.checkAuth();
  }*/

  /*
  logout(){
    let sure = confirm('Are you sure you want to log out?') ;
    console.log('sure',sure);
    if(sure){
      this._authService.logout()
        .then(()=>{
          this.checkAuth();
          console.log('logged out');
          this._router.navigate(['/welcome/login']);
        });
    }
  }*/

}
