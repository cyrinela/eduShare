package com.example.users;

import com.example.users.entities.Role;
import com.example.users.entities.User;
import com.example.users.service.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
public class UsersMicroserviceApplication {
	@Autowired
	UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(UsersMicroserviceApplication.class, args);
	}

	@PostConstruct
	void init_DB_DATA() {
        //ajouter les rôles
		if (userService.findByRole("ADMIN") == null) {
			userService.addRole(new Role(null, "ADMIN"));
		}
		if (userService.findByRole("USER") == null) {
			userService.addRole(new Role(null, "USER"));
		}

		if (userService.findUserByUsername("admin") == null) {
			//ajouter les users
			userService.saveUser(new User(null, "admin","123", true, null));
			//ajouter les rôles aux users
			userService.addRoleToUser("admin", "ADMIN");
			userService.addRoleToUser("admin", "USER");
		}
	}
}