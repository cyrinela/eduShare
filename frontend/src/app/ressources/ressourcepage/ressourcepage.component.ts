import { Component } from '@angular/core';
import { UserfooterComponent } from "../../user/userfooter/userfooter.component";
import { UserheaderComponent } from "../../user/userheader/userheader.component";
import { RessourcecontentComponent } from "../ressourcecontent/ressourcecontent.component";


@Component({
  selector: 'app-ressourcepage',
  standalone: true,
  imports: [UserheaderComponent, UserfooterComponent, RessourcecontentComponent],
  templateUrl: './ressourcepage.component.html',
  styleUrl: './ressourcepage.component.css'
})
export class RessourcepageComponent {

}
