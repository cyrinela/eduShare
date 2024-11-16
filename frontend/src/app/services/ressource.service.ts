import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Ressource } from 'src/app/model/ressource.model';
import { Categorie } from '../model/categorie.model';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};




@Injectable({
  providedIn: 'root'
})

export class RessourceService {
  apiURL: string = 'http://localhost:8100/ressources';
  apiURLCat: string = 'http://localhost:8100/categories';


  ressources: Ressource[] =[];
 categories! : Categorie[];

  constructor(private http : HttpClient) {

    }



listeRessource(): Observable<Ressource[]>{
  return this.http.get<Ressource[]>(this.apiURL);
  }
  listeCategories():Observable<Categorie[]>{
    return this.http.get<Categorie[]>(this.apiURLCat);
  }
    searchRessources(query: string): Observable<any[]> {
      const params = new HttpParams().set('query', query);
      return this.http.get<any[]>(`${this.apiURL}/search`, { params });
    }


  ajouterRessource(reso: Ressource, file: File) {
            const formData: FormData = new FormData();

            // Append the Ressource object as JSON
            formData.append('ressource', new Blob([JSON.stringify(reso)], { type: 'application/json' }));
            // Append the file
            formData.append('file', file);


            return this.http.post(`${this.apiURL}/add`, formData,
              {
                reportProgress: true,
                observe: 'events',

              });
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
     /* deleteRessource(id: number): Observable<any> {
        return this.http.delete(`${this.apiURL}/${id}`);
      }*/

supprimerRessource(id: number): Observable<any> {
      const url = `${this.apiURL}/${id}`;
      console.log(`Attempting to delete resource at: ${url}`);
      return this.http.delete(url, httpOptions).pipe(
          catchError(error => {
              console.error('Erreur lors de la suppression:', error);
              return throwError(error); // Rethrow the error for further handling
          })
      );
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

getAllResources(): Observable<Ressource[]> {
  return this.http.get<Ressource[]>(this.apiURL);
}


updateRessource(id: number, prod: Ressource): Observable<Ressource> {
  const url = `${this.apiURL}/${id}`;
  return this.http.put<Ressource>(url, prod, httpOptions);
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
