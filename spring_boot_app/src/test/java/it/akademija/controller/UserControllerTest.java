package it.akademija.controller;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import it.akademija.dto.UserDTO;
import it.akademija.entity.Group;
import it.akademija.entity.User;
import it.akademija.exceptions.ResourceNotFoundException;
import it.akademija.payload.RequestUser;
import it.akademija.payload.UserIdentityAvailability;
import it.akademija.repository.DocumentRepository;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.PagedUserRepository;
import it.akademija.repository.UserRepository;
import it.akademija.security.UserPrincipal;
import it.akademija.service.UserService;
import it.akademija.util.TestingUtils;


/**
 * Integration tests for {@link UserController}
 */

@RunWith(SpringRunner.class)
@DataJpaTest
public class UserControllerTest {

    private static final String TEST_GROUP_ONE = "testGroupOne";
    private static final String TEST_GROUP_TWO = "testGroupTwo";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PagedUserRepository pagedUserRepository;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private UserService userService;
    private UserController userController;
    private PasswordEncoder passwordEncoder;

    @Before
    public void setUp() {
        passwordEncoder = new BCryptPasswordEncoder(10);
        userService = new UserService(userRepository, documentRepository, groupRepository, pagedUserRepository, passwordEncoder);
        userController = new UserController(userService, userRepository);

        // add preexisting user groups
        groupRepository.save(new Group(1L, TEST_GROUP_ONE));
        groupRepository.save(new Group(2L, TEST_GROUP_TWO));
    }

    @Test
    public void shouldFailIfEmailAlreadyTaken() {
        User user = TestingUtils.randomUser();
        userRepository.save(user);

        UserIdentityAvailability result = userController.checkEmailAvailability(user.getEmail());
        Assert.assertFalse(result.getAvailable());
    }

    @Test
    public void shouldPassIfEmailNotTaken() {
        String nonExistingEmail = TestingUtils.randomEmail();

        UserIdentityAvailability result = userController.checkEmailAvailability(nonExistingEmail);
        Assert.assertTrue(result.getAvailable());
    }

    @Test
    public void shouldFindAllExistingUsers() {
        List<User> existingUsers = createUsers(10);

        List<UserDTO> foundUsers = userController.getAllUsers();
        Assert.assertTrue(foundUsers.size() == 10);

        boolean userMatch = TestingUtils.usersMatch(existingUsers, foundUsers);
        Assert.assertTrue(userMatch);
    }

    @Test
    public void shouldReturnAllUserEmails() {
        List<User> existingUsers = createUsers(10);

        List<String> foundEmails = userController.getAllUsersEmails().stream()
                .map(dto -> dto.getEmail())
                .collect(Collectors.toList());
        Assert.assertTrue(foundEmails.size() == 10);

        Assert.assertTrue(existingUsers.stream()
                .allMatch(user -> foundEmails.contains(user.getEmail())));
    }

    @Test
    public void shouldReturnExistingUser() {
        User existingUser = userRepository.save(TestingUtils.randomUser());

        UserDTO userDTO = userController.getUser(existingUser.getEmail());

        Assert.assertTrue(TestingUtils.usersMatch(existingUser, userDTO));
    }

    @Test
    public void shouldFailToGetNonExistingUser() {
        String nonExistingEmail = TestingUtils.randomEmail();

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("User with email " + nonExistingEmail + " does not exist!");

        userController.getUser(nonExistingEmail);
    }

    @Test
    public void shouldDeleteExistingUser() {
        User existingUser = userRepository.save(TestingUtils.randomUser());

        userController.deleteUser(existingUser.getEmail());

        existingUser = userRepository.findByEmail(existingUser.getEmail());
        Assert.assertNull(existingUser);
    }

    @Test
    public void shouldFailToDeleteNonExistentUser() {
        String nonExistingEmail = TestingUtils.randomEmail();

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("User with email " + nonExistingEmail + " does not exist!");

        userController.deleteUser(nonExistingEmail);
    }

    @Test
    public void shouldAddExistingGroupToExistingUser() {
        User existingUser = userRepository.save(TestingUtils.randomUser());

        userController.addUserGroup(existingUser.getEmail(), TEST_GROUP_ONE);

        User loadedUser = userRepository.findByEmail(existingUser.getEmail());
        boolean containsGroup = loadedUser.getUserGroups().stream()
                .anyMatch(group -> group.getName().equals(TEST_GROUP_ONE));

        Assert.assertTrue(containsGroup);
    }

