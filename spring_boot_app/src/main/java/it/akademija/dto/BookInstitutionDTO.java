package it.akademija.dto;

import java.math.BigDecimal;

public class BookInstitutionDTO {

    private String title;

    private String author;

    private Integer pageCount;

    private String image;

    private BigDecimal price;

    private Integer quantity;

    private String status;


    public BookInstitutionDTO() {
    }

    public BookInstitutionDTO(String title, String author, Integer pageCount, String image) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
        this.status = status;
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

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
