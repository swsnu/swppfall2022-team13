# Generated by Django 4.1.2 on 2022-11-14 02:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Politician',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(blank=True, null=True)),
                ('birth_date', models.TextField(blank=True, null=True)),
                ('job', models.TextField(blank=True, null=True)),
                ('political_party', models.TextField(blank=True, null=True)),
                ('election_precinct', models.TextField(blank=True, null=True)),
                ('committee', models.TextField(blank=True, null=True)),
                ('committees', models.TextField(blank=True, null=True)),
                ('reelection', models.TextField(blank=True, null=True)),
                ('election_units', models.TextField(blank=True, null=True)),
                ('email', models.TextField(blank=True, null=True)),
                ('career_summary', models.TextField(blank=True, null=True)),
                ('mona_code', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
