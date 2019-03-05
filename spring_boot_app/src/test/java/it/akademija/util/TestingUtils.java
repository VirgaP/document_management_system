package it.akademija.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.apache.commons.lang3.RandomStringUtils;

import it.akademija.dto.UserDTO;
import it.akademija.entity.Document;
import it.akademija.entity.User;
import it.akademija.payload.RequestUser;

/**
 * Common utils to be used in unit/integration tests
 */
public class TestingUtils {

    private TestingUtils() {}

    /**
     * @return {@link User} with generated random name, surname, email, password and admin boolean
     */
    public static User randomUser() {
        String name = RandomStringUtils.randomAlphabetic(10);
        String surname = RandomStringUtils.randomAlphabetic(10);
        String email = randomEmail();
        String password = RandomStringUtils.randomAlphanumeric(8);
        User user = new User(name, surname, email, password, new Random().nextBoolean());
        user.setId(new Random().nextLong());

        return user;
    }

    public static String randomEmail() {
        return RandomStringUtils.randomAlphabetic(4) + "@" + RandomStringUtils.randomAlphabetic(4) + ".com";
    }

    public static RequestUser randomUserCreateRequest() {
        String name = RandomStringUtils.randomAlphabetic(10);
        String surname = RandomStringUtils.randomAlphabetic(10);
        String email = RandomStringUtils.randomAlphabetic(4) + "@" + RandomStringUtils.randomAlphabetic(4) + ".com";
        String password = RandomStringUtils.randomAlphanumeric(8);
        return new RequestUser(name, surname, email, password, new Random().nextBoolean());
    }

    public static boolean usersMatch(User user, UserDTO userDTO) {
        return user.getEmail().equals(userDTO.getEmail()) &&
                user.getName().equals(userDTO.getName()) &&
                user.getSurname().equals(userDTO.getSurname()) &&
                user.getAdmin() == userDTO.getAdmin();
    }

    public static boolean usersMatch(Collection<User> users, Collection<UserDTO> dtos) {
        return dtos.stream()
                .allMatch(userDTO -> {
                    Optional<User> possibleMatch = users.stream()
                            .filter(user -> user.getEmail().equals(userDTO.getEmail()))
                            .findFirst();

                    if (!possibleMatch.isPresent()) {
                        return false;
                    }
                    User match = possibleMatch.get();

                    return usersMatch(match, userDTO);
                });
    }

}
