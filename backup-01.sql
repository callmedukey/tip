--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: countries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    name character varying NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.countries_id_seq OWNED BY public.countries.id;


--
-- Name: experiences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.experiences (
    id integer NOT NULL,
    en_title character varying NOT NULL,
    kr_title character varying NOT NULL,
    slug character varying,
    en_keywords character varying NOT NULL,
    kr_keywords character varying NOT NULL,
    en_content jsonb NOT NULL,
    kr_content jsonb NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: experiences_bottom_carousel; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.experiences_bottom_carousel (
    id integer NOT NULL,
    en_title character varying NOT NULL,
    kr_title character varying NOT NULL,
    en_subtext character varying NOT NULL,
    kr_subtext character varying NOT NULL,
    link character varying NOT NULL,
    "order" numeric NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: experiences_bottom_carousel_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.experiences_bottom_carousel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: experiences_bottom_carousel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.experiences_bottom_carousel_id_seq OWNED BY public.experiences_bottom_carousel.id;


--
-- Name: experiences_bottom_carousel_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.experiences_bottom_carousel_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    media_id integer
);


--
-- Name: experiences_bottom_carousel_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.experiences_bottom_carousel_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: experiences_bottom_carousel_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.experiences_bottom_carousel_rels_id_seq OWNED BY public.experiences_bottom_carousel_rels.id;


--
-- Name: experiences_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.experiences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: experiences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.experiences_id_seq OWNED BY public.experiences.id;


--
-- Name: experiences_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.experiences_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    countries_id integer,
    media_id integer
);


--
-- Name: experiences_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.experiences_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: experiences_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.experiences_rels_id_seq OWNED BY public.experiences_rels.id;


--
-- Name: experiences_top_carousel; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.experiences_top_carousel (
    id integer NOT NULL,
    en_title character varying NOT NULL,
    kr_title character varying NOT NULL,
    en_subtext character varying NOT NULL,
    kr_subtext character varying NOT NULL,
    link character varying NOT NULL,
    "order" numeric NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: experiences_top_carousel_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.experiences_top_carousel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: experiences_top_carousel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.experiences_top_carousel_id_seq OWNED BY public.experiences_top_carousel.id;


--
-- Name: experiences_top_carousel_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.experiences_top_carousel_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    media_id integer
);


--
-- Name: experiences_top_carousel_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.experiences_top_carousel_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: experiences_top_carousel_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.experiences_top_carousel_rels_id_seq OWNED BY public.experiences_top_carousel_rels.id;


--
-- Name: media; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media (
    id integer NOT NULL,
    en_alt character varying,
    kr_alt character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric
);


--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- Name: partner_hotels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.partner_hotels (
    id integer NOT NULL,
    en_title character varying NOT NULL,
    kr_title character varying NOT NULL,
    slug character varying,
    en_keywords character varying NOT NULL,
    kr_keywords character varying NOT NULL,
    en_content jsonb NOT NULL,
    kr_content jsonb NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: partner_hotels_carousel; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.partner_hotels_carousel (
    id integer NOT NULL,
    en_title character varying NOT NULL,
    kr_title character varying NOT NULL,
    en_subtext character varying NOT NULL,
    kr_subtext character varying NOT NULL,
    link character varying NOT NULL,
    "order" numeric NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: partner_hotels_carousel_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.partner_hotels_carousel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: partner_hotels_carousel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.partner_hotels_carousel_id_seq OWNED BY public.partner_hotels_carousel.id;


--
-- Name: partner_hotels_carousel_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.partner_hotels_carousel_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    media_id integer
);


--
-- Name: partner_hotels_carousel_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.partner_hotels_carousel_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: partner_hotels_carousel_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.partner_hotels_carousel_rels_id_seq OWNED BY public.partner_hotels_carousel_rels.id;


--
-- Name: partner_hotels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.partner_hotels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: partner_hotels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.partner_hotels_id_seq OWNED BY public.partner_hotels.id;


--
-- Name: partner_hotels_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.partner_hotels_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    countries_id integer,
    media_id integer
);


--
-- Name: partner_hotels_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.partner_hotels_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: partner_hotels_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.partner_hotels_rels_id_seq OWNED BY public.partner_hotels_rels.id;


