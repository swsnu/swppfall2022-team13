from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.shortcuts import render
from .models import Article
import json

@csrf_exempt
def article(request):
  if request.method == "GET":
    article_list = [{ 'id': article['id'],
                     'title': article['title'],
                     'datetime': article['datetime'],
                     'preview_prologue': article['preview_prologue'],
                     'detail_link_postfix': article['detail_link_postfix'],
                     'preview_img_path': article['preview_img_path'],
                     'detail_img_path': article['detail_img_path'],
                     'journal_name': article['journal_name'],
                     'detail_text': article['detail_text'],
                     'created_at': article['created_at'],
                     'updated_at': article['updated_at'],
                     'bias' : article['bias'],
                     'topic_id' : article['topic_id'],
                     'related_articles': article['related_articles']
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
                             detail_text = article['detail_text'],
                             bias = article['bias'],
                             topic_id = article['topic_id']
                             )
      
    return HttpResponse(status=201)
    
  else:
    return HttpResponseNotAllowed(["GET", "POST"])

@csrf_exempt
def related_articles(request, article_id):
  if request.method == "GET":
    related_article_list = Article.objects.get(pk=article_id).related_articles
    return JsonResponse(related_article_list, safe=False)
    
  elif request.method == "POST":
    # POST format : {article_id: [1, 2, 3, ... ]}
    req_data = json.loads(request.body.decode())
    for key in req_data.keys():
      article = Article.objects.get(pk=key)
      article.related_articles = req_data[key]
      article.save()
    
    return HttpResponse(status=201)        
    
  else:
    return HttpResponseNotAllowed(["GET", "POST"])
  
  
def article_detail(request, article_id):
  pass