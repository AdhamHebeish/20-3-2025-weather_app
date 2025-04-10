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
def current(q, aqi):
    url = "http://api.weatherapi.com/v1/current.json"
    args = {
        "key": "",
        "q": q,
        "aqi" : aqi
    }
    response = requests.get(url, params=args)
    return response.json()