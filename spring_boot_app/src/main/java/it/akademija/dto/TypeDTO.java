package it.akademija.dto;

import java.math.BigDecimal;


public class TypeDTO {

    private String title;

    public TypeDTO(String title) {
        this.title = title;
    }

    public TypeDTO() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

}

