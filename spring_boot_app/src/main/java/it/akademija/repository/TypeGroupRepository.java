package it.akademija.repository;

import it.akademija.entity.TypeGroup;
import it.akademija.entity.TypeGroupId;
import it.akademija.entity.UserDocument;
import it.akademija.entity.UserDocumentId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TypeGroupRepository extends JpaRepository<TypeGroup, TypeGroupId> {
}

//        SELECT TYPE_GROUP.TYPE_ID, TYPE.TITLE , USER.EMAIL FROM TYPE_GROUP
//        LEFT JOIN TYPE ON TYPE.ID = TYPE_GROUP.TYPE_ID
//        LEFT JOIN USERS_GROUPS  ON USERS_GROUPS.GROUP_ID  = TYPE_GROUP.GROUP_ID
//        LEFT JOIN USER ON USER.ID = USERS_GROUPS.USER_ID
//        WHERE USER.EMAIL='user@email.com'
//        GROUP BY TYPE.TITLE, USER.EMAIL;