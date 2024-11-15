import { Component, OnInit } from '@angular/core';
import { Ressource } from 'src/app/model/ressource.model';
import { RessourceService } from '../../services/ressource.service';

@Component({
  selector: 'app-ressources',
  templateUrl: './ressources.component.html',
  styleUrls: ['./ressources.component.css'],  // Correction ici
})
export class RessourcesComponent implements OnInit {
  ressources: Ressource[] = [];  // Initialisation de ressources pour éviter des erreurs
  commentText: string = '';

  constructor(private ressourceService: RessourceService) {}

ngOnInit(): void {
    this.loadRessources();  // Chargement des ressources à l'initialisation
}

  // Charge les ressources depuis le service
  loadRessources(): void {
    this.ressourceService.getAllResources().subscribe(
      (data: Ressource[]) => {
        this.ressources = data; // Mise à jour du tableau des ressources
        console.log('Ressources chargées:', this.ressources); // Optionnel : pour voir les ressources dans la console
      },
      (error) => {
        console.error('Erreur lors du chargement des ressources:', error);  // Amélioration de la gestion des erreurs
        alert('Une erreur est survenue lors du chargement des ressources.');  // Affichage d'un message d'erreur générique
      }
    );
  }

  // Supprime une ressource
supprimerRessource(p: Ressource): void {
    let conf = confirm('Etes-vous sûr de vouloir supprimer cette ressource ?');
    if (conf) {
      this.ressourceService.supprimerRessource(p.id).subscribe({
        next: () => {
          console.log('Ressource supprimée');
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

  // Télécharge le fichier associé à une ressource
downloadRessourceFile(id: number): void {
    this.ressourceService.downloadFile(id).subscribe({
      next: (blob) => {
        let FileName:any;
        // get meta data de fichier
        this.ressourceService.consulterRessource(id).subscribe({
          next: (data) => {
            FileName = data.fileMetaData.fileName;

            // Création de l'URL pour le fichier blob
            const url = window.URL.createObjectURL(blob);
            // Création d'un lien pour le téléchargement
            const link = document.createElement('a');
            link.href = url;
            link.download = FileName;
            link.click();
            window.URL.revokeObjectURL(url); // supprimer l'URL après téléchargement
          },
          error: (err) => {
            console.error('Error fetching MetaData:', err);
          },
        })
      },
      error: (err) => {
        console.error('Échec du téléchargement du fichier:', err);
        alert('Échec du téléchargement du fichier.');
      },
    });
  }

  getFileSize(ByteSize:number):String {
    if ((ByteSize / Math.pow(1024,2)) >= 1) {
      return (ByteSize / Math.pow(1024,2)).toFixed(2) + " MB";
    }
    return (ByteSize / 1024).toFixed(2) + " KB";
  }
}
