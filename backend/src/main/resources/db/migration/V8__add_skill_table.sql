CREATE TABLE portfolio.skills
(
    id          UUID                        NOT NULL,
    category    VARCHAR(255)                NOT NULL,
    skill       VARCHAR(255)                NOT NULL,
    order_index INTEGER                     NOT NULL,
    created_at  TIMESTAMP WITHOUT TIME ZONE NOT NULL,

    CONSTRAINT pk_skills PRIMARY KEY (id),
    CONSTRAINT uc_skills_order_index UNIQUE (order_index),
    CONSTRAINT chk_skill_category CHECK ( category IN ('PROGRAMMING', 'BACKEND', 'FRONTEND', 'DATABASE', 'TESTING', 'DEVOPS', 'TOOLS') )
);