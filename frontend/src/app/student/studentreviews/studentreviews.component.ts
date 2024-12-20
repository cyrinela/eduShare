import { Component } from '@angular/core';
import { StudentheaderComponent } from "../studentheader/studentheader.component";
import { StudentfooterComponent } from "../studentfooter/studentfooter.component";
import { SharedModule } from '../../shared.module';
import { StudentSidenavComponent } from '../student-sidenav/student-sidenav.component';
import { CommentService } from '../../services/utilities/comment.service';

@Component({
  selector: 'app-studentreviews',
  standalone: true,
  imports: [StudentheaderComponent, StudentfooterComponent, SharedModule, StudentSidenavComponent],
  templateUrl: './studentreviews.component.html',
  styleUrl: './studentreviews.component.css'
})
export class StudentreviewsComponent {

  reviews: any;

  ngOnInit(): void {
    this.loadResources();
  }

  constructor(private commentService: CommentService) {}

  loadResources() {
    this.commentService.loadMyReviews(JSON.parse(localStorage.getItem('userInfo')!).username).subscribe({
      next: (success) => {
        this.reviews = success;
      }
    })
  }

  getFilledStars (rating: number): number[] {
    return Array.from({ length: rating });
  }

  getUnfilledStars (rating: number): number[] {
    return Array.from({ length: (5-rating) });
  }

}
