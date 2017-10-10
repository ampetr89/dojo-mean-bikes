import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(public _authService: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (this._authService.isAuthed()) {
      this.router.navigate(['browse']);
      return false;
    }
    return true;
  }


}
