import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { KeycloakService } from '../../services/keycloak.service';
import { RessourceService } from '../../services/ressource.service';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class AdminCategoriesComponent implements OnInit {
  categories: any[] = [];


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
          alert('Category deleted successfully!');
        }
      );
    }
  }
/*
  updateCategory(id: number, updatedName: string): void {
    if (updatedName.trim() === '') {
      alert('Category name cannot be empty.');
      return;
    }

    this.ressourceService.updateCategory(id, { name: updatedName }).subscribe(
      (updatedCategory) => {
        const index = this.categories.findIndex((c) => c.id === id);
        if (index !== -1) {
          this.categories[index] = updatedCategory;
        }
        alert('Category updated successfully!');
      },
      (error) => {
        console.error('Error updating category:', error);
        alert('Failed to update category. Please try again.');
      }
    );
  }*/
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
