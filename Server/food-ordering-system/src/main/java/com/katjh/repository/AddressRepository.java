package com.katjh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.katjh.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {}
