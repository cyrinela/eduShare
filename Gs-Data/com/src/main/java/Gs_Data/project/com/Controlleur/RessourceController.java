package Gs_Data.project.com.Controlleur;

import Gs_Data.project.com.Entities.Ressource;
import Gs_Data.project.com.Services.RessourceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ressources")
public class RessourceController {
    private final RessourceService ressourceService;

    public RessourceController(RessourceService ressourceService) {
        this.ressourceService = ressourceService;
    }

    @GetMapping
    public List<Ressource> getAll() {
        return ressourceService.findAll();
    }

    @PostMapping
    public Ressource create(@RequestBody Ressource ressource) {
        return ressourceService.save(ressource);
    }

    // Autres endpoints pour la gestion des ressources
}
