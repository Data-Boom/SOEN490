
CREATE TABLE databoom_DB.Authors(
	author_id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
	middle_name VARCHAR(255),
    PRIMARY KEY (author_id)
);

CREATE TABLE databoom_DB.Publisher(
	publisher_id INT NOT NULL AUTO_INCREMENT,
	publisher_name VARCHAR(255),
    PRIMARY KEY (publisher_id)
);

CREATE TABLE databoom_DB.PublicationType(
	publication_type_id INT NOT NULL AUTO_INCREMENT,
	publication_type_name VARCHAR(255),
    PRIMARY KEY (publication_type_id)
);

CREATE TABLE databoom_DB.Publication(
	publication_id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(255) NOT NULL,
    publication_type_id INT NOT NULL,
	publisher_id INT NOT NULL,
    pages INT UNSIGNED,
    volume INT UNSIGNED,
    year YEAR NOT NULL,
    date_published DATE,
    date_accessed DATE,
    PRIMARY KEY (publication_id),
    FOREIGN KEY (publisher_id) REFERENCES Publisher(publisher_id),
    FOREIGN KEY (publication_type_id) REFERENCES PublicationType(publication_type_id)
);

CREATE TABLE databoom_DB.PublicationAuthors(
    publication_id INT NOT NULL,
    author_id INT NOT NULL,
    FOREIGN KEY (publication_id) REFERENCES Publication(publication_id),
    FOREIGN KEY (author_id) REFERENCES Authors(author_id)
);

CREATE TABLE databoom_DB.MaterialComposition(
	composition_id INT NOT NULL AUTO_INCREMENT,
    composition VARCHAR(50) NOT NULL,
    PRIMARY KEY (composition_id)
);

CREATE TABLE databoom_DB.Material(
	material_id INT NOT NULL AUTO_INCREMENT,
	material_name VARCHAR(255) NOT NULL,
    composition_id INT,
	details VARCHAR(255),
    PRIMARY KEY (material_id),	
    FOREIGN KEY (composition_id) REFERENCES MaterialComposition(composition_id)
);

CREATE TABLE databoom_DB.Gas(
	gas_id INT NOT NULL AUTO_INCREMENT,
	gas_name VARCHAR(255),
	gas_composition VARCHAR(50) NOT NULL,
    PRIMARY KEY (gas_id)
);

CREATE TABLE databoom_DB.Category(
	category_id INT NOT NULL AUTO_INCREMENT,
	category_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (category_id)
);

CREATE TABLE databoom_DB.Subcategory(
	subcategory_id INT NOT NULL AUTO_INCREMENT,
	subcategory_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (subcategory_id)
);

CREATE TABLE databoom_DB.DatasetDataType(
	data_type_id INT NOT NULL AUTO_INCREMENT,
	data_type_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (data_type_id)
);

CREATE TABLE databoom_DB.Dataset(
	dataset_id INT NOT NULL AUTO_INCREMENT,
	set_name VARCHAR(255) NOT NULL,
	publication_id INT NOT NULL,
	category_id INT,
	subcategory_id INT,
	material_id INT,
	fuel_id INT,
	oxidizer_id INT,
	diluent_id INT,
    data_type_id INT NOT NULL,
	comments VARCHAR(255),
    PRIMARY KEY (dataset_id),
    FOREIGN KEY (publication_id) REFERENCES Publication(publication_id),
    FOREIGN KEY (subcategory_id) REFERENCES Subcategory(subcategory_id),
    FOREIGN KEY (category_id) REFERENCES Category(category_id),
    FOREIGN KEY (material_id) REFERENCES Material(material_id),
    FOREIGN KEY (fuel_id) REFERENCES Gas(gas_id),
    FOREIGN KEY (oxidizer_id) REFERENCES Gas(gas_id),
    FOREIGN KEY (diluent_id) REFERENCES Gas(gas_id),
    FOREIGN KEY (data_type_id) REFERENCES DatasetDataType(data_type_id)
);

CREATE TABLE databoom_DB.DataPoint(
	datapoint_id INT NOT NULL AUTO_INCREMENT,
	dataset_id INT NOT NULL,
	initial_density FLOAT,
	initial_temperature FLOAT,
	initial_pressure FLOAT,
	shock_velocity FLOAT,
	particle_velocity FLOAT,
	density FLOAT,
	temperature FLOAT,
	pressure FLOAT,
	specific_volume FLOAT,
	compression_ratio FLOAT,
	comments VARCHAR(255),
    PRIMARY KEY (datapoint_id),
    FOREIGN KEY (dataset_id) REFERENCES Dataset(dataset_id)
);

