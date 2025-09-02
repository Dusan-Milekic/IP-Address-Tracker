async function FetchApi(ipAddress) {
  const url =
    "https://geo.ipify.org/api/v2/country,city?apiKey=at_HhQR2qpPs4GXPMVN2i6TJPYXnqTVU&ipAddress=" +
    `${ipAddress}`;
  let resposne = await fetch(url);
  let json = await resposne.json();

  return await json;
}
var map = L.map("map");
async function ShowData(ipAddress) {
  const json = await FetchApi(ipAddress);
  if (json.isp == "") json.isp = "not have";
  const h2 = document.getElementsByTagName("h2");
  h2[0].innerText = json.ip;
  h2[1].innerText = json.location.region + ", " + json.location.city;
  h2[2].innerText = "UTC " + json.location.timezone;
  h2[3].innerText = json.isp;

  map.setView([json.location.lat, json.location.lng], 17);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  var darkIcon = L.icon({
    iconUrl: "../marker.png",

    iconSize: [45.78, 55.11], // size of the icon
    iconAnchor: [22, 60], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  L.marker([json.location.lat, json.location.lng], { icon: darkIcon }).addTo(
    map
  );

  map.update();
}
ShowData("192.212.174.101");
const button = document.getElementsByTagName("button")[0];
const input = document.getElementById("ipSearch");
button.addEventListener("click", async () => {
  await ShowData(input.value);
});
