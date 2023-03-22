package com.olow.grpccms.grpccms.grpc;

import com.olow.grpccms.grpccms.repository.PageRepository;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;

@GrpcService
public class AnalyticServiceImpl extends AnalyticServiceGrpc.AnalyticServiceImplBase{
    @Autowired
    private PageRepository pageRepository;

    @Override
    public void getPostCount(GetPostCountRequest request, io.grpc.stub.StreamObserver<GetPostCountResponse> responseObserver) {
        long count = pageRepository.count();
        GetPostCountResponse response = GetPostCountResponse.newBuilder()
                .setCount(Integer.parseInt(String.valueOf(count)))
                .build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void getPostViews(GetPostViewsRequest request, io.grpc.stub.StreamObserver<GetPostViewsResponse> responseObserver) {
        // Extract the string value from the ID object
        String idStr = String.valueOf(request);
        String val = idStr.substring(idStr.indexOf(":") + 1).trim();
        System.out.println( "id: " + val);
        String valWithoutQuotes = val.replace("\"", "");

        Long id = Long.valueOf(valWithoutQuotes);

        // find the post by id and get the views
        long views = pageRepository.findById(id).get().getPageview();

        GetPostViewsResponse response = GetPostViewsResponse.newBuilder()
                .setViews(Integer.parseInt(String.valueOf(views)))
                .build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

}
