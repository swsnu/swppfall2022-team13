from collections import defaultdict
from sentence_transformers import SentenceTransformer, util
import numpy as np
import pickle

class Recommendation_Model:
    def __init__(self):
        self.topic_cluster = None
        self.articles_DB = None
        self.embedder = None
        self.article_embeddings = None
       
    
    def update_article_DB(self, articles_DB):
        self.articles_DB = articles_DB
    
    
    def update_topic_cluster(self):
        self.topic_cluster = Recommendation_Model._generate_topic_cluster(self.articles_DB)
        
        
    def set_embedder(self):
        self.embedder = pickle.load(open('embedder.pkl', 'rb'))
        
        
    def update_embedding(self):
        corpus = []
        for article_json in self.articles_DB:
            corpus.append(article_json["detail_text"])
    
        self.article_embeddings = self.embedder.encode(corpus, convert_to_tensor=True)
        
        
    @staticmethod
    def _generate_topic_cluster(articles_DB):
        topic_cluster = defaultdict(list)

        for article_json in articles_DB:
            topic_id, article_id, bias = article_json["topic_id"], article_json["article_id"], article_json["bias"]
            topic_cluster[topic_id].append((article_id, bias))

        return topic_cluster
    
    
    def recommend_by_topic(self, article_json):
        if not self.articles_DB:
            print("you should update articles_DB!")
            return None
            
        if not self.topic_cluster:
            print("updating topic_cluster...")
            self.update_topic_cluster()
        
        recommendation_article_id = None
        topic_id, article_id, bias = article_json["topic_id"], article_json["article_id"], article_json["bias"]
        
        for target_article_id, target_bias in self.topic_cluster[topic_id]:
            if target_bias != bias:
                recommendation_article_id = target_article_id
                break
            
        return recommendation_article_id
        
        
    def recommend_by_similarity(self, article_json, top_k):
        if not self.articles_DB:
            print("you should update articles_DB!")
            return None
            
        if not self.article_embeddings:
            print("updating article_embeddings...")
            self.update_embedding()
        
        recommendation_article_id_list = None
        article_id, detail_text = article_json["article_id"], article_json["detail_text"]
        
        query_embedding = self.embedder.encode(detail_text, convert_to_tensor=True)
        cos_scores = util.pytorch_cos_sim(query_embedding, self.article_embeddings)[0]
        cos_scores = cos_scores.cpu()
        top_results = np.argpartition(-cos_scores, range(top_k))[0:top_k+1]

        return top_results[1:top_k+1].tolist()


    def generate_recommendation(self):
        """
        matching 에 필요한 DB 생성하는 code
        output : 하나의 article 에 대해, 해당 article 아래에 추천해주고 하는 article 들의 id 를 담은 list 를 담고 있는 json
        ex ) {
            1 : [2,3,4]
        }
        """
        recommendation_DB = defaultdict(list)
        recommendation_per_article = 3
        
        for article_json in self.articles_DB:
            article_id = article_json["article_id"]
            
            recommendation_by_topic = self.recommend_by_topic(article_json)
            if recommendation_by_topic:
                recommendation_DB[article_id].append(recommendation_by_topic)
            
            n = recommendation_per_article - len(recommendation_DB[article_id])
            recommendation_by_similarity = self.recommend_by_similarity(article_json, n)
            
            recommendation_DB[article_id] += recommendation_by_similarity

        return recommendation_DB