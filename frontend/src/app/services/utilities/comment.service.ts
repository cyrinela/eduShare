import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  apiURL: string = 'http://localhost:8888/GS-UTILITIES';
  baseURL: string = 'http://localhost:4500';


  constructor(private http : HttpClient) {}

  addComment(newComment : any) : Observable<any> {
    return this.http.post(`${this.baseURL}/comments/add`, newComment);
  }

  loadComments(ResourceId: number) : Observable<any> {
    return this.http.get(`${this.baseURL}/comments/all?id=${ResourceId}`);
  }

  deleteComment(commentId: string,ResourceId: number, UserId: string) : Observable<any> { 
    return this.http.delete(`${this.baseURL}/comments?commentId=${commentId}&resId=${ResourceId}&userId=${UserId}`);
  }

  loadReviews(ResourceId: number): Observable<any> {
    return this.http.get(`${this.baseURL}/reviews/all?id=${ResourceId}`);
  }

  addReview(newReview : any) : Observable<any> {
    return this.http.post(`${this.baseURL}/reviews/add`, newReview);
  }
}
