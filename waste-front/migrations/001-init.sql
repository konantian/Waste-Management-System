--Up
CREATE TABLE users (
  user_id TEXT, 
  role    TEXT,
  login   TEXT, 
  password  TEXT, 
  PRIMARY KEY (user_id),
  FOREIGN KEY (user_id) REFERENCES personnel(pid) ON DELETE CASCADE
);


CREATE TABLE trucks (
  truck_id          TEXT,
  model             TEXT,
  truck_type        TEXT,
  PRIMARY KEY (truck_id) 
);

CREATE TABLE maintenance_records (
  truck_id          TEXT,
  service_date      DATE,
  description       TEXT,
  PRIMARY KEY (truck_id, service_date),
  FOREIGN KEY (truck_id) REFERENCES trucks ON DELETE CASCADE
);

CREATE TABLE containers (
  container_id      TEXT,
  container_type    TEXT,
  date_when_built   DATE,
  PRIMARY KEY (container_id)
);

CREATE TABLE waste_types (
    waste_type      TEXT,
    PRIMARY KEY (waste_type)
);

CREATE TABLE container_waste_types (
  container_id      TEXT,
  waste_type        TEXT,
  PRIMARY KEY (container_id, waste_type),
  FOREIGN KEY (container_id) REFERENCES containers,
  FOREIGN KEY (waste_type) REFERENCES waste_types
);

CREATE TABLE personnel (
  pid               TEXT, 
  name              TEXT, 
  email             TEXT, 
  address           TEXT, 
  supervisor_pid    TEXT, 
  PRIMARY KEY (PID)
);

CREATE TABLE account_managers (
  pid               TEXT,
  manager_title     TEXT,
  office_location   TEXT,
  PRIMARY KEY (pid),
  FOREIGN KEY (pid) REFERENCES personnel
);

CREATE TABLE drivers (
  pid               TEXT,
  certification     TEXT,
  owned_truck_id    TEXT,
  PRIMARY KEY (pid),
  FOREIGN KEY (pid) REFERENCES personnel,
  FOREIGN KEY (owned_truck_id) REFERENCES trucks(truck_id)
);

CREATE TABLE accounts (
  account_no        TEXT,
  account_mgr       TEXT,
  customer_name     TEXT,
  contact_info      TEXT,
  customer_type     TEXT,
  start_date        DATE,
  end_date          DATE,
  total_amount      REAL,
  PRIMARY KEY (account_no),
  FOREIGN KEY (account_mgr) REFERENCES account_managers(pid)
);

CREATE TABLE service_agreements (
  service_no        TEXT,
  master_account    TEXT,
  location          TEXT,
  waste_type        TEXT,
  pick_up_schedule  TEXT,
  local_contact     TEXT,
  internal_cost     REAL,
  price             REAL,
  PRIMARY KEY (master_account, service_no),
  FOREIGN KEY (master_account) REFERENCES accounts ON DELETE CASCADE, 
  FOREIGN KEY (waste_type) REFERENCES waste_types
); 
  
CREATE TABLE service_fulfillments (
  date_time         DATE,
  master_account    TEXT, 
  service_no        TEXT,
  truck_id          TEXT,
  driver_id         TEXT,
  cid_drop_off      TEXT,
  cid_pick_up       TEXT,
  PRIMARY KEY (date_time, master_account, service_no, truck_id, driver_id, cid_drop_off, cid_pick_up)
  FOREIGN KEY (master_account, service_no) REFERENCES service_agreements,
  FOREIGN KEY (truck_id) REFERENCES trucks,
  FOREIGN KEY (driver_id) REFERENCES drivers(pid),
  FOREIGN KEY (cid_drop_off) REFERENCES containers(container_id),
  FOREIGN KEY (cid_pick_up) REFERENCES containers(container_id)
);

--trucks owned by drivers
INSERT INTO trucks VALUES('4T1BE','McLaren F1','front loader');
INSERT INTO trucks VALUES('KM8SC','Chevrolet LUV','garbage bin collector');
INSERT INTO trucks VALUES('3WKDD','Toyota Truck Xtracab SR5','front loader');
INSERT INTO trucks VALUES('JH4KA','Dodge Ram','roll-off');
INSERT INTO trucks VALUES('2FDJF','Chevrolet Blazer','roll-off');
INSERT INTO trucks VALUES('JH4DA','Chevrolet Tahoe','roll-off');
INSERT INTO trucks VALUES('3C8FY','Ford F-150','roll-off');
INSERT INTO trucks VALUES('2FDKF','Chevrolet Silverado','front loader');
INSERT INTO trucks VALUES('1D4HR','Toyota Tundra','roll-off');
INSERT INTO trucks VALUES('1F25D','Chevrolet Silverado','front loader');
INSERT INTO trucks VALUES('1ZVBP','Chevrolet Avalanche','roll-off');
INSERT INTO trucks VALUES('WP1AB','Dodge Ram Heavfy Duty','front loader');
INSERT INTO trucks VALUES('WAUAC','Ford F-Series','roll-off');
INSERT INTO trucks VALUES('2G1WF','Honda Ridgeline','garbage bin collector');
INSERT INTO trucks VALUES('3VWSE','Cadillac Escalade EXT','front loader');
INSERT INTO trucks VALUES('JHMSZ','Chevrolet Colorado','garbage bin collector');
INSERT INTO trucks VALUES('1FTRW','Chevrolet Silverado Hybrid','front loader');
INSERT INTO trucks VALUES('SCBCR','Dodge Dakota','front loader');
INSERT INTO trucks VALUES('1G8AZ','Dodge Ram 3500','garbage bin collector');
INSERT INTO trucks VALUES('ZAMGJ','Ford Explorer Sport Trac','roll-off');
INSERT INTO trucks VALUES('1HTMM','Ford','garbage bin collector');
INSERT INTO trucks VALUES('1HTNN','Ford','garbage bin collector');

--trucks owned by company
INSERT INTO trucks VALUES('1FAHP','Ford F-Series','roll-off');
INSERT INTO trucks VALUES('1FTHF','Honda Ridgeline','garbage bin collector');
INSERT INTO trucks VALUES('JTHCL','Cadillac Escalade EXT','front loader');
INSERT INTO trucks VALUES('1FD0W','Chevrolet Colorado','garbage bin collector');
INSERT INTO trucks VALUES('1G4HR','Chevrolet Silverado Hybrid','roll-off');
INSERT INTO trucks VALUES('1GBL7','Dodge Dakota','front loader');
INSERT INTO trucks VALUES('VF3BA','Dodge Ram 3500','garbage bin collector');
INSERT INTO trucks VALUES('1GTKP','Ford Explorer Sport Trac','roll-off');
INSERT INTO trucks VALUES('9BWBT','Ford','garbage bin collector');
INSERT INTO trucks VALUES('WVWUK','Ford','front loader');
INSERT INTO trucks VALUES('3A8FY','Dodge Dakota','front loader');
INSERT INTO trucks VALUES('WBAFG','Dodge Ram 3500','garbage bin collector');
INSERT INTO trucks VALUES('WAUGB','Ford Explorer Sport Trac','roll-off');
INSERT INTO trucks VALUES('1FDWX','Ford','garbage bin collector');
INSERT INTO trucks VALUES('1FTCR','Ford','front loader');
INSERT INTO trucks VALUES('JT3HN','Dodge Dakota','front loader');
INSERT INTO trucks VALUES('1FTRX','Dodge Ram 3500','garbage bin collector');
INSERT INTO trucks VALUES('1FV6J','Ford Explorer Sport Trac','roll-off');
INSERT INTO trucks VALUES('WP0CB','Ford','garbage bin collector');
INSERT INTO trucks VALUES('1C4RJ','Ford','front loader');

