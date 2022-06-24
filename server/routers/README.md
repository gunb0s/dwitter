## Schema

---

```
tweet {
    id: string,
    content: string,
    name: string,
    username: string,
    url?: string,
    createdAt: Date
}
```

## API 디자인

---

```
GET /tweets 모든 트윗 가져오기

Response 200 {
    tweets: [tweet, tweet, ...]
}
```

```
POST /tweets 새로운 트윗 생성

Request {
    username:
    name:
    content:
}

Response 201 { Created }
Error 400 { Invalid form } 필요한 데이터 양식이 없을 때
Error 401 { Not Authorized, Login Please }
```

```
GET /tweets?username=:username 해당 유저의 트윗 가져오기

Response 200 {
    tweet: tweet
}
Error 404 { userId doesn't exist }
```

```
PUT /tweets/:id 트윗 편집하기

Request {
    content:
}

Response 200 { Edited }
Error 400 { Invalid form } 필요한 데이터 양식이 없을 때
Error 400 { Invalid id } id가 잘못되었을 때
Error 401 { Not Authorized, or Not correct writer }
Error 404 { id doesn't exist }
```

```
DELETE /tweets/:id 트윗 삭제하기

Response 204
Error 400 { Invalid id } id가 잘못되었을 때
Error 401 { Not Authorized, or Not correct writer }
```
