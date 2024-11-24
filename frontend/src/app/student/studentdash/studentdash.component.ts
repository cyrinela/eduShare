import { Component } from '@angular/core';
import { StudentheaderComponent } from "../studentheader/studentheader.component";
import { UserfooterComponent } from '../../user/userfooter/userfooter.component';
import { StudentSidenavComponent } from '../student-sidenav/student-sidenav.component';

@Component({
  selector: 'app-studentdash',
  standalone: true,
  imports: [UserfooterComponent, StudentheaderComponent, StudentSidenavComponent],
  templateUrl: './studentdash.component.html',
  styleUrl: './studentdash.component.css'
})
export class StudentdashComponent {

}
