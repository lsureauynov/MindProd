from django.urls import path, include
from rest_framework.routers import DefaultRouter

from game.view import (
    ScenarioViewSet, AccusationViewSet, LastAccusationView,CharacterViewSet,
    CharacterAttributeViewSet, ClueViewSet,
    DialogueViewSet, DiscoveredClueViewSet, PlayerViewSet, PlayerStatsViewSet,
    SessionViewSet, StoryViewSet, CharactersRevealClueViewSet
)

router = DefaultRouter()
router.register(r'scenarios', ScenarioViewSet)
router.register(r'accusations', AccusationViewSet, basename='accusation')
router.register(r'characters', CharacterViewSet)
router.register(r'character-attributes', CharacterAttributeViewSet)
router.register(r'clues', ClueViewSet)
router.register(r'dialogues', DialogueViewSet)
router.register(r'discovered-clues', DiscoveredClueViewSet)
router.register(r'players', PlayerViewSet, basename= 'player')
router.register(r'player-stats', PlayerStatsViewSet, basename = 'player-stats')
router.register(r'sessions', SessionViewSet)
router.register(r'stories', StoryViewSet)
router.register(r'characters-reveal-clue', CharactersRevealClueViewSet)


urlpatterns = [
    path('accusations/last/', LastAccusationView.as_view(), name='last-accusation'),
    path('', include(router.urls)),
]
