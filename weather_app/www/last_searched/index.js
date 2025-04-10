var limit = 10;
function getlastSearched() {
    frappe.call({
        method:"weather_app.api.doctype_api.getlocalStorage",
        type:"GET",
        args:{},
        callback: function(result) {
            let tbody = document.getElementById("tbody");
            tbody.innerHTML = "";
            let response = result.message;
            for (let index in response) {
                let i = Number(index) + 1;
                if (i <= limit) {
                    let memoryobject = response[index];
                    let row = document.createElement("tr");
                    row.innerHTML = "<th scope='row'>" + i + "</th>"
                    let creation = document.createElement("td");
                    datetime = memoryobject.creation.split(" ");
                    time = datetime[1].split(".");
                    creation.append(datetime[0]," ",time[0]);
                    row.append(creation);
                    let city = document.createElement("td");
                    city.append(memoryobject.city);
                    if (memoryobject.region == "") {
                        city.colSpan = 2;
                        row.append(city);   
                    } else {
                        let region = document.createElement("td");
                        region.append(memoryobject.region);
                        row.append(city, region);
                    }
                    let country = document.createElement("td");
                    country.append(memoryobject.country);
                    row.append(country);
                    let lat = document.createElement("td");
                    lat.append(memoryobject.lat,"\u02da");
                    row.append(lat);
                    let lon = document.createElement("td");
                    lon.append(memoryobject.lon,"\u02da");
                    row.append(lon);
                    let api = document.createElement("td");
                    let apipage = memoryobject.api;
                    if (apipage == "weather") {
                        api.append("Current Weather");
                    } else if (apipage == "forecast") {
                        api.append("Forecasted Weather");
                    } else if (apipage == "alerts") {
                        api.append("Weather Alerts");
                    } else if (apipage == "injection") {
                        api.append("Injected by API");
                    } else {
                        api.append("Unknown Source");
                    }
                    row.append(api);
                    tbody.append(row);
                    let btn = document.getElementById("btn");
                    if (btn == null) {
                        btn = document.createElement("div");
                        btn.id = "btn";
                        btn.className = "btn-group text-center";
                        btn.innerHTML = "<button class='btn btn-primary' type='button' onclick='showmore()'>Show More</button>"
                        document.getElementById("body").append(btn);
                    } else if (limit >= 50) {
                        btn.className = "d-none";
                    }
                    
                }
            }
        },
        error: function(error) {
            frappe.throw(error);
        }
    })
}
function showmore() {
    limit += 10;
    getlastSearched();
}
document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener("DOMContentLoaded", getlastSearched());
});