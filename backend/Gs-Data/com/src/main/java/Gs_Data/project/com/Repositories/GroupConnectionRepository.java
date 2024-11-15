package Gs_Data.project.com.Repositories;

import Gs_Data.project.com.Entities.CompositeKey;
import Gs_Data.project.com.Entities.GroupConnection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupConnectionRepository extends JpaRepository<GroupConnection, CompositeKey> {
    List<GroupConnection> findByUserIdNot(Long userId);
    List<GroupConnection> findByUserId(Long userId);
}
