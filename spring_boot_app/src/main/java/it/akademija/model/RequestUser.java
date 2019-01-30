package it.akademija.model;


import it.akademija.entity.UserDocument;

import java.util.List;

public final class RequestUser {

    private String name;

    private String surname;

    private String email;

    private List<UserDocument> userDocuments;

    public RequestUser(String name, String surname, String email) {
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    public RequestUser() {
    }

    public RequestUser(String name, String surname, String email, List<UserDocument> userDocuments) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.userDocuments = userDocuments;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<UserDocument> getUserDocuments() {
        return userDocuments;
    }

    public void setUserDocuments(List<UserDocument> userDocuments) {
        this.userDocuments = userDocuments;
    }
}
