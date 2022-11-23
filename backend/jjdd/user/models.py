from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser

class User(AbstractBaseUser):
  """
    - 유저 프로필 사진
    - 유저 닉네임
    - 유저 비밀번호(Default)
  """
  
  profile_img = models.TextField()
  nickname = models.CharField(max_length=50)

  class Meta:
    db_table = "User"