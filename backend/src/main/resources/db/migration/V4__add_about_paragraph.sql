CREATE TABLE portfolio.about_paragraphs
(
    id          UUID                                    NOT NULL,
    content     TEXT                                    NOT NULL,
    order_index INTEGER                                 NOT NULL,
    created_at  TIMESTAMP(6) WITH TIME ZONE             NOT NULL,

    CONSTRAINT pk_about_paragraphs PRIMARY KEY (id),
    CONSTRAINT uc_about_paragraphs_order_index UNIQUE (order_index)
);