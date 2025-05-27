CREATE TABLE Students (
  id INTEGER PRIMARY KEY,
  studentName TEXT NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE Courses (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  courseDesc TEXT NOT NULL
);


CREATE TABLE Registrations (
    id int NOT NULL,
    studentId int NOT NULL,
    courseId int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (studentId) REFERENCES Students(id),
    FOREIGN KEY (courseId) REFERENCES Courses(id)
);


-- INSERT INTO Courses (id, title, courseDesc)
-- VALUES ('401', 'Computer Algorithms', 'Introduction to design and analysis of algorithms'),
-- ('421', 'Natural Language Processing', 'Introduction to NLP'),
-- ('484', 'Secure Web Applications', 'Build secure web apps');


-- SELECT Registrations.id, students.studentName, courses.title
-- FROM Registrations
-- INNER JOIN students ON students.id=Registrations.studentId
-- INNER JOIN courses ON courses.id=Registrations.courseId

