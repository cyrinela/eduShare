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
  createGroup(group: { name: string; description: string, userId: string}, audience : string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create/${audience}`, group, PassCredentials);
  }
   // Méthode pour récupérer tous les groupes
   getAllGroups(): Observable<any[]> {
    const userId = JSON.parse(localStorage.getItem('userInfo')!).id;
    // set Payload data
    const payload = new FormData();
    payload.append('userId', userId);

    return this.http.post<any[]>(`${this.apiUrl}/all`,payload ,PassCredentials);
  }

  // Méthode pour récupérer les groupes joinée
  getMyGroups(): Observable<any[]> {
    const userId = JSON.parse(localStorage.getItem('userInfo')!).id;
    // set Payload data
    const payload = new FormData();
    payload.append('userId', userId);

    return this.http.post<any[]>(`${this.apiUrl}/mygroups`,payload ,PassCredentials);
  }

  // Méthode pour rejoindre un groupe
  joinGroup(groupId: number, body: FormData) {
    return this.http.post(`${this.apiUrl}/join/${groupId}`, body, PassCredentials);
  }

  leaveGroup(userId: string, groupId: number) {
    return this.http.get(`${this.apiUrl}/exit?userId=${userId}&groupId=${groupId}`, PassCredentials);
  }
}