--maintenance_records of drivers owned trucks
INSERT INTO maintenance_records VALUES('4T1BE','2011-08-30 19:19:46','Inspection');
INSERT INTO maintenance_records VALUES('KM8SC','2014-05-05 19:05:21','Repair');
INSERT INTO maintenance_records VALUES('3WKDD','2016-04-29 02:04:22','Inspection');
INSERT INTO maintenance_records VALUES('JH4KA','2002-08-29 19:08:38','Repair');
INSERT INTO maintenance_records VALUES('2FDJF','2016-12-10 21:12:25','Inspection');
INSERT INTO maintenance_records VALUES('JH4DA','2006-10-24 11:10:56','Repair');
INSERT INTO maintenance_records VALUES('3C8FY','2005-12-02 12:12:05','Inspection');
INSERT INTO maintenance_records VALUES('2FDKF','2000-03-18 09:03:04','Repair');
INSERT INTO maintenance_records VALUES('1D4HR','2009-04-25 15:04:12','Inspection');
INSERT INTO maintenance_records VALUES('1F25D','2001-06-11 08:06:40','Repair');
INSERT INTO maintenance_records VALUES('1ZVBP','2010-05-02 06:05:28','Inspection');
INSERT INTO maintenance_records VALUES('WP1AB','2013-10-21 15:10:46','Repair');
INSERT INTO maintenance_records VALUES('WAUAC','2001-02-16 17:02:55','Inspection');
INSERT INTO maintenance_records VALUES('2G1WF','2001-06-19 10:06:53','Repair');
INSERT INTO maintenance_records VALUES('3VWSE','2001-07-04 20:07:13','Inspection');
INSERT INTO maintenance_records VALUES('JHMSZ','2005-07-12 11:07:49','Repair');
INSERT INTO maintenance_records VALUES('1FTRW','2008-06-18 13:06:43','Inspection');
INSERT INTO maintenance_records VALUES('SCBCR','2005-04-01 11:04:53','Repair');
INSERT INTO maintenance_records VALUES('1G8AZ','2016-12-07 18:12:29','Inspection');
INSERT INTO maintenance_records VALUES('ZAMGJ','2008-09-10 13:09:12','Repair');
INSERT INTO maintenance_records VALUES('1HTMM','2009-06-08 17:47:08','Inspection');
INSERT INTO maintenance_records VALUES('1HTNN','2016-01-28 09:30:52','Repair');

--maintenance_records of company owned trucks
INSERT INTO maintenance_records VALUES('1FAHP','2013-12-07 04:12:14','Inspection');
INSERT INTO maintenance_records VALUES('1FAHP','2011-06-13 12:12:45','Repair');
INSERT INTO maintenance_records VALUES('9BWBT','2014-01-12 15:05:36','Inspection');
INSERT INTO maintenance_records VALUES('9BWBT','2017-02-25 08:26:06','Inspection');
INSERT INTO maintenance_records VALUES('9BWBT','2018-11-24 11:34:27','Inspection');
INSERT INTO maintenance_records VALUES('WVWUK','2018-12-06 14:28:27','Inspection');
INSERT INTO maintenance_records VALUES('WVWUK','2009-06-14 08:47:27','Inspection');
INSERT INTO maintenance_records VALUES('WVWUK','2012-12-21 06:36:27','Inspection');
INSERT INTO maintenance_records VALUES('VF3BA','2018-06-25 13:25:27','Repair');
INSERT INTO maintenance_records VALUES('VF3BA','2014-04-21 22:12:27','Repair');
INSERT INTO maintenance_records VALUES('JTHCL','2012-03-21 17:06:27','Inspection');
INSERT INTO maintenance_records VALUES('JTHCL','2011-12-21 16:44:27','Inspection');
INSERT INTO maintenance_records VALUES('JTHCL','2018-06-25 13:19:27','Repair');
INSERT INTO maintenance_records VALUES('1G4HR','2018-12-06 14:28:27','Inspection');
INSERT INTO maintenance_records VALUES('1G4HR','2013-02-25 08:47:27','Inspection');
INSERT INTO maintenance_records VALUES('1G4HR','2008-12-21 06:36:27','Inspection');
INSERT INTO maintenance_records VALUES('1G4HR','2018-04-13 13:25:27','Repair');
INSERT INTO maintenance_records VALUES('1G4HR','2014-02-21 22:12:27','Repair');
INSERT INTO maintenance_records VALUES('1FD0W','2017-03-14 08:47:27','Inspection');
INSERT INTO maintenance_records VALUES('1FD0W','2011-04-13 13:25:27','Repair');
INSERT INTO maintenance_records VALUES('1FD0W','2015-02-21 22:12:27','Repair');
INSERT INTO maintenance_records VALUES('1FV6J','2010-04-23 09:22:28','Inspection');
INSERT INTO maintenance_records VALUES('1FV6J','2015-03-25 15:18:14','Inspection');
INSERT INTO maintenance_records VALUES('1FV6J','2013-10-30 23:07:51','Inspection');
INSERT INTO maintenance_records VALUES('1FV6J','2005-07-05 13:55:34','Repair');
INSERT INTO maintenance_records VALUES('1FV6J','2014-03-18 17:47:09','Repair');
INSERT INTO maintenance_records VALUES('WP0CB','2015-06-17 04:20:34','Inspection');
INSERT INTO maintenance_records VALUES('WP0CB','2009-01-30 06:38:52','Inspection');
INSERT INTO maintenance_records VALUES('WP0CB','2018-01-06 11:04:01','Inspection');
INSERT INTO maintenance_records VALUES('WP0CB','2013-12-27 23:25:52','Repair');
INSERT INTO maintenance_records VALUES('WP0CB','2012-10-01 10:09:02','Repair');
INSERT INTO maintenance_records VALUES('1C4RJ','2009-11-12 04:28:56','Inspection');
INSERT INTO maintenance_records VALUES('1C4RJ','2013-08-01 04:10:37','Inspection');
INSERT INTO maintenance_records VALUES('1C4RJ','2017-05-07 14:09:20','Inspection');
INSERT INTO maintenance_records VALUES('1C4RJ','2005-11-27 01:13:16','Repair');
INSERT INTO maintenance_records VALUES('1C4RJ','2008-10-18 00:23:32','Repair');
INSERT INTO maintenance_records VALUES('3A8FY','2017-01-20 04:39:50','Inspection');
INSERT INTO maintenance_records VALUES('3A8FY','2016-10-14 11:53:16','Repair');
INSERT INTO maintenance_records VALUES('3A8FY','2009-01-08 03:30:11','Repair');

--imaginary container
INSERT INTO containers VALUES('0000','Dummy Container','2015-03-10 20:42:44');

