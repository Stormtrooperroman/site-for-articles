from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):
    title = models.CharField(max_length=200, unique=True)
    text = models.TextField()
    pub_date = models.DateTimeField('date published')
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    public = models.BooleanField(default = False)
    def __str__(self):
        return self.title

