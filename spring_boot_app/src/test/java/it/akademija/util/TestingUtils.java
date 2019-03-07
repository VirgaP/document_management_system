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

/**
 * Common utils to be used in unit/integration tests
 */
public class TestingUtils {

    /**
     * @return {@link User} with generated random name, surname, email, password and admin boolean
     */
    public static User createRandomUser() {
        String name = RandomStringUtils.randomAlphabetic(10);
        String surname = RandomStringUtils.randomAlphabetic(10);
        String email = RandomStringUtils.randomAlphabetic(4) + "@" + RandomStringUtils.randomAlphabetic(4) + ".com";
        String password = RandomStringUtils.randomAlphanumeric(8);
        User user = new User(name, surname, email, password, new Random().nextBoolean());
        user.setId(new Random().nextLong());

        return user;
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

                    return userDTO.getName().equals(match.getName()) &&
                            userDTO.getSurname().equals(match.getSurname()) &&
                            userDTO.getAdmin() == match.getAdmin();
                });
    }

}
