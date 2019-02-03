package it.akademija.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "admin_group")
public class Group implements Serializable {
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
        super();
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

    public void addUser(User user) {
        this.groupUsers.add(user);
        user.getUserGroups().add(this);
    }

    public void addType(TypeGroup typeGroup){
        this.typeGroups.add(typeGroup);
    }

    @Override
    public String toString(){
        String serialized ="";
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            serialized = objectMapper.writeValueAsString(this);
        }catch(JsonProcessingException jpe){
            jpe.printStackTrace();
        }
        return serialized;
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
