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

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) join users_groups ug ON (u.id = ug.user_id) JOIN type_group tg ON (ug.group_id = tg.group_id) join type t ON (tg.type_id = t.id) WHERE u.email=:email AND tg.receive=true", nativeQuery = true)
    List<Document> findReceivedUserDocuments(@Param("email") String email);

}

//    @Query(value="SELECT * FROM type t JOIN type_group tg ON (t.id = tg.type_id) JOIN users_groups ug ON (tg.group_id=ug.group_id) JOIN user u ON (ug.user_id = u.id) WHERE u.email=:email AND receive=true", nativeQuery = true)
//    List<Type> getUserReceivingGroupTypes(@Param("email") String email);