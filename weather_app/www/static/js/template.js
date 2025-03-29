function searchCity(method) {
    document.getElementById("result").innerHTML = "";
    document.getElementById("error").innerHTML = "";
    let input = document.getElementById("search").value;
    document.getElementById("search").value = "";
    if ((input.toString()).trim() == ""){
        frappe.throw("Please input a city");
    } else {
        frappe.call({
            method:"weather_app.api.weather_api.search",
            type:"GET",
            args:{q:input},
            callback: function(result) {
                let response = result.message;
                if (response.length == 0) {
                    frappe.msgprint({
                        title: "Search Concluded",
                        indicator: "blue",
                        message: "No Cities Found"
                    });
                } else if (response.length > 1) {
                    let error = document.getElementById("error");
                    error.innerHTML = "<h4>Did you mean?</h4>";
                    for (let index in response) {
                        const object = response[index];
                        let city = object.name;
                        let region = object.region;
                        let country = object.country;
                        let lat = object.lat;
                        let lon = object.lon;
                        let p = document.createElement("p");
                        if (city == "") {
                            city = null;
                        } else {
                            p.append(city);
                        }
                        if (region == "") {
                            region = null;
                        } else {
                            p.append(", " + region);
                        } if (country == "") {
                            country = null;
                        } else {
                            p.append(", " + country);
                        } if (lat == "") {
                            lat = null;
                        } if (lon == "") {
                            lon = null;
                        }
                        p.append(" (",lat,",",lon,")" );
                        error.append(p)
                    }
                } else {
                    const object = response[0];
                    let city = object.name;
                    let region = object.region;
                    let country = object.country;
                    let lat = object.lat;
                    let lon = object.lon;
                    if (city == "") {
                        city = null;
                    } if (region == "") {
                        region = null;    
                    } if (country == "") {
                        country = null;
                    } if (lat == "") {
                        lat = null;
                    } if (lon == "") {
                        lon = null;
                    }
                    appendlocalStorage(city,region,country,lat,lon,method);
                    if (method == "weather") {
                        getWeather(lat,lon);
                    } else if (method == "forecast") {
                        getForecast(lat,lon);
                    } else if (method == "alerts") {
                        getAlerts(lat,lon);
                    } else {
                        console.error("Method Error: Method '" + method + "' does not exist");
                        frappe.msgprint({
                            title: "Please refer back to this app's developers",
                            indicator: "red",
                            message: "Error 404: Method Error: Method '" + method + "' does not exist"
                        })
                    }
                }
            },
            error: function(error) {
                frappe.throw(error)
            }
        })
    }
}

function appendlocalStorage(city,region,country,lat,lon,api) {
    frappe.call({
        method:"weather_app.api.weather_api.newlocalStorage",
        type:"GET",
        args:{
            city:city,
            region:region,
            country:country,
            lat:lat,
            lon:lon,
            api:api
        },
        callback: function(result) {
            let response = result.message;
            console.log(response)
            if (response == 201) {
            } else {
                frappe.msgprint({
                    title:"500 Server Error",
                    indicator:"red",
                    message:"Server Error: " + response});
            }
        }
    })
}