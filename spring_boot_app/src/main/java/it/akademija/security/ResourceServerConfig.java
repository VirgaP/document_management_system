package it.akademija.security;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.web.util.matcher.RequestMatcher;

/**
 * 
 * Resource server configurer.
 * 
 */
@Configuration
@EnableResourceServer
@EnableGlobalMethodSecurity(prePostEnabled=true, securedEnabled = true)
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Value("${security.oauth2.resource.id}") // defined in application.properties
    private String resourceId;

    @Autowired // Bean in AuthorizationServerConfig
    private DefaultTokenServices tokenServices;

    @Autowired // Bean in AuthorizationServerConfig
    private TokenStore tokenStore;

    /**
     * Method configuring resource-server specific properties.
     */
    @Override
    public void configure(ResourceServerSecurityConfigurer resources) {
        resources
                .resourceId(resourceId)
                .tokenServices(tokenServices)
                .tokenStore(tokenStore);
    }

    /**
	 * Method defining the behaviour of global and path-specific security
	 * interceptors.
	 * 
	 * Creates a filter chain with order = 3.
	 */
    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
        		.requestMatcher(new OAuthRequestedMatcher())
                .authorizeRequests()
                .antMatchers("/api/users/**", "/another", "andYetAnother").anonymous()
                .antMatchers("/api/something").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
				.antMatchers("/api/something/**").hasAuthority("ROLE_USER")
				.antMatchers("/api/something/**").hasAuthority("ROLE_ADMIN");
    }

    /**
     * HttpServletRequest matcher.
     */
    private static class OAuthRequestedMatcher implements RequestMatcher {
    	/**
    	 * Method deciding whether supplied request matches defined rules.
    	 */
        public boolean matches(HttpServletRequest request) {
            String authHeader = request.getHeader("Authorization");
            // Determine if the client request contains OAuth Authorization
            boolean haveOauth2Token = (authHeader != null) && authHeader.startsWith("Bearer");
            return haveOauth2Token;
        }
    }
    
}

