package it.akademija.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;

import org.hamcrest.Matchers;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;

import it.akademija.FileStorageProperties;
import it.akademija.dto.DocumentDTO;
import it.akademija.entity.Document;
import it.akademija.entity.Group;
import it.akademija.entity.User;
import it.akademija.entity.UserDocument;
import it.akademija.exceptions.ResourceNotFoundException;
import it.akademija.repository.DBFileRepository;
import it.akademija.repository.DocumentRepository;
import it.akademija.repository.FileRepository;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.PagedDocumentRepository;
import it.akademija.repository.PagedUserRepository;
import it.akademija.repository.TypeRepository;
import it.akademija.repository.UserDocumentRepository;
import it.akademija.repository.UserRepository;
import it.akademija.service.DocumentService;
import it.akademija.service.FileStorageService;
import it.akademija.service.UserService;
import it.akademija.service.UserSpecification;
import it.akademija.util.DocumentTestingUtils;
import it.akademija.util.UserTestingUtils;

@RunWith(SpringRunner.class)
@DataJpaTest
public class DocumentControllerTest {

    private static final Random random = new Random();

    // spring
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private ApplicationEventPublisher eventPublisher;
    @Autowired
    private UserRepository userRepository;

    // jpa repos
    @Autowired
    private PagedUserRepository pagedUserRepository;
    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private PagedDocumentRepository pagedDocumentRepository;
    @Autowired
    private TypeRepository typeRepository;
    @Autowired
    private UserDocumentRepository userDocumentRepository;
    @Autowired
    private DBFileRepository dbFileRepository;
    @Autowired
    private FileRepository fileRepository;

    // our components
    private FileStorageProperties fileStorageProperties;
    private PasswordEncoder passwordEncoder;
    private UserSpecification userSpecification;
    private FileStorageService fileStorageService;
    private UserService userService;
    private DocumentService documentService;

    // tested controller
    private DocumentController documentController;

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    @Before
    public void setUp() {
        userSpecification = new UserSpecification();
        fileStorageProperties = new FileStorageProperties();
        ReflectionTestUtils.setField(fileStorageProperties, "uploadDir", "uploadDir");
        passwordEncoder = new BCryptPasswordEncoder(10);
        fileStorageService = new FileStorageService(fileStorageProperties);
        userService = new UserService(entityManager, userRepository, documentRepository, groupRepository, pagedUserRepository,
                passwordEncoder, userSpecification);
        documentService = new DocumentService(documentRepository, pagedDocumentRepository, typeRepository, userRepository, userDocumentRepository,
                dbFileRepository, fileRepository, fileStorageService, fileStorageProperties, entityManager);

        documentController = new DocumentController(documentService, userService, eventPublisher, documentRepository);
    }

    @Test
    public void shouldGetAllDocumentCount() {
        int numberOfExistingDocuments = random.nextInt(100);
        Long result = documentController.documentCount();
        assert result == 0;

        createDocuments(numberOfExistingDocuments);
        result = documentController.documentCount();
        assert numberOfExistingDocuments == result;
    }

    @Test
    public void shouldLoadAllUserDocuments() {
        User existingUser = createUser();
        List<DocumentDTO> result = documentController.getAllUserDocuments(existingUser.getEmail());
        Assert.assertThat(result, Matchers.hasSize(0));

        List<Document> existingDocuments = createDocuments(random.nextInt(15));
        List<UserDocument> existingUserDocuments = userDocumentRepository.saveAll(DocumentTestingUtils.userDocumentFrom(existingUser, existingDocuments));

        result = documentController.getAllUserDocuments(existingUser.getEmail());
        Assert.assertThat(result, Matchers.hasSize(existingUserDocuments.size()));
    }

    @Test
    public void shouldLoadDocument() {
        Document existingDocument = createDocument();

        DocumentDTO result = documentController.getDocument(existingDocument.getUniqueNumber());
        Assert.assertTrue(DocumentTestingUtils.matches(existingDocument, result));
    }

    @Test
    public void shouldFailToLoadNonExistingDocument() {
        String nonExistingDocumentNumber = String.valueOf(Long.MAX_VALUE);

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("No document exists with unique number " + nonExistingDocumentNumber);

        documentController.getDocument(nonExistingDocumentNumber);
    }

    private Document createDocument() {
        return documentRepository.save(DocumentTestingUtils.randomDocument());
    }

    private User createUser() {
        return userRepository.save(UserTestingUtils.randomUser());
    }

    private List<Document> createDocuments(int numberOfDocuments) {
        List<Document> documents = new ArrayList<>();
        for (int i = 0; i < numberOfDocuments; i++) {
            documents.add(documentRepository.save(DocumentTestingUtils.randomDocument()));
        }
        return documents;
    }

}
