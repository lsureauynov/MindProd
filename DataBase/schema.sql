CREATE TABLE auth_user
(
    id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name      VARCHAR(150) NOT NULL,
    surname   VARCHAR(150) NOT NULL,
    password  TEXT         NOT NULL,
    email     VARCHAR(254) NOT NULL UNIQUE,
    image_url TEXT         NOT NULL
);

CREATE TABLE player
(
    id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username  TEXT         NOT NULL UNIQUE,
    image_url TEXT        NOT NULL,
    user_id   UUID         NOT NULL REFERENCES auth_user(id) ON DELETE CASCADE
);

CREATE TYPE session_status AS ENUM (
    'started',
    'playing',
    'finished'
);

CREATE TABLE session
(
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id       UUID         NOT NULL REFERENCES player(id) ON DELETE CASCADE,
    created_at      DATE DEFAULT NOW(),
    ended_at        DATE DEFAULT NULL,
    story_id        UUID         NOT NULL REFERENCES story(id) ON DELETE CASCADE,
    status          session_status NOT NULL,
    remaining_lives INT NOT NULL,
    CHECK ( ended_at IS NULL OR ended_at >= created_at )
);

CREATE TABLE story
(
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title       VARCHAR(150) NOT NULL,
    resume      TEXT         NOT NULL,
    image_url   TEXT         NOT NULL,
    scenario_id UUID         NOT NULL REFERENCES scenario(id) ON DELETE CASCADE
);

CREATE TABLE scenario
(
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scenario    TEXT         NOT NULL
);

CREATE TYPE role_characters AS ENUM (
    'suspect',
    'witness'
);

CREATE TABLE characters
(
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT         NOT NULL,
    role_id     role_characters NOT NULL,
    image_url   TEXT         NOT NULL,
    is_guilty   BOOLEAN      NOT NULL,
    personality TEXT         NOT NULL,
    story_id    UUID         NOT NULL REFERENCES story(id) ON DELETE CASCADE
);

CREATE TABLE clues
(
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description TEXT NOT NULL,
    image_url   TEXT NOT NULL,
    story_id    UUID NOT NULL REFERENCES story(id) ON DELETE CASCADE
);

CREATE TABLE characters_reveal_clue
(
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    character_id UUID         NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    clue_id      UUID         NOT NULL REFERENCES clues(id) ON DELETE CASCADE,
    conditions   TEXT         NOT NULL
);

CREATE TABLE characters_attribute
(
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    character_id UUID         NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    clue_id      UUID         NOT NULL REFERENCES clues(id) ON DELETE CASCADE
);

CREATE TABLE discovered_clues
(
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id  UUID         NOT NULL REFERENCES session(id) ON DELETE CASCADE,
    clue_id     UUID         NOT NULL REFERENCES clues(id) ON DELETE CASCADE,
    UNIQUE (session_id, clue_id)
);

CREATE TABLE accusation
(
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id   UUID         NOT NULL REFERENCES session(id) ON DELETE CASCADE,
    character_id UUID         NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    created_at   DATE DEFAULT NOW(),
    is_correct   BOOLEAN      NOT NULL
);

CREATE TABLE dialogues
(
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    character_id     UUID         NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    session_id       UUID         NOT NULL REFERENCES session(id) ON DELETE CASCADE,
    player_id        UUID         NOT NULL REFERENCES player(id) ON DELETE CASCADE,
    character_answer TEXT         NOT NULL,
    player_question  TEXT         NOT NULL,
    created_at       DATE DEFAULT NOW()
);

CREATE INDEX idx_session_player ON session (session_id, player_id);

CREATE UNIQUE INDEX uq_discovered_clues ON discovered_clues (session_id, clue_id);

CREATE UNIQUE INDEX uq_active_session ON session (player_id, status)
WHERE status IN ('started', 'playing');

CREATE INDEX idx_dialogues_session_character ON dialogues (session_id, character_id);

CREATE INDEX idx_dialogues_player ON dialogues (player_id);