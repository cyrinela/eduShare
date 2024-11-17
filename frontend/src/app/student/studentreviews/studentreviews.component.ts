import { Component } from '@angular/core';
import { StudentheaderComponent } from "../studentheader/studentheader.component";
import { StudentfooterComponent } from "../studentfooter/studentfooter.component";

@Component({
  selector: 'app-studentreviews',
  standalone: true,
  imports: [StudentheaderComponent, StudentfooterComponent],
  templateUrl: './studentreviews.component.html',
  styleUrl: './studentreviews.component.css'
})
export class StudentreviewsComponent {

}
