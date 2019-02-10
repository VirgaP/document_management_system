package it.akademija.controller;

import javax.security.auth.login.AccountException;
import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import it.akademija.dto.AccountDTO;
import it.akademija.entity.Account;
import it.akademija.entity.User;
import it.akademija.service.AccountService;
import it.akademija.service.UserService;

@RestController
@Api(value="account")
@RequestMapping(value = "/api/accounts")
public class AccountController {

	private static final Logger logger = LogManager.getLogger(AccountController.class);

	@Autowired
	private AccountService accountService;

	@Autowired
	private UserService userService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@ApiOperation(value = "")
	@GetMapping(value = "/info")
	@ResponseStatus(value = HttpStatus.OK)
	public AccountDTO getAccount() throws AccountException {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		logger.info("User " + username + " is attempting to get one's account details.");
		return accountService.getAccountDTOByUsername(username);
	}

	@ApiOperation(value = "")
	@PutMapping(value = "/update")
	@ResponseStatus(value = HttpStatus.OK)
	public void updateAccount(@RequestParam String currentPasswordGiven, @RequestBody AccountDTO accountDTO) throws AccountException {
		Account currentAccount = accountService.getContextUser();
		String currentUsername = currentAccount.getUsername();
		logger.info("User " + currentUsername + " is attempting to update ones account details with dto " + accountDTO);
		boolean passwordMatches = passwordEncoder.matches(currentPasswordGiven, currentAccount.getPassword());
		if (passwordMatches) {
			logger.info("User " + currentUsername + " provided correct password. Proceeding to update user's account.");
			accountService.updateById(currentAccount.getId(), accountDTO);
		} else {
			throw new AccountException("Failed authentication: password did not match.");
		}

	}

	@ApiOperation(value = "Get user account details using user id")
	@GetMapping(value = "/get/{id}")
	@ResponseStatus(value = HttpStatus.OK)
	public AccountDTO getAccountById(@PathVariable("id") final Long userId) throws AccountException {
		Long adminId = accountService.getContextUser().getId();
		logger.info("Admin with id " + adminId + " is attempting to access account details of user with id " + userId);
		if(userId < 0) {
			logger.error("Negative userId passed: "+userId);
			throw new IllegalArgumentException("Negative userId passed: "+userId);
		}
		return accountService.getAccountDTOById(userId);
	}

	@ApiOperation(value = "Create and associate an account with an existing user")
	@PostMapping(value = "/create/{patientId}")
	@ResponseStatus(value = HttpStatus.CREATED)
	public void createAccountById(@PathVariable Long userId, @RequestBody @Valid AccountDTO accountDTO)
			throws Exception {
		Long adminId = accountService.getContextUser().getId();

		logger.info("Admin with id " + adminId + " is attempting to create a user account with dto " + accountDTO
				+ " for patient with id " + userId);

		if (accountService.existsById(userId)) {
			throw new AccountException(String.format("Account with id [%s] already exists", userId));
		}

		User userFound = userService.getUserById(userId);

		Account account = new Account();
		account.setUsername(accountDTO.getUsername());
		account.setPassword(accountDTO.getPassword());
		accountDTO.getRoles().forEach(account::grantAuthority);

		accountService.createAccount(account, userFound);
	}

	@ApiOperation(value = "Update user account details")
	@PutMapping(value = "/update/{id}")
	@ResponseStatus(value = HttpStatus.OK)
	public Account updateUserAccountById(@PathVariable("id") final Long id, @RequestBody AccountDTO accountDTO)
			throws AccountException {
		Long adminId = accountService.getContextUser().getId();
		logger.info("Admin with id " + adminId + " is attempting to update account details with id " + id
				+ " using dto " + accountDTO);
		return accountService.updateById(id, accountDTO);
	}

	@ApiOperation(value = "Enabled/disable user's account.", notes = "Set \"enabled\" to a boolean")
	@PutMapping(value = "/setEnabled/{accountId}/{enabled}")
	@ResponseStatus(value = HttpStatus.OK)
	public void setEnabledById(@PathVariable(value = "accountId") Long accountId,
			@PathVariable(value = "enabled") boolean requestedEnabledStatus) throws AccountException {

		Long adminId = accountService.getContextUser().getId();

		logger.info("Admin with id " + adminId + " is attempting to set account with id " + accountId
				+ " field enabled to " + requestedEnabledStatus);

		if (!accountService.existsById(accountId)) {
			throw new AccountException("No account with id " + accountId + " exists.");
		}

		if (!accountService.getAccountById(accountId).getEnabled() == requestedEnabledStatus) {
			accountService.switchEnabledById(accountId);
		}
	}

	@ApiOperation(value = "Reset user's password")
	@PutMapping(value = "/resetPassword/{accountId}")
	@ResponseStatus(value = HttpStatus.OK)
	public void resetPasswordById(@PathVariable Long accountId) throws AccountException {

		Long adminId = accountService.getContextUser().getId();

		logger.info("Admin with id " + adminId + " is attempting to reset password of user with id " + accountId);

		if (!accountService.existsById(accountId)) {
			throw new AccountException("No account with id " + accountId + " exists.");
		}

		accountService.resetPasswordById(accountId);
	}

}
