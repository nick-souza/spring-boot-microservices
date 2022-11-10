DROP DATABASE IF EXISTS "user_db";

CREATE DATABASE "user_db" WITH OWNER = "user-root";

\c user_db;

CREATE TABLE IF NOT EXISTS public.tb_users
(
    user_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    user_name character varying COLLATE pg_catalog."default" NOT NULL,
    user_birth_date date,
    user_created_at date NOT NULL,
    user_last_update_at date NOT NULL,
    CONSTRAINT tb_users_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tb_users OWNER to "user-root";

INSERT INTO public.tb_users(
    user_name, user_birth_date, user_created_at, user_last_update_at)
VALUES ('user_1', '2022-11-07', '2022-11-07', '2022-11-07');