package it.akademija.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.dto.DocumentDTO;
import it.akademija.model.IncomingRequestBody;
import it.akademija.model.RequestDocument;
import it.akademija.model.RequestUser;
import it.akademija.model.RequestUserDocument;
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

    @RequestMapping(path="/{email}/documents", method = RequestMethod.GET)
    @ApiOperation(value = "Get all user documents", notes = "Returns list of all documents associated with user")
    List<DocumentDTO> getAllUserDocuments( @PathVariable final String email) {
        return documentService.getAllUserDocuments(email);
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

    @RequestMapping(path = "/{uniqueNumber}/submit", method = RequestMethod.POST)
    @ApiOperation(value = "Submit document", notes = "Submit document, change status")
    @ResponseStatus(HttpStatus.OK)
    void submitDocument(
            @ApiParam(value = "Document data", required = true)
            @PathVariable final String uniqueNumber,
            @RequestBody RequestDocument request)
    {
        documentService.submitDocument(uniqueNumber, request);
    }

}