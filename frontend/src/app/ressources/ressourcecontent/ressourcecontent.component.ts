import { Component } from '@angular/core';
import { Ressource } from '../../model/ressource.model';
import { RessourceService } from '../../services/ressource.service';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { CommentService } from '../../services/utilities/comment.service';

@Component({
  selector: 'app-ressourcecontent',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './ressourcecontent.component.html',
  styleUrl: './ressourcecontent.component.css'
})
export class RessourcecontentComponent {
  currentRessource = new Ressource();
  RessourceId : any;

  newComment: string = "";
  comments: any;

  rating: any = 3;
  newReview: string = "";
  reviews: any;

  ngOnInit(): void {
    this.RessourceId = this.activatedRoute.snapshot.params['id'];

    this.ressourceService
    .consulterRessource(this.RessourceId)
    .subscribe( result =>{ this.currentRessource = result; } ) ;

    this.loadComments();
    this.loadReviews();
}

constructor(private ressourceService: RessourceService, private commentService: CommentService, private activatedRoute: ActivatedRoute) {}

  // Télécharge le fichier associé à une ressource
  downloadRessourceFile(id: number): void {
    this.ressourceService.downloadFile(id).subscribe({
      next: (blob) => {
        let FileName:any;
        // get meta data de fichier
        this.ressourceService.consulterRessource(id).subscribe({
          next: (data) => {
            FileName = data.fileMetaData.fileName;

            // Création de l'URL pour le fichier blob
            const url = window.URL.createObjectURL(blob);
            // Création d'un lien pour le téléchargement
            const link = document.createElement('a');
            link.href = url;
            link.download = FileName;
            link.click();
            window.URL.revokeObjectURL(url); // supprimer l'URL après téléchargement
          },
          error: (err) => {
            console.error('Error fetching MetaData:', err);
          },
        })
      },
      error: (err) => {
        console.error('Échec du téléchargement du fichier:', err);
        alert('Échec du téléchargement du fichier.');
      },
    });
  }

  getFileSize(ByteSize:number):String {
    if ((ByteSize / Math.pow(1024,2)) >= 1) {
      return (ByteSize / Math.pow(1024,2)).toFixed(2) + " MB";
    }
    return (ByteSize / 1024).toFixed(2) + " KB";
  }

  addComment() {
    if (this.newComment != "") {
      this.commentService.addComment({
        text: this.newComment,
        userId: JSON.parse(localStorage.getItem('userInfo')!).username,
        RessourceId: this.RessourceId
      }).subscribe({
        next: (success) => {
          console.log("Comment added successfully");
        },
        error: (err) => {
          if (err.status == 201) {
            alert("comment added!")
          }
          console.error("error occured", err);
        }
      })
    }
  }

  loadComments() {
    this.commentService.loadComments(this.RessourceId).subscribe({
      next: (success) => {
        this.comments = success;
        console.log(this.comments);
      },
      error: (err) => {
        console.error("No comments are found");
      }
    })
  }

  deleteComment(commentId: string) {
    this.commentService.deleteComment(commentId, this.RessourceId, JSON.parse(localStorage.getItem('userInfo')!).username).subscribe({
      next: (success) => {
        console.log("comment deleted successfully");
      },
      error: (err) => {
        console.error("error occured");
      }
    })
  }

  loadReviews() {
    this.commentService.loadReviews(this.RessourceId).subscribe({
      next: (success) => {
        this.reviews = success;
        console.log(this.reviews);
      },
      error: (err) => {
        console.error("No reviews are found");
      }
    })
  }

  addReview() {
    this.commentService.addReview({
      rating: this.rating,
      text: this.newReview,
      userId: JSON.parse(localStorage.getItem('userInfo')!).username,
      RessourceId: this.RessourceId
    }).subscribe({
      next: (success) => {
        console.log("Review added successfully");
      },
      error: (err) => {
        if (err.status == 201) {
          alert("Review added!")
        }
        console.error("error occured", err);
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
