from django.test import TestCase, Client
import json
from .models import Article

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
        response = self.client.post("/api/article/",
                                    json.dumps({"articles": [
                                                  {"title": "test", 
                                                  "datetime": "2022-11-09", 
                                                  "preview_prologue": "test", 
                                                  "detail_link_postfix": "test", 
                                                  "preview_img_path": "test", 
                                                  "journal_name": "test", 
                                                  "detail_img_path": "test", 
                                                  "bias":"test",
                                                  "detail_text": "test",
                                                  "topic_id" : "test",
                                                  }
                                                  ]
                                              }),
                                    content_type="application/json")
        self.assertEqual(response.status_code, 201)

        # GET
        response = self.client.get("/api/article/")
        data = json.loads(response.content.decode())[0]
        self.assertEqual(data['title'], "test")
        self.assertEqual(data['preview_prologue'], "test")
        self.assertEqual(data['detail_link_postfix'], "test")
        self.assertEqual(data['preview_img_path'], "test")
        self.assertEqual(data['journal_name'], "test")
        self.assertEqual(data['detail_img_path'], "test")
        self.assertEqual(data['detail_text'], "test")
        
        # 다른 방식 request 전송
        response = self.client.put("/api/article/")
        self.assertEqual(response.status_code, 405)