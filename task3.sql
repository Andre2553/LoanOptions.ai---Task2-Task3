SELECT broker.name , COUNT(cust.ID) as customer_count
FROM dbo.broker as broker 
LEFT JOIN dbo.customers cust ON broker.id = cust.broker_Id
GROUP BY broker.name
ORDER BY customer_count DESC, broker.name ASC