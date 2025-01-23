CREATE TABLE admine (
    admine_id SERIAL PRIMARY KEY   ,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    mot_de_passe VARCHAR(255),
    email VARCHAR(255)
);
DROP TABLE admine;

CREATE TABLE client (
    client_id SERIAL PRIMARY KEY   ,
    nom_prenom VARCHAR(255),
    adresse  VARCHAR(255),
admine_id SERIAL REFERENCES admine (admine_id)
);
DROP TABLE client;
CREATE TABLE produit (
    produit_id SERIAL PRIMARY KEY   ,
    nom VARCHAR(250),
    image VARCHAR(250),
	prix VARCHAR(250),
	admine_id SERIAL REFERENCES admine (admine_id)
);
CREATE TABLE commande (
    commande_id SERIAL PRIMARY KEY   ,
    prixT VARCHAR(250),
    time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	nom_client VARCHAR(250),
	client_id SERIAL REFERENCES client (client_id)
);
