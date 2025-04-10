function getWeather(lat,lon) {
    let coords = lat + "," + lon;
    frappe.call({
        method:"weather_app.api.weather_api.current",
        type: "GET",
        args:{
            q:coords,
            aqi:"no"
        },
        callback: function(result) {
            let resultdiv = document.getElementById("result");
            document.getElementById("body").classList.add("lb");
            let response = result.message;
            locationObject = response.location;
            weatherObject = response.current;
            let city = locationObject.name;
            let region = locationObject.region;
            let country = locationObject.country;
            let lat = locationObject.lat;
            let lon = locationObject.lon;
            let tz = locationObject.tz_id;
            let time = locationObject.localtime;
            let h3 = document.createElement("h3");
            if (city == "") {
                city = null;
            } else {
                h3.append(city);
            }
            if (region == "") {
                region = null;
            } else {
                h3.append(", " + region);
            } if (country == "") {
                country = null;
            } else {
                h3.append(", " + country);
            } if (lat == "") {
                lat = null;
            } if (lon == "") {
                lon = null;
            } if (tz == "") {
                tz = null;
            } if (time == "") {
                time = null
            }
            let datetime = time.split(" ");
            let timetext = document.createElement("div");
            let p1 = document.createElement("p");
            let p2 = document.createElement("p");
            let p3 = document.createElement("p");
            h3.append(" (",lat,",",lon,")" );
            p1.append(datetime[0]);
            p2.append(tz);
            p3.append(datetime[1]);
            timetext.append(p1,p2,p3);
            resultdiv.append(h3);
            resultdiv.append(timetext);
            let condition = weatherObject.condition;
            let weatherdiv = document.createElement("div");
            weatherdiv.className = "lr rounded";
            let temp = document.createElement("h4");
            temp.append(weatherObject.temp_c + "\u2103/" + weatherObject.temp_f + "\u2109");
            weatherdiv.append(temp);
            let feelslike = document.createElement("p");
            feelslike.append("Feels like: " + weatherObject.feelslike_c + "\u2103/" + weatherObject.feelslike_f + "\u2109");
            weatherdiv.append(feelslike);
            let icon = document.createElement("img");
            icon.src = condition.icon;
            icon.alt = condition.text + "-" + condition.code;
            icon.className = "rounded mx-auto d-block";
            icon.style.width = "16rem";
            weatherdiv.append(icon);
            let caption = document.createElement("h5");
            let lastUpdate = document.createElement("p");
            caption.append(condition.text);
            lastUpdate.append("Last Updated: " + weatherObject.last_updated);
            weatherdiv.append(caption, lastUpdate);
            resultdiv.append(weatherdiv);
            let row = document.createElement("div");
            row.className = "row padded";
            let windcol = document.createElement("div");
            windcol.className = "col";
            windcol.innerHTML = "<h3>Wind</h3>";
            let speed = document.createElement("h4");
            speed.append(weatherObject.wind_kph + "kph (" + weatherObject.wind_mph + "mph)");
            windcol.append(speed);
            let windarrow = document.createElement("img");
            windarrow.src = "/static/images/wind-direction.svg";
            windarrow.alt = weatherObject.wind_degree + "\u02da " + weatherObject.wind_dir;
            windarrow.className = "rounded mx-auto d-block";
            windarrow.style.width = "2rem";
            windarrow.style.transform = "rotate(" + weatherObject.wind_degree + "deg)";
            windcol.appendChild(windarrow);
            let wind_dir = document.createElement("h4");
            wind_dir.append(weatherObject.wind_degree + "\u02da (" + weatherObject.wind_dir + ")");
            windcol.append(wind_dir);
            let gust = document.createElement("h4");
            gust.append("Gust");
            windcol.append(gust);
            let gustspeed = document.createElement("p");
            gustspeed.append(weatherObject.gust_kph + "kph (" + weatherObject.gust_mph + "mph)");
            windcol.append(gustspeed);
            row.append(windcol);
            let datacol = document.createElement("div");
            datacol.className = "col";
            datacol.innerHTML = "<h3>Pressure</h3>"
            let pressure = document.createElement("p");
            pressure.append(weatherObject.pressure_mb + "mb/" + weatherObject.pressure_in + "in Hg")
            datacol.append(pressure);
            let preciptitle = document.createElement("h4");
            preciptitle.append("Precipitation");
            datacol.append(preciptitle);
            let precip = document.createElement("p");
            precip.append(weatherObject.precip_mm + "mm/" + weatherObject.precip_in + "in");
            datacol.append(precip);
            let humidtitle = document.createElement("h4");
            humidtitle.append("Humidity");
            datacol.append(humidtitle);
            let humid = document.createElement("p");
            humid.append(weatherObject.humidity + "%");
            datacol.append(humid);
            let cloud = document.createElement("p");
            cloud.append("Cloud Coverage: " + weatherObject.cloud + "%");
            datacol.append(cloud);
            row.append(datacol);
            let tempcol = document.createElement("div");
            tempcol.className = "col";
            let windchill = document.createElement("h4");
            windchill.append(weatherObject.windchill_c + "\u2103/" + weatherObject.windchill_f + "\u2109");
            let heatindex = document.createElement("h4");
            heatindex.append(weatherObject.heatindex_c + "\u2103/" + weatherObject.heatindex_f + "\u2109");
            let dewpoint = document.createElement("h4");
            dewpoint.append(weatherObject.dewpoint_c + "\u2103/" + weatherObject.dewpoint_f + "\u2109");
            let windtext = document.createElement("h4");
            let heattext = document.createElement("h4");
            let dewtext = document.createElement("h4");
            windtext.append("Windchill")
            heattext.append("Heat Index")
            dewtext.append("Dew Point")
            tempcol.append(windtext,windchill,heattext,heatindex,dewtext,dewpoint);
            row.append(tempcol);
            let viscol = document.createElement("div");
            viscol.className = "col";
            let vis = document.createElement("h5");
            vis.append(weatherObject.vis_km + "km (" + weatherObject.vis_miles + "miles)");
            let uv = document.createElement("h5");
            uv.append(weatherObject.uv);
            let vistext = document.createElement("h4");
            vistext.append("Visibility");
            let uvtext = document.createElement("h4");
            uvtext.append("UV Index");
            viscol.append(vistext,vis,uvtext,uv);
            row.append(viscol);
            resultdiv.append(row);
        },
        error: function(error) {
            frappe.throw(error);
        }
    })
}