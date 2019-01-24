package it.akademija.repository;

import it.akademija.entity.InstitutionBook;
import it.akademija.entity.InstitutionBookId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InstitutionBookRepository extends JpaRepository<InstitutionBook, InstitutionBookId> {
//    List<InstitutionBook> findByInstitutionBookId(Long bookId);

}
