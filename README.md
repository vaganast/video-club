# Project Title:

Video Club
Where users can view the available movies, rent and return a movie and view their rentals.
Admin users should, also, be able to add a new movie to the store, and view all users’ rentals.

## How to Install and Run the Project

Download or clone the repository
cd video-club
npm install
npm run dev
the app will run in local: http://localhost:3000/

## Project Description:

The app gets data from the API (http://3.235.214.44:8000/) , Documentation: http://3.235.214.44:8000/swagger/ .
● Login to the application.
with Credentials Admin or User ,
Unauthorized users cant view application pages.

as Admin
● View a list of all users’ rentals.
○ Pagination.
○ Sorting (per page).Clickable Sort by:User, Rental Date, Movie Title, Active
● Add a new movie to the store.
● View a bubble chart showing movies per publication date.
Every bubble represent a year. The bubble size depends on the number of movies published a particular year.
● View my profile.
● Logout from the application.

as User
● View a list of all movies.
Every movie is a clickable card on click appear a modal.
● View the details of a specific movie, is on modal.
● Rent a movie the button is on modal.
● Return a rented movie the button is on modal after the specific movie is rented.
● View a list of rentals displayed as a table. The table has
○ Pagination.
○ Sorting (per page). Sort by: Rental Date, Movie Title, Active Rental.
● View my profile.
● Users do not have administrative privileges and get redirected to the Movies Page when trying to access admin only pages.
● Logout from the application.

## Technologies Used

The app was create with React + Vite, Chart.js for the Chart and for styling Css.
Vite config for proxy server cause of CORS problems.
