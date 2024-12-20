import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie } from '../../model/categorie.model'; // Ensure this import is present
import { AuthService } from '../../services/auth/auth.service';
import { KeycloakService } from '../../services/keycloak.service';
import { RessourceService } from '../../services/ressource.service';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './admin-add-categorie.component.html',
  styleUrls: ['./admin-add-categorie.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class AdminAddCategorieComponent implements OnInit {
  categories: Categorie[] = [];
  newCategory: Categorie = { id: 0, nom: '', description: '' }; // Initialize with a blank category object
  constructor(private ressourceService: RessourceService,private http: HttpClient,private router: Router, private keycloakService: KeycloakService ,private authService : AuthService ) {}



  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.ressourceService.listeCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories:', error);
        alert('Failed to load categories. Please try again.');
      }
    );
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.ressourceService.deleteCategorie(id).subscribe(
        () => {
          alert('Category deleted successfully!');
          this.loadCategories(); // Reload the categories after deletion
        },
        (error) => {
          console.error('Error deleting category:', error);
          alert('Category deletion failed!');
        }
      );
    }
  }

  addCategory(): void {
    if (this.newCategory.nom.trim() === '' && this.newCategory.description.trim() === '') {
      alert('Category name cannot be empty.');
      return;
    }

    // Passer seulement l'objet newCategory à la méthode ajouterCategorie
    this.ressourceService.ajouterCategorie(this.newCategory).subscribe(
      (newCategory) => {
        this.categories.push(newCategory); // Ajouter la nouvelle catégorie à la liste
        alert('Category added successfully!');
        this.newCategory.nom = '';
        this.newCategory.description = '';// Réinitialiser le champ de formulaire
      },
      (error) => {
        console.error('Error adding category:', error);
        alert('Failed to add category. Please try again.');
      }
    );
  }

  logout() {
    this.authService.logout().subscribe({
      next: (success) => {
        alert("Logged out successfully!")
        this.router.navigate(["/userpage"]);
      },
      error: (err) => {
        if (err.status == 200) {
          alert("Logged out successfully!")
          this.router.navigate(["/userpage"]);
        }
      }
    })
  }
}
