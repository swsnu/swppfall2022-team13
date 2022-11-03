from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.shortcuts import render
from .models import Article
import json


def article(request):
  if request.method == "GET":
    article_list = [{ 'title': article['title'],
                     'datetime': article['datetime'],
                     'preview_prologue': article['preview_prologue'],
                     'detail_link_postfix': article['detail_link_postfix'],
                     'preview_img_path': article['preview_img_path'],
                     'detail_img_path': article['detail_img_path'],
                     'journal_name': article['journal_name'],
                     'detail_text': article['detail_text'],
                     'created_at': article['created_at'],
                     'updated_at': article['updated_at'],
                     }
                    for article in Article.objects.all().values()]
    return JsonResponse(article_list, safe=False)
      
  elif request.method == "POST":
    req_data = json.loads()
    
  else:
    return HttpResponseNotAllowed(["GET", "POST"])
  
  

def article_detail(request, article_id):
  pass