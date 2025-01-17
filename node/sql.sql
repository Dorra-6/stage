CREATE TABLE admine (
    admine_id SERIAL PRIMARY KEY   ,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    motDePasse VARCHAR(255),
    email VARCHAR(255)
);
DROP TABLE admine;

CREATE TABLE client (
    client_id SERIAL PRIMARY KEY   ,
    nom VARCHAR(255),
    prenom VARCHAR(255),
admine_id SERIAL REFERENCES admine (admine_id)
);
DROP TABLE client;
