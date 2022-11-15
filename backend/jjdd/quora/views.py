from django.http import HttpResponse, HttpResponseNotAllowed,JsonResponse,HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from json import JSONDecodeError
from .models import Quora
import json

@csrf_exempt
def quora(request):
  if request.method == "GET":
    petition_list = [{ 'id': quora['id'],
                     'title': quora['title'],
                     'content': quora['content'],
                     'author': quora['author'],
                     }
                    for quora in Quora.objects.all().values()]
    return JsonResponse(petition_list, safe=False)
  
  elif request.method == "POST":
    body = json.loads(request.body.decode())
    title = body['title']
    content = body['content']
    author = body['author']

    newQuora = Quora(title = title, content=content, author=author)
    newQuora.save()

    newQuoraId = newQuora.id
    response_dict = {'title':title,'content':content, 'author':author,'id':newQuoraId}
    return JsonResponse(response_dict, status=201)

  else:
    return HttpResponseNotAllowed(["GET", "POST"])

@csrf_exempt
def quora_detail(request, quora_id=""):
  if not Quora.objects.filter(id=quora_id).values():
      return HttpResponse(status=404)
  else:
      petition_list = Quora.objects.filter(id=quora_id).values()
      petition = petition_list.first()
      author_id = petition['author']
    
  if(request.method == 'DELETE'):
        Quora.objects.filter(id=quora_id).delete()
        return HttpResponse(status=200)

  else :
        return HttpResponseNotAllowed(['DELETE'])

