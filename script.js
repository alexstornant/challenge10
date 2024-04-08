/**
 * https://api.spacexdata.com/v5/launches/latest
 * 28.5744° N, 80.6520° W
 * 2022-10-05
 * https://archive-api.open-meteo.com/v1/archive?latitude=28.5392&longitude=-80.672&start_date=2022-10-05&end_date=2022-10-05&hourly=temperature_2m
 */

fetch('https://api.spacexdata.com/v5/launches/latest')
    .then(response => response.json())
    .then(data => {
        displayLaunchInfo(data);
    })
    .catch(error => console.error(error));

fetch('https://archive-api.open-meteo.com/v1/archive?latitude=28.5392&longitude=-80.672&start_date=2022-10-05&end_date=2022-10-05&hourly=temperature_2m')
    .then(response => response.json())
    .then(data => {
        displayWeatherInfo(data);
    })
    .catch(error => console.error(error));

function displayLaunchInfo(data) {
    //
    // Launch Name
    //
    const name = document.getElementById('launch-name');
    var text = document.createTextNode(data.name);
    name.appendChild(text);

    //
    // Date
    //
    const dateStr = data.date_local;
    const date = new Date(dateStr);
    
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h12",
    }).format(date);
    
    const dateElement = document.getElementById('launch-date');
    var text = document.createTextNode(formattedDate);
    dateElement.appendChild(text);

    //
    // Launch wiki
    //
    const link = document.getElementById('launch-link');
    var a = document.createElement('a');
    a.href = data.links.wikipedia;
    a.textContent = 'wikipedia';
    a.target = '_blank';
    link.appendChild(a);

    // // Loop through the users and create HTML elements
    // users.forEach(user => {
    //     const li = document.createElement('li');
    //     li.textContent = `${user.name} (${user.email})`;
    //     userList.appendChild(li);
    // });
}

function displayWeatherInfo(data) {
    const times = data.hourly.time;
    const temps = data.hourly.temperature_2m;

    //
    for (let i = 0; i < times.length; i++) {
        const dateStr = times[i];
        const date = new Date(dateStr);

        const hour = date.getHours();
        const temp = temps[i];
        
        const hourDiv = document.getElementById('hour');
        var newHour = document.createElement('p');
        newHour.textContent = hour;
        hourDiv.appendChild(newHour);

        const tempDiv = document.getElementById('temp');
        var newTemp = document.createElement('p');
        newTemp.textContent = temp;
        tempDiv.appendChild(newTemp);
    }
    

}

