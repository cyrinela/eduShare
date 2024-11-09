import { Component, OnInit } from '@angular/core';
import { StudyGroupService } from 'src/app/services/group/study-group.service'; // Import du service

@Component({
  selector: 'app-join-study-group',
  templateUrl: './join-study-group.component.html',
  styleUrls: ['./join-study-group.component.css']
})
export class JoinStudyGroupComponent implements OnInit {
  groups: any[] = [];  // Tableau pour stocker les groupes
  modalOpen = false;
  GroupCode: string = '';

  constructor(private studyGroupService: StudyGroupService) {}

  ngOnInit(): void {
    this.getGroups();  // Récupérer les groupes lors de l'initialisation
  }

  // Functions to open/close the modal
  openModal(): void {
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  // Méthode pour récupérer les groupes
  getGroups() {
    this.studyGroupService.getAllGroups().subscribe(response => {
      this.groups = response;  // Met à jour la liste des groupes
    }, error => {
      console.error('Erreur lors de la récupération des groupes:', error);
    });
  }

  // Méthode pour rejoindre un groupe
  joinGroup(groupId: number) {
    const userId = "1";// ID de l'utilisateur, à remplacer selon la logique d'authentification
    let FormDataBody = new FormData();
    FormDataBody.append("userId",userId);
    FormDataBody.append("code",this.GroupCode);

    this.studyGroupService.joinGroup(groupId, FormDataBody).subscribe(response => {
      console.log('Groupe rejoint avec succès:', response);
      // Afficher une notification ou rediriger si nécessaire
    }, error => {
      console.error('Erreur lors du rejoint du groupe:', error);
    });
  }
}
