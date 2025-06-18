from django.contrib import admin
from game.models.accusation import Accusation
from game.models.dialogue import Dialogue
from game.models.character import Character, RoleCharacters
from game.models.scenario import Scenario
from game.models.character_attribute import CharacterAttribute
from game.models.characters_reveal_clue import CharactersRevealClue
from game.models.story import Story
from game.models.player import Player
from game.models.session import Session
from game.models.clue import Clue
from game.models.discovered_clue import DiscoveredClue

class AccusationAdmin(admin.ModelAdmin):
    list_display = ('id', 'session','character', 'is_correct', 'created_at')
    list_display_links = ('id','session', 'character')
    search_fields = ('session__id', 'character__name')
    list_filter = ('is_correct', 'session', 'character')

class SessionAdmin(admin.ModelAdmin):
    list_display = ('id', 'player', 'created_at', 'ended_at', 'story', 'status', 'remaining_lives')
    list_display_links = ('id','player', 'story')
    search_fields = ('id', 'player__username', 'story__title')
    list_filter = ('status', 'story')

class CharacterAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'role_id', 'is_guilty', 'story')
    list_display_links = ('id', 'name', 'role_id', 'story')
    search_fields = ('name', 'role_id', 'story__title')
    list_filter = ('role_id', 'story')

class CharacterAttributeAdmin(admin.ModelAdmin):
    list_display = ('id', 'character', 'clue')
    list_display_links = ('id', 'character', 'clue')
    search_fields = ('character__name', 'clue__description')
    list_filter = ('character', 'clue')

class CharactersRevealClueAdmin(admin.ModelAdmin):
    list_display = ('id', 'character', 'clue', 'conditions')
    list_display_links = ('id', 'character', 'clue')
    search_fields = ('character__name', 'clue__description')
    list_filter = ('character', 'clue')

class ClueAdmin(admin.ModelAdmin):
    list_display = ('id', 'description', 'image_url', 'story')
    list_display_links = ('id', 'story')
    search_fields = ('description', 'story__title')

class DialogueAdmin(admin.ModelAdmin):
    list_display = ('id', 'character', 'session', 'player', 'created_at')
    list_display_links = ('id', 'character', 'session', 'player')
    search_fields = ('character__name', 'session__id', 'player__username')
    list_filter = ('session', 'character')

class DiscoveredClueAdmin(admin.ModelAdmin):
    list_display = ('id', 'session', 'clue')
    list_display_links = ('id', 'session', 'clue')
    search_fields = ('session__id', 'clue__description')
    list_filter = ('session', 'clue')

class PlayerAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'image_url', 'user')
    list_display_links = ('id', 'username', 'user')
    search_fields = ('username', 'user__email')
    list_filter = ('user',)


class StoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'resume', 'scenario')

admin.site.register(Accusation, AccusationAdmin)
admin.site.register(Character, CharacterAdmin)
admin.site.register(CharacterAttribute, CharacterAttributeAdmin)
admin.site.register(CharactersRevealClue, CharactersRevealClueAdmin)
admin.site.register(Clue, ClueAdmin)
admin.site.register(Dialogue, DialogueAdmin)
admin.site.register(DiscoveredClue, DiscoveredClueAdmin)
admin.site.register(Player, PlayerAdmin)
admin.site.register(Scenario)
admin.site.register(Session, SessionAdmin)
admin.site.register(Story, StoryAdmin)
