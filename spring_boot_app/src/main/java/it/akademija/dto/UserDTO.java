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

    private boolean admin;

    private Set<Group> userGroups = new HashSet<Group>();

    private List<UserDocument> userDocuments = new ArrayList<>();

    public UserDTO() {
    }

    public UserDTO(String name, String surname, String email, boolean admin) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.admin = admin;
    }

    public UserDTO(String email) {
        this.email = email;
    }

    public UserDTO(String name, String surname, String email, boolean admin, Set<Group> userGroups, List<UserDocument> userDocuments) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.admin = admin;
        this.userGroups = userGroups;
        this.userDocuments = userDocuments;
    }

    public UserDTO(String email, String toString) {
    }

    public UserDTO(boolean admin, String email, String name, String surname) {
        this.admin = admin;
        this.email = email;
        this.name = name;
        this.surname = surname;
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
