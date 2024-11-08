import { Component, OnInit } from '@angular/core';
import { Ressource } from 'src/app/model/ressource.model';
import { RessourceService } from '../../services/ressource.service';
@Component({
  selector: 'app-ressources',
  templateUrl: './ressources.component.html',
  styleUrl: './ressources.component.scss',
  styles: [`
    .data-container {
        display: flex;
        flex-direction: column;
        gap: 16px; /* Space between cards */
    }
    .card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .card-body {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .card-title {
        font-size: 1.25rem;
        margin: 0 0 8px;
    }
    .card-text {
        margin: 0 0 16px;
    }
    button {
        margin-right: 8px;
        background-color: #007bff;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
    }
    button:hover {
        background-color: #0056b3;
    }
  `]
})
export class RessourcesComponent implements OnInit {
  ressources! : Ressource[];


  commentText: string = '';
  constructor(private ressourceService: RessourceService,
   ){

   //this.ressources =[];

   //this.ressources = this.ressourceService.listeRessources();
  }
  ngOnInit(): void {
   /* this.ressourceService.listeRessource().subscribe(reso => {
      console.log(reso);
      this.ressources = reso;
      this.chargerRessources();

      });*/

      this.loadRessources();
      this.chargerRessources();
      /*this.loadRessources();
      this.chargerRessources();*/
  }

  chargerRessources(){
    this.ressourceService.listeRessource().subscribe(reso => {
    console.log(reso);
    this.ressources = reso;
    });
    }



    supprimerRessource(p: Ressource) {
      let conf = confirm("Etes-vous sûr ?");
      if (conf) {
          this.ressourceService.supprimerRessource(p.id).subscribe({
              next: () => {
                  console.log("Produit supprimé");
                  this.chargerRessources(); // Reload resources
              },
              error: (err) => {
                  console.error("Erreur lors de la suppression:", err);
                  if (err.status === 404) {
                      alert("Le produit n'existe pas ou a déjà été supprimé.");
                  } else if (err.status === 500) {
                      alert("Une erreur serveur est survenue. Veuillez réessayer plus tard.");
                  } else {
                      alert("Une erreur est survenue lors de la suppression du produit.");
                  }
              }
          });
      }
  }
downloadRessourceFile(id: number) {
    this.ressourceService.downloadFile(id).subscribe({
      next: (blob) => {
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element to trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'filename.pdf'; // Optionally, set a filename here
        link.click();

        // Clean up the URL object
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('File download failed:', err);
      }
    });
  }

  loadRessources() {
    this.ressourceService.getAllResources().subscribe(
      (data: Ressource[]) => { // Specify that data is an array of Ressource
        this.ressources = data; // Assign the fetched data to the ressources array
        //this.ressources.forEach(resource => this.loadComments(resource.id)); // Load comments for each resource
      },
      (error) => {
        console.error('Error fetching resources:', error);
      }
    );
  }









}
