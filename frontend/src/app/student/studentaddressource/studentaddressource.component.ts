import { Component } from '@angular/core';
import { StudentfooterComponent } from "../studentfooter/studentfooter.component";
import { StudentheaderComponent } from "../studentheader/studentheader.component";
  
@Component({
    selector: 'app-studentaddressource',
    standalone: true,
    imports: [StudentfooterComponent, StudentheaderComponent],
    templateUrl: './studentaddressource.component.html',
    styleUrl: './studentaddressource.component.css'
  })
  export class StudentaddressourceComponent {
  
  }
  