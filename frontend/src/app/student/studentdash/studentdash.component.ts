import { Component } from '@angular/core';
import { StudentfooterComponent } from "../studentfooter/studentfooter.component";
import { StudentheaderComponent } from "../studentheader/studentheader.component";

@Component({
  selector: 'app-studentdash',
  standalone: true,
  imports: [StudentfooterComponent, StudentheaderComponent],
  templateUrl: './studentdash.component.html',
  styleUrl: './studentdash.component.css'
})
export class StudentdashComponent {

}
