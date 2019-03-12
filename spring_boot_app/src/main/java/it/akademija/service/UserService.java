package it.akademija.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import it.akademija.dto.UserDTO;
import it.akademija.entity.Group;
import it.akademija.entity.User;
import it.akademija.exceptions.ResourceNotFoundException;
import it.akademija.payload.RequestUser;
import it.akademija.repository.DocumentRepository;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.PagedUserRepository;
import it.akademija.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService {


    private final UserRepository userRepository;
    private final DocumentRepository documentRepository;
    private final GroupRepository groupRepository;
    private final PagedUserRepository pagedUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, DocumentRepository documentRepository, GroupRepository groupRepository,
            PagedUserRepository pagedUserRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.documentRepository = documentRepository;
        this.groupRepository = groupRepository;
        this.pagedUserRepository = pagedUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public List<UserDTO> getUserWithoutDocuments() {
        log.info("Finding all users");
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
        log.info("Returns userDtoPage");
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

        log.info("Returns user "+ user);
        return userDTO;
//        System.out.println("submitted "+ userDTO.setSubmittedCount(userRepository.getUserDocumentDetails(user.getEmail())));
    }


    @Transactional
    public List<UserDTO> getUserEmails() {
        log.info("Returns user's emails");
        return userRepository.findAll()
                .stream()
                .map(user -> new UserDTO(
                        user.getEmail()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public UserDTO getUser(String email){
        log.info("Finding one user");
        User user = getExistingUser(email);

        UserDTO userDTO = new UserDTO(
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getAdmin(),
                user.getUserGroups(),
                user.getUserDocuments()
        );
        log.info("Found {} user", user.getEmail());
        return userDTO;
    }


    @Transactional
    public void createUser(RequestUser requestUser) {
        Group group = getExistingGrop(requestUser.getGroupName());
        User user = new User(
                requestUser.getName(),
                requestUser.getSurname(),
                requestUser.getEmail(),
                passwordEncoder.encode(requestUser.getPassword()),
                requestUser.getAdmin()
        );
        user.addGroup(group);
        userRepository.save(user);
        group.addUser(user);
    }

    @Transactional
    public void editUser(RequestUser request, String originalEmail){
        User user = getExistingUser(originalEmail);

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
            user.setPassword(passwordEncoder.encode(password));
        }

        log.info("Saving user's email");
        userRepository.save(user);

    }

    @Transactional
    public void deleteUser(String email){
        User user = getExistingUser(email);
        log.info("Deletes user with "+ email);

        userRepository.delete(user);
    }


    @Transactional
    public void addGroupToUser(String email, String groupName){
        User user = getExistingUser(email);

        Group group = getExistingGrop(groupName);
        user.addGroup(group);
        userRepository.save(user);
        log.info("Adding the user "+ user);
        group.addUser(user);
    }

    @Transactional
    public void removeGroupFromUser(String email, String groupName) {
        if (email == null || groupName == null) {
            throw new IllegalArgumentException("Input of email of group name cannot be null.");
        }

        log.info("Trying to remove user with email "+ email + "from group with name "+groupName);
        User user = getExistingUser(email);
        Group group = getExistingGrop(groupName);

        Set<Group> userGroups = user.getUserGroups();

        if (!userGroups.contains(group)) {
            log.error("Group with name "+ groupName + " is not found in the database");
            throw new ResourceNotFoundException("the group is not found");
        } else {
            log.info("User with email "+ email+ " was removed from group "+ groupName);
            user.removeGroup(group);
        }
    }

    private User getExistingUser(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new ResourceNotFoundException("User with email " + email + " does not exist!");
        }
        return user;
    }

    private Group getExistingGrop(String groupName) {
        Group group = groupRepository.findByname(groupName);
        if (group == null) {
            throw new ResourceNotFoundException("Group with name " + groupName + " does not exist!");
        }
        return group;
    }

}
