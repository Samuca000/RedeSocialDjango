from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import ImageCreatedForm
# Create your views here.
@login_required
def image_create(request):
    if request.method == 'POST':
        #formulário foi enviado
        form = ImageCreatedForm(data=request.POST)
        if form.is_valid():
            #os dados do formulário são válidados
            cd = form.cleaned_data
            new_item = form.save(commit=False)

            #Atribui o usuário atual ao item
            new_item.user = request.user
            new_item.save()
            messages.success(request, 'Image added successfully')

            #Redireciona o usuário para a view de detalhes do novo item criado
            return redirect(new_item.get_absolute_url())
    else:
        #Cria o formulário com os dados fornecidos
        #pelo bookmarklet via GET
        form = ImageCreatedForm(data=request.GET)
    return render(request,
                    'images/image/create.html', {'section': 'images',
                                                'form': form})