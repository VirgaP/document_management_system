package it.akademija.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.dto.GroupDTO;
import it.akademija.entity.Group;
import it.akademija.payload.RequestGroup;
import it.akademija.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@Api(value="group")
@RequestMapping(value = "/api/group")
public class GroupController {


    private final GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @RequestMapping(method = RequestMethod.GET)
    @ApiOperation(value="Get list of groups", notes="Returns list of groups created")
    public List<GroupDTO> getGroups() {

        return groupService.getGroups();
    }

    @RequestMapping(path = "/{name}", method = RequestMethod.GET)
    @ApiOperation(value="Get group ", notes="Returns group by name")
    public GroupDTO getGroup(@PathVariable final String name){
        return groupService.getGroupByName(name);
    }

    @RequestMapping(path="/new", method = RequestMethod.POST)
    @ApiOperation(value="Create group", notes = "Creates new group")
    @ResponseStatus(HttpStatus.CREATED)
    public void createGroup(
            @ApiParam(value="Group data", required=true)
            @RequestBody final RequestGroup requestBody){

        groupService.createGroup(requestBody);
    }


    @RequestMapping(path = "/{name}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value="Data type", notes="Deletes group by name")
    public void deleteGroup(
            @ApiParam(value="Group data", required=true)
            @PathVariable final String name)
    {
        groupService.deleteGroup(name);
    }

    @RequestMapping(path = "/{name}/edit", method = RequestMethod.PUT)
    @ApiOperation(value = "Get and update group", notes = "Returns group by name and updates group information")
    @ResponseStatus(HttpStatus.OK)
    public void updateGroup(
            @ApiParam(value = "Group data", required = true)
            @RequestBody RequestGroup request,
            @PathVariable final String name){
        groupService.editGroup(request, name);
    }

}
