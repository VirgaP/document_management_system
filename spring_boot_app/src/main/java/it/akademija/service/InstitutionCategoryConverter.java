package it.akademija.service;

import it.akademija.enums.InstitutionCategory;

import java.beans.PropertyEditorSupport;

public class InstitutionCategoryConverter extends PropertyEditorSupport {


    public void setAsText(final String text) throws IllegalArgumentException {
        setValue(InstitutionCategory.fromValue(text));
    }
}
