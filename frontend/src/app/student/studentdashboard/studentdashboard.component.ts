import { Component } from '@angular/core';
import { StudentheaderComponent } from "../studentheader/studentheader.component";
import { StudentfooterComponent } from "../studentfooter/studentfooter.component";

@Component({
  selector: 'app-studentpage',
  standalone: true,
  imports: [StudentheaderComponent, StudentfooterComponent],
  templateUrl: './studentdashboard.component.html',
  styleUrl: './studentdashboard.component.css'
})
export class StudentpageComponent {

}
