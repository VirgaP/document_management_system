package it.akademija.service;

import it.akademija.dto.BookDTO;
import it.akademija.dto.BookInstitutionDTO;
import it.akademija.entity.Book;
import it.akademija.entity.Institution;
import it.akademija.exceptions.ResourceNotFoundException;
import it.akademija.model.RequestBook;
import it.akademija.repository.BookRepository;
import it.akademija.repository.InstitutionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BookService {

    private static final Logger LOG = LoggerFactory.getLogger(BookService.class);

    private final BookRepository bookRepository;
    private final InstitutionRepository institutionRepository;

    @Autowired
    public BookService(BookRepository bookRepository, InstitutionRepository institutionRepository) {
        this.bookRepository = bookRepository;
        this.institutionRepository = institutionRepository;
    }

    @Transactional
    public List<BookDTO> getBooksWithoutInstitution() {
        return bookRepository.findAll()
                .stream()
                .map(book -> new BookDTO(
                        book.getTitle(),
                        book.getAuthor(),
                        book.getPageCount(),
                        book.getImage()
                        ))
                .collect(Collectors.toList());
    }

    @Transactional
    public BookDTO getSingleBook(String title){ //grazins tik knyga be sarysio su inst todel be dalines info
        Book book = bookRepository.findByTitle(title);
        BookDTO bookDTO = new BookDTO(
                book.getTitle(),
                book.getAuthor(),
                book.getPageCount(),
                book.getImage()
        );

        return bookDTO;
    }

    @Transactional
    public List<BookInstitutionDTO> getBooksByInstitution(String institutionTitle){
//        return institutionRepository.findBooksByInstitution(institutionTitle)
//                .stream()
//                .map(book -> new BookInstitutionDTO(
//                        book.getTitle(),
//                        book.getAuthor(),
//                        book.getPageCount(),
//                        book.getImage(),
//                        book.getPrice(),
//                        book.getQuantity(),
//                        book.getStatus()
//                        ))
//                .collect(Collectors.toList());

        return bookRepository.findByInstitution(institutionTitle)
                .stream()
                .map(book -> new BookInstitutionDTO(
                        book.getTitle(),
                        book.getAuthor(),
                        book.getPageCount(),
                        book.getImage()
//                        book.getPrice(),
//                        book.getQuantity(),
//                        book.getStatus()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public RequestBook getBookByTitle(String title){  // grazins su Instituciju sarasu
        Book book = bookRepository.findByTitle(title);
        RequestBook requestBook = new RequestBook(
                book.getTitle(),
                book.getAuthor(),
                book.getPageCount(),
                book.getImage()
//                book.getPrice(),
//                book.getQuantity(),
//                book.getStatus()
        );
//        requestBook.getInstitutions();
        return requestBook;
    }

    @Transactional
    public void createBook(RequestBook requestBook) { //some fields without assoc with inst maybe null, status, price
        Book book = new Book(
                requestBook.getTitle(),
                requestBook.getAuthor(),
                requestBook.getPageCount(),
                requestBook.getImage()
        );

        LOG.debug(book.getAuthor());
        bookRepository.save(book);
    }

    @Transactional
    public void deleteBook(String title){
        Book book = bookRepository.findByTitle(title);
        bookRepository.delete(book);
    }

    @Transactional
    public void addBookToInstitution(String title, String institutionTitle){
        Book book = bookRepository.findByTitle(title);
//        book.addInstitution(institutionRepository.findByTitle(institutionTitle));

    }

    @Transactional
    public void removeBookFromInstitution(String title, String institutionTitle){
        Institution institution = institutionRepository.findByTitle(institutionTitle); //removing book (owning side) from many to many association
//         bookRepository.findByInstitutionTitle(institutionTitle)
//                .stream()
//                .map(book -> book.getInstitutions().remove(institution));

        Book book = bookRepository.findByTitle(title);
//        Set<Book> bookSet = institution.getBookSet();

//        if (!bookSet.contains(book)) {
//            throw new ResourceNotFoundException("the book is not found");
//        } else {
//            institution.removeBook(book);
//        }
    }
}
