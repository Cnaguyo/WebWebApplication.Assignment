package com.Capgemini.WebApplication.Assignment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/airplanes")
public class AirplaneController {


        @Autowired
        private AirplaneRepository airplaneRepository;

        @GetMapping
        public List<Airplane> getAirplanes() {
            return airplaneRepository.findAll();


        }

        @PostMapping
        public void addCourse(@RequestBody Airplane airplane) {
            airplaneRepository.save(airplane);

        }

        @DeleteMapping("/{id}")
        public void deleteAirplane(@PathVariable Long id) {
            airplaneRepository.deleteById(id);
        }

}
