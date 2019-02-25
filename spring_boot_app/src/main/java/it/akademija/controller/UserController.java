package it.akademija.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.dto.UserDTO;
<<<<<<< HEAD
import it.akademija.payload.RequestGroup;
=======
import it.akademija.entity.User;
>>>>>>> 88bd95fa98b790ceef353a0d6c7bbc7ec56e26ae
import it.akademija.payload.RequestUser;
import it.akademija.payload.UserIdentityAvailability;
import it.akademija.repository.UserRepository;
import it.akademija.security.CurrentUser;
import it.akademija.security.UserPrincipal;
import it.akademija.service.UserService;
import it.akademija.util.WriteDataToCSV;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Api(value="user")
@RequestMapping(value = "/api/users")
public class UserController {

    public final UserService userService;

    @Autowired
    private UserRepository userRepository;


    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(path="/new", method = RequestMethod.POST)
    @ApiOperation(value="Create user", notes = "Creates new user")
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(
            @ApiParam(value="User data", required=true)
            @RequestBody final RequestUser requestUser){

        userService.createUser(requestUser);
    }

    @GetMapping("/user/me")
<<<<<<< HEAD
//    @PreAuthorize("hasRole('USER')")
=======
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
>>>>>>> 88bd95fa98b790ceef353a0d6c7bbc7ec56e26ae
    public UserDTO getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserDTO user = new UserDTO(
                currentUser.getAdmin(),
                currentUser.getEmail(),
                currentUser.getName(),
                currentUser.getSurname()
        );
        return user;
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @RequestMapping(method = RequestMethod.GET)
    @ApiOperation(value="Get all users", notes="Returns list of all users")
    public List<UserDTO> getAllUsers() {

        return userService.getUserWithoutDocuments();
    }

    @RequestMapping(path = "/emails", method = RequestMethod.GET)
    @ApiOperation(value="Get all emails", notes="Returns list of all emails")
    public List<UserDTO> getAllUsersEmails() {

        return userService.getUserEmails();
    }

    @RequestMapping(path = "/{email}", method = RequestMethod.GET)
    @ApiOperation(value = "Get one user", notes = "Returns one user by email")
    public UserDTO getDocument(
            @PathVariable final String email) {
        return userService.getUser(email);
    }


    @RequestMapping(path = "/{email}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value="Delete user", notes="Deletes user by surname")
    public void deleteUser(@PathVariable final String email){
        userService.deleteUser(email);
    }

    @RequestMapping(path = "/{email}/{groupName}/add", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value="Add group to a user", notes="Adds group to selected user")
    public void addUserGroup(
            @PathVariable final String email,
            @PathVariable final String groupName
    ){
        userService.addGroupToUser(email,groupName);
    }

    @RequestMapping(path = "/{email}/{groupName}/remove", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value="Remove group", notes="Remove group form users groups list")
    public void removeTypeFromDocument(
            @PathVariable final String email,
            @PathVariable final String groupName
    ){
        userService.removeGroupFromUser(email, groupName);
    }

<<<<<<< HEAD
    @RequestMapping(path = "/{email}/edit", method = RequestMethod.PUT)
    @ApiOperation(value = "Get and update user", notes = "Returns user by email and updates user info")
    @ResponseStatus(HttpStatus.OK)
    public void updateUser(
            @ApiParam(value = "User data", required = true)
            @RequestBody RequestUser request,
            @PathVariable final String email){
        userService.editUser(request, email);
=======

    @GetMapping("/download/csv")
    public void downloadCSV(HttpServletResponse response) throws IOException{
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; file=user.csv");

        List<User> users = (List<User>) userRepository.findAll();
        WriteDataToCSV.writeUsersToCSV(response.getWriter(), users);
    }


    @GetMapping("/{email}/download/documentsCsv")
    public void downloadUserDocumentsCSV(HttpServletResponse response, @PathVariable final String email) throws IOException{
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; file=vartotojas.csv");

        User user = userRepository.findByEmail(email);
        String.valueOf(user);

        WriteDataToCSV.writeUserDocumentsToCSV(response.getWriter(), user);
    }


    @GetMapping("/{email}/download/userCsv")
    public void downloadUserCSV(HttpServletResponse response, @PathVariable final String email) throws IOException{
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; file=vartotojas.csv");

        User user = userRepository.findByEmail(email);
        String.valueOf(user);

        WriteDataToCSV.writeUserByEmailToCSV(response.getWriter(), user);
>>>>>>> 88bd95fa98b790ceef353a0d6c7bbc7ec56e26ae
    }

}
