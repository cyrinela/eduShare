import { Component } from '@angular/core';
import { StudentheaderComponent } from "../studentheader/studentheader.component";
import { StudentSidenavComponent } from '../student-sidenav/student-sidenav.component';
import { UserfooterComponent } from '../../user/userfooter/userfooter.component';
import { StudyGroupService } from '../../services/group/study-group.service';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-studentaddgroup',
  standalone: true,
  imports: [StudentheaderComponent, UserfooterComponent, StudentSidenavComponent, SharedModule],
  templateUrl: './studentaddgroup.component.html',
  styleUrl: './studentaddgroup.component.css'
})
export class StudentaddgroupComponent {
  groupName: string = '';
  groupDescription: string = '';
  groupCode: string = '';
  audience: string = 'public'

  constructor(
    private studyGroupService: StudyGroupService,
  ) {}

  // Fonction pour créer un groupe
  createGroup() {
    if (this.groupName && this.groupDescription) {
      const newGroup = {
        name: this.groupName,
        description: this.groupDescription
      };

      if ((document.getElementById("privateRadio") as HTMLInputElement).checked) {
        this.audience = "private";
        (document.getElementById("join-code") as HTMLDivElement).style.display = "block";
      } else {
        this.audience = "public";
        (document.getElementById("join-code") as HTMLDivElement).style.display = "none";
      }

      // Appel du service pour envoyer les données au backend
      this.studyGroupService.createGroup(newGroup,this.audience).subscribe(
        response => {
          console.log('Groupe créé avec succès');
          alert("Groupe créé avec succès");

          this.groupCode = response.code;
        },
        error => {
          console.error('Erreur lors de la création du groupe:', error);
        }
      );
    } else {
      console.log('Tous les champs sont obligatoires');
    }
  }

  CopyToClipboard() {
    // Copy the text inside the text field
    navigator.clipboard.writeText(this.groupCode);
    alert("Code copied");
  }
}
