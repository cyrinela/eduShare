import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const PassCredentials = { 
  withCredentials: true 
}

@Injectable({
  providedIn: 'root',
})

export class StudyGroupService {
  private apiUrl = 'http://localhost:8888/GS-DATA/groups';

  constructor(private http: HttpClient) {}

  // Méthode pour créer un groupe
  createGroup(group: { name: string; description: string}, audience : string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create/${audience}`, group, PassCredentials);
  }
   // Méthode pour récupérer tous les groupes
   getAllGroups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`, PassCredentials);
  }

  getMyGroups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mygroups`, PassCredentials);
  }

  // Méthode pour rejoindre un groupe
  joinGroup(groupId: number, body: FormData) {
    return this.http.post(`${this.apiUrl}/join/${groupId}`, body, PassCredentials);
  }

  leaveGroup(userId: number, groupId: number) {
    return this.http.get(`${this.apiUrl}/exit?userId=${userId}&groupId=${groupId}`, PassCredentials);
  }
}
