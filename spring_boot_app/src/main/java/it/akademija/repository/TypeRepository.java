package it.akademija.repository;

import it.akademija.entity.Type;
import it.akademija.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.List;

@Repository
public interface TypeRepository extends JpaRepository<Type, Long> {
    Type findByTitle(String title);
//    @Query("select u from User u join Document d where TITLE(d.title) =:title")
////    List<Type> getUserGroupTypes(@Param("title") String title);

    @Query(value="SELECT * FROM type t JOIN type_group tg ON (t.id = tg.type_id) JOIN users_groups ug ON (tg.group_id=ug.group_id) JOIN user u ON (ug.user_id = u.id) WHERE u.email=:email", nativeQuery = true)
    List<Type> getUserGroupTypes(@Param("email") String email);

}

//    SELECT TYPE.TITLE , USER.EMAIL FROM TYPE
//        LEFT JOIN TYPE_GROUP ON TYPE_GROUP.TYPE_ID   = TYPE.ID
//        LEFT JOIN USERS_GROUPS  ON USERS_GROUPS.GROUP_ID  = TYPE_GROUP.GROUP_ID
//        LEFT JOIN USER ON USER.ID = USERS_GROUPS.USER_ID
//        WHERE USER.EMAIL='virga@email.com'
//        GROUP BY TYPE.TITLE, USER.EMAIL;