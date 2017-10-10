import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _authService: AuthService,
            private _router: Router) { }

  errorMessages: String[];
  user: User = new User();
  password2: String = "";
  ngOnInit() {
  }

  register(e: Event): void{
    e.preventDefault();
    this.errorMessages = undefined; // reset errors
    console.log('got a user from the form', this.user);
    this._authService.register(this.user)
      .then((user) => {
        this._router.navigate(['/browse'])})
       .catch(response => this.handleErrors(response.json()))
  }



  handleErrors(errors: any){
    console.log('handling errors', errors);
    if (Array.isArray(errors)){
        this.errorMessages = errors;
    }else if(errors.message){
      this.errorMessages = [errors.message]
    }else{
      this.errorMessages = [errors]
    }
  }

}
