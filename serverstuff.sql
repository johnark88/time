CREATE TABLE employee(
empid SERIAL PRIMARY KEY,
empname VARCHAR(50),
isadmin BOOLEAN,
isactive BOOLEAN,
authid VARCHAR(50),
authpic TEXT,
authemail VARCHAR(50)
);


CREATE TABLE clients(
clientid SERIAL PRIMARY KEY,
clientname VARCHAR(100),
isactive BOOLEAN
);

CREATE TABLE projects(
projectid SERIAL PRIMARY KEY,
startdate DATE,
enddate DATE,
projectname VARCHAR(100),
isactive BOOLEAN,
client_id INT REFERENCES clients(clientid)
);
CREATE TABLE time(
timeid SERIAL PRIMARY KEY,
date DATE,
hours VARCHAR(100),
description VARCHAR(150),
empid INT REFERENCES employee(empid),
projid INT REFERENCES projects(projectid)
);
CREATE TABLE emp_proj(
emp_id INT REFERENCES employee(empid),
project_id INT REFERENCES projects(projectid)
);



INSERT INTO employee(empname,isadmin,isactive) VALUES('Matt Stevens',false,true);
INSERT INTO employee(empname,isadmin,isactive) VALUES('John Fischer',false,true);
INSERT INTO employee(empname,isadmin,isactive) VALUES('Lisa Williams',true,true);
INSERT INTO employee(empname,isadmin,isactive) VALUES('Cody Richards',false,true);

INSERT INTO clients(clientname,isactive) VALUES('IBM',true);
INSERT INTO clients(clientname,isactive) VALUES('STARBUCKS',true);
INSERT INTO clients(clientname,isactive) VALUES('Medtronic',true);
INSERT INTO clients(clientname,isactive) VALUES('Microsoft',false);

INSERT INTO projects(startdate,enddate,projectname,isactive,client_id) VALUES('2016-9-1','2016-10-1','Data Tools Platform',false,1);
INSERT INTO projects(startdate,enddate,projectname,isactive,client_id) VALUES('2016-8-13','2016-10-12','Data Tools Incubator',true,2);
INSERT INTO projects(startdate,enddate,projectname,isactive,client_id) VALUES('2016-1-23','2016-10-14','Eclipse E-cor Tools',true,3);
INSERT INTO projects(startdate,enddate,projectname,isactive,client_id) VALUES('2016-6-13','2016-10-23','EMF Modeling Platform',false,3);
INSERT INTO projects(startdate,enddate,projectname,isactive,client_id) VALUES('2016-9-1','2016-10-1','ELK-Eclipse Layout Kernel',false,1);
INSERT INTO projects(startdate,enddate,projectname,isactive,client_id) VALUES('2016-8-13','2016-10-12','CDO Model Repository',true,2);
INSERT INTO projects(startdate,enddate,projectname,isactive,client_id) VALUES('2016-1-23','2016-10-14','Modeling Workflow Engine',true,3);
INSERT INTO projects(startdate,enddate,projectname,isactive,client_id) VALUES('2016-6-13','2016-10-23','EMF Parsley',false,3);
INSERT INTO projects(startdate,enddate,projectname,isactive,client_id) VALUES('2016-6-13','2016-10-23','Retrofit',false,4);
INSERT INTO projects(startdate,enddate,projectname,isactive,client_id) VALUES('2016-6-13','2016-10-23','Field Tech Study',false,4);
INSERT INTO projects(startdate,enddate,projectname,isactive,client_id) VALUES('2016-6-13','2016-10-23','Repurpose Front End',false,4);

INSERT INTO time(date,hours,description,empid,projid) VALUES('2016-10-13',12,'Met with client',4,3);
INSERT INTO time(date,hours,description,empid,projid) VALUES('2016-10-14',12,'Researched front end toolboxes',3,3);
INSERT INTO time(date,hours,description,empid,projid) VALUES('2016-10-23',12,'Planning phase started',3,3);
INSERT INTO time(date,hours,description,empid,projid) VALUES('2016-10-27',12,'Received back end data',2,1);
INSERT INTO time(date,hours,description,empid,projid) VALUES('2016-10-13',12,'Reformatted database',3,3);
INSERT INTO time(date,hours,description,empid,projid) VALUES('2016-10-14',12,'Met with client base',4,3);
INSERT INTO time(date,hours,description,empid,projid) VALUES('2016-10-23',12,'Finished with presentation',1,5);
INSERT INTO time(date,hours,description,empid,projid) VALUES('2016-10-27',12,'Got the figures from Matt',3,3);
INSERT INTO time(date,hours,description,empid,projid) VALUES('2016-10-13',12,'Implemented working definition',2,6);
INSERT INTO time(date,hours,description,empid,projid) VALUES('2016-10-14',12,'Worked with Lisa on swim lanes',4,3);
INSERT INTO time(date,hours,description,empid,projid) VALUES('2016-10-23',12,'Communicated with Clients',4,3);
INSERT INTO time(date,hours,description,empid,projid) VALUES('2016-10-27',12,'Finishing touches on scope',1,4);

INSERT INTO emp_proj(emp_id, project_id) VALUES(1,2);
INSERT INTO emp_proj(emp_id, project_id) VALUES(4,1);
INSERT INTO emp_proj(emp_id, project_id) VALUES(3,3);
INSERT INTO emp_proj(emp_id, project_id) VALUES(2,1);
INSERT INTO emp_proj(emp_id, project_id) VALUES(3,1);
INSERT INTO emp_proj(emp_id, project_id) VALUES(2,5);
INSERT INTO emp_proj(emp_id, project_id) VALUES(1,5);
INSERT INTO emp_proj(emp_id, project_id) VALUES(3,2);
INSERT INTO emp_proj(emp_id, project_id) VALUES(2,6);
INSERT INTO emp_proj(emp_id, project_id) VALUES(4,6);
INSERT INTO emp_proj(emp_id, project_id) VALUES(4,3);
INSERT INTO emp_proj(emp_id, project_id) VALUES(1,4);
INSERT INTO emp_proj(emp_id, project_id) VALUES(2,4);
INSERT INTO emp_proj(emp_id, project_id) VALUES(2,7);
INSERT INTO emp_proj(emp_id, project_id) VALUES(3,7);
INSERT INTO emp_proj(emp_id, project_id) VALUES(4,7);
