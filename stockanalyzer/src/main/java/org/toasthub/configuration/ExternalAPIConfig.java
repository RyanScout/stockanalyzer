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
        return new AlpacaAPI("PKJLQ66XYYDB09H9HZQJ", "UmbxcL0XcaUFptamP55a82OA3mxYsGWFJXcdxqZA", EndpointAPIType.PAPER, DataAPIType.IEX);
    }
}