--real containers
INSERT INTO containers VALUES('2T3BF4','Auger Compactor','2015-03-10 20:42:44');
INSERT INTO containers VALUES('1M2P27','Roll-Off dumpster','2009-10-24 02:53:48');
INSERT INTO containers VALUES('5ASGRG','Closed-Topped','2016-12-10 06:14:33');
INSERT INTO containers VALUES('1FMEU1','Open-Topped','2012-04-23 09:35:36');
INSERT INTO containers VALUES('3GNGK2','Roll-Off dumpster','2012-04-04 17:33:32');
INSERT INTO containers VALUES('JH2PC3','Auger Compactor','2014-08-25 16:34:39');
INSERT INTO containers VALUES('JF1AX4','Hydraulic Compactor','2017-07-19 09:48:20');
INSERT INTO containers VALUES('WA1VGA','Open-Topped','2016-02-06 12:31:12');
INSERT INTO containers VALUES('2GTHK3','Auger Compactor','2017-12-28 04:26:57');
INSERT INTO containers VALUES('JHLRE3','Closed-Topped','2011-12-05 11:47:34');
INSERT INTO containers VALUES('3FRWF7','Hydraulic Compactor','2013-08-26 10:02:35');
INSERT INTO containers VALUES('4S4BRE','Open-Topped','2002-11-10 23:35:14');
INSERT INTO containers VALUES('3C4PDC','Roll-Off dumpster','2017-03-06 06:23:54');
INSERT INTO containers VALUES('3B6WF3','Auger Compactor','2017-09-03 22:04:34');
INSERT INTO containers VALUES('3GTP1T','Roll-Off dumpster','2015-09-20 05:10:53');
INSERT INTO containers VALUES('1FDEE1','Hydraulic Compactor','2014-05-29 19:55:50');
INSERT INTO containers VALUES('WAUGGA','Closed-Topped','2015-10-16 06:04:39');
INSERT INTO containers VALUES('2HGEJ2','Open-Topped','2015-10-15 19:49:57');
INSERT INTO containers VALUES('WDDHF2','Hydraulic Compactor','2008-10-01 03:39:51');
INSERT INTO containers VALUES('JH2SC6','Hydraulic Compactor','2013-12-08 10:53:12');
INSERT INTO containers VALUES('WBAFR1','Open-Topped','2017-06-27 24:34:39');
INSERT INTO containers VALUES('KL7TN5','Hydraulic Compactor','2008-11-01 04:14:09');
INSERT INTO containers VALUES('4S2CG5','Open-Topped','2011-07-16 16:08:41');
INSERT INTO containers VALUES('1GDZ7U','Closed-Topped','2015-11-01 18:14:28');
INSERT INTO containers VALUES('WBAAM5','Auger Compactor','2009-05-28 05:18:48');
INSERT INTO containers VALUES('3C3ES4','Auger Compactor','2010-03-18 19:24:54');
INSERT INTO containers VALUES('JH4KB2','Roll-Off dumpster','2008-09-21 08:58:41');
INSERT INTO containers VALUES('1GKDT1','Roll-Off dumpster','2009-03-29 12:34:15');
INSERT INTO containers VALUES('JS1GV7','Hydraulic Compactor','2010-11-18 22:51:52');
INSERT INTO containers VALUES('1GTCT1','Closed-Topped','2012-07-17 14:07:54');
INSERT INTO containers VALUES('4S3BH6','Hydraulic Compactor','2008-10-01 03:39:51');
INSERT INTO containers VALUES('2G1FP3','Hydraulic Compactor','2013-01-01 10:53:12');
INSERT INTO containers VALUES('JM1NA3','Hydraulic Compactor','2008-11-01 04:14:09');
INSERT INTO containers VALUES('4CDR5B','Open-Topped','2011-07-16 16:08:41');
INSERT INTO containers VALUES('1J4FT8','Open-Topped','2011-08-06 07:31:18');
INSERT INTO containers VALUES('3D7KS2','Closed-Topped','2015-11-01 18:14:28');
INSERT INTO containers VALUES('JTDBT9','Auger Compactor','2009-05-28 05:18:48');
INSERT INTO containers VALUES('2J4FY2','Auger Compactor','2010-03-18 19:24:54');
INSERT INTO containers VALUES('2FWBA2','Roll-Off dumpster','2008-09-21 08:58:41');
INSERT INTO containers VALUES('1FAFP5','Roll-Off dumpster','2009-03-29 12:34:15');
INSERT INTO containers VALUES('JTJBM7','Hydraulic Compactor','2010-11-18 22:51:52');


INSERT INTO waste_types VALUES('plastic');
INSERT INTO waste_types VALUES('paper');
INSERT INTO waste_types VALUES('hazardous waste');
INSERT INTO waste_types VALUES('construction waste');
INSERT INTO waste_types VALUES('mixed waste');
INSERT INTO waste_types VALUES('metal');
INSERT INTO waste_types VALUES('compost');


INSERT INTO container_waste_types  VALUES('2T3BF4','mixed waste');
INSERT INTO container_waste_types  VALUES('1M2P27','paper');
INSERT INTO container_waste_types  VALUES('5ASGRG','mixed waste');
INSERT INTO container_waste_types  VALUES('1FMEU1','construction waste');
INSERT INTO container_waste_types  VALUES('3GNGK2','hazardous waste');
INSERT INTO container_waste_types  VALUES('JH2PC3','compost');
INSERT INTO container_waste_types  VALUES('JF1AX4','construction waste');
INSERT INTO container_waste_types  VALUES('WA1VGA','hazardous waste');
INSERT INTO container_waste_types  VALUES('2GTHK3','plastic');
INSERT INTO container_waste_types  VALUES('JHLRE3','hazardous waste');
INSERT INTO container_waste_types  VALUES('3FRWF7','metal');
INSERT INTO container_waste_types  VALUES('4S4BRE','construction waste');
INSERT INTO container_waste_types  VALUES('3C4PDC','hazardous waste');
INSERT INTO container_waste_types  VALUES('3B6WF3','compost');
INSERT INTO container_waste_types  VALUES('3GTP1T','plastic');
INSERT INTO container_waste_types  VALUES('1FDEE1','compost');
INSERT INTO container_waste_types  VALUES('WAUGGA','plastic');
INSERT INTO container_waste_types  VALUES('2HGEJ2','metal');
INSERT INTO container_waste_types  VALUES('WDDHF2','mixed waste');
INSERT INTO container_waste_types  VALUES('4S3BH6','hazardous waste');
INSERT INTO container_waste_types  VALUES('2G1FP3','plastic');
INSERT INTO container_waste_types  VALUES('JM1NA3','mixed waste');
INSERT INTO container_waste_types  VALUES('4CDR5B','metal');
INSERT INTO container_waste_types  VALUES('1J4FT8','construction waste');
INSERT INTO container_waste_types  VALUES('3D7KS2','hazardous waste');
INSERT INTO container_waste_types  VALUES('JTDBT9','construction waste');
INSERT INTO container_waste_types  VALUES('2J4FY2','paper');
INSERT INTO container_waste_types  VALUES('2FWBA2','hazardous waste');
INSERT INTO container_waste_types  VALUES('1FAFP5','compost');
INSERT INTO container_waste_types  VALUES('JTJBM7','compost');
INSERT INTO container_waste_types  VALUES('4S2CG5','compost');
INSERT INTO container_waste_types  VALUES('JH2SC6','compost');
INSERT INTO container_waste_types  VALUES('KL7TN5','metal');
INSERT INTO container_waste_types  VALUES('WBAFR1','metal');


