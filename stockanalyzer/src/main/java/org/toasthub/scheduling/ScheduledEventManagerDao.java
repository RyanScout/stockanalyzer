package org.toasthub.scheduling;

import javax.persistence.NoResultException;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.toasthub.core.common.EntityManagerDataSvc;
import org.toasthub.stock.model.Configuration;

@Repository("TAScheduledEventManagerDao")
@Transactional("TransactionManagerData")
public class ScheduledEventManagerDao {

  @Autowired
  private EntityManagerDataSvc entityManagerDataSvc;

  public Configuration getConfiguration() throws NoResultException {
    final String queryStr = "SELECT DISTINCT x FROM Configuration AS x";
    final Query query = entityManagerDataSvc.getInstance().createQuery(queryStr);
    return (Configuration) query.getSingleResult();
  }

}
