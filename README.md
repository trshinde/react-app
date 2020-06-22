                                MERN stack implementation of Movie type application
                                
 Steps to execute the application
 
 ---> git clone https://github.com/trshinde/react-app.git into your local directory within any folder.
 ---> cd react-app
 ---> Go to client (cd client) and install npm because node_modules folder is not pushed into repo   == npm install
 ---> Go to server (cd server) and install npm because node_modules folder is not pushed into repo   == npm install
 ---> cd ..  ==  revert back to react-app directory and then run:  npm run dev
 ---> https://localhost:3000 will browse the application.
 
 MongoDB is used database for this application and Robo-3T Database was used to locally store fields of the schema.
 
 
 Functionalities and Component details
 --> Landing Page with Register and Login authentication,
 ---> Only Logged in user can enter the application,
 ---> Grid format styling of images of popular movie retrieved from GET popular HTTP rest endpoint,
 ---> Each image of movie clickable to route to another page, 
 with some key features like: Toggle button to display the actors of the respective movie,
 
 2 main Database Schema used in this application: 
 ---> UserSchema for login authentication,
 ---> FavoriteSchema for adding favorite movie to the schema.
 
 
