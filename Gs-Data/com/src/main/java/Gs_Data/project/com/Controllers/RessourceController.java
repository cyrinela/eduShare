package Gs_Data.project.com.Controllers;

import Gs_Data.project.com.Entities.Ressource;
import Gs_Data.project.com.Services.RessourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ressources")
public class RessourceController {
    @Autowired
    private RessourceService ressourceService;

    @GetMapping
    public List<Ressource> getAll() {
        return ressourceService.findAll();
    }

    @PostMapping(path = "/add")
    public Ressource create(@RequestBody Ressource ressource) {
        return ressourceService.save(ressource);
    }
}
