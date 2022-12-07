from django.contrib import admin

# Register your models here.
from .models import Politician

admin.site.register(Politician)