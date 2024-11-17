import { Component, OnInit } from '@angular/core';
import { Ressource } from '../../model/ressource.model';
import { RessourceService } from '../../services/ressource.service';
import { SharedModule } from '../../shared.module';



@Component({
  selector: 'app-usercontent',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './usercontent.component.html',
  styleUrl: './usercontent.component.css'
})
export class UsercontentComponent implements OnInit {

  ressources: Ressource[] = [];  // Initialisation de ressources pour éviter des erreurs
  commentText: string = '';

  constructor(private ressourceService: RessourceService) {}

ngOnInit(): void {
    this.loadRessources(); // Chargement des ressources à l'initialisation
}

  //charger les ressources
  loadRessources(){
    this.ressourceService.listeRessource().subscribe(reso => {
    console.log(reso);
    this.ressources = reso;
    });
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
