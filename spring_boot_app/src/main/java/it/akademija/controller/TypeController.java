package it.akademija.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.dto.TypeDTO;
import it.akademija.dto.UserDTO;
import it.akademija.model.CreateUserCommand;
import it.akademija.model.IncomingRequestBody;
import it.akademija.repository.TypeRepository;
import it.akademija.service.TypeService;
import it.akademija.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(value="type")
@RequestMapping(value = "/api/types")
public class TypeController {


    private final TypeService typeService;

    @Autowired
    public TypeController(TypeService typeService) {
        this.typeService = typeService;
    }

    @RequestMapping(method = RequestMethod.GET)
    @ApiOperation(value="Get list of types", notes="Returns list of types")
    public List<TypeDTO> getTypes() {

        return typeService.getTypes();
    }

    @RequestMapping(path = "/{title}", method = RequestMethod.GET)
    @ApiOperation(value="Get type ", notes="Returns type")
    public TypeDTO getType(@PathVariable final String title){
        return typeService.getTypeByTitle(title);
    }

    @RequestMapping(path="/new", method = RequestMethod.POST)
    @ApiOperation(value="Create type", notes = "Creates new type of the document")
    @ResponseStatus(HttpStatus.CREATED)
    public void createType(
            @ApiParam(value="Type data", required=true)
            @RequestBody final IncomingRequestBody requestBody){

        typeService.createType(requestBody);
    }


    @RequestMapping(path = "/{title}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value="Data type", notes="Deletes type by title")
    public void deleteUser(
            @ApiParam(value="Type data", required=true)
            @RequestBody final IncomingRequestBody requestBody)
    {
        typeService.deleteType(requestBody);
    }

}
