import { Component } from '@angular/core';
import { UserheaderComponent } from "../user/userheader/userheader.component";
import { UserfooterComponent } from "../user/userfooter/userfooter.component";
import { StudentheaderComponent } from "../student/studentheader/studentheader.component";
import { StudentfooterComponent } from "../student/studentfooter/studentfooter.component";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [UserheaderComponent, UserfooterComponent, StudentheaderComponent, StudentfooterComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

}
