package it.akademija.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import it.akademija.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
	List<Account> findAll();

	Optional<Account> findByUsername(String username);

	Optional<Account> findById(Long id);

	Integer countByUsername(String username);

	@SuppressWarnings("unchecked")
	Account save(Account account);

	void deleteAccountById(Long id);

}
