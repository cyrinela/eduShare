package Gs_Data.project.com.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "fileMetaData")
public class FileMetaData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fileName;
    @Column(nullable = false)
    private String fileType;
    @Column(nullable = false)
    private Long fileSize;

    private String fileUrl;

    @OneToOne(mappedBy = "fileMetaData")
    private Ressource ressource;
}
