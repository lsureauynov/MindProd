from django.urls import path, include
from rest_framework.routers import DefaultRouter
from game.views import (
    ScenarioViewSet, AccusationViewSet, CharacterViewSet,
    CharacterAttributeViewSet, ClueViewSet,
    DialogueViewSet, DiscoveredClueViewSet, PlayerViewSet,
    SessionViewSet, StoryViewSet
)

router = DefaultRouter()
router.register(r'scenarios', ScenarioViewSet)
router.register(r'accusations', AccusationViewSet)
router.register(r'characters', CharacterViewSet)
router.register(r'character-attributes', CharacterAttributeViewSet)
router.register(r'clues', ClueViewSet)
router.register(r'dialogues', DialogueViewSet)
router.register(r'discovered-clues', DiscoveredClueViewSet)
router.register(r'players', PlayerViewSet)
router.register(r'sessions', SessionViewSet)
router.register(r'stories', StoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
