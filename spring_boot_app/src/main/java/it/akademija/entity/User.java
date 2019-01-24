package it.akademija.entity;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name="user")
public final class User implements Serializable {

    @Id
    @Column(name="user_id", updatable = false, nullable = false)
    private Long id;

    @Column(name = "username", unique = true, nullable = false)
    @NotEmpty(message = "*Please provide username")
    private String username;

    public User(){

    }

    public User(Long id, String username, String firstName, String lastName, String email, Date dateCreated) {
        this.id = id;
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
