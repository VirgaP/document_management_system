package it.akademija.model;



import java.math.BigDecimal;

public final class IncomingRequestBody {


    private String title;


    //    private InstitutionBook institutionBook = new InstitutionBook();

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public IncomingRequestBody(String title) {
        this.title = title;
    }

    public IncomingRequestBody() {
    }

    //
//    public InstitutionBook getInstitutionBook() {
//        return institutionBook;
//    }
//
//    public void setInstitutionBook(InstitutionBook institutionBook) {
//        this.institutionBook = institutionBook;
//    }
}
