# An app for sharing secret messages

## Live version: https://agt-ru-secret-message-app.herokuapp.com/

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