--information about account managers
INSERT INTO personnel VALUES('34725','Dan Brown','matloff@sbcglobal.net','Windsor Drive','57135');
INSERT INTO personnel VALUES('42134','Charlotte Vazquez','mjewell@optonline.net','Maple Avenue','52193');
INSERT INTO personnel VALUES('16830','Grady Travis','panolex@sbcglobal.net','Hillcrest Avenue','77919');
INSERT INTO personnel VALUES('73709','Carina Herrera','phyruxus@me.com','Schoolhouse Lane','63611');
INSERT INTO personnel VALUES('15625','Cameron Baxter','harryh@icloud.com','Cambridge Court','63089');
INSERT INTO personnel VALUES('56468','Roderick Gould','policies@live.com','Elm Avenue','76460');
INSERT INTO personnel VALUES('81480','Katrina Espinoza','doormat@yahoo.com','Linden Street','87965');
INSERT INTO personnel VALUES('48660','Jeremy Dawson','devphil@yahoo.ca','Route 202','71483');
INSERT INTO personnel VALUES('36474','Kamron Ray','earmstro@outlook.com','Penn Street','40974');
INSERT INTO personnel VALUES('58123','Elliott Knapp','staikos@yahoo.com','Hickory Lane','72611');
INSERT INTO personnel VALUES('12858','Alondra Mercer','arnold@live.com','Woodland Avenue','57135');
INSERT INTO personnel VALUES('12661','Greta Garcia','jlbaumga@me.com','Route 32','52193');
INSERT INTO personnel VALUES('30173','Miracle Lopez','gemmell@yahoo.ca','Eagle Road','77919');
INSERT INTO personnel VALUES('61192','Rishi Fuentes','jbuchana@icloud.com','Pleasant Street','63611');
INSERT INTO personnel VALUES('13038','Gretchen Garza','corrada@verizon.net','Mulberry Lane','63089');
INSERT INTO personnel VALUES('83804','Nathaly Valenzuela','ilial@live.com','Fairway Drive','76460');
INSERT INTO personnel VALUES('18457','Chloe Cline','tromey@me.com','Brandywine Drive','87965');
INSERT INTO personnel VALUES('63403','Everett Chaney','cgarcia@sbcglobal.net','Ivy Court','71483');
INSERT INTO personnel VALUES('65898','Braden Odonnell','quantaman@mac.com','Lilac Lane','40974');
INSERT INTO personnel VALUES('44330','Abril Ayers','empathy@gmail.com','Delaware Avenue','72611');


--information about drivers who own a truck
INSERT INTO personnel VALUES('43743','Valery Mendoza','wayward@yahoo.ca','Valley Road',NULL);
INSERT INTO personnel VALUES('52994','Finley Key','wagnerch@icloud.com','Route 202',NULL);
INSERT INTO personnel VALUES('50150','Zechariah Douglas','tbmaddux@optonline.net','Windsor Drive',NULL);
INSERT INTO personnel VALUES('15822','Antwan Chapman','sethbrown@outlook.com','Williams Street',NULL);
INSERT INTO personnel VALUES('68722','Oscar Lloyd','dobey@live.com','Brown Street',NULL);
INSERT INTO personnel VALUES('37547','Kaeden Roberson','forsberg@hotmail.com','Lawrence Street',NULL);
INSERT INTO personnel VALUES('16392','Arielle Nguyen','frosal@aol.com','Warren Avenue',NULL);
INSERT INTO personnel VALUES('29609','Regina Higgins','burns@msn.com','Chestnut Avenue',NULL);
INSERT INTO personnel VALUES('43058','Quintin Newton','cisugrad@yahoo.com','Country Club Road',NULL);
INSERT INTO personnel VALUES('58256','Nina Griffith','conteb@verizon.net','Riverside Drive',NULL);
INSERT INTO personnel VALUES('58753','Felipe Golden','hakim@icloud.com','Chestnut Street',NULL);
INSERT INTO personnel VALUES('41024','Giuliana Maynard','dkasak@gmail.com','Route 64',NULL);
INSERT INTO personnel VALUES('74406','Ryland Mercer','jbearp@att.net','Beech Street',NULL);
INSERT INTO personnel VALUES('59267','Rachael Lynn','gemmell@optonline.net','Virginia Avenue',NULL);
INSERT INTO personnel VALUES('63925','Israel Padilla','sjmuir@icloud.com','Creek Road',NULL);
INSERT INTO personnel VALUES('17253','Trevor Stafford','rhavyn@aol.com','Sherwood Drive',NULL);
INSERT INTO personnel VALUES('86923','Kaylee Ware','chrisk@aol.com','Hawthorne Lane',NULL);
INSERT INTO personnel VALUES('77131','Abigail Schroeder','meinkej@msn.com','Route 17',NULL);
INSERT INTO personnel VALUES('88563','Estrella David','smeier@aol.com','State Street East',NULL);
INSERT INTO personnel VALUES('88569','Samir Beck','rkobes@verizon.net','Union Street',NULL);
INSERT INTO personnel VALUES('23769','Steve Gates','stega@hotmail.com','Apple Street',NULL);
INSERT INTO personnel VALUES('12345','Gates Steve','gsteve@hotmail.com','Apple Street',NULL);

--drivers who do not own a truck
INSERT INTO personnel VALUES('95528','Waylon Dalton','mthurn@live.com','123 6th St. ',NULL);
INSERT INTO personnel VALUES('41179','Abdullah Lang','rgarcia@optonline.net','71 Pilgrim Avenue ',NULL);
INSERT INTO personnel VALUES('89216','GThalia Cobb','webdragon@comcast.net','4 Shirley Ave. ',NULL);
INSERT INTO personnel VALUES('98621','Eddie Randolph','crandall@sbcglobal.net','4 Goldfield Rd. ',NULL);
INSERT INTO personnel VALUES('11157','Lia Shelton','sfangorn@hotmail.com','69 Addison St.',NULL);
INSERT INTO personnel VALUES('83257','Joanna Shaffer','mxiao@yahoo.com','9972 North Valley St',NULL);
INSERT INTO personnel VALUES('68640','Justine Henderson','drezet@me.com','812 Mammoth Drive',NULL);
INSERT INTO personnel VALUES('63209','Marcus Cruz','euice@outlook.com','2 Arlington Dr. ',NULL);
INSERT INTO personnel VALUES('25897','Angela Walker','firstpr@att.net','8 Addison St. ',NULL);
INSERT INTO personnel VALUES('97560','Jonathon Sheppard','miyop@icloud.com','8159 Charles Ave. ',NULL);

--information about supervisor
INSERT INTO personnel VALUES('57135','Vicki Culberson','philb@yahoo.com','9972 North Valley St',NULL);
INSERT INTO personnel VALUES('52193','Catherine Bannister','pierce@sbcglobal.net','812 Mammoth Drive',NULL);
INSERT INTO personnel VALUES('77919','Lester Ouzts','neonatus@yahoo.com','2 Arlington Dr. ',NULL);
INSERT INTO personnel VALUES('63611','Salome Pizzuto','pjacklam@msn.com','8 Addison St. ',NULL);
INSERT INTO personnel VALUES('63089','Selene Petties','kohlis@gmail.com','8159 Charles Ave. ',NULL);

INSERT INTO personnel VALUES('76460','Waylon Dalton','cliffski@verizon.net','9972 North Valley St',NULL);
INSERT INTO personnel VALUES('87965','Marcus Cruz','osaru@aol.com','812 Mammoth Drive',NULL);
INSERT INTO personnel VALUES('71483','Eddie Randolph','bogjobber@sbcglobal.net','2 Arlington Dr. ',NULL);
INSERT INTO personnel VALUES('40974','Hadassah Hartman','akoblin@verizon.net','8 Addison St. ',NULL);
INSERT INTO personnel VALUES('72611','Justine Henderson','maratb@outlook.com','8159 Charles Ave. ',NULL);

