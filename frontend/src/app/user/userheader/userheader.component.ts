import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-userheader',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './userheader.component.html',
  styleUrl: './userheader.component.css'
})
export class UserheaderComponent {

}
