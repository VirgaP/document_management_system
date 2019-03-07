//package it.akademija.service;
//
//import org.junit.Assert;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import it.akademija.dto.UserDTO;
//import it.akademija.entity.User;
//import it.akademija.repository.DocumentRepository;
//import it.akademija.repository.GroupRepository;
//import it.akademija.repository.UserRepository;
//import it.akademija.util.TestingUtils;
//
//@RunWith(SpringRunner.class)
//@DataJpaTest
//public class MockTest {
//
////    @Autowired
////    private TestEntityManager testEntityManager;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private DocumentRepository documentRepository;
//
//    @Autowired
//    private GroupRepository groupRepository;
//
//    private UserService testService;
//
//    @Before
//    public void setUp() {
//        testService = new UserService(userRepository, documentRepository, groupRepository);
//    }
//
//    @Test
//    public void dummyTest1() {
//        User user = TestingUtils.createRandomUser();
//        userRepository.save(user);
//        UserDTO loadedUser = testService.getUser(user.getEmail());
//
//        Assert.assertEquals(user.getEmail(), loadedUser.getEmail());
//        Assert.assertEquals(user.getName(), loadedUser.getName());
//        Assert.assertEquals(user.getSurname(), loadedUser.getSurname());
//        Assert.assertEquals(user.getAdmin(), loadedUser.getAdmin());
//    }
//
//}
