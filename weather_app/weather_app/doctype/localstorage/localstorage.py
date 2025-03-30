# Copyright (c) 2025, AdhamHebeish and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class localStorage(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		api: DF.Data
		city: DF.Data
		country: DF.Data
		lat: DF.Float
		lon: DF.Float
		region: DF.Data | None
	# end: auto-generated types
	pass
