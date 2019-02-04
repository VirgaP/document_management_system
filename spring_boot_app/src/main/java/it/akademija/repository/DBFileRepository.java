package it.akademija.repository;

import it.akademija.entity.DBFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DBFileRepository extends JpaRepository<DBFile, String> {

    DBFile findByFileName(String fileName);
}
