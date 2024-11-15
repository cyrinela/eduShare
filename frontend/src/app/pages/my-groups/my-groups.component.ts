import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyGroupService } from 'src/app/services/group/study-group.service';

@Component({
  selector: 'app-my-groups',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit {
  groups: any[] = []; // Tableau pour stocker les groupes

  constructor(private studyGroupService: StudyGroupService) {}

  ngOnInit(): void {
    this.getGroups(); // Récupérer les groupes lors de l'initialisation
  }

  // Méthode pour récupérer les groupes
  getGroups() {
    this.studyGroupService.getMyGroups().subscribe(
      (response) => {
        this.groups = response; // Met à jour la liste des groupes
      },
      (error) => {
        console.error('Erreur lors de la récupération des groupes:', error);
      }
    );
  }
}
