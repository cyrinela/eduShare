package Gs_Data.project.com.Services;

import Gs_Data.project.com.Entities.StudyGroup;
import Gs_Data.project.com.Repositories.StudyGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;

@Service
public class StudyGroupService {
    @Autowired
    private StudyGroupRepository studyGroupRepository;

    // Créer un groupe
    public StudyGroup createGroup(StudyGroup group) {
        group.setCode(GenerateCode());
        return studyGroupRepository.save(group);
    }

    // Récupérer tous les groupes
    public List<StudyGroup> getAllGroups() {
        return studyGroupRepository.findAll();
    }

    // Rejoindre un groupe
    public boolean joinGroup(Long groupId,String code,Long userId) {
        StudyGroup group = studyGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Groupe non trouvé"));
        if (group.getCode().matches(code)) {
            return true;
        }
        return false;
    }

    private String GenerateCode() {
        SecureRandom generator = new SecureRandom();
        Long code = generator.nextLong();
        return Long.toHexString(code).substring(0,10);
    }
}