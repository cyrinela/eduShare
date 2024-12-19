package Gs_Data.project.com.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class CompositeKey implements Serializable {
    @Column(name = "userId",nullable = false)
    private String userId;
    @Column(name = "groupId",nullable = false)
    private Long groupId;
}
