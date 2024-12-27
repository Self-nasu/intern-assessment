# Learn and Build Intern Assessment CRUD Application

This is my assessment project repository in which I created a MERN stack web application. The app includes a login/signup form and two pages: 

1. **Login/Signup Page**: Where users can log in or sign up.
2. **Home Page**: Where users can update, view, or delete their profiles. Below the user’s profile, the details of all other users are listed as asked in assesment.

## To Run This Project

### 1. Download the repository and extract it. Then, navigate to the project folder.

#### Running the Frontend:
1. `npm install`
2. `npm run dev`

#### Running the Backend:
1. Navigate to the `backend` folder inside the project folder.
2. Open the terminal in that path.
3. `npm install`
4. `node server.js`

**Note**: You will need to set up the environment variables. The `.env` file should contain:
- A **JWT key** for password encoding
- A **MongoDB connection string**

## Design

For the website's base design, I used **Figma** (image below).

![Login Page](ReadmeFiles/Login%20Page.png)
![Home Page](ReadmeFiles/Main%20Home%20Page.png)

### Frontend Stack:
- **ReactJS**
- **Bootstrap 5**

### Backend Stack:
- **ExpressJS**
- **NodeJS**

### Database:
- **MongoDB** (Free Hosted on MongoDB Cluster)

### Final Website Image:

![Final Login](ReadmeFiles/Final%20Login.png)
![Final Home](ReadmeFiles/Final%20Home.png)
