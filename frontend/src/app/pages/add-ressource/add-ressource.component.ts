import { HttpErrorResponse } from '@angular/common/http';
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
  selectedFile: File | null = null;
  newRessource = new Ressource();
// categories! : Categorie[];
  //newIdCat!:number;
//newCategorie! : Categorie;


  message :string="";
  constructor(private ressourceService: RessourceService,
    private router :Router,
  ){}
  ngOnInit(): void {
    //this.categories = this.ressourceService.listeCategories();
    /*this.ressourceService.listeCategories().
    subscribe(cats => {console.log(cats);
    this.categories = cats._embedded.categories;
    }
    );
*/
  }


    /*addRessource(){
      this.ressourceService.ajouterRessource(this.newRessource)
      .subscribe(reso => {
      console.log(reso);
      this.router.navigate(['ressources']);
      });
      }*/

// Method to handle file input change
onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Get the selected file
    }
}




  /****** */
addRessource() {
    if (this.selectedFile) {
        console.log('Resource to add:', this.newRessource);
        console.log('Selected file:', this.selectedFile);
 //this.newRessource.categorie = this.categories.find(cat => cat.idCat == this.newIdCat)!;
        this.ressourceService.ajouterRessource(this.newRessource, this.selectedFile)
            .subscribe(
                response => {
                    console.log('Resource added successfully:', response);
                    this.router.navigate(['ressources']);
                },
                error => {
                    console.error('Error adding resource:', error); // Check the error details
                    this.router.navigate(['ressources']);}
            );
    } else {
        console.error('No file selected.'); // Handle no file selected case
    }
}


  /**** */
  // Method to add resource
  /*addRessource() {
    if (this.selectedFile) {
        console.log('Resource to add:', this.newRessource);
        console.log('Selected file:', this.selectedFile);
 //this.newRessource.categorie = this.categories.find(cat => cat.idCat == this.newIdCat)!;
        this.ressourceService.ajouterRessource(this.newRessource, this.selectedFile)
            .subscribe(
                response => {
                    console.log('Resource added successfully:', response);
                    this.router.navigate(['ressources']);
                },
                error => {
                    console.error('Error adding resource:', error); // Check the error details
                }
            );
    } else {
        console.error('No file selected.'); // Handle no file selected case
    }
}*/
  uploadFile(id: number, file: File) {
    this.ressourceService.uploadFile(file, id.toString()).subscribe(
      response => {
        console.log('File uploaded successfully:', response);
        this.router.navigate(['ressources']); // Redirect after success
      },
      (error: HttpErrorResponse) => {
        console.error('Error uploading file:', error);
      }
    );
  }

}
