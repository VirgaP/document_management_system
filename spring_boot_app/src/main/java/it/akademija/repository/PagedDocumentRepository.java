package it.akademija.repository;

import it.akademija.entity.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface PagedDocumentRepository extends PagingAndSortingRepository<Document, Long> {

//    Pageable pageable = PageRequest.of(0, 10);
    Page<Document> findAll(Pageable pageable);

    @Query("select count(d) from Document d")
    Long findCount();

//    List<Document> findPageResultByDate (Date createdDate, int offset, int limit);
}
