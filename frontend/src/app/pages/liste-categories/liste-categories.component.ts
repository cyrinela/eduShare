import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/model/categorie.model';
import { RessourceService } from 'src/app/services/ressource.service';

@Component({
  selector: 'app-liste-categories',
  templateUrl: './liste-categories.component.html',
  styleUrl: './liste-categories.component.css'
})
export class ListeCategoriesComponent implements OnInit {
  updatedCat:Categorie = {"id":0,"nom":""};
  categories! : Categorie[];
  ajout:boolean=true;

  constructor(private ressourceService : RessourceService) { }
  ngOnInit(): void {
    this.ressourceService.listeCategories().
    subscribe(cats => {this.categories = cats;
    console.log(cats);
    });

  }

  categorieUpdated(cat:Categorie){
    console.log("Cat updated event",cat);
    this.ressourceService.ajouterCategorie(cat).
     subscribe( ()=> this.chargerCategories());
    }
    chargerCategories(){
      this.ressourceService.listeCategories().
      subscribe(cats => {this.categories = cats;
        console.log(cats);
      });
      }
      updateCat(cat:Categorie) {
        this.updatedCat=cat;
        this.ajout=false;
        }

}
