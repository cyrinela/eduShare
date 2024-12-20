import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Categorie } from '../model/categorie.model';
import { Ressource } from '../model/ressource.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

const PassCredentials = {
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class RessourceService {
  apiURL: string = 'http://localhost:8888/GS-DATA/ressources';
  apiURLCat: string = 'http://localhost:8888/GS-DATA/categories';

  ressources: Ressource[] = [];
  categories!: Categorie[];

  constructor(private http: HttpClient) {}

  // Get the Auth Headers with token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Ensure the token is stored after login
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Fetch all resources
  listeRessource(): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(this.apiURL, PassCredentials);
  }

  // Fetch all categories
  listeCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiURLCat, PassCredentials);
  }

  // Search resources by query and category
  searchRessources(query: string, searchCategorie: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/search?query=${query}&searchCategorie=${searchCategorie}`, PassCredentials);
  }

  // Add a new resource with file upload
  ajouterRessource(reso: Ressource, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('ressource', new Blob([JSON.stringify(reso)], { type: 'application/json' }));
    formData.append('file', file);

    return this.http.post(`${this.apiURL}/add`, formData, PassCredentials);
  }

  // Upload file for an existing resource
  uploadFile(file: File, fileUrlId: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('fileUrlId', fileUrlId); // Append resource ID or another identifier

    return this.http.post(`${this.apiURL}/upload`, formData, PassCredentials);
  }

  // Delete a resource by ID
  supprimerRessource(id: number): Observable<any> {
    const url = `${this.apiURL}/${id}`;
    console.log(`Attempting to delete resource at: ${url}`);
    return this.http.delete<any>(url, PassCredentials);
  }

  // Fetch details of a single resource
  consulterRessource(id: number): Observable<Ressource> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Ressource>(url, PassCredentials);
  }

  // Sort resources by ID
  trierRessources() {
    this.ressources = this.ressources.sort((n1, n2) => {
      if (n1.id! > n2.id!) {
        return 1;
      }
      if (n1.id! < n2.id!) {
        return -1;
      }
      return 0;
    });
  }

  // Update an existing resource
  updateRessource(id: number, prod: Ressource): Observable<any> {
    const url = `${this.apiURL}/${id}`;
    return this.http.put(url, prod, PassCredentials);
  }

  // Download file for a specific resource
  downloadFile(id: number): Observable<Blob> {
    const url = `${this.apiURL}/download/${id}`;
    return this.http.get(url, {
      responseType: 'blob', // This is important for handling binary data
      withCredentials: true
    });
  }

  // Add a new category
 /* ajouterCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiURLCat, cat, httpOptions);
  }*//*
    ajouterCategorie(cat: Categorie): Observable<Categorie> {
      return this.http.post<Categorie>(this.apiURLCat, cat, PassCredentials);
    }*/
      ajouterCategorie(cat: Categorie): Observable<Categorie> {
        const PassCredentials = {
          headers: this.getAuthHeaders(),
          withCredentials: true
        };

        return this.http.post<Categorie>(this.apiURLCat, cat, PassCredentials);
      }

  // Update status of a resource using Status enum
  updateStatus(id: number, status: string): Observable<Ressource> {
    const url = `${this.apiURL}/${id}/status`;
    const body = { status: status }; // Send the status as part of the body
    console.log(`Attempting to update status for resource at: ${url} with status: ${status}`);

    return this.http.put<Ressource>(url, body, PassCredentials).pipe(
      catchError((error) => {
        console.error('Error updating resource status:', error);
        alert('Failed to update resource status. Please try again.');
        throw error;
      })
    );
  }
  deleteCategorie(id: number): Observable<string> {
    const url = `${this.apiURLCat}/delete/${id}`;
    console.log(`Attempting to delete category at: ${url}`);
    return this.http.get<string>(url, PassCredentials).pipe(
      catchError((error) => {
        console.error('Error deleting category:', error);
        alert('Delete avec success');
        throw error;
      })
    );
  }



}

