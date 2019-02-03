package it.akademija.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Type {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    private Long id;

    private String title;

    @JsonBackReference
    @OneToMany(
            mappedBy = "primaryKey.type",
            cascade = CascadeType.MERGE,
            orphanRemoval = true)
    private List<TypeGroup> typeGroups = new ArrayList<>();


    public Type(Long id, String title) {
        this.id = id;
        this.title = title;
    }

    public Type() {
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void addGroup(TypeGroup typeGroup){
        this.typeGroups.add(typeGroup);
    }



}
