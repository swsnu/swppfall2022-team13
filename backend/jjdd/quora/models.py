from django.db import models

class Quora(models.Model):
  title = models.TextField()
  content = models.TextField()
  author = models.IntegerField()
