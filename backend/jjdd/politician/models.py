from django.db import models
from django.utils import timezone

class Politician(models.Model):
    name = models.TextField()
    birth_date = models.TextField()
    job = models.TextField()
    political_party = models.TextField()
    election_precinct = models.TextField()
    committee = models.TextField()
    committees = models.TextField()
    reelection = models.TextField()
    election_units = models.TextField()
    telephone_number = models.TextField()
    email = models.TextField()
    homepage = models.TextField()
    career_summary = models.TextField()
    mona_code = models.TextField()
    


    
#   created_at = models.DateTimeField(auto_now_add=True)
#   updated_at = models.DateTimeField(auto_now=True)