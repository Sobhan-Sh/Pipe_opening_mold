const CheckLocationn = () => {
    if (polygon.contains(map.getCenter())) {
        const centerLatLng = map.getCenter();
        const centerLatitude = centerLatLng.lat;
        const centerLongitude = centerLatLng.lng;
        getLocationInfo(centerLatitude, centerLongitude);
        centerMarker.setLatLng([centerLatitude, centerLongitude]);
        console.log("در محدوده هستی");
    }
    else
        alert("شما خارج منطقه کلیک کردید")
}

const map = L.map('map', {
}).setView([34.29474133952971, 48.82484320970994], 18);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


const centerMarker = L.marker([34.29477780483854, 48.824838100516615], {
    icon: L.divIcon({
        className: 'leaflet-div-icon', html: `<img src="assets/img/marker-icon.png" class="leaflet-marker-icon leaflet-zoom-animated leaflet-interactive" alt="Marker" tabindex="0" role="button" style="margin-left: -6px;margin-top: -27px;width: 25px;height: 41px;z-index: 365;">
            <img src="assets/img/marker-shadow.png" class="leaflet-marker-shadow leaflet-zoom-animated" alt="" style="margin-left: -5px;margin-top: -29px; width: 41px; height: 41px; ">`
    })
}).addTo(map);

const marker = L.marker([34.29474133952971, 48.82484320970994]).addTo(map)
    .bindPopup('<strong> هایپر مارکت الی شاپ </strong>').openPopup();
let status = "";
const polygon = L.polygon([
    [34.294466, 48.822644],
    [34.295388, 48.824478],
    [34.292720, 48.829113],
    [34.291876, 48.828368],
    [34.291675, 48.827055],
    [34.291616, 48.826057],
    [34.291323, 48.825079],
    [34.290943, 48.823838],
    [34.291686, 48.823043],
    [34.291952, 48.821986],
    [34.292408, 48.821690],
    [34.293867, 48.820535],
    [34.294567, 48.822353],
    [34.294466, 48.822644],
]).addTo(map).on('mouseup', (e) => {
    CheckLocationn();
})

map.on('mouseup', (e) => {
    CheckLocationn();
});

function getLocationInfo(latitude, longitude) {
    const base_url = "https://nominatim.openstreetmap.org/reverse";
    const params = new URLSearchParams({
        format: "json",
        lat: latitude,
        lon: longitude,
    });
    fetch(`${base_url}?${params}`)
        .then(response => response.json())
        .then(data => {
            const address = data.display_name || 'Not found';
            console.log("آدرس مکان:", address);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

const setLocationMe = () => {
    if ("geolocation" in navigator) {
        // درخواست موقعیت فعلی کاربر
        navigator.geolocation.getCurrentPosition(
            function (position) {
                // گرفتن مختصات جغرافیایی
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                map.setView([latitude, longitude], 17.8);
                CheckLocationn();
                centerMarker.setLatLng([latitude, longitude]);
            },
            function (error) {
                // در صورت عدم موفقیت در دریافت موقعیت
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("دسترسی به موقعیت جغرافیایی توسط کاربر رد شده است.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("اطلاعات موقعیت جغرافیایی در دسترس نیست.");
                        break;
                    case error.TIMEOUT:
                        alert("درخواست برای دریافت موقعیت جغرافیایی به مدت زمان زیادی طول کشیده است.");
                        break;
                    case error.UNKNOWN_ERROR:
                        alert("خطای ناشناخته رخ داده است.");
                        break;
                }
            }
        );
    } else {
        alert("مرورگر شما از Geolocation API پشتیبانی نمی‌کند.");
    }
}