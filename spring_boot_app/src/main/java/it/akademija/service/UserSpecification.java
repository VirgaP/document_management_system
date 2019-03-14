package it.akademija.service;

import it.akademija.entity.User;
import org.springframework.data.jpa.domain.Specification;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class UserSpecification implements Specification<User> {

    private User filter;

    public UserSpecification(User filter) {
        super();
        this.filter = filter;
    }


    public Predicate toPredicate(Root<User> root, CriteriaQuery<?> cq,
                                 CriteriaBuilder cb) {

        Predicate p = cb.disjunction();

        if (filter.getEmail() != null) {
            p.getExpressions().add(cb.equal(root.get("email"), filter.getEmail()));
        }

        if (filter.getSurname() != null && filter.getName() != null) {
            p.getExpressions().add(cb.and(
                    cb.equal(root.get("surname"), filter.getSurname()),
                    cb.equal(root.get("name"), filter.getName())
            ));
        }


        return p;

    }
//    private UserSearchCriteria criteria;
//
//    public UserSpecification(UserSearchCriteria userSearchCriteria) {
//
//    }
//
//    @Override
//    public Predicate toPredicate
//            (Root<User> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
//
//         if (criteria.getOperation().equalsIgnoreCase(":")) {
//            if (root.get(criteria.getKey()).getJavaType() == String.class) {
//                return builder.like(
//                        root.<String>get(criteria.getKey()), "%" + criteria.getValue() + "%");
//            } else {
//                return builder.equal(root.get(criteria.getKey()), criteria.getValue());
//            }
//        }
//        return null;
//    }


}