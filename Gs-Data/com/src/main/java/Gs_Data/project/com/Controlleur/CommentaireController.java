package Gs_Data.project.com.Controlleur;

import Gs_Data.project.com.Entities.Commentaire;
import Gs_Data.project.com.Services.CommentaireService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commentaires")
public class CommentaireController {
    private final CommentaireService commentaireService;

    public CommentaireController(CommentaireService commentaireService) {
        this.commentaireService = commentaireService;
    }

    @GetMapping
    public List<Commentaire> getAll() {
        return commentaireService.findAll();
    }

    @PostMapping
    public Commentaire create(@RequestBody Commentaire commentaire) {
        return commentaireService.save(commentaire);
    }

    // Autres endpoints pour la gestion des commentaires
}
