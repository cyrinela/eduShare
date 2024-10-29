import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ressource } from 'src/app/model/ressource.model';


const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};




@Injectable({
  providedIn: 'root'
})

export class RessourceService {
  apiURL: string = 'http://localhost:8888/GS-DATA/ressources';

  ressources!: Ressource[];
 // categories : Categorie[];

  constructor(private http : HttpClient) {
  /*  this.categories=[{idCat : 1, nomCat : "PC"},
                    {idCat : 2, nomCat : "Imprimante"}];*/
  /*  this.ressources = [
        {idProduit : 1, nomProduit : "PC Asus", prixProduit : 3000.600, dateCreation : new Date("01/14/2011"),
          categorie : {idCat : 1, nomCat : "PC"}},
        {idProduit : 2, nomProduit : "Imprimante Epson", prixProduit : 450, dateCreation : new Date("12/17/2010"),
          categorie : {idCat : 2, nomCat : "Imprimante"} },
        {idProduit : 3, nomProduit :"Tablette Samsung", prixProduit : 900.123, dateCreation : new Date("02/20/2020"),
          categorie : {idCat : 1, nomCat : "PC"}}

                      ];*/
    }



listeRessource(): Observable<Ressource[]>{
  return this.http.get<Ressource[]>(this.apiURL);
  }


  ajouterRessource( reso: Ressource):Observable<Ressource>{
    return this.http.post<Ressource>(this.apiURL, reso, httpOptions);
    }


  /**   ajouterRessource(reso: Ressource): Observable<Ressource> {
      return this.http.post<Ressource>(`${this.apiURL}/add`, reso, httpOptions);
  }*/

    supprimerRessource(id : number) {
      const url = `${this.apiURL}/${id}`;
      return this.http.delete(url, httpOptions);
      }


      consulterRessource(id: number): Observable<Ressource> {
        const url = `${this.apiURL}/${id}`;
        return this.http.get<Ressource>(url);
        }

      trierRessources(){
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
        updateRessource(prod :Ressource) : Observable<Ressource>
        {
        return this.http.put<Ressource>(this.apiURL, prod, httpOptions);
        }



}