--information about dispatchers
INSERT INTO personnel VALUES('83193','Andra Reigle','andrewik@att.net','9972 North Valley St',NULL);
INSERT INTO personnel VALUES('50468','Barney Rippy','rcwil@hotmail.com','812 Mammoth Drive',NULL);
INSERT INTO personnel VALUES('34484','Lovetta Ceniceros','xtang@yahoo.com','2 Arlington Dr. ',NULL);
INSERT INTO personnel VALUES('11653','Lina Mondragon','mgemmons@yahoo.ca','8 Addison St. ',NULL);
INSERT INTO personnel VALUES('72447','Minerva Gulino','jigsaw@yahoo.ca','8159 Charles Ave. ',NULL);


INSERT INTO account_managers VALUES('34725','small accounts manager','8th Street South');
INSERT INTO account_managers VALUES('42134','major accounts manager','Main Street West');
INSERT INTO account_managers VALUES('16830','medium accounts manager','Magnolia Court');
INSERT INTO account_managers VALUES('73709','medium accounts manager','Route 4');
INSERT INTO account_managers VALUES('15625','medium accounts manager','Park Avenue');
INSERT INTO account_managers VALUES('56468','major accounts manager','Westminster Drive');
INSERT INTO account_managers VALUES('81480','medium accounts manager','Spruce Avenue');
INSERT INTO account_managers VALUES('48660','major accounts manager','Atlantic Avenue');
INSERT INTO account_managers VALUES('36474','small accounts manager','2nd Avenue');
INSERT INTO account_managers VALUES('58123','major accounts manager','Ridge Street');
INSERT INTO account_managers VALUES('12858','medium accounts manager','Woodland Drive');
INSERT INTO account_managers VALUES('12661','medium accounts manager','7th Street');
INSERT INTO account_managers VALUES('30173','small accounts manager','Andover Court');
INSERT INTO account_managers VALUES('61192','major accounts manager','Windsor Drive');
INSERT INTO account_managers VALUES('13038','small accounts manager','Willow Street');
INSERT INTO account_managers VALUES('83804','medium accounts manager','5th Street East');
INSERT INTO account_managers VALUES('18457','small accounts manager','Willow Avenue');
INSERT INTO account_managers VALUES('63403','major accounts manager','3rd Street East');
INSERT INTO account_managers VALUES('65898','small accounts manager','Cottage Street');
INSERT INTO account_managers VALUES('44330','major accounts manager','Washington Avenue');

--drivers who own a truck
INSERT INTO drivers VALUES('43743','Single Trailer','4T1BE');
INSERT INTO drivers VALUES('52994','Single Trailer','KM8SC');
INSERT INTO drivers VALUES('50150','HAZMAT','3WKDD');
INSERT INTO drivers VALUES('15822','Doubles/Triples','JH4KA');
INSERT INTO drivers VALUES('68722','Tanker','2FDJF');
INSERT INTO drivers VALUES('37547','Single Trailer','JH4DA');
INSERT INTO drivers VALUES('16392','Doubles/Triples','3C8FY');
INSERT INTO drivers VALUES('29609','Tanker','2FDKF');
INSERT INTO drivers VALUES('43058','Single Trailer','1D4HR');
INSERT INTO drivers VALUES('58256','HAZMAT','1F25D');
INSERT INTO drivers VALUES('58753','Doubles/Triples','1ZVBP');
INSERT INTO drivers VALUES('41024','Tanker','WP1AB');
INSERT INTO drivers VALUES('74406','Doubles/Triples','WAUAC');
INSERT INTO drivers VALUES('59267','Doubles/Triples','2G1WF');
INSERT INTO drivers VALUES('63925','Tanker','3VWSE');
INSERT INTO drivers VALUES('17253','HAZMAT','JHMSZ');
INSERT INTO drivers VALUES('86923','Single Trailer','1FTRW');
INSERT INTO drivers VALUES('77131','HAZMAT','SCBCR');
INSERT INTO drivers VALUES('88563','HAZMAT','1G8AZ');
INSERT INTO drivers VALUES('88569','Tanker','ZAMGJ');
INSERT INTO drivers VALUES('23769','Doubles/Triples','1HTMM');
INSERT INTO drivers VALUES('12345','Doubles/Triples','1HTNN');

--drivers who do not own a truck
INSERT INTO drivers VALUES('95528','HAZMAT',NULL);
INSERT INTO drivers VALUES('41179','Tanker',NULL);
INSERT INTO drivers VALUES('89216','Doubles/Triples',NULL);
INSERT INTO drivers VALUES('98621','Tanker',NULL);
INSERT INTO drivers VALUES('11157','Doubles/Triples',NULL);
INSERT INTO drivers VALUES('83257','Doubles/Triples',NULL);
INSERT INTO drivers VALUES('68640','HAZMAT',NULL);
INSERT INTO drivers VALUES('63209','Doubles/Triples',NULL);
INSERT INTO drivers VALUES('25897','Tanker',NULL);
INSERT INTO drivers VALUES('97560','Doubles/Triples',NULL);


INSERT INTO accounts VALUES('87625036','34725','Rhianna Wilkinson','(201) 874-4399','residential','2006-05-19','2018-02-12',837646.52);
INSERT INTO accounts VALUES('73833854','42134','Reese Thornton','(745) 516-3060','commercial','2004-01-18','2013-02-09',893618.73);
INSERT INTO accounts VALUES('34910788','16830','Jarrett Castro','(883) 338-6912','commercial','2007-01-28','2019-11-06',658737.09);
INSERT INTO accounts VALUES('12029871','73709','Areli Lowery','(706) 692-2734','industrial','2000-08-03','2018-03-07',322370.9);
INSERT INTO accounts VALUES('85043375','15625','Lilyana Gaines','(425) 810-3987','municipal','2003-04-02','2016-02-10',111695.11);
INSERT INTO accounts VALUES('72149574','56468','Lila Sloan','(626) 284-7432','industrial','2002-11-15','2018-04-04',767403.0);
INSERT INTO accounts VALUES('23593363','34725','Alonzo Shea','(496) 102-3035','commercial','2006-07-25','2019-07-22',428144.53);
INSERT INTO accounts VALUES('47129366','48660','Luz Kim','(796) 248-8999','industrial','2002-05-03','2018-04-16',834604.63);
INSERT INTO accounts VALUES('11755945','36474','Tomas Young','(581) 306-2155','residential','2003-02-01','2016-11-23',173250.09);
INSERT INTO accounts VALUES('84319749','58123','Josue Avila','(401) 172-5651','commercial','2000-03-01','2015-03-18',640219.2);
INSERT INTO accounts VALUES('77905025','34725','Julie Herrera','(359) 306-2012','industrial','2002-01-24','2018-02-25',793215.43);
INSERT INTO accounts VALUES('86352274','12661','Jamarion Kane','(998) 516-7925','residential','2000-06-24','2018-03-08',379703.78);
INSERT INTO accounts VALUES('72061292','34725','Sidney Preston','(506) 127-2567','residential','2007-06-15','2020-01-19',413547.42);
INSERT INTO accounts VALUES('57573804','61192','Mollie Ray','(940) 530-6245','industrial','2004-04-18','2017-08-25',773982.78);
INSERT INTO accounts VALUES('55767889','13038','Alivia Crane','(893) 347-8760','municipal','2008-03-13','2018-01-21',376701.63);
INSERT INTO accounts VALUES('41074726','83804','Brodie Hobbs','(796) 508-6104','commercial','2008-07-09','2016-01-19',777713.3);
INSERT INTO accounts VALUES('34161631','18457','Sebastian Dickerson','(273) 202-5585','commercial','2008-04-29','2018-06-07',692683.04);
INSERT INTO accounts VALUES('28548963','34725','Ronald Sanchez','(473) 491-9025','residential','2004-11-09','2017-03-11',529090.23);
INSERT INTO accounts VALUES('56384545','65898','Itzel Guerrero','(287) 679-5399','industrial','2004-03-10','2018-02-16',123909.94);
INSERT INTO accounts VALUES('19924453','34725','Ahmad Cummings','(941) 357-9021','commercial','2007-11-05','2012-05-22',597017.16);
INSERT INTO accounts VALUES('94037803','81480','Alivia Crane','(893) 347-8760','municipal','2008-03-13','2018-01-21',376701.63);
INSERT INTO accounts VALUES('26752018','12858','Brodie Hobbs','(796) 508-6104','commercial','2008-07-09','2016-01-19',777713.3);



