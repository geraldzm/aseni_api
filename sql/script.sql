-- ############################################################ DATABASE ############################################################
DROP TABLE IF EXISTS usrs;
CREATE TABLE [usrs] (
  [usr_id] int PRIMARY KEY IDENTITY(1, 1),
  [name] varchar(32),
  [bio] varchar(256),
  [id] int NOT NULL,
  [canton_id] int,
  [rol_id] int,
  [political_party_id] int
)
GO

DROP TABLE IF EXISTS rols;
CREATE TABLE [rols] (
  [rol_id] int PRIMARY KEY IDENTITY(1, 1),
  [name] varchar(32) UNIQUE NOT NULL
)
GO

DROP TABLE IF EXISTS political_parties;
CREATE TABLE [political_parties] (
  [pp_id] int PRIMARY KEY IDENTITY(1, 1),
  [name] varchar(32),
  [flag_image] varchar(512)
)
GO

DROP TABLE IF EXISTS cantons;
CREATE TABLE [cantons] (
  [canton_id] int PRIMARY KEY IDENTITY(1, 1),
  [name] varchar(32) NOT NULL
)
GO

DROP TABLE IF EXISTS plans;
CREATE TABLE [plans] (
  [plan_id] int PRIMARY KEY IDENTITY(1, 1),
  [title] varchar(32) NOT NULL,
  [description] varchar(512) NOT NULL,
  [pp_id] int
)
GO

DROP TABLE IF EXISTS deliverables;
CREATE TABLE [deliverables] (
  [deliverable_id] int PRIMARY KEY IDENTITY(1, 1),
  [deadline] datetime NOT NULL,
  [kpi] int NOT NULL,
  [score] smallint DEFAULT (0),
  [governmet_period_id] int,
  [action_id] int,
  [kpi_type_id] int,
  [canton_id] int,
  [plan_id] int
)
GO

DROP TABLE IF EXISTS deliverable_scores;
CREATE TABLE [deliverable_scores] (
  [deliverable_scores] int PRIMARY KEY IDENTITY(1, 1),
  [score] smallint NOT NULL,
  [checksum] varchar(64),
  [deliverable_id] int,
  [usr_id] int
)
GO

DROP TABLE IF EXISTS governmet_periods;
CREATE TABLE [governmet_periods] (
  [governmet_period_id] int PRIMARY KEY IDENTITY(1, 1),
  [start] datetime NOT NULL,
  [end] datetime NOT NULL
)
GO

DROP TABLE IF EXISTS actions;
CREATE TABLE [actions] (
  [action_id] int PRIMARY KEY IDENTITY(1, 1),
  [action] varchar(512) NOT NULL
)
GO

DROP TABLE IF EXISTS kpi_types;
CREATE TABLE [kpi_types] (
  [kpi_type_id] int PRIMARY KEY IDENTITY(1, 1),
  [name] varchar(32)
)
GO

ALTER TABLE [usrs] ADD FOREIGN KEY ([canton_id]) REFERENCES [cantons] ([canton_id])
GO

ALTER TABLE [usrs] ADD FOREIGN KEY ([rol_id]) REFERENCES [rols] ([rol_id])
GO

ALTER TABLE [usrs] ADD FOREIGN KEY ([political_party_id]) REFERENCES [political_parties] ([pp_id])
GO

ALTER TABLE [plans] ADD FOREIGN KEY ([pp_id]) REFERENCES [political_parties] ([pp_id])
GO

ALTER TABLE [deliverables] ADD FOREIGN KEY ([governmet_period_id]) REFERENCES [governmet_periods] ([governmet_period_id])
GO

ALTER TABLE [deliverables] ADD FOREIGN KEY ([action_id]) REFERENCES [actions] ([action_id])
GO

ALTER TABLE [deliverables] ADD FOREIGN KEY ([kpi_type_id]) REFERENCES [kpi_types] ([kpi_type_id])
GO

ALTER TABLE [deliverables] ADD FOREIGN KEY ([canton_id]) REFERENCES [cantons] ([canton_id])
GO

ALTER TABLE [deliverables] ADD FOREIGN KEY ([plan_id]) REFERENCES [plans] ([plan_id])
GO

