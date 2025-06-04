from django.contrib import admin
from user.models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email','is_active', 'is_staff')
    list_display_links = ('id', 'email')
    list_filter = ('is_active', 'is_staff')

admin.site.register(User, UserAdmin)