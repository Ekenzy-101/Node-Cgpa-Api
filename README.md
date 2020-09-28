## INTRODUCTION

This project is the backend of a CGPA app, where users can create account to store their results and have it calculated.
It uses only a 5.00 scale to calculate SGPA and CGPA.

## TECHNOLOGY STACK

- Node
- Express
- MongoDB

## SETUP

- Open up your terminal
- Clone this repo by typing `git clone <repo url>`
- Go to the directory of repo by typing `cd <name of folder>`
- Type `npm install` to install all dependencies
- [To run this project, you need to install the latest version of MongoDB Community Edition first.](https://docs.mongodb.com/manual/installation/)
- Once you install MongoDB, make sure it's running.
- Set these environment variables - MONGODB_URL and SECRET_KEY
  On Mac:
  `export MONGODB_URL=<Your MongoDB Connection String>`
  `export SECRET_KEY=<Your Secret Key>`

  On Windows:
  `set MONGODB_URL=<Your MongoDB Connection String>`
  `set SECRET_KEY=<Your Secret Key>`

- Run `npm start` to start the server
