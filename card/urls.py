from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('articles/', views.arcicles, name='articles'),
    path('new_article/', views.new_article, name='new_article'),
    path('save_article/', views.save_article, name='save_article'),
    path('article/<int:article_id>/', views.detail, name='detail'),
]