import { Component } from '@angular/core';
import { StudentheaderComponent } from "../studentheader/studentheader.component";
import { UserfooterComponent } from '../../user/userfooter/userfooter.component';
import { StudentSidenavComponent } from '../student-sidenav/student-sidenav.component';
import { StudyGroupService } from '../../services/group/study-group.service';
import { SharedModule } from '../../shared.module';
import { response } from 'express';

@Component({
  selector: 'app-studentgroups',
  standalone: true,
  imports: [StudentheaderComponent, UserfooterComponent, StudentSidenavComponent, SharedModule],
  templateUrl: './studentgroups.component.html',
  styleUrl: './studentgroups.component.css'
})
export class StudentgroupsComponent {
  myGroups: any[] = []; // Tableau pour stocker les groupes
  availableGroups: any[] = [];
  favoriteGroups: any[] = [];

  constructor(private studyGroupService: StudyGroupService) {}

  ngOnInit(): void {
    this.getMyGroups(); // Récupérer les groupes lors de l'initialisation
    this.getAvailableGroups();
  }

  // Méthode pour récupérer les groupes
 getMyGroups() {
    this.studyGroupService.getMyGroups().subscribe(
      (response) => {
        this.myGroups = response; // Met à jour la liste des groupes
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des groupes:', error);
      }
    );
  }

  getAvailableGroups() {
    this.studyGroupService.getAllGroups().subscribe(response => {
      this.availableGroups = response;  // Met à jour la liste des groupes
    }, error => {
      console.error('Erreur lors de la récupération des groupes:', error);
    });
  }

  // Méthode pour rejoindre un groupe
  joinGroup(groupId: number) {
    const userId = JSON.parse(localStorage.getItem('userInfo')!).id;
    let GroupCode = (document.getElementById(`code-${groupId}`) as HTMLInputElement).value;
    let FormDataBody = new FormData();
    FormDataBody.append("userId",userId);
    FormDataBody.append("code",GroupCode);

    this.studyGroupService.joinGroup(groupId, FormDataBody).subscribe({
      next: (response) => {
        console.log('Groupe rejoint avec succès:', response);
        alert('Groupe rejoint avec succès');
        window.location.reload();
      },
      error: (error) => {
        console.error('Erreur lors du rejoint du groupe:', error);
        alert('Erreur lors du rejoint du groupe');
      }
    });
  }

  leaveGroup(groupId: number) {
    const userId = JSON.parse(localStorage.getItem('userInfo')!).id;

    this.studyGroupService.leaveGroup(userId,groupId).subscribe({
      next: (response) => {
        console.error(response);
        alert('vous avez quitté ce groupe');
        window.location.reload();
      },
      error: (error) => {
        console.error('Erreur lors du sortie du groupe:', error);
        alert('Erreur lors du sortie du groupe');
      }
    })
  }
 }
