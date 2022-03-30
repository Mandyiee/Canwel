


let check = 1;
let city = document.querySelector('#city')
let button = document.querySelector('.localButton');
let local = document.querySelector('.open')
let overall = document.querySelector('.overall')
button.onclick = function () {
  localStorage.setItem('city',city.value)
  this.parentElement.style.display = 'none';
  overall.style.opacity = 1;
  overall.style.pointerEvents ='all';
  location.reload()
}
document.querySelector('.names').addEventListener('click', function () {
 local.style.display = 'block';
  overall.style.opacity = 0.4;
  overall.style.pointerEvents ='none'
})
document.querySelector('.fa-window-close').addEventListener('click',function () {
  local.style.display = 'none';
  overall.style.opacity = 1;
  overall.style.pointerEvents ='all';
});
async function ye() {
if(localStorage.city){
  local.style.display = 'none';
} else {
  local.style.display = 'block';
  overall.style.opacity = 0.4;
  overall.style.pointerEvents ='none'
}

};
let nowWeather = document.querySelector('.nowWeathe')
let demoImg = document.querySelector('.demoImg')
let demoImgDes = document.querySelector('.demoImgDes')
let presentTemp = document.querySelector('.demoText1')
let presentFeel = document.querySelector('.demoText2')
let maxTemp = document.querySelector('.temp-maxText');
let minTemp = document.querySelector('.temp-minText');
let humidText = document.querySelector('.humidText');
let pressureText = document.querySelector('.pressureText')
let seaText = document.querySelector('.seaText')
let groundText = document.querySelector('.groundText')
let windSpeed = document.querySelector('.speedText')
let windDeg = document.querySelector('.degText')
class GetStat {
  async begin() {
    
 let result = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${localStorage.city}&appid=86a9be87dc74cd30aa8787255e46091c`,{
mode: 'cors',
credentials: 'include'
});
   
    let data = await result.data;
  
if (data.message !== 0 || data.message.length < 5) {
  local.style.display = 'block'
  overall.style.pointerEvents ='none'
} else {
    let array = [];
    for (var i = 0; i < 7; i++) {
      if (new Date(data.list[i].dt_txt).getDate() == new Date().getDate()) {
        array.push(data.list[i].dt_txt)
      }
    }
   
    for (var j = 0; j < (array.length + 1); j++) {
 demoImg.src = `
      http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
      demoImgDes.textContent = data.list[0].weather[0].description; 
      presentTemp.textContent = (Number(data.list[0].main.temp) - 273).toFixed(0) + "°c";
      presentFeel.textContent = 'feels like ' + (Number(data.list[0].main.feels_like) - 273).toFixed(0) + "°c"; 
      maxTemp.textContent = (Number(data.list[0].main.temp_max) - 273).toFixed(0) + "°c"; 
      minTemp.textContent = (Number(data.list[0].main.temp_min) - 273).toFixed(0) + "°c"; 
      pressureText.innerHTML = data.list[0].main.pressure + `<small>hpa</small>`;
      humidText.textContent = data.list[0].main.humidity + '%'; 
      seaText.innerHTML = data.list[0].main.sea_level + `<small>hpa</small>`; 
      groundText.innerHTML = data.list[0].main.grnd_level + `<small>hpa</small>`; 
      windDeg.textContent = data.list[0].wind.deg + "°"; 
      windSpeed.innerHTML = data.list[0].wind.speed + `<small>m/s</small>`;
      let j1 = Number(data.list[j].main.temp); j1 -= 273; j1 = j1.toFixed(0);
      let j2 = Number(data.list[j].main.feels_like);

      j2 -= 273;

      j2 = j2.toFixed(0);
      let tempsCon = document.createElement('div'); 
      tempsCon.classList.add('weathCon');
      //tempsCon.setAttribute('colspan',"3")
      nowWeather.appendChild(tempsCon); 
    let temps = document.createElement('div'); 
   temps.classList.add('slides'); temps.innerHTML = `<div> <p class='tempsText1'>${j1}°c</p><p class='tempsText2' > Will feel like ${j2}°c</p> </div>`; 
      tempsCon.appendChild(temps);
      let timeCon = document.createElement('p'); timeCon.classList.add('timeText');
      let time = new Date(data.list[j].dt_txt).getHours(); timeCon.textContent = time > 12 ? (time - 12) + 'pm' : time + "am"; temps.appendChild(timeCon);
    }
}
  }



}

function openBody(evt, bodyName) {
  let body, bodyTab, i;
  body = document.querySelectorAll('.body');
  let tabs = document.querySelectorAll('.tab-image');
  for (i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active')
  }
  bodyTab = document.querySelectorAll('.bodyTab');
  for (i = 0; i < body.length; i++) {
    body[i].style.display = 'none'
  }
  for (i = 0; i < bodyTab.length; i++) {
    bodyTab[i].classList.remove('active')
  }
  document.getElementById(bodyName).style.display = "block";
  evt.target.classList.add('active');
}

