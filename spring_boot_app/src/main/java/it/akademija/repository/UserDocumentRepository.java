package it.akademija.repository;

import it.akademija.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserDocumentRepository extends JpaRepository<UserDocument, UserDocumentId> {

   @Query(value="select * FROM user_document ud join user u ON (ud.user_id = u.id) WHERE u.email=:email", nativeQuery = true)
   List<UserDocument> findByUserEmail(@Param("email") String email);

}

// retrun number of created documents by user
//   SELECT COUNT (DOCUMENT_ID)
//   FROM USER_DOCUMENT JOIN USER ON USER_DOCUMENT.USER_ID = USER.ID
//        WHERE USER.EMAIL ='virga@email.com';
//AND USER_DOCUMENT.SUBMITTED = true ; //number of submitted documents
