package com.example.demo.service;

import java.util.Optional;

public interface ICityService <T>{
    Iterable<T> findAll();

    Optional<T> findById(Long id);

    T save(T t);

    void remove(Long id);
}
