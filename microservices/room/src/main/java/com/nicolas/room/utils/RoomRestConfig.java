package com.nicolas.room.utils;

import com.nicolas.room.exception.RestTemplateErrorHandler;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RoomRestConfig {

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        // Usando RestTemplateBuilder para poder usar o custom error handler RestTemplateErrorHandler:
        return new RestTemplateBuilder().errorHandler(new RestTemplateErrorHandler()).build();
    }
}
