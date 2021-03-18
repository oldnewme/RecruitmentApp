from os import O_APPEND
import mysql.connector

replace_for_null = "09695060848347644085735346228334752515337078300310219385669578588"

old_database = mysql.connector.connect(
  host="localhost",
  user="root",
  password="Fotboll99!",
  database="mydatabase"
)

new_database = mysql.connector.connect(
  host="localhost",
  user="root",
  password="Fotboll99!"
)

old_db_cursor = old_database.cursor()
new_db_cursor = new_database.cursor()

new_db_cursor.execute("CREATE DATABASE IF NOT EXISTS mydatabase1")

new_database = mysql.connector.connect(
  host="localhost",
  user="root",
  password="Fotboll99!",
  database="mydatabase1"
)

new_db_cursor = new_database.cursor()

def create_tables():
    new_db_cursor.execute("DROP TABLE IF EXISTS role")
    new_db_cursor.execute("DROP TABLE IF EXISTS person")
    new_db_cursor.execute("DROP TABLE IF EXISTS availability")
    new_db_cursor.execute("DROP TABLE IF EXISTS competence")
    new_db_cursor.execute("DROP TABLE IF EXISTS competence_profile")

    new_db_cursor.execute("CREATE TABLE role (role_id BIGINT PRIMARY KEY,name VARCHAR(255))")
    new_db_cursor.execute("CREATE TABLE person (person_id BIGINT PRIMARY KEY,name VARCHAR(255),surname VARCHAR(255),ssn VARCHAR(255),email VARCHAR(255),password VARCHAR(255),role_id BIGINT REFERENCES role,username VARCHAR(255))")
    new_db_cursor.execute("CREATE TABLE availability (availability_id BIGINT PRIMARY KEY,person_id BIGINT REFERENCES person,from_date DATE,to_date DATE)")
    new_db_cursor.execute("CREATE TABLE competence (competence_id BIGINT PRIMARY KEY,name VARCHAR(255))")
    new_db_cursor.execute("CREATE TABLE competence_profile (competence_profile_id BIGINT PRIMARY KEY,person_id BIGINT REFERENCES person,competence_id BIGINT REFERENCES competence,years_of_experience NUMERIC(4,2))")

def migrate_role_table():
    old_db_cursor.execute("SELECT * FROM role")
    all = old_db_cursor.fetchall()
    chechForNull(all)
    for i in range(0, len(all)):
        new_db_cursor.execute("INSERT INTO role (role_id, name) VALUES (%s, %s)", 
          (all[i][0], all[i][1])) 

def migrate_person_table():
    old_db_cursor.execute("SELECT * FROM person")
    all = old_db_cursor.fetchall()
    chechForNull(all)
    for i in range(0, len(all)):
        new_db_cursor.execute("INSERT INTO person (person_id, name, surname, ssn, email, password, role_id, username) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", (all[i][0], all[i][1], all[i][2], all[i][3], all[i][4], all[i][5], all[i][6], all[i][7])) 

def migrate_competence_table():
    old_db_cursor.execute("SELECT * FROM competence")
    all = old_db_cursor.fetchall()
    chechForNull(all)
    for i in range(0, len(all)):
        new_db_cursor.execute("INSERT INTO competence (competence_id, name) VALUES (%s, %s)", (all[i][0], all[i][1])) 

def migrate_availability_table():
    old_db_cursor.execute("SELECT * FROM availability")
    all = old_db_cursor.fetchall()
    chechForNull(all)
    for i in range(0, len(all)):
        new_db_cursor.execute("INSERT INTO availability (availability_id, person_id, from_date, to_date) VALUES (%s, %s, %s, %s)", (all[i][0], all[i][1], all[i][2], all[i][3])) 

def migrate_competence_profile_table():
    old_db_cursor.execute("SELECT * FROM competence_profile")
    all = old_db_cursor.fetchall()
    chechForNull(all)
    for i in range(0, len(all)):
        new_db_cursor.execute("INSERT INTO competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) VALUES (%s, %s, %s, %s)", (all[i][0], all[i][1], all[i][2], all[i][3])) 

def chechForNull(all):
  for i in range(0, len(all)):
    temp = []
    for j in range(0, len(all[0])):
      if all[i][j] == None:
        temp.append(replace_for_null)
      else:
        temp.append(all[i][j])

    all[i] = tuple(temp)

   

create_tables()
migrate_role_table()
migrate_person_table()
migrate_competence_table()
migrate_availability_table()
migrate_competence_profile_table()

new_database.commit()







