package it.akademija.service;

import it.akademija.dto.DocumentDTO;
import it.akademija.dto.UserDTO;
import it.akademija.entity.Document;
import it.akademija.entity.Group;
import it.akademija.entity.User;
import it.akademija.exceptions.ResourceNotFoundException;
import it.akademija.payload.RequestGroup;
import it.akademija.payload.RequestUser;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.DocumentRepository;
import it.akademija.repository.PagedUserRepository;
import it.akademija.repository.UserRepository;

import org.codehaus.groovy.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final DocumentRepository documentRepository;
    private final GroupRepository groupRepository;
    private final PagedUserRepository pagedUserRepository;


    @Autowired
    public UserService(UserRepository userRepository, DocumentRepository documentRepository, GroupRepository groupRepository, PagedUserRepository pagedUserRepository) {
        this.userRepository = userRepository;
        this.documentRepository = documentRepository;
        this.groupRepository = groupRepository;
        this.pagedUserRepository = pagedUserRepository;
    }

    @Transactional
    public List<UserDTO> getUserWithoutDocuments() {
        logger.info("Finding all users");
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
    public Page<UserDTO> listUsersByPage(Pageable pageable) {
        Page<User> userPage = pagedUserRepository.findAll(pageable);
        final Page<UserDTO> userDtoPage = userPage.map(this::convertToUserDto);
        return userDtoPage;
    }

    private UserDTO convertToUserDto(final User user) {
         final UserDTO userDTO = new UserDTO(
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getAdmin(),
                user.getUserGroups(),
                user.getUserDocuments()
        );


        return userDTO;
//        System.out.println("submitted "+ userDTO.setSubmittedCount(userRepository.getUserDocumentDetails(user.getEmail())));
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
        logger.info("Finding one user");
        User user = userRepository.findByEmail(email);
        UserDTO userDTO = new UserDTO(
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getAdmin(),
                user.getUserGroups(),
                user.getUserDocuments()
        );
        logger.info("Found {} user", user.getEmail());
        return userDTO;
    }


    @Transactional
    public void createUser(RequestUser requestUser) {
        Group group = groupRepository.findByname(requestUser.getGroupName());
        User user = new User(
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
    public void editUser(RequestUser request, String originalEmail){
        User user = userRepository.findByEmail(originalEmail);

        if (user == null) {
            throw new IllegalArgumentException("User with email " + originalEmail + " does not exist!");
        }

        String name = request.getName();
        String surname = request.getSurname();
        Boolean admin = request.getAdmin();
        String password = request.getPassword();


        if (!StringUtils.isEmpty(name)) {
            user.setName(name);
        }
        if (!StringUtils.isEmpty(surname)) {
            user.setSurname(surname);
        }
        if (admin != null) {
            user.setAdmin(admin);
        }
        if (!StringUtils.isEmpty(password)) {
            user.setPassword(password);
        }


        userRepository.save(user);

    }

    @Transactional
    public void deleteUser(String email){
        User user = userRepository.findByEmail(email);
        userRepository.delete(user);
    }


    @Transactional
    public void addGroupToUser(String email, String groupName){
        User user = userRepository.findByEmail(email);
        Group group = groupRepository.findByname(groupName);
        user.addGroup(group);
        userRepository.save(user);
        group.addUser(user);
    }

    @Transactional
    public void removeGroupFromUser(String email, String groupName){
        logger.info("Trying to remove user with email "+ email + "from group with name "+groupName);
        User user = userRepository.findByEmail(email);
        Group group = groupRepository.findByname(groupName);

        Set<Group> userGroups = user.getUserGroups();

        if (!userGroups.contains(group)) {
            logger.error("Group with name "+ groupName + " is not found in the database");
            throw new ResourceNotFoundException("the group is not found");
        } else {
            logger.info("User with email "+ email+ " was removed from group "+ groupName);
            user.removeGroup(group);
        }
    }
}
