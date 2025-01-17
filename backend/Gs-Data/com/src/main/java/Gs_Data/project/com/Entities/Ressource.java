package Gs_Data.project.com.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Ressource {
    @Id
    private Long id;
    private String nom;
    private String description;

    private Status status = Status.EN_ATTENTE; // Default status

    // Getters and setters
    public enum Status {
        EN_ATTENTE, ACCEPTE, REFUSE
    }


    @ManyToOne
    @JoinColumn(name = "categorie_id")
    private Categorie categorie;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    @JsonManagedReference
    private FileMetaData fileMetaData;

    @CreationTimestamp
    private LocalDateTime creeLe;
    @UpdateTimestamp
    private LocalDateTime modifieLe;

    /**/

    public Status getStatus() {
        return status;
    }
    public void setStatus(Status status) {
        this.status = status;
    }
}