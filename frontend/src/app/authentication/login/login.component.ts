import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email:string = "";
  password:string = "";

  // public method
  SignInOptions = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];

  constructor(
    private authService: AuthService,
  ) {}

  login() {
    this.authService.login({username:this.email,password:this.password}).subscribe({
      next: (success) => {
        console.log("authentified", success);   
      },
      error: (err) => {
        console.log("error occured", err);
      }
    })
  }

}
