package it.akademija.repository;

import it.akademija.dto.UserDTO;
import it.akademija.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
    User findBySurname(String surname);

    void deleteBySurname(String surname);

    void deleteByEmail(String email);

    Boolean existsByEmail(String email);

    int getUserDocumentDetails(@Param("email") String email);



}
