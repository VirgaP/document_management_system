package it.akademija.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Objects;

@Entity
//@IdClass(InstitutionBookId.class)
@Table(name = "institution_book")
@AssociationOverrides({
        @AssociationOverride(name = "primaryKey.institution",
        joinColumns = @JoinColumn(name = "INSTITUTION_ID")),
        @AssociationOverride(name = "primaryKey.book",
        joinColumns = @JoinColumn(name = "BOOK_ID")) })
public class InstitutionBook{

    private InstitutionBookId primaryKey = new InstitutionBookId();

//    @ManyToOne(fetch = FetchType.LAZY)
//    @MapsId("institutionId")
//    private Institution institution;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @MapsId("bookId")
//    private Book book;



    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "status")
    private String status;

    @Column(name = "price")
    private BigDecimal price;

    private Date registeredDate;

    public InstitutionBook() {
    }

//    public InstitutionBook(Institution institution, Book book) {
//        this.institution = institution;
//        this.book = book;
//        this.primaryKey = new InstitutionBookId(institution.getId(), book.getId());
//
//    }

    @EmbeddedId
    public InstitutionBookId getPrimaryKey() {
        return primaryKey;
    }

    public void setPrimaryKey(InstitutionBookId primaryKey) {
        this.primaryKey = primaryKey;
    }

    @Transient
    public Institution getInstitution() {
        return getPrimaryKey().getInstitution();
    }

    public void setInstitution(Institution institution) {
        getPrimaryKey().setInstitution(institution);
    }

    @Transient
    public Book getBook() {
        return getPrimaryKey().getBook();
    }

    public void setBook(Book book) {
        getPrimaryKey().setBook(book);
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

    @Column(name = "REGISTERED_DATE")
    @Temporal(TemporalType.DATE)
    public Date getRegisteredDate() {
        return registeredDate;
    }

    public void setRegisteredDate(Date registeredDate) {
        this.registeredDate = registeredDate;
    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//
//        if (o == null || getClass() != o.getClass())
//            return false;
//
//        InstitutionBook that = (InstitutionBook) o;
//        return Objects.equals(institution, that.institution) &&
//                Objects.equals(book, that.book);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(institution, book);
//    }
}
