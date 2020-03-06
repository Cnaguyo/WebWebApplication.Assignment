package com.Capgemini.WebApplication.Assignment;

import javax.persistence.*;
import javax.print.attribute.standard.Destination;


@Entity
public class Airplane {


    @Id
    @GeneratedValue
    private Long Id;

    private String name;
    private int fuel;
    private int cost;

    public Airplane() {
    }

    public Airplane(Long id, String name, int fuel, int cost) {
        Id = id;
        this.name = name;
        this.fuel = fuel;
        this.cost = cost;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getFuel() {
        return fuel;
    }

    public void setFuel(int fuel) {
        this.fuel = fuel;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }
}

