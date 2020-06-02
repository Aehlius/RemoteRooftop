# Remote Rooftop Preliminary Test

This repository is a backend-focused exercise in designing and developing API endpoints based on User, Project, and Task data models. The backend is contained entirely within the server folder and is created using Node.js and Express, with Sequelize to fetch data from PostgreSQL database. ES6/ES7 standards are used, however ES5 is still supported via Babel.

## Getting Started

This project uses npm package manager and PostgreSQL database. Before you can interact with the API, install necessary dependencies and set up the environmental variables to work with your local database.

### Prerequisites

After you have downloaded the repository, enter the backend directory by running
```
cd server
```
Here you can use npm package manager to install necessary dependencies by running
```
npm install
```

If you have experience setting up PostgreSQL database, feel free to skip the following steps and simply follow instructions within [**Installing**](#Installing) section instead.

In order to install PostgreSQL, navigate your browser to its [official website](https://www.postgresql.org/) and click on the Download button. Select the appropriate operating system and proceed with the installation. Remember the password used - you'll need it later to access the database. Keep the DB port as default 5432.

Install a GUI of your choice for easier database management - I used pgAdmin. Add a new server to be used for development and another one for testing. Remember the names of these databases - they will be required in the next step.



### Installing

Navigate to the following directory

```
server/api/src/config
```
and open file
```
config.js
```
Locate the development configuration 
```
  development: {
    database: '',
    username: 'postgres',
    password: '',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
```
and populate the environmental variables with your local machine's information (default user is postgres and default localhost is 127.0.0.1)



Now, run the migration script running the following command within the server folder
```
sequelize db:migrate
```
Sequelize will use the data model blueprint stored at src/migrations in order to create User, Project, and Task tables within the database specified in the config.js file.

Now, you can run the backend in the development environment by executing the following command
```
npm run dev
```
By default, the server will run on PORT 8000. However, a .env file can be created within the server folder with the following code
```
PORT=****
```
where **** represents the port number you would like to run development on.

If the development environment has started successfully, the following information will be outputted in the console:
```
this is the environment:  development
Server is running on PORT ****
```

You may now work with the database using an API client of your choice - I used Postman

The following is a list of commands you may use at the moment:

**POST**

Adds an entry into the database

\
**/api/users/** - adds a user to the database. The user information is sent within the *Body* of the request, in the following format:
```
{
    "email": "name@mail.com",
    "name": "John",
    "surname": "Doe"
}
```
All fields are required. Otherwise, the backend returns an error with the message "Please provide complete details" to validate user input.

\
**/api/tasks/** - adds a task to the database. The task information is sent within the *Body* of the requeset, in the following format:
```
{
    "name": "name of task",
    "description": "extended description of the task",
    "score": 1,             // numeric value representing the task's score
    "status": "active",     // current status of the task, could be [active, inactive, declined, complete]
    "assigner": 1,          // numeric value of the assigner User's id
    "assignee": 2,          // numeric value of the assignee User's id
    "project": 1            // numeric value of the project id associated with the task
}
```
All fields except assignee are required. Otherwise, the backend returns an error with the message "Please provide complete details" to validate user input.

\
**api/projects/** - adds a project to the database. The project information is sent within the *Body* of the request, in the following format:
```
{
	"name": "name of project",
	"body": "extended description of the project",
	"status": "active",
	"assigner": 1,
	"assignee": 2
}
```
All fields except assignee are required. Otherwise, the backend returns an error with the message "Please provide complete details" to validate user input.

\
**GET**

receives an entry/entries from the database

\
**/api/users/** - returns a list of users in the following format:
```
{
    "status": "success",
    "message": "Users retrieved",
    "data": [
        {
            "id": 1,
            "email": "name@mail.com",
            "name": "John",
            "surname": "Doe",
            "createdAt": "2020-06-01T07:18:28.162Z",
            "updatedAt": "2020-06-01T07:18:28.162Z"
        },
        ...
    ]
}
```
If no querying is specified, returns a list of all users in the database. Filtering based on *name* and *surname* properties could be specified by adding parameters to the request, either using Postman's Params tab or manually by appending the following to the end of the GET request:
```
?name=John&surname=Doe
```
Parameters are appended after a question mark without quotation marks and separated by an ampersand.

If no user with the provided parameters can be found, the API returns:
```
{
    "status": "success",
    "message": "No User found"
}
```


**/api/users/:id** - returns a user with an id attribute equal to the :id in the following format:
```
{
    "status": "success",
    "message": "Found User",
    "data": {
        "id": 1,
        "email": "name@mail.com",
        "name": "John",
        "surname": "Doe",
        "createdAt": "2020-06-01T07:18:28.162Z",
        "updatedAt": "2020-06-01T07:18:28.162Z"
    }
}
```
If no user with the id provided can be found, the API returns:
```
{
    "status": "error",
    "message": "Cannot find User with the id :id"
}
```

\
**/api/tasks/** - returns a list of tasks in the following format:
```
{
    "status": "success",
    "message": "Tasks retrieved",
    "data": [
        {
            "id": 1,
            "name": "task1",
            "description": "this is the first task, active, score value of 1, with assignee id of 2",
            "score": 1,
            "status": "active",
            "assigner": 1,
            "assignee": 2,
            "project": 1,
            "createdAt": "2020-06-02T05:46:01.269Z",
            "updatedAt": "2020-06-02T05:46:01.269Z"
        },
        {
            "id": 2,
            "name": "task2",
            "description": "this is the second task, inactive, score value of 5, no assignee",
            "score": 5,
            "status": "inactive",
            "assigner": 3,
            "project": 2,
            "createdAt": "2020-06-02T09:50:04.061Z",
            "updatedAt": "2020-06-02T09:50:04.061Z"
        },
        ...
    ]
}
```
If no querying is specified, returns a list of all tasks in the database. 

Filtering based on *name* and *description* properties could be specified by adding parameters to the request, either using Postman's Params tab or manually by appending the following to the end of the GET request:
```
?name=task1&description=this is the first task...
```
These queries will return tasks that match completely with provided parameters. 

Filtering based on assigner, assignee, or status can be done using an array query. For example, if you want tasks whose assigner has an id of either *1* or *2*, you could add both as a value to assigner parameter, separated by a comma, as such:
```
?assigner=1,2
``` 
And the returned tasks will have an assigner of either 1 or 2. For status, the same comma-separated list is used - except the values must be [active, inactive, declined, completed]

Filtering based on score returns tasks whose score is equal to or greater than the provided numeric value. For example,
```
?score=2
```
returns all tasks whose score is equal or greater than 2.

Parameters are appended after a question mark without quotation marks and separated by an ampersand.

If no task with the provided parameters can be found, the API returns:
```
{
    "status": "success",
    "message": "No Task found"
}
```


**/api/tasks/:id** - returns a task with an id attribute equal to the :id in the following format:
```
{
    "status": "success",
    "message": "Found Task",
    "data": {
        "id": 1,
        "name": "task1",
        "description": "this is the first task",
        "score": 1,
        "status": "active",
        "assigner": 1,
        "assignee": 2,
        "project": 1,
        "createdAt": "2020-06-02T05:46:01.269Z",
        "updatedAt": "2020-06-02T05:46:01.269Z"
    }
}
```

if no task with the provided id can be found, the API returns:
```
{
    "status": "error",
    "message": "Cannot find Task with the id :id"
}
``` 

\
**api/projects/** - returns a list of projects in the following format:
```
{
    "status": "success",
    "message": "Projects retrieved",
    "data": [
        {
            "id": 1,
            "name": "Project1",
            "body": "this is the first project, active, assignee with id 2",
            "status": "active",
            "assigner": 1,
            "assignee": 2,
            "createdAt": "2020-06-02T11:29:30.393Z",
            "updatedAt": "2020-06-02T11:29:30.393Z"
        },
        {
            "id": 2,
            "name": "Project2",
            "body": "this is the second project, inactive, no assignee",
            "status": "inactive",
            "assigner": 3,
            "createdAt": "2020-06-02T09:50:04.061Z",
            "updatedAt": "2020-06-02T09:50:04.061Z"
        },
        ...
    ]
}
```
If no querying is specified, returns a list of all projects in the database. 

Filtering based on *name* and *body* properties could be specified by adding parameters to the request, either using Postman's Params tab or manually by appending the following to the end of the GET request:
```
?name=project1&description=this is the first project...
```
These queries will return projects that match completely with provided parameters. 

Filtering based on assigner, assignee, or status can be done using an array query. For example, if you want projects whose assigner has an id of either *1* or *2*, you could add both as a value to assigner parameter, separated by a comma, as such:
```
?assigner=1,2
``` 
And the returned project will have an assigner of either 1 or 2. For status, the same comma-separated list is used - except the values must be [active, inactive, declined, completed]

Parameters are appended after a question mark without quotation marks and separated by an ampersand.

If no project with the provided parameters can be found, the API returns:
```
{
    "status": "success",
    "message": "No Project found"
}
```

**/api/project/:id** - returns a project with an id attribute equal to the :id in the following format:
```
{
    "status": "success",
    "message": "Found Project",
    "data": {
        "id": 1,
        "name": "Project1",
        "body": "this is the first project, active, assignee with id 2",
        "status": "active",
        "assigner": 1,
        "assignee": 2,
        "createdAt": "2020-06-02T11:29:30.393Z",
        "updatedAt": "2020-06-02T11:29:30.393Z"
    }
}
```

if no project with the provided id can be found, the API returns:
```
{
    "status": "error",
    "message": "Cannot find Project with the id :id"
}
``` 

\
**PUT**

Update an entry in the database

**/api/users/:id** - updates a user with the id of :id, replacing values in the database with any values provided in the *Body* of the request. Cannot update a non-existing user

**/api/tasks/:id** - updates a task with the id of :id, replacing values in the database with any values provided in the *Body* of the request. Cannot update a non-existing task

**/api/projects/:id** - updates a project with the id of :id, replacing values in the database with any values provided in the *Body* of the request. Cannot update a non-existing project

\
**DELETE**

Deletes an entry in the database

**/api/users/:id** - deletes a user with the id of :id

**/api/tasks/:id** - deletes a task with the id of :id

**/api/projects/:id** - deletes a project with the id of :id

## Running the tests

This project uses Mocha testing framework and chai&nyc assertion libraries to test endpoints. The test file test.js is located at
```
/server/api/test/
```
Ensure that the test database is set up properly within config.js, as this database will be deleted and rewritten every time the test code is executed.


### Endpoint tests

The test script is located within package.json and can be executed from the server folder by running
```
npm run test
```
Currently, the tests only support Mac OS X platform, as I do not have access to a Windows machine to test out the tests (oh the irony). 


## Deployment

To create a hostable build of this project, run the following command within server directory
```
npm run build
```
This will create a build folder within the server directory which can then be continuously integrated using Travis CI.

## Future Improvements

* Allow tasks and projects to be filtered by user names and surnames. Currently, the filtering only supports user id.
* Provide average score of completed tasks when returning projects. Allow projects to be filtered by score. Currently, the returned JSON only contains the projects.
* Write extended tests to apply to tasks and projects

## Built With

* [Node.js](https://nodejs.org/) - Javascript runtime
* [Express](https://expressjs.com/) - Web application framework
* [PostgreSQL](https://www.postgresql.org/) - Database
* [Sequelize](https://sequelize.org/) - Open-Relation Mapping for Postgres
* [Babel](https://babeljs.io/) - compiler for backward compatibility
* [Mocha](https://mochajs.org/) - testing framework

## Authors

* **Iskender Akhmedov** - [Aehlius](https://github.com/Aehlius)

The assessment was created by the Remote Rooftop recruitment team, though no code of theirs was used.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Sequelize Documentation
* Remote Rooftop development team - especially Luca Veneziano 