INSERT INTO service_agreements VALUES('1','87625036','Elm Avenue','hazardous waste','every Tuesday of every week','(904) 694-9532',566.45,1994);
INSERT INTO service_agreements VALUES('2','11755945','Essex Court','mixed waste','every Wednesday of every week','(947) 900-1946',657.8,1643);
INSERT INTO service_agreements VALUES('3','34910788','Circle Drive','construction waste','every Monday of every week','(149) 953-8810',360.87,1225);
INSERT INTO service_agreements VALUES('4','12029871','Delaware Avenue','hazardous waste','every Friday of every week','(306) 162-4684',464.2,1609);
INSERT INTO service_agreements VALUES('5','85043375','Atlantic Avenue','metal','every Saturday of every week','(923) 798-0938',412.44,2601);
INSERT INTO service_agreements VALUES('6','72149574','Route 4','metal','every Saturday of every week','(979) 186-4729',301.5,2687);
INSERT INTO service_agreements VALUES('7','72149574','Division Street','construction waste','every Monday of every week','(408) 705-0130',625.72,1217);
INSERT INTO service_agreements VALUES('8','72149574','Howard Street','mixed waste','every Sunday of every week','(759) 240-3008',235.79,1821);
INSERT INTO service_agreements VALUES('9','72149574','Route 6','hazardous waste','every Wednesday of every week','(664) 327-0990',326.89,1888);
INSERT INTO service_agreements VALUES('10','77905025','Jackson Avenue','compost','every Thursday of every week','(583) 636-4313',696.72,2547);
INSERT INTO service_agreements VALUES('11','72149574','Franklin Avenue','paper','every Wednesday of every week','(880) 824-2017',465.4,2867);
INSERT INTO service_agreements VALUES('12','94037803','Academy Street','mixed waste','every Thursday of every week','(812) 880-7941',200.96,2115);
INSERT INTO service_agreements VALUES('13','72149574','Hanover Court','hazardous waste','every Tuesday of every week','(663) 847-0513',515.39,2224);
INSERT INTO service_agreements VALUES('14','72149574','Route 7','compost','every Saturday of every week','(975) 365-1735',479.2,2395);
INSERT INTO service_agreements VALUES('15','11755945','Overlook Circle','hazardous waste','every Thursday of every week','(798) 925-1247',829.89,1971);
INSERT INTO service_agreements VALUES('16','34161631','Ridge Road','plastic','every Sunday of every week','(829) 690-6594',591.71,2815);
INSERT INTO service_agreements VALUES('17','72149574','Victoria Court','paper','every Friday of every week','(805) 776-6753',398.85,2820);
INSERT INTO service_agreements VALUES('18','94037803','Pin Oak Drive','compost','every Monday of every week','(202) 798-8388',408.02,1513);
INSERT INTO service_agreements VALUES('19','72149574','Hickory Street','metal','every Friday of every week','(209) 164-7895',886.99,1281);
INSERT INTO service_agreements VALUES('20','72149574','Essex Court','construction waste','every Wednesday of every week','(947) 900-1946',719.04,2108);
INSERT INTO service_agreements VALUES('21','72149574','Catherine Street','hazardous waste','every Wednesday of every week','(916) 326-7817',562.01,2615);
INSERT INTO service_agreements VALUES('22','72149574','Catherine Street','paper','every Wednesday of every week','(916) 326-7817',835.7,2455);
INSERT INTO service_agreements VALUES('23','72149574','Catherine Street','plastic','every Wednesday of every week','(916) 326-7817',256.36,1991);
INSERT INTO service_agreements VALUES('24','72149574','Jackson Avenue','hazardous waste','every Thursday of every week','(583) 636-4313',938.28,1620);
INSERT INTO service_agreements VALUES('25','77905025','Jackson Avenue','construction waste','every Thursday of every week','(583) 636-4313',649.4,1836);
INSERT INTO service_agreements VALUES('26','72149574','Hanover Court','compost','every Tuesday of every week','(663) 847-0513',394.41,1603);
INSERT INTO service_agreements VALUES('27','19924453','Hickory Street','hazardous waste','every Friday of every week','(209) 164-7895',436.22,2225);
INSERT INTO service_agreements VALUES('28','72149574','Catherine Street','paper','every Wednesday of every week','(916) 326-7817',562.01,2615);
INSERT INTO service_agreements VALUES('29','72149574','Catherine Street','compost','every Monday of every week','(916) 326-7817',835.7,2455);
INSERT INTO service_agreements VALUES('30','72149574','Catherine Street','hazardous waste','every Wednesday of every week','(916) 326-7817',256.36,1991);
INSERT INTO service_agreements VALUES('31','72149574','Catherine Street','metal','every Wednesday of every week','(916) 326-7817',562.01,2615);
INSERT INTO service_agreements VALUES('32','72149574','Catherine Street','construction waste','every Thursday of every week','(916) 326-7817',835.7,2455);
INSERT INTO service_agreements VALUES('33','72149574','Catherine Street','mixed waste','every Tuesday of every week','(916) 326-7817',256.36,1991);
INSERT INTO service_agreements VALUES('34','72149574','Catherine Street','hazardous waste','every Wednesday of every week','(916) 326-7817',562.01,2615);
INSERT INTO service_agreements VALUES('35','72149574','Catherine Street','mixed waste','every Sunday of every week','(916) 326-7817',835.7,2455);
INSERT INTO service_agreements VALUES('36','72149574','Catherine Street','mixed waste','every Wednesday of every week','(916) 326-7817',256.36,1991);
INSERT INTO service_agreements VALUES('37','73833854','Elm Avenue','hazardous waste','every Tuesday of every week','(904) 694-9532',566.45,1994);
INSERT INTO service_agreements VALUES('38','77905025','Essex Court','mixed waste','every Wednesday of every week','(947) 900-1946',657.8,1643);
INSERT INTO service_agreements VALUES('39','11755945','Circle Drive','construction waste','every Monday of every week','(149) 953-8810',360.87,1225);
INSERT INTO service_agreements VALUES('40','73833854','Delaware Avenue','hazardous waste','every Friday of every week','(306) 162-4684',464.2,1609);
INSERT INTO service_agreements VALUES('41','94037803','Atlantic Avenue','metal','every Saturday of every week','(923) 798-0938',412.44,2601);
INSERT INTO service_agreements VALUES('42','73833854','Route 4','metal','every Saturday of every week','(979) 186-4729',301.5,2687);
INSERT INTO service_agreements VALUES('43','19924453','Division Street','construction waste','every Monday of every week','(408) 705-0130',625.72,1217);
INSERT INTO service_agreements VALUES('44','73833854','Howard Street','mixed waste','every Sunday of every week','(759) 240-3008',235.79,1821);
INSERT INTO service_agreements VALUES('45','11755945','Route 6','hazardous waste','every Wednesday of every week','(664) 327-0990',326.89,1888);
INSERT INTO service_agreements VALUES('46','73833854','Jackson Avenue','compost','every Thursday of every week','(583) 636-4313',696.72,2547);
INSERT INTO service_agreements VALUES('47','77905025','Franklin Avenue','paper','every Wednesday of every week','(880) 824-2017',465.4,2867);
INSERT INTO service_agreements VALUES('48','19924453','Academy Street','mixed waste','every Thursday of every week','(812) 880-7941',200.96,2115);
INSERT INTO service_agreements VALUES('49','47129366','Hanover Court','hazardous waste','every Tuesday of every week','(663) 847-0513',515.39,2224);
INSERT INTO service_agreements VALUES('50','72149574','Route 7','compost','every Saturday of every week','(975) 365-1735',479.2,2395);
INSERT INTO service_agreements VALUES('51','11755945','Overlook Circle','hazardous waste','every Thursday of every week','(798) 925-1247',829.89,1971);
INSERT INTO service_agreements VALUES('52','11755945','Ridge Road','plastic','every Sunday of every week','(829) 690-6594',591.71,2815);
INSERT INTO service_agreements VALUES('53','19924453','Victoria Court','paper','every Friday of every week','(805) 776-6753',398.85,2820);
INSERT INTO service_agreements VALUES('54','19924453','Overlook Circle','hazardous waste','every Thursday of every week','(798) 925-1247',829.89,1971);
INSERT INTO service_agreements VALUES('55','19924453','Ridge Road','plastic','every Sunday of every week','(829) 690-6594',591.71,2815);
INSERT INTO service_agreements VALUES('56','19924453','Victoria Court','paper','every Friday of every week','(805) 776-6753',398.85,2820);
INSERT INTO service_agreements VALUES('57','19924453','Atlantic Avenue','metal','every Saturday of every week','(923) 798-0938',412.44,2601);
INSERT INTO service_agreements VALUES('58','19924453','Atlantic Avenue','metal','every Saturday of every week','(923) 798-0938',412.44,2601);
INSERT INTO service_agreements VALUES('59','19924453','Atlantic Avenue','metal','every Saturday of every week','(923) 798-0938',412.44,2601);
INSERT INTO service_agreements VALUES('60','19924453','Atlantic Avenue','metal','every Saturday of every week','(923) 798-0938',412.44,2601);
INSERT INTO service_agreements VALUES('61','94037803','Overlook Circle','hazardous waste','every Thursday of every week','(798) 925-1247',829.89,1971);
INSERT INTO service_agreements VALUES('62','94037803','Overlook Circle','hazardous waste','every Thursday of every week','(798) 925-1247',829.89,1971);
INSERT INTO service_agreements VALUES('63','94037803','Overlook Circle','hazardous waste','every Thursday of every week','(798) 925-1247',829.89,1971);
INSERT INTO service_agreements VALUES('64','26752018','Overlook Circle','hazardous waste','every Thursday of every week','(798) 925-1247',829.89,1971);
INSERT INTO service_agreements VALUES('65','94037803','Victoria Court','paper','every Friday of every week','(805) 776-6753',398.85,2820);
INSERT INTO service_agreements VALUES('66','26752018','Overlook Circle','hazardous waste','every Thursday of every week','(798) 925-1247',829.89,1971);
INSERT INTO service_agreements VALUES('67','47129366','Ridge Road','plastic','every Sunday of every week','(829) 690-6594',591.71,2815);
INSERT INTO service_agreements VALUES('68','34910788','Route 4','metal','every Saturday of every week','(979) 186-4729',301.5,2687);
INSERT INTO service_agreements VALUES('69','85043375','Division Street','construction waste','every Monday of every week','(408) 705-0130',625.72,1217);
INSERT INTO service_agreements VALUES('70','34910788','Howard Street','mixed waste','every Sunday of every week','(759) 240-3008',235.79,1821);
INSERT INTO service_agreements VALUES('71','94037803','Route 7','compost','every Saturday of every week','(975) 365-1735',479.2,2395);
INSERT INTO service_agreements VALUES('72','26752018','Overlook Circle','hazardous waste','every Thursday of every week','(798) 925-1247',829.89,1971);
INSERT INTO service_agreements VALUES('73','86352274','Ridge Road','plastic','every Sunday of every week','(829) 690-6594',591.71,2815);
INSERT INTO service_agreements VALUES('74','28548963','Victoria Court','paper','every Friday of every week','(805) 776-6753',398.85,2820);
INSERT INTO service_agreements VALUES('75','85043375','Pin Oak Drive','compost','every Monday of every week','(202) 798-8388',408.02,1513);
INSERT INTO service_agreements VALUES('76','19924453','Hickory Street','metal','every Friday of every week','(209) 164-7895',886.99,1281);
INSERT INTO service_agreements VALUES('77','73833854','Essex Court','construction waste','every Wednesday of every week','(947) 900-1946',719.04,2108);
INSERT INTO service_agreements VALUES('78','85043375','Catherine Street','hazardous waste','every Wednesday of every week','(916) 326-7817',562.01,2615);
INSERT INTO service_agreements VALUES('79','34910788','Catherine Street','paper','every Wednesday of every week','(916) 326-7817',835.7,2455);
INSERT INTO service_agreements VALUES('80','26752018','Academy Street','mixed waste','every Thursday of every week','(812) 880-7941',200.96,2115);
INSERT INTO service_agreements VALUES('81','85043375','Hanover Court','hazardous waste','every Tuesday of every week','(663) 847-0513',515.39,2224);
INSERT INTO service_agreements VALUES('82','94037803','Route 7','compost','every Saturday of every week','(975) 365-1735',479.2,2395);
INSERT INTO service_agreements VALUES('83','94037803','Overlook Circle','hazardous waste','every Thursday of every week','(798) 925-1247',829.89,1971);
INSERT INTO service_agreements VALUES('84','26752018','Ridge Road','plastic','every Sunday of every week','(829) 690-6594',591.71,2815);
INSERT INTO service_agreements VALUES('85','94037803','Victoria Court','paper','every Friday of every week','(805) 776-6753',398.85,2820);


