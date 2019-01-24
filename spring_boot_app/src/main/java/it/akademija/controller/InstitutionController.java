package it.akademija.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.dto.BookInstitutionDTO;
import it.akademija.entity.Institution;
import it.akademija.model.IncomingRequestBody;
import it.akademija.model.RequestBook;
import it.akademija.model.RequestInstitution;
import it.akademija.model.RequestInstitutionBook;
import it.akademija.service.BookService;
import it.akademija.service.InstitutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/institutions")
public class InstitutionController {

    private final InstitutionService institutionService;
    private final BookService bookService;
    private Institution institution;

    @Autowired
    public InstitutionController(InstitutionService institutionService, BookService bookService) {
        this.institutionService = institutionService;
        this.bookService = bookService;
    }

    @RequestMapping(method = RequestMethod.POST)
    @ApiOperation(value = "Create institution", notes = "Creates institution from received data from form")
    @ResponseStatus(HttpStatus.CREATED)
    void createInstitution(@ApiParam(value = "Institution data", required = true)
                           @RequestBody final RequestInstitution requestInstitution) {
        institutionService.createInstitution(requestInstitution);
    }

    @RequestMapping(method = RequestMethod.GET)
    @ApiOperation(value = "Get all institutions", notes = "Returns list of all instituions in databse")
    List<RequestInstitution> getAllInstitutions() {
        return institutionService.getAllInstitutions();
    }

    @RequestMapping(path="/category", method = RequestMethod.GET)
    @ApiOperation(value = "Get all by category", notes = "Returns list of all instituions in databse by category")
    List<RequestInstitution> getAllInstitutionsByCategory() {
        return institutionService.getInstitutionsByCategory();
    }

    @RequestMapping(path="/category/type", method = RequestMethod.GET)
    @ApiOperation(value = "Get all by category and type", notes = "Returns list of all instituions in databse by category and type")
    List<RequestInstitution> getAllInstitutionsByCategoryAndType() {
        return institutionService.getInstitutionsByCategoryAndType();
    }


    @RequestMapping(path = "/{title}", method = RequestMethod.GET)
    @ApiOperation(value = "Get one institution", notes = "Returns one institution by title")
    public RequestInstitution getInstitution(
            @PathVariable final String title) {
        return institutionService.getInstitutionByTitle(title);
    }

    @RequestMapping(path = "/{title}/edit", method = RequestMethod.PUT)
    @CrossOrigin(origins = "http://localhost:3000")
    @ApiOperation(value = "Get and update product", notes = "Returns product by product number and updates")
    @ResponseStatus(HttpStatus.OK)
    public void updateInstitution(
            @ApiParam(value = "Institution data", required = true)
            @RequestBody RequestInstitution institution,
            @PathVariable final String title){
        institutionService.updateInstition(institution, title);
    }

    @RequestMapping(path = "/{title}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value = "Delete institution", notes = "Deletes institution by title")
    void deleteInstitution(@PathVariable final String title) {
        institutionService.deleteInstitution(title);

    }

    @RequestMapping(path="/{title}/books", method = RequestMethod.GET)
    @ApiOperation(value="Get list of all books", notes="Returns list of all books in DB not bound to institution") //defined in bookservcie
    public List<BookInstitutionDTO> getAllBooksByInstitution(
            @PathVariable final String institutionTitle) {
        return bookService.getBooksByInstitution(institutionTitle);
    }


    @RequestMapping(path = "/{title}", method = RequestMethod.POST)
    @ApiOperation(value = "Add book", notes = "Add book to institution")
    @ResponseStatus(HttpStatus.OK)
    void addBook(
            @ApiParam(value = "Institution data", required = true)
            @PathVariable final String title,
            @RequestBody IncomingRequestBody request
            )
    {
        institutionService.addBook(title, request);
    }

    @RequestMapping(path = "/{title}/removeBook", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value = "Delete institution", notes = "Deletes book form institution books collection")
    void removeBook(@PathVariable final String title,
                    @RequestBody RequestBook requestBook) {
        institutionService.removeBook(title, requestBook);

    }

}