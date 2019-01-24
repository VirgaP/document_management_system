package it.akademija.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

@Entity
public class Institution {
    private static final long serialVersionUID = 1L;


    private Long id;


    private String title;

    @Column
    private String city;

    @Column
    private String image;

    private String category;

    private String type;

    private String subtype;


    private List<InstitutionBook> institutionBooks = new ArrayList<>();


    public Institution() {
    }

    public Institution(String title, String city, String image, String category, String type, String subtype) {
        this.title = title;
        this.city = city;
        this.image = image;
        this.category = category;
        this.type = type;
        this.subtype = subtype;

    }
//    @JsonIgnore
    @JsonBackReference
    @OneToMany(
            mappedBy = "primaryKey.institution",
            cascade = CascadeType.MERGE,
            orphanRemoval = true
    )
    public List<InstitutionBook> getBooks() {
        return institutionBooks;
    }

    public void setBooks(List<InstitutionBook> institutionBooks) {
        this.institutionBooks = institutionBooks;
    }

    public void addInstitutionBook(InstitutionBook institutionBook){
        this.institutionBooks.add(institutionBook);
    }

    @Id
//    @GeneratedValue
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @NaturalId
    @Column(updatable = true, nullable = false)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSubtype() {
        return subtype;
    }

    public void setSubtype(String subtype) {
        this.subtype = subtype;
    }
//    public void addBook(Book book) {
//        InstitutionBook institutionBook = new InstitutionBook(this, book);
//        institutionBooks.add(institutionBook);
//        book.getInstitutions().add(institutionBook);
//    }
//
//    public void removeBook(Book book) {
//        for (Iterator<InstitutionBook> iterator = institutionBooks.iterator();
//             iterator.hasNext(); ) {
//            InstitutionBook institutionBook = iterator.next();
//
//            if (institutionBook.getInstitution().equals(this) &&
//                    institutionBook.getBook().equals(book)) {
//                iterator.remove();
//                institutionBook.getBook().getInstitutions().remove(institutionBook);
//                institutionBook.setInstitution(null);
//                institutionBook.setBook(null);
//            }
//        }
//    }

    public void addBook(InstitutionBook book){
        this.institutionBooks.add(book);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        Institution institution = (Institution) o;
        return Objects.equals(id, institution.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }


}
