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

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) WHERE ud.submitted = true AND d.type_id IN (SELECT t.id FROM type t JOIN type_group tg ON (t.id = tg.type_id) JOIN users_groups ug ON (tg.group_id=ug.group_id) JOIN user u ON (ug.user_id = u.id) WHERE u.email=:email AND receive=true group by t.id)", nativeQuery = true)
    List<Document> findReceivedUserDocuments(@Param("email") String email);

//    SELECT * FROM DOCUMENT JOIN USER_DOCUMENT ON DOCUMENT.ID = USER_DOCUMENT.DOCUMENT_ID  WHERE USER_DOCUMENT.SUBMITTED = true  AND
//    DOCUMENT.TYPE_ID  IN
//            (SELECT t.id FROM type as t JOIN type_group as tg ON t.id = tg.type_id JOIN users_groups as ug ON tg.group_id=ug.group_id JOIN user as u ON ug.user_id = u.id  WHERE u.email='virga@email.com' AND receive=true group by t.id);

}

