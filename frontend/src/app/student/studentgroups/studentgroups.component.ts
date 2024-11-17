import { Component } from '@angular/core';
import { StudentheaderComponent } from "../studentheader/studentheader.component";
import { StudentfooterComponent } from "../studentfooter/studentfooter.component";

@Component({
  selector: 'app-studentgroups',
  standalone: true,
  imports: [StudentheaderComponent, StudentfooterComponent],
  templateUrl: './studentgroups.component.html',
  styleUrl: './studentgroups.component.css'
})
export class StudentgroupsComponent {

}
