package Gs_Data.project.com.Services;

import Gs_Data.project.com.Entities.Commentaire;
import Gs_Data.project.com.Entities.FileMetaData;
import Gs_Data.project.com.Entities.Ressource;
import Gs_Data.project.com.Repositories.FileMetaDataRepository;
import Gs_Data.project.com.Repositories.RessourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class RessourceService {
    @Autowired
    private RessourceRepository ressourceRepository;
    @Autowired
    private FileMetaDataRepository fileMetaDataRepository;

    public List<Ressource> findAll() {
        return ressourceRepository.findAll();
    }

    public Ressource findById(Long id) {
        return ressourceRepository.findById(id).orElse(null);
    }

    public boolean Modify(Long id,Ressource ressource) {
        Ressource r = findById(id);
        if (r != null) {
            // dateCreation & dateModification sont constant!
            r.setNom(ressource.getNom());
            r.setDescription(ressource.getDescription());
            r.setCategorie(ressource.getCategorie());
            return true;
        }
        return false;
    }

    public boolean Delete(Long id) {
        Ressource r = findById(id);
        if (r != null) {
            ressourceRepository.deleteById(r.getId());
            return true;
        }
        return false;
    }

    public Ressource save(Ressource ressource) {
        return ressourceRepository.save(ressource);
    }

    public boolean uploadFile(MultipartFile file, Long RessourceId) {
        try {

        Ressource TargetRessource = findById(RessourceId);

        FileMetaData meta = new FileMetaData();

        meta.setFileName(file.getOriginalFilename());
        meta.setFileType(file.getContentType());
        meta.setFileSize(file.getSize());
        meta.setFileUrl(null); // to change later
        meta.setRessource(TargetRessource);

        fileMetaDataRepository.save(meta);

        TargetRessource.setFileMetaData(meta);
        return true;
        }
        catch (Exception e) {
            return false;
        }
    }
}