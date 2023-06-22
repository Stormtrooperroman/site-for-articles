from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.utils import timezone
from .models import Article
import json
import re


def index(request):
    return render(request, 'card/index.html')


def articles(request):
    if request.user.is_authenticated:

        latest_article_list = Article.objects.order_by('-pub_date')[:5]
    else:
        latest_article_list = Article.objects.filter(public=True).order_by('-pub_date')[:5]
    context = {
        'latest_article_list': latest_article_list,
    }
    return render(request, 'card/articles.html', context)


def new_article(request):
    return render(request, 'card/new_article.html')


def save_article(request):
    if request.user.is_authenticated:
        data = json.loads(request.body)
        try:
            article = Article(title=data["title"], text=data["text"],
                              pub_date=timezone.now(), author=request.user)
            article.save()
        except:
            print("Error.")
    return HttpResponse("Ok")


def update_article(request, article_id):
    if request.user.is_authenticated:
        data = json.loads(request.body)

        try:
            article_update = Article.objects.get(id=article_id)
            article_update.text = data["text"]
            article_update.title = data["title"]
            article_update.pub_date = timezone.now()
            article_update.public = data["public"]
            article_update.save()

        except:
            print("Error.")
    return HttpResponse("Ok")


def delete_article(request, article_id):
    if request.user.is_authenticated:
        try:
            Article.objects.filter(id=article_id).delete()
            return HttpResponse("Ok")
        except:
            return HttpResponse("Error")


def edit_article(request, article_id):
    if request.user.is_authenticated:
        article_obj = get_object_or_404(Article, pk=article_id)
        article = {'title': article_obj.title, 'text': article_obj.text, 'public': article_obj.public}
        return render(request, 'card/edit_article.html', {'article': article})


def detail(request, article_id):
    article_obj = get_object_or_404(Article, pk=article_id)
    article = {'title': article_obj.title, 'text': article_obj.text}
    return render(request, 'card/detail.html', {'article': article})
