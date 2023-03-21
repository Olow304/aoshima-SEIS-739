package com.olow.grpccms.grpccms.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Page {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "page_id_seq")
    @SequenceGenerator(name = "page_id_seq", sequenceName = "page_id_seq", allocationSize = 1)
    private Long id;
    private String title;
    private String content;
    // set pageView to zero by default
    private int pageview;

}
