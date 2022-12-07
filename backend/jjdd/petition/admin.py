from django.contrib import admin

# Register your models here.
from petition.models import Petition

admin.site.register(Petition)