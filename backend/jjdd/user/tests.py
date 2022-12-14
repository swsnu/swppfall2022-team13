from django.http import response
from django.test import TestCase, Client, tag
import json

# Create your tests here.
client = Client()

class UserTestCase(TestCase):
    @tag("skip_setup")
    def test_csrf(self):
        client = Client(enforce_csrf_checks=True)

        response = client.get("/api/user/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.delete("/api/user/token/", HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def setUp(self):
        client = Client(enforce_csrf_checks=False)
        # Signup
        response = client.post(
            "/api/user/signup/",
            json.dumps(
                {
                    "email": "test@swpp.com",
                    "password": "test",
                    "username": "Mo"
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)

        # Signin correctly
        response = client.post(
            "/api/user/signin/",
            json.dumps({"email": "test@swpp.com", "password": "test"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)

    def test_signup(self):
        # Check (KeyError, JSonDecodeError) returns 400 response
        response = client.post(
            "/api/user/signup/",
            json.dumps({"user_name": "chris", "pass_word": "chris"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)

        # Not allowed method returns 405 response
        response = client.get("/api/user/signup/")
        self.assertEqual(response.status_code, 405)

    def test_signin(self):
        # Signin with unauthorized user
        response = client.post(
            "/api/user/signin/",
            json.dumps({"email": "eunbineunbin@jjang.com", "password": "veryjjang"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 401)

    def test_signout(self):
        # Signout with not allowed method
        response = client.delete("/api/user/signout/")
        self.assertEqual(response.status_code, 405)

        # Signout before signin
        response = client.get("/api/user/signout/")
        self.assertEqual(response.status_code, 401)

        # Signin correctly
        response = client.post(
            "/api/user/signin/",
            json.dumps({"email": "eunbin@jjang.com", "password": "veryjjang"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)

        # Signout correctly
        response = client.get("/api/user/signout/")
        self.assertEqual(response.status_code, 204)

    def test_isLogin(self):
        response = client.get("/api/user/islogin/")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data["status"], False)

        response = client.post(
            "/api/user/signin/",
            json.dumps({"email": "eunbin@jjang.com", "password": "veryjjang"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)

        response = client.get("/api/user/islogin/")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data["status"], True)