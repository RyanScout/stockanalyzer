package org.toasthub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@ComponentScan(basePackages = {"org.toasthub"})
public class StockanalyzerApplication {

	public static void main(String[] args) {
		SpringApplication.run(StockanalyzerApplication.class, args);
	}

}
