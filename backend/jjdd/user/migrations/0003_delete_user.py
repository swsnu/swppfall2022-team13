# Generated by Django 4.1.1 on 2022-11-23 11:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_remove_user_nickname_user_username'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
    ]