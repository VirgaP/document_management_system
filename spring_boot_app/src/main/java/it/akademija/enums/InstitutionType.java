package it.akademija.enums;

import java.util.Arrays;

public enum InstitutionType {
    CHILDREN ("children"), ADULT("adult");



    private String value;

    private InstitutionType(String value) {
        this.value = value;
    }

    public static InstitutionType fromValue(String value) {
        for (InstitutionType type : values()) {
            if (type.value.equalsIgnoreCase(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException(
                "Unknown enum type " + value + ", Allowed values are " + Arrays.toString(values()));
    }
}
