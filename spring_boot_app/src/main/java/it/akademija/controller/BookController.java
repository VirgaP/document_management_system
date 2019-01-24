package it.akademija.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.dto.BookDTO;
import it.akademija.dto.BookInstitutionDTO;
import it.akademija.dto.UserDTO;
import it.akademija.model.CreateUserCommand;
import it.akademija.model.RequestBook;
import it.akademija.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(value="book")
@RequestMapping(value = "/api/books")
public class BookController {

    public final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @RequestMapping(path="/new", method = RequestMethod.POST)
    @ApiOperation(value="Create book", notes = "Creates a book from request without association")
    @ResponseStatus(HttpStatus.CREATED)
    public void createBook(
            @ApiParam(value="Book data", required=true)
            @RequestBody final RequestBook requestBook){

        bookService.createBook(requestBook);
    }


    @RequestMapping(path = "/add/{bookTitle}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value="Add book to institution", notes="Add book to institution")
    public void addBookToInstitution(
            @PathVariable final String title,
            @RequestBody final String institutionTitle
            ){
        bookService.addBookToInstitution(title,institutionTitle);
    }

    @RequestMapping(method = RequestMethod.GET)
    @ApiOperation(value="Get list of all books", notes="Returns list of all books in DB not bound to institution")
    public List<BookDTO> getAllBooks() {

        return bookService.getBooksWithoutInstitution();
    }

    @RequestMapping(path = "/institution/{bookTitle}", method = RequestMethod.GET)
    @ApiOperation(value="Get one book", notes="Returns one book by title bound to institution")
    public RequestBook getBookByTitle(@PathVariable final String title){
        return bookService.getBookByTitle(title);
    }


    @RequestMapping(path = "/{bookTitle}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value="Delete book", notes="Deletes book by title")
    public void deleteBook(@PathVariable final String title){
        bookService.deleteBook(title);
    }

    @RequestMapping(path = "/remove/{bookTitle}", method = RequestMethod.GET) //o gal post/delete?
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value="Remove book to institution", notes="Remove book from institution")
    public void removeBookFromInstitution(
            @PathVariable final String title,
            @RequestBody final String institutionTitle
    ){
        bookService.addBookToInstitution(title,institutionTitle);
    }

}
