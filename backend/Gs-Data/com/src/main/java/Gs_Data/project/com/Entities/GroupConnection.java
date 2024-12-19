package Gs_Data.project.com.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@IdClass(CompositeKey.class)
public class GroupConnection {
    @EmbeddedId
    private String userId;

    @EmbeddedId
    private Long groupId;
}
