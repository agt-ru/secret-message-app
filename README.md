# Secret message app
An app for sharing secret messages between registered users via link and password.<br>
Live version: https://agt-ru-secret-message-app.herokuapp.com/

## Stack:
- Frontend: React / Redux / Bootstrap
- Backend: Node.js / Express / MongoDB: users and messages + encrypted fields

## Usage:

Home screen:
![screenshot](https://github.com/agt-ru/secret-message-app/blob/main/images/1.png)<br>
First, click on Register and sign up a new user:
![screenshot](https://github.com/agt-ru/secret-message-app/blob/main/images/2.png)<br>
Then, log out:
![screenshot](https://github.com/agt-ru/secret-message-app/blob/main/images/3.png)<br>
Register a second user:
![screenshot](https://github.com/agt-ru/secret-message-app/blob/main/images/4.png)<br>
You will be redirected to Create Secret Message screen.<br>
Write a secret message, choose a password and a user to send the secret message to, then click on Submit:
![screenshot](https://github.com/agt-ru/secret-message-app/blob/main/images/5.png)<br>
You will be redirected to your profile screen with a list of secret message links sent to or created by you.<br>
You can also edit your user here:
![screenshot](https://github.com/agt-ru/secret-message-app/blob/main/images/6.png)<br>
Log out and then sign up as the first user:
![screenshot](https://github.com/agt-ru/secret-message-app/blob/main/images/7.png)<br>
Go to your profile:
![screenshot](https://github.com/agt-ru/secret-message-app/blob/main/images/8.png)<br>
You can see a secret message link from the second user.<br>
Mind that links are sorted by date ascending.<br>
Click on a new secret message url:
![screenshot](https://github.com/agt-ru/secret-message-app/blob/main/images/9.png)<br>
To view the secret message, you must enter the password provided by the second user elsewhere:
![screenshot](https://github.com/agt-ru/secret-message-app/blob/main/images/10.png)<br>
You can copy or delete a secret message upon accessing it.<br>
Deleted message will be removed for both users.

## .env

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = abc123
SOME_32BYTE_BASE64_STRING = SOME_32BYTE_BASE64_STRING
SOME_64BYTE_BASE64_STRING = SOME_64BYTE_BASE64_STRING
```

## Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

## Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```
