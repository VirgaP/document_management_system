package it.akademija.service;

import it.akademija.dto.TypeDTO;
import it.akademija.dto.UserDTO;
import it.akademija.entity.Group;
import it.akademija.entity.Type;
import it.akademija.entity.User;
import it.akademija.model.IncomingRequestBody;
import it.akademija.model.RequestUser;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.TypeRepository;
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


//    @Transactional
//    public RequestUser getUserWithDocuments(String surname){
//        User user = userRepository.findBySurname(surname);
//        RequestUser request = new RequestUser(
//                user.getName(),
//                user.getSurname(),
//                user.getEmail(),
//                user.getUserDocuments()
//        );
//        return request;
//    }

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
        Set<Group> userGroups = requestUser.getUserGroups();
        for(Group groups : userGroups){
            groups.addUser(user);
        }
//            user.addGroup(group);
        userRepository.save(user);
    }

    @Transactional
    public void deleteUser(String surname){
        User user = userRepository.findBySurname(surname);
        userRepository.delete(user);
    }

//
//    @Transactional
//    public void addBookToInstitution(String title, String documentTitle){
//        User type = typeRepository.findByTitle(title);
//        book.addInstitution(institutionRepository.findByTitle(institutionTitle));
//
//    }

//    @Transactional
//    public void removeBookFromInstitution(String title, String institutionTitle){
//        Institution institution = institutionRepository.findByTitle(institutionTitle); //removing book (owning side) from many to many association
////         bookRepository.findByInstitutionTitle(institutionTitle)
////                .stream()
////                .map(book -> book.getInstitutions().remove(institution));
//
//        Book book = bookRepository.findByTitle(title);
////        Set<Book> bookSet = institution.getBookSet();
//
////        if (!bookSet.contains(book)) {
////            throw new ResourceNotFoundException("the book is not found");
////        } else {
////            institution.removeBook(book);
////        }
//    }
}
