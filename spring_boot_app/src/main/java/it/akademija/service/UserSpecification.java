package it.akademija.service;

import it.akademija.entity.User;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import static org.springframework.data.jpa.domain.Specification.where;

//public class UserSpecification extends BaseSpecification<User, UserListRequest> implements Specification<User> {
@Component
public class UserSpecification extends BaseSpecification<User, UserListRequest>{


//    private User filter;
//
//    public UserSpecification(User filter) {
//        super();
//        this.filter = filter;
//    }


//    public Predicate toPredicate(Root<User> root, CriteriaQuery<?> cq,
//                                 CriteriaBuilder cb) {
//
//        Predicate p = cb.disjunction();
//
//        if (filter.getEmail() != null) {
//            p.getExpressions().add(cb.equal(root.get("email"), filter.getEmail()));
//        }
//
//        if (filter.getSurname() != null && filter.getName() != null) {
//            p.getExpressions().add(cb.and(
//                    cb.equal(root.get("surname"), filter.getSurname()),
//                    cb.equal(root.get("name"), filter.getName())
//            ));
//        }
//
//
//        return p;
//
//    }


    @Override
    public Specification<User> getFilter(UserListRequest request) {
        return (root, query, cb) -> {
            return where(
                    where(emailContains(request.search))
                            .or(surnameContains(request.search))
            ).toPredicate(root, query, cb);
        };

    }
    private Specification<User> emailContains(String email) {
        return userAttributeContains("email", email);
    }

    private Specification<User> surnameContains(String surname) {
        return userAttributeContains("surname", surname);
    }

    private Specification<User> userAttributeContains(String attribute, String value) {
        return (root, query, cb) -> {
            if(value == null) {
                return null;
            }

            return cb.like(
                    cb.lower(root.get(attribute)),
                    containsLowerCase(value)
            );
        };
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