package it.akademija.controller;

import java.net.URI;
import java.util.Collections;

import javax.validation.Valid;

import it.akademija.entity.Group;
import it.akademija.entity.Role;
import it.akademija.entity.RoleName;
import it.akademija.entity.User;
import it.akademija.exceptions.AppException;
import it.akademija.payload.ApiResponse;
import it.akademija.payload.JwtAuthenticationResponse;
import it.akademija.payload.LoginRequest;
import it.akademija.payload.RequestUser;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.RoleRepository;
import it.akademija.repository.UserRepository;
import it.akademija.security.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Collections;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private GroupRepository groupRepository;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        log.info("Token "+ jwt + " has been generated for login request");
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/newUser")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RequestUser requestUser) {
        if(userRepository.existsByEmail(requestUser.getEmail())) {
            log.info("Checking the Users Repository for email validation");
            return new ResponseEntity(new ApiResponse(false, "User email is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        Group group = groupRepository.findByname(requestUser.getGroupName());

        // Creating user's account
        User user = new User(
                requestUser.getName(),
                requestUser.getSurname(),
                requestUser.getEmail(),
                requestUser.getPassword(),
                requestUser.getAdmin()
        );

        user.addGroup(group);
        group.addUser(user);
        log.info("Password has been set");
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole1 = roleRepository.findByName(RoleName.ROLE_USER);

        Role userRole2 = roleRepository.findByName(RoleName.ROLE_ADMIN);

        if(requestUser.getAdmin() == true){
            log.info("Admin role was set");
            user.setRoles(Collections.singleton(userRole2));

        } else {
            log.info("User's role was set");
            user.setRoles(Collections.singleton(userRole1));
        }

//        user.setRoles(Collections.singleton(userRole));

        log.info("User "+ user+ "saved to User Repository");
        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{email}")
                .buildAndExpand(result.getEmail()).toUri();

        log.info("The successful registration of user");
        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }
}
