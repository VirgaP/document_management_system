package it.akademija.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.dto.UserDTO;
import it.akademija.model.CreateUserCommand;
import it.akademija.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(value="user")
@RequestMapping(value = "/api/users")
public class UserController {


    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(method = RequestMethod.GET)
    @ApiOperation(value="Get list of users", notes="Returns list of regsitered users")
    public List<UserDTO> getUsers() {

        return userService.getUsers();
    }

    @RequestMapping(path = "/{username}", method = RequestMethod.GET)
    @ApiOperation(value="Get user ", notes="Returns registered user by username")
    public UserDTO getUser(@PathVariable final String username){
        return userService.getUserByUsername(username);
    }


    @RequestMapping(method = RequestMethod.POST)
    @ApiOperation(value="Create user", notes = "Creates user with data from client")
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(
            @ApiParam(value="User data", required=true)
            @RequestBody final CreateUserCommand cmd){

        userService.createUser(cmd);
    }


    @RequestMapping(path = "/{username}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value="Delete user", notes="Deletes regsitered user by username")
    public void deleteUser(@PathVariable final String username){
        userService.deleteUser(username);
    }

}
