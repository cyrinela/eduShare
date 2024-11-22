import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Categorie } from '../model/categorie.model';
import { Ressource } from '../model/ressource.model';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};




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
    return this.http.get<Ressource[]>(this.apiURL);
  }

  listeCategories():Observable<Categorie[]>{
    return this.http.get<Categorie[]>(this.apiURLCat);
  }

  searchRessources(query: string,searchCategorie: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/search?query=${query}&searchCategorie=${searchCategorie}`);
  }


ajouterRessource(reso: Ressource, file: File) {
    const formData: FormData = new FormData();

    // Append the Ressource object as JSON
    formData.append('ressource', new Blob([JSON.stringify(reso)], { type: 'application/json' }));
    // Append the file
    formData.append('file', file);


    return this.http.post(`${this.apiURL}/add`, formData);
  }



uploadFile(file: File, fileUrlId: string): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('file', file);
  formData.append('fileUrlId', fileUrlId); // Append the resource ID or another identifier

  return this.http.post(`${this.apiURL}/upload`, formData,
    {
      responseType: 'text',
    });
}


  /*  supprimerRessource(id: number): Observable<any> {
      const url = `${this.apiURL}/${id}`;
      console.log(`Attempting to delete resource at: ${url}`);
      return this.http.delete(url, httpOptions).pipe(
          catchError(error => {
              console.error('Erreur lors de la suppression:', error);
              return throwError(error); // Rethrow the error for further handling
          })
      );
  }*/

supprimerRessource(id: number): Observable<any> {
      const url = `${this.apiURL}/${id}`;
      console.log(`Attempting to delete resource at: ${url}`);
      return this.http.delete<any>(url);
  }

consulterRessource(id: number): Observable<Ressource> {
        const url = `${this.apiURL}/${id}`;
        return this.http.get<Ressource>(url);
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
  return this.http.put(url, prod);
}

downloadFile(id: number) {
    const url = `${this.apiURL}/download/${id}`;
    return this.http.get(url, {
      responseType: 'blob' // This is important to handle binary data
    });
}

ajouterCategorie( cat: Categorie):Observable<Categorie>{
  return this.http.post<Categorie>(this.apiURLCat, cat, httpOptions);
  }

}