INSERT INTO service_fulfillments VALUES('2015-07-30','87625036','1','4T1BE','43743','2T3BF4','0000');
INSERT INTO service_fulfillments VALUES('2016-01-05','11755945','2','KM8SC','88569','1M2P27','0000');
INSERT INTO service_fulfillments VALUES('2011-10-16','34910788','3','3WKDD','50150','5ASGRG','1M2P27');
INSERT INTO service_fulfillments VALUES('2015-08-04','12029871','4','JH4KA','15822','1FMEU1','2T3BF4');
INSERT INTO service_fulfillments VALUES('2017-04-05','85043375','5','2FDJF','68722','3GNGK2','0000');
INSERT INTO service_fulfillments VALUES('2017-11-29','72149574','6','3C8FY','16392','1M2P27','0000');
INSERT INTO service_fulfillments VALUES('2014-09-15','72149574','7','2FDKF','29609','JF1AX4','1M2P27');
INSERT INTO service_fulfillments VALUES('2011-08-17','72149574','8','1F25D','58256','1M2P27','3GNGK2');
INSERT INTO service_fulfillments VALUES('2015-11-10','72149574','9','1ZVBP','58753','JHLRE3','1M2P27');
INSERT INTO service_fulfillments VALUES('2016-06-08','77905025','10','2G1WF','59267','3C4PDC','0000');
INSERT INTO service_fulfillments VALUES('2010-12-05','72149574','11','3VWSE','63925','1M2P27','0000');
INSERT INTO service_fulfillments VALUES('2015-05-23','94037803','12','1D4HR','77131','WA1VGA','1M2P27');
INSERT INTO service_fulfillments VALUES('2010-02-01','72149574','13','JHMSZ','17253','3GTP1T','0000');
INSERT INTO service_fulfillments VALUES('2012-07-01','72149574','14','1FTRW','86923','1M2P27','JF1AX4');
INSERT INTO service_fulfillments VALUES('2015-06-23','11755945','15','SCBCR','77131','WAUGGA','WA1VGA');
INSERT INTO service_fulfillments VALUES('2016-03-05','34161631','16','1G8AZ','88563','2HGEJ2','1M2P27');
INSERT INTO service_fulfillments VALUES('2015-04-03','72149574','17','ZAMGJ','88563','1M2P27','3C4PDC');
INSERT INTO service_fulfillments VALUES('2007-05-11','94037803','18','WAUAC','12345','3FRWF7','0000');
INSERT INTO service_fulfillments VALUES('2012-06-10','72149574','19','2G1WF','17253','4CDR5B','1M2P27');
INSERT INTO service_fulfillments VALUES('2005-05-05','72149574','20','JHMSZ','17253','JM1NA3','WAUGGA');
INSERT INTO service_fulfillments VALUES('2006-04-08','72149574','21','3VWSE','17253','1M2P27','JM1NA3');
INSERT INTO service_fulfillments VALUES('2008-03-08','72149574','22','1FTRW','86923','WA1VGA','1M2P27');
INSERT INTO service_fulfillments VALUES('2015-04-23','72149574','23','1D4HR','17253','2G1FP3','5ASGRG');
INSERT INTO service_fulfillments VALUES('2016-07-23','72149574','24','SCBCR','17253','1M2P27','WA1VGA');
INSERT INTO service_fulfillments VALUES('2014-01-28','77905025','25','1FTRW','17253','4S4BRE','1M2P27');
INSERT INTO service_fulfillments VALUES('2016-01-08','72149574','26','3VWSE','17253','1M2P27','0000');
INSERT INTO service_fulfillments VALUES('2014-12-11','19924453','27','3WKDD','17253','1J4FT8','1M2P27');
INSERT INTO service_fulfillments VALUES('2016-03-22','72149574','28','4T1BE','17253','5ASGRG','0000');
INSERT INTO service_fulfillments VALUES('2014-01-28','72149574','29','1FTRW','17253','1M2P27','1FMEU1');
INSERT INTO service_fulfillments VALUES('2015-10-23','72149574','30','1G8AZ','88563','WAUGGA','1M2P27');
INSERT INTO service_fulfillments VALUES('2015-10-23','72149574','31','1G8AZ','88563','1M2P27','5ASGRG');
INSERT INTO service_fulfillments VALUES('2016-03-22','72149574','32','4T1BE','17253','2G1FP3','0000');
INSERT INTO service_fulfillments VALUES('2017-09-04','72149574','33','1G8AZ','17253','1FAFP5','2G1FP3');
INSERT INTO service_fulfillments VALUES('2017-09-18','72149574','34','JHMSZ','17253','1FDEE1','0000');
INSERT INTO service_fulfillments VALUES('2014-10-27','72149574','35','1G8AZ','17253','2FWBA2','0000');
INSERT INTO service_fulfillments VALUES('2014-03-30','72149574','36','4T1BE','74406','2G1FP3','5ASGRG');
INSERT INTO service_fulfillments VALUES('2016-05-07','73833854','37','1ZVBP','77131','JTJBM7','2G1FP3');
INSERT INTO service_fulfillments VALUES('2016-04-08','77905025','38','WP1AB','58753','2G1FP3','3FRWF7');
INSERT INTO service_fulfillments VALUES('2013-09-12','11755945','39','WAUAC','15822','5ASGRG','1FDEE1');
INSERT INTO service_fulfillments VALUES('2013-08-09','73833854','40','2G1WF','23769','2G1FP3','0000');
INSERT INTO service_fulfillments VALUES('2014-01-29','94037803','41','3VWSE','15822','3B6WF3','0000');
INSERT INTO service_fulfillments VALUES('2013-04-12','73833854','42','4T1BE','12345','4S3BH6','2G1FP3');
INSERT INTO service_fulfillments VALUES('2014-02-15','19924453','43','1FTRW','43058','2G1FP3','2FWBA2');
INSERT INTO service_fulfillments VALUES('2015-01-17','73833854','44','ZAMGJ','88569','3FRWF7','2G1FP3');
INSERT INTO service_fulfillments VALUES('2013-12-06','11755945','45','1D4HR','23769','2G1FP3','1GDZ7U');
INSERT INTO service_fulfillments VALUES('2015-10-01','73833854','46','2G1WF','58753','WBAFR1','2G1FP3');
INSERT INTO service_fulfillments VALUES('2015-03-22','77905025','47','3WKDD','58753','2G1FP3','JTJBM7');
INSERT INTO service_fulfillments VALUES('2013-07-28','19924453','48','WP1AB','17253','WBAAM5','2G1FP3');
INSERT INTO service_fulfillments VALUES('2014-04-27','47129366','49','1ZVBP','17253','2G1FP3','4CDR5B');
INSERT INTO service_fulfillments VALUES('2015-12-01','72149574','50','1FTRW','58753','2J4FY2','WBAAM5');
INSERT INTO service_fulfillments VALUES('2017-08-19','11755945','51','1G8AZ','43743','WDDHF2','2G1FP3');
INSERT INTO service_fulfillments VALUES('2016-08-03','11755945','52','JHMSZ','12345','2G1FP3','0000');
INSERT INTO service_fulfillments VALUES('2016-03-25','19924453','53','2G1WF','41024','3C3ES4','2G1FP3');
INSERT INTO service_fulfillments VALUES('2007-04-16','19924453','54','4T1BE','41024','1GKDT1','3FRWF7');
INSERT INTO service_fulfillments VALUES('2014-09-13','19924453','55','WP1AB','41024','2G1FP3','WDDHF2');
INSERT INTO service_fulfillments VALUES('2017-08-09','19924453','56','1FTRW','41024','JTDBT9','2G1FP3');
INSERT INTO service_fulfillments VALUES('2017-07-03','19924453','57','1FTRW','41024','JTJBM7','3B6WF3');
INSERT INTO service_fulfillments VALUES('2017-06-01','19924453','58','4T1BE','41024','2G1FP3','1FAFP5');
INSERT INTO service_fulfillments VALUES('2017-09-14','19924453','59','WP1AB','41024','WDDHF2','0000');
INSERT INTO service_fulfillments VALUES('2017-09-28','19924453','60','ZAMGJ','41024','WBAAM5','0000');
INSERT INTO service_fulfillments VALUES('2017-04-13','94037803','61','WP1AB','41024','WA1VGA','0000');
INSERT INTO service_fulfillments VALUES('2017-06-01','94037803','62','JHMSZ','41024','KL7TN5','3C3ES4');
INSERT INTO service_fulfillments VALUES('2017-10-01','94037803','63','1G8AZ','41024','JH2SC6','KL7TN5');
INSERT INTO service_fulfillments VALUES('2017-10-09','26752018','64','1G8AZ','23769','JH2PC3','1GKDT1');
INSERT INTO service_fulfillments VALUES('2017-04-14','94037803','65','1G8AZ','88569','3GNGK2','0000');

--Down
