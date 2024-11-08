package Gs_Data.project.com.Controllers;

import Gs_Data.project.com.Entities.StudyGroup;
import Gs_Data.project.com.Services.StudyGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/groups")
public class StudyGroupController {

    private final StudyGroupService studyGroupService;

    @Autowired
    public StudyGroupController(StudyGroupService studyGroupService) {
        this.studyGroupService = studyGroupService;
    }

    // API pour créer un groupe
    @PostMapping("/create")
    public StudyGroup createGroup(@RequestBody StudyGroup group) {
        // Appel du service pour créer le groupe
        return studyGroupService.createGroup(group);
    }

    // Méthode pour récupérer tous les groupes
    @GetMapping("/all")
    public List<StudyGroup> getAllGroups() {
        return studyGroupService.getAllGroups();
    }

    // Méthode pour rejoindre un groupe
    @PostMapping("/join/{groupId}")
    public StudyGroup joinGroup(@PathVariable Long groupId, @RequestParam Long userId) {
        // Appel du service pour rejoindre un groupe
        return studyGroupService.joinGroup(groupId, userId);
    }
}