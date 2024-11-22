import { Component } from '@angular/core';
import { UserfooterComponent } from '../../user/userfooter/userfooter.component';
import { StudentheaderComponent } from '../studentheader/studentheader.component';
import { Categorie } from '../../model/categorie.model';
import { Ressource } from '../../model/ressource.model';
import { RessourceService } from '../../services/ressource.service';
import { SharedModule } from '../../shared.module';
import { StudentSidenavComponent } from '../student-sidenav/student-sidenav.component';

@Component({
  selector: 'app-studentpage',
  standalone: true,
  imports: [StudentheaderComponent,UserfooterComponent, StudentSidenavComponent, SharedModule],
  templateUrl: './studentdashboard.component.html',
  styleUrl: './studentdashboard.component.css'
})
export class StudentpageComponent {
  editForm: Boolean = false;
  categories: Categorie[] = [];
  updatedCatId! : number;
  ressources: Ressource[] = [];  // Initialisation de ressources pour éviter des erreurs
  ResourceToEdit: Ressource = new Ressource();
  commentText: string = '';

  constructor(private ressourceService: RessourceService,
  ) {}

ngOnInit(): void {
    this.loadRessources(); // Chargement des ressources à l'initialisation
}

  //charger les ressources
  loadRessources(){
    this.ressourceService.listeCategories().
    subscribe(result => {this.categories = result;
    });

    this.ressourceService.listeRessource().subscribe(result => {
      this.ressources = result;
    });
    }

      // Supprime une ressource
supprimerRessource(p: Ressource) {
  let conf = confirm('Etes-vous sûr de vouloir supprimer cette ressource ?');
  if (conf) {
    this.ressourceService.supprimerRessource(p.id).subscribe({
      next: () => {
        alert('Ressource supprimée');
        this.loadRessources(); // Recharger les ressources après suppression
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la ressource:', err);
        if (err.status === 404) {
          alert('La ressource n\'existe pas ou a déjà été supprimée.');
        } else if (err.status === 500) {
          alert('Une erreur serveur est survenue. Veuillez réessayer plus tard.');
        } else {
          alert('Une erreur est survenue lors de la suppression de la ressource.');
        }
      },
    });
  }
}

getFileSize(ByteSize:number):String {
  if ((ByteSize / Math.pow(1024,2)) >= 1) {
    return (ByteSize / Math.pow(1024,2)).toFixed(2) + " MB";
  }
  return (ByteSize / 1024).toFixed(2) + " KB";
}

updateRessource(prod: Ressource): void { // or rename the HTML to match this method's new name
  this.ResourceToEdit.categorie = this.categories.find(cat => cat.id == this.updatedCatId)!;
  console.log(prod);
  
   this.ressourceService.updateRessource(prod.id, prod).subscribe({
    next:(response) => {
         console.log('Resource updated successfully', response);
     },
     error:(error) => {
         console.error('Error updating resource'); // Log the complete error object
         console.error('Error details:', error.error); // Log the error body, if available
     }
    }
 );
}

toggleEdit(r:Ressource) {
  this.editForm = !this.editForm;
  const editFormElement = document.getElementById("editForm") as HTMLDivElement;

  if (this.editForm) {
    const parentDiv = document.getElementById(`Res-${r.id}`) as HTMLDivElement;
    editFormElement.style.display="block";
    parentDiv.appendChild(editFormElement);
    this.ResourceToEdit = r;
  }
  else {
    editFormElement.style.display="none";
  }
}

}
