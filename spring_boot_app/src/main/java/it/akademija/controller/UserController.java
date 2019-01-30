package it.akademija.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.dto.DocumentDTO;
import it.akademija.dto.TypeDTO;
import it.akademija.dto.UserDTO;
import it.akademija.model.RequestUser;
import it.akademija.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(value="user")
@RequestMapping(value = "/api/users")
public class UserController {

    public final UserService userService;

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


//    @RequestMapping(path = "/add/{typeTitle}", method = RequestMethod.POST)
//    @ResponseStatus(HttpStatus.OK)
//    @ApiOperation(value="Add type to a document", notes="Adds type to selected document")
//    public void addTypetoDocument(
//            @PathVariable final String title,
//            @RequestBody final String documentTitle
//            ){
//        userService.addBookToInstitution(title,institutionTitle);
//    }

    @RequestMapping(method = RequestMethod.GET)
    @ApiOperation(value="Get all users", notes="Returns list of all users")
    public List<UserDTO> getAllUsers() {

        return userService.getUserWithoutDocuments();
    }

//
//    @RequestMapping(path = "/institution/{typeTitle}", method = RequestMethod.GET)
//    @ApiOperation(value="Get one type", notes="Returns one type by title bound to document")
//    public RequestUser getTypeByTitle(@PathVariable final String title){
//        return userService.getTypeByTitle(title);
//    }

    @RequestMapping(path = "/{surname}", method = RequestMethod.GET)
    @ApiOperation(value = "Get one user", notes = "Returns one user by surname")
    public RequestUser getDocument(
            @PathVariable final String surname) {
        return userService.getUserWithDocuments(surname);
    }


    @RequestMapping(path = "/{surname}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value="Delete user", notes="Deletes user by surname")
    public void deleteUser(@PathVariable final String surname){
        userService.deleteUser(surname);
    }

//    @RequestMapping(path = "/remove/{typeTitle}", method = RequestMethod.GET)
//    @ResponseStatus(HttpStatus.OK)
//    @ApiOperation(value="Remove type from document", notes="Remove  type from document")
//    public void removeTypeFromDocument(
//            @PathVariable final String title,
//            @RequestBody final String documentTitle
//    ){
//        userService.(title,institutionTitle);
//    }

}
