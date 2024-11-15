import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/model/categorie.model';
import { Ressource } from 'src/app/model/ressource.model';
import { RessourceService } from './../../services/ressource.service';
@Component({
  selector: 'app-update-ressource',
  templateUrl: './update-ressource.component.html',
   styleUrl: './update-ressource.component.css',
  providers: [DatePipe]
})
export class UpdateRessourceComponent implements OnInit {

  currentRessource = new Ressource();
  updatedCatId! : number;
  categories!: Categorie[];


  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,
    private ressourceService: RessourceService){
 }

  ngOnInit(): void {
    this.ressourceService.listeCategories().
    subscribe(cats => {this.categories = cats;
    console.log(cats);
    });
   this.ressourceService.consulterRessource(this.activatedRoute.snapshot.params['id']).
 subscribe( reso =>{ this.currentRessource = reso; } ) ;


  }



  updateRessource(prod: Ressource): void { // or rename the HTML to match this method's new name
   this.currentRessource.categorie = this.categories.find(cat => cat.id == this.updatedCatId)!;
    this.ressourceService.updateRessource(prod.id, prod).subscribe(
      (response) => {
          console.log('Resource updated successfully', response);
      },
      (error) => {
          console.error('Error updating resource:', error); // Log the complete error object
          console.error('Error details:', error.error); // Log the error body, if available
      }
  );
  this.router.navigate(['ressources']);
}




}
