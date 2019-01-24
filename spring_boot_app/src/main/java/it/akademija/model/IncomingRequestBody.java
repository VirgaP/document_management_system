package it.akademija.model;

import it.akademija.entity.Book;
import it.akademija.entity.InstitutionBook;

import java.math.BigDecimal;

public final class IncomingRequestBody {


    private String title;


    private Integer quantity;

    private String status;

    private BigDecimal price;

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    //    private InstitutionBook institutionBook = new InstitutionBook();

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
//
//    public InstitutionBook getInstitutionBook() {
//        return institutionBook;
//    }
//
//    public void setInstitutionBook(InstitutionBook institutionBook) {
//        this.institutionBook = institutionBook;
//    }
}