function radar(arrays, place1, place2, place3) {
  for (let k = 0; k < arrays.length; k++) {

    let col = document.createElement('td');
    col.style.verticalAlign = 'bottom'
    document.querySelector(place2).appendChild(col);
    let colDiv = document.createElement('div');
    colDiv.classList.add('weath');
    colDiv.style.height = 450 * ((array1[k].temp) / 100) + "px";
    colDiv.innerHTML = `<p class='bigp'> ${array1[k].temp}°c </p>
  <p class='smallp'> ${arrays[k].feelslike}°c </p>`;
    col.appendChild(colDiv);
    let colP = document.createElement('p')
    colP.classList.add('time')
    colP.innerHTML = `${arrays[k].wTime}`;
    col.appendChild(colP);
    document.querySelector(place1).innerHTML = `<td colspan="5" style='text-align:center;'> <img src='http://openweathermap.org/img/wn/${arrays[0].icons}@2x.png'/>  <p class="img-text">${arrays[0].iconDes}</p></td>
     <td colspan="3" style='text-align:center;'><p class='bigTemp'>${arrays[0].temp}°c</p>
   <p class='smallTemp'>feels like ${arrays[0].feelslike}°c</p>
   </td>`;
    let txt = arrays[0].dtTxt;
    let txt2 = txt.split(' ');
    document.querySelector(place3).innerHTML = `${txt2[0]}`;
  }
}
let array1 = [];
let array2 = [];
let array3 = [];
let array4 = [];
let array5 = [];

