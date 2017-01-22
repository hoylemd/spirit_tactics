from django.views.generic import TemplateView


class IndexView(TemplateView):
    template_name = 'spirit_tactics/index.html'
