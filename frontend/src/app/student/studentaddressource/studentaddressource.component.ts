import { Component, HostListener, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StudentfooterComponent } from "../studentfooter/studentfooter.component";
import { StudentheaderComponent } from "../studentheader/studentheader.component";
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Categorie } from '../../model/categorie.model'; 
import { Ressource } from '../../model/ressource.model';
import { RessourceService } from '../../services/ressource.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-studentaddressource',
  standalone: true,
  imports: [StudentfooterComponent, StudentheaderComponent, FormsModule],
  templateUrl: './studentaddressource.component.html',
  styleUrl: './studentaddressource.component.css'
})
export class StudentaddressourceComponent implements OnInit, OnDestroy {
  selectedFile: File | null = null;
  newRessource = new Ressource();
  FileUploaded = true;
  categories!: Categorie[];
  newIdCat!: number;
  newCategorie!: Categorie;
  message: string = "";
  private isBrowser: boolean;

  constructor(
    private ressourceService: RessourceService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Check if the platform is browser
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.ressourceService.listeCategories().subscribe(cats => {
      this.categories = cats;
      console.log(cats);
    });
  }

  // Method to handle file input change
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Get the selected file
    }
  }

  addRessource() {
    if (this.selectedFile) {
      console.log('Resource to add:', this.newRessource);
      console.log('Selected file:', this.selectedFile);
      this.newRessource.categorie = this.categories.find(cat => cat.id == this.newIdCat)!;
      this.ressourceService.ajouterRessource(this.newRessource, this.selectedFile)
        .pipe(
          finalize(() => {
            this.FileUploaded = true;
            if (this.isBrowser) {
              window.alert("File Uploaded!");
            }
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
    if (this.isBrowser && !this.FileUploaded) {
      $event.returnValue = 'Upload in progress. Are you sure you want to leave?';
    }
  }

  ngOnDestroy(): void {
    // Cleanup: remove any active listeners to prevent memory leaks
    if (this.isBrowser) {
      window.removeEventListener('beforeunload', this.unloadNotification);
    }
  }
}
