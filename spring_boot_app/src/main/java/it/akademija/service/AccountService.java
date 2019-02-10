package it.akademija.service;

import java.util.Optional;

import javax.security.auth.login.AccountException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import it.akademija.dto.AccountDTO;
import it.akademija.entity.Account;
import it.akademija.entity.User;
import it.akademija.repository.AccountRepository;

@Service
public class AccountService implements UserDetailsService {

	private static final Logger logger = LogManager.getLogger(AccountService.class);

	@Autowired
	private AccountRepository accountRepo;

	@Autowired // Bean in App.java
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDetails loadUserByUsername(String string) throws UsernameNotFoundException {
		return getAccountByUsername(string);
	}

	public Account getAccountByUsername(String username) throws UsernameNotFoundException {
		logger.info("getAccountByUsername in AccountService invoked for username " + username);
		Optional<Account> account = accountRepo.findByUsername(username);
		if (account.isPresent()) {
			logger.trace("getting user account");
			return account.get();
		} else {
			throw new UsernameNotFoundException(String.format("Username [%s] doest not exist", username));
		}
	}

	public Account getContextUser() throws UsernameNotFoundException {
		logger.info("getContextUser in AccountService invoked");
		Account account = getAccountByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		return account;
	}

	public Account getAccountById(Long id) throws AccountException {
		logger.info("getAccountById in AccountService invoked for id " + id);
		Optional<Account> account = accountRepo.findById(id);
		if (account.isPresent()) {
			logger.debug("Account present");
			return account.get();
		} else {
			throw new AccountException(String.format("Account with id [%s] doest not exist", id));
		}
	}

	public boolean existsById(Long id) {
		logger.info("existsById in AccountService invoked for id " + id);
		Optional<Account> account = accountRepo.findById(id);
		if (account.isPresent()) {
			return true;
		} else {
			return false;
		}
	}

	public AccountDTO getAccountDTOById(Long id) throws AccountException {
		logger.info("getAccountDTOById in AccountService invoked for id " + id );
		Optional<Account> account = accountRepo.findById(id);
		if (account.isPresent()) {
			logger.debug("Account present");
			return AccountDTO.toDTO(account.get());
		} else {
			throw new AccountException(String.format("Account with id [%s] does not exist", id));
		}
	}

	public AccountDTO getAccountDTOByUsername(String username) throws AccountException {
		logger.info("getAccountDTOByUsername in AccountService invoked for username " + username);
		Optional<Account> account = accountRepo.findByUsername(username);
		if (account.isPresent()) {
			logger.debug("Account present");
			return AccountDTO.toDTO(account.get());
		} else {
			throw new AccountException(String.format("Username [%s] does not exist", username));
		}
	}

	public Account createAccount(Account account, User userGiven) throws AccountException {
		logger.info("createAccount in AccountService invoked for user " + userGiven);
		if (accountRepo.countByUsername(account.getUsername()) == 0) {
			logger.debug("Username not in use");
			// Password encoding
			account.setPassword(passwordEncoder.encode(account.getPassword()));
			account.setUser(userGiven);
			return accountRepo.save(account);
		} else {
			throw new AccountException(String.format("Username [%s] already taken.", account.getUsername()));
		}
	}

	public void resetPasswordById(Long accountId) throws AccountException {
		logger.info("resetPasswordById in AccountService invoked for id " + accountId);
		Optional<Account> possibleAccountInRep = accountRepo.findById(accountId);
		if (possibleAccountInRep.isPresent()) {
			logger.debug("Account is present");
			Account account = possibleAccountInRep.get();
			User user = account.getUser();
			String newPassword = (user.getName().charAt(0) + user.getSurname()).toLowerCase();
			account.setPassword(passwordEncoder.encode(newPassword));
			accountRepo.saveAndFlush(account);
		} else {
			throw new AccountException("No account with id " + accountId + " exists.");
		}
	}

	public void switchEnabledById(Long accountId) throws AccountException {
		logger.info("switchEnabledById in AccountService invoked for id " + accountId);
		Optional<Account> possibleAccountInRep = accountRepo.findById(accountId);
		if (possibleAccountInRep.isPresent()) {
			logger.debug("Account present");
			Account account = possibleAccountInRep.get();
			account.setEnabled(!account.getEnabled());
			accountRepo.saveAndFlush(account);
		} else {
			throw new AccountException("No account with id " + accountId + " exists.");
		}
	}

	public Account updateById(Long accountId, AccountDTO updatedUsernamePasswordDTO) throws AccountException {
		Optional<Account> possibleAccountInRep = accountRepo.findById(accountId);
		if (possibleAccountInRep.isPresent()) {
			logger.info("AccountService attempting to do basic account update on user with id " + accountId);
			Account accountInRep = possibleAccountInRep.get();
			String newPassword = updatedUsernamePasswordDTO.getPassword();
			String newUsername = updatedUsernamePasswordDTO.getUsername();
			if ((newPassword == null || newPassword.equals("")) && (newUsername == null || newUsername.equals(""))) {
				throw new AccountException("Neither username nor password provided");
			} else if (newUsername == null || newUsername.equals("")) {
				accountInRep.setPassword(passwordEncoder.encode(newPassword));
			} else if (newPassword == null || newPassword.equals("")) {
				Optional<Account> possibleAccountWithNewUsername = accountRepo.findByUsername(newUsername);
				if (possibleAccountWithNewUsername.isPresent()) {
					throw new AccountException(String.format("Username [%s] already taken.", newUsername));
				} else {
					accountInRep.setUsername(newUsername);
				}
			} else {
				Optional<Account> possibleAccountWithNewUsername = accountRepo.findByUsername(newUsername);
				if (possibleAccountWithNewUsername.isPresent()) {
					throw new AccountException(String.format("Username [%s] already taken.", newUsername));
				} else {
					accountInRep.setPassword(passwordEncoder.encode(newPassword));
					accountInRep.setUsername(newUsername);
				}
			}
			logger.info("Account with id " + accountId + " was updated");
			return accountRepo.save(accountInRep);
		} else {
			throw new AccountException(String.format("Account with id [%s] does not exist.", accountId));
		}

	}

}
