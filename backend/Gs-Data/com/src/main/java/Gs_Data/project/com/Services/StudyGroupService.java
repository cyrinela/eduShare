package Gs_Data.project.com.Services;

import Gs_Data.project.com.Entities.StudyGroup;
import Gs_Data.project.com.Repositories.StudyGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudyGroupService {

    private final StudyGroupRepository studyGroupRepository;

    @Autowired
    public StudyGroupService(StudyGroupRepository studyGroupRepository) {
        this.studyGroupRepository = studyGroupRepository;
    }

    // Créer un groupe
    public StudyGroup createGroup(StudyGroup group) {
        return studyGroupRepository.save(group);
    }

    // Récupérer tous les groupes
    public List<StudyGroup> getAllGroups() {
        return studyGroupRepository.findAll();
    }

    // Rejoindre un groupe
    public StudyGroup joinGroup(Long groupId, Long userId) {
        StudyGroup group = studyGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Groupe non trouvé"));
        group.setUserId(userId);  // Logique pour ajouter un utilisateur (ou membre) au groupe
        return studyGroupRepository.save(group);
    }
}