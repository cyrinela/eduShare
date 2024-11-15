import { Categorie } from "./categorie.model";
import { fileMetaData } from "./fileMetaData.model";
export class Ressource {
  id! : number;
  nom! : string;
  description! : string;
  creeLe! : Date ;
  categorie! : Categorie;
  fileMetaData!: fileMetaData;
  //comments?: Commentaire[];
}
