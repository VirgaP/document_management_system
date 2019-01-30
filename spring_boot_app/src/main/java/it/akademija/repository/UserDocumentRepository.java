package it.akademija.repository;

import it.akademija.entity.UserDocument;
import it.akademija.entity.UserDocumentId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDocumentRepository extends JpaRepository<UserDocument, UserDocumentId> {
//    List<InstitutionBook> findByInstitutionBookId(Long bookId);

}
