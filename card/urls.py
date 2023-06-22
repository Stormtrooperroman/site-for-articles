from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('articles/', views.articles, name='articles'),
    path('new_article/', views.new_article, name='new_article'),
    path('save_article/', views.save_article, name='save_article'),
    path('delete_article/<int:article_id>', views.delete_article, name='delete_article'),
    path('edit_article/<int:article_id>', views.edit_article, name='edit_article'),
    path('update_article/<int:article_id>', views.update_article, name='update_article'),
    path('article/<int:article_id>/', views.detail, name='detail'),
]