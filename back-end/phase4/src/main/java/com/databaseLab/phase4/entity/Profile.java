package com.databaseLab.phase4.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.persistence.Lob;

@Data
public class Profile {

    @Id
    private int profile_id;
    private String name;
    private String surname;
    private String phone_number;
    private String email;
    private int address_id;

    @Lob
    private byte[] data;

}
