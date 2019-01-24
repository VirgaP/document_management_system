package it.akademija.service;

import it.akademija.dto.UserDTO;
import it.akademija.entity.User;
import it.akademija.model.CreateUserCommand;
import it.akademija.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private static final Logger LOG = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public List<UserDTO> getUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> new UserDTO(
                       user.getUsername()))
                .collect(Collectors.toList());
    }

    @Transactional
    public UserDTO getUserByUsername(String username){ //frontended grazins tik username
        User user = userRepository.findByUsername(username);
        UserDTO userDTO = new UserDTO(user.getUsername());
        return userDTO;
    }

    @Transactional
    public void createUser(CreateUserCommand cmd) {
        User user = new User();
        user.setId(1L);
        user.setUsername(cmd.getUsername());
        userRepository.save(user);
    }

    @Transactional
    public void deleteUser(String username){
        User user = userRepository.findByUsername(username);
        userRepository.delete(user);
    }
}
