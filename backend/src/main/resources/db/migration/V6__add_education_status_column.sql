ALTER TABLE portfolio.education ADD COLUMN status VARCHAR(50) DEFAULT 'COMPLETED';

ALTER TABLE portfolio.education
ADD CONSTRAINT chk_education_status
CHECK ( status IN ('IN_PROGRESS', 'COMPLETED') );

ALTER TABLE portfolio.education ALTER COLUMN status SET NOT NULL;