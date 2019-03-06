package it.akademija.repository;

import it.akademija.entity.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface PagedDocumentRepository extends PagingAndSortingRepository<Document, Long> {

    Page<Document> findAll(Pageable pageable);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email", nativeQuery = true)
    Page<Document> findAllUserDocumentsPage(@Param("email") String email, Pageable pageable);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND  ud.submitted = true", nativeQuery = true)
    Page<Document> findAllUserSubmittedDocumentsPage(@Param("email") String email, Pageable pageable);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND  ud.confirmed = true", nativeQuery = true)
    Page<Document> findAllUserConfirmedDocumentsPage(@Param("email") String email, Pageable pageable);


    @Query("select count(d) from Document d")
    Long findCount();

//    List<Document> findPageResultByDate (Date createdDate, int offset, int limit);
}
