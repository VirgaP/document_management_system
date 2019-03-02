package it.akademija.service;

import com.google.common.collect.Lists;
import it.akademija.entity.Document;
import it.akademija.repository.CustomDocumentRepo;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.Date;
import java.util.List;

public class DocumentRepositoryImpl implements CustomDocumentRepo {

    @Autowired
    private EntityManager em;

    Document document;

    @SuppressWarnings("unchecked")
    @Override
    public List<Document> findPageResultByDate(Date createdDate, int offset, int limit) {
        String query = "select d.* from Document d "
                + "order by d.createdDate desc";
        Query nativeQuery = em.createNativeQuery(query);
        //Paginering
        nativeQuery.setFirstResult(offset);
        nativeQuery.setMaxResults(limit);
        final List<Object[]> resultList = nativeQuery.getResultList();
        List<Document> documentList = Lists.newArrayList();
        resultList.forEach(object -> documentList.add(document));
        return documentList;
    }
}
