package it.akademija.model;

import it.akademija.entity.Book;
import it.akademija.entity.Institution;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import java.math.BigDecimal;

public final class RequestInstitutionBook {


    private Integer quantity;

    private String status;

    private BigDecimal price;


    public RequestInstitutionBook() {
    }

    public RequestInstitutionBook(Integer quantity, String status, BigDecimal price) {
        this.quantity = quantity;
        this.status = status;
        this.price = price;
    }


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

}
