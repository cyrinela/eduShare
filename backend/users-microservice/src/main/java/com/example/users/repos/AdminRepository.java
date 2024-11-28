package com.example.users.repos;
import com.example.users.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    // Méthodes de recherche personnalisées si nécessaire
}

