from django.db import models
from django.utils import timezone

class Politician(models.Model):
    name = models.TextField(null=True, blank=True)
    birth_date = models.TextField(null=True, blank=True)
    image_src = models.TextField(null=True, blank=True)
    job = models.TextField(null=True, blank=True)
    political_party = models.TextField(null=True, blank=True)
    election_precinct = models.TextField(null=True, blank=True)
    committee = models.TextField(null=True, blank=True)
    committees = models.TextField(null=True, blank=True)
    reelection = models.TextField(null=True, blank=True)
    election_units = models.TextField(null=True, blank=True)
    email = models.TextField(null=True, blank=True)
    career_summary = models.TextField(null=True, blank=True)
    mona_code = models.TextField(null=True, blank=True)
    proposals = models.TextField(null=True, blank=True)
    


    
#   created_at = models.DateTimeField(auto_now_add=True)
#   updated_at = models.DateTimeField(auto_now=True)