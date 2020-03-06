package com.Capgemini.WebApplication.Assignment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/airport")
public class AirportController {



        @Autowired
        private AirportRepository airportRepository;

        @GetMapping
        public List<Airport> getAirports() {
            return airportRepository.findAll();


        }

        @PostMapping
        public void addAirport(@RequestBody Airport airport) {
            airportRepository.save(airport);

        }

        @DeleteMapping("/{id}")
        public void deleteAirport(@PathVariable Long id) {
            airportRepository.deleteById(id);
        }
}
