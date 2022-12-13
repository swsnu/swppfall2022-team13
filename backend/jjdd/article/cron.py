import os
import sys

DIR_PATH = os.path.dirname(sys.path[0])
sys.path.append(os.path.join(DIR_PATH, "jjdd/recommendation"))
sys.path.append(os.path.join(DIR_PATH, "jjdd/crawler"))

from .models import Article
from news_crawler import NaverCrawler
from recommendation_model import Recommendation_Model

def crawl_and_recommend():
  
    crawling_result = NaverCrawler.crawl(5)

    # crawling_result 를 DB 에 추가해야합니다.
    for article in crawling_result:
      print('🔥', article)
      if None in article.values():
        continue
      
      Article.objects.create(title = article['title'],
                             datetime = article['datetime'],
                             preview_prologue = article['preview_prologue'],
                             detail_link_postfix = article['detail_link_postfix'],
                             preview_img_path = article['preview_img_path'],
                             detail_img_path = article['detail_img_path'],
                             journal_name = article['journal_name'],
                             detail_text = article['detail_text'],
                             bias = article['bias'],
                             topic_id = article['topic_id']
                             )
    
    recommendation_model = Recommendation_Model()
    recommendation_model.set_embedder()

    # article_DB 에 DB 를 넣어줘야합니다.
    article_DB = [{ 'id': article['id'],
                     'title': article['title'],
                     'datetime': article['datetime'],
                     'preview_prologue': article['preview_prologue'],
                     'detail_link_postfix': article['detail_link_postfix'],
                     'preview_img_path': article['preview_img_path'],
                     'detail_img_path': article['detail_img_path'],
                     'journal_name': article['journal_name'],
                     'detail_text': article['detail_text'],
                     'created_at': article['created_at'],
                     'updated_at': article['updated_at'],
                     'bias' : article['bias'],
                     'topic_id' : article['topic_id'],
                     'related_articles': article['related_articles']
                     }
                    for article in Article.objects.all().values()]
    recommendation_model.update_article_DB(article_DB)
    recommendation_model.update_topic_cluster()
    recommendation_model.update_embedding()
    recommendation_DB = recommendation_model.generate_recommendation()

    # recommendation_DB 로 추천관련 DB를 바꿔줘야합니다. 이것은 추가가 아니라 대치입니다. (이전 DB를 전부 날리고 새로운 값으로 업데이트)
    for key in recommendation_DB.keys():
      article = Article.objects.get(pk=key)
      article.related_articles = recommendation_DB[key]
      article.save()
    
