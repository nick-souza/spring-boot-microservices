DROP DATABASE IF EXISTS "room_db";

CREATE DATABASE "room_db" WITH OWNER = "room-root";

\c room_db;

CREATE TABLE IF NOT EXISTS public.tb_rooms
(
    room_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    room_name character varying COLLATE pg_catalog."default" NOT NULL,
    room_size integer NOT NULL,
    room_created_at date NOT NULL,
    room_last_update_at date NOT NULL,
    CONSTRAINT tb_rooms_pkey PRIMARY KEY (room_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tb_rooms OWNER to "room-root";

INSERT INTO public.tb_rooms(
    room_name, room_size, room_created_at, room_last_update_at)
VALUES ('room_1', 5, '2022-11-07', '2022-11-07');