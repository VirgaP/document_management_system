package it.akademija.service;

import it.akademija.dto.DocumentDTO;
import it.akademija.entity.Document;
import it.akademija.entity.Type;
import it.akademija.entity.UserDocument;
import it.akademija.entity.User;
import it.akademija.model.IncomingRequestBody;
import it.akademija.model.RequestDocument;
import it.akademija.model.RequestUser;
import it.akademija.model.RequestUserDocument;
import it.akademija.repository.TypeRepository;
import it.akademija.repository.UserDocumentRepository;
import it.akademija.repository.DocumentRepository;
import it.akademija.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentService {

    private static final Logger LOG = LoggerFactory.getLogger(DocumentService.class);

    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private TypeRepository typeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDocumentRepository userDocumentRepository;

    @Transactional
    public List<Document> getAll(){
        return documentRepository.findAll().stream().collect(Collectors.toList());
    }

    @Transactional
    public void createDocument(RequestDocument requestDocument){
        Type type = typeRepository.findByTitle(requestDocument.getTypeTitle());
        User user = userRepository.findByEmail(requestDocument.getEmail());
        UserDocument userDocument= new UserDocument();
        Document document = new Document(
                new Long(1),
                requestDocument.getUniqueNumber(),
                requestDocument.getTitle(),
                requestDocument.getDescription(),
                new Date()
        );
        document.setType(type);
        documentRepository.save(document);

        userDocument.setUser(user);//ok

        userDocument.setDocument(documentRepository.findByuniqueNumber(requestDocument.getUniqueNumber()));//jei sutampa pavadinimas jpa nesupranta pagal kuri ieskoti, pakiesi i findbyunuique numbet
        document.addUser(userDocument);
        user.addUserDocument(userDocument);

        userDocumentRepository.save(userDocument);

    }

    @Transactional
    public List<DocumentDTO> getDocuments(){
        List<DocumentDTO> documentDTOS = documentRepository.findAll().stream()
                .map(document -> new DocumentDTO(
                        document.getTitle(),
                        document.getUniqueNumber(),
                        document.getDescription(),
                        document.getCreatedDate(),
                        document.getType()))
                .collect(Collectors.toList());

        return documentDTOS;
    }

//    @Transactional
//    public List<DocumentDTO> getDocumentByType() {
//
//        List<DocumentDTO>  documentDTOS = documentRepository.findAll(Sort.by("category"))
//                .stream()
//                .map(insitution -> new RequestInstitution(
//                        insitution.getTitle(), insitution.getCity(), insitution.getImage(), insitution.getCategory(),
//                       insitution.getType(), insitution.getSubtype()))
//                .collect(Collectors.toList());
//        return  requestInstitutions;
//    }


    @Transactional
    public DocumentDTO getDocumentByTitle(String uniqueNumber){
        Document document = documentRepository.findByuniqueNumber(uniqueNumber);

        DocumentDTO documentDTO = new DocumentDTO(
                document.getTitle(),
                document.getUniqueNumber(),
                document.getDescription(),
                document.getCreatedDate(),
                document.getType(),
                document.getUserDocuments()
        );

        return documentDTO;
    }

    @Transactional
    public List<DocumentDTO>  getAllUserDocuments(String email){
        List<DocumentDTO> documents = documentRepository.findAllUserDocumentsl(email).stream()
                .map(document -> new DocumentDTO(
                        document.getTitle(),
                        document.getUniqueNumber(),
                        document.getDescription(),
                        document.getCreatedDate(),
                        document.getType(),
                        document.getUserDocuments()
                ))
                .collect(Collectors.toList());

        return documents;
    }

    @Transactional
    public void updateDocument(RequestDocument requestDocument, String uniqueNumber){
        Document document = documentRepository.findByuniqueNumber(uniqueNumber);
        Type type = typeRepository.findByTitle(requestDocument.getTypeTitle());

                document.setTitle(requestDocument.getTitle());
                document.setDescription(requestDocument.getDescription());
                document.setType(type);

                documentRepository.save(document);
    }

    @Transactional
    public void deleteDocument(String uniqueNumber){
        Document document = documentRepository.findByuniqueNumber(uniqueNumber);

//        for (Book book : institution.getBookSet()) { // removing book from inverse side institution assocition and deleting institution
//            book.getInstitutions().remove(institution);
//        }
        documentRepository.delete(document);

       // arba
//        Institution institution = institutionRepository.findByTitle(title);
//        institution.getBookSet().removeAll(institution.getBookSet());
//        institutionRepository.delete(institution);
    }

    @Transactional
    public void submitDocument(String number, RequestDocument request){
        Document document = documentRepository.findByuniqueNumber(number);
        User user = userRepository.findByEmail(request.getEmail());

        UserDocument userDocument = new UserDocument();
        userDocument.setUser(user);
        userDocument.setDocument(document);

        userDocument.setSubmitted(true);

        userDocumentRepository.save(userDocument);
    }


    @Transactional
    public void confirmDocument(String number, RequestDocument request){
        Document document = documentRepository.findByuniqueNumber(number);
        User user = userRepository.findByEmail(request.getEmail());

        UserDocument userDocument = new UserDocument();
        userDocument.setConfirmed(true);

        userDocumentRepository.save(userDocument);

    }

    @Transactional
    public void rejectDocument(String number, RequestDocument request){
        Document document = documentRepository.findByuniqueNumber(number);
        User user = userRepository.findByEmail(request.getEmail());

        UserDocument userDocument = new UserDocument();
        userDocument.setRejected(true);

        userDocumentRepository.save(userDocument);

    }
    @Transactional
    public void addUser(String title, RequestUser request){//pridet addType
//        Document document = documentRepository.findByTitle(title);
//
//        User user = userRepository.findByEmail(request.getEmail());
//
//        UserDocument userDocument= new UserDocument();
//
//        userDocument.setUser(user);
//        userDocument.setDocument(document);
//
//        userDocumentRepository.save(userDocument);
//
//        document.addUser(userDocument);
//
//        user.addUserDocument(userDocument);

//        bookRepository.save(book);
//        institutionRepository.save(institution);

    }
    @Transactional
    public void removeUser(String title, RequestUser request){
        Document document = documentRepository.findByTitle(title);
        User user = userRepository.findByEmail(request.getEmail());

        UserDocument userDocument = new UserDocument();
        userDocument.setUser(user);
        userDocument.setDocument(document);

        userDocumentRepository.delete(userDocument);

        document.getUserDocuments().remove(userDocument);
        user.getUserDocuments().remove(userDocument);
    }

}
