package org.toasthub.scheduling;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.toasthub.model.Configuration;

@Repository("ScheduledEventManagerDao")
@Transactional()
public class ScheduledEventManagerDao {

    @Autowired
    private EntityManager entityManager;

    public Configuration getConfiguration() throws NoResultException {
		final String queryStr = "SELECT DISTINCT x FROM Configuration AS x";
		final Query query = entityManager.createQuery(queryStr);
        return (Configuration)query.getSingleResult();
	}

}
