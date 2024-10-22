package Gs_Data.project.com.Entities;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Commentaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String contenu;
    private LocalDateTime dateCreation;

    @ManyToOne
    @JoinColumn(name = "ressource_id")
    private Ressource ressource;

    private Long utilisateurId = 1L; // ID utilisateur statique

}
