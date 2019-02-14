package it.akademija.service;

import it.akademija.dto.TypeDTO;
import it.akademija.entity.Document;
import it.akademija.entity.Group;
import it.akademija.entity.Type;
import it.akademija.entity.TypeGroup;
import it.akademija.payload.IncomingRequestBody;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.TypeGroupRepository;
import it.akademija.repository.TypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TypeService {

    private static final Logger LOG = LoggerFactory.getLogger(TypeService.class);

    @Autowired
    private TypeRepository typeRepository;

    @Autowired
    private TypeGroupRepository typeGroupRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Transactional
    public List<TypeDTO> getTypes() {
        return typeRepository.findAll()
                .stream()
                .map(type -> new TypeDTO(
                       type.getTitle()))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<TypeGroup> getGroupTypes() {
        return typeGroupRepository.findAll().stream().collect(Collectors.toList());
    }

    @Transactional
    public List<Type> getUserGroupTypes(String email) {
        return typeRepository.getUserGroupTypes(email).stream().collect(Collectors.toList());
    }

    @Transactional
    public TypeDTO getTypeByTitle(String title){
        Type type = typeRepository.findByTitle(title);
        TypeDTO typeDTO = new TypeDTO(type.getTitle());
        return typeDTO;
    }

    @Transactional
    public TypeDTO getTypeGroups(String title){
        Type type = typeRepository.findByTitle(title);
        TypeDTO typeDTO = new TypeDTO(
                type.getTitle(),
                type.getTypeGroups()
        );
        return typeDTO;
    }

    @Transactional
    public void createType(IncomingRequestBody request) {
        Type type = new Type(
                new Long(0),
                request.getTitle()
        );
        typeRepository.save(type);
    }

    @Transactional
    public void editType(IncomingRequestBody request, String title){
        Type type = typeRepository.findByTitle(title);
        type.setTitle(request.getTitle());
    }

    @Transactional
    public void deleteType(String title){//arba String title
        Type type = typeRepository.findByTitle(title);

//        StudentContact contact = em.find(StudentContact.class,38);
//        Student student = contact.getStudent();
//        student.setContact(null);
//        contact.setStudent(null);
//        em.merge(student);
//        em.remove(em.merge(contact));


        typeRepository.delete(type);
    }

    @Transactional
    public void addUserGroup(String title, IncomingRequestBody request) {
        Type type = typeRepository.findByTitle(title);
        Group group = groupRepository.findByname(request.getGroupName());

        TypeGroup typeGroup = new TypeGroup();
        typeGroup.setGroup(group);
        typeGroup.setType(type);

        typeGroup.setReceive(request.isReceive());
        typeGroup.setSend(request.isReceive());

        typeGroupRepository.save(typeGroup);
    }
}
