package it.akademija.controller;

import it.akademija.entity.DBFile;
import it.akademija.payload.UploadFileResponse;
import it.akademija.service.DBFileStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.cert.CertificateException;
import java.sql.Blob;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/files")
@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition"})
public class DBFileController {
    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    @Autowired
    private DBFileStorageService dbFileStorageService;

    @PostMapping("/uploadFile")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {
        DBFile dbFile = dbFileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(dbFile.getId())
                .toUriString();

        return new UploadFileResponse(dbFile.getFileName(), fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @PostMapping("/uploadMultipleFiles")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file))
                .collect(Collectors.toList());
    }

//    @GetMapping("/downloadFile/{fileId}")
//    public ResponseEntity downloadFile (@PathVariable String fileId) throws Exception  {
//        DBFile dbFile = dbFileStorageService.getFile(fileId);
//        String fileName = dbFile.getFileName();
//
////        File someFile = new File(fileName);
////        FileOutputStream fos = new FileOutputStream(someFile);
////        fos.write(dbFile.getData());
////        fos.flush();
////        fos.close();
//
//        String filePath = dbFile.getFileName();
//        InputStream inputStream = new FileInputStream(new File(filePath));
//        InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentLength(Files.size(Paths.get(filePath)));
//        return new ResponseEntity(inputStreamResource, headers, HttpStatus.OK);
//
//    }

    @GetMapping("/downloadFile/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileId) {
        // Load file from database
        DBFile dbFile = dbFileStorageService.getFile(fileId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dbFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.getFileName() + "\"")
                .body(new ByteArrayResource(dbFile.getData()));
    }

}
