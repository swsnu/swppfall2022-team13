
from json.decoder import JSONDecodeError
import json
from django.http import HttpResponse, HttpResponseNotAllowed
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http.response import HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods


@ensure_csrf_cookie
def token(request):
    if request.method == "GET":
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(["GET"])


@require_http_methods(["POST"])
@ensure_csrf_cookie
def signup(request):
    try:
        req_data = json.loads(request.body.decode())
        email = req_data["email"]
        password = req_data["password"]
        username = req_data["username"]
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()

    User.objects.create_user(
        email=email, password=password, username=username
    )
    return HttpResponse(status=201)


@require_http_methods(["POST"])
@ensure_csrf_cookie
def signin(request):
    req_data = json.loads(request.body.decode())
    email = req_data["email"]
    password = req_data["password"]
    user = authenticate(request, username=email, password=password)
    if user is not None:
        login(request, user)
        return HttpResponse(status=204)
    return HttpResponse("Wrong ID or Password")


@require_http_methods(["GET"])
@ensure_csrf_cookie
def signout(request):
    if request.user.is_authenticated:
        logout(request)
        return HttpResponse(status=204)
    else:
        return HttpResponse("Unauthorized", status=401)


@require_http_methods(["GET"])
@ensure_csrf_cookie
def isLogin(request):
    if request.user.is_authenticated:
        return JsonResponse({"status": True, "id": request.user.id, "username": request.user.username, "email": request.user.email}, status=200)
    else:
        return JsonResponse({"status": False, "id": 0}, status=200)