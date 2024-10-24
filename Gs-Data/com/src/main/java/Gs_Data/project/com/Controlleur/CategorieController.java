package Gs_Data.project.com.Controlleur;

import Gs_Data.project.com.Entities.Categorie;
import Gs_Data.project.com.Services.CategorieService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategorieController {
    private final CategorieService categorieService;

    public CategorieController(CategorieService categorieService) {
        this.categorieService = categorieService;
    }

    @GetMapping
    public List<Categorie> getAll() {
        return categorieService.findAll();
    }

    @PostMapping
    public Categorie create(@RequestBody Categorie categorie) {
        return categorieService.save(categorie);
    }

    // Autres endpoints pour la gestion des catégories
}
