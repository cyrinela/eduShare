package Gs_Data.project.com.Repositories;

import Gs_Data.project.com.Entities.StudyGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyGroupRepository extends JpaRepository<StudyGroup, Long> {
}
