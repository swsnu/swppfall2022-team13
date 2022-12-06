from django.db import models

class Comment(models.Model):
  quora_id = models.IntegerField()
  author_id = models.IntegerField()
  content = models.TextField()
