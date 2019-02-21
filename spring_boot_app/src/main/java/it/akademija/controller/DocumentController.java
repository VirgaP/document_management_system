package it.akademija.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.dto.DocumentDTO;
import it.akademija.payload.RequestDocument;
import it.akademija.service.UserService;
import it.akademija.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/documents")
public class DocumentController {

    private final DocumentService documentService;
    private final UserService userService;

    @Autowired
    public DocumentController(DocumentService documentService, UserService userService) {
        this.documentService = documentService;
        this.userService = userService;
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
    List<DocumentDTO> getAlldocuments() {
        return documentService.getDocuments();
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