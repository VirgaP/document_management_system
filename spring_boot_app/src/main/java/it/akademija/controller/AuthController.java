package it.akademija.controller;

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

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

   @Autowired
   GroupRepository groupRepository;

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
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/newUser")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RequestUser requestUser) {
        if(userRepository.existsByEmail(requestUser.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if(userRepository.existsByEmail(requestUser.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        Group group = groupRepository.findByname(requestUser.getGroupName());

        // Creating user's account
        User user = new User(
                new Long(0),
                requestUser.getName(),
                requestUser.getSurname(),
                requestUser.getEmail(),
                requestUser.getPassword(),
                requestUser.getAdmin()
        );
        user.addGroup(group);
        group.addUser(user);

        user.setPassword(passwordEncoder.encode(user.getPassword()));

//                Role userRole = roleRepository.findByName(
//                        requestUser.getAdmin() == true ? RoleName.ROLE_ADMIN : RoleName.ROLE_USER
//                ).orElseThrow(() -> new AppException("User Role not set."));

        Role userRole1 = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        Role userRole2 = roleRepository.findByName(RoleName.ROLE_ADMIN)
                .orElseThrow(() -> new AppException("User Role not set."));

        if(requestUser.getAdmin() == true){
            user.setRoles(Collections.singleton(userRole2));
        } else {
            user.setRoles(Collections.singleton(userRole1));
        }

//        user.setRoles(Collections.singleton(userRole));


        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{email}")
                .buildAndExpand(result.getEmail()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }
}
