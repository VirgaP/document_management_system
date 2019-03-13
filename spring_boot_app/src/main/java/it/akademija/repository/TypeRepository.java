package it.akademija.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.akademija.entity.Type;

@Repository
public interface TypeRepository extends JpaRepository<Type, Long> {
    Type findByTitle(String title);
//    @Query("select u from User u join Document d where TITLE(d.title) =:title")
////    List<Type> getUserGroupTypes(@Param("title") String title);

    @Query(value="SELECT * FROM type t JOIN type_group tg ON (t.id = tg.type_id) JOIN users_groups ug ON (tg.group_id=ug.group_id) JOIN user u ON (ug.user_id = u.id) WHERE u.email=:email AND send=true", nativeQuery = true)
    List<Type> getUserGroupTypes(@Param("email") String email);

    @Query(value="SELECT * FROM type t JOIN type_group tg ON (t.id = tg.type_id) JOIN users_groups ug ON (tg.group_id=ug.group_id) JOIN user u ON (ug.user_id = u.id) WHERE u.email=:email AND receive=true", nativeQuery = true)
    List<Type> getUserReceivingGroupTypes(@Param("email") String email);

    Boolean existsByTitle(String title);
}

//    SELECT TYPE.TITLE , USER.EMAIL FROM TYPE
//        LEFT JOIN TYPE_GROUP ON TYPE_GROUP.TYPE_ID   = TYPE.ID
//        LEFT JOIN USERS_GROUPS  ON USERS_GROUPS.GROUP_ID  = TYPE_GROUP.GROUP_ID
//        LEFT JOIN USER ON USER.ID = USERS_GROUPS.USER_ID
//        WHERE USER.EMAIL='virga@email.com'
//        GROUP BY TYPE.TITLE, USER.EMAIL;