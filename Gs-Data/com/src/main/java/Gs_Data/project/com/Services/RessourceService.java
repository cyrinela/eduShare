package Gs_Data.project.com.Services;

import Gs_Data.project.com.Entities.Ressource;
import Gs_Data.project.com.Repositories.RessourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RessourceService {
    @Autowired
    private RessourceRepository ressourceRepository;

    public List<Ressource> findAll() {
        return ressourceRepository.findAll();
    }

    public Ressource save(Ressource ressource) {
        return ressourceRepository.save(ressource);
    }
}