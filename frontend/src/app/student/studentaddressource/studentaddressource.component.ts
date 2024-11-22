import { Component, HostListener } from '@angular/core';
import { StudentheaderComponent } from "../studentheader/studentheader.component";
import { UserfooterComponent } from '../../user/userfooter/userfooter.component';
import { finalize } from 'rxjs';
import { RessourceService } from '../../services/ressource.service';
import { Ressource } from '../../model/ressource.model';
import { Categorie } from '../../model/categorie.model';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StudentSidenavComponent } from '../student-sidenav/student-sidenav.component';
  
@Component({
    selector: 'app-studentaddressource',
    standalone: true,
    imports: [UserfooterComponent, StudentheaderComponent, StudentSidenavComponent, SharedModule],
    templateUrl: './studentaddressource.component.html',
    styleUrl: './studentaddressource.component.css'
  })

export class StudentaddressourceComponent implements OnInit, OnDestroy {
    selectedFile: File | null = null;
    newRessource = new Ressource();
    FileUploaded = true;
    categories! : Categorie[];
    newIdCat!:number;


  constructor(private ressourceService: RessourceService,
    private router :Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ){}

  ngOnInit(): void {
    this.ressourceService.listeCategories().
    subscribe(result => {this.categories = result;
    });

  }


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
        this.newRessource.categorie = this.categories.find(cat => cat.id == this.newIdCat)!;
        this.ressourceService.ajouterRessource(this.newRessource, this.selectedFile)
        .pipe(
          finalize(() => {
            this.FileUploaded = true;
            window.alert("File Uploaded!")
            this.router.navigate(['userpage']); // Redirect after success
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
  if (isPlatformBrowser(this.platformId)) {
    // Remove the listener only in the browser
    window.removeEventListener('beforeunload', this.unloadNotification);
  }
}

}
  