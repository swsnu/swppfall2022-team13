from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.shortcuts import render
from .models import Politician
import json

@csrf_exempt
def politician(request):
  if request.method == "GET":
    politician_list = [{ 
      'id' : politician['id'],
      'name': politician['name'],
                     'birth_date': politician['birth_date'],
                     'job': politician['job'],
                     'image_src' : politician['image_src'],
                     'political_party': politician['political_party'],
                     'election_precinct': politician['election_precinct'],
                     'committee': politician['committee'],
                     'committees': politician['committees'],
                     'reelection': politician['reelection'],
                     'election_units': politician['election_units'],
                     'email': politician['email'],
                     'career_summary': politician['career_summary'],
                     'mona_code': politician['mona_code'],
                     'proposals': politician['proposals'],
                     }
                    for politician in Politician.objects.all().values()]
    return JsonResponse(politician_list, safe=False, status = 200)
  
  # POST format : {politicians: [{}, {}, ...]}
  elif request.method == "POST":
    req_data = json.loads(request.body.decode())
    for politician in req_data['politicians']:
      Politician.objects.create(name = politician['name'],
                             birth_date = politician['birth_date'],
                             image_src=politician['image_src'],
                             job = politician['job'],
                             political_party = politician['political_party'],
                             election_precinct = politician['election_precinct'],
                             committee = politician['committee'],
                             committees = politician['committees'],
                             reelection = politician['reelection'],
                             election_units=politician['election_units'],
                             email=politician['email'],
                             career_summary=politician['career_summary'],
                             mona_code=politician['mona_code'],
                             proposals=politician['proposals'],
                             )
    return HttpResponse(status=201)
  else:
    return HttpResponseNotAllowed(["GET", "POST"])
  
  
@csrf_exempt
def politician_detail(request, politician_id):
    if request.method=='GET':
        politician = get_object_or_404(Politician, id=politician_id)
        response_data = {
          'id' : politician.id,
          'name': politician.name,
                     'birth_date': politician.birth_date,
                     'job': politician.job,
                     'image_src':politician.image_src,
                     'political_party': politician.political_party,
                     'election_precinct': politician.election_precinct,
                     'committee': politician.committee,
                     'committees': politician.committees,
                     'reelection': politician.reelection,
                     'election_units': politician.election_units,
                     'email': politician.email,
                     'career_summary': politician.career_summary,
                     'mona_code': politician.mona_code,
                     'proposals': politician.proposals,
                     }    
        return JsonResponse(response_data, status=200)
    else :
      return HttpResponseNotAllowed(['GET'])

@csrf_exempt
def is_politician(request):
  if request.method == "POST":
    req_data = json.loads(request.body.decode())
    username = req_data["username"]
    email = req_data["email"]
    politician = Politician.objects.filter(name=username)
    if len(politician) != 0 and politician[0].email.replace(" ", "") == email:
      return JsonResponse({"isPolitician":True, "name":username}, status = 200)
    else :
      return JsonResponse({"isPolitician":False}, safe=False, status = 200)
  else :
    return HttpResponseNotAllowed(["POST"])

@csrf_exempt
def like_politicians(request, user_id):
  if request.method == "GET": 
    user_id = ',' + str(user_id) + ','
    like_politician_list = [{ 
                     'id' : politician['id'],
                     'name': politician['name'],
                     'birth_date': politician['birth_date'],
                     'job': politician['job'],
                     'image_src' : politician['image_src'],
                     'political_party': politician['political_party'],
                     'election_precinct': politician['election_precinct'],
                     'committee': politician['committee'],
                     'committees': politician['committees'],
                     'reelection': politician['reelection'],
                     'election_units': politician['election_units'],
                     'email': politician['email'],
                     'career_summary': politician['career_summary'],
                     'mona_code': politician['mona_code'],
                     'proposals': politician['proposals'],
                     'like_users': politician['like_users']
                     }
                    for politician in Politician.objects.filter(like_users__contains=user_id).values()]
    return JsonResponse(like_politician_list, safe=False)
    
  elif request.method == "POST":
    # request format => {"politician_id" : "1"}
    req_data = json.loads(request.body.decode())
    like_politician = Politician.objects.get(pk=req_data['politician_id'])
    
    user_id_with_comma = "," + str(user_id) + ","
    if user_id_with_comma in like_politician.like_users:
      result = like_politician.like_users.replace(user_id_with_comma, '')
      like_politician.like_users = result
    else:  
      like_politician.like_users += user_id_with_comma
    like_politician.save()
    
    return HttpResponse(status=201)        
    
  else:
    return HttpResponseNotAllowed(["GET", "POST"])