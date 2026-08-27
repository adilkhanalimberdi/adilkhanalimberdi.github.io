ALTER TABLE portfolio.projects
DROP CONSTRAINT chk_project_status;

ALTER TABLE portfolio.projects
ADD CONSTRAINT chk_project_status CHECK ( status IN ('IN_PROGRESS', 'COMPLETED', 'PAUSED', 'ARCHIVED') )