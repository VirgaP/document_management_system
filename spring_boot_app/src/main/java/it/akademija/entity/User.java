package it.akademija.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.NaturalId;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import it.akademija.Role;

@Entity
public class User {

    private static final PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    private Long id;

    private List<UserDocument> userDocuments = new ArrayList<>();

    private String name;

    private String surname;

    private String email;

    private String password;

    private boolean admin = false;

    private Set<Group> userGroups = new HashSet<Group>();

    private Set<String> roles = new HashSet<>();

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

    public User(Long id, String name, String surname, String email, String password, boolean admin, Set<String> roles) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = encoder.encode(password);
        this.admin = admin;
        this.roles = roles;
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

    @NaturalId
    @Column(updatable = true, nullable = false)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "ACCOUNT_ROLES", nullable = false)
    @ElementCollection(fetch = FetchType.EAGER)
    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

//    public void addRole(Role role) {
//        roles.add(role);
//    }
//
//    public void removeRole(Role role) {
//        roles.remove(role);
//    }
//
//    public void clearRole() {
//        roles.clear();
//    }

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

    public boolean getAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
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
