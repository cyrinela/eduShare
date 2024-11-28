import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Categorie } from '../model/categorie.model';
import { Ressource } from '../model/ressource.model';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} ),
  withCredentials: true 
};

const PassCredentials = { 
  withCredentials: true 
}


@Injectable({
  providedIn: 'root'
})

export class RessourceService {
  apiURL: string = 'http://localhost:8888/GS-DATA/ressources';
  apiURLCat: string = 'http://localhost:8888/GS-DATA/categories';


  ressources: Ressource[] =[];
 categories! : Categorie[];

  constructor(private http : HttpClient) {}

  listeRessource(): Observable<Ressource[]>{
    return this.http.get<Ressource[]>(this.apiURL,PassCredentials);
  }

  listeCategories():Observable<Categorie[]>{
    return this.http.get<Categorie[]>(this.apiURLCat,PassCredentials);
  }

  searchRessources(query: string,searchCategorie: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/search?query=${query}&searchCategorie=${searchCategorie}`,PassCredentials);
  }


ajouterRessource(reso: Ressource, file: File) {
    const formData: FormData = new FormData();

    // Append the Ressource object as JSON
    formData.append('ressource', new Blob([JSON.stringify(reso)], { type: 'application/json' }));
    // Append the file
    formData.append('file', file);


    return this.http.post(`${this.apiURL}/add`, formData,PassCredentials);
  }



uploadFile(file: File, fileUrlId: string): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('file', file);
  formData.append('fileUrlId', fileUrlId); // Append the resource ID or another identifier

  return this.http.post(`${this.apiURL}/upload`, formData, PassCredentials);
}

supprimerRessource(id: number): Observable<any> {
      const url = `${this.apiURL}/${id}`;
      console.log(`Attempting to delete resource at: ${url}`);
      return this.http.delete<any>(url,PassCredentials);
  }

consulterRessource(id: number): Observable<Ressource> {
        const url = `${this.apiURL}/${id}`;
        return this.http.get<Ressource>(url,PassCredentials);
}

trierRessources() {
  this.ressources = this.ressources.sort((n1,n2) => {
    if (n1.id! > n2.id!) {
      return 1;
    }
    if (n1.id! < n2.id!) {
      return -1;
    }
    return 0;
  });
}


updateRessource(id: number, prod: Ressource) {
  const url = `${this.apiURL}/${id}`;
  return this.http.put(url, prod, PassCredentials);
}

downloadFile(id: number) {
    const url = `${this.apiURL}/download/${id}`;
    return this.http.get(url, {
      responseType: 'blob', // This is important to handle binary data
      withCredentials: true
    });
}

ajouterCategorie( cat: Categorie):Observable<Categorie>{
  return this.http.post<Categorie>(this.apiURLCat, cat, httpOptions);
  }

}
