function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "fb556dd40b9fad7e6dce430c3eaf695e"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  // Clear previous output
  const weatherDiv = document.getElementById("weather");
  weatherDiv.replaceChildren();

  fetch(url)
    .then(response => {
      if(!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const name = data.name;
      const temp = data.main.temp;
      const condition = data.weather[0].description;

      // Secure DOM creation
      const cityName = document.createElement("h2");
      cityName.textContent = name;

      const temperature = document.createElement("p");
      temperature.textContent = `Temperature: ${temp}@C`;

      const weatherCondition = document.createElement("p");
      weatherCondition.textContent = ` Condition: ${condition}`;

      // Append to weather container
      weatherDiv.appendChild(cityName);
      weatherDiv.appendChild(temperature);
      weatherDiv.appendChild(weatherCondition);
    })
    .catch(error => {
      const errorMsg = document.createElement("p");
      errorMsg.textContent = error.message;
      weatherDiv.appendChild(errorMsg);
    });
}
// function makeHttpRequest(method, url, callback) {
//   const xhr = new XMLHttpRequest()
//   xhr.responseType = 'json'
//   xhr.addEventListener('load', () => {
//     callback(xhr.response)
//   })

//   xhr.open(method, url)
//   xhr.send()
// }

// makeHttpRequest('GET', 'https://dummyjson.com/users', (usersData) => {
//   makeHttpRequest('GET', `https://dummyjson.com/posts/user/${usersData.users[0].id}`, (postsData) => {
//     makeHttpRequest('GET', `https://dummyjson.com/comments/post/${postsData.posts[0].id}`, (commentsData) => {
//       makeHttpRequest('GET', `https://dummyjson.com/users/${commentsData.comments[0].user.id}`, (userData) => {
//         console.log(userData);
//       });
//     });
//   });
// })