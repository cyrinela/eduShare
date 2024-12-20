// Define the Status enum to match the backend
export enum Status {
  EN_ATTENTE = "EN_ATTENTE",
  ACCEPTE = "ACCEPTE",
  REFUSE = "REFUSE"
}

// Import other models
import { Categorie } from "./categorie.model";
import { fileMetaData } from "./fileMetaData.model";

// Define the Ressource model
export class Ressource {
  id!: number;
  nom!: string;
  description!: string;
  status!: Status;
  creeLe!: Date;
  categorie!: Categorie;
  fileMetaData!: fileMetaData;

}

