package it.akademija.controller;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import it.akademija.entity.Group;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.UserRepository;
import it.akademija.service.GroupService;
import it.akademija.util.TestingUtils;

/**
 * Integration tests for {@link GroupController}
 */
@RunWith(SpringRunner.class)
@DataJpaTest
public class WorkingGroupControllerTest {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private GroupService groupService;
    private GroupController groupController;

    @Before
    public void setup() {
        groupService = new GroupService(groupRepository, userRepository);
        groupController = new GroupController(groupService);
    }

    @Test
    public void dummyTest() {
        createGroups(100);
    }

    private List<Group> createGroups(int numberOfGroups) {
        List<Group> groups = new ArrayList<>();
        for (int i = 0; i < numberOfGroups; i++) {
            groups.add(groupRepository.save(TestingUtils.randomGroup()));
        }
        return groups;
    }

}
