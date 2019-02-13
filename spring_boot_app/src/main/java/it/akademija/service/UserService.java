package it.akademija.service;

import it.akademija.dto.UserDTO;
import it.akademija.entity.Group;
import it.akademija.entity.User;
import it.akademija.exceptions.ResourceNotFoundException;
import it.akademija.payload.RequestUser;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.DocumentRepository;
import it.akademija.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    private static final Logger LOG = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final DocumentRepository documentRepository;
    private final GroupRepository groupRepository;


    @Autowired
    public UserService(UserRepository userRepository, DocumentRepository documentRepository, GroupRepository groupRepository) {
        this.userRepository = userRepository;
        this.documentRepository = documentRepository;
        this.groupRepository = groupRepository;
    }

    @Transactional
    public List<UserDTO> getUserWithoutDocuments() {
        return userRepository.findAll()
                .stream()
                .map(user -> new UserDTO(
                        user.getName(),
                        user.getSurname(),
                        user.getEmail(),
                        user.getAdmin()
                        ))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<UserDTO> getUserEmails() {
        return userRepository.findAll()
                .stream()
                .map(user -> new UserDTO(
                        user.getEmail()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public UserDTO getUser(String email){
        User user = userRepository.findByEmail(email);
        UserDTO userDTO = new UserDTO(
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getAdmin(),
                user.getUserGroups(),
                user.getUserDocuments()
        );
        return userDTO;
    }


    @Transactional
    public void createUser(RequestUser requestUser) {
        Group group = groupRepository.findByname(requestUser.getGroupName());
        User user = new User(
                new Long(0),
                requestUser.getName(),
                requestUser.getSurname(),
                requestUser.getEmail(),
                requestUser.getAdmin()
        );
        user.addGroup(group);
        userRepository.save(user);
        group.addUser(user);
    }

    @Transactional
    public void deleteUser(String email){
        User user = userRepository.findBySurname(email);
        System.out.println("trinti" + user.getEmail());
        userRepository.delete(user);
    }


    @Transactional
    public void addGroupToUser(String email, RequestUser request){
        User user = userRepository.findByEmail(email);
        Group group = groupRepository.findByname(request.getGroupName());
        user.addGroup(group);
        userRepository.save(user);
        group.addUser(user);
    }

    @Transactional
    public void removeGroupFromUser(String email, RequestUser request){
        User user = userRepository.findByEmail(email);
        Group group = groupRepository.findByname(request.getGroupName());
//        Institution institution = institutionRepository.findByTitle(institutionTitle); //removing book (owning side) from many to many association
//         bookRepository.findByInstitutionTitle(institutionTitle)
//                .stream()
//                .map(book -> book.getInstitutions().remove(institution));

//        Book book = bookRepository.findByTitle(title);
        Set<Group> userGroups = user.getUserGroups();

        if (!userGroups.contains(group)) {
            throw new ResourceNotFoundException("the group is not found");
        } else {
            user.removeGroup(group);
        }
    }
}
