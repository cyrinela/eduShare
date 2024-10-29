import { Component, OnInit } from '@angular/core';
import { Ressource } from 'src/app/model/ressource.model';
import { RessourceService } from '../../services/ressource.service';

@Component({
  selector: 'app-ressources',
  templateUrl: './ressources.component.html',
  styleUrl: './ressources.component.scss'
})
export class RessourcesComponent implements OnInit {
  ressources! : Ressource[];
  constructor(private ressourceService: RessourceService ){
   //this.ressources =[];

   //this.ressources = this.ressourceService.listeRessources();
  }
  ngOnInit(): void {
    this.ressourceService.listeRessource().subscribe(reso => {
      console.log(reso);
      this.ressources = reso;
      this.chargerRessources();

      });
  }

  chargerRessources(){
    this.ressourceService.listeRessource().subscribe(reso => {
    console.log(reso);
    this.ressources = reso;
    });
    }



  supprimerRessource(p: Ressource)
  {
  let conf = confirm("Etes-vous sûr ?");
  if (conf)
  this.ressourceService.supprimerRessource(p.id).subscribe(() => {
  console.log("produit supprimé");
  this.chargerRessources();
  });
  }




}

