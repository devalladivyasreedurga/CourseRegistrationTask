# Course Registration Task

This is a full-stack web application developed using the following technologies:

- React.js for the frontend
- Node.js with Express for the backend
- SQLite as the database

To run Frontend

cd frontend
npm i
npm start


Backend

cd ..
cd backend
npm i
**If the db doesn't exist as a file then run the below command
sqlite3 courseReg.db < schema.sql

node index.js



* If you login as admin using these details(name:dd,pw:"1234") you can see the existing student details, course details, registration details.

* If you login as student, you need to enter a name and id, if the record doesn't exist it will add into the database. Refer schema.sql.

Once you're in you can see the available courses and register. If you have already registered to that course it will prompt you the same.

Admin can see the registration details in the admin view.



*What more needs to be done*

1. Login validation for students
2. Edit and delete for registration details
3. DESIGN