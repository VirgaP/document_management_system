package it.akademija.repository;

import it.akademija.entity.Document;
import it.akademija.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PagedUserRepository extends PagingAndSortingRepository<User, Long> {
    Page<User> findAll(Pageable pageable);
}