async function displayRadar() {
  let first = document.querySelector('.first');
  let result = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${localStorage.city}&appid=86a9be87dc74cd30aa8787255e46091c`);
  let data = await result.data;
  let datum = data.list;


  for (let u = 0; u < datum.length; u++) {
    if (new Date(datum[u].dt_txt).getDate() == ((new Date().getDate()) + 1)) {
      let temp = ((Number(datum[u].main.temp)) - 273).toFixed(0);
      let feelslike = ((Number(datum[u].main.feels_like)) - 273).toFixed(0);
      let icons = datum[u].weather[0].icon;
      let iconDes = datum[u].weather[0].description;
      let time = new Date(datum[u].dt_txt).getHours()
      let wTime = time > 12 ? (time - 12) + "pm" : time + "am";
      let dtTxt = datum[u].dt_txt;
      array1.push({ temp, feelslike, icons, iconDes, wTime, dtTxt })
    }

    if (new Date(datum[u].dt_txt).getDate() == ((new Date().getDate()) + 2)) {
      let temp = ((Number(datum[u].main.temp)) - 273).toFixed(0);
      let feelslike = ((Number(datum[u].main.feels_like)) - 273).toFixed(0);
      let icons = datum[u].weather[0].icon;
      let iconDes = datum[u].weather[0].description;
      let time = new Date(datum[u].dt_txt).getHours()
      let wTime = time > 12 ? (time - 12) + "pm" : time + "am";
      let dtTxt = datum[u].dt_txt;
      array2.push({ temp, feelslike, icons, iconDes, wTime, dtTxt })
    }

    if (new Date(datum[u].dt_txt).getDate() == ((new Date().getDate()) + 3)) {
      let temp = ((Number(datum[u].main.temp)) - 273).toFixed(0);
      let feelslike = ((Number(datum[u].main.feels_like)) - 273).toFixed(0);
      let icons = datum[u].weather[0].icon;
      let iconDes = datum[u].weather[0].description;
      let time = new Date(datum[u].dt_txt).getHours()
      let wTime = time > 12 ? (time - 12) + "pm" : time + "am";
      let dtTxt = datum[u].dt_txt;
      array3.push({ temp, feelslike, icons, iconDes, wTime, dtTxt })
    }

    if (new Date(datum[u].dt_txt).getDate() == ((new Date().getDate()) + 4)) {
      let temp = ((Number(datum[u].main.temp)) - 273).toFixed(0);
      let feelslike = ((Number(datum[u].main.feels_like)) - 273).toFixed(0);
      let icons = datum[u].weather[0].icon;
      let iconDes = datum[u].weather[0].description;
      let time = new Date(datum[u].dt_txt).getHours()
      let wTime = time > 12 ? (time - 12) + "pm" : time + "am";
      let dtTxt = datum[u].dt_txt;
      array4.push({ temp, feelslike, icons, iconDes, wTime, dtTxt })
    }

    if (new Date(datum[u].dt_txt).getDate() == ((new Date().getDate()) + 5)) {
      let temp = ((Number(datum[u].main.temp)) - 273).toFixed(0);
      let feelslike = ((Number(datum[u].main.feels_like)) - 273).toFixed(0);
      let icons = datum[u].weather[0].icon;
      let iconDes = datum[u].weather[0].description;
      let time = new Date(datum[u].dt_txt).getHours()
      let wTime = time > 12 ? (time - 12) + "pm" : time + "am";
      let dtTxt = datum[u].dt_txt;
      array5.push({ temp, feelslike, icons, iconDes, wTime, dtTxt })
    }
  }




  radar(array1, ".frc1", ".frc2", ".date1")
  radar(array2, ".frc21", ".frc22", ".date2")
  radar(array3, ".frc31", ".frc32", ".date3")
  radar(array4, ".frc41", ".frc42", ".date4")
  radar(array5, ".frc51", ".frc52", ".date5")
}

window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.names').textContent = localStorage.city;
  
  let getStat = new GetStat;
  ye().then(getStat.begin())
  displayRadar();
});
let arrayS = [];
let submit = document.querySelector('.searchSub');
let search = document.querySelector('#searchInput')
search.onsearch = searchIt;
submit.onclick = searchIt;
async function searchIt() {
  let result = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${search.value}&appid=86a9be87dc74cd30aa8787255e46091c`,{
mode: 'cors',
credentials: 'include'
});

  let data = await result.data;
 document.querySelector('.searchResult').style.visibility = "visible"
  if (data.message !== 0 || data.message.length < 5) {
  search.value = '';
 
    
  } else {
  arrayS.splice(0, arrayS.length);
  for (var i = 0; i < 7; i++) {
    if (new Date(data.list[i].dt_txt).getDate() == new Date().getDate()) {
      arrayS.push(data.list[i].dt_txt)

    }
  }
  let tS = document.querySelector('.secondCol');
  tS.innerHTML = '';

  for (var j = 0; j < (arrayS.length + 1); j++) {
    let j1 = Number(data.list[j].main.temp);
    j1 -= 273;
    j1 = j1.toFixed(0);
    let j2 = Number(data.list[j].main.feels_like);

    j2 -= 273;

    j2 = j2.toFixed(0);


    let tempsCon = document.createElement('div');

    tempsCon.classList.add('weathCon');
    tS.appendChild(tempsCon)
    let temps = document.createElement('div');
    temps.classList.add('slides');


    temps.innerHTML = `<p class='temps1'>${j1}°c</p>
  <p class='temps2' > Feels like${j2}°c</p>`;
    //temps.style.height = 270 * (j1 / 100) + "px"
    tempsCon.appendChild(temps);
    let timeCon = document.createElement('p');
    timeCon.classList.add('timeText')
    let time = new Date(data.list[j].dt_txt).getHours();
    timeCon.textContent = time > 12 ? (time - 12) + 'pm' : time + "am";
    temps.appendChild(timeCon);

    document.querySelector('.firstCol').innerHTML = `<div style="align-self: flex-end;"> <img src='http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png'/>  <p class='descr'>${data.list[0].weather[0].description}</p></div>
      <div>
<p class='searchTemp1'>${(Number(data.list[0].main.temp) - 273).toFixed(0) + "°c"} </p> <p class='searchTemp2'>feels like ${(Number(data.list[0].main.feels_like) - 273).toFixed(0) + "°c"} </p>
  </div> `;
    document.querySelector('.thirdCol').innerHTML = `<div class="temp-max">
   <p class='searchMax'>${(Number(data.list[0].main.temp_max) - 273).toFixed(0) + "°c"}</p>
    <p>Max Temperature</p></div>
 <div class="temp-min">
     <p class='searchMin'>${(Number(data.list[0].main.temp_min) - 273).toFixed(0) + "°c"}</p>
      <p>Min Temperature</p></div>`;
document.querySelector('.sixthCol').innerHTML=
    `<div class="ground-lev">     <p class='searchGround'>${data.list[0].main.grnd_level + `<small>hpa</small>`}</p>
              <p>ground Level</p></div>
  <div class="sea-lev" >
     <p class='searchSea'>${data.list[0].main.sea_level + `<small>hpa</small>`}</p>
              <p>sea level</p>
  </div>`;
    document.querySelector('.fourthCol').innerHTML = `<div> <p class='searchHumid'>${data.list[0].main.humidity + '%'} </p> <p> Humidity </p></div>`;
    document.querySelector('.fifthCol').innerHTML = ` <div>  <p class='searchPressure'>${data.list[0].main.pressure + `<small>hpa</small>`}</p>
            <p>pressure</p></div>`;
    document.querySelector('.seventhCol').innerHTML = `<div class="wind"> <p class='searchDeg'> ${data.list[0].wind.deg + "°"}</p>
            <p>wind Degree</p></div>
    <div class="windSpeed" ><p class='searchSpeed'>${data.list[0].wind.speed + `<small>m/s</small>`}</p>
            <p> Wind speed</p></div>`;



}
  }

}