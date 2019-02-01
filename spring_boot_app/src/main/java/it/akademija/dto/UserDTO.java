package it.akademija.dto;

public class UserDTO {

    private String name;

    private String surname;

    private String email;

    private boolean admin;

    public UserDTO(String name, String surname, String email, boolean admin) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.admin = admin;
    }

    public UserDTO() {
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
}
