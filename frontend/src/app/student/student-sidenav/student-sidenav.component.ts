import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './student-sidenav.component.html',
  styleUrl: './student-sidenav.component.css'
})
export class StudentSidenavComponent {

   constructor(
      private authService: AuthService,
      private router: Router
    ) {}

  logout() {
    this.authService.logout().subscribe({
      next: (success) => {
        alert("Logged out successfully!")
        this.router.navigate(["/userpage"]);
      },
      error: (err) => {
        if (err.status == 200) {
          alert("Logged out successfully!")
          this.router.navigate(["/userpage"]);
        }
      }
    })
  }
}
