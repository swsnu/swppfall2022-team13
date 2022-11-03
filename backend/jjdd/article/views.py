from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from .models import Article
import json

@csrf_exempt
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
  
  # POST format : {articles: [{}, {}, ...]}
  elif request.method == "POST":
    req_data = json.loads(request.body.decode())

    for article in req_data['articles']:
      Article.objects.create(title = article['title'],
                             datetime = article['datetime'],
                             preview_prologue = article['preview_prologue'],
                             detail_link_postfix = article['detail_link_postfix'],
                             preview_img_path = article['preview_img_path'],
                             detail_img_path = article['detail_img_path'],
                             journal_name = article['journal_name'],
                             detail_text = article['detail_text']
                             )
      
    return HttpResponse(status=201)
    
  else:
    return HttpResponseNotAllowed(["GET", "POST"])
  
  
@csrf_exempt
def article_detail(request, article_id):
  pass