import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { SharedModule } from '../../shared.module';

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
    private router: Router
  ) {}

  login() {
    this.authService.login({username:this.email,password:this.password}).subscribe({
      next: (success) => {
<<<<<<< Updated upstream
          console.log("authentified");
          // SAVE USER INFO TO LOCAL STORAGE
          this.authService.getUserInfo(this.email).subscribe({
            next : (success) => {
              localStorage.setItem('userInfo', JSON.stringify(success));
            },
            error: (err) => {
              console.log(err);
=======
        console.log("authentified");
        // set HttpOnly Cookie
        this.authService.createCookies(success.access_token).subscribe({
          next: (success) => {
            if (success.status === 200) {
              console.log("Cookie created", success);
              alert("Redirecting to EduShare");
            this.router.navigate(["/userpage"]);
            }
          },
          error: (err) => {
            if (err.status === 200) {
              console.log("Cookie created", err);
              alert("Redirecting to EduShare");
            this.router.navigate(["/userpage"]);
>>>>>>> Stashed changes
            }
          })
          alert("Redirecting to EduShare");
          this.router.navigate(["/userpage"]);
      },
      error: (err) => {
        if (err.status === 200) {
          console.log("authentified");
          // SAVE USER INFO TO LOCAL STORAGE
          this.authService.getUserInfo(this.email).subscribe({
            next : (success) => {
              localStorage.setItem('userInfo', JSON.stringify(success));
            },
            error: (err) => {
              console.log(err);
            }
          })
          alert("Redirecting to EduShare");
          this.router.navigate(["/userpage"]);
        }else {
          console.log("error occured", err);
        }
      }
    })
  }

  IdPLogin(provider:string) {
    this.authService.RiderectIdPLogin(provider);
  }
}