ALTER TABLE [deliverable_scores] ADD FOREIGN KEY ([deliverable_id]) REFERENCES [deliverables] ([deliverable_id])
GO

ALTER TABLE [deliverable_scores] ADD FOREIGN KEY ([usr_id]) REFERENCES [usrs] ([usr_id])
GO

-- ############################################################ INSERTS ############################################################

insert into rols (name) values ('manager'), ('user');
insert into cantons (name) values ('Alajuela'), ('Cartago'), ('San jose'), ('Grecia'), ('Paraíso'), ('El Guarco'), ('Oreamuno'), ('Jimenez'), ('Alvarado'), ('Turrialba');
insert into kpi_types (name) values  ('Km'), ('Escuelas'), ('Startups'), ('Vacunas'), ('Jobs'), ('Ebais');

insert into political_parties (name, flag_image) values
('PLN', 'https://PLN'), ('PSD', 'https://PSD'), ('PAC', 'https://PAC'),
('PUSC', 'https://PUSC'),('LN', 'https://LN'),('CLN', 'https://CLN');

insert into plans
(title, description, pp_id) values
('plan 1', 'mi gran plan 1', 1),
('plan 2', 'mi gran plan 2', 2),
('plan 3', 'mi gran plan 3', 3),
('plan 4', 'mi gran plan 4', 4),
('plan 5', 'mi gran plan 5', 5),
('plan 6', 'mi gran plan 6', 6);

--Jefes de campania
insert into usrs (rol_id, political_party_id, name, bio, id,canton_id) values
(1, 1, 'José Figueres', 'Director Marketing',12345678,1),
(1, 2, 'Rodrígo Chavez', 'Economista',11223344,2),
(1, 3, 'Dimitri Perez', 'Ing en Computacion',12355,3),
(1, 4, 'Reece Dinarte', 'Biologa',1553857,4),
(1, 5, 'Bert Lawrence', 'Astronuta',18641,5),
(1, 6, 'Odysseus Simon', 'Cientifico',13518,7);

--Civil user
insert into usrs (rol_id, name, bio, id,canton_id) values
(2, 'Dustin Salvador', 'Ing Eletrica',16551,6),
(2, 'Zephania Merrill', 'Ing Civil',168161,5),
(2, 'Wade Russell', 'Ing Mecanico',16512,3),
(2, 'Bruno Lamar', 'Ing A',1816163,4),
(2, 'Ahmed Gomez', 'Quimico',135151,8),
(2, 'Pablo Gomez', 'Profesor',12334,10),
(2, 'Jaimico Liendra', 'Administador',442321,9);

insert into actions (action) values
('Asfaltado o restauracion de las carretera'),
('Construcción de escuelas'),
('Creación de empresas tecnológicas'),

('Vacuntar a toda la población'),
('Construir Ebais'),
('Generar 1000 empleos');

--8 de mayo del 2022
insert into governmet_periods (start,[end]) values
('2022-08-04','2026-08-04'),
('2026-09-04','2030-08-04'),
('2030-09-04','2034-08-04');

-- creating deliverables
DECLARE
    @parties INT = (select count(*) from political_parties),
    @actions INT,
    @deliveries INT,
    @c INT;

while @parties > 0 -- per party
begin
    select @actions = count(*) from actions;
    while @actions > 0 -- per action
    begin
        -- select random cantons
        select canton_id, ABS(CHECKSUM(NewId())) as weight
        into #canton_ids
        from cantons order by weight;

        set @deliveries = FLOOR(RAND()*(12-3+1))+3; -- 3 >= @deliveries <= 12

        while @deliveries > 0 -- 3 to 12 deliveries per action
        begin

            select top 1 @c = canton_id from #canton_ids;

            insert into deliverables (deadline, kpi, governmet_period_id, action_id, kpi_type_id, canton_id, plan_id)
            values (DATEADD(DAY, ABS(CHECKSUM(NEWID()) % 1460), '2022-08-04'), --  random day within the next 4 years
            FLOOR(RAND()*10)+1, -- kpi
            1, -- governmet period
            @actions,
            @actions,
            @c,
            @parties);
            delete from #canton_ids where canton_id = @c;
            set @deliveries = @deliveries - 1;

        end

        drop table #canton_ids;
        set @actions = @actions - 1;
    end

    set @parties = @parties - 1
