package Gs_Data.project.com.Repositories;

import Gs_Data.project.com.Entities.Ressource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RessourceRepository extends JpaRepository<Ressource, Long> {
    // Search by resource name starting with the given letters (case-insensitive)
    List<Ressource> findByNomStartingWithIgnoreCase(String nom);

    // Search by category name starting with the given letters (case-insensitive)
    List<Ressource> findByCategorieNomStartingWithIgnoreCase(String categorieNom);

    /**/
    @Query("SELECT r FROM Ressource r WHERE r.status = 'ACCEPTE'")
    List<Ressource> findAllAcceptedResources();
}
