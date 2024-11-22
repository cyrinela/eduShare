import { Component } from '@angular/core';
import { StudentfooterComponent } from "../studentfooter/studentfooter.component";
import { StudentheaderComponent } from "../studentheader/studentheader.component";

@Component({
  selector: 'app-studenteditprofile',
  standalone: true,
  imports: [StudentfooterComponent, StudentheaderComponent],
  templateUrl: './studenteditprofile.component.html',
  styleUrl: './studenteditprofile.component.css'
})
export class StudenteditprofileComponent {

}
