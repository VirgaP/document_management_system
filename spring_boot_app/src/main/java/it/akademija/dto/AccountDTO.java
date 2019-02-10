package it.akademija.dto;

import java.util.Date;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import it.akademija.entity.Account;

@JsonInclude(JsonInclude.Include.NON_NULL) // include non null values only
public class AccountDTO {

	private static final Logger logger = LogManager.getLogger(AccountDTO.class);

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Europe/Vilnius", locale = "lt")
	private Date createdOn;

	private List<String> roles;
	private Boolean enabled;
	private String username;
	private String password;

	public AccountDTO() {}

	public AccountDTO(String username, String password) {
		this.username = username;
		this.password = password;
	}

	@JsonCreator
	public AccountDTO(@JsonProperty("username") String username, @JsonProperty("roles") List<String> roles,
			@JsonProperty("createdOn") Date createdOn, @JsonProperty("enabled") boolean enabled) {
		this(username, null);
		this.roles = roles;
		this.createdOn = createdOn;
		this.enabled = enabled;
	}

	public static AccountDTO toDTO(Account entity) {
		logger.debug("AccountDTO toDTO invoked");
		AccountDTO account = new AccountDTO(entity.getUsername(), entity.getRoles(), entity.getCreatedOn(),
				entity.getEnabled());
		logger.debug("AccountFullDTO created " + account);
		return account;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public List<String> getRoles() {
		return roles;
	}

}
