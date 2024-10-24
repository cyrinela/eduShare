package Gs_Data.project.com.Services;

import Gs_Data.project.com.Entities.Ressource;
import Gs_Data.project.com.Repositories.RessourceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RessourceService {
    private final RessourceRepository ressourceRepository;

    public RessourceService(RessourceRepository ressourceRepository) {
        this.ressourceRepository = ressourceRepository;
    }

    public List<Ressource> findAll() {
        return ressourceRepository.findAll();
    }

    public Ressource save(Ressource ressource) {
        return ressourceRepository.save(ressource);
    }

    // Autres méthodes pour la gestion des ressources
}