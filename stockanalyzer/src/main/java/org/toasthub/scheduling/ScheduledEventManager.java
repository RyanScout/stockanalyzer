package org.toasthub.scheduling;

import java.util.concurrent.atomic.AtomicBoolean;

import javax.persistence.NoResultException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;
import org.toasthub.core.model.Configuration;
import org.toasthub.stock.algorithm.AlgorithmCruncherSvc;
import org.toasthub.stock.cache.CacheManager;
import org.toasthub.stock.trade.TradeManager;
import org.toasthub.utils.Request;
import org.toasthub.utils.Response;

@Component
public class ScheduledEventManager {

    final AtomicBoolean schedulingJobRunning = new AtomicBoolean(false);

    final AtomicBoolean databaseBackloaded = new AtomicBoolean(false);

    @Autowired
    private ScheduledEventManagerDao scheduledEventManagerDao;

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private TradeManager tradeManager;

    @Autowired
    private AlgorithmCruncherSvc algorithmCruncherSvc;

    @EventListener(ApplicationReadyEvent.class)
    public void initializationTasks() {
        cacheManager.initializeCache();
        algorithmCruncherSvc.initializeDatabase();
    }

    @Scheduled(cron = "30 * * * * ?")
    public void scheduledTasks() {

        if (!databaseBackloaded.get()) {
            checkConfiguration();
            if (!databaseBackloaded.get()) {
                System.out.println("Database is still backloading, skipping this time");
                return;
            }
        }

        if (schedulingJobRunning.get()) {
            System.out.println("Scheduling tasks are still running, skipping this time");
            return;
        }

        new Thread(() -> {
            schedulingJobRunning.set(true);

            final Request request = new Request();
            final Response response = new Response();

            final StopWatch timer = new StopWatch();

            timer.start();
            algorithmCruncherSvc.loadStockData(request, response);
            timer.stop();
            System.out.println("Updating stock data took " + timer.getLastTaskTimeMillis() + " milliseonds");

            timer.start();
            algorithmCruncherSvc.loadCryptoData(request, response);
            timer.stop();
            System.out.println("Updating crypto data took " + timer.getLastTaskTimeMillis() + " milliseonds");

            timer.start();
            algorithmCruncherSvc.loadAlgorithmData(request, response);
            timer.stop();
            System.out.println("Updating algorithm data took " + timer.getLastTaskTimeMillis() + " milliseonds");

            timer.start();
            cacheManager.updateRawData(request, response);
            timer.stop();
            System.out.println("Updating raw data took " + timer.getLastTaskTimeMillis() + " milliseonds");

            timer.start();
            cacheManager.updateTechnicalIndicatorCache(request, response);
            timer.stop();
            System.out.println(
                    "Updating technical indicator cache took " + timer.getLastTaskTimeMillis() + " milliseonds");

            timer.start();
            tradeManager.updateTrades(request, response);
            timer.stop();
            System.out.println("Updating trades took " + timer.getLastTaskTimeMillis() + " milliseonds");

            timer.start();
            tradeManager.checkTrades(request, response);
            timer.stop();
            System.out.println("Checking trades took " + timer.getLastTaskTimeMillis() + " milliseonds");

            schedulingJobRunning.set(false);

        }).start();
    }

    public void checkConfiguration() {
        Configuration config = new Configuration();

        try {
            config = scheduledEventManagerDao.getConfiguration();
        } catch (final NoResultException e) {
            System.out.println("Configuration object not yet saved");
        }

        databaseBackloaded.set(config.isBackloaded());
    }
}
