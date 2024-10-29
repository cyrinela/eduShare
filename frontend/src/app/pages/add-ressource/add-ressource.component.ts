import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ressource } from 'src/app/model/ressource.model';
import { RessourceService } from '../../services/ressource.service';

@Component({
  selector: 'app-add-ressource',
  templateUrl: './add-ressource.component.html',
  styleUrl: './add-ressource.component.scss'
})
export class AddRessourceComponent implements OnInit {

  newRessource: Ressource = new Ressource();
 // categories! : Categorie[];
  newIdCat!:number;
//newCategorie! : Categorie;


  message :string="";
  constructor(private ressourceService: RessourceService,
    private router :Router,
  ){}
  ngOnInit(): void {
    //this.categories = this.ressourceService.listeCategories();

  }


   addRessource(){
      this.ressourceService.ajouterRessource(this.newRessource)
      .subscribe(reso => {
      console.log(reso);
      this.router.navigate(['ressources']);
      });
      }


/*
      addRessource() {
        this.ressourceService.ajouterRessource(this.newRessource).subscribe(
          (reso) => {
            console.log('Ressource ajoutée avec succès :', reso);
            this.router.navigate(['ressources']); // Navigation après succès
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de la ressource :', error);
            // Vous pouvez ici afficher un message d'erreur à l'utilisateur
          }
        );
      }

*/

}
