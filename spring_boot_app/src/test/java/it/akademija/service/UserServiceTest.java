package it.akademija.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import it.akademija.dto.UserDTO;
import it.akademija.entity.User;
import it.akademija.repository.DocumentRepository;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.UserRepository;
import it.akademija.util.TestingUtils;

/**
 * Units tests for {@link UserService}
 */
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private GroupRepository groupRepository;

    @Mock
    private DocumentRepository documentRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    private List<User> existingUsers;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        passwordEncoder = new BCryptPasswordEncoder(10);

        existingUsers = new ArrayList<>(Arrays.asList(
                TestingUtils.randomUser(),
                TestingUtils.randomUser(),
                TestingUtils.randomUser()));
        Mockito.when(userRepository.findAll()).thenReturn(existingUsers);
    }

    @Test
    public void shouldReturnAllUserEmails() {
        List<String> foundEmails = userService.getUserEmails().stream()
                .map(UserDTO::getEmail)
                .collect(Collectors.toList());

        Assert.assertTrue(foundEmails.size() == 3);
        Assert.assertTrue(existingUsers.stream()
                .allMatch(user -> foundEmails.contains(user.getEmail())));
    }

    @Test
    public void shouldReturnAllUser() {
        List<UserDTO> foundUsers = userService.getUserWithoutDocuments();

        Assert.assertTrue(foundUsers.size() == 3);

        boolean userMatch = TestingUtils.usersMatch(existingUsers, foundUsers);

        Assert.assertTrue(userMatch);
    }

    @Test
    public void shouldLoadExistingUser() {
        User existingUser = existingUsers.get(0);
        Mockito.when(userRepository.findByEmail(existingUser.getEmail())).thenReturn(existingUser);

        UserDTO foundUser = userService.getUser(existingUser.getEmail());

        Assert.assertEquals(existingUser.getName(), foundUser.getName());
        Assert.assertEquals(existingUser.getSurname(), foundUser.getSurname());
        Assert.assertEquals(existingUser.getEmail(), foundUser.getEmail());
        Assert.assertEquals(existingUser.getAdmin(), foundUser.getAdmin());
    }

}
