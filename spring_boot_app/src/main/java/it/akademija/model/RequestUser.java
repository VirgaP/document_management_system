package it.akademija.model;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.akademija.entity.Group;
import it.akademija.entity.User;
import it.akademija.entity.UserDocument;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public final class RequestUser {

    private String name;

    private String surname;

    private String email;

    private String groupName;

    private boolean admin;

    private List<UserDocument> userDocuments;

    private Set<Group> userGroups;

    private String group;

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

    public Set<Group> getUserGroups() {
        return userGroups;
    }

    public void setUserGroups(Set<Group> userGroups) {
        this.userGroups = userGroups;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }
}
