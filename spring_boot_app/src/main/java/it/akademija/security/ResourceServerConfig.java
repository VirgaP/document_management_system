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

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) {
        resources
                .resourceId(resourceId)
                .tokenServices(tokenServices)
                .tokenStore(tokenStore);
    }


    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
        		.requestMatcher(new OAuthRequestedMatcher())
                .authorizeRequests()
                .antMatchers("/api/pakeisti/**", "/pakeisti").anonymous()
                .antMatchers("/api/pakeisti").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
				.antMatchers("/api/pakeisti/**").hasAuthority("ROLE_USER")
				.antMatchers("/api/pakeisti/**").hasAuthority("ROLE_ADMIN");
    }

    private static class OAuthRequestedMatcher implements RequestMatcher {

        public boolean matches(HttpServletRequest request) {
            String authHeader = request.getHeader("Authorization");
            // Determine if the client request contains OAuth Authorization
            boolean haveOauth2Token = (authHeader != null) && authHeader.startsWith("Bearer");
            return haveOauth2Token;
        }
    }
    
}

