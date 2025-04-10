import frappe
from frappe.query_builder import Order

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
def getlocalStorage():
    memory = frappe.qb.DocType("localStorage")
    query = (
        frappe.qb.from_(memory)
        .select(
            memory.creation,
            memory.city,
            memory.region,
            memory.country,
            memory.lat,
            memory.lon,
            memory.api
        )
        .orderby(memory.creation, order=Order.desc)
        .limit(200)
    )
    data = query.run(as_dict=True)
    return data