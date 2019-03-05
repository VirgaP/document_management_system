package it.akademija.service;

import it.akademija.entity.User;
import it.akademija.repository.UserRepository;
import it.akademija.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername (String email) throws UsernameNotFoundException{
        // Let people login with email
//        try{
//            User user = userRepository.findByEmail(email);
//
//        } catch(UsernameNotFoundException ex){
//            throw new UsernameNotFoundException("Could not find user with this email")
//        }

        User user = userRepository.findByEmail(email);

        return UserPrincipal.create(user);
    }

    // This method is used by JWTAuthenticationFilter
    @Transactional
    public UserDetails loadUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new UsernameNotFoundException("User not found with id : " + id)
        );

        return UserPrincipal.create(user);
    }
}
