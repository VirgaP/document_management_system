package it.akademija.repository;

import it.akademija.entity.Document;
import it.akademija.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, Long> {
    Group findByname(String name);
}
