# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## `Running the App`


## 1. Clone the Repository: 
Begin by cloning the repository containing the app's source code to your local machine using the following command:

```js 
git clone <repository-url>
```
## 2. Navigate to Project Directory: 
Change your working directory to the root folder of the cloned repository: 

```js
cd <repository-folder>
```
## 3. Install Dependencies: 
Install the required dependencies for the app. This can be done using a package manager like npm or yarn: 
```js
npm install
```
## 4. Start the App: 
After the dependencies are installed, you can start the app using the following command: 
```js
npm start
```
This will start the development server and open the app in your default web browser. If it doesn't open automatically, you can access it by navigating to http://localhost:3000 in your browser.


## Available Scripts



In the project directory, you can run: 
 
### `npm start`
 
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`


Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## `API Endpoint Used`

The app uses three API endpoints to fetch COVID-19 related data: one for global COVID-19 statistics and another for country-specific data.

Global COVID-19 Data:

Endpoint: https://disease.sh/v3/covid-19/all
Purpose: This endpoint provides global COVID-19 statistics, including the total number of cases, deaths, and recoveries worldwide.
Usage: The DataDisplay component fetches data from this endpoint to display global COVID-19 statistics.


Country-specific COVID-19 Data:

Endpoint: https://disease.sh/v3/covid-19/countries
Purpose: This endpoint provides COVID-19 data for individual countries, including the number of active cases, recoveries, and deaths. The data is provided in an array format with details for each country.
Usage: The CovidMap component fetches data from this endpoint to display country-specific data on the map.

Historical COVID-19 Data:

Endpoint: https://disease.sh/v3/covid-19/historical/all?lastdays=all
Purpose: This endpoint is used to retrieve historical COVID-19 data on a global scale. It provides historical data for the total number of cases, deaths, and recoveries over a period of time.
Usage: The BarChart component in your application fetches data from this endpoint to create a bar chart visualization of the historical COVID-19 data. The data obtained includes the cumulative number of cases, deaths, and recoveries for each day, allowing you to visualize the progression of the pandemic over time.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

