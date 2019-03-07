package it.akademija.repository;

import it.akademija.entity.Document;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long>, JpaSpecificationExecutor<Document> {



    Document findByTitle(String title);
    Document findByuniqueNumber(String uniqueNumber);

    List<Document> findByCreatedDate(Date createdDate, Pageable pageable);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email", nativeQuery = true)
    List<Document> findAllUserDocumentsl(@Param("email") String email);

    @Query(value="select COUNT (*) FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email", nativeQuery = true)
    int getUserDocumentCount(@Param("email") String email);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND  ud.submitted = true", nativeQuery = true)
    List<Document> findAllUserSubmittedDocumentsl(@Param("email") String email);

    @Query(value="select count (*) FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND  ud.submitted = true", nativeQuery = true)
    int getUserSubmittedDocumentCount(@Param("email") String email);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND  ud.confirmed = true", nativeQuery = true)
    List<Document> findAllUserConfirmedDocumentsl(@Param("email") String email);

    @Query(value="select count(*) FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND  ud.confirmed = true", nativeQuery = true)
    int getUserConfirmedDocumentCount(@Param("email") String email);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND  ud.rejected = true", nativeQuery = true)
    List<Document> findAllUserRejectedDocumentsl(@Param("email") String email);

    @Query(value="select count (*) FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND  ud.rejected = true", nativeQuery = true)
    int getUserRejectedDocumentCount(@Param("email") String email);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) WHERE ud.submitted = true AND d.type_id IN (SELECT t.id FROM type t JOIN type_group tg ON (t.id = tg.type_id) JOIN users_groups ug ON (tg.group_id=ug.group_id) JOIN user u ON (ug.user_id = u.id) WHERE u.email=:email AND receive=true group by t.id)", nativeQuery = true)
    List<Document> findReceivedUserDocuments(@Param("email") String email);

//    SELECT COUNT(*) FROM DOCUMENT as d JOIN USER_DOCUMENT as ud ON d.id = ud.document_id JOIN TYPE  ON d.TYPE_ID = TYPE.id  WHERE TYPE.id = 37 AND ud.submitted = 'true'   ;
    @Query(value="select count(*) FROM document d join user_document ud ON (d.id = ud.document_id) joint type t ON (d.type_id = t.id) WHERE t.title =:title AND ud.submitted =true", nativeQuery = true)
    int findCountByDocumentTitleAndStatus(@Param("title") String title);

//    @Query(value="select count(*) FROM document d join user_document ud ON (d.id = ud.document_id) joint type t ON (d.type_id = t.id) WHERE t.title =:title AND ud.submitted =:status", nativeQuery = true)
//    int findCountByDocumentTitleAndStatus(DocumentSpec documentSpec, Pageable pageable);
}

