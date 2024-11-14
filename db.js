let db;

const initQuery = `
-- Maak de tabellen aan voor SQLite
CREATE TABLE boeken (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titel TEXT NOT NULL,
    auteur TEXT NOT NULL,
    publicatie_jaar INTEGER,
    genre TEXT
);

CREATE TABLE leden (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voornaam TEXT NOT NULL,
    achternaam TEXT NOT NULL,
    email TEXT UNIQUE
);

CREATE TABLE leningen (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lid_id INTEGER,
    boek_id INTEGER,
    leen_datum TEXT,
    inlever_datum TEXT,
    terug_datum TEXT,
    FOREIGN KEY (lid_id) REFERENCES leden(lid_id),
    FOREIGN KEY (boek_id) REFERENCES boeken(boek_id)
);

-- Voeg fictieve boeken toe
INSERT INTO boeken (titel, auteur, publicatie_jaar, genre) VALUES
('De Vlam van Eldoria', 'Sophie Vermilion', 2023, 'Fantasie'),
('Schaduw van de Ochtendzon', 'Thijs van der Linden', 2022, 'Thriller'),
('Het Geheim van de Sterren', 'Marcel de Groot', 2021, 'Avontuur'),
('De Laatste Wacht', 'Olivia van Es', 2020, 'Sciencefiction'),
('Het Vergeten Eiland', 'Liam Smit', 2023, 'Mysterie'),
('De Fluwelen Kroon', 'Eva Meijer', 2022, 'Historisch'),
('Winden van de Tijd', 'Joris Janssen', 2021, 'Fantasie'),
('De Zwarte Tovenaar', 'Fleur Dijkstra', 2020, 'Horror'),
('Het Pad van de Draken', 'Tom Bakker', 2023, 'Avontuur'),
('De Grijze Stad', 'Isabelle de Vries', 2022, 'Dystopie'),
('De Zandstorm', 'Lieke Bos', 2024, 'Thriller'),
('De Witte Herder', 'Henk Klaassen', 2023, 'Fantasie'),
('De Geluiden van de Nacht', 'Nina van Dijk', 2022, 'Horror');

-- Voeg denkbeeldige leden toe
INSERT INTO leden (voornaam, achternaam, email) VALUES
('Jan', 'Jansen', 'jan.jansen@example.com'),
('Emma', 'de Vries', 'emma.devries@example.com'),
('Lucas', 'Peters', 'lucas.peters@example.com'),
('Sophie', 'Willems', 'sophie.willems@example.com'),
('Mark', 'Smit', 'mark.smit@example.com');

-- Voeg denkbeeldige leningen toe
INSERT INTO leningen (lid_id, boek_id, leen_datum, inlever_datum, terug_datum) VALUES
(1, 1, '2024-10-01', '2024-10-15', '2024-10-14'),
(1, 2, '2024-10-05', '2024-10-19', '2024-10-18'),
(2, 3, '2024-10-02', '2024-10-16', '2024-10-15'),
(2, 4, '2024-10-03', '2024-10-17', '2024-10-16'),
(3, 5, '2024-10-04', '2024-10-18', '2024-10-17'),
(3, 6, '2024-10-06', '2024-10-20', '2024-10-19'),
(4, 7, '2024-10-07', '2024-10-21', '2024-10-20'),
(4, 8, '2024-10-08', '2024-10-22', '2024-10-21'),
(5, 9, '2024-10-09', '2024-10-23', '2024-10-22'),
(5, 10, '2024-10-10', '2024-10-24', '2024-10-23'),
(1, 3, '2024-10-11', '2024-10-25', '2024-10-24'),
(2, 6, '2024-10-12', '2024-10-26', '2024-10-25'),
(3, 8, '2024-10-13', '2024-10-27', '2024-10-26'),
(4, 10, '2024-10-14', '2024-10-28', '2024-10-27'),
(5, 7, '2024-10-15', '2024-10-29', '2024-10-28'),
(1, 4, '2024-10-16', '2024-10-30', '2024-10-29'),
(2, 9, '2024-10-17', '2024-10-31', '2024-10-30'),
(3, 5, '2024-10-18', '2024-11-01', '2024-10-31'),
(4, 2, '2024-10-19', '2024-11-02', '2024-11-01'),
(5, 1, '2024-10-20', '2024-11-03', '2024-11-02');
`;

async function initDatabase() {
    try {
        const SQL = await initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.1/${file}` });

        db = new SQL.Database();

        db.run(initQuery);
    } catch (error) {
        console.error("Error initializing SQL.js:", error);
    }

    document.getElementById('results').textContent = "Database initialized."; 
}

window.onload = initDatabase;
