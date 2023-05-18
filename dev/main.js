let map;
const detailsIpAddress = document.querySelector('.details-ip-adress p+p');
const detailsLocation = document.querySelector('.details-location p+p');
const detailsTimezone = document.querySelector('.details-timezone p+p');
const detailsIsp = document.querySelector('.details-isp p+p');
const inputIpAddress = document.querySelector('.input-ip-adress');

const myIcon = L.icon({
  iconUrl: 'images/icon-location.svg',
  iconSize: [38, 45],
  iconAnchor: [22, 45],
  popupAnchor: [-3, -76],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94]
});

function showOnMap(lat, lng) {
  if (map !== undefined) {
    map.remove();
  }
  map = L.map('map').setView([lat, lng], 16);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  let marker = L.marker(([lat, lng]), {
    icon: myIcon
  }).addTo(map);
}

const fillInformationSection = (data) => {
  const {
    ip,
    location,
    isp
  } = data;
  detailsIpAddress.textContent = ip;
  detailsLocation.textContent = `${location.country}, ${location.city}`;
  detailsTimezone.textContent = location.timezone;
  detailsIsp.textContent = isp;
}

const validateIPaddress = (ipAddress) => {
  try {
    new URL(`http://${ipAddress}`);
    return true;
  } catch (error) {
    alert("You have entered an invalid IP address!");
    return false;
  }
}

const searchForLocalisation = (ipAddress, origin) => {
  let properIp;
  if (origin === 'btn') {
    properIp = ipAddress.target.parentNode.parentNode.querySelector('.input-ip-adress').value;
  } else if (origin === 'initial') {
    properIp = ipAddress;
  }
  if (validateIPaddress(properIp)) {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_62iliDOtkBIE58EM1xsv2J0jlrE19&ipAddress=${properIp}`)
      .then(resp => resp.json())
      .then(data => {
        showOnMap(data.location.lat, data.location.lng);
        fillInformationSection(data);
      })
  }
}

async function getIpAddress() {
  try {
    const apiCall = await fetch('https://api.ipify.org?format=json')
    const resp = await apiCall.json();
    return resp;
  } catch (err) {
    console.error(err)
    alert('Failed to obtain IP address');
  }
}
async function showUserIp() {
  const ipResp = await getIpAddress();
  inputIpAddress.value = ipResp.ip;
  searchForLocalisation(ipResp.ip, 'initial')
}
showUserIp();
const btn = document.querySelector('.button-ip-adress');
btn.addEventListener('click', (e) => searchForLocalisation(e, 'btn'));