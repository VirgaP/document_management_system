package it.akademija.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.util.*;

@Entity
public class Document {
    private static final long serialVersionUID = 1L;

    private Long id;

    private String uniqueNumber;

    private String title;

    private String description;

    private Type type;

    private Date createdDate;

    private List<UserDocument> userDocuments = new ArrayList<>();

    @Column(name = "CREATED_DATE")
    @Temporal(TemporalType.DATE)
    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Document() {
    }

    public Document(Long id, String uniqueNumber, String title, String description, Type type, Date createdDate) {
        this.id = id;
        this.uniqueNumber = uniqueNumber;
        this.title = title;
        this.description = description;
        this.type = type;
        this.createdDate = createdDate;
    }

    public Document(Long id, String title, String description, Type type, Date createdDate, List<UserDocument> userDocuments) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
        this.createdDate = createdDate;
        this.userDocuments = userDocuments;
    }

    public Document(Long id, String uniqueNumber, String title, String description, Date createdDate) {
        this.id = id;
        this.uniqueNumber = uniqueNumber;
        this.title = title;
        this.description = description;
        this.createdDate = createdDate;
    }

    //    @JsonIgnore
    @JsonBackReference
    @OneToMany(
            mappedBy = "primaryKey.document",
            cascade = CascadeType.MERGE,
            orphanRemoval = true)
    public List<UserDocument> getUserDocuments() {
        return userDocuments;
    }

    public void setUserDocuments(List<UserDocument> userDocuments) {
        this.userDocuments = userDocuments;
    }

    public void addUserDocument(UserDocument userDocument){
        this.userDocuments.add(userDocument);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @NaturalId
    @Column(updatable = false, nullable = false)
    public String getUniqueNumber() {
        return uniqueNumber;
    }

    public void setUniqueNumber(String uniqueNumber) {
        this.uniqueNumber = uniqueNumber;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "type_id")
    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
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

    public void addUser(UserDocument user){
        this.userDocuments.add(user);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        Document document = (Document) o;
        return Objects.equals(id, document.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

}
