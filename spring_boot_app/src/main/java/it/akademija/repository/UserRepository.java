package it.akademija.repository;

import it.akademija.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findBySurname(String surname);


//    @Query("select u from User u join Document d where TITLE(d.title) =:title")
//    List<User> findByDocument(@Param("title") String title);

    void deleteBySurname(String surname);

    void deleteByEmail(String email);

    Boolean existsByEmail(String email);


}
