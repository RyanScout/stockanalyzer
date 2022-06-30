package org.toasthub.api;

import org.toasthub.analysis.algorithm.AlgorithmCruncherSvc;
import org.toasthub.stock.analysis.CurrentTestingSvc;
import org.toasthub.stock.analysis.HistoricalAnalyzingSvc;
import org.toasthub.stock.cache.CacheSvc;
import org.toasthub.stock.custom_technical_indicator.CustomTechnicalIndicatorSvc;
import org.toasthub.stock.dashboard.DashboardSvc;
import org.toasthub.stock.historicalanalysis.HistoricalAnalysisSvc;
import org.toasthub.stock.order.PlaceOrderSvc;
import org.toasthub.stock.trade.TradeSvc;
import org.toasthub.utils.Request;
import org.toasthub.utils.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
// Test branch and merge
// Test 2 for Branching

@RestController
@RequestMapping("/api/public")
public class PublicWS {

	@Autowired
	PlaceOrderSvc placeOrderSvc;

	@Autowired
	DashboardSvc dashboardSvc;

	@Autowired
	HistoricalAnalyzingSvc historicalAnalyzingSvc;

	@Autowired
	TradeSvc tradeSvc;

	@Autowired
	HistoricalAnalysisSvc historicalAnalysisSvc;

	@Autowired
	AlgorithmCruncherSvc algorithmCruncherSvc;

	@Autowired
	CurrentTestingSvc currentTestingSvc;

	@Autowired
	CacheSvc cacheSvc;

	@Autowired
	CustomTechnicalIndicatorSvc customTechnicalIndicatorSvc;

	@RequestMapping(value = "callService", method = RequestMethod.POST)
	public Response service(@RequestBody Request request) {
		String service = (String) request.getParams().get("service");

		Response response = new Response();

		switch (service) {
			case "PLACE_ORDER":
				placeOrderSvc.process(request, response);
				break;
			case "HISTORICALLY_ANALYZE":
				historicalAnalyzingSvc.process(request, response);
				break;
			case "DASHBOARD":
				dashboardSvc.process(request, response);
				break;
			case "TRADE":
				tradeSvc.process(request, response);
				break;
			case "ALGORITHM_CRUNCHER":
				algorithmCruncherSvc.process(request, response);
				break;
			case "HISTORICAL_ANALYSIS":
				historicalAnalysisSvc.process(request, response);
				break;
			case "CACHE":
				cacheSvc.process(request, response);
				break;
			case "CUSTOM_TECHNICAL_INDICATOR":
				customTechnicalIndicatorSvc.process(request, response);
				break;
			case "CURRENT_TESTING_SVC":
				currentTestingSvc.process(request, response);
				break;
			default:
				break;
		}

		return response;
	}

}
