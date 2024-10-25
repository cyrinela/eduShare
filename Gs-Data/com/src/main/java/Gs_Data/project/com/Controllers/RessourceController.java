package Gs_Data.project.com.Controllers;

import Gs_Data.project.com.Entities.Commentaire;
import Gs_Data.project.com.Entities.Ressource;
import Gs_Data.project.com.Services.RessourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{id}")
    public Ressource findById(@PathVariable Long id) {
        return ressourceService.findById(id);
    }

    @PostMapping("/modify/{id}")
    public ResponseEntity<String> modify(@RequestBody Ressource ressource, @PathVariable Long id) {
        if (ressourceService.Modify(id,ressource)) {
            return ResponseEntity.ok("Ressource modified");
        }
        return ResponseEntity.status(404).body("error occurred");
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        if (ressourceService.Delete(id)) {
            return ResponseEntity.ok("Ressource deleted");
        }
        return ResponseEntity.ok("error occurred");
    }

    @PostMapping(path = "/add")
    public Ressource create(@RequestBody Ressource ressource) {
        return ressourceService.save(ressource);
    }
}
