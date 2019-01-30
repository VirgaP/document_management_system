package it.akademija.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.dto.DocumentDTO;
import it.akademija.model.IncomingRequestBody;
import it.akademija.model.RequestDocument;
import it.akademija.model.RequestUser;
import it.akademija.service.UserService;
import it.akademija.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @RequestMapping(method = RequestMethod.GET)
    @ApiOperation(value = "Get all documents", notes = "Returns list of all documents in database")
    List<DocumentDTO> getAlldocuments() {
        return documentService.getDocuments();
    }
//
//    @RequestMapping(path="/category", method = RequestMethod.GET)
//    @ApiOperation(value = "Get all by category", notes = "Returns list of all instituions in databse by category")
//    List<RequestInstitution> getAllInstitutionsByCategory() {
//        return institutionService.getInstitutionsByCategory();
//    }

//    @RequestMapping(path="/category/type", method = RequestMethod.GET)
//    @ApiOperation(value = "Get all by category and type", notes = "Returns list of all instituions in databse by category and type")
//    List<RequestInstitution> getAllInstitutionsByCategoryAndType() {
//        return institutionService.getInstitutionsByCategoryAndType();
//    }


    @RequestMapping(path = "/{title}", method = RequestMethod.GET)
    @ApiOperation(value = "Get one document", notes = "Returns one document by title")
    public DocumentDTO getDocument(
            @PathVariable final String title) {
        return documentService.getDocumentByTitle(title);
    }

    @RequestMapping(path = "/{title}/edit", method = RequestMethod.PUT)
    @ApiOperation(value = "Get and update document", notes = "Returns document by document title and updates")
    @ResponseStatus(HttpStatus.OK)
    public void updateDocument(
            @ApiParam(value = "Document data", required = true)
            @RequestBody RequestDocument document,
            @PathVariable final String title){
        documentService.updateDocument(document, title);
    }

    @RequestMapping(path = "/{title}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value = "Delete document", notes = "Deletes document by title")
    void deleteDocument(@PathVariable final String title) {
        documentService.deleteDocument(title);

    }

//    @RequestMapping(path="/{title}/books", method = RequestMethod.GET)
//    @ApiOperation(value="Get list of all books", notes="Returns list of all books in DB not bound to institution") //defined in bookservcie
//    public List<BookInstitutionDTO> getAllBooksByInstitution(
//            @PathVariable final String institutionTitle) {
//        return bookService.getBooksByInstitution(institutionTitle);
//    }


    @RequestMapping(path = "/{title}", method = RequestMethod.POST)
    @ApiOperation(value = "Add type", notes = "Add document type")
    @ResponseStatus(HttpStatus.OK)
    void addDocumentType(
            @ApiParam(value = "Document data", required = true)
            @PathVariable final String title,
            @RequestBody RequestUser request
            )
    {
        documentService.addUser(title, request);
    }

    @RequestMapping(path = "/{title}/removeType", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value = "Delete document", notes = "Removes type from document")
    void removeDocumentType(@PathVariable final String title,
                    @RequestBody RequestUser requestUser) {
        documentService.removeUser(title, requestUser);

    }

}