--
-- Name: payload_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_migrations (
    id integer NOT NULL,
    name character varying,
    batch numeric,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_migrations_id_seq OWNED BY public.payload_migrations.id;


--
-- Name: payload_preferences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_preferences (
    id integer NOT NULL,
    key character varying,
    value jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_preferences_id_seq OWNED BY public.payload_preferences.id;


--
-- Name: payload_preferences_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_preferences_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer
);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_preferences_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNED BY public.payload_preferences_rels.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    email character varying NOT NULL,
    reset_password_token character varying,
    reset_password_expiration timestamp(3) with time zone,
    salt character varying,
    hash character varying,
    login_attempts numeric,
    lock_until timestamp(3) with time zone
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: countries id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.countries ALTER COLUMN id SET DEFAULT nextval('public.countries_id_seq'::regclass);


--
-- Name: experiences id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences ALTER COLUMN id SET DEFAULT nextval('public.experiences_id_seq'::regclass);


--
-- Name: experiences_bottom_carousel id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences_bottom_carousel ALTER COLUMN id SET DEFAULT nextval('public.experiences_bottom_carousel_id_seq'::regclass);


--
-- Name: experiences_bottom_carousel_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences_bottom_carousel_rels ALTER COLUMN id SET DEFAULT nextval('public.experiences_bottom_carousel_rels_id_seq'::regclass);


--
-- Name: experiences_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences_rels ALTER COLUMN id SET DEFAULT nextval('public.experiences_rels_id_seq'::regclass);


--
-- Name: experiences_top_carousel id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences_top_carousel ALTER COLUMN id SET DEFAULT nextval('public.experiences_top_carousel_id_seq'::regclass);


--
-- Name: experiences_top_carousel_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences_top_carousel_rels ALTER COLUMN id SET DEFAULT nextval('public.experiences_top_carousel_rels_id_seq'::regclass);


--
-- Name: media id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- Name: partner_hotels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.partner_hotels ALTER COLUMN id SET DEFAULT nextval('public.partner_hotels_id_seq'::regclass);


--
-- Name: partner_hotels_carousel id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.partner_hotels_carousel ALTER COLUMN id SET DEFAULT nextval('public.partner_hotels_carousel_id_seq'::regclass);


--
-- Name: partner_hotels_carousel_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.partner_hotels_carousel_rels ALTER COLUMN id SET DEFAULT nextval('public.partner_hotels_carousel_rels_id_seq'::regclass);


--
-- Name: partner_hotels_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.partner_hotels_rels ALTER COLUMN id SET DEFAULT nextval('public.partner_hotels_rels_id_seq'::regclass);


--
-- Name: payload_migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_migrations ALTER COLUMN id SET DEFAULT nextval('public.payload_migrations_id_seq'::regclass);


--
-- Name: payload_preferences id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_id_seq'::regclass);


--
-- Name: payload_preferences_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_rels_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.countries (id, name, updated_at, created_at) FROM stdin;
2	Sweden	2024-11-04 16:29:47.82+00	2024-11-04 16:12:57.995+00
4	Italy 🇮🇹	2024-11-17 00:59:53.51+00	2024-11-16 21:33:42.116+00
1	France 🇫🇷	2024-11-17 01:00:17.66+00	2024-11-04 15:41:44.265+00
3	Sweden 🇸🇪	2024-11-17 01:00:28.185+00	2024-11-04 16:13:42.697+00
6	UK 🇬🇧	2024-11-17 01:29:49.148+00	2024-11-17 01:29:49.148+00
7	Spain 🇪🇸	2024-11-17 02:09:18.523+00	2024-11-17 02:09:18.523+00
8	China 🇨🇳	2024-11-17 02:14:51.265+00	2024-11-17 02:14:51.265+00
9	Korea 🇰🇷	2024-11-17 02:28:05.931+00	2024-11-17 02:28:05.931+00
10	Japan 🇯🇵	2024-11-17 02:33:28.712+00	2024-11-17 02:33:28.712+00
11	Monaco 🇲🇨	2024-11-17 02:57:50.59+00	2024-11-17 02:57:50.59+00
12	Malaysia 🇲🇾	2024-11-17 03:07:06.56+00	2024-11-17 03:07:06.56+00
13	USA 🇺🇸	2024-11-17 11:46:34.832+00	2024-11-17 11:46:34.832+00
5	Swiss 🇨🇭	2024-11-17 11:49:00.423+00	2024-11-17 00:51:31.626+00
14	Dubai 🇦🇪	2024-11-17 15:56:01.323+00	2024-11-17 15:56:01.323+00
15	Indonesia 🇮🇩	2024-11-17 16:11:25.545+00	2024-11-17 16:11:25.545+00
16	Hong Kong 🇭🇰	2024-11-17 16:22:18.294+00	2024-11-17 16:22:18.294+00
17	Singapore 🇸🇬	2024-11-17 16:32:55.59+00	2024-11-17 16:32:55.59+00
18	Vietnam 🇻🇳	2024-11-17 16:37:06.277+00	2024-11-17 16:37:06.277+00
19	Philippines 🇵🇭	2024-11-17 16:40:59.638+00	2024-11-17 16:40:59.638+00
20	All around the world 🌏	2024-11-27 12:07:20.679+00	2024-11-27 11:48:53.416+00
21	Europe 🌏	2024-11-27 14:52:20.37+00	2024-11-27 14:52:20.37+00
\.


--
-- Data for Name: experiences; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.experiences (id, en_title, kr_title, slug, en_keywords, kr_keywords, en_content, kr_content, updated_at, created_at) FROM stdin;
1	Art gallery tour 	아트 갤러리 투어 	art-gallery-tour-	paris art gallery tour, paris art gallery, art gallery	파리 아트 갤러리, 아트갤러리, 파리 갤러리, 파리 갤러리투어	[{"children": [{"text": "If you are fan of Art gallery, You're so welcome with this private gallery tour."}]}]	[{"type": "upload", "value": {"id": 125}, "children": [{"text": " "}], "relationTo": "media"}, {"children": [{"text": ""}]}, {"type": "upload", "value": {"id": 126}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}, {"type": "upload", "value": {"id": 127}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}]	2024-11-17 01:49:19.058+00	2024-11-17 00:50:49.573+00
2	For Golf lover - Private golf travel 	골프를 사랑하는 분들을 위한 특별한 골프 여행	golf-tour	Golf, golftour, golf tour, golf travel, golf private tour, golf traveller, golf tour guide, luxury golf tour	골프, 골프투어, 골프여행, 골프프라이빗투어, 골프프라이빗여행, 골프여행, 골프, 럭셔리골프투어, 럭셔리 골프 투어, 럭셔리 골프 여행, 프라이빗 골프 투어	[{"type": "upload", "value": {"id": 187}, "children": [{"text": ""}], "relationTo": "media"}, {"type": "upload", "value": {"id": 193}, "children": [{"text": ""}], "relationTo": "media"}, {"type": "upload", "value": {"id": 195}, "children": [{"text": ""}], "relationTo": "media"}, {"type": "upload", "value": {"id": 199}, "children": [{"text": ""}], "relationTo": "media"}, {"type": "upload", "value": {"id": 197}, "children": [{"text": ""}], "relationTo": "media"}, {"type": "upload", "value": {"id": 192}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}]	[{"type": "upload", "value": {"id": 174}, "children": [{"text": ""}], "relationTo": "media"}, {"type": "upload", "value": {"id": 175}, "children": [{"text": ""}], "relationTo": "media"}, {"type": "upload", "value": {"id": 176}, "children": [{"text": ""}], "relationTo": "media"}, {"type": "upload", "value": {"id": 177}, "children": [{"text": ""}], "relationTo": "media"}, {"type": "upload", "value": {"id": 178}, "children": [{"text": ""}], "relationTo": "media"}, {"type": "upload", "value": {"id": 179}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}]	2024-11-27 19:42:00.107+00	2024-11-27 11:42:16.47+00
4	Luxury Cruise trip in Europe	럭셔리 유럽 크루즈 여행	luxury-cruise-trip-in-europe	luxury travel, luxury cruise, cruise, europe cruise, cruise travel, cruise trip, luxury travel, travel, luxury travel, cruise, cruise europe, aurora cruise, norway cruise	노르웨이 크루즈, 포낭 크루즈, 럭셔리 여행, 럭셔리 트립, 유럽 크루즈, 노르웨이 오로라 크루즈, 크루즈여행, 크루즈, 럭셔리 크루즈 여행, 은퇴여행	[{"children": [{"text": "0"}]}]	[{"children": [{"text": "0"}]}]	2024-11-27 17:09:31.074+00	2024-11-27 17:08:22.589+00
3	🌿 Healing Private Package 🌿 For those who need a little rest and rejuvenation !	힐링 프라이빗 패키지, 지친 여러분들을 위한 힐링 패키지	-healing-private-package--for-those-who-need-a-little-rest-and-rejuvenation-	healingtravel, healingprivatepackage, healingtrip, Healing Retreat, wellness resort, wellness travel, wellness trip, private travel package	힐링 여행, 힐링 프라이빗 패키지, 힐링트립, 웰니스여행, 럭셔리여행, 럭셔리 리조트, 럭셔리 힐링 여행, 럭셔리 스파여행, 스파여행, 동남아 스파 여행, 유럽 스파여행	[{"type": "upload", "value": {"id": 208}, "children": [{"text": ""}], "relationTo": "media"}, {"type": "upload", "value": {"id": 215}, "children": [{"text": ""}], "relationTo": "media"}, {"type": "upload", "value": {"id": 216}, "children": [{"text": " "}], "relationTo": "media"}, {"type": "upload", "value": {"id": 217}, "children": [{"text": ""}], "relationTo": "media"}, {"type": "upload", "value": {"id": 218}, "children": [{"text": ""}], "relationTo": "media"}, {"type": "upload", "value": {"id": 220}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}]	[{"type": "upload", "value": {"id": 201}, "children": [{"text": ""}], "relationTo": "media"}, {"type": "upload", "value": {"id": 202}, "children": [{"text": ""}], "relationTo": "media"}, {"type": "upload", "value": {"id": 203}, "children": [{"text": " "}], "relationTo": "media"}, {"type": "upload", "value": {"id": 204}, "children": [{"text": ""}], "relationTo": "media"}, {"type": "upload", "value": {"id": 205}, "children": [{"text": " "}], "relationTo": "media"}, {"type": "upload", "value": {"id": 221}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}]	2024-11-28 19:27:21.495+00	2024-11-27 14:51:36.031+00
\.


--
-- Data for Name: experiences_bottom_carousel; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.experiences_bottom_carousel (id, en_title, kr_title, en_subtext, kr_subtext, link, "order", updated_at, created_at) FROM stdin;
1	Art gallery tour 	아트 갤러리 투어 	파리 Art gallery tour	파리 아트 갤러리 투어 	https://travelinyourpocket.com/ko/experience-by-tip/art-gallery-tour	-1	2024-11-27 15:06:25.516+00	2024-11-17 00:56:49.318+00
\.


--
-- Data for Name: experiences_bottom_carousel_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.experiences_bottom_carousel_rels (id, "order", parent_id, path, media_id) FROM stdin;
11	\N	1	leftThumbnail	117
12	\N	1	rightThumbnail	118
\.


--
-- Data for Name: experiences_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.experiences_rels (id, "order", parent_id, path, countries_id, media_id) FROM stdin;
63	1	2	country	20	\N
64	\N	2	thumbnail	\N	172
15	1	1	country	1	\N
16	\N	1	thumbnail	\N	116
83	1	3	country	20	\N
84	\N	3	thumbnail	\N	173
55	1	4	country	21	\N
56	\N	4	thumbnail	\N	200
\.


--
-- Data for Name: experiences_top_carousel; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.experiences_top_carousel (id, en_title, kr_title, en_subtext, kr_subtext, link, "order", updated_at, created_at) FROM stdin;
1	Paris Champagne Tour	파리 샴페인 투어	One and only experience for Champagne lovers	전세계 한곳 뿐인 샴파뉴에서의 샴페인 투어.	/api/experiences/1?locale=undefined&draft=false&depth=1	0	2024-11-27 12:20:10.368+00	2024-11-09 16:35:40.409+00
\.


--
-- Data for Name: experiences_top_carousel_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.experiences_top_carousel_rels (id, "order", parent_id, path, media_id) FROM stdin;
5	\N	1	thumbnail	2
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media (id, en_alt, kr_alt, updated_at, created_at, url, filename, mime_type, filesize, width, height, focal_x, focal_y) FROM stdin;
1	\N	\N	2024-11-04 15:35:28.369+00	2024-11-04 15:35:28.369+00	\N	Capture dâeÌcran 2024-11-04 aÌ 16.35.05.png	image/png	751141	792	590	50	50
3	\N	\N	2024-11-10 18:04:00.172+00	2024-11-10 18:04:00.172+00	\N	ritz paris.jpg	image/jpeg	298083	1200	969	50	50
4	\N	\N	2024-11-10 18:14:32.975+00	2024-11-10 18:14:32.975+00	\N	bulgari paris	image/jpeg	176240	1200	1301	50	50
5	\N	\N	2024-11-10 18:16:40.91+00	2024-11-10 18:16:40.91+00	\N	shangri-la paris	image/jpeg	413171	1200	1301	50	50
6	\N	\N	2024-11-10 18:17:24.56+00	2024-11-10 18:17:24.56+00	\N	shangri-la paris-1.shangri-la paris	image/jpeg	342181	1200	1301	50	50
7	\N	\N	2024-11-10 18:24:43.902+00	2024-11-10 18:24:43.902+00	\N	peninsula paris	image/jpeg	397560	1200	1301	50	50
8	\N	\N	2024-11-10 18:29:21.925+00	2024-11-10 18:29:21.925+00	\N	four seasons george v	image/jpeg	201724	1200	969	50	50
9	\N	\N	2024-11-10 18:33:47.697+00	2024-11-10 18:33:47.697+00	\N	cheval blanc paris	image/jpeg	291461	1200	969	50	50
10	\N	\N	2024-11-10 18:42:19.628+00	2024-11-10 18:42:19.628+00	\N	park hyatt paris vendome	image/jpeg	348616	1200	1301	50	50
11	\N	\N	2024-11-10 18:47:29.215+00	2024-11-10 18:47:29.215+00	\N	prince de galles paris	image/jpeg	156043	1200	1301	50	50
12	\N	\N	2024-11-10 18:53:42.785+00	2024-11-10 18:53:42.785+00	\N	hotel madame reve	image/jpeg	515471	1200	1301	50	50
13	\N	\N	2024-11-10 19:19:54.032+00	2024-11-10 19:19:54.032+00	\N	hotel de crillon	image/jpeg	282622	1200	1301	50	50
14	\N	\N	2024-11-10 19:25:28.142+00	2024-11-10 19:25:28.142+00	\N	hotel plaza athenee	image/jpeg	157562	1200	1301	50	50
15	\N	\N	2024-11-10 19:26:22.46+00	2024-11-10 19:26:22.46+00	\N	hotel plaza athenee-1.hotel plaza athenee	image/jpeg	298619	1200	1301	50	50
16	\N	\N	2024-11-10 19:32:10.128+00	2024-11-10 19:32:10.128+00	\N	hotel westminster	image/jpeg	423331	1200	1301	50	50
17	\N	\N	2024-11-10 19:34:27.421+00	2024-11-10 19:34:27.421+00	\N	hotel mayfair paris	image/jpeg	194229	1200	969	50	50
18	\N	\N	2024-11-10 19:39:02.437+00	2024-11-10 19:39:02.437+00	\N	Hotel Dress Code.webp	image/webp	46890	1300	867	50	50
19	\N	\N	2024-11-10 19:43:24.032+00	2024-11-10 19:43:24.032+00	\N	TOO Hotel Paris	image/jpeg	268756	2048	1536	50	50
20	\N	\N	2024-11-10 19:48:25.209+00	2024-11-10 19:48:25.209+00	\N	Le meurice	image/jpeg	331035	1200	1301	50	50
21	\N	\N	2024-11-10 19:56:06.044+00	2024-11-10 19:56:06.044+00	\N	maison albar hotel	image/png	1944020	1412	1004	50	50
22	\N	\N	2024-11-10 19:58:34.008+00	2024-11-10 19:58:34.008+00	\N	kimpton St HonorÃ©	image/jpeg	181844	1200	1301	50	50
23	\N	\N	2024-11-10 20:07:50.85+00	2024-11-10 20:07:50.85+00	\N	hotel relais christine	image/jpeg	345666	1200	1301	50	50
24	\N	\N	2024-11-10 20:12:07.346+00	2024-11-10 20:12:07.346+00	\N	ritz paris-1.jpg	image/jpeg	336961	1200	969	50	50
25	\N	\N	2024-11-10 20:12:17.155+00	2024-11-10 20:12:17.155+00	\N	saint james paris	image/jpeg	336961	1200	969	50	50
26	\N	\N	2024-11-10 20:17:01.403+00	2024-11-10 20:17:01.403+00	\N	chateau des fleurs	image/jpeg	222747	1200	969	50	50
27	\N	\N	2024-11-10 20:21:24.915+00	2024-11-10 20:21:24.915+00	\N	M Social Paris	image/jpeg	243288	1200	969	50	50
28	\N	\N	2024-11-10 20:24:28.414+00	2024-11-10 20:24:28.414+00	\N	castille paris	image/jpeg	246626	1200	969	50	50
29	\N	\N	2024-11-10 20:30:24.351+00	2024-11-10 20:30:24.351+00	\N	norman paris hotel	image/jpeg	401125	1200	969	50	50
30	\N	\N	2024-11-11 01:10:49.16+00	2024-11-11 01:10:49.16+00	\N	le-bristol-paris-suite-imperiale-250-claire-cocano_hd2.jpg	image/jpeg	157062	1024	675	50	50
31	\N	\N	2024-11-11 01:25:16.327+00	2024-11-11 01:25:16.327+00	\N	DELANO_PARIS_15609_V4-compressed.webp	image/webp	64420	761	750	50	50
32	\N	\N	2024-11-11 01:37:47.343+00	2024-11-11 01:37:47.343+00	\N	áá³áá³ááµá«áá£áº 2024-11-11 02.37.24.png	image/png	5706161	2050	1558	50	50
33	\N	\N	2024-11-11 01:44:57.209+00	2024-11-11 01:44:57.209+00	\N	Zgbi88t2UUcvBRxO_1.LGC-MarquisdeFouquet-Chambre.jpeg	image/jpeg	1249425	3840	2560	50	50
34	\N	\N	2024-11-11 14:03:54.999+00	2024-11-11 14:03:54.999+00	\N	ritz%20paris.jpeg	image/jpeg	286713	969	969	50	50
35	\N	\N	2024-11-11 14:04:27.861+00	2024-11-11 14:04:27.861+00	\N	ritz paris	image/jpeg	286713	969	969	50	50
36	\N	\N	2024-11-11 14:05:34.763+00	2024-11-11 14:05:34.763+00	\N	bulgari paris-1.bulgari paris	image/jpeg	240372	1200	1200	50	50
37	\N	\N	2024-11-11 14:06:24.881+00	2024-11-11 14:06:24.881+00	\N	shangri-la paris-2.shangri-la paris	image/jpeg	380342	1200	1200	50	50
38	\N	\N	2024-11-11 14:07:20.057+00	2024-11-11 14:07:20.057+00	\N	peninsula%20paris.jpeg	image/jpeg	442056	1200	1200	50	50
39	\N	\N	2024-11-11 14:07:46.497+00	2024-11-11 14:07:46.497+00	\N	peninsula paris-1.peninsula paris	image/jpeg	442056	1200	1200	50	50
40	\N	\N	2024-11-11 14:08:32.706+00	2024-11-11 14:08:32.706+00	\N	four seasons	image/jpeg	192711	969	969	50	50
41	\N	\N	2024-11-11 14:09:28.551+00	2024-11-11 14:09:28.551+00	\N	cheval blanc paris-1.cheval blanc paris	image/jpeg	273270	969	969	50	50
42	\N	\N	2024-11-11 14:10:13.938+00	2024-11-11 14:10:13.938+00	\N	park hyatt paris	image/jpeg	422223	1200	1200	50	50
43	\N	\N	2024-11-11 14:11:06.018+00	2024-11-11 14:11:06.018+00	\N	princedegalles	image/jpeg	214171	1200	1200	50	50
44	\N	\N	2024-11-11 14:11:50.886+00	2024-11-11 14:11:50.886+00	\N	hotelmadamereve	image/jpeg	578205	1200	1200	50	50
45	\N	\N	2024-11-11 14:12:31.578+00	2024-11-11 14:12:31.578+00	\N	hoteldecrillon	image/jpeg	310677	1200	1200	50	50
46	\N	\N	2024-11-11 14:13:20.681+00	2024-11-11 14:13:20.681+00	\N	hotelplazaathenee	image/jpeg	328060	1200	1200	50	50
47	\N	\N	2024-11-11 14:14:14.923+00	2024-11-11 14:14:14.923+00	\N	hotelwestminster	image/jpeg	447739	1200	1200	50	50
48	\N	\N	2024-11-11 14:14:56.274+00	2024-11-11 14:14:56.274+00	\N	hotelmayfair	image/jpeg	195163	969	969	50	50
49	\N	\N	2024-11-11 14:16:12.29+00	2024-11-11 14:16:12.29+00	\N	Hotel Dress Code	image/jpeg	115394	867	867	50	50
50	\N	\N	2024-11-11 14:16:30.417+00	2024-11-11 14:16:30.417+00	\N	TOO Hotel Paris-1.TOO Hotel Paris	image/jpeg	305662	1536	1536	50	50
51	\N	\N	2024-11-11 14:18:22.563+00	2024-11-11 14:18:22.563+00	\N	Le Meurice	image/jpeg	380546	1200	1200	50	50
52	\N	\N	2024-11-11 14:18:41.352+00	2024-11-11 14:18:41.352+00	\N	Maison Albar Paris	image/jpeg	176151	1004	1004	50	50
53	\N	\N	2024-11-11 14:19:10.949+00	2024-11-11 14:19:10.949+00	\N	Kimpton St HonorÃ©	image/jpeg	225110	1200	1200	50	50
54	\N	\N	2024-11-11 14:19:32.726+00	2024-11-11 14:19:32.726+00	\N	Hotel Relais Christine	image/jpeg	389113	1200	1200	50	50
55	\N	\N	2024-11-11 14:21:52.716+00	2024-11-11 14:21:52.716+00	\N	Saint James Paris	image/jpeg	342078	969	969	50	50
56	\N	\N	2024-11-11 14:22:12.844+00	2024-11-11 14:22:12.844+00	\N	Chateau des fleurs	image/jpeg	218848	969	969	50	50
57	\N	\N	2024-11-11 14:22:31.871+00	2024-11-11 14:22:31.871+00	\N	M Social Paris-1.M Social Paris	image/jpeg	236161	969	969	50	50
58	\N	\N	2024-11-11 14:22:50.512+00	2024-11-11 14:22:50.512+00	\N	Castille Paris	image/jpeg	228523	969	969	50	50
59	\N	\N	2024-11-11 14:24:00.59+00	2024-11-11 14:24:00.59+00	\N	Norman Paris	image/jpeg	401449	969	969	50	50
60	\N	\N	2024-11-11 14:26:45.65+00	2024-11-11 14:26:45.65+00	\N	prince de galles	image/jpeg	169219	751	751	50	50
61	\N	\N	2024-11-11 14:29:47.749+00	2024-11-11 14:29:47.749+00	\N	bulgari hotel paris	image/jpeg	179158	800	800	50	50
62	\N	\N	2024-11-11 18:42:33.939+00	2024-11-11 18:42:33.939+00	\N	le-bristol-paris-suite-imperiale-250-claire-cocano_hd2-1.jpg	image/jpeg	77634	675	675	50	50
63	\N	\N	2024-11-11 18:44:37.82+00	2024-11-11 18:44:37.82+00	\N	DELANO_PARIS_15609_V4-compressed-1.webp	image/webp	63644	750	750	50	50
64	\N	\N	2024-11-11 18:45:32.069+00	2024-11-11 18:45:32.069+00	\N	Zgbi88t2UUcvBRxO_1.LGC-MarquisdeFouquet-Chambre-1.jpeg	image/jpeg	1030278	2560	2560	50	50
65	\N	\N	2024-11-11 20:05:28.064+00	2024-11-11 20:05:28.064+00	\N	áá®á¯áá¡ááµ.jpeg	image/jpeg	226839	966	1717	50	50
66	Greece hotel, Greece luxury hotel	그리스 호텔, 그리스 럭셔리 호텔	2024-11-12 19:34:51.207+00	2024-11-12 19:34:51.207+00	\N	TRG_4637 (1).jpg	image/jpeg	8929647	5955	3996	50	50
67	Greece hotel, Greece luxury hotel, Andronis hotel	그리스 호텔, 그리스 럭셔리 호텔, 안드로니스 호텔	2024-11-12 19:35:23.166+00	2024-11-12 19:35:23.166+00	\N	TRG_2264-Edit.jpg	image/jpeg	21823791	8256	5504	50	50
68	Greece hotel, Greece luxury hotel, Andronis hotel	그리스 호텔, 그리스 럭셔리 호텔, 안드로니스 호텔	2024-11-12 19:35:34.229+00	2024-11-12 19:35:34.229+00	\N	minois_66602-scaled.jpg.webp	image/webp	346890	2560	1708	50	50
69	Greece hotel, Greece luxury hotel, Andronis hotel	그리스 호텔, 그리스 럭셔리 호텔	2024-11-12 19:37:38.045+00	2024-11-12 19:37:38.045+00	\N	Studio Panorama - SO Paris.jpg	image/jpeg	275740	1688	1125	50	50
70	Greece hotel, Greece luxury hotel, Andronis hotel	그리스 호텔, 그리스 럭셔리 호텔	2024-11-12 19:37:47.994+00	2024-11-12 19:37:47.994+00	\N	Room Iconic - Paris Skyline - Hotel SO Paris.jpg	image/jpeg	1857843	2067	1378	50	50
71	pretty	그리스 호텔, 그리스 럭셔리 호텔	2024-11-12 19:37:58.275+00	2024-11-12 19:37:58.275+00	\N	BONNIE Restaurant Rooftop - Hotel SO Paris.jpg	image/jpeg	563130	1688	1125	50	50
72	\N	\N	2024-11-16 21:29:00.311+00	2024-11-16 21:29:00.311+00	\N	1.jpeg	image/jpeg	528796	1200	1200	50	50
73	\N	\N	2024-11-16 21:31:11.31+00	2024-11-16 21:31:11.31+00	\N	l'apogÃ©e courchevelle	image/jpeg	528796	1200	1200	50	50
74	\N	\N	2024-11-16 21:36:34.618+00	2024-11-16 21:36:34.618+00	\N	Bulgari Hotel Roma	image/jpeg	64183	480	480	50	50
75	\N	\N	2024-11-16 21:42:27.114+00	2024-11-16 21:42:27.114+00	\N	Hotel Passalacqua	image/jpeg	173378	950	950	50	50
76	\N	\N	2024-11-16 21:45:05.013+00	2024-11-16 21:45:05.013+00	\N	Grand Hotel Tremezzo	image/jpeg	319379	1200	1200	50	50
77	\N	\N	2024-11-17 00:02:23.378+00	2024-11-17 00:02:23.378+00	\N	áá³áá³ááµá«áá£áº 2024-11-17 01.01.27.png	image/png	5039016	1590	1590	50	50
78	\N	\N	2024-11-17 00:10:19.733+00	2024-11-17 00:10:19.733+00	\N	áá³áá³ááµá«áá£áº 2024-11-17 01.01.27-1.png	image/png	5036440	1590	1590	50	50
111	\N	\N	2024-11-17 00:20:58.713+00	2024-11-17 00:20:58.713+00	\N	áá³áá³ááµá«áá£áº 2024-11-17 01.19.13.png	image/png	4008413	1590	1590	50	50
112	\N	\N	2024-11-17 00:21:21.878+00	2024-11-17 00:21:21.878+00	\N	áá³áá³ááµá«áá£áº 2024-11-17 01.19.13-1.png	image/png	4188406	1590	1590	50	50
113	\N	\N	2024-11-17 00:28:36.914+00	2024-11-17 00:28:36.914+00	\N	29_Signature_Suite_Bedroom_1400x933.jpg	image/jpeg	121717	687	687	50	50
114	\N	\N	2024-11-17 00:36:57.04+00	2024-11-17 00:36:57.04+00	\N	1377927056.webp	image/webp	40654	500	500	50	50
115	\N	\N	2024-11-17 00:47:09.251+00	2024-11-17 00:47:09.251+00	\N	hotel-eden-prestige-room-view-lifestyle-dorchester-collection.webp	image/webp	22948	412	402	50	50
116	Art gallery	아트 갤러리	2024-11-17 00:48:33.631+00	2024-11-17 00:48:33.631+00	\N	Brown Modern Interior Living Room Gallery Wall Art Poster Frame Mockup Instagram Post.jpg	image/jpeg	162056	1080	1080	50	50
117	Art gallery tour in Paris	파리 아트 갤러리 투어 	2024-11-17 00:52:49.898+00	2024-11-17 00:52:49.898+00	\N	Brown Modern Interior Living Room Gallery Wall Art Poster Frame Mockup Instagram Post-1.jpg	image/jpeg	162056	1080	1080	50	50
118	Art gallery tour in Paris	파리 아트 갤러리 투어 	2024-11-17 00:56:16.617+00	2024-11-17 00:56:16.617+00	\N	Brown Modern Interior Living Room Gallery Wall Art Poster Frame Mockup Instagram Post.png	image/png	1425874	1080	1080	50	50
119	\N	\N	2024-11-17 01:02:03.344+00	2024-11-17 01:02:03.344+00	\N	277319209_492688205725991_938144862877357699_n.webp	image/webp	285970	1080	1080	50	50
120	\N	\N	2024-11-17 01:15:08.919+00	2024-11-17 01:10:15.763+00	/media/áá³áá³ááµá«áá£áº 2024-11-17 02.09.47.png	áá³áá³ááµá«áá£áº 2024-11-17 02.09.47.png	image/png	2703466	1240	1240	50	50
121	\N	\N	2024-11-17 01:17:12.931+00	2024-11-17 01:17:12.931+00	\N	áá³áá³ááµá«áá£áº 2024-11-17 02.16.39.png	image/png	5174255	1562	1562	50	50
122	\N	\N	2024-11-17 01:34:39.945+00	2024-11-17 01:34:39.945+00	\N	5a99d8ac.webp	image/webp	69856	677	677	50	50
123	파리 갤러리 투어 by PARIS CLASS	Paris gallery tour by Paris Class	2024-11-17 01:39:07.061+00	2024-11-17 01:39:07.061+00	\N	áá³áá³ááµá«áá£áº 2024-11-17 02.38.35.png	image/png	538618	754	1118	50	50
124	\N	\N	2024-11-17 01:42:25.132+00	2024-11-17 01:42:25.132+00	\N	áá³áá³ááµá«áá£áº 2024-11-17 02.42.02.png	image/png	1915859	930	930	50	50
125	파리 갤러리 투어 by PARIS CLASS	Paris gallery tour by Paris Class	2024-11-17 01:45:32.778+00	2024-11-17 01:45:32.778+00	\N	áá³áá³ááµá«áá£áº 2024-11-17 02.44.26.png	image/png	3910304	3010	1192	50	50
126	파리 갤러리 투어 by PARIS CLASS	Paris gallery tour by Paris Class	2024-11-17 01:45:51.739+00	2024-11-17 01:45:51.739+00	\N	áá³áá³ááµá«áá£áº 2024-11-17 02.44.45.png	image/png	493805	3014	890	50	50
127	파리 갤러리 투어 by PARIS CLASS	Paris gallery tour by Paris Class	2024-11-17 01:46:09.455+00	2024-11-17 01:46:09.455+00	\N	áá³áá³ááµá«áá£áº 2024-11-17 02.45.09.png	image/png	2235928	2994	1364	50	50
128	\N	\N	2024-11-17 01:47:27.369+00	2024-11-17 01:47:27.369+00	\N	Capture_dâeÌcran_2024-05-14_aÌ_16.34.29.png	image/png	1895171	960	960	50	50
129	\N	\N	2024-11-17 01:51:46.958+00	2024-11-17 01:51:46.958+00	\N	áá³áá³ááµá«áá£áº 2024-11-17 02.51.16.png	image/png	2569036	996	996	50	50
130	\N	\N	2024-11-17 01:58:53.849+00	2024-11-17 01:58:53.849+00	\N	áá³áá³ááµá«áá£áº 2024-11-17 02.58.11.png	image/png	2132892	1000	1000	50	50
131	\N	\N	2024-11-17 02:05:21.429+00	2024-11-17 02:05:21.429+00	\N	Capture_dâeÌcran_2024-05-27_aÌ_21.29.06.png	image/png	1083169	1002	1002	50	50
132	\N	\N	2024-11-17 02:07:29.679+00	2024-11-17 02:06:32.126+00	/media/Capture_dâeÌcran_2024-05-27_aÌ_15.34.12.png	Capture_dâeÌcran_2024-05-27_aÌ_15.34.12.png	image/png	1571055	931	946	50	50
133	\N	\N	2024-11-17 02:07:58.066+00	2024-11-17 02:07:58.066+00	\N	Capture_dâeÌcran_2024-05-27_aÌ_15.34.12-1.png	image/png	1821614	1010	1010	50	50
134	\N	\N	2024-11-17 02:11:27.58+00	2024-11-17 02:11:27.58+00	\N	Capture_dâeÌcran_2024-08-09_aÌ_20.53.07.png	image/png	1094471	1000	1000	50	50
135	\N	\N	2024-11-17 02:17:40.607+00	2024-11-17 02:17:40.607+00	\N	jcr_content.jpeg	image/jpeg	105387	800	800	50	50
136	\N	\N	2024-11-17 02:21:08.16+00	2024-11-17 02:21:08.16+00	\N	jcr_content (1).jpeg	image/jpeg	107803	800	800	50	50
137	\N	\N	2024-11-17 02:24:51.422+00	2024-11-17 02:24:51.422+00	\N	NCD_NS-Guestroom_NSå®¢æ¿.jpg	image/jpeg	129439	840	840	50	50
138	\N	\N	2024-11-17 02:29:52.806+00	2024-11-17 02:29:52.806+00	\N	áá³áá³ááµá«áá£áº 2024-11-17 03.29.05.png	image/png	3841446	1354	1354	50	50
139	\N	\N	2024-11-17 02:36:39.091+00	2024-11-17 02:36:39.091+00	\N	2020-11-16.jpg	image/jpeg	234242	1200	1200	50	50
140	\N	\N	2024-11-17 02:38:45.958+00	2024-11-17 02:38:45.958+00	\N	lc-ukylc-premium-shirosumire-25365_Wide-Hor.jpeg	image/jpeg	90430	752	752	50	50
141	\N	\N	2024-11-17 02:45:14.763+00	2024-11-17 02:45:14.763+00	\N	eb-tyoeb-roof-sunset-28518_Wide-Hor.jpeg	image/jpeg	125599	750	750	50	50
142	\N	\N	2024-11-17 02:47:56.286+00	2024-11-17 02:47:56.286+00	\N	TYOAZ-P1685-Andaz-Sky-Suite-Sofa-Night.4x3.webp	image/webp	138080	1834	1834	50	50
143	\N	\N	2024-11-17 02:52:55.029+00	2024-11-17 02:52:55.029+00	\N	IMG_0159.jpg	image/jpeg	214751	1200	1200	50	50
144	\N	\N	2024-11-17 02:54:57.697+00	2024-11-17 02:54:57.697+00	\N	áá³áá³ááµá«áá£áº 2024-11-10 22.01.37.png	image/png	1686793	1180	1180	50	50
145	\N	\N	2024-11-17 03:02:55.164+00	2024-11-17 03:02:55.164+00	\N	Capture_dâeÌcran_2024-06-28_aÌ_20.28.06.png	image/png	2054662	1122	1122	50	50
146	\N	\N	2024-11-17 03:12:51.493+00	2024-11-17 03:12:51.493+00	\N	2022-ruma-suite-living-night.webp	image/webp	69934	983	983	50	50
147	\N	\N	2024-11-17 11:35:18.627+00	2024-11-17 11:35:18.627+00	\N	anantara palazzo roma hotel	image/jpeg	258146	1200	1200	50	50
148	\N	\N	2024-11-17 11:38:38.256+00	2024-11-17 11:38:38.256+00	\N	portrait milano	image/jpeg	228371	969	969	50	50
149	\N	\N	2024-11-17 11:49:05.997+00	2024-11-17 11:49:05.997+00	\N	equinox hotel new york	image/jpeg	174786	1200	1200	50	50
150	\N	\N	2024-11-17 11:50:58.88+00	2024-11-17 11:50:58.88+00	\N	mandarin oriental new york	image/jpeg	230057	1200	1200	50	50
151	\N	\N	2024-11-17 11:53:05.782+00	2024-11-17 11:53:05.782+00	\N	mandarin oriental new york-1.mandarin oriental new york	image/jpeg	203172	1200	1200	50	50
152	\N	\N	2024-11-17 15:32:19.986+00	2024-11-17 15:32:19.986+00	\N	intercontinental bordeaux	image/jpeg	476242	1200	1200	50	50
153	\N	\N	2024-11-17 16:05:04.251+00	2024-11-17 16:05:04.251+00	\N	OO_ThePalm_Beach_Cabana_SeaView_LS_2467_MASTER.jpg	image/jpeg	214058	969	969	50	50
154	\N	\N	2024-11-17 16:15:42.734+00	2024-11-17 16:15:42.734+00	\N	520x520_KMD_Rooms_FOV_2_7d44561f5a.jpg	image/jpeg	203979	1040	1040	50	50
155	\N	\N	2024-11-17 16:19:17.422+00	2024-11-17 16:19:17.422+00	\N	TLJKT - Swimming Pool.jpg	image/jpeg	172128	765	765	50	50
156	\N	\N	2024-11-17 16:26:52.648+00	2024-11-17 16:26:52.648+00	\N	Capture_dâeÌcran_2024-07-20_aÌ_23.21.40.png	image/png	607354	564	564	50	50
157	\N	\N	2024-11-17 16:30:47.731+00	2024-11-17 16:30:47.731+00	\N	26019021.jpg	image/jpeg	102370	624	624	50	50
158	\N	\N	2024-11-17 16:35:58.999+00	2024-11-17 16:35:58.999+00	\N	Capture_dâeÌcran_2024-08-04_aÌ_23.55.02.png	image/png	638594	540	539	50	50
159	\N	\N	2024-11-17 16:38:52.447+00	2024-11-17 16:38:52.447+00	\N	Room-3806_TRS-5-2000x1527.jpg	image/jpeg	507963	1527	1527	50	50
160	\N	\N	2024-11-17 16:42:35.58+00	2024-11-17 16:42:35.58+00	\N	coral-wing-pool-gallery3.jpg	image/jpeg	164313	900	900	50	50
161	\N	\N	2024-11-17 16:45:18.323+00	2024-11-17 16:45:18.323+00	\N	Capture_dâeÌcran_2024-08-05_aÌ_17.24.24.png	image/png	689426	605	605	50	50
162	\N	\N	2024-11-17 16:48:42.046+00	2024-11-17 16:48:42.046+00	\N	557727637.jpg	image/jpeg	108877	683	683	50	50
163	\N	\N	2024-11-17 16:55:58.43+00	2024-11-17 16:55:58.43+00	\N	aman_new_york_usa_-_two-bedroom_home.webp	image/webp	65888	889	889	50	50
164	\N	\N	2024-11-17 17:01:24.761+00	2024-11-17 17:01:24.761+00	\N	áá³áá³ááµá«áá£áº 2024-11-17 18.00.56.png	image/png	2508811	1122	1122	50	50
165	\N	\N	2024-11-17 17:05:21.67+00	2024-11-17 17:05:21.67+00	\N	RoomsSuites_LegacySuites_Ellington_Slideshow_Feature1.jpg	image/jpeg	71964	500	500	50	50
166	\N	\N	2024-11-17 17:06:35.128+00	2024-11-17 17:06:35.128+00	\N	áá³áá³ááµá«áá£áº_2024-10-22_12.42.49.png	image/png	1241884	712	712	50	50
167	\N	\N	2024-11-17 17:11:49.998+00	2024-11-17 17:11:49.998+00	\N	rz-jhmrz-club-lounge-lanai-28975_Classic-Hor.jpeg	image/jpeg	37537	361	361	50	50
168	\N	\N	2024-11-17 17:15:59.617+00	2024-11-17 17:15:41.296+00	/media/áá³áá³ááµá«áá£áº 2024-11-17 18.15.32.png	áá³áá³ááµá«áá£áº 2024-11-17 18.15.32.png	image/png	2339863	1050	1050	50	50
169	SO hotel, SO/ paris, Paris hotel recommendation, luxury hotel, hotel paris, travel platform	SO hotel, SO/ paris, SO 호텔, 파리 호텔, 파리호텔추천, 파리호텔할인	2024-11-19 14:45:06.412+00	2024-11-19 14:45:06.412+00	\N	BONNIE Bar 3 - Hotel SO Paris.jpg	image/jpeg	276937	960	720	50	50
170	SO hotel, SO/ paris, Paris hotel recommendation, luxury hotel, hotel paris, travel platform	SO hotel, SO/ paris, SO 호텔, 파리 호텔, 파리호텔추천, 파리호텔할인	2024-11-19 14:45:32.023+00	2024-11-19 14:45:32.023+00	\N	Room Iconic - Paris Skyline - Hotel SO Paris-1.jpg	image/jpeg	1857843	2067	1378	50	50
171	SO hotel, SO/ paris, Paris hotel recommendation, luxury hotel, hotel paris, travel platform	SO hotel, SO/ paris, SO 호텔, 파리 호텔, 파리호텔추천, 파리호텔할인	2024-11-19 14:46:49.317+00	2024-11-19 14:46:49.317+00	\N	Studio Panorama - SO Paris - view.jpg	image/jpeg	292025	1688	1125	50	50
175	\N	\N	2024-11-27 15:10:18.204+00	2024-11-27 15:10:18.204+00	\N	2.png	image/png	457255	1366	768	50	50
176	\N	\N	2024-11-27 15:10:52.347+00	2024-11-27 15:10:52.347+00	\N	3.png	image/png	620293	1366	768	50	50
177	\N	\N	2024-11-27 15:11:00.448+00	2024-11-27 15:11:00.448+00	\N	4.png	image/png	938583	1366	768	50	50
2	Champagne tour, Champagne travel, Champagne private travel, Champagne luxury tour, Champagne luxury travel	샴파뉴 투어, 샴파뉴 여행, 샴페인 프라이빗 여행, 샴페인 프라이빗 패키지, 샴페인투어, 샹파뉴투어, 샹파뉴여행, 샹파뉴, 샴페인 지역	2024-11-27 12:20:04.19+00	2024-11-09 16:34:26.891+00	/media/54155ae4f8697.jpg	54155ae4f8697.jpg	image/jpeg	97983	564	704	50	50
172	골프, 전세계골프여행, 골프여행, 골퍼, 프로골퍼, 골프프라이빗여행	golf, golfer, progolf, privategolf, privategolftravel, golf travel, private golf travel, travel, travel golf, private golf, private golf trip, golfer travel, world golf travel	2024-11-27 14:09:25.486+00	2024-11-27 11:42:15.428+00	/media/Travel in your pocket.png	Travel in your pocket.png	image/png	478868	463	432	50	50
174	\N	\N	2024-11-27 15:10:06.762+00	2024-11-27 15:10:06.762+00	\N	1.png	image/png	1696679	1366	768	50	50
178	\N	\N	2024-11-27 15:11:07.711+00	2024-11-27 15:11:07.711+00	\N	5.png	image/png	601110	1366	768	50	50
179	\N	\N	2024-11-27 15:11:15.746+00	2024-11-27 15:11:15.746+00	\N	6.png	image/png	1714445	1366	768	50	50
180	\N	\N	2024-11-27 15:18:25.865+00	2024-11-27 15:18:25.865+00	\N	áá¡ááµ áá³áá¡ááµááµáº áá©á¯áá³ áá®áá¥.png	image/png	1688894	1366	768	50	50
181	\N	\N	2024-11-27 15:40:21.148+00	2024-11-27 15:40:21.148+00	\N	1-1.png	image/png	1692893	1366	768	50	50
182	\N	\N	2024-11-27 15:40:30.622+00	2024-11-27 15:40:30.622+00	\N	2-1.png	image/png	461444	1366	768	50	50
183	\N	\N	2024-11-27 15:40:48.589+00	2024-11-27 15:40:48.589+00	\N	3-1.png	image/png	651473	1366	768	50	50
184	\N	\N	2024-11-27 15:41:00.461+00	2024-11-27 15:41:00.461+00	\N	4-1.png	image/png	963964	1366	768	50	50
185	\N	\N	2024-11-27 15:41:10.428+00	2024-11-27 15:41:10.428+00	\N	5-1.png	image/png	640614	1366	768	50	50
186	\N	\N	2024-11-27 15:41:22.168+00	2024-11-27 15:41:22.168+00	\N	6-1.png	image/png	1733635	1366	768	50	50
187	\N	\N	2024-11-27 15:44:36.539+00	2024-11-27 15:44:36.539+00	\N	1-2.png	image/png	1693792	1366	768	50	50
188	\N	\N	2024-11-27 15:44:46.328+00	2024-11-27 15:44:46.328+00	\N	2-2.png	image/png	461817	1366	768	50	50
189	\N	\N	2024-11-27 15:44:54.935+00	2024-11-27 15:44:54.935+00	\N	3-2.png	image/png	651899	1366	768	50	50
190	\N	\N	2024-11-27 15:45:04.725+00	2024-11-27 15:45:04.725+00	\N	4-2.png	image/png	964211	1366	768	50	50
191	\N	\N	2024-11-27 15:45:13.768+00	2024-11-27 15:45:13.768+00	\N	5-2.png	image/png	641063	1366	768	50	50
192	\N	\N	2024-11-27 15:45:23+00	2024-11-27 15:45:23+00	\N	6-2.png	image/png	1733635	1366	768	50	50
193	\N	\N	2024-11-27 16:22:34.443+00	2024-11-27 16:22:34.443+00	\N	áá¡ááµ áá³áá¡ááµááµáº áá©á¯áá³ áá®áá¥ (1).png	image/png	461631	1366	768	50	50
194	\N	\N	2024-11-27 16:23:42.107+00	2024-11-27 16:23:42.107+00	\N	áá¡ááµ áá³áá¡ááµááµáº áá©á¯áá³ áá®áá¥ (1)-1.png	image/png	963347	1366	768	50	50
195	\N	\N	2024-11-27 16:24:30.679+00	2024-11-27 16:24:30.679+00	\N	áá¡ááµ áá³áá¡ááµááµáº áá©á¯áá³ áá®áá¥ (1)-2.png	image/png	651899	1366	768	50	50
196	\N	\N	2024-11-27 16:28:38.281+00	2024-11-27 16:28:38.281+00	\N	áá¡ááµ áá³áá¡ááµááµáº áá©á¯áá³ áá®áá¥ (1)-3.png	image/png	964006	1366	768	50	50
197	\N	\N	2024-11-27 16:30:57.895+00	2024-11-27 16:30:57.895+00	\N	áá¡ááµ áá³áá¡ááµááµáº áá©á¯áá³ áá®áá¥ (1)-4.png	image/png	643424	1366	768	50	50
198	\N	\N	2024-11-27 16:33:46.253+00	2024-11-27 16:33:46.253+00	\N	áá¡ááµ áá³áá¡ááµááµáº áá©á¯áá³ áá®áá¥ (1)-5.png	image/png	963470	1366	768	50	50
199	\N	\N	2024-11-27 16:35:21.054+00	2024-11-27 16:35:21.054+00	\N	áá¡ááµ áá³áá¡ááµááµáº áá©á¯áá³ áá®áá¥ (1)-6.png	image/png	925154	1366	768	50	50
200	luxury travel, luxury cruise, cruise, europe cruise, cruise travel, cruise trip, luxury travel, travel, luxury travel, cruise, cruise europe, aurora cruise, norway cruise	노르웨이 크루즈, 포낭 크루즈, 럭셔리 여행, 럭셔리 트립, 유럽 크루즈, 노르웨이 오로라 크루즈, 크루즈여행, 크루즈, 럭셔리 크루즈 여행, 은퇴여행	2024-11-27 17:07:20.209+00	2024-11-27 17:07:20.209+00	\N	Travel in your pocket (2).png	image/png	518295	500	500	50	50
201	\N	\N	2024-11-28 18:20:11.713+00	2024-11-28 18:20:11.713+00	\N	7.png	image/png	2164229	1366	768	50	50
202	\N	\N	2024-11-28 18:20:19.11+00	2024-11-28 18:20:19.11+00	\N	8.png	image/png	760396	1366	768	50	50
203	\N	\N	2024-11-28 18:20:29.673+00	2024-11-28 18:20:29.673+00	\N	9.png	image/png	569537	1366	768	50	50
204	\N	\N	2024-11-28 18:20:39.173+00	2024-11-28 18:20:39.173+00	\N	10.png	image/png	460508	1366	768	50	50
205	\N	\N	2024-11-28 18:20:49.814+00	2024-11-28 18:20:49.814+00	\N	11.png	image/png	601416	1366	768	50	50
206	\N	\N	2024-11-28 18:20:57.778+00	2024-11-28 18:20:57.778+00	\N	12.png	image/png	1884213	1366	768	50	50
207	\N	\N	2024-11-28 18:44:23.993+00	2024-11-28 18:44:23.993+00	\N	áá¡ááµ áá³áá¡ááµááµáº áá©á¯áá³ áá®áá¥ (1)-7.png	image/png	1897397	1366	768	50	50
208	\N	\N	2024-11-28 19:00:54.487+00	2024-11-28 19:00:54.487+00	\N	13.png	image/png	2170520	1366	768	50	50
209	\N	\N	2024-11-28 19:01:00.705+00	2024-11-28 19:01:00.705+00	\N	8-1.png	image/png	783386	1366	768	50	50
210	\N	\N	2024-11-28 19:01:06.284+00	2024-11-28 19:01:06.284+00	\N	9-1.png	image/png	603391	1366	768	50	50
211	\N	\N	2024-11-28 19:01:23.296+00	2024-11-28 19:01:23.296+00	\N	10-1.png	image/png	500320	1366	768	50	50
212	\N	\N	2024-11-28 19:01:33.749+00	2024-11-28 19:01:33.749+00	\N	11-1.png	image/png	626031	1366	768	50	50
213	\N	\N	2024-11-28 19:01:45.837+00	2024-11-28 19:01:45.837+00	\N	12-1.png	image/png	1903878	1366	768	50	50
214	\N	\N	2024-11-28 19:03:34.171+00	2024-11-28 19:03:34.171+00	\N	8-2.png	image/png	783386	1366	768	50	50
215	\N	\N	2024-11-28 19:03:53.125+00	2024-11-28 19:03:53.125+00	\N	8-3.png	image/png	783386	1366	768	50	50
216	\N	\N	2024-11-28 19:04:05.906+00	2024-11-28 19:04:05.906+00	\N	9-2.png	image/png	603391	1366	768	50	50
217	\N	\N	2024-11-28 19:04:18.121+00	2024-11-28 19:04:18.121+00	\N	10-2.png	image/png	500320	1366	768	50	50
218	\N	\N	2024-11-28 19:04:30.249+00	2024-11-28 19:04:30.249+00	\N	11-2.png	image/png	626031	1366	768	50	50
219	\N	\N	2024-11-28 19:04:43.36+00	2024-11-28 19:04:43.36+00	\N	12-2.png	image/png	1903878	1366	768	50	50
220	\N	\N	2024-11-28 19:24:02.347+00	2024-11-28 19:24:02.347+00	\N	áá¡ááµ áá³áá¡ááµááµáº áá©á¯áá³ áá®áá¥ (1) copie.png	image/png	1904386	1366	768	50	50
221	\N	\N	2024-11-28 19:24:15.718+00	2024-11-28 19:24:15.718+00	\N	áá¡ááµ áá³áá¡ááµááµáº áá©á¯áá³ áá®áá¥ (1)-8.png	image/png	1899117	1366	768	50	50
173	Healingtravel, wholesometravel,Wellness Travel,Healing Retreat, Wellness trip, wellness travel, travel advisors, travel expert	힐링 여행, 홀썸여행, 웰니스여행, 웰니스투어, 스파투어, 트립어드바이져, 힐링투어, 럭셔리 리조트, 럭셔리 호텔, 럭셔리 스파	2024-11-28 19:28:30.635+00	2024-11-27 14:48:51.706+00	/media/Travel in your pocket (1).png	Travel in your pocket (1).png	image/png	396019	400	400	50	50
222	\N	\N	2024-11-29 08:54:58.098+00	2024-11-29 08:54:58.098+00	\N	Home.png	image/png	1714678	1366	768	50	50
223	\N	\N	2024-11-29 08:55:11.613+00	2024-11-29 08:55:11.613+00	\N	About.png	image/png	130107	1366	768	50	50
224	\N	\N	2024-11-29 08:55:32.331+00	2024-11-29 08:55:32.331+00	\N	Rooms.png	image/png	470587	1366	768	50	50
225	\N	\N	2024-11-29 08:56:51.405+00	2024-11-29 08:56:51.405+00	\N	4-3.png	image/png	698083	1366	768	50	50
226	\N	\N	2024-11-29 08:57:14.829+00	2024-11-29 08:57:14.829+00	\N	5-3.png	image/png	879194	1366	768	50	50
227	\N	\N	2024-11-29 08:57:25.318+00	2024-11-29 08:57:25.318+00	\N	Contact.png	image/png	479535	1366	768	50	50
228	\N	\N	2024-11-29 08:57:36.252+00	2024-11-29 08:57:36.252+00	\N	Packages.png	image/png	1228221	1366	768	50	50
229	\N	\N	2024-11-29 08:57:49.127+00	2024-11-29 08:57:49.127+00	\N	8-4.png	image/png	3197	1366	305	50	50
230	\N	\N	2024-11-29 08:58:05.468+00	2024-11-29 08:58:05.468+00	\N	Packages (2).png	image/png	671974	1366	768	50	50
231	\N	\N	2024-11-29 09:02:48.537+00	2024-11-29 09:02:48.537+00	\N	Hotels Website (KR).png	image/png	700350	1366	768	50	50
232	\N	\N	2024-11-29 09:03:54.489+00	2024-11-29 09:03:54.489+00	\N	Hotels Website (KR) (1).png	image/png	696909	1366	768	50	50
233	\N	\N	2024-11-29 09:05:11.023+00	2024-11-29 09:05:11.023+00	\N	Packages-1.png	image/png	1228221	1366	768	50	50
234	\N	\N	2024-11-29 10:55:31.42+00	2024-11-29 10:55:31.42+00	\N	4-4.png	image/png	637523	1366	768	50	50
235	\N	\N	2024-11-29 10:55:52.818+00	2024-11-29 10:55:52.818+00	\N	Home-1.png	image/png	1741755	1366	768	50	50
236	\N	\N	2024-11-29 10:56:11.753+00	2024-11-29 10:56:11.753+00	\N	About-1.png	image/png	148858	1366	768	50	50
237	\N	\N	2024-11-29 10:56:39.231+00	2024-11-29 10:56:39.231+00	\N	Rooms-1.png	image/png	470346	1366	768	50	50
238	\N	\N	2024-11-29 10:56:58.001+00	2024-11-29 10:56:58.001+00	\N	5-4.png	image/png	1408714	1366	600	50	50
239	\N	\N	2024-11-29 10:57:08.533+00	2024-11-29 10:57:08.533+00	\N	6-3.png	image/png	892653	1366	768	50	50
240	\N	\N	2024-11-29 10:57:34.355+00	2024-11-29 10:57:34.355+00	\N	About-2.png	image/png	161721	1366	768	50	50
241	\N	\N	2024-11-29 10:57:46.972+00	2024-11-29 10:57:46.972+00	\N	Rooms-2.png	image/png	499435	1366	768	50	50
242	\N	\N	2024-11-29 10:57:59.714+00	2024-11-29 10:57:59.714+00	\N	4-5.png	image/png	641169	1366	768	50	50
243	\N	\N	2024-11-29 10:58:11.816+00	2024-11-29 10:58:11.816+00	\N	5-5.png	image/png	1408714	1366	600	50	50
244	\N	\N	2024-11-29 10:58:20.382+00	2024-11-29 10:58:20.382+00	\N	6-4.png	image/png	911980	1366	768	50	50
245	\N	\N	2024-11-29 10:58:37.939+00	2024-11-29 10:58:37.939+00	\N	Packages-2.png	image/png	745792	1366	340	50	50
246	\N	\N	2024-11-29 10:58:54.386+00	2024-11-29 10:58:54.386+00	\N	8-5.png	image/png	1541	1366	40	50	50
247	\N	\N	2024-11-29 10:59:12.55+00	2024-11-29 10:59:12.55+00	\N	8-6.png	image/png	886757	1366	768	50	50
248	\N	\N	2024-11-29 10:59:22.084+00	2024-11-29 10:59:22.084+00	\N	9-3.png	image/png	386110	1366	768	50	50
249	\N	\N	2024-11-29 10:59:50.789+00	2024-11-29 10:59:50.789+00	\N	About-3.png	image/png	148858	1366	768	50	50
250	\N	\N	2024-11-29 11:00:18.026+00	2024-11-29 11:00:18.026+00	\N	Rooms-3.png	image/png	470346	1366	768	50	50
251	\N	\N	2024-11-29 11:00:33.718+00	2024-11-29 11:00:33.718+00	\N	4-6.png	image/png	637523	1366	768	50	50
252	\N	\N	2024-11-29 11:00:53.63+00	2024-11-29 11:00:53.63+00	\N	5-6.png	image/png	1408714	1366	600	50	50
253	\N	\N	2024-11-29 11:01:04.111+00	2024-11-29 11:01:04.111+00	\N	6-5.png	image/png	892653	1366	768	50	50
254	\N	\N	2024-11-29 11:01:28.764+00	2024-11-29 11:01:28.764+00	\N	Packages (2)-1.png	image/png	1006281	1366	768	50	50
255	\N	\N	2024-11-29 11:01:37.868+00	2024-11-29 11:01:37.868+00	\N	10-3.png	image/png	335801	1366	768	50	50
256	\N	\N	2024-11-29 11:09:18.026+00	2024-11-29 11:09:18.026+00	\N	About-4.png	image/png	175224	1366	768	50	50
257	\N	\N	2024-11-29 11:09:31.701+00	2024-11-29 11:09:31.701+00	\N	4-7.png	image/png	641873	1366	768	50	50
258	\N	\N	2024-11-29 11:10:26.448+00	2024-11-29 11:10:26.448+00	\N	About-5.png	image/png	159778	1366	768	50	50
259	\N	\N	2024-11-29 11:10:39.646+00	2024-11-29 11:10:39.646+00	\N	4-8.png	image/png	637609	1366	768	50	50
260	\N	\N	2024-11-29 16:27:00.42+00	2024-11-29 16:27:00.42+00	\N	1-hotel-so-paris.jpg	image/jpeg	85740	750	750	50	50
261	\N	\N	2024-11-29 16:42:49.079+00	2024-11-29 16:42:49.079+00	\N	Rooms-4.png	image/png	470693	1366	768	50	50
\.


--
-- Data for Name: partner_hotels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.partner_hotels (id, en_title, kr_title, slug, en_keywords, kr_keywords, en_content, kr_content, updated_at, created_at) FROM stdin;
3	Shangri-La Paris	샹그릴라 파리 호텔	shangri-la-paris	shangri-la paris, shangri-la hotel, paris luxury hotel, paris private travel, paris private tour, parisclass, eiffel tower view hotel	샹그릴라파리, 샹그릴라파리호텔, 파리럭셔리호텔, 파리5성급호텔, 파리프라이빗투어, 파리프라이빗패키지여행, 파리여행, 파리호텔추천, 파리클래스, 에펠뷰호텔	[{"children": [{"text": "Located near the Eiffel Tower / The best Eiffel Tower view hotel / pick-up and sending cars & breakfast included"}]}]	[{"children": [{"text": "에펠탑 근처 / 파리 최고의 에펠뷰 호텔 / 박수에 따른 픽업 및 샌딩 차량 & 조식 포함 서비스 "}]}]	2024-11-11 14:06:25.603+00	2024-11-10 18:22:13.476+00
9	Hotel Madame Reve Paris	호텔 마담 레브	hotel-madame-reve-paris	hotel madame reve, paris hotel, paris luxury hotel, paris private travel, paris private tour, parisclass	호텔마담레브, 마담레브호텔, 마담레브파리, 파리럭셔리호텔, 파리5성급호텔, 파리호캉스호텔, 파리호텔추천, 파리신혼여행호텔, 파리커플호텔, 파리프라이빗투어, 파리프라이빗패키지, 파리5성급호텔, 파리클래스	[{"children": [{"text": "Located in the center of Paris, near the station Châtelet / Breakfast included & discounts available "}]}]	[{"children": [{"text": "파리 중심 샤틀레역 근처 위치 / 조식 포함 & 박수에 따른 할인 서비스"}]}]	2024-11-11 14:11:51.921+00	2024-11-10 18:56:22.295+00
2	Ritz Paris	리츠 파리 호텔	ritz-paris	Ritz paris hotel, ritz paris, paris luxury hotel, paris private travel, paris private tour package	리츠 호텔, 리츠 파리, 리츠파리호텔, 파리5성급호텔, 파리럭셔리호텔, 파리프라이빗투어, 파리프라이빗패키지	[{"children": [{"text": "Located in the center of paris, Place of Vendôme / A luxurious palace hotel  / Breakfast included and discounts available "}]}]	[{"children": [{"text": "파리 중심, 방돔 광장에 위치 / Palais 급 호텔 / 조식 포함 및 할인 가능"}]}]	2024-11-11 14:04:29.382+00	2024-11-10 18:12:31.894+00
4	The Peninsula Paris Hotel	페닌슐라 파리 호텔	the-peninsula-paris-hotel	The Peninsula Paris, paris luxury hotel, paris private travel, paris private tour, parisclass, paris hotel	페닌술라 파리, 페닌술라 파리 호텔, 파리 럭셔리 호텔, 파리 5성급 호텔, 파리호텔추천, 파리16구호텔, 파리클래스, 파리프라이빗투어, 파리프라이빗여행	[{"children": [{"text": "A luxury hotel located in 16th Arr. Paris / pick-up and sending cars & breakfast included / discounts available "}]}]	[{"children": [{"text": "조용한 파리 16구에 위치한 럭셔리 호텔 / 박수에 따른 조식 포함 및 픽업 & 샌딩 차량 서비스 / 할인 가능"}]}]	2024-11-11 14:07:47.909+00	2024-11-10 18:27:21.788+00
5	Four Seasons Hotel George V	포시즌 호텔 조지 V	four-seasons-hotel-george-v	four seasons george hotel george V, paris luxury hotel, paris eiffel tower view hotel, paris private travel, paris private tour package	포시즌 호텔 조지 V, 파리럭셔리호텔, 파리에펠뷰호텔, 파리5성급호텔, 파리프라이빗투어, 파리프라이빗여행, 파리프라이빗패키지, 파리호텔추천	[{"children": [{"text": "The best historical hotel & Style Renaissance / Discounts & Breakfast included"}]}]	[{"children": [{"text": "역사적인 최고급 호텔& 르네상스 스타일 / 할인 및 조식 포함 서비스"}]}]	2024-11-11 14:08:33.745+00	2024-11-10 18:31:55.832+00
6	Cheval Blanc Paris	슈발 블랑 파리 	cheval-blanc-paris	cheval blanc paris, paris luxury hotel, paris hotel, paris pont neuf hotel, paris private tour, paris private travel	슈발블랑파리, 슈발블랑파리호텔, 파리호텔추천, 파리5성급호텔, 파리럭셔리호텔, 파리퐁네프호텔, 파리프라이빗여행, 파리프라이빗투어, 파리프라이빗패키지	[{"children": [{"text": "Located in the center of Paris, near the Pont-neuf / pick-up and sending cars & breakfast included / discounts available "}]}]	[{"children": [{"text": "파리 중심, 퐁네프 다리 옆 위치 / 박수에 따른 픽업 및 샌딩 차량 & 조식 포함 서비스 / 할인 가능 "}]}]	2024-11-11 14:09:30.66+00	2024-11-10 18:36:39.324+00
8	Pince de Galles Paris	프린스 드 갈르 파리	pince-de-galles-paris	prince de galles paris, champs-élysées hotel, paris hotel, paris marriott hotel, paris luxury hotel, paris private travel, paris private tour, parisclass	프린스드갈르파리, 프린스드갈리파리호텔, 파리호텔추천, 파리호텔, 파리럭셔리호텔, 파리5성급호텔, 파리신혼여행, 파리프라이빗투어, 파리프라이빗여행, 파리호캉스호텔, 파리클래스, 파리샹젤리제거리호텔	[{"children": [{"text": "A luxury hotel located in Champs-Élysée / Part of Marriott / Discounts available & breakfast included"}]}]	[{"children": [{"text": "샹젤리제 거리 고급 호텔 / 마리엇 계열사 / 할인 및 조식 포함 서비스"}]}]	2024-11-11 14:26:46.711+00	2024-11-10 18:51:12.747+00
10	 Hotel Crillon, A Rosewood Hotel	호텔 크리웅, 로즈우드 호텔	-hotel-crillon-a-rosewood-hotel	hotel de crillon, rosewood hotel, paris hotel, paris luxury hotel, paris private travel, paris private tour, parisclass	호텔 크리웅, 로즈우드 호텔, 파리호텔추천, 파리호텔, 파리럭셔리호텔, 파리5성급호텔, 파리신혼여행, 파리커플여행, 파리클래스, 파리프라이빗투어, 파리프라이빗여행	[{"children": [{"text": "A luxury hotel near the Place of Concorde / Bar often used as a party venue / Discounts & breakfast included"}]}]	[{"children": [{"text": "콩코드 광장 옆 고급 호텔 / 파티 장소로 많이 쓰이는 바 / 할인 및 조식 포함 서비스"}]}]	2024-11-11 14:12:33.291+00	2024-11-10 19:23:28.683+00
11	Hotel Plaza Athenee	호텔 플라자 아테네	hotel-plaza-athenee	hotel plaza athenee, paris hotel, paris luxury hotel, paris private travel, paris private tour, parisclass	호텔 플라자 아테네, 파리호텔추천, 파리호텔, 파리럭셔리호텔, 파리5성급호텔, 파리인기호텔, 샹젤리제거리호텔, 파리프라이빗투어, 파리프라이빗여행, 파리호캉스, 파리신혼여행, 파리커플호텔	[{"children": [{"text": "A luxury hotel located near the Champs-Élysée / A prestigious tea-time hotel / Discounts & breakfast included"}]}]	[{"children": [{"text": "샹젤리제 거리 고급 호텔 & 티타임 명문 호텔 / 할인 및 조식 포함 서비스"}]}]	2024-11-11 14:13:22.504+00	2024-11-10 19:28:55.595+00
12	Hotel Westminster	호텔 웨스트민스터	hotel-westminster	hotel westminster, paris hotel, paris luxury hotel, paris private travel, paris private tour, parisclass	파리4성급호텔, 파리호텔추천, 파리 호텔, 호텔웨스트민스터, 파리프라이빗투어, 파리프라이빗여행	[{"children": [{"text": "Located in the center of Paris, place of Vendôme / Discounts & breakfast included"}]}]	[{"children": [{"text": "파리 중심, 방돔 광장 위치 / 박수에 따른 할인 및 조식 포함 서비스"}]}]	2024-11-11 14:14:15.97+00	2024-11-10 19:32:14.032+00
13	Hotel Mayfair Paris	호텔 메이페어 파리	hotel-mayfair-paris	Hotel Mayfair Paris, Paris hotel, paris private tour, paris private travel, parisclass	호텔 메이페어 파리, 파리호텔추천, 파리관광용호텔, 파리프라이빗투어, 파리프라이빗여행, 파리가성비호텔	[{"children": [{"text": "Located in the center of Paris, near the Place of Concorde and Palais Royal / Reasonable price / Breakfast & discounts available "}]}]	[{"children": [{"text": "파리 중심 콩코드 및 팔레루아얄 근처 / 합리적인 가격 / 조식 포함 & 할인 가능"}]}]	2024-11-11 14:14:57.864+00	2024-11-10 19:37:16.579+00
14	Hotel Dress Code	호텔 드레스 코드 	hotel-dress-code	Hotel Dress Code, Paris hotel, best reasonable hotel paris, paris private travel, paris private tour, parisclass	호텔 드레스 코드, 파리가성비호텔, 파리여행호텔, 파리호텔추천, 파리클래스, 파리프라이빗투어, 파리프라이빗여행	[{"children": [{"text": "Located in the center of Paris / Reasonable Price / Breakfast & discounts available "}]}]	[{"children": [{"text": "파리 중심가 위치 / 합리적인 가격 / 조식 및 할인 포함 서비스"}]}]	2024-11-11 14:16:13.786+00	2024-11-10 19:40:59.02+00
15	TOO Hotel Paris	투 호텔 파리	too-hotel-paris	paris eiffel tower view hotel, paris panoramic view hotel, paris hotel, paris reasonable price hotel, paris private travel, paris private tour, parisclass	투 호텔 파리, 파리호텔, 파리가성비호텔, 파리가성비숙소, 파리에펠뷰호텔, 파리에펠뷰숙소, 파리호텔추천, 파리호텔할인, 파리프라이빗투어, 파리프라이빗패키지여행	[{"children": [{"text": "Paris Panoramic View Hotel (Eiffel Tower view hotel) / Reasonable Price / Discounts available "}]}]	[{"children": [{"text": "파리 파노라믹 뷰(에펠뷰)가 인상적인 고층의 호텔 / 합리적인 가격 / 할인 가능 "}]}]	2024-11-11 14:16:31.811+00	2024-11-10 19:45:52.806+00
16	Le Meurice, Paris	호텔 르 모리스 파리 	le-meurice-paris	Le meurice hotel paris, paris hotel, paris luxury hotel, paris private tour, paris private travel, paris class	르 모리스 호텔 파리, 파리호텔, 파리럭셔리호텔, 파리5성급호텔, 파리호텔할인, 파리호텔조식포함, 파리신혼여행, 파리커플여행, 파리프라이빗여행, 파리프라이빗투어	[{"children": [{"text": "Located near the Louvre / A luxury hotel / Discounts & breakfast included "}]}]	[{"children": [{"text": "루브르 옆, 예쁘고 고급스러운 호텔 / 할인 및 조식 포함 서비스"}]}]	2024-11-11 14:18:24.059+00	2024-11-10 19:50:35.25+00
17	Maison Albar Hotel	메종 알바 호텔 	maison-albar-hotel	maison albar hotel, paris hotel, paris luxury hotel, paris private tour, paris private travel, paris class	메종알바호텔, 파리호텔, 파리호텔추천, 파리프라이빗투어, 파리프라이빗여행, 파리숙소추천, 파리가성비호텔	[{"children": [{"text": "Located in Pont-neuf & Champs-Élysées / Reasonable Price / Discounts & breakfast included "}]}]	[{"children": [{"text": "퐁네프 & 샹젤리제 거리 위치 호텔 / 합리적인 가격 / 할인 및 조식 포함 서비스"}]}]	2024-11-11 14:18:42.657+00	2024-11-10 19:56:10.07+00
18	 Kimpton St Honoré Paris	킴튼 생 토노레 파리	-kimpton-st-honor-paris	Kimpton St Honore Paris, paris luxury hotel, paris private travel, paris private tour package	킴튼 생 토노레 파리, 파리호텔추천, 파리호텔, 파리5성급호텔, 파리오페라호텔, 파리프라이빗투어, 파리프라이빗여행, 파리클래스, 파리신혼여행호텔, 파리커플호텔,	[{"children": [{"text": "Located near the Opéra Garnier / A neat and clean hotel / Discounts & breakfast included "}]}]	[{"children": [{"text": "오페라 근처 깔끔하고 깨끗한 호텔 / 할인 및 조식 포함 서비스"}]}]	2024-11-11 14:19:13.64+00	2024-11-10 20:01:04.09+00
71	The Standard Hotel London	더 스탠다드 호텔 런던	the-standard-hotel-london	the standard hotel london, the standard hotel,  parisclass	더 스탠다드 호텔 런던, 더 스텐다드 호텔, 런던 호텔, 런던 프라이빗 투어, 런던 프라이빗 여행, 런던 호텔 할인, 런던 여행, 파리 클래스, 런던 호텔 추천	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 01:37:48.846+00	2024-11-17 01:37:03.573+00
70	Mandarin oriental palace Luzern	만다린 오리엔탈 팔라스 루체른	mandarin-oriental-palace-luzern	mandarin oriental palace luzern, mandarin oriental palace hotel, luzern hotel, swiss private tour, swiss private travel, parisclass, swiss hotel recommendation, swiss hotel reduction	만다린 오리엔탈 팔라스 루체른, 만다린 오리엔탈 팔라스, 루체른 호텔, 스위스 호텔, 스위스 호텔 추천, 파리 클래스, 스위스 호텔 할인	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 01:17:15.36+00	2024-11-17 01:14:03.445+00
69	Victoria-Jungfrau Grand Hotel & Spa	빅토리아-융프라우 그랜드 호텔 & 스파	victoria-jungfrau-grand-hotel-spa	victoria-jungfrau grand hotel spa, victoria-jungfrau hotal, swiss hotal, swiss private tour, swiss hotel recommendation, swiss hotel reduction	빅토리아 융프라우 그랜드 호텔 스파, 빅토리아 융프라우 그랜드 호텔, 융프라우 스파, 스위스 융프라우 호텔, 스위스 프라이빗 투어, 스위스 프라이빗 여행, 파리 클래스, 스위스 호텔 할인, 융프라우 호텔 할인, 스위스 호텔 추천, 융프라우 호텔 추천	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 01:03:41.048+00	2024-11-17 01:03:41.048+00
19	Hotel Relais Christine	호텔 롤레 크리스틴 	hotel-relais-christine	Hotel Relais Christine, paris luxury hotel, paris private travel, paris private tour package	호텔 롤레 크리스틴, 파리호텔추천, 파리5성급호텔, 파리럭셔리호텔, 파리커플호텔, 파리신혼여행호텔, 파리프라이빗투어,파리럭셔리패키지, 파리프라이빗여행	[{"children": [{"text": "Located in the 6th Arr. Paris / A cute Hotel / Discounts & breakfast included"}]}]	[{"children": [{"text": "파리 6구에 위치한 아기자기하고 아담한 호텔 / 할인 및 조식 포함 서비스"}]}]	2024-11-11 14:19:34.111+00	2024-11-10 20:10:27.883+00
20	Hotel Saint James Paris 	세인트 제임스 파리	hotel-saint-james-paris-	Hotel Saint James Paris, paris luxury hotel, paris private travel, paris private tour package	세인트 제임스 파리, 파리호텔, 파리럭셔리호텔, 파리5성급호텔, 파리프라이빗투어, 파리프라이빗여행, 파리신혼여행호텔추천, 파리커플호텔추천, 파리클래스	[{"children": [{"text": "A luxurious and beautiful hotel located in Paris that makes feel like entering a castle "}]}]	[{"children": [{"text": "파리내 성에 들어가는 느낌의 우아하고 아름다운 호텔 / 할인 및 조식 포함 서비스"}]}]	2024-11-11 14:21:53.994+00	2024-11-10 20:15:28.121+00
21	Chateau des Fleurs 	샤토 데 플뢰르	chateau-des-fleurs-	chateau des fleurs, paris luxury hotel, paris private travel, paris private tour package	샤토데플뢰르호텔, 파리호텔추천, 파리가성비호텔, 파리럭셔리호텔, 파리5성급호텔, 파리호텔할인, 파리신혼여행호텔추천, 파리커플호텔추천, 파리클래스, 파리프라이빗여행, 파리프라이빗투어,	[{"children": [{"text": "A renovated hotel located in Champs-Élysées / Reasonable price / Discounts & breakfast included "}]}]	[{"children": [{"text": "새로 리모델링한 샹젤리제 가성비 좋은 호텔 / 할인 및 조식 포함 서비스"}]}]	2024-11-11 14:22:13.877+00	2024-11-10 20:18:55.768+00
22	M Social Paris Hotel	M 소셜 파리 호텔	m-social-paris-hotel	M Social Paris Hotel, paris luxury hotel, paris private travel, paris private tour package	M소셜파리호텔, 엠소셜파리호텔, 파리가성비호텔, 파리가성비숙소, 파리오페라호텔, 파리호텔할인, 파리프라이빗투어, 파리프라이빗여행패키지, 파리프라이빗여행, 파리호텔추천	[{"children": [{"text": "Located near the Opéra Garnier / Reasonable price / Discounts & breakfast included "}]}]	[{"children": [{"text": "오페라 근처에 위치한 가성비 좋은 호텔 / 할인 및 조식 포함 서비스 "}]}]	2024-11-11 14:22:32.989+00	2024-11-10 20:22:42.54+00
23	Castille Paris - Starhotels Collezione	카스틸 파리 - 스타호렐스 콜레지오네	castille-paris---starhotels-collezione	Castille Paris, paris luxury hotel, paris private travel, paris private tour package	카스틸파리, 카스틸파리호텔, 파리호텔추천, 파리프라이빗여행, 파리프라이빗투어, 파리프라이빗패키지, 파리럭셔리호텔, 파리5성급호텔, 파리신혼여행, 파리커플여행호텔, 파리숙소추천, 파리인기호텔	[{"children": [{"text": "Located near the shop CHANEL 31 cambon / Reasonable price / Discounts & breakfast included"}]}]	[{"children": [{"text": "샤넬 깜봉점 옆 위치 / 가성비 좋은 호텔 / 할인 및 조식 포함 서비스"}]}]	2024-11-11 14:22:52.013+00	2024-11-10 20:27:01.426+00
24	Norman Paris Hotel	노르망 파리 호텔	norman-paris-hotel	Norman Paris Hotel, paris luxury hotel, paris private travel, paris private tour package	파리가성비호텔, 파리인기호텔, 파리샹젤리제호텔, 파리 럭셔리 호텔, 호텔노르망파리, 노르망호텔파리, 파리호텔추천, 파리호텔, 파리5성급호텔, 파리프라이빗투어, 파리프라이빗여행패키지	[{"children": [{"text": "Located in Champs-Élysées / Reasonable price / Discounts & breakfast included"}]}]	[{"children": [{"text": "샹젤리제 거리 가성비 호텔 / 할인 및 조식 포함 서비스"}]}]	2024-11-11 14:24:02.138+00	2024-11-10 20:32:34.265+00
25	 Le Bristol Paris	브리스톨 파리 호텔	le-bristol-paris	Le Bristol Paris, paris bristol hotel, paris luxury hotel, paris private travel, paris private tour, parisclass, paris hotel	르 브리스톨 파리, 브리스톨 파리 호텔, 파리 럭셔리 호텔, 파리프라이빗투어, 파리프라이빗여행, 파리클래스 	[{"children": [{"text": "Located in Champs-Élysées / Breakfast included and discounts available "}]}]	[{"children": [{"text": "샹젤리제 위치 호텔 / 조식 포함 및 할인 가능"}]}]	2024-11-11 18:42:35.712+00	2024-11-11 01:20:14.001+00
26	Maison Delano Paris	메종 델라노 파리	maison-delano-paris	Maison Delano Paris, Maison Delano Hotel, paris luxury hotel, paris hotel, paris pont neuf hotel, paris private tour, paris private travel	메종 델라노 파리, 메종 델라노 호텔, 파리호텔추천, 파리5성급호텔, 파리럭셔리호텔, 파리퐁네프호텔, 파리프라이빗여행, 파리프라이빗투어, 파리프라이빗패키지, 파리클래스	[{"children": [{"text": "Located in the heart of the 8th Arrondissement in an 18th-century mansion / pick-up and sending cars & breakfast included / discounts available "}]}]	[{"children": [{"text": "8구에 위치한 18세기 저택에 있는 호텔 / 박수에 따른 픽업 및 샌딩 차량 & 조식 포함 서비스 / 할인 가능 "}]}]	2024-11-11 18:44:39.946+00	2024-11-11 01:33:51.839+00
27	Le Grand Contrôle	르 그랑 콩트롤 호텔	le-grand-contrle	Le Grand Contrôle, Versailles hotel, Versailles luxury hotel, paris private tour, paris private travel, parisclass	르 그랑 콩트롤 호텔, 베르사유 호텔, 베르사유 럭셔리 호텔, 파리 프라이빗 투어, 파리 여행, 파리클래스 	[{"children": [{"text": "Located in the gardens of the Palace of Versailles / A luxury hotel / Discounts & breakfast included "}]}]	[{"children": [{"text": "베르사유 궁전 안의 정원에 위치 /\\b 베르사유 럭셔리 호텔 / 할인 및 조식 포함 서비스"}]}]	2024-11-11 18:45:34.715+00	2024-11-11 01:45:07.638+00
86	Chalet Ivy Hotel	샬레 아이비 호텔	chalet-ivy-hotel	Chalet Ivy Hotel, Sapporo Hotel, parisclass, Sapporo hotel recommendation, Sapporo hotel reduction, japan	샬레 아이비 호텔, 삿포로 호텔, 파리 클래스, 삿포로 호텔 추천, 삿포로 호텔 할인	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 02:52:57.277+00	2024-11-17 02:52:57.277+00
7	Park Hyatt Paris-Vendôme 	파크 하얏트 파리 방돔	park-hyatt-paris-vendme-	park hyatt paris vendome, paris luxury hotel, paris hotel, paris private travel, paris private tour, parisclass, palatial paris hotel	파크하얏트파리방돔, 파크하얏트파리, 파리호텔추천, 파리호텔, 파리방돔호텔, 파리럭셔리호텔, 파리5성급호텔, 파리럭셔리패키지, 파리프라이빗투어, 파리프라이빗여행, 파리클래스	[{"children": [{"text": "Located in the center of Paris, Place of Vendôme / A palatial paris hotel / pick-up and sending cars available / breakfast included"}]}]	[{"children": [{"text": "파리 중심, 방돔 위치 / 파리 Palais 급 호텔 / 박수에 따른 픽업 및 샌딩 차량 & 조식 포함 서비스 "}]}]	2024-11-11 14:10:15.678+00	2024-11-10 18:45:24.671+00
1	Bulgari Hotel Paris	불가리 파리 호텔	bulgari-hotel-paris	Bulgari, Bulgarihotel, Bulgariparis, Privatetravel, Luxuryhotel, Luxurytravel, Bulgari, bulgariparishotel, paris luxury hotel, paris bulgari hotel reservation	불가리호텔, 불가리호텔파리, 럭셔리호텔, 파리럭셔리호텔, 파리프라이빗여행, 파리프라이빗패키지	[{"type": "ul", "children": [{"type": "li", "children": [{"text": "Located in the centre of Paris, Champs-Élysées "}]}]}, {"type": "ul", "children": [{"type": "li", "children": [{"text": "Featuring a modern interior"}]}]}, {"type": "ul", "children": [{"type": "li", "children": [{"text": "Discount &  breakfast included"}]}, {"type": "li", "children": [{"text": "\\bAirport transfers and 24-hour butler service \\navailable upon booking nights or room type "}]}]}, {"children": [{"text": ""}]}]	[{"type": "ul", "children": [{"type": "li", "children": [{"text": "파리 중심 샹젤리제 거리 위치 "}]}, {"type": "li", "children": [{"text": "모던한 첨단식 인테리어 "}]}, {"type": "li", "children": [{"text": "할인 및 조식포함"}]}, {"type": "li", "children": [{"text": "박수에 따른 픽업 샌딩 차량 및 24시간 버틀러 서비스 가능"}]}]}]	2024-11-11 14:29:49.279+00	2024-11-04 15:41:51.873+00
28	L'Apogée Courchevel	라포제 쿠쉐벨 	lapoge-courchevel	L'Apogée Courchevel, FRENCH ALPS, france hotel, france private tour, france private travel, parisclass	라포제 쿠쉐벨 호텔, 프랑스 알프스 호텔, 프랑스호텔추천, 프랑스호텔, 프랑스호텔조식, 프랑스호텔할인, 파리클래스	[{"children": [{"text": "."}]}]	[{"children": [{"text": "."}]}]	2024-11-16 21:31:16.918+00	2024-11-16 21:30:24.82+00
29	 Bulgari Hotel Roma	불가리 로마	-bulgari-hotel-roma	Bulgari Roma Hotel, bulgariroma, bulgarihotel, italy private tour, italy private travel, parisclass, italy hotel reduction, italy hotel recommendation	불가리 로마, 불가리로마호텔, 이탈리아호텔추천, 로마호텔추천, 로마호텔, 로마숙소, 로마5성급호텔, 로마럭셔리호텔, 파리클래스	[{"children": [{"text": "."}]}]	[{"children": [{"text": "."}]}]	2024-11-16 21:38:31.211+00	2024-11-16 21:38:31.211+00
30	Hotel Passalacqua	파살라콰 호텔	hotel-passalacqua	Moltrasio Hotel, Hotel Passalacqua, Italy luxury hotel, 	몰트라지오 호텔, 파살라콰호텔, 나폴레옹호텔, 이탈리아호텔추천, 이탈리아럭셔리호텔, 	[{"children": [{"text": "."}]}]	[{"children": [{"text": "."}]}]	2024-11-16 21:43:19.913+00	2024-11-16 21:43:19.913+00
31	Grand Hotel Tremezzo	그랜드 호텔 트레메조	grand-hotel-tremezzo	Grand Hotel Tremezzo, Tremezzo Hotel, Tremezzo Luxury Hotel, Italy Hotel, Itlaly Luxury Hotel, parisclass	그랜드 호텔 트레메조, 이탈리아 트레메조, 트레메조호텔, 트레메조호텔추천, 이탈리아호텔추천, 이탈리아럭셔리호텔, 파리클래스,	[{"children": [{"text": "."}]}]	[{"children": [{"text": "."}]}]	2024-11-16 21:47:27.728+00	2024-11-16 21:46:36.715+00
32	Intercontinental Rome Ambasciatori	인테르콘티넨탈 로마 암바샤토리	intercontinental-rome-ambasciatori	intercontinental rome ambasciatori, intercontinental rome, italy private tour, italy private travel, parisclass, italy hotel reduction, italy hotel recommendation	인테르콘티넨탈 로마 암바샤토리, 인터콘티넨탈 로마 호텔, 로마 호텔, 로마 럭셔리 호텔, 파리 클래스, 이탈리아 프라이빗 투어, 이탈리아 투어, 이탈리아 호텔 추천, 로마 호텔 추천, 로마 여행	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 00:11:32.285+00	2024-11-17 00:11:11.54+00
65	Milano Verticale	밀라노 베르티칼레	milno-verticale	milano verticale hotel, milano verticale, milano verticale une sperienze, milano hotel, italia, italy private tour, italy private travel, parisclass, italia, italy hotel reduction, italy hotel recommendation 	밀라노 베르티칼레, 밀라노 베르티칼레 호텔, 밀라노 베르티칼레 우나 스페리엔체, 이탈리아 프라이빗 투어, 이탈리아 여행, 파리 클래스, parisclass, 이태리 호텔, 이탈리아 호텔 추천, 밀라노 호텔 추천	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 00:25:05.112+00	2024-11-17 00:25:05.112+00
66	Hotel Danieli, Venice	호텔 다니엘리, 베니스	hotel-danieli-venice	hotel danieli, hotel danieli venice, venice hotel, italia hotel,  italy private tour, italy private travel, parisclass, italy hotel reduction, italy hotel recommendation	호텔 다니엘리, 호텔 다니엘리 베니스, 베니스 호텔, 베네치아 호텔, 베네치아 여행, 이탈리아 프라이빗 투어, 이탈리아 프라이빗 여행, 파리 클래스, 이탈리아 호텔 추천, 베네치아 호텔 추천, 베니스 호텔 추천 	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 00:31:52.394+00	2024-11-17 00:31:52.394+00
67	Milano Portrait Hotel	밀라노 포트레이트 호텔	milano-portrait-hotel	milano portrait hotel, milano portrait, portrait hotal, milano hotel, milan hotel, parisclass, italy private tour, italy private tour, italy private travel, parisclass, italy hotel reduction, italy hotel recommendation	밀라노 포트레이트 호텔, 밀라노 포트레이트, 밀라노 호텔, 포트레이트 호텔, 밀라노 여행, 파리 클래스, 이탈리아 여행, 이태리 여행, 이탈리아 프라이빗 투어, 이탈리아 프라이빗 여행, 이탈리아 호텔 추천, 밀라노 호텔 추천	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 00:41:18.776+00	2024-11-17 00:41:18.776+00
68	Hotel Eden	호텔 에덴 로마	hotel-eden	hotel eden, hotel eden rome, rome eden, roma hotel, roma private tour, roma private travel, paris class, italy hotel reduction, italy hotel recommendation	호텔 에덴, 호텔 에덴 로마, 로마 에덴, 에델 호텔, 파리 클래스, 로마 프라이빗 투어, 로마 프라이빗 여행, 로마 여행, 로마 호텔 추천 	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 00:50:01.693+00	2024-11-17 00:50:01.693+00
72	The Peninsula London Hotel	더 페닌술라 런던 호텔	the-peninsula-london-hotel	the peninsula london hotel, the peninsula london, london hotal, the peninsula hotel, parisclass, london private tour, london private tour, italy private travel, parisclass, london hotel reduction, london hotel recommendation	더 페닌술라 런던 호텔, 더 페닌술라 런던, 런던 호텔, 파리 클래스, 런던 프라이빗 투어, 런던 프라이빗 여행, 런던 호텔 할인, 런던 호텔 추천	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 01:45:34.006+00	2024-11-17 01:45:34.006+00
73	Bulgari Hotel London	불가리 호텔 런던	bulgari-hotel-london	bulgari hotel london, bulgari hotel, london hotel, london private tour, london private travel, parisclass, london hotel reduction, london hotel recommendation	불가리 호텔 런던, 불가리 호텔, 런던 호텔, 파리 클래스, 런던 프라이빗 투어, 런던 프라이빗 여행, 런던 호텔 추천, 런던 호텔 할인	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 01:49:35.805+00	2024-11-17 01:49:35.805+00
74	The Lanesborough Hotel	더 레인스버러 호텔	the-lanesborough-hotel	the lanesborough hotel, the lanesborough london, london hotel, london private tour, london private travel, parisclass, london hotel reduction, london hotel recommendation	더 레인스버러 호텔, 더 레인스버러 런던, 런던 호텔, 파리 클래스, 런던 프라이빗 투어, 런던 여행, 런던 프라이빗 여행, 런던 호텔 할인, 런던 호텔 추천	[{"children": [{"text": "  "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 01:53:52.865+00	2024-11-17 01:53:52.865+00
75	Shangri-La The Shard, London	샹그릴라 더 샤드 런던 	shangri-la-the-shard-london	shangri-la the shard london, shangri-la the shard, shangri-la london hotel, london hotel, london private tour, london private travel, parisclass, london hotel reduction, london hotel recommendation 	샹그릴라 더 샤드 런던, 샹그릴라 런던 호텔, 런던 호텔, 파리 클래스, 런던 프라이빗 투어, 런던 프라이빗 여행, 런던 호텔 추천, 런던 호텔 할인	[{"children": [{"text": "   "}]}]	[{"children": [{"text": "  "}]}]	2024-11-17 01:59:36.498+00	2024-11-17 01:59:36.498+00
84	The Tokyo Edition, Ginza	더 도쿄 에디션 긴자	the-tokyo-edition-ginza	The Tokyo Edition Ginza, The Tokyo Edition Ginza Hotel, Tokyo Hotel, parisclass,  tokyo hotel recommendation, tokyo hotel reduction	더 도쿄 에디션 긴자, 더 도쿄 에디션 긴자 호텔, 도쿄 호텔, 파리 클래스, 일본 여행, 도쿄 여행, 도쿄 호텔 추천, 도쿄 호텔 할인	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 02:45:16.925+00	2024-11-17 02:45:16.925+00
76	InterContinental London	인터컨티넨탈 런던	intercontinental-london	InterContinental London, london luxury hotel, 	인터컨티넨탈 런던, 런던 럭셔리 호텔, 런던 호텔, 파리 클래스, 런던 프라이빗 투어, 런던 프라이빗 여행, 런던 호텔 추천, 런던 호텔 할인	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 02:08:00.7+00	2024-11-17 02:06:52.185+00
77	Meliá Bilbao Hotel	멜리아 빌바오 호텔	meli-bilbao-hotel	Meliá Bilbao Hotel, Bilbao Hotel, Meliá Hotel, parisclass, Meliá private tour, Meliá private travel, Meliá hotel reduction, Meliá hotel recommendation 	멜리아 빌바오 호텔, 빌바오 호텔, 멜리아 호텔, 파리클래스, 스페인 호텔, 스페인 호텔 추천, 빌바오 호텔 추천, 스페인 프라이빗 투어, 스페인 프라이빗 여행, 빌바오 호텔 추천, 빌바오 호텔 할인	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 02:13:46.753+00	2024-11-17 02:13:46.753+00
78	Bulgari Hotel Shanghai	불가리 호텔 상하이	bulgari-hotel-shanghai	Bulgari Hotel Shanghai, Bulgari Hotel, Hotel Shanghai, parisclass, shanghai private travel, shanghai hotel reduction, shanghai hotel recommendation	불가리 호텔 상하이, 불가리 호텔, 호텔 상하이, 파리클래스, 상하이 프라이빗 투어, 상하이 호텔 할인, 상하이 호텔 추천	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 02:17:45.235+00	2024-11-17 02:17:45.235+00
79	Bulgari Hotel Beijing	불가리 호텔 베이징	bulgari-hotel-beijing	Bulgari Hotel Beijing, Bulgari Hotel, Hotel Beijing, parisclass, Beijing hotel reduction, Beijing hotel recommendation 	불가리 호텔 베이징, 불가리 호텔, 호텔 베이징, 파리클래스, 베이징 프라이빗 투어, 베이징 호텔 추천, 베이징 호텔 할인	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 02:21:20.245+00	2024-11-17 02:21:20.245+00
80	Niccolo Chengdu	니콜로 청두	niccolo-chengdu	niccolo chengdu, chengdu hotel, parisclass, chengdu hotel reduction, chengdu hotel recommendation	니콜로 청두, 니콜로 호텔, 니콜로 청두 호텔, 파리 클래스, 청두 호텔 추천, 청두 호텔 할인, 중국 여행, 청두 여행	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 02:26:43.261+00	2024-11-17 02:26:43.261+00
81	Josun Palace, a Luxury Collection Hotel	조선 팰리스 강남 호텔	josun-palace	Josun Palace, a Luxury Collection Hotel, Josun Palace Hotel, Seoul Hotel, Gangnam hotel, parisclass, seoul hotel recommendation	조선 팰리스 강남 호텔, 조선 팰리스 호텔, 강남 호텔, 파리 클래스, 강남 호텔 추천, 강남 호텔 할인, 서울 호텔 추천	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 02:32:16.794+00	2024-11-17 02:32:16.794+00
82	Shangri-La Hotel Tokyo	샹그릴라 도쿄 호텔	shangri-la-hotel-tokyo	Shangri-La Hotel Tokyo, Tokyo Hotel, Shangri-La Hotel, parisclass, tokyo hotel recommendation, tokyo hotel reduction	샹그릴라 도쿄 호텔, 도쿄 호텔, 샹그릴라 호텔, 도쿄 여행, 도쿄 호텔 추천, 도쿄 호텔 할인, 파리클래스, 일본 호텔 추천	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 02:37:03.016+00	2024-11-17 02:37:03.016+00
83	Suiran, a Luxury Collection Hotel, Kyoto	스이란 럭셔리 컬렉션 호텔 교토	suiran-a-luxury-collection-hotel-kyoto	Suiran Hotel Kyoto, Suiran Hotel, Kyoto Hotel, parisclass, kyoto hotel recommendation, kyoto hotel reduction	스이란 럭셔리 컬렉션 호텔 교토, 교토 호텔, 스이란 호텔, 교토 여행, 파리클래스, 교토 호텔 추천, 교토 호텔 할인, 일본 호텔 추천	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 02:41:01.847+00	2024-11-17 02:41:01.847+00
85	Andaz Tokyo Toranomon Hills	안다즈 도쿄 도라노몬 힐즈	andaz-tokyo-toranomon-hills	Andaz Tokyo Toranomon Hills, Tokyo Andaz Hotel, parisclass, tokyo hotel recommendation, tokyo hotel reduction	안다즈 도쿄 도라노몬 힐즈, 안다즈 도쿄 호텔, 안다즈 도라노몬 힐즈, 파리클래스, 도쿄 호텔 추천, 도쿄 호텔 할인	[{"children": [{"text": "  "}]}]	[{"children": [{"text": "  "}]}]	2024-11-17 02:49:42.613+00	2024-11-17 02:49:42.613+00
87	Hoshinoya Tokyo Hotel	호시노야 도쿄 호텔	hoshinoya-tokyo-hotel	Hoshinoya Tokyo Hotel, Hoshinoya Tokyo, tokyo hotel recommendation, tokyo hotel reductionHoshinoya Hotel, Tokyo Hotel, parisclass, 	호시노야 도쿄 호텔, 호시노야 도쿄, 도쿄 호텔, 도쿄 여행, 도쿄 호텔 추천, 도쿄 호텔 할인, 파리클래스, 일본 호텔 추천	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 02:56:42.061+00	2024-11-17 02:56:42.061+00
88	Hôtel de Paris Monte-Carlo	호텔 드 파리 몬테카를로	htel-de-paris-monte-carlo	Hôtel de Paris Monte-Carlo, Monaco Hôtel, parisclass, monaco hotel recommendation, monaco hotel reduction	호텔 드 파리 몬테카를로, 모나코 호텔, 모나코 여행, 파리클래스, 모나코 호텔 할인	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 03:03:03.642+00	2024-11-17 03:03:03.642+00
89	The RuMa Hotel and Residences	더 루마 호텔 앤드 레지던스	the-ruma-hotel-and-residences	The RuMa Hotel and Residences, kuala lumpur hotels, parisclass, kuala lumpur travel, kuala lumpur hotel recommendation, kuala lumpur hotel reduction	더 루마 호텔 앤드 레지던스, 쿠알라룸푸르 호텔, 파리 클래스, 쿠알라룸푸르 호텔 추천, 쿠알라룸푸르 호텔 할인, 쿠알라룸푸르 여행	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 03:14:02.006+00	2024-11-17 03:14:02.006+00
90	 Anantara Palazzo Naiadi Rome Hotel	아난타라 팔라조 나이아기 로마 호텔	-anantara-palazzo-naiadi-rome-hotel	 Anantara Palazzo Naiadi Rome Hotel	아난타라 팔라조 나이아기 로마 호텔, 이탈리아호텔추천, 로마호텔추천, 로마숙소, 로마숙소추천, 로마여행, 이탈리아여행, 파리클래스	[{"children": [{"text": "."}]}]	[{"children": [{"text": "."}]}]	2024-11-17 11:35:49.746+00	2024-11-17 11:35:49.746+00
92	Equinox Hotel New York	에퀴녹스 호텔 뉴욕	equinox-hotel-new-york	Equinox Hotel, New York Hotel, new york luxury hotel	에퀴녹스 호텔, 뉴욕호텔, 뉴욕숙소, 뉴욕호텔추천, 뉴욕여행	[{"children": [{"text": "."}]}]	[{"children": [{"text": "."}]}]	2024-11-17 11:49:07.574+00	2024-11-17 11:49:07.574+00
93	 Mandarin Oriental New York	만다린 오리엔탈 뉴욕	-mandarin-oriental-new-york	 Mandarin Oriental New York, mandarin hotel, new york hotel, new york luxury hotel, new york travel	만다린 오리엔탈 뉴욕, 뉴욕호텔, 뉴욕숙소, 뉴욕뷰맛집호텔, 뉴욕럭셔리호텔, 뉴욕호텔할인	[{"children": [{"text": "."}]}]	[{"children": [{"text": "."}]}]	2024-11-17 11:53:07.038+00	2024-11-17 11:51:59.84+00
94	InterContinental Bordeaux - Le Grand Hotel	인터콘티넨탈 보르도 호텔	intercontinental-bordeaux---le-grand-hotel	InterContinental Bordeaux, bordeaux hotel, france hotel, bordeaux luxury hotel	인터콘티넨탈 보르도 호텔, 보르도호텔, 프랑스보르도, 프랑스보르도여행, 보르도럭셔리호텔, 프랑스호텔추천, 보르도숙소, 파리클래스, 프랑스여행	[{"children": [{"text": "."}]}]	[{"children": [{"text": "."}]}]	2024-11-17 15:33:14.402+00	2024-11-17 15:33:14.402+00
95	One & Only The Palm	원 앤 온리 더 팜 두바이	one--only-the-palm	One & Only The Palm, Dubai hotel, parisclass, Dubai hotel , Palm Jumeirah Hotel, Palm Jumeirah Travel	원 앤 온리 더 팜 두바이, 두바이 호텔, 파리클래스, 두바이 럭셔리 호텔, 두바이 5성급 호텔, 두바이 여행	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 16:09:59.149+00	2024-11-17 16:09:59.149+00
96	Ayana Komodo Waecicu Beach	라부안 바조 호텔	ayana-komodo-waecicu-beach	Ayana Komodo Waecicu Beach, Indonesia Hotel, Visit Indonesia, parisclass	라부안 바조 호텔, 인도네시아 호텔, 파리클래스, 인도네시아 호텔 추천, 인도네시아 여행	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 16:15:49.048+00	2024-11-17 16:15:49.048+00
97	The Langham Jakarta	더 랭햄 자카르타	the-langham-jakarta	The Langham Jakarta, The Langham Jakarta hotel, hotel jakarta, parisclass, indonesia hotel, indonesia travel	더 랭햄 자카르타, 더 랭햄 자카르타 호텔, 인도네시아 호텔, 자카르타 호텔, 파리클래스	[{"children": [{"text": "  "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 16:20:47.375+00	2024-11-17 16:20:47.375+00
98	Mandarin Oriental, Hong Kong	만다린 오리엔탈 홍콩	mandarin-oriental-hong-kong	Mandarin Oriental Hong Kong, Mandarin Oriental hotel, hongkong hotel, parisclass	만다린 오리엔탈 홍콩, 만다린 오리엔탈, 만다린 오리엔탈 호텔, 파리클래스, 홍콩 호텔 추천, 홍콩 호텔 할인	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 16:30:58.199+00	2024-11-17 16:30:58.199+00
99	The Fullerton Bay Hotel	더 풀러턴 베이 호텔 싱가포르	the-fullerton-bay-hotel	The Fullerton Bay Hotel, The Fullerton Bay, Singapore hotel, parisclass, 	더 풀러턴 베이 호텔 싱가포르, 더 풀러턴 베이, 더 풀러턴 베이 싱가포르, 싱가포르 호텔, 파리클래스, 싱가포르 여행	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 16:36:07.89+00	2024-11-17 16:36:07.89+00
100	The Reverie Saigon Residential Suites	더 레버리 사이공 레지덴셜 스위트 호텔	the-reverie-saigon-residential-suites	The Reverie Saigon Residential Suites, The Reverie Saigon, Saigon hotel, Vietnam Travel, vietnam hotel, paris class	더 레버리 사이공 레지덴셜 스위트 호텔, 더 레버리 사이공, 베트남 여행, 베트남 호텔, 호치민 호텔, 파리 클래스	[{"children": [{"text": "  "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 16:40:16.844+00	2024-11-17 16:40:16.844+00
101	Okada Manila	오카다 마닐라	okada-manila	Okada Manila, Okada Manila Hotel, parisclass, philippines travel, manila hotel	오카다 마닐라, 오카다 마닐라 호텔, 파리 클래스, 마닐라 호텔, 필리핀 여행	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 16:43:31.751+00	2024-11-17 16:43:31.751+00
102	Shangri-La at the Fort Manila	샹그릴라 더 포트 마닐라	shangri-la-at-the-fort-manila	Shangri-La at the Fort Manila, Shangri-La at the Fort, parisclass, manila hotel, philippines travel	샹그릴라 더 포트 마닐라, 샹그릴라 더 포트, 마닐라 호텔, 마닐라 호텔 추천, 파리 클래스, 마닐라 여행, 필리핀 여행	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 16:46:32.424+00	2024-11-17 16:46:32.424+00
103	Lanson Place Mall of Asia Manila	랜슨 플레이스 몰 오브 아시아 마닐라	lanson-place-mall-of-asia-manila	Lanson Place Mall of Asia Manila, manila hotel, parisclass, lanson place mall, philippines travel	랜슨 플레이스 몰 오브 아시아 마닐라, 랜슨 플레이스 몰, 마닐라 호텔, 필리핀 여행, 파리클래스	[{"children": [{"text": "  "}]}]	[{"children": [{"text": "  "}]}]	2024-11-17 16:51:39.885+00	2024-11-17 16:51:39.885+00
104	Aman New York	아만 뉴욕 호텔	aman-new-york	Aman New York, Aman hotel, parisclass, New York travel, new york hotel	아만 뉴욕 호텔, 아만 뉴욕, 뉴욕 호텔, 파리 클래스, 뉴욕 여행, 뉴욕 호텔 추천, 뉴욕 호텔 할인	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 16:56:06.568+00	2024-11-17 16:56:06.568+00
105	The Langham, New York, Fifth Avenue	더 랭함 뉴욕 피프스 애비뉴	the-langham-new-york-fifth-avenue	The Langham, New York, Fifth Avenue, New York hotel, parisclass, New York travel	더 랭함 뉴욕 피프스 애비뉴, 뉴욕 호텔, 파리클래스, 뉴욕 여행, 뉴욕 호텔 추천, 뉴욕 호텔 할인	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 17:01:32.261+00	2024-11-17 17:01:32.261+00
106	The Plaza New York Hotel	뉴욕 더 플라자 호텔	the-plaza-new-york-hotel	The Plaza New York Hotel, The Plaza New York, New York Hotel, parisclass, New York travel	뉴욕 더 플라자 호텔, 더 플라자 뉴욕, 더 플라자 호텔, 파리 클래스, 뉴욕 호텔, 뉴욕 여행, 뉴욕 호텔 추천	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 17:05:35.625+00	2024-11-17 17:05:35.625+00
107	The Beverly Hills Hotel	더 베벌리 힐스 호텔	the-beverly-hills-hotel	The Beverly Hills Hotel, The Beverly Hills, LA Hotel, parisclass, LA Travel	더 베벌리 힐스 호텔, 더 베벌리 힐스, LA 호텔, 파리클래스, 미국 여행	[{"children": [{"text": " "}]}]	[{"children": [{"text": " "}]}]	2024-11-17 17:08:09.941+00	2024-11-17 17:08:09.941+00
108	The Ritz-Carlton Residences	하와이 더 리츠칼튼 레지던스 호텔	the-ritz-carlton-residences	The Ritz-Carlton Residences, The Ritz-Carlton Hawaii, The Ritz-Carlton hotel, parisclass, Hawaii travel, Hawaii hotel	하와이 더 리츠칼튼 레지던스 호텔, 더 리츠칼튼, 더 리츠칼튼 레지던스 호텔, 하와이 호텔, 하와이 여행, 파리 클래스	[{"children": [{"text": "  "}]}]	[{"children": [{"text": "  "}]}]	2024-11-17 17:13:29.448+00	2024-11-17 17:13:29.448+00
109	The Joseph, a Luxury Collection Hotel	더 조셉, 어 럭셔리 컬렉션 호텔 내슈빌	the-joseph-hotel-nashville	The Joseph, a Luxury Collection Hotel, The Joseph Hotel Nashville, parisclass, Nashville hotel	더 조셉, 어 럭셔리 컬렉션 호텔 내슈빌, 더 조셉 호텔, 내슈빌 호텔, 파리클래스	[{"children": [{"text": ""}]}, {"children": [{"text": ""}]}]	[{"children": [{"text": ""}]}, {"children": [{"text": ""}]}]	2024-11-29 16:35:27.425+00	2024-11-17 17:17:49.325+00
110	SO/ Paris	SO/ Paris	so-paris	so/ paris, so/ paris hotel, paris luxury hotel, paris private travel, paris private tour, parisclass, paris hotel	쏘 파리, 쏘 파리 호텔, 파리 럭셔리 호텔, 파리프라이빗투어, 파리프라이빗여행, 파리클래스 	[{"type": "upload", "value": {"id": 235}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}, {"type": "upload", "value": {"id": 256}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}, {"type": "upload", "value": {"id": 241}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}, {"type": "upload", "value": {"id": 257}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}, {"type": "upload", "value": {"id": 243}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}, {"type": "upload", "value": {"id": 244}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}, {"type": "upload", "value": {"id": 245}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}, {"children": [{"text": ""}]}, {"type": "upload", "value": {"id": 246}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}, {"type": "upload", "value": {"id": 247}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}, {"type": "upload", "value": {"id": 248}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}]	[{"type": "upload", "value": {"id": 235}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}, {"type": "upload", "value": {"id": 258}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}, {"type": "upload", "value": {"id": 261}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}, {"type": "upload", "value": {"id": 259}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}, {"type": "upload", "value": {"id": 252}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}, {"type": "upload", "value": {"id": 253}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}, {"type": "upload", "value": {"id": 245}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}, {"type": "upload", "value": {"id": 246}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}, {"type": "upload", "value": {"id": 254}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}, {"type": "upload", "value": {"id": 255}, "children": [{"text": ""}], "relationTo": "media"}, {"children": [{"text": ""}]}]	2024-11-29 16:42:51.604+00	2024-11-29 16:31:38.22+00
\.


--
-- Data for Name: partner_hotels_carousel; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.partner_hotels_carousel (id, en_title, kr_title, en_subtext, kr_subtext, link, "order", updated_at, created_at) FROM stdin;
3	SO/ PARIS 10% Discount Event ! 	SO/ PARIS 10% 할인 이벤트 	Don't miss up this good opportunity to have beautiful hotel stay with good price!            (F&B Credits & Free upgrade upon availability)	10% 할인과 (최저가) 조식 포함, 그리고 F&B 크레딧까지 받아가세요! 	https://travelinyourpocket.com/ko/partner-hotels/so-paris	1	2024-11-30 10:25:18.913+00	2024-11-19 14:49:32.514+00
\.


--
-- Data for Name: partner_hotels_carousel_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.partner_hotels_carousel_rels (id, "order", parent_id, path, media_id) FROM stdin;
25	\N	3	leftThumbnail	169
26	\N	3	centerThumbnail	170
27	\N	3	rightThumbnail	171
\.


--
-- Data for Name: partner_hotels_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.partner_hotels_rels (id, "order", parent_id, path, countries_id, media_id) FROM stdin;
121	\N	23	country	1	\N
122	\N	23	thumbnail	\N	58
123	\N	24	country	1	\N
124	\N	24	thumbnail	\N	59
125	\N	8	country	1	\N
126	\N	8	thumbnail	\N	60
127	\N	1	country	1	\N
128	\N	1	thumbnail	\N	61
129	\N	25	country	1	\N
130	\N	25	thumbnail	\N	62
131	\N	26	country	1	\N
132	\N	26	thumbnail	\N	63
133	\N	27	country	1	\N
134	\N	27	thumbnail	\N	64
137	\N	28	country	1	\N
138	\N	28	thumbnail	\N	73
139	\N	29	country	4	\N
140	\N	29	thumbnail	\N	74
141	\N	30	country	4	\N
142	\N	30	thumbnail	\N	75
145	\N	31	country	4	\N
146	\N	31	thumbnail	\N	76
149	\N	32	country	4	\N
150	\N	32	thumbnail	\N	78
180	\N	65	country	4	\N
181	\N	65	thumbnail	\N	112
182	\N	66	country	4	\N
183	\N	66	thumbnail	\N	113
184	\N	67	country	4	\N
185	\N	67	thumbnail	\N	114
186	\N	68	country	4	\N
187	\N	68	thumbnail	\N	115
188	\N	69	country	5	\N
189	\N	69	thumbnail	\N	119
194	\N	70	country	5	\N
195	\N	70	thumbnail	\N	121
198	\N	71	country	6	\N
199	\N	71	thumbnail	\N	122
200	\N	72	country	6	\N
201	\N	72	thumbnail	\N	124
202	\N	73	country	6	\N
203	\N	73	thumbnail	\N	128
204	\N	74	country	6	\N
205	\N	74	thumbnail	\N	129
206	\N	75	country	6	\N
207	\N	75	thumbnail	\N	130
212	\N	76	country	6	\N
213	\N	76	thumbnail	\N	133
75	\N	2	country	1	\N
76	\N	2	thumbnail	\N	35
79	\N	3	country	1	\N
80	\N	3	thumbnail	\N	37
214	\N	77	country	7	\N
215	\N	77	thumbnail	\N	134
83	\N	4	country	1	\N
84	\N	4	thumbnail	\N	39
85	\N	5	country	1	\N
86	\N	5	thumbnail	\N	40
87	\N	6	country	1	\N
88	\N	6	thumbnail	\N	41
89	\N	7	country	1	\N
90	\N	7	thumbnail	\N	42
93	\N	9	country	1	\N
94	\N	9	thumbnail	\N	44
95	\N	10	country	1	\N
96	\N	10	thumbnail	\N	45
97	\N	11	country	1	\N
98	\N	11	thumbnail	\N	46
99	\N	12	country	1	\N
100	\N	12	thumbnail	\N	47
101	\N	13	country	1	\N
102	\N	13	thumbnail	\N	48
103	\N	14	country	1	\N
104	\N	14	thumbnail	\N	49
105	\N	15	country	1	\N
106	\N	15	thumbnail	\N	50
107	\N	16	country	1	\N
108	\N	16	thumbnail	\N	51
109	\N	17	country	1	\N
110	\N	17	thumbnail	\N	52
111	\N	18	country	1	\N
112	\N	18	thumbnail	\N	53
113	\N	19	country	1	\N
114	\N	19	thumbnail	\N	54
115	\N	20	country	1	\N
116	\N	20	thumbnail	\N	55
117	\N	21	country	1	\N
118	\N	21	thumbnail	\N	56
119	\N	22	country	1	\N
120	\N	22	thumbnail	\N	57
216	\N	78	country	8	\N
217	\N	78	thumbnail	\N	135
218	\N	79	country	8	\N
219	\N	79	thumbnail	\N	136
220	\N	80	country	8	\N
221	\N	80	thumbnail	\N	137
222	\N	81	country	9	\N
223	\N	81	thumbnail	\N	138
224	\N	82	country	10	\N
225	\N	82	thumbnail	\N	139
226	\N	83	country	10	\N
227	\N	83	thumbnail	\N	140
228	\N	84	country	10	\N
229	\N	84	thumbnail	\N	141
230	\N	85	country	10	\N
231	\N	85	thumbnail	\N	142
232	\N	86	country	10	\N
233	\N	86	thumbnail	\N	143
234	\N	87	country	10	\N
235	\N	87	thumbnail	\N	144
236	\N	88	country	11	\N
237	\N	88	thumbnail	\N	145
238	\N	89	country	12	\N
239	\N	89	thumbnail	\N	146
240	\N	90	country	4	\N
241	\N	90	thumbnail	\N	147
244	\N	92	country	13	\N
245	\N	92	thumbnail	\N	149
248	\N	93	country	13	\N
249	\N	93	thumbnail	\N	151
250	\N	94	country	1	\N
251	\N	94	thumbnail	\N	152
252	\N	95	country	14	\N
253	\N	95	thumbnail	\N	153
254	\N	96	country	15	\N
255	\N	96	thumbnail	\N	154
256	\N	97	country	15	\N
257	\N	97	thumbnail	\N	155
258	\N	98	country	16	\N
259	\N	98	thumbnail	\N	157
260	\N	99	country	17	\N
261	\N	99	thumbnail	\N	158
262	\N	100	country	18	\N
263	\N	100	thumbnail	\N	159
264	\N	101	country	19	\N
265	\N	101	thumbnail	\N	160
266	\N	102	country	19	\N
267	\N	102	thumbnail	\N	161
268	\N	103	country	19	\N
269	\N	103	thumbnail	\N	162
270	\N	104	country	13	\N
271	\N	104	thumbnail	\N	163
272	\N	105	country	13	\N
273	\N	105	thumbnail	\N	164
274	\N	106	country	13	\N
275	\N	106	thumbnail	\N	165
276	\N	107	country	13	\N
277	\N	107	thumbnail	\N	166
278	\N	108	country	13	\N
279	\N	108	thumbnail	\N	167
308	\N	109	country	13	\N
309	\N	109	thumbnail	\N	168
314	\N	110	country	1	\N
315	\N	110	thumbnail	\N	260
\.


--
-- Data for Name: payload_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_migrations (id, name, batch, updated_at, created_at) FROM stdin;
1	20241104_142910	1	2024-11-04 14:29:29.56+00	2024-11-04 14:29:29.56+00
2	20241104_142949	2	2024-11-04 14:31:18.774+00	2024-11-04 14:31:18.774+00
\.


--
-- Data for Name: payload_preferences; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_preferences (id, key, value, updated_at, created_at) FROM stdin;
3	experiences-list	{"limit": "10", "columns": [{"active": true, "accessor": "_select"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "country"}, {"active": true, "accessor": "en_title"}, {"active": true, "accessor": "kr_title"}, {"active": false, "accessor": "slug"}, {"active": false, "accessor": "en_keywords"}, {"active": false, "accessor": "kr_keywords"}, {"active": false, "accessor": "thumbnail"}, {"active": false, "accessor": "en_content"}, {"active": false, "accessor": "kr_content"}, {"active": false, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}]}	2024-11-04 16:14:31.606+00	2024-11-04 16:14:31.606+00
5	media-list	{"sort": null, "columns": [{"active": true, "accessor": "filename"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "en_alt"}, {"active": true, "accessor": "kr_alt"}, {"active": false, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}, {"active": false, "accessor": "url"}, {"active": false, "accessor": "mimeType"}, {"active": false, "accessor": "filesize"}, {"active": false, "accessor": "width"}, {"active": false, "accessor": "height"}, {"active": false, "accessor": "focalX"}, {"active": false, "accessor": "focalY"}]}	2024-11-05 16:16:34.587+00	2024-11-05 16:16:34.587+00
6	experiences-top-carousel-list	{"columns": [{"active": true, "accessor": "_select"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "en_title"}, {"active": true, "accessor": "kr_title"}, {"active": true, "accessor": "en_subText"}, {"active": false, "accessor": "kr_subText"}, {"active": false, "accessor": "link"}, {"active": false, "accessor": "thumbnail"}, {"active": false, "accessor": "order"}, {"active": false, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}]}	2024-11-09 16:33:07.608+00	2024-11-09 16:33:07.608+00
9	experiences-bottom-carousel-list	{"limit": "10", "columns": [{"active": true, "accessor": "_select"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "en_title"}, {"active": true, "accessor": "kr_title"}, {"active": true, "accessor": "en_subText"}, {"active": false, "accessor": "kr_subText"}, {"active": false, "accessor": "link"}, {"active": false, "accessor": "leftThumbnail"}, {"active": false, "accessor": "rightThumbnail"}, {"active": false, "accessor": "order"}, {"active": false, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}]}	2024-11-17 00:52:14.74+00	2024-11-17 00:52:14.74+00
8	users-list	{"sort": null, "columns": [{"active": true, "accessor": "email"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "updatedAt"}, {"active": true, "accessor": "createdAt"}]}	2024-11-17 00:02:02.085+00	2024-11-17 00:02:02.085+00
2	countries-list	{"limit": "10", "columns": [{"active": true, "accessor": "_select"}, {"active": true, "accessor": "name"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "updatedAt"}, {"active": true, "accessor": "createdAt"}]}	2024-11-04 16:08:55.937+00	2024-11-04 16:08:55.937+00
7	nav	{"open": false}	2024-11-11 00:59:24.731+00	2024-11-11 00:59:24.731+00
1	partner-hotels-list	{"columns": [{"active": true, "accessor": "_select"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "en_title"}, {"active": true, "accessor": "kr_title"}, {"active": true, "accessor": "slug"}, {"active": false, "accessor": "country"}, {"active": false, "accessor": "en_keywords"}, {"active": false, "accessor": "kr_keywords"}, {"active": false, "accessor": "thumbnail"}, {"active": false, "accessor": "en_content"}, {"active": false, "accessor": "kr_content"}, {"active": false, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}]}	2024-11-04 14:32:28.062+00	2024-11-04 14:32:28.062+00
4	partner-hotels-carousel-list	{"columns": [{"active": true, "accessor": "_select"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "en_title"}, {"active": true, "accessor": "kr_title"}, {"active": true, "accessor": "en_subText"}, {"active": false, "accessor": "kr_subText"}, {"active": false, "accessor": "link"}, {"active": false, "accessor": "leftThumbnail"}, {"active": false, "accessor": "centerThumbnail"}, {"active": false, "accessor": "rightThumbnail"}, {"active": false, "accessor": "order"}, {"active": false, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}]}	2024-11-04 16:14:34.285+00	2024-11-04 16:14:34.285+00
\.


--
-- Data for Name: payload_preferences_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_preferences_rels (id, "order", parent_id, path, users_id) FROM stdin;
387	\N	5	user	1
393	\N	6	user	1
394	\N	9	user	1
395	\N	2	user	1
397	\N	3	user	1
407	\N	7	user	1
408	\N	1	user	1
409	\N	4	user	1
371	\N	8	user	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, updated_at, created_at, email, reset_password_token, reset_password_expiration, salt, hash, login_attempts, lock_until) FROM stdin;
1	2024-11-16 23:59:14.59+00	2024-11-04 14:32:22.957+00	admin@tip.com	\N	\N	e2e093f04b442d4e8b725a90e0a3b8367f7a144bcdbe79d9a525f9bf8de2a9fe	b328abfd60013fef57cfff9f9353481730e9eec2d674a730f8f964d222386185294d3771ec5913f697e091b42ab6a7519636c823b3dfa07b2c793dcf0a5a1436de3ca1aed7f6e10e0a3abf0c5bb85ddd0a7f1758838c3bcf04a3bafffb52cb63c7c107cc70a0cb994408a085f205ed2f16e8580d138d96b816424ebd92054cd337b5591f9e95f24de66de226feb43c7471315c59ed08827855482d99e24147a49faf4951023718b39133619b5d21c29e0b0d24b104498dd42cf0fd31c41647ed4a7703bd1e81ff6e49fafd9cd336f5641900083110310b5beeadb3c9ecad558b97584f977e8c1a30bea999b78da15385e498f5d1d3b7c7f3985d1b0ff37ec671acbb05756d9109f6415e5c8ade2cb8d7a0236aff4b3d1e743898d05af67f817e269677a5367b4db3d5b671d40be07beb0b94423e640146570c2866b5964ea2b923cb68b8792d32384f6418d1f6ecbfe38aaf04f8aae17905684c85e646cf6d5801e946db879cfe8c4773024f29d24fcd9a4b5b8e772e1a279bcc5802d85e0450b947c2946038f7929a4cc350a16ba87a32a215905a87e3db8c2bd9bd57348b230e4653de4bfd60e1c4e5189eba491534938e587fc94ddd211286570fe3d194283130fd560a3e65f2cf0f09723edca6eacb0018e340e4b111ec2e5e887f01d2d6ae03a3053b89fa0c14420a1c63112e1dd35d9f19aff5dd91367343443c35d0d9	1	\N
\.


--
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.countries_id_seq', 21, true);


--
-- Name: experiences_bottom_carousel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.experiences_bottom_carousel_id_seq', 1, true);


--
-- Name: experiences_bottom_carousel_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.experiences_bottom_carousel_rels_id_seq', 12, true);


--
-- Name: experiences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.experiences_id_seq', 4, true);


--
-- Name: experiences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.experiences_rels_id_seq', 84, true);


--
-- Name: experiences_top_carousel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.experiences_top_carousel_id_seq', 1, true);


--
-- Name: experiences_top_carousel_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.experiences_top_carousel_rels_id_seq', 5, true);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_id_seq', 261, true);


--
-- Name: partner_hotels_carousel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.partner_hotels_carousel_id_seq', 3, true);


--
-- Name: partner_hotels_carousel_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.partner_hotels_carousel_rels_id_seq', 27, true);


--
-- Name: partner_hotels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.partner_hotels_id_seq', 110, true);


--
-- Name: partner_hotels_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.partner_hotels_rels_id_seq', 315, true);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_migrations_id_seq', 2, true);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_preferences_id_seq', 9, true);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_preferences_rels_id_seq', 409, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- Name: experiences_bottom_carousel experiences_bottom_carousel_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences_bottom_carousel
    ADD CONSTRAINT experiences_bottom_carousel_pkey PRIMARY KEY (id);


--
-- Name: experiences_bottom_carousel_rels experiences_bottom_carousel_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences_bottom_carousel_rels
    ADD CONSTRAINT experiences_bottom_carousel_rels_pkey PRIMARY KEY (id);


--
-- Name: experiences experiences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences
    ADD CONSTRAINT experiences_pkey PRIMARY KEY (id);


--
-- Name: experiences_rels experiences_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences_rels
    ADD CONSTRAINT experiences_rels_pkey PRIMARY KEY (id);


--
-- Name: experiences_top_carousel experiences_top_carousel_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences_top_carousel
    ADD CONSTRAINT experiences_top_carousel_pkey PRIMARY KEY (id);


--
-- Name: experiences_top_carousel_rels experiences_top_carousel_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences_top_carousel_rels
    ADD CONSTRAINT experiences_top_carousel_rels_pkey PRIMARY KEY (id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: partner_hotels_carousel partner_hotels_carousel_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.partner_hotels_carousel
    ADD CONSTRAINT partner_hotels_carousel_pkey PRIMARY KEY (id);


--
-- Name: partner_hotels_carousel_rels partner_hotels_carousel_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.partner_hotels_carousel_rels
    ADD CONSTRAINT partner_hotels_carousel_rels_pkey PRIMARY KEY (id);


--
-- Name: partner_hotels partner_hotels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.partner_hotels
    ADD CONSTRAINT partner_hotels_pkey PRIMARY KEY (id);


--
-- Name: partner_hotels_rels partner_hotels_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.partner_hotels_rels
    ADD CONSTRAINT partner_hotels_rels_pkey PRIMARY KEY (id);


--
-- Name: payload_migrations payload_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_migrations
    ADD CONSTRAINT payload_migrations_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences payload_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences
    ADD CONSTRAINT payload_preferences_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences_rels payload_preferences_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: countries_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX countries_created_at_idx ON public.countries USING btree (created_at);


--
-- Name: experiences_bottom_carousel_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX experiences_bottom_carousel_created_at_idx ON public.experiences_bottom_carousel USING btree (created_at);


--
-- Name: experiences_bottom_carousel_rels_media_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX experiences_bottom_carousel_rels_media_id_idx ON public.experiences_bottom_carousel_rels USING btree (media_id);


--
-- Name: experiences_bottom_carousel_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX experiences_bottom_carousel_rels_order_idx ON public.experiences_bottom_carousel_rels USING btree ("order");


--
-- Name: experiences_bottom_carousel_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX experiences_bottom_carousel_rels_parent_idx ON public.experiences_bottom_carousel_rels USING btree (parent_id);


--
-- Name: experiences_bottom_carousel_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX experiences_bottom_carousel_rels_path_idx ON public.experiences_bottom_carousel_rels USING btree (path);


--
-- Name: experiences_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX experiences_created_at_idx ON public.experiences USING btree (created_at);


--
-- Name: experiences_rels_countries_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX experiences_rels_countries_id_idx ON public.experiences_rels USING btree (countries_id);


--
-- Name: experiences_rels_media_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX experiences_rels_media_id_idx ON public.experiences_rels USING btree (media_id);


--
-- Name: experiences_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX experiences_rels_order_idx ON public.experiences_rels USING btree ("order");


--
-- Name: experiences_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX experiences_rels_parent_idx ON public.experiences_rels USING btree (parent_id);


--
-- Name: experiences_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX experiences_rels_path_idx ON public.experiences_rels USING btree (path);


--
-- Name: experiences_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX experiences_slug_idx ON public.experiences USING btree (slug);


--
-- Name: experiences_top_carousel_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX experiences_top_carousel_created_at_idx ON public.experiences_top_carousel USING btree (created_at);


--
-- Name: experiences_top_carousel_rels_media_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX experiences_top_carousel_rels_media_id_idx ON public.experiences_top_carousel_rels USING btree (media_id);


--
-- Name: experiences_top_carousel_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX experiences_top_carousel_rels_order_idx ON public.experiences_top_carousel_rels USING btree ("order");


--
-- Name: experiences_top_carousel_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX experiences_top_carousel_rels_parent_idx ON public.experiences_top_carousel_rels USING btree (parent_id);


--
-- Name: experiences_top_carousel_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX experiences_top_carousel_rels_path_idx ON public.experiences_top_carousel_rels USING btree (path);


--
-- Name: media_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_created_at_idx ON public.media USING btree (created_at);


--
-- Name: media_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX media_filename_idx ON public.media USING btree (filename);


--
-- Name: partner_hotels_carousel_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX partner_hotels_carousel_created_at_idx ON public.partner_hotels_carousel USING btree (created_at);


--
-- Name: partner_hotels_carousel_rels_media_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX partner_hotels_carousel_rels_media_id_idx ON public.partner_hotels_carousel_rels USING btree (media_id);


--
-- Name: partner_hotels_carousel_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX partner_hotels_carousel_rels_order_idx ON public.partner_hotels_carousel_rels USING btree ("order");


--
-- Name: partner_hotels_carousel_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX partner_hotels_carousel_rels_parent_idx ON public.partner_hotels_carousel_rels USING btree (parent_id);


--
-- Name: partner_hotels_carousel_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX partner_hotels_carousel_rels_path_idx ON public.partner_hotels_carousel_rels USING btree (path);


--
-- Name: partner_hotels_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX partner_hotels_created_at_idx ON public.partner_hotels USING btree (created_at);


--
-- Name: partner_hotels_rels_countries_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX partner_hotels_rels_countries_id_idx ON public.partner_hotels_rels USING btree (countries_id);


--
-- Name: partner_hotels_rels_media_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX partner_hotels_rels_media_id_idx ON public.partner_hotels_rels USING btree (media_id);


--
-- Name: partner_hotels_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX partner_hotels_rels_order_idx ON public.partner_hotels_rels USING btree ("order");


--
-- Name: partner_hotels_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX partner_hotels_rels_parent_idx ON public.partner_hotels_rels USING btree (parent_id);


--
-- Name: partner_hotels_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX partner_hotels_rels_path_idx ON public.partner_hotels_rels USING btree (path);


--
-- Name: partner_hotels_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX partner_hotels_slug_idx ON public.partner_hotels USING btree (slug);


--
-- Name: payload_migrations_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);


--
-- Name: payload_preferences_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);


--
-- Name: payload_preferences_key_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);


--
-- Name: payload_preferences_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree ("order");


--
-- Name: payload_preferences_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);


--
-- Name: payload_preferences_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);


--
-- Name: payload_preferences_rels_users_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_users_id_idx ON public.payload_preferences_rels USING btree (users_id);


--
-- Name: users_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: experiences_bottom_carousel_rels experiences_bottom_carousel_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences_bottom_carousel_rels
    ADD CONSTRAINT experiences_bottom_carousel_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- Name: experiences_bottom_carousel_rels experiences_bottom_carousel_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences_bottom_carousel_rels
    ADD CONSTRAINT experiences_bottom_carousel_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.experiences_bottom_carousel(id) ON DELETE CASCADE;


--
-- Name: experiences_rels experiences_rels_countries_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences_rels
    ADD CONSTRAINT experiences_rels_countries_fk FOREIGN KEY (countries_id) REFERENCES public.countries(id) ON DELETE CASCADE;


--
-- Name: experiences_rels experiences_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences_rels
    ADD CONSTRAINT experiences_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- Name: experiences_rels experiences_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences_rels
    ADD CONSTRAINT experiences_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.experiences(id) ON DELETE CASCADE;


--
-- Name: experiences_top_carousel_rels experiences_top_carousel_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences_top_carousel_rels
    ADD CONSTRAINT experiences_top_carousel_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- Name: experiences_top_carousel_rels experiences_top_carousel_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences_top_carousel_rels
    ADD CONSTRAINT experiences_top_carousel_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.experiences_top_carousel(id) ON DELETE CASCADE;


--
-- Name: partner_hotels_carousel_rels partner_hotels_carousel_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.partner_hotels_carousel_rels
    ADD CONSTRAINT partner_hotels_carousel_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- Name: partner_hotels_carousel_rels partner_hotels_carousel_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.partner_hotels_carousel_rels
    ADD CONSTRAINT partner_hotels_carousel_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.partner_hotels_carousel(id) ON DELETE CASCADE;


--
-- Name: partner_hotels_rels partner_hotels_rels_countries_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.partner_hotels_rels
    ADD CONSTRAINT partner_hotels_rels_countries_fk FOREIGN KEY (countries_id) REFERENCES public.countries(id) ON DELETE CASCADE;


--
-- Name: partner_hotels_rels partner_hotels_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.partner_hotels_rels
    ADD CONSTRAINT partner_hotels_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- Name: partner_hotels_rels partner_hotels_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.partner_hotels_rels
    ADD CONSTRAINT partner_hotels_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.partner_hotels(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_preferences(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

