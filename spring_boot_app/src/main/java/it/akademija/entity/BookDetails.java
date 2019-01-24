package it.akademija.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
public class BookDetails  implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String status;

    private Integer quantity;

    private BigDecimal price;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    private Book book;

    public BookDetails(Long id, String status, Integer quantity, BigDecimal price) {
        this.id = id;
        this.status = status;
        this.quantity = quantity;
        this.price = price;
    }

    public BookDetails() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }
}
