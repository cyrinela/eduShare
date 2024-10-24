package Gs_Data.project.com.Services;

import Gs_Data.project.com.Entities.Categorie;
import Gs_Data.project.com.Repositories.CategorieRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategorieService {
    private final CategorieRepository categorieRepository;

    public CategorieService(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }

    public List<Categorie> findAll() {
        return categorieRepository.findAll();
    }

    public Categorie save(Categorie categorie) {
        return categorieRepository.save(categorie);
    }

    // Autres méthodes pour la gestion des catégories
}
