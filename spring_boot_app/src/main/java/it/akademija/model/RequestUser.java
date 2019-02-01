package it.akademija.model;


import it.akademija.entity.UserDocument;

import java.util.List;

public final class RequestUser {

    private String name;

    private String surname;

    private String email;

    private String groupName;

    private boolean admin;

    private List<UserDocument> userDocuments;

    public RequestUser(String name, String surname, String email, String groupName, boolean admin) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.groupName = groupName;
        this.admin = admin;
    }

    public RequestUser() {
    }

    public RequestUser(String name, String surname, String email, List<UserDocument> userDocuments) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.userDocuments = userDocuments;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
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

    public boolean getAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public List<UserDocument> getUserDocuments() {
        return userDocuments;
    }

    public void setUserDocuments(List<UserDocument> userDocuments) {
        this.userDocuments = userDocuments;
    }
}
