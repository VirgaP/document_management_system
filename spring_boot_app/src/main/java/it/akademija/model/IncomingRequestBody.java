package it.akademija.model;



import java.math.BigDecimal;

public final class IncomingRequestBody {


    private String title;

    private String groupName;

    private boolean send;

    private boolean receive;


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

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public boolean isSend() {
        return send;
    }

    public void setSend(boolean send) {
        this.send = send;
    }

    public boolean isReceive() {
        return receive;
    }

    public void setReceive(boolean receive) {
        this.receive = receive;
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
