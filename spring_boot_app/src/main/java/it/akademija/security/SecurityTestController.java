package it.akademija.security;

import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityTestController {

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    // Preauthorized galima or, secured - tik and
    // @PreAuthorize("hasRole('HR')") //
    @Secured("ROLE_ADMIN")
    public String test() {
        return "AUTHENTICATED";
    }

    @RequestMapping(path = "/loggedUsername", method = RequestMethod.GET)
            public String getLoggedInUsername() {
            Authentication authentication =
            SecurityContextHolder.getContext().getAuthentication();
            if (!(authentication instanceof AnonymousAuthenticationToken)) {
                return authentication.getName();
            }
            return "not logged";
    }
}