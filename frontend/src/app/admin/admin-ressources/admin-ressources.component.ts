import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Status } from '../../model/ressource.model';
import { AuthService } from '../../services/auth/auth.service';
import { KeycloakService } from '../../services/keycloak.service';
import { RessourceService } from '../../services/ressource.service';

@Component({
  selector: 'app-admin-ressources',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './admin-ressources.component.html',
  styleUrls: ['./admin-ressources.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class AdminRessourcesComponent implements OnInit {
  ressources: any[] = [];
  statuses = [Status.EN_ATTENTE, Status.ACCEPTE, Status.REFUSE];  // Use the enum directly

  constructor(private ressourceService: RessourceService,private http: HttpClient,private router: Router, private keycloakService: KeycloakService ,private authService : AuthService ) {}

  ngOnInit(): void {
    this.loadRessources();
  }

  private loadRessources(): void {
    this.ressourceService.listeRessource().subscribe(
      (data) => {
        this.ressources = data;
      },
      (error) => {
        console.error('Error loading resources:', error);
        alert('Failed to load resources. Please try again.');
      }
    );
  }

  deleteRessource(id: number): void {
    if (confirm('Are you sure you want to delete this resource?')) {
      this.ressourceService.supprimerRessource(id).subscribe(
        () => {
          alert('Resource deleted successfully!');
          this.loadRessources(); // Reload the resources after deletion
        },
        (error) => {
          console.error('Error deleting resource:', error);
          alert('Failed to delete resource. Please try again.');
        }
      );
    }
  }

  updateStatus(id: number, status: Status): void {  // Use Status enum here
    this.ressourceService.updateStatus(id, status).subscribe(
      (updatedRessource) => {
        const index = this.ressources.findIndex((r) => r.id === id);
        if (index !== -1) {
          this.ressources[index].status = updatedRessource.status;
        }
        alert('Resource status updated successfully!');
      },
      (error) => {
        console.error('Error updating status:', error);
        alert('Failed to update resource status. Please try again.');
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
