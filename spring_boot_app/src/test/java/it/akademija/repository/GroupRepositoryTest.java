//package it.akademija.repository;
//
//import it.akademija.entity.Group;
//import org.junit.Test;
//import org.junit.Assert;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.BeansException;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.ApplicationContextAware;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.reactive.server.JsonPathAssertions;
//import static org.junit.Assert.assertThat;
//
//
//import java.util.List;
//
//import static javax.swing.JRootPane.NONE;
//import static org.junit.Assert.*;
//
//
//@ActiveProfiles("test")
//@RunWith(SpringRunner.class)
//@DataJpaTest
////@ContextConfiguration(locations = { "file:src/main/resources/application-context.xml" })
////@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//public class GroupRepositoryTest {
//
//    @Autowired
//    private TestEntityManager entityManager;
//    @Autowired
//    private GroupRepository groupRepository;
////    @Autowired
////    ApplicationContext context;
////    @Test
////    public void whenFindAll() {
////        //given
////        Group firstGroup = new Group();
////        firstGroup.setName("Example");
////        entityManager.persist(firstGroup);
////        entityManager.flush();
////        Group secondGroup = new Group();
////        secondGroup.setName("Pavyzdys");
////        entityManager.persist(secondGroup);
////        entityManager.flush();
////        //when
////        List<Group> groupList = groupRepository.findAll();
////        //then
////        assertThat(groupList.size()).isEqualTo(9);
////        assertThat(groupList.get(7)).isEqualTo(firstGroup);
////        assertThat(groupList.get(8)).isEqualTo(secondGroup);
////    }
//
//
//
//    @Test
//    public void whenFindByname() {
//        //given
//        Group group = new Group();
//        group.setName("Example");
//        entityManager.persist(group);
//        entityManager.flush();
//        //when
//        Group testGroup = groupRepository.findByname(group.getName());
//        //then
//        assertEquals(testGroup, group);
//    }
//}