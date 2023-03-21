package com.olow.grpccms.grpccms.grpc;
import com.olow.grpccms.grpccms.model.Page;
import com.olow.grpccms.grpccms.repository.PageRepository;
import com.olow.grpccms.grpccms.repository.UserRepository;
import io.grpc.Status;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@GrpcService
public class PageServiceImpl extends GrpcCmsServiceGrpc.GrpcCmsServiceImplBase {

    @Autowired
    private PageRepository pageRepository;

    @Autowired
    private UserRepository userRepository;

    // implement CreatePage
    @Override
    public void createPage(PageRequest request, io.grpc.stub.StreamObserver<PageResponse> responseObserver) {
        // Convert the request to a Page entity
        Page newPage = new Page();
        newPage.setTitle(request.getTitle());
        newPage.setContent(request.getContent());

        System.out.println("newPage: " + request);
        //System.out.println("newPage: " + newPage.getId());

        // Save the new Page entity using the PageRepository
        Page savedPage = pageRepository.save(newPage);

        // Create a response object
        PageResponse response = PageResponse.newBuilder()
                //.setId(savedPage.getId())
                .setTitle(savedPage.getTitle())
                .setContent(savedPage.getContent())
                .build();

        // Send the response to the client
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    // implement UpdatePage
    @Override
    public void updatePage(PageRequest request, io.grpc.stub.StreamObserver<PageResponse> responseObserver) {
        // Extract the string value from the ID object
        String idStr = String.valueOf(request.getId());
        String val = idStr.substring(idStr.indexOf(":") + 1).trim();
        System.out.println( "id: " + val);
        String valWithoutQuotes = val.replace("\"", "");
        Long id = Long.valueOf(valWithoutQuotes);

        Optional<Page> optionalPage = pageRepository.findById(id);

        if (optionalPage.isPresent()) {
            Page pageToUpdate = optionalPage.get();

            // Update the Page entity's fields
            pageToUpdate.setTitle(request.getTitle());
            pageToUpdate.setContent(request.getContent());

            // Save the updated Page entity using the PageRepository
            Page updatedPage = pageRepository.save(pageToUpdate);

            // Create a response object
            PageResponse response = PageResponse.newBuilder()
                    .setId(Integer.parseInt(String.valueOf(id)))
                    .setTitle(updatedPage.getTitle())
                    .setContent(updatedPage.getContent())
                    .build();

            // Send the response to the client
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        } else {
            // Page not found, send an error status
            Status status = Status.NOT_FOUND.withDescription("Page not found with ID: " + request.getId());
            responseObserver.onError(status.asRuntimeException());
        }
    }

    // implement DeletePage
    @Override
    public void deletePage(PageRequest request, io.grpc.stub.StreamObserver<PageResponse> responseObserver) {
        // Extract the string value from the ID object
        String idStr = String.valueOf(request.getId());
        String val = idStr.substring(idStr.indexOf(":") + 1).trim();
        System.out.println( "id: " + val);
        String valWithoutQuotes = val.replace("\"", "");
        Long id = Long.valueOf(valWithoutQuotes);

        boolean exists = pageRepository.existsById(id);

        if (exists) {
            // Delete the Page entity using the PageRepository
            pageRepository.deleteById(id);

            // Create a response object with the deleted ID
            PageResponse response = PageResponse.newBuilder()
                    .setId(request.getId())
                    .build();


            // Send the response to the client
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        } else {
            // Page not found, send an error status
            Status status = Status.NOT_FOUND.withDescription("Page not found with ID: " + request.getId());
            responseObserver.onError(status.asRuntimeException());
        }
    }

    // implement GetPage
    @Override
    public void getPage(PageRequest request, io.grpc.stub.StreamObserver<PageResponse> responseObserver) {
        // Find the existing Page entity by ID

        // Extract the string value from the ID object
        String idStr = String.valueOf(request);
        String val = idStr.substring(idStr.indexOf(":") + 1).trim();
        System.out.println( "id: " + val);
        String valWithoutQuotes = val.replace("\"", "");
        Long id = Long.valueOf(valWithoutQuotes);

        // update page view count by 1
        Page page = pageRepository.findById(id).get();
        page.setPageview(page.getPageview() + 1);
        pageRepository.save(page);




        System.out.println("optionalPage+id: " + id);
        Optional<Page> optionalPage = pageRepository.findById(id);

        System.out.println( "optionalPage: " + optionalPage);
        if (optionalPage.isPresent()) {
            Page pg = optionalPage.get();

            System.out.println("IntegerInteger: " + Integer.parseInt(String.valueOf(id)));
            System.out.println("pg.getTitle(): " + pg.getPageview());

            // Create a response object
            PageResponse response = PageResponse.newBuilder()
                    .setId(Integer.parseInt(String.valueOf(id)))
                    .setTitle(pg.getTitle())
                    .setContent(pg.getContent())
                    .setPageview(pg.getPageview())
                    .build();


            // Send the response to the client
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        } else {
            // Page not found, send an error status
            Status status = Status.NOT_FOUND.withDescription("Page not found with ID: " + request.getId());
            responseObserver.onError(status.asRuntimeException());
        }
    }

    // implement GetAllPages
    @Override
    public void getAllPages(EmptyRequest request, io.grpc.stub.StreamObserver<AllPagesResponse> responseObserver) {
        // Fetch all Page entities using the PageRepository
        List<Page> pages = pageRepository.findAll();

        // Create a response object
        AllPagesResponse.Builder responseBuilder = AllPagesResponse.newBuilder();

        for (Page page : pages) {
            PageResponse pageResponse = PageResponse.newBuilder()
                    .setId(Integer.parseInt(String.valueOf(page.getId())))
                    .setTitle(page.getTitle())
                    .setContent(page.getContent())
                    .build();

            responseBuilder.addPages(pageResponse);
        }

        // Send the response to the client
        responseObserver.onNext(responseBuilder.build());
        responseObserver.onCompleted();
    }

    @Override
    public void validateEmail(EmailRequest request, io.grpc.stub.StreamObserver<EmailResponse> responseObserver) {
        // check if email exists in database and return true or false
        boolean emailExists = userRepository.existsByEmail(request.getEmail());

        // Create a response object
        EmailResponse response = EmailResponse.newBuilder()
                .setEmailExists(emailExists)
                .build();

        // Send the response to the client
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

}