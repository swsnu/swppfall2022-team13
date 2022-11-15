from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from .models import Petition
import json

@csrf_exempt
def article(request):
  if request.method == "GET":
    petition_list = [{ 'id': petition['id'],
                     'title': petition['title'],
                     'content': petition['content'],
                     'author': petition['author'],
                     'vote': petition['vote'],
                     }
                    for petition in Petition.objects.all().values()]
    return JsonResponse(petition_list, safe=False)
  
  # POST format : {articles: [{}, {}, ...]}
  elif request.method == "POST":
    req_data = json.loads(request.body.decode())

    for petition in req_data['petitions']:
      Petition.objects.create(title = petition['title'],
                             content = petition['content'],
                             author = petition['author'],
                             vote = petition['vote']
                             )
      
    return HttpResponse(status=201)
    
  else:
    return HttpResponseNotAllowed(["GET", "POST"])

  
def petition_info(request, petition_id=""):
  if not Petition.objects.filter(id=petition_id).values():
      return HttpResponse(status=404)
  else:
      petition_list = Petition.objects.filter(id=petition_id).values()
      petition = petition_list.first()
      author_id = petition['author']
    
  if(request.method == 'DELETE'):
        Petition.objects.filter(id=petition_id).delete()
        return HttpResponse(status=200)
  else :
        return HttpResponseNotAllowed(['DELETE'])
  
  
@csrf_exempt
def petition_detail(request, petition_id):
  pass