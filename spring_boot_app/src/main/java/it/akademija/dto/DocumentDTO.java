package it.akademija.dto;

import it.akademija.entity.DBFile;
import it.akademija.entity.File;
import it.akademija.entity.Type;
import it.akademija.entity.UserDocument;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class DocumentDTO {

    private String title;

    private String description;

    private Type type;

    private Date createdDate;

    private Date submittedDate;

    private String number;

    private List<UserDocument> userDocuments = new ArrayList<>();

//    private List<DBFile> dbFiles = new ArrayList<DBFile>();

    private List<File> dbFiles = new ArrayList<>();

    public DocumentDTO() {
    }

    public DocumentDTO(String title, String number, String description, Date createdDate, Date submittedDate, Type type, List<UserDocument> userDocuments, List<File> dbFiles) {
        this.title = title;
        this.number = number;
        this.description = description;
        this.createdDate = createdDate;
        this.submittedDate = submittedDate;
        this.type = type;
        this.userDocuments = userDocuments;
        this.dbFiles = dbFiles;
    }


    public DocumentDTO(String title, String number, String description, Date createdDate, Date submittedDate, Type type) {
        this.title = title;
        this.number = number;
        this.description = description;
        this.createdDate = createdDate;
        this.submittedDate = submittedDate;
        this.type = type;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
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

    public Date getSubmittedDate() {
        return submittedDate;
    }

    public void setSubmittedDate(Date submittedDate) {
        this.submittedDate = submittedDate;
    }

    public List<UserDocument> getUserDocuments() {
        return userDocuments;
    }

    public void setUserDocuments(List<UserDocument> userDocuments) {
        this.userDocuments = userDocuments;
    }

    public List<File> getDbFiles() {
        return dbFiles;
    }

    public void setDbFiles(List<File> dbFiles) {
        this.dbFiles = dbFiles;
    }
}
