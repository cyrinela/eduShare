import { Component } from '@angular/core';
import { Ressource } from '../../model/ressource.model';
import { RessourceService } from '../../services/ressource.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ressourcecontent',
  standalone: true,
  imports: [],
  templateUrl: './ressourcecontent.component.html',
  styleUrl: './ressourcecontent.component.css'
})
export class RessourcecontentComponent {
  currentRessource = new Ressource();
  RessourceId : any;

  ngOnInit(): void {
    this.RessourceId = this.activatedRoute.snapshot.params['id'];

    this.ressourceService
    .consulterRessource(this.RessourceId)
    .subscribe( result =>{ this.currentRessource = result; } ) ;
}

constructor(private ressourceService: RessourceService,private activatedRoute: ActivatedRoute) {}

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
