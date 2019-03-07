package it.akademija.service;

import it.akademija.dto.TypeDTO;
import it.akademija.entity.*;
import it.akademija.exceptions.ResourceNotFoundException;
import it.akademija.payload.IncomingRequestBody;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.TypeGroupRepository;
import it.akademija.repository.TypeRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
public class TypeService {

    @Autowired
    private TypeRepository typeRepository;

    @Autowired
    private TypeGroupRepository typeGroupRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Transactional
    public List<TypeDTO> getTypes() {
        log.info("Returns types");
        return typeRepository.findAll()
                .stream()
                .map(type -> new TypeDTO(
                       type.getTitle()))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<TypeGroup> getGroupTypes() {
        log.info("Return group types");
        return typeGroupRepository.findAll().stream().collect(Collectors.toList());
    }

    @Transactional
    public List<Type> getUserSenderGroupTypes(String email) {
        log.info("Returns user's group types");
        return typeRepository.getUserGroupTypes(email).stream().collect(Collectors.toList());
    }

    @Transactional
    public List<Type> getUserReceiverGroupTypes(String email) {
        log.info("Returns user's, whose email: "+ email);
        return typeRepository.getUserGroupTypes(email).stream().collect(Collectors.toList());
    }

    @Transactional
    public TypeDTO getTypeByTitle(String title){
        Type type = typeRepository.findByTitle(title);
        TypeDTO typeDTO = new TypeDTO(type.getTitle());
        log.info("Returns type " +title);
        return typeDTO;
    }

    @Transactional
    public TypeDTO getTypeGroups(String title){
        Type type = typeRepository.findByTitle(title);
        TypeDTO typeDTO = new TypeDTO(
                type.getTitle(),
                type.getTypeGroups()
        );
        log.info("Return type groups "+ title);
        return typeDTO;
    }

    @Transactional
    public void createType(IncomingRequestBody request) {
        String typeTitle = request.getTitle();

        if (typeRepository.existsByTitle(typeTitle)) {
            log.info("IllegalArgumentException: type already exists");
            throw new IllegalArgumentException("Type already exists");
        }

        Type type = new Type(
                new Long(0),
                typeTitle
        );
        log.info("Type {} saved", typeTitle);
        typeRepository.save(type);
    }


    @Transactional
    public void editType(IncomingRequestBody request, String title){
        Type type = typeRepository.findByTitle(title);
        type.setTitle(request.getTitle());
    }

    @Transactional
    public void deleteType(String title){
        log.info("Deletes type "+ title);
        Type type = typeRepository.findByTitle(title);

        typeRepository.delete(type);
    }

    @Transactional
    public void addUserGroup(String title, IncomingRequestBody request) {
        log.info("Adding user group");
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
        log.info("Removes user's group "+ groupName);
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
