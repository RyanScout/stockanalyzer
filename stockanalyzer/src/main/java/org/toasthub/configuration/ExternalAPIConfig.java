package org.toasthub.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.jacobpeterson.alpaca.AlpacaAPI;
import net.jacobpeterson.alpaca.model.properties.DataAPIType;
import net.jacobpeterson.alpaca.model.properties.EndpointAPIType;

@Configuration
public class ExternalAPIConfig {

	@Bean
	public AlpacaAPI alpacaAPI() {
        return new AlpacaAPI("PK7T324110B5YS85YRDC", "lTFvuA6aKwMB9PX9VSRUKjpG5bqtwalEoxFnMt0a", EndpointAPIType.PAPER, DataAPIType.IEX);
    }
}
