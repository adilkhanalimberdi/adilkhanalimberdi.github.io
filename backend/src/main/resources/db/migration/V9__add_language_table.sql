CREATE TABLE portfolio.languages
(
    id          UUID                        NOT NULL,
    language    VARCHAR(255)                NOT NULL,
    level       VARCHAR(255)                NOT NULL,
    order_index INTEGER                     NOT NULL,
    created_at  TIMESTAMP(6) WITH TIME ZONE NOT NULL,

    CONSTRAINT pk_language PRIMARY KEY (id),
    CONSTRAINT uc_language_language UNIQUE (language),
    CONSTRAINT chk_language_leve CHECK ( level IN ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'FLUENT', 'NATIVE_FLUENT', 'NATIVE') )
);