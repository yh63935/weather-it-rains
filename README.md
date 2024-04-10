# weather-app
## This is a weather app that displays the current day weather, along with the next 3 days and hourly weather of a location (also changes background images depending on weather conditions).


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#motivation">Motivation</a></li>
        <li><a href="#reflection">Reflection</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

### Description
This is a weather app that shows the next 3 day forecast of the location you search, and the hourly forecast for each day (for the current day it shows the next hour to 11PM). It also changes background image depending on what the weather conditions (ie sunny) are. It's also responsive, so feel free to view the site on your other mobile devices/tablets.

[See live website hosted on Github Pages](https://yh63935.github.io/weather-app/) 

### Motivation
As a next step in my coding journey, I learned about APIs, promises, async, and await. As someone who frequently checks the weather before going out or making plans, it seemed like a natural step to create this app. One of my favorite aspects of the app's functionality is being able to display hourly weather forecast for future days, and not just the current day. I often want to see the hourly forecast for upcoming days, not just today, so having hourly forecasts for the different forecasted days would let me know if I should pack a warmer jacket if I am staying out late the next day or later in the week when I have plans. 

Although I know creating a weather app is fairly typical of coders to make, what sets this apart, is that this weather app **IS NOT based on a tutorial**. I spent a lot of time thinking about how to approach pulling data from the API, organizing it, and of course the best way to structure and organize the code.  


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Reflection
Wow, there were so many difficult parts about building this project. It's definitely been the longest and most difficult project that I have made so far with around 400 commits. And I ran into bugs every few seconds it seems, but ...I persevered.

#### User Interface
Before beginning to code, I had to think about what information that I felt was important and relevant enough to display on the user-interface. I ended up designing the weather app to show the current day weather (because that is what most people will want to see first and is most relevant), a 3 day forecast (only 3 days, because after the free trial, you can only see a 3 day forecast), and hourly forecasts. At first, I thought that I would just display hourly forecast of the current day as that is what most weather apps do, but decided that it would be helpful to show hourly forecasts of every day in the 3 day forecast. Additionally, I added the functionality of being able to toggle from day and hourly forecasts using buttons. The hourly forecasts were in 8 hour intervals which made sense to me as a time frame that would be perfect length (also a workday). I also had to consider which hours to show in the hourly forecast, specifically for the current day. For example, the current day starts from the next hour from the current hour and not 12AM. This is because for the user, since the past hours have already passed and they are already living the current hour, they most likely wouldn't need to know the past/current hour temperatures. I also ended the hour intervals at 11PM for each day forecast, because even though the hours rolling over to the next day (ie today's forecast displaying up to 11PM, then 12AM etc of the next day) may be convenient, it is also a little confusing and misleading if pressing the hourly forecast button on the current day card included part of the next day's forecast. 

#### Maintainability, Reusability, and Readability 

##### DOM Elements/HTML Strucutre
Another part of this project I had never considered deeply iswhat the HTML structure should be like (I revised it several times during the coding process), what elements should be in the DOM structure directly, and what elements should be rendered by Javascript. When coding, I thought about when to query elements directly from the DOM versus passing it in as a parameter. I ended up only querying elements directly from index.html in the index.js file, and when those elements were needed in other files, passing them in as a parameter instead. That's why in components.js the only query selector statements will be querying from the element that the function created (the card itself). This separation of concerns helped modularity, encapsulation, maintainability, and reusability. If I wanted those cards or elements within the card to be appended elsewhere, all I would have to do is pass in a different container for the parameter, without changing multiple DOM querySelector calls. It also separated what was already on the DOM originally, versus what was created by Javascript. 

##### Comments, Files, and 


#### API Encryption
As you must have noticed by now, my API key in the code in my repository is not encrypted. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* HTML
* SCSS
* Javascript
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Quick start:

1. Clone this github repository on your local machine with HTTPS:// or SSH (SSH is provided below, use HTTPS if preferred)

   Note: You will need to keep the index.html file from the dist/ folder. This is currently not generated by Webpack and was manually made instead. 

   ```$ git clone git@github.com:yh63935/cafe-page-webpack.git```

3. Install all necessary dependencies

   ```$ npm install```

4. Build dist/ files on your local machine

   ```$ npm start```

5. Open up index.html on your local to view your own copy

6. Alternatively go to [https://yh63935.github.io/cafe-page-webpack/](https://yh63935.github.io/cafe-page-webpack/) to see a live demo hosted on Github Pages.

<!-- CONTACT -->
## Contact

Amelia Ho - [Amelia Ho Linkedin](https://www.linkedin.com/in/ameliahoyp/)

Project Link: [https://github.com/yh63935/cafe-page-webpack](https://github.com/yh63935/cafe-page-webpack))

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
Image credits: 
* Snow - https://wall.alphacoders.com/big.php?i=1083131
* Rain - https://imgur.com/a/szRXwIE
* Thunder - https://rare-gallery.com/981429-light-fairytail-artwork-sky-lightning-clouds-nature-.html
* Cloudy - https://wallpapers.com/wallpapers/light-blue-laptop-70mtcno1nv1yilu4.html
* Foggy - https://openart.ai/discovery/sd-1007496795762470962
* Sunny - https://www.pixground.com/peaceful-field-landscape-ai-generated-4k-wallpaper/

<p align="right">(<a href="#readme-top">back to top</a>)</p>



