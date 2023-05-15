var map = L.map('map').setView([51.40, 21.15], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([51.40156597815345, 21.15428701976127]).addTo(map);
marker.bindPopup("test");