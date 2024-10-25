package Gs_Data.project.com.Controllers;

import Gs_Data.project.com.Entities.Commentaire;
import Gs_Data.project.com.Services.CommentaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/commentaires")
public class CommentaireController {
    @Autowired
    private CommentaireService commentaireService;

    @GetMapping
    public List<Commentaire> getAll() {
        return commentaireService.findAll();
    }

    @PostMapping(path = "/add")
    public Commentaire create(@RequestBody Commentaire commentaire) {
        return commentaireService.save(commentaire);
    }
}
