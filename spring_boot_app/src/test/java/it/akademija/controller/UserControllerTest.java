package it.akademija.controller;

import java.util.ArrayList;
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
import org.springframework.test.context.junit4.SpringRunner;

import it.akademija.dto.UserDTO;
import it.akademija.entity.User;
import it.akademija.exceptions.ResourceNotFoundException;
import it.akademija.payload.UserIdentityAvailability;
import it.akademija.repository.DocumentRepository;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.PagedUserRepository;
import it.akademija.repository.UserRepository;
import it.akademija.service.UserService;
import it.akademija.util.TestingUtils;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UserControllerTest {

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

    @Before
    public void setUp() {
        userService = new UserService(userRepository, documentRepository, groupRepository, pagedUserRepository);
        userController = new UserController(userService, userRepository);
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

        List<String> foundEmails = userController.getAllUsers().stream()
                .map(dto -> dto.getEmail())
                .collect(Collectors.toList());
        Assert.assertTrue(foundEmails.size() == 10);

        Assert.assertTrue(existingUsers.stream()
                .allMatch(user -> foundEmails.contains(user.getEmail())));
    }

    @Test
    public void shouldReturnExistingUser() {
        User existingUser = userRepository.save(TestingUtils.randomUser());

        UserDTO userDTO = userController.getDocument(existingUser.getEmail());

        Assert.assertTrue(TestingUtils.usersMatch(existingUser, userDTO));
    }

    @Test
    public void shouldFailToGetNonExistingUser() {
        String nonExistingEmail = TestingUtils.randomEmail();

        expectedException.expect(ResourceNotFoundException.class);

        userController.getDocument(TestingUtils.randomEmail());
    }

    private List<User> createUsers(int numberOfUsers) {
        List<User> users = new ArrayList<>();
        for (int i = 0; i < numberOfUsers; i++) {
            users.add(userRepository.save(TestingUtils.randomUser()));
        }
        return users;
    }

}
