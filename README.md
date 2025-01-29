# PERN Task Management App

This project is a task management application developed using PostgreSQL, Express, React, and Node.js (PERN). Users can add, edit, delete, and view task details. Additionally, users can filter tasks by completion status and sort tasks by date or name.

## Features

- **User Registration and Login**: Users can register and log in.
- **Add Task**: Users can add new tasks.
- **Edit Task**: Users can edit existing tasks.
- **Delete Task**: Users can delete tasks.
- **Task Details**: Users can view task details.
- **Task Filtering**: Users can filter tasks by completion status.
- **Task Sorting**: Users can sort tasks by date or name.
- **Profile Update**: Users can update their profile information.
- **Responsive Design**: The application is made responsive using Bootstrap.

## Installation

### Backend

1. Navigate to the project directory:

    ```bash
    cd /path/to/pern-app/backend
    ```

2. Install the required packages:

    ```bash
    npm install
    ```

3. Start the PostgreSQL database and create the necessary tables:

    ```bash
    createdb task_management
    ```

4. Create the database configuration file:

    ```bash
    touch config/db.js
    ```

    Add the following content to `config/db.js`:

    ```javascript
    const { Sequelize } = require('sequelize');

    const sequelize = new Sequelize('task_management', 'username', 'password', {
      host: 'localhost',
      dialect: 'postgres',
    });

    module.exports = { sequelize };
    ```

5. Start the server:

    ```bash
    npm start
    ```

### Frontend

1. Navigate to the project directory:

    ```bash
    cd /path/to/pern-app/frontend
    ```

2. Install the required packages:

    ```bash
    npm install
    ```

3. Start the application:

    ```bash
    npm start
    ```

## Usage

1. Open your browser and go to `http://localhost:3000`.
2. Register or log in.
3. Add, edit, delete, and view task details.
4. Filter tasks by completion status and sort tasks by date or name.

## Possible Enhancements

- **Task Prioritization**: Add priority levels for tasks.
- **Task Tagging**: Add tags for tasks and filter by tags.
- **Task Search**: Implement search functionality for tasks.
- **Notifications**: Send notifications when tasks are nearing their due date.
- **Dark Mode**: Add a dark mode option for users.
- **Multi-language Support**: Add support for multiple languages.

## Contributing

If you would like to contribute, please submit a pull request or open an issue.
