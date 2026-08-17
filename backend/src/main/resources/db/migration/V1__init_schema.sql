CREATE SCHEMA IF NOT EXISTS portfolio;

CREATE TABLE portfolio.contact_messages (
    id UUID NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP(6) WITH TIME ZONE,
    PRIMARY KEY (id)
);
