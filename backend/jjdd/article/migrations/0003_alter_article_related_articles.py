# Generated by Django 4.1.1 on 2022-12-11 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0002_article_related_articles'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='related_articles',
            field=models.TextField(default='[]', null=True),
        ),
    ]
