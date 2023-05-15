let map;
const detailsIpAdress = document.querySelector('.details-ip-adress p+p');
const detailsLocation = document.querySelector('.details-location p+p');
const detailsTimezone = document.querySelector('.details-timezone p+p');
const detailsIsp = document.querySelector('.details-isp p+p');
const inputIpAdress = document.querySelector('.input-ip-adress');

function showOnMap(lat, lng) {
  x = lat;
  if (map != undefined) {
    map.remove();
  }
  map = L.map('map').setView([lat, lng], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  // var marker = L.marker([51.40156597815345, 21.15428701976127]).addTo(map);
  // marker.bindPopup("test");
}

const fillInformationSection = (data) => {
  detailsIpAdress.textContent = data.ip;
  detailsLocation.textContent = `${data.location.country}, ${data.location.city}`;
  detailsTimezone.textContent = data.location.timezone;
  detailsIsp.textContent = data.isp;
}

const searchForLocalisation = (ipAdress, origin) => {
  let properIp;
  if (origin === 'btn') {
    properIp = ipAdress.target.parentNode.parentNode.querySelector('.input-ip-adress').value;
  } else if (origin === 'initial') {
    properIp = ipAdress;
  }
  fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_4xOVF9kNuGtwtHoYbP8BxseB81sXZ&ipAddress=${properIp}`)
    .then(resp => resp.json())
    .then(data => {
      // console.log(data)
      showOnMap(data.location.lat, data.location.lng);
      fillInformationSection(data);
    })
}

async function getIpAdress() {
  try {
    const apiCall = await fetch('https://api.ipify.org?format=json')
    const resp = await apiCall.json();
    return resp;
  } catch (err) {
    console.error(err);
  }
}
async function showUserIp() {
  const ipResp = await getIpAdress();
  inputIpAdress.value = ipResp.ip;
  searchForLocalisation(ipResp.ip, 'initial')
}
showUserIp();
const a = inputIpAdress.value;
const btn = document.querySelector('.button-ip-adress');
btn.addEventListener('click', (e) => searchForLocalisation(e, 'btn'));