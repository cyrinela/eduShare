import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ressource } from 'src/app/model/ressource.model';
import { RessourceService } from './../../services/ressource.service';
@Component({
  selector: 'app-update-ressource',
  templateUrl: './update-ressource.component.html',
  styles: ``,
  providers: [DatePipe]
})
export class UpdateRessourceComponent implements OnInit {

  currentRessource = new Ressource();
  //categories! : Categorie[];
  updatedCatId! : number;



  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,
    private ressourceService: RessourceService){
 }

  ngOnInit(): void {
    //console.log(this.activatedRoute.snapshot.params['id']);
   // this.categories = this.ressourceService.listeCategories();
   this.ressourceService.consulterRessource(this.activatedRoute.snapshot.params['id']).
 subscribe( reso =>{ this.currentRessource = reso; } ) ;
    //console.log(this.currentRessource);

  }


  updateRessource(){
   // console.log(this.currentRessource);
  // this.currentRessource.categorie=this.ressourceService.consulterCategorie(this.updatedCatId);
  this.ressourceService.updateRessource(this.currentRessource).subscribe(reso => {
    this.router.navigate(['ressources']); }
    );

  }




}
