package it.akademija.entity;

import javax.persistence.*;

@Entity
public class Type {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    private Long id;

    private String title;

    public Type(Long id, String title) {
        this.id = id;
        this.title = title;
    }

    public Type() {
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
}
