package it.akademija.repository;

import it.akademija.entity.TypeGroup;
import it.akademija.entity.TypeGroupId;
import it.akademija.entity.UserDocument;
import it.akademija.entity.UserDocumentId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TypeGroupRepository extends JpaRepository<TypeGroup, TypeGroupId> {
}
