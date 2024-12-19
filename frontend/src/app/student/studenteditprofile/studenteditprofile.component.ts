import { Component, OnInit } from '@angular/core';
import { StudentheaderComponent } from "../studentheader/studentheader.component";
import { UserfooterComponent } from '../../user/userfooter/userfooter.component';
import { SharedModule } from '../../shared.module';
import { AuthService } from '../../services/auth/auth.service';
import { StudentSidenavComponent } from '../student-sidenav/student-sidenav.component';

@Component({
  selector: 'app-studenteditprofile',
  standalone: true,
  imports: [UserfooterComponent, StudentheaderComponent,StudentSidenavComponent ,SharedModule],
  templateUrl: './studenteditprofile.component.html',
  styleUrl: './studenteditprofile.component.css'
})
export class StudenteditprofileComponent implements OnInit {

  newPass: string = "";
  resNewPass : string = "";

  userData : any;

   constructor(
      private authService: AuthService
    ) {}

  ngOnInit(): void {
    const oldData = JSON.parse(localStorage.getItem('userInfo')!);
    this.userData = oldData;
  }

  saveChanges() {
    if (this.newPass && this.newPass == this.resNewPass) {
      this.authService.resetPassword({type: "password", value: this.newPass, temporary: false}).subscribe({
        next: (success) => {
          console.log("password reset was successful");
        }
      })
    }
    this.authService.modifyUser(this.userData).subscribe({
      next: (success) => {
        console.log("user modified!");
        localStorage.setItem('userInfo', JSON.stringify(this.userData));
      }
    })
  }

}
