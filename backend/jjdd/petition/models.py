from django.db import models

class Petition(models.Model):
  title = models.TextField()
  content = models.TextField()
  author = models.IntegerField()
  vote = models.IntegerField()
  photo_url = models.TextField(null=True)
