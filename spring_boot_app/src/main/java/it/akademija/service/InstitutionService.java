package it.akademija.service;

import it.akademija.entity.Book;
import it.akademija.entity.Institution;
import it.akademija.entity.InstitutionBook;
import it.akademija.model.IncomingRequestBody;
import it.akademija.model.RequestBook;
import it.akademija.model.RequestInstitution;
import it.akademija.model.RequestInstitutionBook;
import it.akademija.repository.BookRepository;
import it.akademija.repository.InstitutionBookRepository;
import it.akademija.repository.InstitutionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InstitutionService {

    private static final Logger LOG = LoggerFactory.getLogger(InstitutionService.class);

    @Autowired
    private InstitutionRepository institutionRepository;
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private InstitutionBookRepository institutionBookRepository;

    @Transactional
    public List<Institution> getAll(){
        return institutionRepository.findAll().stream().collect(Collectors.toList());
    }

    @Transactional
    public void createInstitution(RequestInstitution requestInstitution){
        Institution institution = new Institution(
//                new Long(0),
                requestInstitution.getTitle(),
                requestInstitution.getCity(),
                requestInstitution.getImage(),
                requestInstitution.getCategory(),
                requestInstitution.getType(),
                requestInstitution.getSubtype()
        );
        institutionRepository.save(institution);
    }

    @Transactional
    public List<RequestInstitution> getAllInstitutions(){
        List<RequestInstitution> requestInstitutions = institutionRepository.findAll().stream()
                .map(insitution -> new RequestInstitution(
                        insitution.getTitle(), insitution.getCity(), insitution.getImage(), insitution.getCategory(),
                        insitution.getType(), insitution.getSubtype()))
                .collect(Collectors.toList());

        return requestInstitutions;
    }

    @Transactional
    public List<RequestInstitution> getInstitutionsByCategory() {

        List<RequestInstitution>  requestInstitutions = institutionRepository.findAll(Sort.by("category"))
                .stream()
                .map(insitution -> new RequestInstitution(
                        insitution.getTitle(), insitution.getCity(), insitution.getImage(), insitution.getCategory(),
                       insitution.getType(), insitution.getSubtype()))
                .collect(Collectors.toList());
        return  requestInstitutions;
    }

    @Transactional
    public List<RequestInstitution> getInstitutionsByCategoryAndType() {

        List<RequestInstitution>  requestInstitutions = institutionRepository.findAll(Sort.by("category").and(Sort.by("type")))
                .stream()
                .map(insitution -> new RequestInstitution(
                        insitution.getTitle(), insitution.getCity(), insitution.getImage(), insitution.getCategory(),
                        insitution.getType(), insitution.getSubtype()))
                .collect(Collectors.toList());
        return  requestInstitutions;
    }

    public RequestInstitution getInstitutionByTitle(String title){
        Institution institution = institutionRepository.findByTitle(title);

        RequestInstitution requestInstitution = new RequestInstitution(
                institution.getTitle(),
                institution.getCity(),
                institution.getImage(),
                institution.getCategory(),
                institution.getType(),
                institution.getSubtype(),
                institution.getBooks()
        );

        return requestInstitution;
    }

    @Transactional
    public void updateInstition(RequestInstitution requestInstitution, String title){
        Institution institution = institutionRepository.findByTitle(title);

                institution.setTitle(requestInstitution.getTitle());
                institution.setCity(requestInstitution.getCity());
                institution.setImage(requestInstitution.getImage());
                institution.setCategory(requestInstitution.getCategory());
                institution.setType(requestInstitution.getType());
                institution.setSubtype(requestInstitution.getSubtype());
    }

    @Transactional
    public void deleteInstitution(String title){
        Institution institution = institutionRepository.findByTitle(title);

//        for (Book book : institution.getBookSet()) { // removing book from inverse side institution assocition and deleting institution
//            book.getInstitutions().remove(institution);
//        }
        institutionRepository.delete(institution);

       // arba
//        Institution institution = institutionRepository.findByTitle(title);
//        institution.getBookSet().removeAll(institution.getBookSet());
//        institutionRepository.delete(institution);
    }

    @Transactional
    public void addBook(String title, IncomingRequestBody request){
        Institution institution = institutionRepository.findByTitle(title);

        Book book = bookRepository.findByTitle(request.getTitle());

        InstitutionBook institutionBook= new InstitutionBook();

        institutionBook.setBook(book);
        institutionBook.setInstitution(institution);

        institutionBook.setRegisteredDate(new Date());
        institutionBook.setStatus(request.getStatus());
        institutionBook.setPrice(request.getPrice());
        institutionBook.setQuantity(request.getQuantity());

        institutionBookRepository.save(institutionBook);


        institution.addBook(institutionBook);
        System.out.println("Size 1 " + institution.getBooks().size());

        book.addInstitutionBook(institutionBook);
        System.out.println("Size 2 " + book.getInstitutionBooks().size());
//        bookRepository.save(book);
//        institutionRepository.save(institution);

    }

    @Transactional
   public void removeBook(String title, RequestBook request){
        Institution institution = institutionRepository.findByTitle(title);
        Book book = bookRepository.findByTitle(request.getTitle());

        InstitutionBook institutionBook = new InstitutionBook();
        institutionBook.setBook(book);
        institutionBook.setInstitution(institution);

        institutionBookRepository.delete(institutionBook);

        institution.getBooks().remove(institutionBook);
        book.getInstitutionBooks().remove(institutionBook);


    }

}
