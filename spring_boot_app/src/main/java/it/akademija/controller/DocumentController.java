package it.akademija.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.dto.DocumentDTO;
import it.akademija.payload.RequestDocument;
import it.akademija.payload.RequestMessage;
import it.akademija.repository.DocumentRepository;
import it.akademija.service.UserService;
import it.akademija.service.DocumentService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/api/documents")
public class DocumentController {
    private static final Logger logger = LoggerFactory.getLogger(DocumentController.class);

    private final DocumentService documentService;
    private final UserService userService;
    private ApplicationEventPublisher eventPublisher;
    private final DocumentRepository documentRepository;

    @Autowired
    public DocumentController(DocumentService documentService, UserService userService, ApplicationEventPublisher eventPublisher, DocumentRepository documentRepository) {
        this.documentService = documentService;
        this.userService = userService;
        this.eventPublisher = eventPublisher;
        this.documentRepository = documentRepository;
    }


    @GetMapping("/test")
    public Page<DocumentDTO> pathParamDocuments(Pageable pageable) {
        logger.info("returning documentService.lisByPage");

        return documentService.listByPage(pageable);
    }

    @GetMapping("/count")
    public Long documentCount() {
        //logger.info("returns documentCount");

        return documentService.returnCount();
    }

    @GetMapping("/{email}/all")
    public Page<DocumentDTO> userAllDocumentsPaged(@PathVariable final String email, Pageable pageable) {
        return documentService.pagedAllUserDocuments(email, pageable);
    }

    @GetMapping("/{email}/submitted")
    public Page<DocumentDTO> userSubmittedDocumentsPaged(@PathVariable final String email, Pageable pageable) {
        return documentService.pagedUserSubmittedDocuments(email, pageable);
    }

    @GetMapping("/{email}/confirmed")
    public Page<DocumentDTO> userConfirmedDocumentsPaged(@PathVariable final String email, Pageable pageable) {
        return documentService.pagedUserConfirmedDocuments(email, pageable);
    }

    @GetMapping("/{email}/notSubmitted")
    public Page<DocumentDTO> userNotSubmittedDocumentsPaged(@PathVariable final String email, Pageable pageable) {
        return documentService.pagedUserNotSubmittedDocuments(email, pageable);
    }

    @GetMapping("/{email}/rejected")
    public Page<DocumentDTO> userRejectedDocumentsPaged(@PathVariable final String email, Pageable pageable) {
        return documentService.pagedUserRejectedDocuments(email, pageable);
    }

    @GetMapping("/{email}/received")
    public Page<DocumentDTO> userReceivedDocumentsPaged(@PathVariable final String email, Pageable pageable) {
        return documentService.pagedUserReceivedDocuments(email, pageable);
    }

    @GetMapping("/documentsSpecCount/{title}")
    public int getDocumentByTypeStatusCount(@PathVariable final String title){
        return documentRepository.findCountByDocumentTitleAndStatus(title);
    }

    @GetMapping("/{email}/submittedCount")
    public int userSubmittedDocumentCount(@PathVariable final String email) {
        return documentService.returnSubmittedlUserDocumentCount(email);
    }

    @GetMapping("/{email}/confirmedCount")
    public int userConfirmedDocumentCount(@PathVariable final String email) {
        return documentService.returnConfirmedUserDocumentCount(email);
    }

    @GetMapping("/{email}/rejectedCount")
    public int userRejectedDocumentCount(@PathVariable final String email) {
        return documentService.returnAllUserDocumentCount(email);
    }

    @RequestMapping(path="/new", method = RequestMethod.POST)
    @ApiOperation(value = "Create document", notes = "Creates document with received data from the form")
    @ResponseStatus(HttpStatus.CREATED)
    void createDocument(@ApiParam(value = "Document data", required = true)
                           @RequestBody final RequestDocument requestDocument) {
        documentService.createDocument(requestDocument);
    }

    @RequestMapping(path="/{email}/documents", method = RequestMethod.GET)
    @ApiOperation(value = "Get all user documents", notes = "Returns list of all documents associated with user")
    List<DocumentDTO> getAllUserDocuments( @PathVariable final String email) {
        //logger.info("returns all users documents filtered using email");
        return documentService.getAllUserDocuments(email);
    }

