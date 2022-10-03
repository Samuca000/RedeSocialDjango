from .models import Image
from django import forms
#Sobrescrevendo o metedo save()
from urllib import request
from django.core.files.base import ContentFile
from django.utils.text import slugify

class ImageCreatedForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ('title', 'url', 'description')
        widgets = {
            'url': forms.HiddenInput,
        }
    def clean_url(self):
        url = self.cleaned_data['url']
        valid_extensions = ['jpg', 'jpeg']
        extensions = url.rsplit('.', 1)[1].lower()
        if extensions not in valid_extensions:
            raise forms.ValidationError('The given URL Does not match valid image extensions')
        return url

    def save(self, force_insert=False,
             force_update=False,
             commit=True):
        image = super().save(commit=False)
        image_url = self.cleaned_data['url']
        name = slugify(image.title)
        extensions = image_url.rsplit('.', 1)[1].lower()
        image_name = f'{name}.{extensions}'

        #faz o dawloand da imagem a partir do url especificado
        response = request.urlopen(image_url)
        image.image.save(image_name, ContentFile(response.read()), save=False)

        if commit:
            image.save()
        return image