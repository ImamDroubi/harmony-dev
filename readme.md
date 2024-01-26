# Harmony
A website to upload sounds, combine them, and share them with others...
This repository is for developers who want to run the website on their machines to dive into the implementaion of each feature, edit if necessary and add thier own. 

#### Functionality
- Upload tracks from your own computer.
- Add them to the "Mixing Zone" to create combinations.
- Save the combinations and listen to them whenever you want.
- Share tracks or combinations with other user by publishing them.
- Visit other users profiles and explore their public tracks or combinations.
- Like public tracks or combinations. 
- Clone other users tracks to your account and edit or use the tracks to make your own combinations.
- Clone other users combinations and listen and access them easily. 
- Follow a user to appreciate his work. 

#### Techonolgies
- ReactJS (Vite) for the frontend.
- NodeJs(express) for the backend.
- MySQL for the database & Sequelize for an ORM.
- Firebase for cloud storage.
- React-Query (Tansteck Query) for API calls.
- JWT for authentication.

#### How To Use
As I said this is for developers to run in their own machines, so there are a few changes that you have to make after cloning the repository. 
##### 1) Clone the repository
To clone the repository into your machine, create an empty folder, open the commandline inside of it and run the command: 

git clone https://github.com/ImamDroubi/harmony-dev.git .

This will install the respository to your machine. 
##### 2) Install node modules
You have two folders: "Client" & "Server", "Client" has the forntend code and "Server" has the backend code, but in order for the code to work you have to install the dependencies for each one of them. 
Open the commandline in "Client" folder and run : npm i 
Then open the commandline in "Server" folder and run : npm i 
##### 3) Add .env file
The code uses some enviroment variables in multiple places, These variables usually contain sensitive information so they can't be uploaded to github, you have to create them your own. 
- In the server directory make a file and name it ".env".
- Add a variable called "JWT_SECRET_KEY".
- Assign a long random text to this variable, this will be used by JWT for authentication.

Example: JWT_SECRET_KEY = randomTextGoesHere.
Save the file and close it.
##### 4) Configure the database
As I said before the database I used is MySql, So you need to create the database using phpMyAdmin or any tool for visualizing MySql databses, and then add the configuration into the code. 

To change the database configeration, go to server/config 
you will find a config.json file...
In the "development" section you can change the username, password, and database name. 
The default username is "root", and password is null, so If you didn't change them in your database you don't need to change them in the configuration. 

For the ports, I personally run Apache and MySQL using Xampp on their default ports
Apache : 80, 443 
MySql : 3306 
So If you use Xampp it should be Ok.

##### 5) Create & Migrate the database
All the tables and relations of the database are inside the code, you don't need to worry about creating tables or relations, but you have to run two simple commands, one to create the databse, and the other to migrate the tables and create relations. 
Inside "Server" folder, open the commandline and run: 
- npx sequelize-cli db:create.
- npx sequelize-cli db:migrate.

Now the tables and relations are created in the database that you specified in the config.json file in the previous step.
##### 6) Configure the firebase cloud storage
As I said, I use firebase to store the tracks and images that users upload to the website. In order to to that, you need to: 
- Login to firebase using your google account.
- Create a project with the name you want.
- Go to project settings and copy the configurations for the project. 
The only thing you need to copy is the variable named "firebaseConfig" which is an object that contains : ("apiKey" , "authDomain", "projectId", "storageBuckets","messaginSenderId","appId")
- Go to The "Client" folder in the repository you cloned, then "src/storage/firebase.js" and paste the "firebaseConfig" variable that you copied in the file. (you will know where to paste it).

# We are done! 
Everything now is done, to run the app you need to run two instances of VSCode or the editor you are using, one for the frontend and ther other for the backend.

In one of the instances go to "Client" folder, open the commandline and run : npm run dev. 
In the other go to "Server" Folder, open the commandline and run : npm run dev.

You also have to make sure that you are running a local server for the databse, using Xamp for example each time you want to run the program,by starting the apache server and MySql server. 

# Creator
This whole project from the first scratch on Figma until the deployment stage was done by:
Imam Droubi 
A 4th year computer systems engineering student at Palestine Technical University Khodoorie. 
It took +120 Hours over several months to complete, and I gained a lot of experience through out the jorney. 
Email: imam.droubi@gmail.com
LinkedIn : https://www.linkedin.com/in/imamdroubi/