    @Test
    public void shouldFailToAddNonExistingGroupToExistingUser() {
        User existingUser = userRepository.save(TestingUtils.randomUser());
        String nonExistingGroup = "nonExistingGroup";

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("Group with name " + nonExistingGroup + " does not exist!");

        userController.addUserGroup(existingUser.getEmail(), nonExistingGroup);
    }

    @Test
    public void shouldFailToAddExistingGroupToNonExistingUser() {
        String nonExistingEmail = TestingUtils.randomEmail();

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("User with email " + nonExistingEmail + " does not exist!");

        userController.addUserGroup(nonExistingEmail, TEST_GROUP_ONE);

    }

    @Test
    public void shouldSuccessfullyEditUser() {
        User existingUser = userRepository.save(TestingUtils.randomUser());
        String email = existingUser.getEmail();

        RequestUser requestUser = TestingUtils.randomUserUpdateRequest(email);
        userController.updateUser(requestUser, email);

        User loadedUser = userRepository.findByEmail(email);

        Assert.assertTrue(TestingUtils.usersMatch(loadedUser, requestUser, email));
    }

    @Test
    public void shouldFailToEdiNonExistingUser() {
        String email = TestingUtils.randomEmail();
        RequestUser requestUser = TestingUtils.randomUserUpdateRequest(email);

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("User with email " + email + " does not exist!");

        userController.updateUser(requestUser, email);
    }

    @Test
    public void shouldUpdateOnlyPassedFields() {
        User existingUser = userRepository.save(TestingUtils.randomUser());
        String email = existingUser.getEmail();

        RequestUser requestUser = TestingUtils.randomUserUpdateRequest(email);
        // fields not updated
        requestUser.setAdmin(null);
        requestUser.setName(null);

        userController.updateUser(requestUser, email);

        User loadedUser = userRepository.findByEmail(email);

        // fields not updated
        Assert.assertEquals(email, loadedUser.getEmail());
        Assert.assertEquals(existingUser.getAdmin(), loadedUser.getAdmin());
        Assert.assertEquals(existingUser.getName(), loadedUser.getName());
        // check updated fields
        Assert.assertTrue(TestingUtils.usersMatch(loadedUser, requestUser, email));
    }

    @Test
    public void shouldReturnPagedUsers() {
        createUsers(20);

        List<User> existingUsers = userRepository.findAll();
        existingUsers.sort(Comparator.comparing(User::getName));

        Page<UserDTO> pageOne = userController.pathParamUsers(PageRequest.of(0, 10, Sort.Direction.ASC, "name"));
        Page<UserDTO> pageTwo = userController.pathParamUsers(PageRequest.of(1, 10, Sort.Direction.ASC, "name"));
        Page<UserDTO> pageThree = userController.pathParamUsers(PageRequest.of(2, 10));

        // there should only be two pages worth of users
        Assert.assertTrue(pageOne.getTotalPages() == 2);
        Assert.assertEquals(pageOne.getTotalPages(), pageTwo.getTotalPages(), pageThree.getTotalPages());
        Assert.assertFalse(pageThree.hasContent());

        List<UserDTO> combinesPagedUsers = new ArrayList<>();
        combinesPagedUsers.addAll(pageOne.getContent());
        combinesPagedUsers.addAll(pageTwo.getContent());

        // make sure correct users are returned in the expected order
        Assert.assertTrue(TestingUtils.usersMatchInOrder(existingUsers, combinesPagedUsers));
    }

    @Test
    public void shouldReturnDtoOfCurrentUser() {
        UserPrincipal currentUser = TestingUtils.randomUserPrincipal();
        UserDTO currentUserDTO = userController.getCurrentUser(currentUser);

        Assert.assertTrue(TestingUtils.usersMatch(currentUser, currentUserDTO));
    }

    @Test
    public void shouldFailIfNoCurrentUserApparent() {
        expectedException.expect(IllegalArgumentException.class);
        expectedException.expectMessage("No current user apparent");

        UserDTO currentUserDTO = userController.getCurrentUser(null);
    }

    private List<User> createUsers(int numberOfUsers) {
        List<User> users = new ArrayList<>();
        for (int i = 0; i < numberOfUsers; i++) {
            users.add(userRepository.save(TestingUtils.randomUser()));
        }
        return users;
    }

}
