package it.akademija.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import it.akademija.entity.User;

public interface PagedUserRepository extends PagingAndSortingRepository<User, Long> {
    Page<User> findAll(Pageable pageable);
}
