from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
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
                     'telephone_number': politician['telephone_number'],
                     'email': article['email'],
                     'homepage': article['homepage'],
                     'career_summary': article['career_summary'],
                     'mana_code': article['mana_code'],
                     }
                    for politician in Politician.objects.all().values()]
    return JsonResponse(politician_list, safe=False)
  
  # POST format : {politicians: [{}, {}, ...]}
  elif request.method == "POST":
    req_data = json.loads(request.body.decode())

    for politician in req_data['politicians']:
      Politician.objects.create(name = politician['name'],
                             birth_date = politician['birth_date'],
                             job = politician['job'],
                             political_party = politician['political_party'],
                             election_precinct = politician['election_precinct'],
                             committee = politician['committee'],
                             committees = politician['committees'],
                             reelection = politician['reelection'],
                             election_units=politician['election_units'],
                             telephone_number=politician['telephone_number'],
                             email=politician['email'],
                             homepage=politician['homepage'],
                             career_summary=politician['career_summary'],
                             mana_code=politician['mana_code'],
                             )
    return HttpResponse(status=201)
  else:
    return HttpResponseNotAllowed(["GET", "POST"])
  
  
@csrf_exempt
def article_detail(request, article_id):
  pass