package it.akademija.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
public class User {

    private Long id;

    private List<UserDocument> userDocuments = new ArrayList<>();

    private String name;

    private String surname;

    private String email;


    public User() {
    }

    public User(Long id, String name, String surname, String email) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    @JsonIgnore
    @OneToMany(mappedBy = "primaryKey.user",
            cascade = CascadeType.MERGE)
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
    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setEmail(String email) {
        this.email = email;
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
