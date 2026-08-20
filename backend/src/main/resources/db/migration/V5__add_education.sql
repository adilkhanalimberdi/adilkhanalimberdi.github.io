CREATE TABLE portfolio.education
(
    id          UUID                        NOT NULL,
    institution VARCHAR(255)                NOT NULL,
    description TEXT                        NOT NULL,
    location    VARCHAR(255)                NOT NULL,
    degree      VARCHAR(255)                NOT NULL,
    speciality  VARCHAR(255)                NOT NULL,
    start_date  VARCHAR(7)                  NOT NULL,
    end_date    VARCHAR(7),
    grade       DECIMAL,
    url         VARCHAR(255),
    order_index INTEGER                     NOT NULL,
    created_at  TIMESTAMP WITHOUT TIME ZONE NOT NULL,

    CONSTRAINT pk_education PRIMARY KEY (id),
    CONSTRAINT uc_education_order_index UNIQUE (order_index)
);