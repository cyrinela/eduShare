import { Component } from '@angular/core';
import { UserfooterComponent } from "../userfooter/userfooter.component";
import { UserheaderComponent } from "../userheader/userheader.component";
import { UsercontentComponent } from "../usercontent/usercontent.component";

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [UserfooterComponent, UserheaderComponent, UsercontentComponent],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserpageComponent {

}
