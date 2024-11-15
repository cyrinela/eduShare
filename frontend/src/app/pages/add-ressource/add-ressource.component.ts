import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Ressource } from 'src/app/model/ressource.model';
import { RessourceService } from '../../services/ressource.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-ressource',
  templateUrl: './add-ressource.component.html',
  styleUrl: './add-ressource.component.css'
})
export class AddRessourceComponent implements OnInit {
  selectedFile: File | null = null;
  newRessource = new Ressource();
  FileUploaded = true;
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

        this.ressourceService.ajouterRessource(this.newRessource, this.selectedFile)
        .pipe(
          finalize(() => {
            this.FileUploaded = true;
            window.alert("File Uploaded!")
            this.router.navigate(['ressources']); // Redirect after success
          })
        )
        .subscribe({
              next: () => {
                this.FileUploaded = false;
              },
              error: (err) => {
                console.error('Error uploading file:', err);
              },
        });
    } else {
        console.error('No file selected.'); // Handle no file selected case
    }
}


// Listen for the beforeunload event to warn the user
@HostListener('window:beforeunload', ['$event'])
unloadNotification($event: any): void {
  if (!this.FileUploaded) {
    $event.returnValue = 'Upload in progress. Are you sure you want to leave?';
  }
}

ngOnDestroy(): void {
  // Cleanup: remove any active listeners to prevent memory leaks
  window.removeEventListener('beforeunload', this.unloadNotification);
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
  // uploadFile(id: number, file: File) {
  //   this.ressourceService.uploadFile(file, id.toString()).subscribe({
      
  // });
  // }

}
