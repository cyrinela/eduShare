package Gs_Data.project.com.Services;

import Gs_Data.project.com.Entities.Categorie;
import Gs_Data.project.com.Repositories.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategorieService {
    @Autowired
    private CategorieRepository categorieRepository;

    public List<Categorie> findAll() {
        return categorieRepository.findAll();
    }

    public Categorie save(Categorie categorie) {
        return categorieRepository.save(categorie);
    }
}
