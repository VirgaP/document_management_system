package it.akademija.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import it.akademija.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
    User findBySurname(String surname);

    void deleteBySurname(String surname);

    void deleteByEmail(String email);

    Boolean existsByEmail(String email);

    int getUserDocumentDetails(@Param("email") String email);



}
