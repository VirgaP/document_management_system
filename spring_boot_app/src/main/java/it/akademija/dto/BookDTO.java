package it.akademija.dto;

import java.math.BigDecimal;


public class BookDTO {

    private String title;

    private String author;

    private Integer pageCount;

    private String image;

    public BookDTO() {
    }

    public BookDTO(String title, String author, Integer pageCount, String image) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.image = image;

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Integer getPageCount() {
        return pageCount;
    }

    public void setPageCount(Integer pageCount) {
        this.pageCount = pageCount;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

}

