package com.example.demo.controller;

import com.example.demo.model.City;
import com.example.demo.service.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@CrossOrigin("*")
@RequestMapping("cities")
public class CityController {
    @Autowired
    ICityService cityService;
    @GetMapping
    public ResponseEntity<Iterable<City>> findAll(){
        return new ResponseEntity<>(cityService.findAll(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<City> addCity(@RequestBody City city){
        cityService.save(city);
        return new ResponseEntity<>(city,HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public ResponseEntity<City> findById(@PathVariable Long id){
        Optional<City> optionalCity = cityService.findById(id);
        return new ResponseEntity<>(optionalCity.get(),HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<City> updateCity(@RequestBody City city,@PathVariable Long id){
        city.setId(id);
        cityService.save(city);
        return new ResponseEntity<>(city,HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<City> deleteCity(@PathVariable Long id){
        Optional<City> optionalCity = cityService.findById(id);
        cityService.remove(id);
        return new ResponseEntity<>(optionalCity.get(),HttpStatus.OK);
    }
}
