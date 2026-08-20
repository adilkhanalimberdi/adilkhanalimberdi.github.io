CREATE TABLE portfolio.projects
(
    id          UUID                        NOT NULL,
    title       VARCHAR(255)                NOT NULL,
    description TEXT                        NOT NULL,
    image_url   VARCHAR(255),
    url         VARCHAR(255),
    status      VARCHAR(255)                NOT NULL,
    order_index INTEGER                     NOT NULL,
    created_at  TIMESTAMP(6) WITH TIME ZONE NOT NULL,

    CONSTRAINT pk_projects PRIMARY KEY (id),
    CONSTRAINT uc_projects_order_index UNIQUE (order_index),
    CONSTRAINT chk_project_status CHECK ( status IN ('IN_PROGRESS', 'COMPLETED') )
);