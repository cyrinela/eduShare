import { Component, OnInit } from '@angular/core';
import { StudentheaderComponent } from "../studentheader/studentheader.component";
import { UserfooterComponent } from '../../user/userfooter/userfooter.component';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-studenteditprofile',
  standalone: true,
  imports: [UserfooterComponent, StudentheaderComponent],
  templateUrl: './studenteditprofile.component.html',
  styleUrl: './studenteditprofile.component.css'
})
export class StudenteditprofileComponent implements OnInit {

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('userInfo')!);
  }

}
