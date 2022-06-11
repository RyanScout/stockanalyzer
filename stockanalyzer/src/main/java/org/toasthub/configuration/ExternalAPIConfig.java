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
        return new AlpacaAPI("PK2K6KDLWPA8OHECOH3X", "3q5CRIZ2TRNZ4xJQQN4zOJ8TIftYqYdEvzSnkWfK", EndpointAPIType.PAPER, DataAPIType.IEX);
    }
}
