create table file (
  id serial PRIMARY KEY,
  title VARCHAR(255),
  secret VARCHAR(255),
  pdf_data bytea
);