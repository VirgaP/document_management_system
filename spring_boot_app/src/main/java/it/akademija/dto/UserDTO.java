package it.akademija.dto;

import it.akademija.entity.Group;
import it.akademija.entity.UserDocument;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class UserDTO {

    private String name;

    private String surname;

    private String email;

    private Set<Group> userGroups = new HashSet<Group>();

    private List<UserDocument> userDocuments = new ArrayList<>();

    public UserDTO() {
    }

    public UserDTO(String name, String surname, String email) {
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    public UserDTO(String name, String surname, String email, Set<Group> userGroups, List<UserDocument> userDocuments) {
        this(name, surname, email);
        this.userGroups = userGroups;
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

    public Set<Group> getUserGroups() {
        return userGroups;
    }

    public void setUserGroups(Set<Group> userGroups) {
        this.userGroups = userGroups;
    }

    public List<UserDocument> getUserDocuments() {
        return userDocuments;
    }

    public void setUserDocuments(List<UserDocument> userDocuments) {
        this.userDocuments = userDocuments;
    }
}
