import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudyGroupService {
  private apiUrl = 'http://localhost:8100/api/groups'; // L'URL de ton backend

  constructor(private http: HttpClient) {}

  // Méthode pour créer un groupe
  createGroup(group: { name: string; description: string; code: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, group);
  }
   // Méthode pour récupérer tous les groupes
   getAllGroups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  // Méthode pour rejoindre un groupe
  joinGroup(groupId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/join/${groupId}?userId=${userId}`, {});
  }
}
