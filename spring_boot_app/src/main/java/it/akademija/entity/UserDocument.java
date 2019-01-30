package it.akademija.entity;

import javax.persistence.*;

@Entity
@Table(name = "user_document")
@AssociationOverrides({
        @AssociationOverride(name = "primaryKey.document",
        joinColumns = @JoinColumn(name = "DOCUMENT_ID")),
        @AssociationOverride(name = "primaryKey.user",
        joinColumns = @JoinColumn(name = "USER_ID")) })
public class UserDocument {

    private UserDocumentId primaryKey = new UserDocumentId();


    public UserDocument() {
    }



    @EmbeddedId
    public UserDocumentId getPrimaryKey() {
        return primaryKey;
    }

    public void setPrimaryKey(UserDocumentId primaryKey) {
        this.primaryKey = primaryKey;
    }

    @Transient
    public Document getDocument() {
        return getPrimaryKey().getDocument();
    }

    public void setDocument(Document document) {
        getPrimaryKey().setDocument(document);
    }

    @Transient
    public User getUser() {
        return getPrimaryKey().getUser();
    }

    public void setUser(User user) {
        getPrimaryKey().setUser(user);
    }


//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//
//        if (o == null || getClass() != o.getClass())
//            return false;
//
//        InstitutionBook that = (InstitutionBook) o;
//        return Objects.equals(institution, that.institution) &&
//                Objects.equals(book, that.book);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(institution, book);
//    }
}
