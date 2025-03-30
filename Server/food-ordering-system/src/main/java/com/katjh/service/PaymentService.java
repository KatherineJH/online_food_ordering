package com.katjh.service;


import com.katjh.model.Order;
import com.katjh.response.PaymentResponse;

public interface PaymentService{

    public PaymentResponse createPaymentLink(Order order);
}
