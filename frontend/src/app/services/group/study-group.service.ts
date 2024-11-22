import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudyGroupService {
  private apiUrl = 'http://localhost:8888/GS-DATA/groups';

  constructor(private http: HttpClient) {}

  // Méthode pour créer un groupe
  createGroup(group: { name: string; description: string}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, group);
  }
   // Méthode pour récupérer tous les groupes
   getAllGroups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getMyGroups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mygroups`);
  }

  // Méthode pour rejoindre un groupe
  joinGroup(groupId: number, body: FormData) {
    return this.http.post(`${this.apiUrl}/join/${groupId}`, body);
  }
}
