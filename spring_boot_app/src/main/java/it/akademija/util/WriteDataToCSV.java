package it.akademija.util;

import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;

import it.akademija.dto.UserDTO;
import it.akademija.entity.Group;
import it.akademija.entity.User;
import it.akademija.entity.UserDocument;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;


public class WriteDataToCSV {

    public static void writeObjectToCSV(PrintWriter writer,List<User> users) {
        try (
                CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                        .withHeader("Name", "Surname", "Email"));
        ) {
            for (User user : users) {
                List<String> data = Arrays.asList(
                        user.getName(),
                        user.getSurname(),
                        user.getEmail()
                );

                csvPrinter.printRecord(data);
            }
            csvPrinter.flush();
        } catch (Exception e) {
            System.out.println("Writing to CSV error!");
            e.printStackTrace();
        }
    }

//    public static void writeUserByEmailToCSV(PrintWriter writer, User user) {
//        try (
//                CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
//                        .withHeader("Vardas", "Pavarde", "El.pastas", "Role", "Grupes", "Dokumentai"));
//        ) {
//
//            String data = String.valueOf(
//                    new UserDTO(
//                            user.getName(),
//                            user.getSurname(),
//                            user.getEmail(),
//                            user.getAdmin()
////                            user.getUserGroupName(),
////                            user.getUserDocumentTitle()
//                    ));
//
//            csvPrinter.printRecord(data);
//            csvPrinter.flush();
//        } catch (Exception e) {
//            System.out.println("Writing to CSV error!");
//            e.printStackTrace();
//        }
//    }

    public static void writeUserByEmailToCSV(PrintWriter writer, User user) {
        try (CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                        .withHeader("Vardas", "Pavarde", "El.pastas", "Admin", "Grupes", "Dokumentai"))) {
//
//            for (UserDocument ud : user.getUserDocuments()) {
//                List<String> data = (
//                        ud.getDocument().getTitle();
//                        ud.getDocument().getType();
//                        ud.getDocument().getCreatedDate()
//
//                ));
            csvPrinter.printRecord(user.getName());
            csvPrinter.printRecord(user.getSurname());
            csvPrinter.printRecord(user.getEmail());
            csvPrinter.printRecord(user.getAdmin());
            csvPrinter.printRecord(user.getUserGroups().iterator().next().getName());
            csvPrinter.printRecord(user.getUserDocuments().iterator().next().getDocument().getTitle());

            csvPrinter.flush();
        } catch (Exception e) {
            System.out.println("Writing to CSV error!");
            e.printStackTrace();
        }
    }
}
