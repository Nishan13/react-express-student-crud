# Express API ES6 Starter - Student CRUD

Student CRUD APIs with [Express.js](http://expressjs.com/).
UI components with [React.js](https://facebook.github.io/react/).

## Installation

Clone the repository, install the dependencies and get started right away.

    $ npm install

Update your application details and database credentials in `.env`. Now, run the migrations and seed the database.

    $ npm run migrate:latest
    $ npm run seed

Finally, start the application.

    $ npm run start:dev (For development)
    $ npm start (For production)

Navigate to `/api-docs` for the API documentation.

## Using MySQL instead of PostgreSQL

Install the [mysql](https://www.npmjs.com/package/mysql) driver first and update this line: `DB_CLIENT='pg'` in your .env file to: `DB_CLIENT='mysql'`. You can remove the [pg](https://www.npmjs.com/package/pg) driver if you like to.

    $ npm install mysql --save
    $ npm uninstall pg --save

That's it, you are ready to roll.

## License

express-api-es6-starter is under [MIT License](http://www.opensource.org/licenses/MIT).
