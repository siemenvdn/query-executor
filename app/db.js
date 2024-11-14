let db;

const initQuery = `
-- Create tables
CREATE TABLE book (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    publication_year INTEGER,
    genre TEXT
);

CREATE TABLE member (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE reservation (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    member_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    reservation_date DATE NOT NULL,
    return_date DATE,
    due_date DATE NOT NULL,
    FOREIGN KEY (member_id) REFERENCES member(id),
    FOREIGN KEY (book_id) REFERENCES book(id)
);

-- Insert sample books
INSERT INTO book (title, author, publication_year, genre) VALUES
('The Flame of Eldoria', 'Sophie Vermilion', 2023, 'Fantasy'),
('Shadow of the Morning Sun', 'Thijs van der Linden', 2022, 'Thriller'),
('Secret of the Stars', 'Marcel de Groot', 2021, 'Adventure'),
('The Last Watch', 'Olivia van Es', 2020, 'Science Fiction'),
('The Forgotten Island', 'Liam Smit', 2023, 'Mystery'),
('The Velvet Crown', 'Eva Meijer', 2022, 'Historical Fiction'),
('Winds of Time', 'Joris Janssen', 2021, 'Fantasy'),
('The Black Sorcerer', 'Fleur Dijkstra', 2020, 'Horror'),
('Path of the Dragons', 'Tom Bakker', 2023, 'Adventure'),
('The Gray City', 'Isabelle de Vries', 2022, 'Dystopian');

-- Insert sample members
INSERT INTO member (first_name, last_name, email) VALUES
('John', 'Smith', 'john.smith@example.com'),
('Emma', 'Jones', 'emma.jones@example.com'),
('Lucas', 'Taylor', 'lucas.taylor@example.com'),
('Sophia', 'Brown', 'sophia.brown@example.com'),
('Mark', 'Davis', 'mark.davis@example.com');

-- Insert sample reservations
INSERT INTO reservation (member_id, book_id, reservation_date, due_date, return_date) VALUES
(1, 1, '2024-01-10', '2024-01-24', '2024-01-20'),
(2, 2, '2024-01-12', '2024-01-26', '2024-01-25'),
(3, 3, '2024-01-15', '2024-01-29', NULL),
(4, 4, '2024-01-18', '2024-02-01', NULL),
(5, 5, '2024-01-20', '2024-02-03', '2024-02-01'),
(1, 6, '2024-01-22', '2024-02-05', '2024-02-03'),
(2, 7, '2024-01-24', '2024-02-07', '2024-02-06'),
(3, 8, '2024-01-27', '2024-02-10', NULL),
(4, 9, '2024-01-30', '2024-02-13', NULL),
(5, 10, '2024-02-01', '2024-02-15', NULL),
(1, 2, '2024-02-05', '2024-02-19', NULL),
(2, 3, '2024-02-08', '2024-02-22', NULL),
(3, 4, '2024-02-10', '2024-02-24', NULL),
(4, 5, '2024-02-12', '2024-02-26', NULL),
(5, 1, '2024-02-14', '2024-02-28', NULL),
(1, 3, '2024-02-17', '2024-03-02', NULL),
(2, 6, '2024-02-20', '2024-03-05', NULL),
(3, 7, '2024-02-23', '2024-03-08', NULL),
(4, 8, '2024-02-26', '2024-03-11', NULL),
(5, 9, '2024-02-28', '2024-03-13', NULL);

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
