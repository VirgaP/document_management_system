package it.akademija.repository;

import it.akademija.entity.Book;
import it.akademija.entity.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Book findByTitle(String title);

    @Query("select b from Book b join Institution i where TITLE(i.title) =:title")
    List<Book> findByInstitution(@Param("title") String title);

    void deleteByTitle(String title);

}

