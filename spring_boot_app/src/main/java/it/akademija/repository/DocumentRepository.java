package it.akademija.repository;

import it.akademija.entity.Document;
import it.akademija.entity.Type;
import it.akademija.entity.UserDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    Document findByTitle(String title);
    Document findByuniqueNumber(String uniqueNumber);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email", nativeQuery = true)
    List<Document> findAllUserDocumentsl(@Param("email") String email);


}
//    SELECT DOCUMENT.TITLE, USER.EMAIL FROM DOCUMENT
//        JOIN USER_DOCUMENT  ON USER_DOCUMENT.DOCUMENT_ID =DOCUMENT.ID
//        JOIN USER ON USER.ID = USER_DOCUMENT.USER_ID;