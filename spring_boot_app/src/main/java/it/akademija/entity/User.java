package it.akademija.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.NaturalId;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "email"})
})
public class User {

    private Long id;

    private List<UserDocument> userDocuments = new ArrayList<>();

    @NotBlank
    @Size(max = 40)
    private String name;

    @NotBlank
    @Size(max = 40)
    private String surname;

    @NaturalId
    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    @NotBlank
    @Size(max = 100)
    private String password;

    private boolean admin = false;


    private Set<Role> roles = new HashSet<>();

    private Set<Group> userGroups = new HashSet<Group>();

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "users_groups",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "group_id") })
    public Set<Group> getUserGroups() {
        return userGroups;
    }

    public void setUserGroups(Set<Group> userGroups) {
        this.userGroups = userGroups;
    }


    public User() {
    }

    public User(String name, String surname, String email, String password, boolean admin) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.admin = admin;
    }


    public User(String name, String surname, String email, boolean admin) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.admin = admin;
    }

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    public Set<Role> getRoles() {
        return roles;
    }


    @JsonIgnore
    @OneToMany(mappedBy = "primaryKey.user",
            cascade = CascadeType.ALL)
    public List<UserDocument> getUserDocuments() {
        return userDocuments;
    }

    public void setUserDocuments(List<UserDocument> userDocuments) {
        this.userDocuments = userDocuments;
    }

    public void addUserDocument(UserDocument userDocument){
        this.userDocuments.add(userDocument);
    }

    public void addGroup(Group group) {
        this.userGroups.add(group);
        group.getGroupUsers().add(this);
    }

    public void removeGroup(Group group) {
        this.userGroups.remove(group);
        group.getGroupUsers().remove(this);
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean getAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

}
