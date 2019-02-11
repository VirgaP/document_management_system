package it.akademija.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 *
 * Customizes basic Spring Security features.
 *
 */
@Configuration
@Order(SecurityProperties.BASIC_AUTH_ORDER)
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired //  it will be AccountService
	public UserDetailsService userDetailsService;

	@Autowired // Bean in App.java
	private PasswordEncoder passwordEncoder;

	@Override
	protected void configure(AuthenticationManagerBuilder builder) throws Exception {
		builder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
	}


	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				.cors()
				.and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()		
				.authorizeRequests()
				.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				
				// disable swagger functionality
				.antMatchers("/v2/api-docs", "/configuration/ui", "/swagger-resources", "/configuration/security",
						"/swagger-ui", "/webjars/**", "/swagger-resources/configuration/ui", "/swagge‌​r-ui.html")
				.denyAll()
				
				// `these are the same as in the ResourceServerConfig
				// required if testing frontend using react build within maven
				// required for permissions to work if using swagger
				.antMatchers("api/stat/**").anonymous()
				.antMatchers("/api/me", "/api/me-account", "/api/me-account/update", "/api/specialization/**", "/api/diagnosis/**", "/api/ingredient/**").hasAuthority("ROLE_USER")
				.antMatchers("/api/patient/**").hasAuthority("ROLE_PATIENT")
				.antMatchers("/api/doctor/**").hasAuthority("ROLE_DOCTOR")
				.antMatchers("/api/pharmacist/**").hasAuthority("ROLE_PHARMACIST")
				.antMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")
				// For paths NOT detailed above: we allow everyone to access those paths
				.and().httpBasic().and()
				.csrf().disable();
	}

}
