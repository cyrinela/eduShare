package Gs_Data.project.com.Controllers;

import Gs_Data.project.com.Entities.StudyGroup;
import Gs_Data.project.com.Services.StudyGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/groups")
public class StudyGroupController {

    private final StudyGroupService studyGroupService;

    @Autowired
    public StudyGroupController(StudyGroupService studyGroupService) {
        this.studyGroupService = studyGroupService;
    }

    // API pour créer un groupe
    @PostMapping("/create/{audience}")
    public StudyGroup createGroup(
            @PathVariable String audience,
            @RequestBody StudyGroup group) {
        return studyGroupService.createGroup(group,audience);
    }

    // Méthode pour récupérer tous les groupes
    @GetMapping("/all")
    public List<StudyGroup> getAllGroups() {
        return studyGroupService.getUnjoinedGroups();
    }

    // Méthode pour récupérermygrou les groupes joinée
    @GetMapping("/mygroups")
    public List<StudyGroup> getJoinedGroups() {
        return studyGroupService.getJoinedGroups();
    }

    // Méthode pour rejoindre un groupe
    @PostMapping("/join/{groupId}")
    public ResponseEntity<?> joinGroup(@PathVariable Long groupId,
                                    @RequestParam("userId") Long userId,
                                    @RequestParam("code") String code ) {
        // Appel du service pour rejoindre un groupe
        if (studyGroupService.joinGroup(groupId,code, userId)) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "you've joined the request group");
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

    @GetMapping("/exit")
    public ResponseEntity<?> leaveGroup(
            @RequestParam("userId") Long userId,
            @RequestParam("groupId") Long groupId) {
        try {
            studyGroupService.LeaveGroup(userId,groupId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "you've exited the request group");
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}