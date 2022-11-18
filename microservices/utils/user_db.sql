DROP DATABASE IF EXISTS "user_db";

CREATE DATABASE "user_db" WITH OWNER = "user-root";

\c user_db;

CREATE TABLE IF NOT EXISTS public.tb_users
(
    user_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    user_name character varying COLLATE pg_catalog."default" NOT NULL,
    user_created_at timestamp without time zone NOT NULL,
    user_last_update_at timestamp without time zone NOT NULL,
    user_lastname character varying COLLATE pg_catalog."default",
    user_email character varying COLLATE pg_catalog."default" NOT NULL,
    user_status integer NOT NULL,
    user_role integer NOT NULL,
    user_verified_at timestamp without time zone,
    CONSTRAINT tb_users_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tb_users OWNER to "user-root";

INSERT INTO public.tb_users(
    user_name, user_created_at, user_last_update_at, user_lastname, user_email, user_status, user_role)
VALUES ('user_1', '2022-11-13 17:49:02', '2022-11-13 17:49:02', 'last_name', 'email@email.com', 1, 1);