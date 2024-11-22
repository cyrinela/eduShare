import { Component, OnInit } from '@angular/core';
import { Ressource } from '../../model/ressource.model';
import { RessourceService } from '../../services/ressource.service';
import { SharedModule } from '../../shared.module';
import { Categorie } from '../../model/categorie.model';



@Component({
  selector: 'app-usercontent',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './usercontent.component.html',
  styleUrl: './usercontent.component.css'
})
export class UsercontentComponent implements OnInit {
  categories: Categorie[] = [];
  ressources: Ressource[] = [];  // Initialisation de ressources pour éviter des erreurs
  commentText: string = '';

  constructor(private ressourceService: RessourceService) {}

ngOnInit(): void {
    this.loadRessources(); // Chargement des ressources à l'initialisation
}

  //charger les ressources
  loadRessources(){
    this.ressourceService.listeCategories().
    subscribe(result => {this.categories = result;
    });

    this.ressourceService.listeRessource().subscribe(reso => {
      this.ressources = reso;
    });
    }


countCategorie(name:string):number {
  let result = 0;
  this.ressources.forEach(ressource => {
      if (ressource.categorie.nom === name) {
        result++;
      }
    });
  return result;
}

async filter() {
  let searchQuery:string;
  const result:any[] = [];
  const getAll:Boolean = (document.getElementById("categ-all") as HTMLInputElement).checked;

  for (let i = 0; i < this.categories.length; i++) {
    searchQuery = (document.getElementById("categName-"+i) as HTMLLabelElement).innerHTML;
    if (!getAll && (document.getElementById("categ-"+i) as HTMLInputElement).checked) {
      const data = await this.ressourceService.searchRessources(searchQuery, "true").toPromise();
      result.push(...data || []);
    }
    else if (getAll) {
      const data = await this.ressourceService.searchRessources(searchQuery, "true").toPromise();
      result.push(...data || []);
    }
  }
  
  this.ressources = result;
}


async search() {
  let result:Ressource[] = [];
  let searchQuery:string = (document.getElementById("search") as HTMLInputElement).value;
  result = await this.ressourceService.searchRessources(searchQuery,"false").toPromise() as Ressource[];
  this.ressources = result;
}

}
