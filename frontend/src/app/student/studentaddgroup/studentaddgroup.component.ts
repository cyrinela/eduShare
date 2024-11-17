import { Component } from '@angular/core';
import { StudentheaderComponent } from "../studentheader/studentheader.component";
import { StudentfooterComponent } from "../studentfooter/studentfooter.component";

@Component({
  selector: 'app-studentaddgroup',
  standalone: true,
  imports: [StudentheaderComponent, StudentfooterComponent],
  templateUrl: './studentaddgroup.component.html',
  styleUrl: './studentaddgroup.component.css'
})
export class StudentaddgroupComponent {

}
