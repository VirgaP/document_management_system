package it.akademija.service;

import it.akademija.entity.User;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class UserSpecificationsBuilder {

//    private final List<UserSearchCriteria> params;
//
//    public UserSpecificationsBuilder() {
//        params = new ArrayList<UserSearchCriteria>();
//    }
//
//    public UserSpecificationsBuilder with(String key, String operation, Object value) {
//        params.add(new UserSearchCriteria(key, operation, value));
//        return this;
//    }
//
//    public Specification<User> build() {
//        if (params.size() == 0) {
//            return null;
//        }
//
//        List<Specification> specs = params.stream()
//                .map(UserSpecification::new)
//                .collect(Collectors.toList());
//
//        Specification result = specs.get(0);
//
//        for (int i = 1; i < params.size(); i++) {
//            result = params.get(i).isOrPredicate()
//                    ? Specification.where(result)
//                    .or(specs.get(i))
//                    : Specification.where(result)
//                    .and(specs.get(i));
//        }
//        return result;
//    }
}
