package it.akademija.dto;

import it.akademija.entity.Type;

import java.util.Date;

public class DocumentDTO {

    private String title;

    private String description;

    private Type type;

    private Date createdDate;

    public DocumentDTO() {
    }

    public DocumentDTO(String title, String description, Date createdDate, Type type) {
        this.title = title;
        this.description = description;
        this.createdDate = createdDate;
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }
}
