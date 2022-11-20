package com.nicolas.authentication.utils;

import com.nicolas.authentication.exception.RestTemplateErrorHandler;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@Configuration
public class ScheduleRestConfig {

    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate() {
        // Usando RestTemplateBuilder para poder usar o custom error handler RestTemplateErrorHandler:
        return new RestTemplateBuilder().setConnectTimeout(Duration.ofSeconds(20)).setReadTimeout(Duration.ofSeconds(20)).errorHandler(new RestTemplateErrorHandler()).build();
    }
}
