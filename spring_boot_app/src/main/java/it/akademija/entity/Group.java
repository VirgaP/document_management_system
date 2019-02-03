package it.akademija.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "admin_group")
public class Group {
    private static final long serialVersionUID = 1L;


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    private Long id;

    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "primaryKey.group",
            cascade = CascadeType.MERGE)
    private List<TypeGroup> typeGroups = new ArrayList<>();


    @JsonBackReference
    @ManyToMany(mappedBy="userGroups")
    private Set<User> groupUsers = new HashSet<User>();

    public Group() {
    }

    public Group(Long id, String name) {
        this.id = id;
        this.name = name;
    }



    public List<TypeGroup> getTypeGroups() {
        return typeGroups;
    }

    public void setTypeGroups(List<TypeGroup> typeGroups) {
        this.typeGroups = typeGroups;
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

    public void addType(TypeGroup typeGroup){
        this.typeGroups.add(typeGroup);
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        Group group = (Group) o;
        return Objects.equals(id, group.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
