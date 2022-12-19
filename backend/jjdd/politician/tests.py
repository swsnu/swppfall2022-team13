from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import Politician
import json

# Create your tests here.
class PoliticianTestCase(TestCase):
    def setUp(self):
        client = Client()

    def test_politician(self):
        client = Client()

        response = client.delete('/api/politician/')
        self.assertEqual(response.status_code, 405)
        response = client.post('/api/politician/', json.dumps({"politicians":[{'name': 'test',
                     'birth_date': 'test',
                     'job': 'test',
                     'political_party': 'test',
                     'election_precinct': 'test',
                     'committee': 'test',
                     'image_src' : 'test',
                     'committees': 'test',
                     'reelection': 'test',
                     'election_units': 'test',
                     'email': 'test',
                     'career_summary': 'test',
                     'mona_code': 'test',
                     'proposals' : 'test',
                     'like_users' :'test',
                     },]}),content_type="application/json")
        self.assertEqual(response.status_code, 201)

        response = client.get('/api/politician/')
        self.assertEqual(response.status_code, 200)

    
    def test_politician_detail(self):
        client = Client()

        response = client.delete('/api/politician/1/')
        self.assertEqual(response.status_code, 405)

        response = client.post('/api/politician/', json.dumps({"politicians":[{'name': 'test',
                     'birth_date': 'test',
                     'job': 'test',
                     'political_party': 'test',
                     'election_precinct': 'test',
                     'image_src' : 'test',
                     'committee': 'test',
                     'committees': 'test',
                     'reelection': 'test',
                     'election_units': 'test',
                     'email': 'test',
                     'career_summary': 'test',
                     'mona_code': 'test',
                     'proposals' : 'test',
                     'like_users' : 'test',
                     },]}),content_type="application/json")

        response = client.get('/api/politician/1/')
        self.assertEqual(response.status_code, 200)



