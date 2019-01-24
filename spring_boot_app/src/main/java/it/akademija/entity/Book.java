package it.akademija.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Entity
public class Book {

    private Long id;

    private List<InstitutionBook> institutionBooks = new ArrayList<>();

    private String title;

    @Column
    private String author;

    @Column
    private Integer pageCount;

    @Column
    private String image;


    public Book(String title, String author, Integer pageCount, String image) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.image = image;
    }

    public Book() {
    }

    public Book(String title) {
        this.title = title;
    }

    @JsonIgnore
    @OneToMany(mappedBy = "primaryKey.book",
            cascade = CascadeType.MERGE)
    public List<InstitutionBook> getInstitutionBooks() {
        return institutionBooks;
    }

    public void setInstitutionBooks(List<InstitutionBook> institutionBooks) {
        this.institutionBooks = institutionBooks;
    }

    public void addInstitutionBook(InstitutionBook institutionBook){
        this.institutionBooks.add(institutionBook);
    }

    @Id
    @GeneratedValue
    @Column(updatable = false, nullable = false)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    @Column(updatable = true, nullable = false)
    @NaturalId
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Integer getPageCount() {
        return pageCount;
    }

    public void setPageCount(Integer pageCount) {
        this.pageCount = pageCount;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        Book book = (Book) o;
//        return Objects.equals(title, book.title);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(title);
//    }


}
