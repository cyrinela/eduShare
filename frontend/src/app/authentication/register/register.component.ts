// angular import
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  firstname:string=""; lastname: string="";
  email:string ="";
  password:string ="";
  adminToken: string = "";
  userPayload: any;

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
    private router: Router
  ) {}

  signup() {

        this.userPayload =
        {
          username: this.firstname.trim() + " " + this.lastname.trim(),
          firstName: this.firstname.trim(),
          lastName:this.lastname.trim(),
          email: this.email.trim(),
          emailVerified: true,
          enabled: true,
          requiredActions: [],
          groups: [],
          credentials: [
            {
              type: "password",
              value: this.password,
              temporary: false
            }
          ]
        };

        // CREATE USER
        this.authService.signup(this.userPayload).subscribe({
          next: (success) => {
              console.log("Account created");
              // alert status
              alert("Account Created successfully");
              // navigate to login page
              this.router.navigate(["/login"])
          },
          error: (err) => {
            if (err.status === 200) {
              console.log("Account created");
              // alert status
              alert("Account Created successfully");
              // navigate to login page
              this.router.navigate(["/login"])
            } else {
              console.log("Error occured, account cannot be created!",err);
            }
          }
        });
  }

  IdPLogin(provider:string) {
    this.authService.redirectIdPLogin(provider);
  }
}
