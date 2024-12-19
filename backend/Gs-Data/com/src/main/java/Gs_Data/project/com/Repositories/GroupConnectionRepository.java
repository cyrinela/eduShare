package Gs_Data.project.com.Repositories;

import Gs_Data.project.com.Entities.CompositeKey;
import Gs_Data.project.com.Entities.GroupConnection;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Transactional
@Repository
public interface GroupConnectionRepository extends JpaRepository<GroupConnection, CompositeKey> {
    @Query("SELECT e FROM GroupConnection e WHERE e.userId <> :userId AND e.groupId NOT IN (SELECT e2.groupId FROM GroupConnection e2 WHERE e2.userId = :userId)")
    List<GroupConnection> findByUserIdNot(@Param("userId") String userId);

    List<GroupConnection> findByUserId(String userId);

    void deleteByUserIdAndGroupId(String UserId, Long groupId);
}
