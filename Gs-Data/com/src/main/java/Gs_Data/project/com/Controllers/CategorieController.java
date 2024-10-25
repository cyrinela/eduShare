package Gs_Data.project.com.Controllers;

import Gs_Data.project.com.Entities.Categorie;
import Gs_Data.project.com.Services.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategorieController {
    @Autowired
    private CategorieService categorieService;

    @GetMapping
    public List<Categorie> getAll() {
        return categorieService.findAll();
    }

    @PostMapping(path = "/add")
    public Categorie create(@RequestBody Categorie categorie) {
        return categorieService.save(categorie);
    }
}
