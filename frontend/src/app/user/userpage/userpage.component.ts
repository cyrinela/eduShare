import { Component, OnInit } from '@angular/core';
import { UserfooterComponent } from "../userfooter/userfooter.component";
import { UserheaderComponent } from "../userheader/userheader.component";
import { UsercontentComponent } from "../usercontent/usercontent.component";
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [UserfooterComponent, UserheaderComponent, UsercontentComponent],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})

export class UserpageComponent implements OnInit {
  
  constructor(
    private authService: AuthService
  ) {}

  async ngOnInit() {
    // save user info
    // this.authService.getUserInfo(this.userPayload.userName).subscribe({
    //   next: (success) => {
    //     localStorage.setItem('userInfo', JSON.stringify(success[0]))
    //     console.log(success);
        
    //   }
    // })
  }
}