INSERT INTO databoom_DB.Authors (first_name, last_name, middle_name) VALUES ('Stanley', 'Marsh', 'P.');
INSERT INTO databoom_DB.PublicationType (publication_type_name) VALUES ('Book');
INSERT INTO databoom_DB.Publisher (publisher_name) VALUES ('University of California Press');
INSERT INTO databoom_DB.Publication (title, publication_type_id, publisher_id, volume, year) VALUES ('LASL shock Hugoniot data','1','1','5','1980');
INSERT INTO databoom_DB.MaterialComposition (composition) VALUES ('C');
INSERT INTO databoom_DB.Material (material_name, composition_id, details) VALUES ('Carbon','1','Graphite, Pressed Graphite');
INSERT INTO databoom_DB.DatasetDataType (data_type_name) VALUES ('Hugoniot');
INSERT INTO databoom_DB.Dataset (set_name, publication_id, material_id, data_type_id, comments) VALUES ('CARBON, graphite, pressed,
Initial density = 2.13 g/cc','1','1','1','References 5,6,14\nAverage density = 2.134 g/cc');
INSERT INTO databoom_DB.PublicationAuthors (publication_id, author_id) VALUES ('1','1');
INSERT INTO databoom_DB.DataPoint (dataset_id, initial_density, initial_temperature, initial_pressure, shock_velocity, particle_velocity, pressure, specific_volume, density, compression_ratio, comments) VALUES ('1', '2.113','273.15','0.0','5.235','1.026','11.349','0.3805','2.628','0.804','im1'); 
INSERT INTO databoom_DB.DataPoint (dataset_id, initial_density, initial_temperature, initial_pressure, shock_velocity, particle_velocity, pressure, specific_volume, density, compression_ratio, comments) VALUES ('1', '2.123','273.15','0.0','6.013','1.380','17.617','0.3629','2.755','0.770','im1'); 
INSERT INTO databoom_DB.DataPoint (dataset_id, initial_density, initial_temperature, initial_pressure, shock_velocity, particle_velocity, pressure, specific_volume, density, compression_ratio, comments) VALUES ('1', '2.123','273.15','0.0','6.320','1.972','26.459','0.3241','3.086','0.688','im1'); 
INSERT INTO databoom_DB.DataPoint (dataset_id, initial_density, initial_temperature, initial_pressure, shock_velocity, particle_velocity, pressure, specific_volume, density, compression_ratio, comments) VALUES ('1', '2.143','273.15','0.0','6.551','2.607','36.599','0.2809','3.560','0.602','im1'); 
INSERT INTO databoom_DB.DataPoint (dataset_id, initial_density, initial_temperature, initial_pressure, shock_velocity, particle_velocity, pressure, specific_volume, density, compression_ratio, comments) VALUES ('1', '2.141','273.15','0.0','6.704','2.779','39.888','0.2735','3.657','0.585','im1'); 
INSERT INTO databoom_DB.DataPoint (dataset_id, initial_density, initial_temperature, initial_pressure, shock_velocity, particle_velocity, pressure, specific_volume, density, compression_ratio, comments) VALUES ('1', '2.146','273.15','0.0','7.960','3.370','57.567','0.2687','3.722','0.577','im1'); 
INSERT INTO databoom_DB.DataPoint (dataset_id, initial_density, initial_temperature, initial_pressure, shock_velocity, particle_velocity, pressure, specific_volume, density, compression_ratio, comments) VALUES ('1', '2.142','273.15','0.0','8.762','3.748','70.343','0.2672','3.743','0.572','im1'); 
INSERT INTO databoom_DB.DataPoint (dataset_id, initial_density, initial_temperature, initial_pressure, shock_velocity, particle_velocity, pressure, specific_volume, density, compression_ratio, comments) VALUES ('1', '2.134','273.15','0.0','8.836','3.801','71.672','0.2670','3.745','0.570','im1'); 
INSERT INTO databoom_DB.DataPoint (dataset_id, initial_density, initial_temperature, initial_pressure, shock_velocity, particle_velocity, pressure, specific_volume, density, compression_ratio, comments) VALUES ('1', '2.135','273.15','0.0','9.208','3.948','77.614','0.2676','3.737','0.571','im1'); 
INSERT INTO databoom_DB.DataPoint (dataset_id, initial_density, initial_temperature, initial_pressure, shock_velocity, particle_velocity, pressure, specific_volume, density, compression_ratio, comments) VALUES ('1', '2.136','273.15','0.0','9.627','4.138','85.091','0.2669','3.746','0.570','im1'); 
INSERT INTO databoom_DB.DataPoint (dataset_id, initial_density, initial_temperature, initial_pressure, shock_velocity, particle_velocity, pressure, specific_volume, density, compression_ratio, comments) VALUES ('1', '2.136','273.15','0.0','9.566','4.290','87.657','0.2582','3.873','0.552','im1');