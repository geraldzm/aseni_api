
/*
End Poing 1

SELECT c.name as "Canton" , count(d.deliverable_id) as "Cantidad de beneficios primeros 100" FROM cantons c
INNER JOIN deliverables d on c.canton_id = d.canton_id
INNER JOIN governmet_periods gp on gp.governmet_period_id = d.governmet_period_id
WHERE deadline <= DATEADD(day,+100,start)
group by c.name


SELECT c.name as "Canton" FROM cantons c
INNER JOIN deliverables d on c.canton_id = d.canton_id
INNER JOIN governmet_periods gp on gp.governmet_period_id = d.governmet_period_id
WHERE deadline >= DATEADD(day,-10,[end])
EXCEPT
SELECT c.name as "Canton" FROM cantons c
INNER JOIN deliverables d on c.canton_id = d.canton_id
INNER JOIN governmet_periods gp on gp.governmet_period_id = d.governmet_period_id
WHERE deadline <= DATEADD(day,-10,[end])
group by c.name
*/
