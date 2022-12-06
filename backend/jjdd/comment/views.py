from django.http import HttpResponse, HttpResponseNotAllowed,JsonResponse,HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from json import JSONDecodeError
from .models import Comment
import json

@csrf_exempt
def comment(request):
  if request.method == "GET":
    comment_list = [{ 'id': comment['id'],
                     'quora_id': comment['quora_id'],
                     'author_id': comment['author_id'],
                     'content': comment['content'],
                     }
                    for comment in Comment.objects.all().values()]
    return JsonResponse(comment_list, safe=False)
  
  elif request.method == "POST":
    body = json.loads(request.body.decode())
    quora_id = body['quora_id']
    author_id = body['author_id']
    content = body['content']

    newComment = Comment(quora_id = quora_id, author_id=author_id, content=content)
    newComment.save()

    newCommentId = newComment.id
    response_dict = {'quora_id':quora_id,'author_id':author_id, 'content':content,'id':newCommentId}
    return JsonResponse(response_dict, status=201)

  else:
    return HttpResponseNotAllowed(["GET", "POST"])

@csrf_exempt
def comment_detail(request, comment_id=""):
  if not Comment.objects.filter(id=comment_id).values():
      return HttpResponse(status=404)
  else:
      comment_list = Comment.objects.filter(id=comment_id).values()
      comment = comment_list.first()
      author_id = comment['author_id']
    
  if(request.method == 'DELETE'):
        Comment.objects.filter(id=comment_id).delete()
        return HttpResponse(status=200)

  else :
        return HttpResponseNotAllowed(['DELETE'])

