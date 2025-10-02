# The Lizard Wizard's Shop
The Lizard Wizard’ Shop is a fun e-commerce website I have designed for a final project. It is a simple but a functional e-commerce website that has an fun, interactive frontend and simple backend that every e-commerce website has. But the other websites won't be able to provide you with wizard gadgets and trinkets like The Lizard Wizard’s Shop does. 

## Stack
 The frontend(client) side it uses React 18 and react-router-dom. For the backend(server) side I used Node js with Express.js, MongoDB and Mongoose for cloud database and management, RESTful API for communication between front-end and back-end.

## Requirements
Node.js 18 LTS,
npm,
MongoDB Atlas SRV URI.

## Cloning

    git clone https://github.com/incizen/LizardWizardWeb.git
    cd LizardWizardWeb


## To run 
Open two terminals, one for client and one for server side. For the backend(server):
   
    cd server
    npm install
    cp .env.example .env
    
Edit .env and set a valid Atlas SRV before typing the next command: 
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/DB?retryWrites=true&w=majority
    
    node index.js
   
And for the client(frontend), 
    
    cd client
    npm install 
    npm start
   
You should be able to see the website on localhost:3000.

## Notes
If PASSWORD has special characters, URL-encode it and use npm ci if lockfiles are committed.

