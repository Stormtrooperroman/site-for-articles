from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.utils import timezone
from .models import Article
import json

def index(request):
    return render(request, 'card/index.html')

def arcicles(request):
    latest_article_list = Article.objects.order_by('-pub_date')[:5]
    context = {
        'latest_article_list': latest_article_list,
    }
    return render(request, 'card/articles.html', context)

def new_article(request):
    return render(request, 'card/new_article.html')

def save_article(request):
    data = json.loads(request.body)
    try:
        article = Article(title = data["title"], text = data["text"],
                    pub_date = timezone.now(), author = request.user)
        article.save()
    except:
        print("Error.")
    return HttpResponse("Ok")

def detail(request, article_id):
    article = get_object_or_404(Article, pk=article_id)
    return render(request, 'card/detail.html', {'article': article})
    