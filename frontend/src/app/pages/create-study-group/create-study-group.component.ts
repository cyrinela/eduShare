import { Component } from '@angular/core';
import { StudyGroupService } from 'src/app/services/group/study-group.service'; // Import du service
import { Router } from '@angular/router';  

@Component({
  selector: 'app-create-study-group',
  templateUrl: './create-study-group.component.html',
  styleUrls: ['./create-study-group.component.css']  // Chemin relatif vers le CSS
})
export class CreateStudyGroupComponent {
  groupName: string = '';
  groupDescription: string = '';
  groupCode: string = '';

  constructor(
    private studyGroupService: StudyGroupService,
    private router: Router  // Le router doit être ajouté dans le constructeur
  ) {}

  // Fonction pour créer un groupe
  createGroup() {
    if (this.groupName && this.groupDescription && this.groupCode) {
      const newGroup = {
        name: this.groupName,
        description: this.groupDescription,
        code: this.groupCode
      };

      // Appel du service pour envoyer les données au backend
      this.studyGroupService.createGroup(newGroup).subscribe(
        response => {
          console.log('Groupe créé avec succès:', response);
          
          // Redirection vers la liste des groupes après création
          this.router.navigate(['/groupes']); // Remplacez "/groupes" par le chemin de votre liste de groupes
        },
        error => {
          console.error('Erreur lors de la création du groupe:', error);
        }
      );
    } else {
      console.log('Tous les champs sont obligatoires');
    }
  }
}
