from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.shortcuts import render
from .models import Politician
import json

@csrf_exempt
def politician(request):
  if request.method == "GET":
    politician_list = [{ 'name': politician['name'],
                     'birth_date': politician['birth_date'],
                     'job': politician['job'],
                     'political_party': politician['political_party'],
                     'election_precinct': politician['election_precinct'],
                     'committee': politician['committee'],
                     'committees': politician['committees'],
                     'reelection': politician['reelection'],
                     'election_units': politician['election_units'],
                     'email': politician['email'],
                     'career_summary': politician['career_summary'],
                     'mona_code': politician['mona_code'],
                     }
                    for politician in Politician.objects.all().values()]
    return JsonResponse(politician_list, safe=False)
  
  # POST format : {politicians: [{}, {}, ...]}
  elif request.method == "POST":
    req_data = json.loads(request.body.decode())
    for politician in req_data['politicians']:
      print(politician)
      Politician.objects.create(name = politician['name'],
                             birth_date = politician['birth_date'],
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
                             )
    return HttpResponse(status=201)
  else:
    return HttpResponseNotAllowed(["GET", "POST"])
  
  
@csrf_exempt
def politician_detail(request, politician_id):
    if request.method=='GET':
        politician = get_object_or_404(Politician, id=politician_id)
        response_data = {'name': politician.name,
                     'birth_date': politician.birth_date,
                     'job': politician.job,
                     'political_party': politician.political_party,
                     'election_precinct': politician.election_precinct,
                     'committee': politician.committee,
                     'committees': politician.committees,
                     'reelection': politician.reelection,
                     'election_units': politician.election_units,
                     'email': politician.email,
                     'career_summary': politician.career_summary,
                     'mona_code': politician.mona_code}    
        return JsonResponse(response_data, status=200)
    else :
      return HttpResponseNotAllowed(['GET'])