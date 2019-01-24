package it.akademija.enums;

import org.springframework.web.context.annotation.RequestScope;

import java.util.Arrays;


public enum InstitutionCategory {

    PRIVATE("private"), PUBLIC("public");


    private String value;

    private InstitutionCategory(String value) {
        this.value = value;
    }

    public static InstitutionCategory fromValue(String value) {
        for (InstitutionCategory category : values()) {
            if (category.value.equalsIgnoreCase(value)) {
                return category;
            }
        }
        throw new IllegalArgumentException(
                "Unknown enum type " + value + ", Allowed values are " + Arrays.toString(values()));
    }

}
