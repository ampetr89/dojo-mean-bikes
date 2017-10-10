import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  logout(){
    // TODO: confirm boxes dont show on mobile
    let sure = confirm('Are you sure you want to log out?') ;
    console.log('sure',sure);
    if(sure){
      this._authService.logout()
        .then(()=>{
          console.log('logged out');
          this._router.navigate(['/welcome/login']);
        });
    }
  }
}
