import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-studentheader',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './studentheader.component.html',
  styleUrl: './studentheader.component.css'
})
export class StudentheaderComponent {

}
