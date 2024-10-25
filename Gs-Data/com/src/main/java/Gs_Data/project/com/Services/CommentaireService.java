package Gs_Data.project.com.Services;

import Gs_Data.project.com.Entities.Commentaire;
import Gs_Data.project.com.Repositories.CommentaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentaireService {
    @Autowired
    private CommentaireRepository commentaireRepository;

    public List<Commentaire> findAll() {
        return commentaireRepository.findAll();
    }

    public Commentaire save(Commentaire commentaire) {
        return commentaireRepository.save(commentaire);
    }
}
