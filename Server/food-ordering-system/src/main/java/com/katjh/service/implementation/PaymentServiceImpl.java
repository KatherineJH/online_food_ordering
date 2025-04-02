package com.katjh.service.implementation;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.katjh.model.Order;
import com.katjh.response.PaymentResponse;
import com.katjh.service.PaymentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Override
    public PaymentResponse createPaymentLink(Order order) {
        return null;
    }
}
