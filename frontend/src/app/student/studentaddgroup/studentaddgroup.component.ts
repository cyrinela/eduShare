import { Component } from '@angular/core';
import { StudentheaderComponent } from "../studentheader/studentheader.component";
import { StudentSidenavComponent } from '../student-sidenav/student-sidenav.component';
import { UserfooterComponent } from '../../user/userfooter/userfooter.component';

@Component({
  selector: 'app-studentaddgroup',
  standalone: true,
  imports: [StudentheaderComponent, UserfooterComponent, StudentSidenavComponent],
  templateUrl: './studentaddgroup.component.html',
  styleUrl: './studentaddgroup.component.css'
})
export class StudentaddgroupComponent {

}
