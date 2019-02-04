package it.akademija.service;

import it.akademija.dto.GroupDTO;
import it.akademija.entity.*;
import it.akademija.payload.RequestGroup;
import it.akademija.payload.RequestUser;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GroupService {

    private static final Logger LOG = LoggerFactory.getLogger(Group.class);

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public List<GroupDTO> getGroups() {
        return groupRepository.findAll()
                .stream()
                .map(type -> new GroupDTO(
                        type.getName()))
                .collect(Collectors.toList());
    }

    @Transactional
    public GroupDTO getGroupByName(String name){ //arba IncomingRequestBody request
        Group group = groupRepository.findByname(name);
        GroupDTO groupDTO = new GroupDTO(
                group.getName(),
                group.getGroupUsers()
        );
        return groupDTO;
    }

    @Transactional
    public void createGroup(RequestGroup request) {
        Group group = new Group(
                new Long(0),
                request.getName()
        );
        groupRepository.save(group);
    }

    @Transactional
    public void deleteGroup(String name){
        Group group = groupRepository.findByname(name);
        groupRepository.delete(group);
    }

    @Transactional
    public void editGroup(RequestGroup request, String name){
        Group group = groupRepository.findByname(name);

        group.setName(request.getName());

    }

    @Transactional
    public void addUserToGroup(String name, RequestUser request){
        Group group = groupRepository.findByname(name);

        User user = userRepository.findByEmail(request.getEmail());

        user.addGroup(group);
    }


    @Transactional
    public void removeUserFromGroup(String name, RequestUser request){
        Group group = groupRepository.findByname(name);

        User user = userRepository.findByEmail(request.getEmail());

        user.removeGroup(group);

    }
}
