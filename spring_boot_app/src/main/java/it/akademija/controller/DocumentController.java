package it.akademija.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.dto.DocumentDTO;
import it.akademija.entity.Document;
import it.akademija.events.PaginatedResultsRetrievedEvent;
import it.akademija.exceptions.ResourceNotFoundException;
import it.akademija.payload.RequestDocument;
import it.akademija.service.UserService;
import it.akademija.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(value = "/api/documents")
public class DocumentController {

    private final DocumentService documentService;
    private final UserService userService;
    private ApplicationEventPublisher eventPublisher;

    @Autowired
    public DocumentController(DocumentService documentService, UserService userService, ApplicationEventPublisher eventPublisher) {
        this.documentService = documentService;
        this.userService = userService;
        this.eventPublisher = eventPublisher;
    }

    @GetMapping(params = { "page", "size" })
    public List<Document> findPaginatedDocuments(@RequestParam("page") int page,
                                   @RequestParam("size") int size, UriComponentsBuilder uriBuilder,
                                   HttpServletResponse response) {
        Page<Document> resultPage = documentService.listPages(page, size);
        if (page > resultPage.getTotalPages()) {
            throw new ResourceNotFoundException();
        }
        eventPublisher.publishEvent(new PaginatedResultsRetrievedEvent<Document>(
                Document.class, uriBuilder, response, page, resultPage.getTotalPages(), size));

        return resultPage.getContent();
    }

    @GetMapping(path="/{page}/{size}", params = { "page", "size" })
    public List<Document> findPaginated(@PathVariable("page") int page,
                                        @PathVariable("size") int size, UriComponentsBuilder uriBuilder,
                                        HttpServletResponse response) {
        Page<Document> resultPage = documentService.listPages(page, size);
        if (page > resultPage.getTotalPages()) {
            throw new ResourceNotFoundException();
        }
        eventPublisher.publishEvent(new PaginatedResultsRetrievedEvent<Document>(
                Document.class, uriBuilder, response, page, resultPage.getTotalPages(), size));

        return resultPage.getContent();
    }


    @GetMapping("/test")
    public Page<DocumentDTO> pathParamDocuments(Pageable pageable) {
        return documentService.listByPage(pageable);
    }

    @GetMapping("/count")
    public Long documentCount() {
        return documentService.returnCount();
    }

    @GetMapping("/{email}/all")
    public int userAllDocumentCount(@PathVariable final String email) {
        return documentService.returnAllUserDocumentCount(email);
    }

    @GetMapping("/{email}/submitted")
    public int userSubmittedDocumentCount(@PathVariable final String email) {
        return documentService.returnSubmittedlUserDocumentCount(email);
    }

    @GetMapping("/{email}/confirmed")
    public int userConfirmedDocumentCount(@PathVariable final String email) {
        return documentService.returnConfirmedUserDocumentCount(email);
    }

    @GetMapping("/{email}/rejected")
    public int userRejectedDocumentCount(@PathVariable final String email) {
        return documentService.returnAllUserDocumentCount(email);
    }

//    @RequestMapping(value = "/pages", method = RequestMethod.GET)
//    public List<DocumentDTO> getDocumentsByPage(@RequestParam(value = "page", defaultValue = "0") int page,
//                                   @RequestParam(value = "limit", defaultValue = "10") int limit) {
//
//        return documentService.getDocumentsPage(page, limit);
//    }

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
        return documentService.getAllUserDocuments(email);
    }

    @RequestMapping(path="/{email}/received", method = RequestMethod.GET)
    @ApiOperation(value = "Get all user documents", notes = "Returns list of all documents associated with user")
    List<DocumentDTO> getAllUserReceivedDocuments( @PathVariable final String email) {
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
        return documentService.getAll();
    }


    @RequestMapping(path = "/{uniqueNumber}", method = RequestMethod.GET)
    @ApiOperation(value = "Get one document", notes = "Returns one document by number")
    public DocumentDTO getDocument(
            @PathVariable final String uniqueNumber) {
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
    }

    @RequestMapping(path = "/{uniqueNumber}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value = "Delete document", notes = "Deletes document by number")
    void deleteDocument(@PathVariable final String uniqueNumber) {
        documentService.deleteDocument(uniqueNumber);

    }

    @RequestMapping(path = "/{uniqueNumber}/{email}/submit", method = RequestMethod.PUT)
    @ApiOperation(value = "Submit document", notes = "Submit document, change status")
    @ResponseStatus(HttpStatus.OK)
    void submitDocument(
            @ApiParam(value = "Document data", required = true)
            @PathVariable final String uniqueNumber,
            @PathVariable final String email)
    {
        documentService.submitDocument(uniqueNumber, email);
    }

    @RequestMapping(path = "/{uniqueNumber}/{email}/confirm", method = RequestMethod.PUT)
    @ApiOperation(value = "Submit document", notes = "Submit document, change status")
    @ResponseStatus(HttpStatus.OK)
    void confirmDocument(
            @ApiParam(value = "Document data", required = true)
            @PathVariable final String uniqueNumber,
            @PathVariable final String email)
    {
        documentService.confirmDocument(uniqueNumber, email);
    }

    @RequestMapping(path = "/{uniqueNumber}/{email}/reject", method = RequestMethod.PUT)
    @ApiOperation(value = "Submit document", notes = "Submit document, change status")
    @ResponseStatus(HttpStatus.OK)
    void rejectDocument(
            @ApiParam(value = "Document data", required = true)
            @PathVariable final String uniqueNumber,
            @PathVariable final String email)
    {
        documentService.rejectDocument(uniqueNumber, email);
    }

}