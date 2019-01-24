package it.akademija.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class InstitutionBookId implements Serializable {

    private Institution institution;
    private Book book;

    @ManyToOne(cascade = CascadeType.MERGE)
    public Institution getInstitution() {
        return institution;
    }

    public void setInstitution(Institution institution) {
        this.institution = institution;
    }

    @ManyToOne(cascade = CascadeType.MERGE)
    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    //    @Column(name = "institution_id")
//    private Long institutionId;
//
//    @Column(name = "book_id")
//    private Long bookId;
//
//    public InstitutionBookId() {
//    }
//
//    public InstitutionBookId(Long institutionId, Long bookId) {
//        this.institutionId = institutionId;
//        this.bookId = bookId;
//    }
//
//    public Long getInstitutionId() {
//        return institutionId;
//    }
//
//    public void setInstitutionId(Long institutionId) {
//        this.institutionId = institutionId;
//    }
//
//    public Long getBookId() {
//        return bookId;
//    }
//
//    public void setBookId(Long bookId) {
//        this.bookId = bookId;
//    }

//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//
//        if (o == null || getClass() != o.getClass())
//            return false;
//
//        Institution that = (InstitutionBookId) o;
//        return Objects.equals(institutionId, that.institutionId) &&
//                Objects.equals(bookId, that.bookId);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(institutionId, bookId);
//    }
}
