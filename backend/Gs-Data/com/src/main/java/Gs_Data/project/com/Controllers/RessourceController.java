package Gs_Data.project.com.Controllers;

import Gs_Data.project.com.Entities.Commentaire;
import Gs_Data.project.com.Entities.Ressource;
import Gs_Data.project.com.Services.RessourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*")
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
        return ResponseEntity.status(404).body("error occurred");
    }

    @PostMapping(path = "/add", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE }, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> create(@RequestPart(name = "ressource") Ressource ressource,
                                         @RequestPart(name = "file") MultipartFile file) throws IOException {
        if (ressourceService.save(ressource,file)) {
            return ResponseEntity.ok("Ressource saved");
        }
        return ResponseEntity.status(404).body("error occurred");
    }

    @GetMapping(path = "/download/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) {
        GridFsResource ResultFile = ressourceService.downloadFile(id);
        if (ResultFile != null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(ResultFile.getContentType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + ResultFile.getFilename() + "\"")
                    .body(ResultFile);
        }
        return ResponseEntity.status(500).body(null);
    }
}
