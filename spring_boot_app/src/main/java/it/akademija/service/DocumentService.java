package it.akademija.service;

import it.akademija.FileStorageProperties;
import it.akademija.dto.DocumentDTO;
import it.akademija.entity.*;
import it.akademija.payload.RequestDocument;
import it.akademija.payload.RequestUser;
import it.akademija.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.io.IOException;
import java.nio.file.Path;
import java.util.*;
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

    @Autowired
    private DBFileRepository dbFileRepository;

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private FileStorageProperties fileStorageProperties;

    @Transactional
    public List<Document> getAll(){
        return documentRepository.findAll().stream().collect(Collectors.toList());
    }

    @Transactional
    public void createDocument(RequestDocument requestDocument){
        Type type = typeRepository.findByTitle(requestDocument.getTypeTitle());
        User user = userRepository.findByEmail(requestDocument.getEmail());
        File file = fileRepository.findByFileName(requestDocument.getFileName());

        UserDocument userDocument= new UserDocument();
        Document document = new Document(
                new Long(1),
                requestDocument.getUniqueNumber(),
                requestDocument.getTitle(),
                requestDocument.getDescription(),
                new Date()
        );
        document.setType(type);

        document.addDbFile(file);

        documentRepository.save(document);

//        file.setDocument(documentRepository.findByuniqueNumber(requestDocument.getUniqueNumber()));

        userDocument.setUser(user);//ok

        userDocument.setDocument(documentRepository.findByuniqueNumber(requestDocument.getUniqueNumber()));//jei sutampa pavadinimas jpa nesupranta pagal kuri ieskoti, pakiesi i findbyunuique numbet

        userDocumentRepository.save(userDocument);

    }

    @Transactional
    public void additionalFile(String uniqueNumber,RequestDocument requestDocument){
        Document document = documentRepository.findByuniqueNumber(uniqueNumber);
        File file = fileRepository.findByFileName(requestDocument.getFileName());
        List<File> files = document.getDbFiles();

        file.setDocument(document);
        document.addDbFile(file);
        fileRepository.save(file);

        ListIterator<File> listIterator = files.listIterator();
        listIterator.add(file);

        document.setDbFiles(files);
        documentRepository.save(document);
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
                document.getUserDocuments(),
                document.getDbFiles()
        );
        System.out.println("failai " + document.getDbFiles());
        return documentDTO;
    }

    @Transactional
    public List<DocumentDTO> getAllUserDocuments(String email){
        List<DocumentDTO> documents = documentRepository.findAllUserDocumentsl(email).stream()
                .map(document -> new DocumentDTO(
                        document.getTitle(),
                        document.getUniqueNumber(),
                        document.getDescription(),
                        document.getCreatedDate(),
                        document.getType(),
                        document.getUserDocuments(),
                        document.getDbFiles()
                ))
                .collect(Collectors.toList());

        return documents;
    }

    @Transactional
    public List<DocumentDTO> getAllUserSubmittedDocuments(String email){
        List<DocumentDTO> documents = documentRepository.findAllUserSubmittedDocumentsl(email).stream()
                .map(document -> new DocumentDTO(
                        document.getTitle(),
                        document.getUniqueNumber(),
                        document.getDescription(),
                        document.getCreatedDate(),
                        document.getType(),
                        document.getUserDocuments(),
                        document.getDbFiles()
                ))
                .collect(Collectors.toList());

        return documents;
    }

    @Transactional
    public List<DocumentDTO> getAllUserConfirmedDocuments(String email){
        List<DocumentDTO> documents = documentRepository.findAllUserConfirmedDocumentsl(email).stream()
                .map(document -> new DocumentDTO(
                        document.getTitle(),
                        document.getUniqueNumber(),
                        document.getDescription(),
                        document.getCreatedDate(),
                        document.getType(),
                        document.getUserDocuments(),
                        document.getDbFiles()
                ))
                .collect(Collectors.toList());

        return documents;
    }


    @Transactional
    public List<DocumentDTO> getAllUserRejectedDocuments(String email){
        List<DocumentDTO> documents = documentRepository.findAllUserRejectedDocumentsl(email).stream()
                .map(document -> new DocumentDTO(
                        document.getTitle(),
                        document.getUniqueNumber(),
                        document.getDescription(),
                        document.getCreatedDate(),
                        document.getType(),
                        document.getUserDocuments(),
                        document.getDbFiles()
                ))
                .collect(Collectors.toList());

        return documents;
    }

    @Transactional
    public List<DocumentDTO> getAllUserReceivedDocuments(String email){
        List<DocumentDTO> documents = documentRepository.findReceivedUserDocuments(email).stream()
                .map(document -> new DocumentDTO(
                        document.getTitle(),
                        document.getUniqueNumber(),
                        document.getDescription(),
                        document.getCreatedDate(),
                        document.getType(),
                        document.getUserDocuments(),
                        document.getDbFiles()
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
        document.setType(null);

        List<File> dbFiles = document.getDbFiles();


        for (Iterator<File> iterator = dbFiles.iterator(); iterator.hasNext(); ) {

            File value = iterator.next();

            String fileName = value.getFileName();
            Resource resource = fileStorageService.loadFileAsResource(fileName);

            try {
                resource.getFile().delete();
            } catch (IOException e) {
                e.printStackTrace();
            }
            iterator.remove();
            }

        documentRepository.delete(document);
    }

    @Transactional
    public void submitDocument(String number, String email){
        Document document = documentRepository.findByuniqueNumber(number);
        User user = userRepository.findByEmail(email);

        UserDocument userDocument = new UserDocument();
        userDocument.setUser(user);
        userDocument.setDocument(document);

        userDocument.setSubmitted(true);

        userDocumentRepository.save(userDocument);
    }


    @Transactional
    public void confirmDocument(String number, String email){
        Document document = documentRepository.findByuniqueNumber(number);
        User user = userRepository.findByEmail(email);

        UserDocument userDocument = new UserDocument();
        userDocument.setUser(user);
        userDocument.setDocument(document);

        userDocument.setSubmitted(true);
        userDocument.setConfirmed(true);

        userDocumentRepository.save(userDocument);

    }

    @Transactional
    public void rejectDocument(String number, String email){
        Document document = documentRepository.findByuniqueNumber(number);
        User user = userRepository.findByEmail(email);

        UserDocument userDocument = new UserDocument();

        userDocument.setUser(user);
        userDocument.setDocument(document);

        userDocument.setRejected(true);


        userDocumentRepository.save(userDocument);

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
