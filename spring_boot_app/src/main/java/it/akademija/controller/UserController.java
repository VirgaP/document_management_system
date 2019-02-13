package it.akademija.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.dto.UserDTO;
import it.akademija.payload.RequestUser;
import it.akademija.payload.UserIdentityAvailability;
import it.akademija.repository.UserRepository;
import it.akademija.security.CurrentUser;
import it.akademija.security.UserPrincipal;
import it.akademija.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @PreAuthorize("hasRole('USER')")
    public UserDTO getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserDTO user = new UserDTO(
                currentUser.getEmail()
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

    @RequestMapping(path = "/{email}/addGroup", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value="Add group to a user", notes="Adds group to selected user")
    public void addUserGroup(
            @PathVariable final String email,
            @RequestBody final RequestUser requestUser){
        userService.addGroupToUser(email,requestUser);
    }

    @RequestMapping(path = "/{email}/removeGroup", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value="Remove group", notes="Remove group form users groups list")
    public void removeTypeFromDocument(
            @PathVariable final String email,
//            @RequestBody final String groupName
            @RequestBody final RequestUser requestUser
    ){
        userService.removeGroupFromUser(email, requestUser);
    }

}
