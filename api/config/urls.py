from django.contrib import admin
from django.urls import path

from config.views import HealthAPIView

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "api/v1/health/",
        HealthAPIView.as_view(),
        name="health-check",
    ),
]
