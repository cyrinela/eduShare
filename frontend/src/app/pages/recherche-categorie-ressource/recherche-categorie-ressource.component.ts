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
}
