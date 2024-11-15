import { Component, OnInit } from '@angular/core';
import { RessourceService } from 'src/app/services/ressource.service';

@Component({
  selector: 'app-recherche-categorie-ressource',
  templateUrl: './recherche-categorie-ressource.component.html',
  styleUrl: './recherche-categorie-ressource.component.css'
})
export class RechercheCategorieRessourceComponent implements OnInit{
  query: string = '';  // User's search query
  ressources: any[] = [];
constructor(private ressourceService: RessourceService){}
ngOnInit(): void {

}

onSearch(): void {
  if (this.query.trim()) {
    // Call the searchRessources method and pass the query
    this.ressourceService.searchRessources(this.query).subscribe(data => {
      this.ressources = data;  // Update the list of resources
    });
  } else {
    this.ressources = [];  // Clear results if query is empty
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
}