end



-- INSERT SCORES
DECLARE
    @usr INT = (select count(*) from usrs),
    @deliCant INT,
    @d_id INT,
    @random smallint;

while @usr > 0 -- per user
begin
    -- get deliveries per canton by user_id
    select deliverable_id as dId
    into #deliverable_id
    from usrs
    Inner Join cantons c on c.canton_id = usrs.canton_id
    INNER JOIN deliverables d on c.canton_id = d.canton_id
    where usr_id = @usr
    order by dId;

    begin
        set @deliCant = FLOOR(RAND()*((select count(*) from #deliverable_id)+1)); --Deliveries to calificate

        while @deliCant > 0 --Deliveries to calificate
        begin

            select top 1 @d_id = dId from #deliverable_id; --get delivery id
            set @random = FLOOR(RAND()*(100+1));--  random number between 100 and 0
            insert into deliverable_scores (score, checksum, deliverable_id, usr_id)
            values (@random,
            ABS(CHECKSUM(@random,@usr,@random,@deliCant,@d_id, 'myPrivateKey(sdfjlxkc#j123v)')),
            @d_id,
            @usr);

            --Update score deliberables
            update deliverables set score = score + @random where deliverable_id = @d_id;
            delete from #deliverable_id where dId = @d_id;
            set @deliCant = @deliCant - 1;

        end
        drop table #deliverable_id;
    end

    set @usr = @usr - 1
end


-- ############################################################ QUERIES ############################################################

-- Query 1
-- Listar los cantones que recibirán
-- entregables en los primeros 100
-- días de gobierno, pero que no
-- recibirán nada en los últimos  100
---------> except, intersect, set difference, datepart
DROP VIEW IF EXISTS qr1First
GO
CREATE VIEW qr1First as
    select
    distinct c.name --, gp.start, d.deadline
    from deliverables d
    inner join cantons c on d.canton_id = c.canton_id
    inner join governmet_periods gp on d.governmet_period_id = gp.governmet_period_id
    where deadline between gp.start and DATEADD(DAY, 100, gp.start)
GO

DROP VIEW IF EXISTS qr1Second
GO
CREATE VIEW qr1Second as
select
distinct c.name --, gp.start, d.deadline
from deliverables d
inner join cantons c on d.canton_id = c.canton_id
inner join governmet_periods gp on d.governmet_period_id = gp.governmet_period_id
where deadline between gp.start and DATEADD(DAY, 100, gp.start)
EXCEPT --
select
distinct c.name-- , gp.[end], d.deadline
from deliverables d
inner join cantons c on d.canton_id = c.canton_id
inner join governmet_periods gp on d.governmet_period_id = gp.governmet_period_id
where deadline between DATEDIFF(DAY, 100, gp.[end])  and gp.[end]
GO


-- Query 2
-- Para una misma acción en un
-- mismo partido, sacar la
-- densidad para todos los
-- cantones que hay en los rangos
-- de satisfacción del primer,
-- segundo y tercer tercio
---------> dense_rank, pivot tables
DROP VIEW IF EXISTS qr2
GO
CREATE VIEW qr2 as
SELECT name, action, [0] * 100 / ([0] + [1] + [2]) as '1/3', [1]* 100 / ([0] + [1] + [2]) as '2/3', [2] * 100 / ([0] + [1] + [2]) as '3/3'
--SELECT name, action, [0] as '1/3', [1] as '2/3', [2] as '3/3'
FROM (
     SELECT pp.name,
            a.action,
            CASE
                WHEN d.score <= 33 THEN 0
                WHEN d.score <= 66 THEN 1
                ELSE 2
                END as clasification
     FROM deliverables d
              INNER JOIN plans p on d.plan_id = p.plan_id
              INNER JOIN political_parties pp on p.pp_id = pp.pp_id
              INNER JOIN actions a on d.action_id = a.action_id
     ) d
    pivot (
          COUNT (clasification)
          FOR clasification IN ([0], [1], [2])
     ) piv
GO