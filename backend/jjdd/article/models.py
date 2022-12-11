from django.db import models
from django.utils import timezone

class Article(models.Model):
  title = models.TextField()
  datetime = models.DateTimeField()
  preview_prologue = models.TextField()
  detail_link_postfix = models.TextField()
  preview_img_path = models.TextField()
  detail_img_path = models.TextField()
  journal_name = models.TextField()
  detail_text = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  related_articles = models.TextField(null=True, default="[]")