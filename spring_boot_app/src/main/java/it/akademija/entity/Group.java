package it.akademija.entity;

import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "admin_group")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    private Long id;

    private String name;

    @ManyToMany(mappedBy="userGroups")
    private Set<User> groupUsers = new HashSet<User>();

    public Group() {
    }

    public Group(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }

    @Column(updatable = true, nullable = false)
    @NaturalId
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public Set<User> getGroupUsers() {
        return groupUsers;
    }

    public void setGroupUsers(Set<User> groupUsers) {
        this.groupUsers = groupUsers;
    }
}