    @RequestMapping(path="/{email}/received/documents", method = RequestMethod.GET)
    @ApiOperation(value = "Get all user documents", notes = "Returns list of all documents associated with user")
    List<DocumentDTO> getAllUserReceivedDocuments( @PathVariable final String email) {
        //logger.info("Returns all received documents filtered using email");
        return documentService.getAllUserReceivedDocuments(email);
    }

    @RequestMapping(path="/{uniqueNumber}/file", method = RequestMethod.POST)
    @ApiOperation(value = "Add file", notes = "Add additional attachements to created document")
    void addAdditionalFiles(
            @PathVariable final String uniqueNumber,
            @RequestBody RequestDocument request) {
        documentService.additionalFile(uniqueNumber, request);
    }


    @RequestMapping(method = RequestMethod.GET)
    @ApiOperation(value = "Get all documents", notes = "Returns list of all documents in database")
    List<DocumentDTO> getAllDocuments() {
        //logger.info("Returns list of all documents in database");
        return documentService.getAll();
    }


    @RequestMapping(path = "/{uniqueNumber}", method = RequestMethod.GET)
    @ApiOperation(value = "Get one document", notes = "Returns one document by number")
    public DocumentDTO getDocument(
            @PathVariable final String uniqueNumber) {
        //logger.info ("The document No: " + uniqueNumber+ " has been returned");
        return documentService.getDocumentByTitle(uniqueNumber);
    }

    @RequestMapping(path = "/{uniqueNumber}/edit", method = RequestMethod.PUT)
    @ApiOperation(value = "Get and update document", notes = "Returns document by document number and updates")
    @ResponseStatus(HttpStatus.OK)
    public void updateDocument(
            @ApiParam(value = "Document data", required = true)
            @RequestBody RequestDocument request,
            @PathVariable final String uniqueNumber){
        documentService.updateDocument(request, uniqueNumber);
        //logger.info("The document No: " + uniqueNumber + "has been updated");
    }

    @RequestMapping(path = "/{uniqueNumber}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value = "Delete document", notes = "Deletes document by number")
    void deleteDocument(@PathVariable final String uniqueNumber) {
        documentService.deleteDocument(uniqueNumber);
        //logger.info("The document No: " +  uniqueNumber+ "has been deleted");

    }

    @RequestMapping(path = "/{uniqueNumber}/{email}/submit", method = RequestMethod.PUT)
    @ApiOperation(value = "Submit document", notes = "Submit document, change status")
    @ResponseStatus(HttpStatus.OK)
    void submitDocument(
            @ApiParam(value = "Document data", required = true)
            @PathVariable final String uniqueNumber,
            @PathVariable final String email)
    {
        logger.info("The document No: "+ uniqueNumber+ "has been submitted");
        documentService.submitDocument(uniqueNumber, email);
    }

    @RequestMapping(path = "/{uniqueNumber}/{email}/confirm", method = RequestMethod.PUT)
    @ApiOperation(value = "Confirm document", notes = "Confirm document, change status")
    @ResponseStatus(HttpStatus.OK)
    void confirmDocument(
            @ApiParam(value = "Document data", required = true)
            @PathVariable final String uniqueNumber,
            @PathVariable final String email)
    {
        logger.info("The document No: "+ uniqueNumber+ "has been confirmed");
        documentService.confirmDocument(uniqueNumber, email);
    }

    @RequestMapping(path = "/{uniqueNumber}/{email}/reject", method = RequestMethod.PUT)
    @ApiOperation(value = "Reject document", notes = "Reject document, change status")
    @ResponseStatus(HttpStatus.OK)
    void rejectDocument(
            @ApiParam(value = "Document data", required = true)
            @PathVariable final String uniqueNumber,
            @PathVariable final String email,
            @RequestBody RequestMessage request)
    {
        logger.info("The document No: "+ uniqueNumber+ "has been rejected");
        documentService.rejectDocument(uniqueNumber, email, request);
    }

}