nohup \
  sudo docker run --rm \
    --name backend -p 8000:8000 \
    jjdd:latest \
    -v "/home/ubuntu/swppfall2022-team13/backend/jjdd/db.sqlite3":"/app/db.sqlite3" 
&