package it.akademija.service;

import it.akademija.dto.TypeDTO;
import it.akademija.entity.*;
import it.akademija.exceptions.ResourceNotFoundException;
import it.akademija.payload.IncomingRequestBody;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.TypeGroupRepository;
import it.akademija.repository.TypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
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
    public List<Type> getUserSenderGroupTypes(String email) {
        return typeRepository.getUserGroupTypes(email).stream().collect(Collectors.toList());
    }

    @Transactional
    public List<Type> getUserReceiverGroupTypes(String email) {
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
    public void deleteType(String title){
        Type type = typeRepository.findByTitle(title);

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
        typeGroup.setSend(request.isSend());

        typeGroupRepository.save(typeGroup);
    }

    @Transactional
    public void removeUserGroup(String title, String groupName){
        Type type = typeRepository.findByTitle(title);
        Group group = groupRepository.findByname(groupName);

        TypeGroup typeGroup = new TypeGroup();
        typeGroup.setGroup(group);
        typeGroup.setType(type);

        typeGroupRepository.delete(typeGroup);

        type.getTypeGroups().remove(typeGroup);
        group.getTypeGroups().remove(typeGroup);
    }
}
