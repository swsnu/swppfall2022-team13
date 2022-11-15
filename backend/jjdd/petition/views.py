from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from .models import Petition
import json

@csrf_exempt
def petition(request):
  if request.method == "GET":
    petition_list = [{ 'id': petition['id'],
                     'title': petition['title'],
                     'content': petition['content'],
                     'author': petition['author'],
                     'vote': petition['vote'],
                     }
                    for petition in Petition.objects.all().values()]
    return JsonResponse(petition_list, safe=False)
  
  elif request.method == "POST":
    body = json.loads(request.body.decode())
    title = body['title']
    content = body['content']
    author = body['author']
    vote = body ['vote']

    newPetition = Petition(title = title, content=content, author=author, vote=vote)
    newPetition.save()

    newPetitionId = newPetition.id
    response_dict = {'title':title,'content':content, 'author':author, 'vote': vote, 'id':newPetitionId}
    return JsonResponse(response_dict, status=201)

  else:
    return HttpResponseNotAllowed(["GET", "POST"])

@csrf_exempt
def petition_detail(request, petition_id=""):
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
  
