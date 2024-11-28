// angular import
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  firstname:string=""; lastname: string="";
  password:string ="";

  // public method
  SignUpOptions = [
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

  signup() {
    this.authService.signup({
      username: this.firstname.trim() + "_" + this.lastname.trim(),
      password: this.password,
      roles: []
    }).subscribe({
      next: (success) => {
        console.log("Account created", success);
      },
      error: (err) => {
        console.log("Error occured",err);
      }
    })
  }
}
