import os
import sys
import time
from IPython.display import clear_output #Ipython 환경에서만 필요
from abc import *
from bs4 import BeautifulSoup
import requests  
import pprint
import json

class NewsCrawler(metaclass=ABCMeta):
    @classmethod
    def crawl(cls, max_num = 1):
        start_time = time.time()
        articles_list = []
        
        try:
            cls._crawl(max_num, articles_list)
        except StopIteration as e:
            print(e)
            pass
        except BaseException as e:
            print(e)
        finally:
            print(f"execution time : {round(time.time() - start_time, 2)}s")
            return articles_list
        
    @classmethod
    @abstractmethod
    def _bs4_element2article_json(cls, bs4_element):
        pass
    
    @classmethod
    @abstractmethod
    def _crawl(cls, max_num, articles_list):
        pass
        
    @staticmethod
    def url2soup(url):
        req = requests.get(url, headers={'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'})
        
        html = req.text
        return BeautifulSoup(html, "html.parser")
    

class NaverCrawler(NewsCrawler):
    home_url = "https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=100"
    
    @classmethod
    def _bs4_element2article_json(cls, bs4_element):
        try:
            article_json = {}
            article_json["datetime"] = bs4_element.select_one("span.date").text.replace('.', '-') if bs4_element.select_one("span.date") else None
            # print(article_json["datetime"].replace('.', '-'))
            article_json["preview_prologue"] = bs4_element.select_one("span.lede").text if bs4_element.select_one("span.lede") else None
            article_json["detail_link_postfix"] = bs4_element.select_one("dt.photo a")["href"] if bs4_element.select_one("dt.photo a") else None
            article_json["preview_img_path"] = bs4_element.select_one("dt.photo a img")["src"] if bs4_element.select_one("dt.photo a img") else None
            article_json["journal_name"] = bs4_element.select_one("span.writing").text if bs4_element.select_one("span.writing") else None

            
            detail_url_str = article_json["detail_link_postfix"]
            if article_json["detail_link_postfix"] is not None:
                soup = NewsCrawler.url2soup(detail_url_str)

                article_json["title"] = soup.select_one(".media_end_head_title .media_end_head_headline").text if soup.select_one(".media_end_head_title .media_end_head_headline") else None
                article_json["detail_img_path"] = soup.select_one(".end_photo_org img._LAZY_LOADING")["data-src"] if soup.select_one(".end_photo_org img._LAZY_LOADING") else None
                article_json["detail_text"] = soup.select_one("div#dic_area").text if soup.select_one("div#dic_area") else None
            
            else:
                article_json["title"], article_json["detail_img_path"], article_json["detail_text"] = None, None, None
        
            return article_json
        
        except BaseException as e:
            print("Error occured at ...")
            print(article_json)
            print(e)
            raise e
                    
    @classmethod
    def _crawl_from_page(cls, url_str, max_num, articles_list):    #TODO : add press 'see more'
        soup = NewsCrawler.url2soup(url_str)
        
        article_element_list = soup.select(".type06_headline li dl")
        
        for article_element in article_element_list:
            article_json = cls._bs4_element2article_json(article_element)
            if article_json['journal_name'] in ['한겨레', '조선일보'] and article_json["detail_link_postfix"] is not None:
              articles_list.append(article_json)
              os.system('clear') # for pycharm, vscode etc...
              print(f"Crawled {len(articles_list)} / {max_num} articles.")

            # progress checker
            
            # clear_output(wait=True) # for Ipython
            
            if len(articles_list) >= max_num:
                raise StopIteration
                
    @classmethod
    def _crawl(cls, max_num, articles_list):
        soup = NewsCrawler.url2soup(cls.home_url)
        elements = soup.select("div.cluster_group .cluster_foot a")
        
        for element in elements:
            articles_page_url = "https://news.naver.com" + element["href"]
            cls._crawl_from_page(articles_page_url, max_num, articles_list)


if __name__ == "__main__":
  try:
    number_of_articles = int(sys.argv[1])
  except:
    print("인자로 받을 개수를 적어야 합니다.")
    quit()
  
  crawling_result = NaverCrawler.crawl(number_of_articles)
#   pprint.pprint(crawling_result)
  url = "http://ec2-13-209-0-212.ap-northeast-2.compute.amazonaws.com:8000/api/article/"
  response = requests.post(url, data = json.dumps({"articles" : crawling_result}))
  
#   print("\n" * 5)
  print(response)