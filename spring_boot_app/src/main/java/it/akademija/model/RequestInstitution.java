package it.akademija.model;

import it.akademija.entity.Book;
import it.akademija.entity.InstitutionBook;
import it.akademija.enums.InstitutionCategory;
import it.akademija.enums.InstitutionType;
import jdk.internal.dynalink.linker.LinkerServices;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public final class RequestInstitution {

    private String title;

    private String city;

    private String image;


    private String category;

    private String type;

    private String subtype;

    private List<InstitutionBook> institutionBooks;

    public RequestInstitution(String title, String city, String image, String category, String type, String subtype) {
        this.title = title;
        this.city = city;
        this.image = image;
        this.category = category;
        this.type = type;
        this.subtype = subtype;
    }


    public RequestInstitution(String title, String city, String image, String category, String type, String subtype, List<InstitutionBook> institutionBooks) {
        this.title = title;
        this.city = city;
        this.image = image;
        this.category = category;
        this.type = type;
        this.subtype = subtype;
        this.institutionBooks = institutionBooks;
    }

    public RequestInstitution() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSubtype() {
        return subtype;
    }

    public void setSubtype(String subType) {
        this.subtype = subtype;
    }

    public List<InstitutionBook> getInstitutionBooks() {
        return institutionBooks;
    }

    public void setInstitutionBooks(List<InstitutionBook> institutionBooks) {
        this.institutionBooks = institutionBooks;
    }
}
