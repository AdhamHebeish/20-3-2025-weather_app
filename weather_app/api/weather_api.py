import frappe
import requests

@frappe.whitelist(allow_guest=True)
def search(q):
    url = "http://api.weatherapi.com/v1/search.json"
    args = {
        "key": "",
        "q": q
    }
    response = requests.get(url, params=args)
    return response.json()

@frappe.whitelist(allow_guest=True)
def newlocalStorage(city,region,country,lat,lon,api):
    try:
        memoryitem = frappe.new_doc("localStorage")
        memoryitem.city = city
        memoryitem.region = region
        memoryitem.country = country
        memoryitem.lat = lat
        memoryitem.lon = lon
        memoryitem.api = api
        memoryitem.insert(ignore_permissions=True)
        frappe.db.commit()
        status_code = 201
        return status_code
    except Exception as err:
        status_code = 500
        return status_code,err

@frappe.whitelist(allow_guest=True)
def current(q, aqi):
    url = "http://api.weatherapi.com/v1/current.json"
    args = {
        "key": "",
        "q": q,
        "aqi" : aqi
    }
    response = requests.get(url, params=args)
    return response.json()