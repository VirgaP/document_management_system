package it.akademija.repository;

import it.akademija.entity.Book;
import it.akademija.entity.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InstitutionRepository extends JpaRepository<Institution, String> {
    Institution findByTitle(String title);

}
