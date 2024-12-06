// angular import
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
    // LOGIN AS ADMIN
    this.authService.loginAdmin().subscribe({
      next: (success) => {
        
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

        this.adminToken = success.access_token;
        
        // CREATE USER
        this.authService.signup(this.userPayload, this.adminToken)
        .subscribe({
          next: (success) => {
            console.log("Account created");
            // ASSIGN ROLE TO USER
            this.authService.assignRole(this.adminToken,this.userPayload.username,"USER");
            // alert status
            alert("Account Created successfully");
            this.router.navigate(["/auth/login"])
          },
          error: (err) => {
            console.log("Error occured, account cannot be created!",err);
          }
        });
      },
      error: (err) => {
        console.error("Internal Error occured, please try later");
      }
    })
  }
}
