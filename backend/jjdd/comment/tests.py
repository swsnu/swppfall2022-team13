from django.test import TestCase, Client
import json
from .models import Comment

class ArticleTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        # # user setting -> 이후 유저 구현되면 실행
        # self.client.post("/api/signup/", 
        #                  json.dumps({"username": "real", "password": "user"}),
        #                  content_type="application/json")
        # self.client.post("/api/signup/", 
        #                  json.dumps({"username": "real2", "password": "user2"}),
        #                  content_type="application/json")

    def test_articles(self):
        # POST
        response = self.client.post("/api/quora/",
                                    json.dumps({"quoras": [
                                                  {"title": "test", 
                                                  "content": "test", 
                                                  "author_politicianId":'1',
                                                  "author": 1, }
                                                  ]
                                              }),
                                    content_type="application/json")
        self.assertEqual(response.status_code, 201)

        # GET
        response = self.client.get("/api/quora/")
        data = json.loads(response.content.decode())[0]
        self.assertEqual(data['title'], "test")
        self.assertEqual(data['content'], "test")
        self.assertEqual(data['author'], 1)
        
        # 다른 방식 request 전송
        response = self.client.put("/api/quora/")
        self.assertEqual(response.status_code, 405)