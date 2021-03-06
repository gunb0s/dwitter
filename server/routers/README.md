## Schema

```
tweet {
    id: string,
    content: string,
    createdAt: Date,
    userId: string,
}

user {
    id: string,
    username: string,
    password: string,
    name: string,
    email: string,
    url?: string,
    createdAt: Date
}
```

## API λμμΈ

### π Auth

**POST** /auth/login λ‘κ·ΈμΈνκΈ°

    Request {
        username: string
        password: string
    }

<br>

    Response 201 {
        token: string
        username: string
    }
    Error 400 {
        it doesn't exist
    }
    Error 400 {
        password is not correct
    }

**POST** /auth/signup νμκ°μνκΈ°

    Request {
        password: string
        username: string
        name: string
        email: string
        url?: string
    }

<br>

    Response 201 {
        token,
        username
    }
    Error 400 {
        id already exist
    }

**GET** /auth/me

    headers: {
        Authorization: Bearer token
    }

    Request {
        username
    }

<br>

    Response 200
    Error 400 { Invalid token }
    Error 400 { token not included }

### π Tweets

**GET** /tweets λͺ¨λ  νΈμ κ°μ Έμ€κΈ°

    Response 200 {
        tweets: tweet[]
    }

**POST** /tweets μλ‘μ΄ νΈμ μμ±

    Request {
        username: string
        name: string
        content: string
    }

<br>

    Response 201 { Created }
    Error 400 { Invalid form } νμν λ°μ΄ν° μμμ΄ μμ λ
    Error 401 { Not Authorized, Login Please }

**GET** /tweets?username=:username ν΄λΉ μ μ μ νΈμ κ°μ Έμ€κΈ°

    Response 200 {
        tweet: tweet
    }

<br>

    Error 404 { userId doesn't exist }

**PUT** /tweets/:id νΈμ νΈμ§νκΈ°

    Request {
        content: string
    }

<br>

    Response 200 { Edited }
    Error 400 { Invalid form } νμν λ°μ΄ν° μμμ΄ μμ λ
    Error 400 { Invalid id } idκ° μλͺ»λμμ λ
    Error 401 { Not Authorized, or Not correct writer }
    Error 404 { id doesn't exist }

**DELETE** /tweets/:id νΈμ μ­μ νκΈ°

    Response 204
    Error 400 { Invalid id } idκ° μλͺ»λμμ λ
    Error 401 { Not Authorized, or Not correct writer }
