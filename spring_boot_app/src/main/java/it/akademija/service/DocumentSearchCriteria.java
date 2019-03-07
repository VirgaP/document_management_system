package it.akademija.service;

import lombok.Data;

@Data
public class DocumentSearchCriteria {

    private String key;
    private String operation;
    private Object value;

//   contrains for query building
//            key: the field name – for example, title, … etc.
//            operation: the operation – for example, equality, less than, … etc.
//            value: the field value
}
