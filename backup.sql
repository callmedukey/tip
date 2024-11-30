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

--
-- Name: AccountType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."AccountType" AS ENUM (
    'Business',
    'Leisure',
    'Admin'
);


--
-- Name: EditRequestType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."EditRequestType" AS ENUM (
    'normal',
    'emergency',
    'cancelation'
);


--
-- Name: PackageType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PackageType" AS ENUM (
    'all_inclusive',
    'custom'
);


--
-- Name: Purpose; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Purpose" AS ENUM (
    'leisure',
    'business'
);


--
-- Name: RequestStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."RequestStatus" AS ENUM (
    'pending',
    'awaitingResponse',
    'initialEditing',
    'confirmed',
    'invoiced',
    'paid',
    'editing',
    'canceled'
);


--
-- Name: UserLevel; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."UserLevel" AS ENUM (
    'tip_white',
    'tip_blue',
    'tip_black',
    'tip_gold'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: AddedInvoices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."AddedInvoices" (
    id integer NOT NULL,
    price integer NOT NULL,
    "requestId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: AddedInvoices_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."AddedInvoices_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: AddedInvoices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."AddedInvoices_id_seq" OWNED BY public."AddedInvoices".id;


--
-- Name: Coupon; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Coupon" (
    id text NOT NULL,
    code text NOT NULL,
    description text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: EditRequest; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."EditRequest" (
    id integer NOT NULL,
    "requestId" integer NOT NULL,
    content text NOT NULL,
    "editRequestType" public."EditRequestType" NOT NULL,
    completed boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: EditRequest_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."EditRequest_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: EditRequest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."EditRequest_id_seq" OWNED BY public."EditRequest".id;


--
-- Name: ExtraRequests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ExtraRequests" (
    id integer NOT NULL,
    "requestId" integer NOT NULL,
    "userId" text NOT NULL,
    "requestType" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: ExtraRequests_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."ExtraRequests_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ExtraRequests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."ExtraRequests_id_seq" OWNED BY public."ExtraRequests".id;


--
-- Name: Request; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Request" (
    id integer NOT NULL,
    canceled boolean DEFAULT false NOT NULL,
    status public."RequestStatus" DEFAULT 'pending'::public."RequestStatus" NOT NULL,
    city text[],
    "from" timestamp(3) without time zone NOT NULL,
    "to" timestamp(3) without time zone NOT NULL,
    adults integer NOT NULL,
    infants integer NOT NULL,
    purpose public."Purpose" NOT NULL,
    "packageType" public."PackageType" NOT NULL,
    options text[],
    extra text,
    price integer,
    currency text,
    paid boolean DEFAULT false NOT NULL,
    "paidAt" timestamp(3) without time zone,
    "quoteLink" text,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    confirmed boolean DEFAULT false NOT NULL,
    summary jsonb,
    "travelPlan" jsonb,
    "adminNotes" text,
    "couponId" text,
    "sharedLink" text,
    budget text,
    "startCity" text
);


--
-- Name: Request_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Request_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Request_id_seq" OWNED BY public."Request".id;


--
-- Name: ResetChance; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ResetChance" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Upload; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Upload" (
    id text NOT NULL,
    title text NOT NULL,
    "fileType" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "requestId" integer NOT NULL
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    "phoneNumber" text NOT NULL,
    birthday timestamp(3) without time zone NOT NULL,
    gender text NOT NULL,
    extra text,
    "businessNumber" text,
    "accountType" public."AccountType" NOT NULL,
    "moneySpent" integer DEFAULT 0 NOT NULL,
    "userLevel" public."UserLevel" DEFAULT 'tip_white'::public."UserLevel" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    passcode text,
    newsletter boolean DEFAULT false NOT NULL,
    referrer text
);


--
-- Name: AddedInvoices id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AddedInvoices" ALTER COLUMN id SET DEFAULT nextval('public."AddedInvoices_id_seq"'::regclass);


--
-- Name: EditRequest id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EditRequest" ALTER COLUMN id SET DEFAULT nextval('public."EditRequest_id_seq"'::regclass);


--
-- Name: ExtraRequests id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ExtraRequests" ALTER COLUMN id SET DEFAULT nextval('public."ExtraRequests_id_seq"'::regclass);


--
-- Name: Request id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Request" ALTER COLUMN id SET DEFAULT nextval('public."Request_id_seq"'::regclass);


--
-- Data for Name: AddedInvoices; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."AddedInvoices" (id, price, "requestId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Coupon; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Coupon" (id, code, description, active, "createdAt", "updatedAt") FROM stdin;
5ec2fc10-ee7e-404f-a174-9ae6cb2cb4e2	OPEN EVENT	OPEN	f	2024-10-29 12:39:06.864	2024-11-22 20:37:02.29
89681bee-7c78-4603-b3c5-2466ed7df622	OPEN EVENT 35 USD	WELCOME!	t	2024-11-22 20:37:45.226	2024-11-22 20:37:45.226
b7dd8b72-53e4-4853-a3f1-9147d7a9505c	OPEN EVENT 5만원	WELCOME!	t	2024-11-22 20:37:58.975	2024-11-22 20:37:58.975
\.


--
-- Data for Name: EditRequest; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EditRequest" (id, "requestId", content, "editRequestType", completed, "createdAt", "updatedAt") FROM stdin;
1	1	하이	normal	f	2024-10-29 12:41:17.062	2024-10-29 12:41:17.062
2	1	ㅇㄹㅇㄹㄴㅇㄹㄴ	normal	f	2024-10-29 13:03:40.864	2024-10-29 13:03:40.864
3	1	dsdsd	normal	f	2024-11-09 16:18:05.915	2024-11-09 16:18:05.915
4	1	dsdsd	normal	f	2024-11-09 16:18:12.722	2024-11-09 16:18:12.722
5	6	안녕하세요! KE5901 항공편이고 18:55분 도착예정입니다~	normal	f	2024-11-11 14:53:10.538	2024-11-11 14:53:10.538
6	1	TEST	normal	f	2024-11-14 15:37:15.261	2024-11-14 15:37:15.261
7	1	ㅇㅇㅇㅇ	normal	f	2024-11-23 14:51:58.88	2024-11-23 14:51:58.88
8	22	여행 일정 변경 요청\n1. 파리여행 기간: 4/16일 저녁 17:10 도착해서 4/24일 오전에 보르도로 이동\n2. 4/21일(일)을 휴식\n3. 숙소(49 Rue linos: 예약 예정) 중심으로 여행일정 재 구성\n4. 낭시 여행 대신 지베르니, 샹타이성을 투어로 수정\n5. 몽셀미셀 여행 후 파리로 다시 복귀하고 24일 보르도로 이동	normal	f	2024-11-24 03:21:30.309	2024-11-24 03:21:30.309
9	22	22APR 몽셀미셀 여행후 파리 숙소로 Return하는것으로 여정을 수정하시고 날짜별  여정의 소요시간을 알려주세요	normal	f	2024-11-24 23:28:14.657	2024-11-24 23:28:14.657
10	1	dfdfdf	normal	f	2024-11-25 11:00:23.091	2024-11-25 11:00:23.091
11	1	dfdfdf	normal	f	2024-11-25 11:01:14.085	2024-11-25 11:01:14.085
\.


--
-- Data for Name: ExtraRequests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ExtraRequests" (id, "requestId", "userId", "requestType", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Request; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Request" (id, canceled, status, city, "from", "to", adults, infants, purpose, "packageType", options, extra, price, currency, paid, "paidAt", "quoteLink", "userId", "createdAt", "updatedAt", confirmed, summary, "travelPlan", "adminNotes", "couponId", "sharedLink", budget, "startCity") FROM stdin;
1	t	initialEditing	{Paris}	2024-10-26 00:00:00	2024-11-23 00:00:00	2	0	leisure	all_inclusive	{business,hotel,"tour guide",car}	Art museum - slajfkll	100	KWR	f	\N	dsalfjdl.fr	67e1575a-f7f7-4df0-951e-a1a46dfd10e8	2024-10-24 11:35:41.306	2024-11-25 11:01:14.085	f	[{"label": "손한나님 파리여행", "value": "1차 일정 및 견적"}]	[{"day": "1", "date": "2024-10-24T00:00:00.000Z", "time": "10:00", "latitude": "48.83460481430889", "longitude": "2.3752079312365724", "placeName": "트로카데로"}, {"day": "1", "date": "2024-10-24T00:00:00.000Z", "time": "12:00", "latitude": "48.841722899564836", "longitude": "2.356239350015209", "placeName": "djsslwlq"}]	ㅇㄹㅇㄹㅇ	\N	1e801536-7368-4ed9-b8cd-94e42fd67749	\N	\N
4	f	awaitingResponse	{쿠알라룸푸르}	2024-12-21 00:00:00	2024-12-25 00:00:00	2	3	leisure	all_inclusive	{economy,"airport pick up and drop off",hotel,"tour guide"}		\N	\N	f	\N	\N	6989c589-14ef-46dd-a1cf-07d78e4ed329	2024-11-01 23:12:39.372	2024-11-03 17:43:12.401	f	\N	[{"day": "1", "date": "2024-11-03T00:00:00.000Z", "time": "10:00", "latitude": "48.86280374321892", "longitude": "2.2878888355130753", "placeName": "Trocadero"}, {"day": "2", "date": "2024-11-03T00:00:00.000Z", "time": "10:00", "latitude": "48.860780473305915", "longitude": "2.3380624220202972", "placeName": "Musee du Louvre"}]	Do you need to go Eiffel tower?	\N	9112c40a-fca5-4022-91b1-101cc7e6fabb	\N	\N
5	t	canceled	{"하와이 - 와이키키"}	2024-12-21 00:00:00	2024-12-26 00:00:00	2	3	leisure	all_inclusive	{economy,"airport pick up and drop off",hotel}		\N	\N	f	\N	\N	6989c589-14ef-46dd-a1cf-07d78e4ed329	2024-11-01 23:19:44.914	2024-11-03 19:42:47.593	f	\N	\N	\N	\N	\N	\N	\N
7	f	confirmed	{Paris}	2025-01-15 00:00:00	2025-01-29 00:00:00	2	0	leisure	custom	{hotel,"aesthetic cafes","michelin restaurants","patisserie/cooking classes","winery & champagne","luxury brand shopping"}		1121760	KWR	t	2024-11-19 14:32:16.127	https://s.tosspayments.com/Bkx3NLKcsRU	45d756c0-a1b0-4c48-9e2d-910a0e1ccf29	2024-11-11 14:40:52.036	2024-11-19 16:24:55.618	f	\N	[{"day": "Day 1", "date": "2025-01-15T00:00:00.000Z", "time": "", "latitude": "48.986545347142204", "longitude": "2.5114402389874146", "placeName": "Hyatt Place Paris CDG Airport"}, {"day": "Day 2", "date": "2025-01-16T00:00:00.000Z", "time": "", "latitude": "48.87297746178988", "longitude": "2.321651154323447", "placeName": "Hyatt Paris Madeleine"}, {"day": "Day 3", "date": "2025-01-17T00:00:00.000Z", "time": "", "latitude": "48.88099615618705", "longitude": "2.28466907578984", "placeName": "Hyatt Regency Paris Étoile"}, {"day": "Day 4", "date": "2025-01-18T00:00:00.000Z", "time": "", "latitude": "48.86316702320496", "longitude": "2.3356534101445363", "placeName": "Hôtel du Louvre"}, {"day": "Day 5", "date": "2025-01-19T00:00:00.000Z", "time": "", "latitude": "48.86316702320496", "longitude": "2.3356534101445363", "placeName": "Hôtel du Louvre"}, {"day": "Day 6", "date": "2025-01-20T00:00:00.000Z", "time": "", "latitude": "48.86316702320496", "longitude": "2.3356534101445363", "placeName": "Hôtel du Louvre"}, {"day": "Day 7", "date": "2025-01-21T00:00:00.000Z", "time": "", "latitude": "43.69610566312425", "longitude": "7.262876840900893", "placeName": "Hyatt Regency Nice Palais de la Méditerranée"}, {"day": "Day 8", "date": "2025-01-22T00:00:00.000Z", "time": "", "latitude": "43.69610566312425", "longitude": "7.262876840900893", "placeName": "Hyatt Regency Nice Palais de la Méditerranée"}, {"day": "Day 9", "date": "2025-01-23T00:00:00.000Z", "time": "", "latitude": "43.69610566312425", "longitude": "7.262876840900893", "placeName": "Hyatt Regency Nice Palais de la Méditerranée"}, {"day": "Day 10", "date": "2025-01-24T00:00:00.000Z", "time": "", "latitude": "44.83823273354351", "longitude": "-0.5839329851865696", "placeName": "FirstName Bordeaux"}, {"day": "Day 11", "date": "2025-01-25T00:00:00.000Z", "time": "", "latitude": "44.83823273354351", "longitude": "-0.5839329851865696", "placeName": "FirstName Bordeaux"}, {"day": "Day 12", "date": "2025-01-26T00:00:00.000Z", "time": "", "latitude": "48.88099615618705", "longitude": "2.28466907578984", "placeName": "Hyatt Regency Paris Étoile"}, {"day": "Day 13", "date": "2025-01-27T00:00:00.000Z", "time": "", "latitude": "48.85028603738889", "longitude": "2.362504876411274", "placeName": "SO/ PARIS"}, {"day": "Day 14", "date": "2025-01-28T00:00:00.000Z", "time": "", "latitude": "48.85028603738889", "longitude": "2.362504876411274", "placeName": "SO/ PARIS"}, {"day": "Day 15", "date": "2025-01-29T00:00:00.000Z", "time": "", "latitude": "48.85028603738889", "longitude": "2.362504876411274", "placeName": "SO/ PARIS"}]	안녕하세요 :) \n\nSO paris hotel 컨펌 되었습니다^^ 감사합니다!	\N	\N	\N	\N
3	t	canceled	{Paris}	2024-10-31 00:00:00	2024-11-25 00:00:00	1	0	business	custom	{business,"winery & champagne"}		\N	\N	f	\N	\N	67e1575a-f7f7-4df0-951e-a1a46dfd10e8	2024-10-29 13:03:10.261	2024-11-18 20:14:14.799	f	\N	[{"day": "파리 Day 1", "date": "2024-11-11T00:00:00.000Z", "time": "10:00", "latitude": "48.863317871910695", "longitude": "2.290259576185468", "placeName": "트로카데로"}, {"day": "Day 1 런던", "date": "2024-11-21T00:00:00.000Z", "time": "11:30", "latitude": "48.860780473305915", "longitude": "2.3243469127669876", "placeName": "에펠탑"}]	\N	\N	\N	\N	\N
6	f	paid	{파리}	2025-01-15 00:00:00	2025-01-28 00:00:00	1	1	leisure	all_inclusive	{"airport pick up and drop off"}		15200	KWR	t	2024-11-11 15:42:27.544	https://s.tosspayments.com/Bkx2fSi8mQA	0c1d4b1b-9f17-4ee4-b7e0-43cbf04fb2fa	2024-11-11 14:33:16.544	2024-11-11 15:42:27.551	f	[{"label": "박다은님 1월 파리여행", "value": "어른 1 / 아이 5세 1"}]	[{"day": "파리 Day 1", "date": "2025-01-15T00:00:00.000Z", "time": "18:30", "latitude": "49.00658151108185", "longitude": "2.589545192880582", "placeName": "샤를드골 공항 2E KE901"}, {"day": "파리 Day 1", "date": "2025-01-15T00:00:00.000Z", "time": "20:00", "latitude": "48.827635343775064", "longitude": "2.3243469127669876", "placeName": "8 Rue de Chatillon 75014"}]	안녕하세요 다은님, 반갑습니다 ! \n\n대한항공 항공편 KE901 맞는지 확인 부탁드리겠습니다 :)\n\n결제창 결제 하시면 예약이 진행됩니다. \n잔금 90유로는 오셔서 현장에서 지불해주시면 됩니다.\n\n감사합니다^^ 1월에 뵙겠습니다!	\N	\N	\N	\N
2	t	canceled	{Paris}	2024-10-31 00:00:00	2024-11-25 00:00:00	1	0	business	custom	{business,"winery & champagne"}		\N	\N	f	\N	\N	67e1575a-f7f7-4df0-951e-a1a46dfd10e8	2024-10-29 13:03:09.568	2024-11-18 20:14:24.737	f	\N	\N	\N	\N	\N	\N	\N
8	f	awaitingResponse	{파리}	2025-01-15 00:00:00	2025-01-22 00:00:00	1	1	business	all_inclusive	{hotel,"airport pick up and drop off","tour guide"}	메종오브제	\N	\N	f	\N	\N	9a981083-4cc7-4e06-b388-707fb6db0256	2024-11-11 19:14:15.739	2024-11-13 14:19:07.831	f	[{"label": "김미경님 메종 오브제 출장", "value": "어른 1 / 아이 8세 1"}]	[{"day": "파리 Day 1", "date": "2025-01-15T00:00:00.000Z", "time": "18:00", "latitude": "49.00296192328048", "longitude": "2.578199099823454", "placeName": "샤를드골 공항 2E KE901"}, {"day": "파리 Day 1", "date": "2025-01-16T00:00:00.000Z", "time": "19:30", "latitude": "0", "longitude": "0", "placeName": "전시회장 근처 호텔 체크인- 미정"}, {"day": "파리 Day 2", "date": "2025-01-17T00:00:00.000Z", "time": "9:30", "latitude": "48.971149170865445", "longitude": "2.5210700201754856", "placeName": "메종오브제 전시 부스"}, {"day": "파리 Day 4", "date": "2025-01-18T00:00:00.000Z", "time": "9:30", "latitude": "48.971149170865445", "longitude": "2.5210700201754856", "placeName": "메종오브제 전시 부스"}, {"day": "파리 Day 5", "date": "2025-01-19T00:00:00.000Z", "time": "9:30", "latitude": "48.971149170865445", "longitude": "2.5210700201754856", "placeName": "메종오브제 전시 부스"}, {"day": "파리 Day 6", "date": "2025-01-20T00:00:00.000Z", "time": "9:30", "latitude": "48.971149170865445", "longitude": "2.5210700201754856", "placeName": "메종오브제 전시 부스"}, {"day": "파리 Day 7", "date": "2025-01-21T00:00:00.000Z", "time": "11:00", "latitude": "0", "longitude": "0", "placeName": "파리 호텔 체크인 - 미정"}, {"day": "파리 Day 7", "date": "2025-01-21T00:00:00.000Z", "time": "15:00", "latitude": "48.86061032086829", "longitude": "2.327891737369422", "placeName": "오르세 프라이빗 투어"}, {"day": "파리 Day 7", "date": "2025-01-21T00:00:00.000Z", "time": "16:30", "latitude": "48.85458189975768", "longitude": "2.333849106676", "placeName": "생제르망 거리 - 가장 오래된 교회 / 카페 플로어"}, {"day": "파리 Day 7", "date": "2025-01-21T00:00:00.000Z", "time": "17:30", "latitude": "48.85162712474989", "longitude": "2.325085776506495", "placeName": "르봉막쉐 - 가장 오래된 백화점 / 쇼핑"}, {"day": "파리 Day 8", "date": "2025-01-22T00:00:00.000Z", "time": "10:00", "latitude": "48.861203545720706", "longitude": "2.339017252714396", "placeName": "루브르 박물관"}, {"day": "파리 Day 8", "date": "2025-01-22T00:00:00.000Z", "time": "12:00", "latitude": "0", "longitude": "0", "placeName": "점심 - 미정"}, {"day": "파리 Day 8", "date": "2025-01-22T00:00:00.000Z", "time": "15:00", "latitude": "48.863433932734125", "longitude": "2.3282455012684102", "placeName": "튈러리 공원"}, {"day": "파리 Day 8", "date": "2025-01-22T00:00:00.000Z", "time": "15:30", "latitude": "48.86554806449546", "longitude": "2.3212112006249663", "placeName": "콩코드 광장"}, {"day": "파리 Day 8", "date": "2025-01-22T00:00:00.000Z", "time": "16:00", "latitude": "48.86764791588367", "longitude": "2.329464401732772", "placeName": "방돔 광장"}, {"day": "파리 Day 8", "date": "2025-01-22T00:00:00.000Z", "time": "16:30", "latitude": "48.872193072218344", "longitude": "2.3318726917750863", "placeName": "오페라 가르니에 내관 - 티켓"}, {"day": "파리 Day 8", "date": "2025-01-22T00:00:00.000Z", "time": "17:30", "latitude": "48.874468667346136", "longitude": "2.2956711918684025", "placeName": "샹제리제 거리 및 개선문"}, {"day": "파리 Day 9", "date": "2025-01-23T00:00:00.000Z", "time": "10:30", "latitude": "48.88712742440568", "longitude": "2.3459795897913267", "placeName": "몽마르뜨 언덕 & 사랑해 벽 & 사쾨르 성당"}, {"day": "파리 Day 9", "date": "2025-01-23T00:00:00.000Z", "time": "12:00", "latitude": "0", "longitude": "0", "placeName": "점심 - 미정"}, {"day": "파리 Day 9", "date": "2025-01-23T00:00:00.000Z", "time": "14:30", "latitude": "48.8535042608303", "longitude": "2.351447014086436", "placeName": "노트르담 내관 & 세익스 피어 서점"}, {"day": "파리 Day 9", "date": "2025-01-23T00:00:00.000Z", "time": "15:00", "latitude": "48.85717502967911", "longitude": "2.3423060457120495", "placeName": "퐁네프 다리"}, {"day": "파리 Day 9", "date": "2025-01-23T00:00:00.000Z", "time": "16:00", "latitude": "48.86123444535473", "longitude": "2.35357533736994", "placeName": "퐁피듀 센터 외관 & 샤틀레"}, {"day": "파리 Day 9", "date": "2025-01-23T00:00:00.000Z", "time": "17:00", "latitude": "49.0111761059846", "longitude": "2.566712437626276", "placeName": "호텔 > 공항 샤를드골"}]	안녕하세요! \n\n먼저 메일로 드린 통역 비용 & 공항 근처 (전시회 시) 호텔 & 파리 호텔 선택하여 주시면 감사하겠습니다^^\n\n1월 16-20일 \n통역 230유로 * 5 = 1150유로\n\n* 1월 15일 호텔 체크인 / 21일 체크아웃 \n1) 마리어트 호텔 (전시장 가까움)\nhttps://www.marriott.com/en-us/hotels/parmc-paris-marriott-charles-de-gaulle-airport-hotel/overview/\n\n* 디럭스 킹룸 취소 불가\n1박 267유로 > 233유로\n\n2) 레지던스 인 호텔 (전시장 가까움 / 부엌 있음 - 아이)\nhttps://www.marriott.com/en-us/hotels/parri-residence-inn-paris-charles-de-gaulle-central-airport/overview/\n\n*스튜디오 킹룸 취소 불가 \n1박 249유로 > 199유로 \n\n1월 21-23일 파리 호텔 제안 **\n\n1) 샤토 드 플레르 \nhttps://www.chateaudesfleurs.paris/\n\n부두아 룸 490유로 > 460유로\n\n2) 호텔 balzac\nhttps://www.hotelbalzac.paris/en\n\n슈페리어룸 615유로 > 580유로 \n\n-----------------------\n\n파리 호텔 가격을 조금더 낮은 가격대로 진행하고 싶으시면 알려주시고, \n가격은 전부 조식 포함 가격 / 도시세 미포함 가격입니다.\n선택시 취소 및 환불은 2주 전 가능하십니다. \n\n감사합니다.	\N	\N	\N	\N
11	f	confirmed	{도쿄}	2025-01-26 00:00:00	2025-01-30 00:00:00	2	0	leisure	custom	{hotel}		4970146	KWR	t	2024-11-13 13:54:29.34	https://s.tosspayments.com/Bkx397Ws2WU	40908a5e-6865-4241-b361-82750a05f9d0	2024-11-13 11:29:49.564	2024-11-13 14:26:23.418	f	[{"label": "엄성실님", "value": "일본 도쿄 여행"}]	[{"day": "도쿄 Day 1", "date": "2025-01-26T00:00:00.000Z", "time": "15:00", "latitude": "35.666458783877786", "longitude": "139.73177242328197", "placeName": "리츠 칼튼 도쿄 체크인"}, {"day": "도쿄 Day 4", "date": "2025-01-30T00:00:00.000Z", "time": "12:00", "latitude": "35.666458783877786", "longitude": "139.73177242328197", "placeName": "리츠 칼튼 도쿄 체크아웃"}]	안녕하세요 엄성실님, \n\n저희 TIP 를 이용해주셔서 감사합니다. \n\n호텔 바우처 첨부 드리오니 확인 부탁드립니다. \n\n감사합니다.	\N	\N	\N	\N
12	f	awaitingResponse	{산토리니}	2024-12-17 00:00:00	2024-12-26 00:00:00	2	0	business	all_inclusive	{business}		\N	\N	f	\N	\N	59baba60-cdb4-4c10-9e79-9384756d2081	2024-11-13 13:32:21.432	2024-11-13 13:33:27.53	f	[{"label": "비행", "value": "여기서"}]	[{"day": "Day 1", "date": "2024-11-13T00:00:00.000Z", "time": "02:20", "latitude": "48.858193602432905", "longitude": "2.2943310945547806", "placeName": "This is place A"}]	Test	\N	\N	\N	\N
9	t	canceled	{니스}	2024-12-02 00:00:00	2024-12-05 00:00:00	1	0	business	custom	{business}		\N	\N	f	\N	\N	89427ca0-375b-4274-8ed9-d30685fca27a	2024-11-12 17:49:40.577	2024-11-25 10:45:43.967	t	\N	\N	테스트 1	\N	\N	\N	\N
14	t	canceled	{산토리니}	2024-11-21 00:00:00	2024-11-23 00:00:00	1	0	business	custom	{car,ski/snowboard}		\N	\N	f	\N	\N	89427ca0-375b-4274-8ed9-d30685fca27a	2024-11-15 15:47:56.761	2024-11-19 17:21:10.616	f	\N	\N	\N	\N	\N	\N	\N
15	f	pending	{뉴욕}	2025-04-28 00:00:00	2025-05-07 00:00:00	2	0	leisure	custom	{hotel}	랭햄 / 플라자 / 포시즌 / 만다린 호텔 견적	\N	\N	f	\N	\N	40908a5e-6865-4241-b361-82750a05f9d0	2024-11-16 16:22:37.776	2024-11-16 16:22:37.776	f	\N	\N	\N	\N	\N	\N	\N
16	t	canceled	{뉴욕}	2025-04-28 00:00:00	2025-05-07 00:00:00	2	0	leisure	custom	{hotel}	랭햄 / 플라자 / 포시즌 / 만다린 호텔 견적	\N	\N	f	\N	\N	40908a5e-6865-4241-b361-82750a05f9d0	2024-11-16 16:22:38.667	2024-11-16 17:00:59.07	f	\N	\N	\N	\N	\N	\N	\N
18	t	canceled	{마드리드}	2024-12-03 00:00:00	2024-12-14 00:00:00	4	0	leisure	custom	{hotel,"tour guide"}		\N	\N	f	\N	\N	85b25d8e-c6b7-4e82-b7bd-719877104a9c	2024-11-16 16:25:46.269	2024-11-29 12:09:37.159	f	\N	[{"day": "Day 1", "date": "2024-12-03T00:00:00.000Z", "time": "", "latitude": "40.41067735145662", "longitude": "-3.6952691064067427", "placeName": "Atocah hotel"}, {"day": "Day 2", "date": "2024-12-04T00:00:00.000Z", "time": "", "latitude": "40.4195192421891", "longitude": "-3.6930559402719743", "placeName": "Plaza de Cibeles"}, {"day": "Day 2", "date": "2024-12-04T00:00:00.000Z", "time": "", "latitude": "40.41712697505849", "longitude": "-3.703549961436256", "placeName": "Puerta del Sol"}, {"day": "Day 2", "date": "2024-12-04T00:00:00.000Z", "time": "", "latitude": "40.41832014008941", "longitude": "-3.710275746092818", "placeName": "Teatro Real"}, {"day": "Day 2", "date": "2024-12-04T00:00:00.000Z", "time": "", "latitude": "40.41564983630777", "longitude": "-3.7074116326004782", "placeName": "Plaza Mayor"}, {"day": "Day 2", "date": "2024-12-04T00:00:00.000Z", "time": "", "latitude": "40.415599921888564", "longitude": "-3.7089589749288154", "placeName": "Mercado de San Miguel"}]	\N	\N	cf518aaf-325f-4984-9ef3-89fbaa1a6024	\N	\N
21	f	awaitingResponse	{도쿄}	2024-12-04 00:00:00	2024-12-05 00:00:00	2	0	leisure	custom	{hotel}	Hoshinoya hotel Tokyo	1769986	KWR	f	\N	https://parisclass.com/28	2069acc9-a487-43b3-9428-7b287f025885	2024-11-20 09:34:07.628	2024-11-21 11:20:44.089	f	\N	[{"day": "DAY 1", "date": "2024-12-04T00:00:00.000Z", "time": "", "latitude": "35.68756627878243", "longitude": "139.76506210985414", "placeName": "Hoshinoya Tokyo"}, {"day": "DAY 2", "date": "2024-12-05T00:00:00.000Z", "time": "", "latitude": "35.68756627878243", "longitude": "139.76506210985414", "placeName": "Hoshinoya Tokyo"}]	안녕하세요 안가람님, \n이번에도 저희 TIP 를 선택하여 주셔서 감사합니다. \n\n호시노야 1박 - 10% 할인 이벤트 예약 절차 알려드립니다. \n\n사쿠라 방 1박 \n조식 미포함 \n(일단 미포함으로 해두고, 혜택 보고 추가해도 될것 같습니다^^)\n\n방 요금 175560 엔 > 10% 할인 = 158004엔\n서비스 세금 / 입탕세 / 숙박세 (호텔로 들어가는 비용) = 18256 엔\n* 첨부파일에 공식 홈페이지 금액 캡쳐본 업로드 해두었습니다\n다운로드하여 보실 수 있습니다. \n\n총 176260 엔 = 1609078원 * 10% 세금 (세금 계산서용)\n최종 1769986원\n\n(주) 파리클래스\n하나은행 15591004663104\n\n로 보내주시면 예약이 진행됩니다 :) \n워킹 데이 기준 2-3일 바우처가 나가게됩니다\n\n감사합니다☺️\n\n\n---\n\n11월 21일 / \n안녕하세요 가람님, \n조식 비용 10000엔 * 10% 세금 (세금 계산서용) = 11000엔 *920원 = 101200원\n\n하기로 이체해주시면 됩니다\n(주) 파리클래스\n하나은행 15591004663104\n감사합니다 :)	\N	\N	\N	\N
19	t	canceled	{"라스 베가스"}	2025-01-05 00:00:00	2025-01-12 00:00:00	1	0	business	all_inclusive	{hotel}	CES 2025	\N	\N	f	\N	\N	89427ca0-375b-4274-8ed9-d30685fca27a	2024-11-17 17:18:46.038	2024-11-29 13:54:56.482	f	[{"label": "Business Trip", "value": "USA - Las vegas"}]	[{"day": "Day 1", "date": "2025-01-05T00:00:00.000Z", "time": "", "latitude": "36.17035334888439", "longitude": "-115.15922121333708", "placeName": "Las vegas"}, {"day": "Day 2", "date": "2025-01-05T00:00:00.000Z", "time": "", "latitude": "36.13154410839339", "longitude": "-115.15103337275112", "placeName": "CES 2025"}, {"day": "Day 7", "date": "2025-01-12T00:00:00.000Z", "time": "", "latitude": "49.00398247082379", "longitude": "2.5794972887447654", "placeName": "Paris CDG 2E"}]	비행기 완료	\N	28b1dc43-34f6-41c0-aa67-30523383eb85	\N	\N
20	f	pending	{니스}	2024-12-21 00:00:00	2024-12-31 00:00:00	2	0	leisure	all_inclusive	{economy,hotel}		\N	\N	f	\N	\N	92e4c16b-d63b-4777-91f3-6de8af0cd906	2024-11-18 11:50:04.306	2024-11-18 11:50:04.306	f	\N	\N	\N	\N	\N	\N	\N
24	f	awaitingResponse	{파리}	2025-03-02 00:00:00	2025-03-07 00:00:00	6	2	leisure	custom	{business,economy,"airport pick up and drop off",hotel,"tour guide",car,"translation services","art & gallery",golf,"aesthetic cafes","winery & champagne"}	(가족구성원, 3가족 총8명) 60-70대 부모님 / 40대 남녀 + 여아 11세 + 여아 8세 / 30대 남녀\n(특이사항) 골프팀(부모님, 30대남녀) / 어린이팀(기타) 으로 나뉘어 골프 2번 갔으면 하는데\n시차적응 안된 상태에서 연로하신 부모님께서 골프 치시기 힘들 것 같다고 하면, 골프는 안쳐도 될 것 같아요.	\N	\N	f	\N	\N	e3dd0a44-eff1-4b7a-b03c-6014aed8754e	2024-11-23 11:31:49.362	2024-11-23 16:50:08.561	f	\N	[{"day": "공항 픽업", "date": "2025-03-02T00:00:00.000Z", "time": "18:55", "latitude": "49.00414630787572", "longitude": "2.579203895725499", "placeName": "AF5093 - 에어프랑스 운항"}, {"day": "파리 Day 1", "date": "2025-03-03T00:00:00.000Z", "time": "10:00", "latitude": "48.860109600014525", "longitude": "2.3265506683102513", "placeName": "오르세 미술관"}, {"day": "파리 Day 1", "date": "2025-03-03T00:00:00.000Z", "time": "", "latitude": "48.863773817472065", "longitude": "2.3274728236791273", "placeName": "뛸르히 정원"}, {"day": "파리 Day 1", "date": "2025-03-03T00:00:00.000Z", "time": "", "latitude": "48.865717763892775", "longitude": "2.3212464259815353", "placeName": "콩코르드 광장"}, {"day": "파리 Day 1", "date": "2025-03-03T00:00:00.000Z", "time": "", "latitude": "48.87388340664135", "longitude": "2.295145514336861", "placeName": "개선문"}, {"day": "파리 Day 1", "date": "2025-03-03T00:00:00.000Z", "time": "", "latitude": "48.87228859963379", "longitude": "2.2996408966406716", "placeName": "샹젤리제 거리 쇼핑"}, {"day": "파리 Day 1", "date": "2025-03-03T00:00:00.000Z", "time": "", "latitude": "48.86681225838524", "longitude": "2.3057051008761604", "placeName": "디올 몽테뉴점"}, {"day": "파리 Day 1", "date": "2025-03-03T00:00:00.000Z", "time": "", "latitude": "48.8666782895203", "longitude": "2.306997119604373", "placeName": "디올 카페"}, {"day": "파리 Day 2", "date": "2025-03-04T00:00:00.000Z", "time": "", "latitude": "48.7516649781092", "longitude": "2.0788424506333545", "placeName": "골프 & 디즈니 랜드 데이 / 파리올림픽 진행 골프"}, {"day": "파리 Day 3", "date": "2025-03-05T00:00:00.000Z", "time": "", "latitude": "48.860709889220004", "longitude": "2.337579624132885", "placeName": "루브르 박물관"}, {"day": "파리 Day 3", "date": "2025-03-05T00:00:00.000Z", "time": "", "latitude": "48.85673796899386", "longitude": "2.3409196836520545", "placeName": "퐁뇌프 다리"}, {"day": "파리 Day 3", "date": "2025-03-05T00:00:00.000Z", "time": "", "latitude": "48.85302464734164", "longitude": "2.3498484529679082", "placeName": "노트르담 대성당"}, {"day": "파리 Day 3", "date": "2025-03-05T00:00:00.000Z", "time": "", "latitude": "48.8527184814627", "longitude": "2.3470873818033793", "placeName": "셰익스피어 서점"}, {"day": "파리 Day 3", "date": "2025-03-05T00:00:00.000Z", "time": "", "latitude": "48.84673439800635", "longitude": "2.336363083651477", "placeName": "뤽상부르 공원"}, {"day": "파리 Day 3", "date": "2025-03-05T00:00:00.000Z", "time": "", "latitude": "48.85139458432711", "longitude": "2.324495725980747", "placeName": "르봉막셰 백화점 - 가장 오래된 백화점"}, {"day": "파리 Day 4", "date": "2025-03-06T00:00:00.000Z", "time": "", "latitude": "48.886756273733305", "longitude": "2.3429607100056282", "placeName": "몽마르뜨 언덕"}, {"day": "파리 Day 4", "date": "2025-03-06T00:00:00.000Z", "time": "", "latitude": "48.88675388063287", "longitude": "2.3430506371811632", "placeName": "사크레쾨르 성당"}, {"day": "파리 Day 4", "date": "2025-03-06T00:00:00.000Z", "time": "", "latitude": "48.886686595160235", "longitude": "2.340748552969758", "placeName": "테르트르 광장"}, {"day": "파리 Day 4", "date": "2025-03-06T00:00:00.000Z", "time": "", "latitude": "48.88488127644239", "longitude": "2.338545810640634", "placeName": "사랑해벽"}, {"day": "파리 Day 4", "date": "2025-03-06T00:00:00.000Z", "time": "", "latitude": "48.86297763340701", "longitude": "2.3426742106394483", "placeName": "피노 컬렉션 - 전시"}, {"day": "파리 Day 4", "date": "2025-03-06T00:00:00.000Z", "time": "", "latitude": "48.85586549945871", "longitude": "2.3663419887365107", "placeName": "마레지구 / 빅토르 휴고 정원 (보주 광장)"}, {"day": "파리 Day 4", "date": "2025-03-06T00:00:00.000Z", "time": "", "latitude": "48.86428687003596", "longitude": "2.3059953711141743", "placeName": "바토무슈 유람선"}, {"day": "공항 샌딩", "date": "2025-03-07T00:00:00.000Z", "time": "9:00", "latitude": "49.00414630787572", "longitude": "2.579203895725499", "placeName": "AF5092 - 에어프랑스 운항"}]	안녕하세요, \n\n먼저 여행 계획 및 견적 보내드립니다. \n\n8분 진행 워킹 투어 견적 - 398만원 \n포함 사항 *\n공항 픽업 & 샌딩 8분 (V CLASS 2대)\n오르세 미술관 & 루브르 미술관 프라이빗 가이드 투어 \n10:00-18:00 동행 가이드 비용\n모든 티켓 비용 (일반 티켓 / 디즈니랜드 패스트 트랙 포함 시 추가 비용) 포함 \n디즈니 랜드 왕복 차량 / 골프 왕복 차량 비용\n\n*\n식비 불포함 / 호텔 비용 불포함	\N	540ef387-e3f4-450a-9790-4b1be6a33661	\N	\N
17	f	awaitingResponse	{마드리드}	2024-12-03 00:00:00	2024-12-14 00:00:00	4	0	leisure	custom	{}		4000	EUR	f	\N	https://s.tosspayments.com/Bk1fhdq4Ekh	85b25d8e-c6b7-4e82-b7bd-719877104a9c	2024-11-16 16:24:43.467	2024-11-29 12:54:01.879	f	[{"label": "현동우님 스페인 남부 여행", "value": "어른 2/ 아이 2"}]	[{"day": "Day 1 - 마드리드", "date": "2024-12-03T00:00:00.000Z", "time": "", "latitude": "37.458836301109", "longitude": "126.44196789609339", "placeName": "인천공항"}, {"day": "Day 1 - 마드리드", "date": "2024-12-03T00:00:00.000Z", "time": "19:30", "latitude": "40.49228018737501", "longitude": "-3.564945744198032", "placeName": "마드리드 바라하스 국제공항"}, {"day": "Day 1 - 마드리드", "date": "2024-12-03T00:00:00.000Z", "time": "", "latitude": "40.41064746480977", "longitude": "-3.6952803147567583", "placeName": "Atocha Hotel Madrid"}, {"day": "Day 2 - 마드리드", "date": "2024-12-04T00:00:00.000Z", "time": "", "latitude": "40.41064746480977", "longitude": "-3.6952803147567583", "placeName": "호텔 미팅"}, {"day": "Day 2 - 마드리드", "date": "2024-12-04T00:00:00.000Z", "time": "", "latitude": "40.41064746480977", "longitude": "-3.6952803147567583", "placeName": "택시 이동"}, {"day": "Day 2 - 마드리드", "date": "2024-12-04T00:00:00.000Z", "time": "", "latitude": "40.41948656998075", "longitude": "-3.6929915672569265", "placeName": "시벨레스 광장"}, {"day": "Day 2 - 마드리드", "date": "2024-12-04T00:00:00.000Z", "time": "", "latitude": "40.4140023272387", "longitude": "-3.6921700185659443", "placeName": "프라도 미술관 (입장)"}, {"day": "Day 2 - 마드리드", "date": "2024-12-04T00:00:00.000Z", "time": "", "latitude": "40.4140023272387", "longitude": "-3.6921700185659443", "placeName": "택시 이동"}, {"day": "Day 2 - 마드리드", "date": "2024-12-04T00:00:00.000Z", "time": "", "latitude": "40.41815100880115", "longitude": "-3.714333461436208", "placeName": "마드리드 왕궁 (입장)"}, {"day": "Day 2 - 마드리드", "date": "2024-12-04T00:00:00.000Z", "time": "", "latitude": "40.41583067852084", "longitude": "-3.7145734614363186", "placeName": "알무데나 대성당 (외관)"}, {"day": "Day 2 - 마드리드", "date": "2024-12-04T00:00:00.000Z", "time": "", "latitude": "40.41823845808286", "longitude": "-3.7103186614361907", "placeName": "마드리드 왕립 극장 (외관)"}, {"day": "Day 2 - 마드리드", "date": "2024-12-04T00:00:00.000Z", "time": "", "latitude": "40.41558358483469", "longitude": "-3.7089804326005025", "placeName": "산미구엘시장"}, {"day": "Day 2 - 마드리드", "date": "2024-12-04T00:00:00.000Z", "time": "", "latitude": "40.41562533074365", "longitude": "-3.7074009037646345", "placeName": "마요르광장 (크리스마스마켓)"}, {"day": "Day 2 - 마드리드", "date": "2024-12-04T00:00:00.000Z", "time": "", "latitude": "40.41712697505849", "longitude": "-3.703549961436256", "placeName": "솔광장 야경"}, {"day": "Day 3 - 똘레도", "date": "2024-12-05T00:00:00.000Z", "time": "", "latitude": "39.85046834376191", "longitude": "-4.021898778971501", "placeName": "톨레도 전망대 (꼬마 기차)"}, {"day": "Day 3 - 똘레도", "date": "2024-12-05T00:00:00.000Z", "time": "", "latitude": "39.85732274142876", "longitude": "-4.023611719135564", "placeName": "톨레도 대성당 (입장)"}, {"day": "Day 3 - 똘레도", "date": "2024-12-05T00:00:00.000Z", "time": "", "latitude": "39.85732274142876", "longitude": "-4.023611719135564", "placeName": "유대인 지구"}, {"day": "Day 3 - 똘레도", "date": "2024-12-05T00:00:00.000Z", "time": "", "latitude": "39.85687205366368", "longitude": "-4.0283221217723515", "placeName": "산토 토메 성당 (엘 그레코 오르가즈 백작의 매장 성화감상)"}, {"day": "Day 3 - 똘레도", "date": "2024-12-05T00:00:00.000Z", "time": "", "latitude": "39.857060996737836", "longitude": "-4.021777580156688", "placeName": "구시가지 골목 자유시간"}, {"day": "Day 3 - 똘레도", "date": "2024-12-05T00:00:00.000Z", "time": "", "latitude": "39.72252816088425", "longitude": "-6.892344046127143", "placeName": "알칸타라 다리"}, {"day": "Day 4 - 세비야", "date": "2024-12-06T00:00:00.000Z", "time": "", "latitude": "37.38800576044693", "longitude": "-5.994582790417332", "placeName": "Querencia De Sevilla, Autograph Collection"}, {"day": "Day 4 - 세비야", "date": "2024-12-06T00:00:00.000Z", "time": "", "latitude": "37.38257222383284", "longitude": "-5.996334261581784", "placeName": "황금의 탑"}, {"day": "Day 4 - 세비야", "date": "2024-12-06T00:00:00.000Z", "time": "", "latitude": "37.37735766080621", "longitude": "-5.986871546238636", "placeName": "스페인 광장"}, {"day": "Day 4 - 세비야", "date": "2024-12-06T00:00:00.000Z", "time": "", "latitude": "37.392680851696284", "longitude": "-6.000026503909613", "placeName": "세비야 미술관 (입장)"}, {"day": "Day 4 - 세비야", "date": "2024-12-06T00:00:00.000Z", "time": "", "latitude": "37.39340628922793", "longitude": "-5.991776909730368", "placeName": "메트로폴 파라솔 (일몰 시간대 입장)"}, {"day": "Day 4 - 세비야", "date": "2024-12-06T00:00:00.000Z", "time": "", "latitude": "37.38910153543518", "longitude": "-5.991248634596509", "placeName": "플라멩고 춤 박물관 (19시 공연)"}, {"day": "Day 4 - 세비야", "date": "2024-12-06T00:00:00.000Z", "time": "", "latitude": "37.38642906829309", "longitude": "-6.002375103909868", "placeName": "이사벨 2세 다리 (야경)"}, {"day": "Day 5 - 세비야", "date": "2024-12-07T00:00:00.000Z", "time": "", "latitude": "37.38313712264071", "longitude": "-5.990161330894991", "placeName": "세비야 알카사르 (입장)"}, {"day": "Day 5 - 세비야", "date": "2024-12-07T00:00:00.000Z", "time": "", "latitude": "37.386029265840854", "longitude": "-5.993106803909939", "placeName": "세비야 대성당 (입장)"}, {"day": "Day 5 - 세비야", "date": "2024-12-07T00:00:00.000Z", "time": "", "latitude": "37.38634886609781", "longitude": "-5.992592246238207", "placeName": "히랄다 탑 (입장)"}, {"day": "Day 5 - 세비야", "date": "2024-12-07T00:00:00.000Z", "time": "", "latitude": "37.390158533151244", "longitude": "-5.992869690417261", "placeName": "산 살바도르 성당 (입장)"}, {"day": "Day 5 - 세비야", "date": "2024-12-07T00:00:00.000Z", "time": "", "latitude": "37.38880514062209", "longitude": "-5.994567890417322", "placeName": "세비야 시청사 (자유시간)"}, {"day": "Day 5 - 론다", "date": "2024-12-07T00:00:00.000Z", "time": "", "latitude": "36.7412601223421", "longitude": "-5.166609605790355", "placeName": "Paradores Ronda"}, {"day": "Day 6 - 론다", "date": "2024-12-08T00:00:00.000Z", "time": "", "latitude": "36.74638241652701", "longitude": "-5.161197193964883", "placeName": "론다 시내 산책"}, {"day": "Day 6 - 론다", "date": "2024-12-08T00:00:00.000Z", "time": "", "latitude": "36.74248942482705", "longitude": "-5.166986373252659", "placeName": "토로스 데 론다 광장 - 투우장 (입장)"}, {"day": "Day 6 - 론다", "date": "2024-12-08T00:00:00.000Z", "time": "", "latitude": "36.74375080572887", "longitude": "-5.168061261611039", "placeName": "알라메다 델 타호 공원 (전망대)"}, {"day": "Day 6 - 론다", "date": "2024-12-08T00:00:00.000Z", "time": "", "latitude": "36.739306929090155", "longitude": "-5.166325845717755", "placeName": "돈 보스코의 집 (Casa Museo Don Bosco)"}, {"day": "Day 6 - 론다", "date": "2024-12-08T00:00:00.000Z", "time": "", "latitude": "36.74097818495758", "longitude": "-5.16594444837072", "placeName": "누에보 다리"}, {"day": "Day 6 - 론다", "date": "2024-12-08T00:00:00.000Z", "time": "", "latitude": "36.74637244011845", "longitude": "-5.165089432720377", "placeName": "Bodega San Francisco - 로컬 맛집"}, {"day": "Day 6 - 론다", "date": "2024-12-08T00:00:00.000Z", "time": "", "latitude": "36.73999132529423", "longitude": "-5.163284189897139", "placeName": "비에호 다리"}, {"day": "Day 6 - 론다", "date": "2024-12-08T00:00:00.000Z", "time": "", "latitude": "36.74074270900715", "longitude": "-5.164041605507874", "placeName": "꾸엔까 공원 (전망대)"}, {"day": "Day 7 - 그라나다", "date": "2024-12-09T00:00:00.000Z", "time": "", "latitude": "37.17601644329108", "longitude": "-3.587381348098831", "placeName": "Paradores Granada"}, {"day": "Day 7 - 그라나다", "date": "2024-12-09T00:00:00.000Z", "time": "", "latitude": "40.550429798571955", "longitude": "-3.623334617708374", "placeName": "레예스 카톨리코스 거리 (쇼핑거리)"}, {"day": "Day 7 - 그라나다", "date": "2024-12-09T00:00:00.000Z", "time": "", "latitude": "37.1748434485371", "longitude": "-3.599851375083786", "placeName": "비브 람블라 광장"}, {"day": "Day 7 - 그라나다", "date": "2024-12-09T00:00:00.000Z", "time": "", "latitude": "37.176795735472716", "longitude": "-3.599021988576197", "placeName": "그라나다 대성당"}, {"day": "Day 7 - 그라나다", "date": "2024-12-09T00:00:00.000Z", "time": "", "latitude": "37.17660013302662", "longitude": "-3.5958473346063187", "placeName": "칼데레리아 누에바 거리"}, {"day": "Day 7 - 그라나다", "date": "2024-12-09T00:00:00.000Z", "time": "", "latitude": "37.18121689565506", "longitude": "-3.592642246247677", "placeName": "알바이신 - 성 니콜라스 전망대"}, {"day": "Day 8 - 그라나다", "date": "2024-12-10T00:00:00.000Z", "time": "", "latitude": "37.176155208909634", "longitude": "-3.5882593211138456", "placeName": "알함브라 궁전"}, {"day": "Day 8 - 그라나다", "date": "2024-12-10T00:00:00.000Z", "time": "", "latitude": "37.17647190560971", "longitude": "-3.5957507750837308", "placeName": "누에바 광장"}, {"day": "Day 8 - 그라나다", "date": "2024-12-10T00:00:00.000Z", "time": "", "latitude": "37.17418842014608", "longitude": "-3.5985450053902537", "placeName": "나바스 거리 (타파스)"}, {"day": "Day 8 - 바르셀로나", "date": "2024-12-10T00:00:00.000Z", "time": "21:00", "latitude": "41.29909648601704", "longitude": "2.0799549233537333", "placeName": "바르셀로나 도착 (비행편 - VY2015)"}, {"day": "Day 8 - 바르셀로나", "date": "2024-12-10T00:00:00.000Z", "time": "", "latitude": "41.38519596181862", "longitude": "2.1777224809406754", "placeName": "Grand Hotel Central"}, {"day": "Day 9 - 바르셀로나", "date": "2024-12-11T00:00:00.000Z", "time": "", "latitude": "41.414615461420496", "longitude": "2.152630123270486", "placeName": "가우디 투어"}, {"day": "Day 10 - 바르셀로나", "date": "2024-12-12T00:00:00.000Z", "time": "", "latitude": "41.387176359511656", "longitude": "2.1700470962841374", "placeName": "카탈루냐 광장 미팅"}, {"day": "Day 10 - 바르셀로나", "date": "2024-12-12T00:00:00.000Z", "time": "", "latitude": "41.38190087269363", "longitude": "2.171488736778902", "placeName": "라 보케리아 시장"}, {"day": "Day 10 - 바르셀로나", "date": "2024-12-12T00:00:00.000Z", "time": "", "latitude": "41.38013737587714", "longitude": "2.1753682981520055", "placeName": "레이알 광장 (가우디 가로등)"}, {"day": "Day 10 - 바르셀로나", "date": "2024-12-12T00:00:00.000Z", "time": "", "latitude": "41.37906218057946", "longitude": "2.174261254495341", "placeName": "구엘 궁전 (외부 감상 및 시청각 자료 활용)"}, {"day": "Day 10 - 바르셀로나", "date": "2024-12-12T00:00:00.000Z", "time": "", "latitude": "41.37906218057946", "longitude": "2.174261254495341", "placeName": "쉬는 시간 (음료 한 잔, 화장실 이용 등)"}, {"day": "Day 10 - 바르셀로나", "date": "2024-12-12T00:00:00.000Z", "time": "", "latitude": "41.37906218057946", "longitude": "2.174261254495341", "placeName": "다음 장소로 이동"}, {"day": "Day 10 - 바르셀로나", "date": "2024-12-12T00:00:00.000Z", "time": "", "latitude": "41.39207147938877", "longitude": "2.1649353977667145", "placeName": "까사 바트요 앞에서 가이드와 미팅"}, {"day": "Day 10 - 바르셀로나", "date": "2024-12-12T00:00:00.000Z", "time": "", "latitude": "41.395384487709954", "longitude": "2.161977498675494", "placeName": "까사 밀라"}, {"day": "Day 10 - 바르셀로나", "date": "2024-12-12T00:00:00.000Z", "time": "", "latitude": "41.41463959955516", "longitude": "2.1526944968253288", "placeName": "구엘 공원 (내부 설명)"}, {"day": "Day 10 - 바르셀로나", "date": "2024-12-12T00:00:00.000Z", "time": "", "latitude": "41.41463959955516", "longitude": "2.1526944968253288", "placeName": "이후 자유 시간"}, {"day": "Day 11 - 바르셀로나", "date": "2024-12-13T00:00:00.000Z", "time": "", "latitude": "41.38425255953693", "longitude": "2.1781878507933787", "placeName": "La colmena (미팅)"}, {"day": "Day 11 - 바르셀로나", "date": "2024-12-13T00:00:00.000Z", "time": "", "latitude": "41.38403196778246", "longitude": "2.1821032833315046", "placeName": "산타 마리아 델 마르"}, {"day": "Day 11 - 바르셀로나", "date": "2024-12-13T00:00:00.000Z", "time": "", "latitude": "41.38685026701393", "longitude": "2.182322264327721", "placeName": "포사 데 라스 모레라스"}, {"day": "Day 11 - 바르셀로나", "date": "2024-12-13T00:00:00.000Z", "time": "", "latitude": "41.382484205788494", "longitude": "2.1825619409670427", "placeName": "라 욧챠 (피카소 학교)"}, {"day": "Day 11 - 바르셀로나", "date": "2024-12-13T00:00:00.000Z", "time": "", "latitude": "41.38331463697714", "longitude": "2.1788588653006173", "placeName": "아비뇽 거리"}, {"day": "Day 11 - 바르셀로나", "date": "2024-12-13T00:00:00.000Z", "time": "", "latitude": "41.38428489505536", "longitude": "2.174978557671746", "placeName": "노바 광장 (크리스마스 마켓 광장)"}, {"day": "Day 11 - 바르셀로나", "date": "2024-12-13T00:00:00.000Z", "time": "", "latitude": "41.385939161850025", "longitude": "2.173771498675081", "placeName": "4 Gats (피카소가 사랑한 예술 아지트)"}, {"day": "Day 11 - 바르셀로나", "date": "2024-12-13T00:00:00.000Z", "time": "", "latitude": "41.38545571280861", "longitude": "2.180990112167435", "placeName": "피카소 미술관 입장"}, {"day": "Day 11 - 바르셀로나", "date": "2024-12-13T00:00:00.000Z", "time": "", "latitude": "41.38545571280861", "longitude": "2.180990112167435", "placeName": "미술관 앞 미팅 후 다음 장소로 이동"}, {"day": "Day 11 - 바르셀로나", "date": "2024-12-13T00:00:00.000Z", "time": "", "latitude": "41.403750581726726", "longitude": "2.1744094404815293", "placeName": "사그라다 파밀리아 대성당"}, {"day": "Day 11 - 바르셀로나", "date": "2024-12-13T00:00:00.000Z", "time": "", "latitude": "41.403750581726726", "longitude": "2.1744094404815293", "placeName": "사그라다 파밀리아 입장 및 투어 종료"}, {"day": "Day 11 - 바르셀로나", "date": "2024-12-13T00:00:00.000Z", "time": "", "latitude": "41.404274716847105", "longitude": "2.1516611317322125", "placeName": "그라시아거리"}, {"day": "Day 11 - 마드리드", "date": "2024-12-13T00:00:00.000Z", "time": "", "latitude": "40.41073729639723", "longitude": "-3.69534209456116", "placeName": "Atocha Hotel Madrid, Tapestry Collection by Hilton"}, {"day": "Day 12 - 마드리드", "date": "2024-12-14T00:00:00.000Z", "time": "", "latitude": "40.410688355320175", "longitude": "-3.6952240591047745", "placeName": "마드리드 자유 시간"}, {"day": "Day 12 - 마드리드", "date": "2024-12-14T00:00:00.000Z", "time": "21:30", "latitude": "40.49071911494499", "longitude": "-3.5633142141737886", "placeName": "마드리드 바라하스 국제공항"}]	안녕하세요 현동우님\n\n먼저 최종 일정본 드립니다 :) \n\n최종일정에 따른 견적 드립니다. \n\n티켓팅은 진행 중이고, 이번주 내로 완료 예정입니다.\n\n1차 결제 링크 보내드립니다. \n4000유로 * 1510원 (고정환율) = 6,040,000 원\n\n결제하여 주시면 됩니다\n\n감사합니다 ☺️ \n\n* 동행 가이드님 비용 (전 일정을 동행하십니다 / 숙박 및 교통 수단)\n* 도시별 이동 교통 수단 비용\n* 각 미술관 및 박물관 입장권 비용\n* 도시 안 이동 및 택시비용\n\n불포함 비용\n* 식사비용\n* 일정 외 티켓 등 추가되는 스케쥴에 해당하는 비용\n* 여행자 보험 (여행자 보험은 반드시 들어오시길 바랍니다!)\n\n---------------------------------------------\n2024년 11월 24일\n티켓 1차 업데이트 되었습니다	\N	94719530-e6b6-482c-b627-eef82861e7e1	\N	\N
22	f	awaitingResponse	{파리}	2025-04-16 00:00:00	2025-04-22 00:00:00	2	0	leisure	custom	{"tour guide","airport pick up and drop off",hotel,"michelin restaurants","aesthetic cafes","art & gallery","translation services"}		\N	\N	f	\N	\N	bac73180-a977-4e0e-9a1e-94b718281845	2024-11-21 19:31:49.197	2024-11-25 10:55:35.69	f	[{"label": "박극로님 4월 일정", "value": "외곽 포함"}]	[{"day": "Day 1 파리", "date": "2025-04-16T00:00:00.000Z", "time": "17:10", "latitude": "49.00958385363071", "longitude": "2.5505247091873153", "placeName": "샤를드골 공항"}, {"day": "Day 2 파리", "date": "2025-04-17T00:00:00.000Z", "time": "10:00", "latitude": "48.87206846679423", "longitude": "2.3315906683109207", "placeName": "오페라 가르니에"}, {"day": "Day 2 파리", "date": "2025-04-17T00:00:00.000Z", "time": "", "latitude": "48.86759838010194", "longitude": "2.329606412488076", "placeName": "방돔 광장"}, {"day": "Day 2 파리", "date": "2025-04-17T00:00:00.000Z", "time": "", "latitude": "48.862779070097965", "longitude": "2.321824819142443", "placeName": "센느강"}, {"day": "Day 2 파리", "date": "2025-04-17T00:00:00.000Z", "time": "", "latitude": "48.86411416535554", "longitude": "2.3226554216289723", "placeName": "오랑주리 미술관"}, {"day": "Day 2 파리", "date": "2025-04-17T00:00:00.000Z", "time": "", "latitude": "48.85373631451583", "longitude": "2.3342519226783045", "placeName": "생제르맹 거리"}, {"day": "Day 2 파리", "date": "2025-04-17T00:00:00.000Z", "time": "", "latitude": "48.85131692726826", "longitude": "2.3243884376258728", "placeName": "르봉막셰 백화점"}, {"day": "Day 2 파리", "date": "2025-04-17T00:00:00.000Z", "time": "18:00", "latitude": "48.852557562306366", "longitude": "2.327746391186427", "placeName": "에르메스 세브르점"}, {"day": "Day 3 파리", "date": "2025-04-18T00:00:00.000Z", "time": "10:00", "latitude": "48.86014489249321", "longitude": "2.326529210639276", "placeName": "오르세 미술관"}, {"day": "Day 3 파리", "date": "2025-04-18T00:00:00.000Z", "time": "", "latitude": "48.88650230245904", "longitude": "2.342789048637829", "placeName": "몽마르뜨 언덕"}, {"day": "Day 3 파리", "date": "2025-04-18T00:00:00.000Z", "time": "", "latitude": "48.88687388497722", "longitude": "2.3430935683116774", "placeName": "사크레쾨르 성당"}, {"day": "Day 3 파리", "date": "2025-04-18T00:00:00.000Z", "time": "", "latitude": "48.85669561513383", "longitude": "2.3408445818036427", "placeName": "퐁뇌프 다리"}, {"day": "Day 3 파리", "date": "2025-04-18T00:00:00.000Z", "time": "", "latitude": "48.85308112328821", "longitude": "2.34990209714534", "placeName": "노트르담 대성당"}, {"day": "Day 3 파리", "date": "2025-04-18T00:00:00.000Z", "time": "18:00", "latitude": "48.852704362379754", "longitude": "2.347108839474354", "placeName": "셰익스피어 서점"}, {"day": "Day 4 베르사유", "date": "2025-04-19T00:00:00.000Z", "time": "10:00", "latitude": "48.80499199036904", "longitude": "2.1203446524930385", "placeName": "베르사유 궁전"}, {"day": "Day 5 파리", "date": "2025-04-20T00:00:00.000Z", "time": "10:00", "latitude": "48.86080113675793", "longitude": "2.3521711744102056", "placeName": "퐁피두 현대 미술관"}, {"day": "Day 5 파리", "date": "2025-04-20T00:00:00.000Z", "time": "", "latitude": "48.862039705562324", "longitude": "2.364945069107916", "placeName": "유명 갤러리 (페로탕/알민 레쉬)"}, {"day": "Day 5 파리", "date": "2025-04-20T00:00:00.000Z", "time": "", "latitude": "48.85493145987011", "longitude": "2.366223283651932", "placeName": "빅토르 위고 공원"}, {"day": "Day 5 파리", "date": "2025-04-20T00:00:00.000Z", "time": "", "latitude": "48.86294226900976", "longitude": "2.342684923678869", "placeName": "피놀트 컬렉션"}, {"day": "Day 5 파리", "date": "2025-04-20T00:00:00.000Z", "time": "", "latitude": "48.8608837145441", "longitude": "2.366703151119945", "placeName": "메르시 편집샵"}, {"day": "Day 5 파리", "date": "2025-04-20T00:00:00.000Z", "time": "", "latitude": "48.860396346657815", "longitude": "2.3653351864482803", "placeName": "마레지구 빈티지샵"}, {"day": "Day 5 파리", "date": "2025-04-20T00:00:00.000Z", "time": "19:00", "latitude": "48.86422223541208", "longitude": "2.306023212034174", "placeName": "바토무슈"}, {"day": "Day 6 휴식", "date": "2025-04-21T00:00:00.000Z", "time": "", "latitude": "0", "longitude": "0", "placeName": "휴식"}, {"day": "Day 7 몽셍미쉘", "date": "2025-04-22T00:00:00.000Z", "time": "9:00", "latitude": "48.6361042340415", "longitude": "-1.5111913663702916", "placeName": "몽셍미쉘"}, {"day": "Day 7 몽셍미쉘", "date": "2025-04-22T00:00:00.000Z", "time": "", "latitude": "49.706755355408546", "longitude": "0.20573648399062736", "placeName": "에트르타"}, {"day": "Day 7 몽셍미쉘", "date": "2025-04-22T00:00:00.000Z", "time": "", "latitude": "48.64967232917899", "longitude": "-2.0183106026071362", "placeName": "생말로"}, {"day": "Day 7 몽셍미쉘", "date": "2025-04-22T00:00:00.000Z", "time": "21:00", "latitude": "47.21931877929672", "longitude": "-1.5565608087750842", "placeName": "파리 호텔"}, {"day": "Day 8 지베르니", "date": "2025-04-23T00:00:00.000Z", "time": "10:00", "latitude": "49.08168698038827", "longitude": "1.5335635528775444", "placeName": "지베르니 투어"}, {"day": "Day 8 샹티이 성", "date": "2025-04-23T00:00:00.000Z", "time": "14:00", "latitude": "49.193944829686586", "longitude": "2.485890042723014", "placeName": "샹티이 성"}, {"day": "Day 9 파리 > 보르도", "date": "2025-04-24T00:00:00.000Z", "time": "10:00", "latitude": "44.840809414270986", "longitude": "-0.5849851540819867", "placeName": "보르도로 이동"}]	안녕하세요, \n\n피드백 반영해드렸고, \b일정이 시작되는 시간은 대부분 10:00시이며 끝나는 시간은 18:00입니다,\n\n고객님의 요구에 따라 바뀔수 있습니다.\n\n감사합니다	\N	\N	\N	\N
23	f	awaitingResponse	{파리}	2025-01-07 00:00:00	2025-01-14 00:00:00	3	0	leisure	custom	{hotel,"tour guide","airport pick up and drop off"}	25.01.07~01.14까지 파리로 갑니다. 50대 세자매구요.\n개별적인 투어 프로그램을 컨설팅 받고 싶어요. 미술관과 갤러리 (루이비통 파운데이션 포함 등등 )투어, 시내투어, (디올카페 등등) 근교는 몽쉘미생등등\n처음여행은 아니지만 세자매로는 처음이라 .. 혹시 숙소예약도 해주시나요?	\N	\N	f	\N	\N	e47a1e61-cec5-424d-a589-0fb6c895fb24	2024-11-22 19:41:00.52	2024-11-24 19:23:02.839	f	[{"label": "메종 오브제 전 파리 여행", "value": "세 자매 여행"}]	[{"day": "Day 1 파리", "date": "2025-01-07T00:00:00.000Z", "time": "18:30", "latitude": "49.00401062356304", "longitude": "2.5794758310726915", "placeName": "샤를드골 공항 KE5901"}, {"day": "Day 2 파리", "date": "2025-01-08T00:00:00.000Z", "time": "10:00", "latitude": "48.860109600014525", "longitude": "2.3265506683102513", "placeName": "오르세 미술관"}, {"day": "Day 2 파리", "date": "2025-01-08T00:00:00.000Z", "time": "13:30", "latitude": "48.863773817472065", "longitude": "2.3274728236791273", "placeName": "뛸르히 정원"}, {"day": "Day 2 파리", "date": "2025-01-08T00:00:00.000Z", "time": "14:00", "latitude": "48.865717763892775", "longitude": "2.3212464259815353", "placeName": "콩코르드 광장"}, {"day": "Day 2 파리", "date": "2025-01-08T00:00:00.000Z", "time": "14:15", "latitude": "48.87388340664135", "longitude": "2.295145514336861", "placeName": "개선문"}, {"day": "Day 2 파리", "date": "2025-01-08T00:00:00.000Z", "time": "14:30", "latitude": "48.87228859963379", "longitude": "2.2996408966406716", "placeName": "샹젤리제 거리 쇼핑"}, {"day": "Day 2 파리", "date": "2025-01-08T00:00:00.000Z", "time": "15:30", "latitude": "48.86681225838524", "longitude": "2.3057051008761604", "placeName": "디올 몽테뉴점"}, {"day": "Day 2 파리", "date": "2025-01-08T00:00:00.000Z", "time": "16:30", "latitude": "48.8666782895203", "longitude": "2.306997119604373", "placeName": "디올 카페"}, {"day": "Day 3 파리", "date": "2025-01-09T00:00:00.000Z", "time": "10:00", "latitude": "48.860709889220004", "longitude": "2.337579624132885", "placeName": "루브르 박물관"}, {"day": "Day 3 파리", "date": "2025-01-09T00:00:00.000Z", "time": "13:30", "latitude": "48.85673796899386", "longitude": "2.3409196836520545", "placeName": "퐁뇌프 다리"}, {"day": "Day 3 파리", "date": "2025-01-09T00:00:00.000Z", "time": "14:00", "latitude": "48.85302464734164", "longitude": "2.3498484529679082", "placeName": "노트르담 대성당"}, {"day": "Day 3 파리", "date": "2025-01-09T00:00:00.000Z", "time": "14:30", "latitude": "48.8527184814627", "longitude": "2.3470873818033793", "placeName": "셰익스피어 서점"}, {"day": "Day 3 파리", "date": "2025-01-09T00:00:00.000Z", "time": "15:00", "latitude": "48.84673439800635", "longitude": "2.336363083651477", "placeName": "뤽상부르 공원"}, {"day": "Day 3 파리", "date": "2025-01-09T00:00:00.000Z", "time": "16:00", "latitude": "48.85139458432711", "longitude": "2.324495725980747", "placeName": "르봉막셰 백화점"}, {"day": "Day 4 파리", "date": "2025-01-10T00:00:00.000Z", "time": "10:00", "latitude": "48.87679345060206", "longitude": "2.263480981804706", "placeName": "루이비통 파운데이션"}, {"day": "Day 4 파리", "date": "2025-01-10T00:00:00.000Z", "time": "14:00", "latitude": "48.87211786445111", "longitude": "2.3316121259818954", "placeName": "오페라 가르니에 내관"}, {"day": "Day 4 파리", "date": "2025-01-10T00:00:00.000Z", "time": "15:30", "latitude": "48.86757720777121", "longitude": "2.3295205818041773", "placeName": "방돔 광장"}, {"day": "Day 5 파리", "date": "2025-01-11T00:00:00.000Z", "time": "10:00", "latitude": "48.85964876305687", "longitude": "2.3424331106392255", "placeName": "사마리텐 백화점"}, {"day": "Day 5 파리", "date": "2025-01-11T00:00:00.000Z", "time": "11:30", "latitude": "48.85855916966273", "longitude": "2.3431439548166275", "placeName": "LV DREAM 루이비통 전시"}, {"day": "Day 5 파리", "date": "2025-01-11T00:00:00.000Z", "time": "12:30", "latitude": "48.85855916966273", "longitude": "2.3431439548166275", "placeName": "루이비통 카페"}, {"day": "Day 5 파리", "date": "2025-01-11T00:00:00.000Z", "time": "13:30", "latitude": "48.858869268919406", "longitude": "2.342285083652154", "placeName": "Le Tout Paris 식당"}, {"day": "Day 5 파리", "date": "2025-01-11T00:00:00.000Z", "time": "15:00", "latitude": "48.886756273733305", "longitude": "2.3429607100056282", "placeName": "몽마르뜨 언덕"}, {"day": "Day 5 파리", "date": "2025-01-11T00:00:00.000Z", "time": "15:15", "latitude": "48.88675388063287", "longitude": "2.3430506371811632", "placeName": "사크레쾨르 성당"}, {"day": "Day 5 파리", "date": "2025-01-11T00:00:00.000Z", "time": "15:45", "latitude": "48.886686595160235", "longitude": "2.340748552969758", "placeName": "테르트르 광장"}, {"day": "Day 5 파리", "date": "2025-01-11T00:00:00.000Z", "time": "17:00", "latitude": "48.88488127644239", "longitude": "2.338545810640634", "placeName": "사랑해벽"}, {"day": "Day 6 베르사유 & 파리", "date": "2025-01-12T00:00:00.000Z", "time": "10:00", "latitude": "48.80770859765598", "longitude": "2.1214256515708474", "placeName": "베르사유 프라이빗 투어"}, {"day": "Day 6 베르사유 & 파리", "date": "2025-01-12T00:00:00.000Z", "time": "12:45", "latitude": "48.80184266363558", "longitude": "2.119657288221677", "placeName": "베르사유 미슐랭 1"}, {"day": "Day 6 베르사유 & 파리", "date": "2025-01-12T00:00:00.000Z", "time": "14:30", "latitude": "48.863058281811185", "longitude": "2.2873677124878644", "placeName": "트로카데로 광장"}, {"day": "Day 6 베르사유 & 파리", "date": "2025-01-12T00:00:00.000Z", "time": "16:00", "latitude": "48.86428687003596", "longitude": "2.3059953711141743", "placeName": "바토무슈 유람선"}, {"day": "Day 7 몽셀미쉘", "date": "2025-01-13T00:00:00.000Z", "time": "10:00", "latitude": "\\b48.63608296393557", "longitude": "-1.5111913663702916", "placeName": "몽셀미쉘 출발"}, {"day": "Day 7 몽셀미쉘", "date": "2025-01-13T00:00:00.000Z", "time": "16:00", "latitude": "49.7070883944227", "longitude": "0.2050498385194314", "placeName": "에트르타"}, {"day": "Day 8 파리", "date": "2025-01-14T00:00:00.000Z", "time": "10:00", "latitude": "48.86081137320131", "longitude": "2.3523522855006647", "placeName": "퐁피두센터 외관"}, {"day": "Day 8 파리", "date": "2025-01-14T00:00:00.000Z", "time": "11:00", "latitude": "48.86061603096498", "longitude": "2.3646158246875033", "placeName": "유명갤러리 (페로탕/알민레쉬)"}, {"day": "Day 8 파리", "date": "2025-01-14T00:00:00.000Z", "time": "12:00", "latitude": "48.86100835438931", "longitude": "2.3667773965841805", "placeName": "메르시 편집샵"}, {"day": "Day 8 파리", "date": "2025-01-14T00:00:00.000Z", "time": "13:30", "latitude": "48.8555950229444", "longitude": "2.3655366381807363", "placeName": "빅토르 위고 공원"}, {"day": "Day 8 파리", "date": "2025-01-14T00:00:00.000Z", "time": "14:30", "latitude": "48.85978977133239", "longitude": "2.3626338103619537", "placeName": "피카소 박물관"}, {"day": "Day 8 파리", "date": "2025-01-14T00:00:00.000Z", "time": "16:00", "latitude": "48.86297763340701", "longitude": "2.3426742106394483", "placeName": "피놀트 컬렉션"}]	안녕하세요 :)\n\n먼저 TIP 를 이용해주셔서 감사합니다\n\n1차 일절 보내드리오니 확인 부탁드리며, \n언제든지 변경 및 추가 피드백 주시면 반영해드리겠습니다.\n\n감사합니다 😍\n\n-----------------------------------------\n\n견적 안내드립니다. - 총 415만원\n포함사항\n공항 픽업 & 공항 샌딩\n10:00-18:00시 동행 가이드 \n루브르  & 오르세 & 베르사유 프라이빗 가이드\n몽생미셀 왕복 기차표 / 동행 가이드\n모든 티켓 비용\n일정 코디네이팅 \n레스토랑 예약 (미슐랭 등) 대행\n\n불포함 사항\n식비 / 각종 팁*	\N	651166d4-fd5a-4089-b9db-2446aab36677	\N	\N
26	t	canceled	{Melbourne}	2024-12-27 00:00:00	2024-12-31 00:00:00	1	0	business	custom	{"tour guide","spa/hot springs"}		\N	\N	f	\N	\N	67e1575a-f7f7-4df0-951e-a1a46dfd10e8	2024-11-24 08:40:08.067	2024-11-25 10:58:27.103	f	\N	\N	\N	\N	\N	\N	\N
25	t	canceled	{Melbourne}	2024-12-27 00:00:00	2024-12-31 00:00:00	1	0	business	all_inclusive	{business}		\N	\N	f	\N	\N	67e1575a-f7f7-4df0-951e-a1a46dfd10e8	2024-11-24 08:39:29.985	2024-11-25 10:59:30.378	f	\N	\N	\N	\N	\N	\N	\N
28	t	canceled	{Berlin}	2024-11-26 00:00:00	2024-12-07 00:00:00	2	0	business	all_inclusive	{"airport pick up and drop off"}		\N	\N	f	\N	\N	67e1575a-f7f7-4df0-951e-a1a46dfd10e8	2024-11-25 16:39:55.169	2024-11-27 20:24:49.096	f	\N	\N	\N	\N	c2e395cf-fa80-4a65-af0b-4f7167f2601f	\N	\N
29	f	pending	{아테네,산토리니}	2024-12-19 00:00:00	2024-12-28 00:00:00	2	0	leisure	custom	{economy,hotel,"airport pick up and drop off","spa/hot springs","aesthetic cafes","patisserie/cooking classes"}		\N	\N	f	\N	\N	50ede376-26f6-4632-98f0-da8373cdc498	2024-11-26 00:44:51.999	2024-11-26 00:44:51.999	f	\N	\N	\N	\N	\N	\N	\N
27	f	confirmed	{파리}	2024-12-18 00:00:00	2024-12-19 00:00:00	2	0	leisure	custom	{"tour guide",car}		856000	KWR	f	\N	https://s.tosspayments.com/Bk2YXq40b6N	85604b11-e773-4526-872d-0a35e02266d1	2024-11-25 15:54:39.418	2024-11-26 04:27:46.325	t	[{"label": "노현서님 12월 19일 차량 투어", "value": "어른 2"}]	[{"day": "파리 Day 1", "date": "2024-12-19T00:00:00.000Z", "time": "10:00", "latitude": "48.886756273733305", "longitude": "2.3429607100056282", "placeName": "몽마르뜨 언덕"}, {"day": "파리 Day 1", "date": "2024-12-19T00:00:00.000Z", "time": "", "latitude": "48.886686595160235", "longitude": "2.340748552969758", "placeName": "테르트르 광장"}, {"day": "파리 Day 1", "date": "2024-12-19T00:00:00.000Z", "time": "", "latitude": "48.88675388063287", "longitude": "2.3430506371811632", "placeName": "사크레쾨르 성당"}, {"day": "파리 Day 1", "date": "2024-12-19T00:00:00.000Z", "time": "", "latitude": "48.88488127644239", "longitude": "2.338545810640634", "placeName": "사랑해벽"}, {"day": "파리 Day 1", "date": "2024-12-19T00:00:00.000Z", "time": "", "latitude": "48.87388340664135", "longitude": "2.295145514336861", "placeName": "개선문"}, {"day": "파리 Day 1", "date": "2024-12-19T00:00:00.000Z", "time": "", "latitude": "48.87071614970847", "longitude": "2.3044578291938036", "placeName": "샹제리제 거리"}, {"day": "파리 Day 1", "date": "2024-12-19T00:00:00.000Z", "time": "", "latitude": "48.86567501872559", "longitude": "2.321249383064222", "placeName": "콩코드 광장"}, {"day": "파리 Day 1", "date": "2024-12-19T00:00:00.000Z", "time": "", "latitude": "48.863531123669055", "longitude": "2.327926766884011", "placeName": "튈러리 공원"}, {"day": "파리 Day 1", "date": "2024-12-19T00:00:00.000Z", "time": "", "latitude": "48.85673796899386", "longitude": "2.3409196836520545", "placeName": "퐁뇌프 다리"}, {"day": "파리 Day 1", "date": "2024-12-19T00:00:00.000Z", "time": "", "latitude": "48.85302464734164", "longitude": "2.3498484529679082", "placeName": "노트르담 대성당"}, {"day": "파리 Day 1", "date": "2024-12-19T00:00:00.000Z", "time": "", "latitude": "48.8527184814627", "longitude": "2.3470873818033793", "placeName": "셰익스피어 서점"}, {"day": "파리 Day 1", "date": "2024-12-19T00:00:00.000Z", "time": "", "latitude": "48.85586549945871", "longitude": "2.3663419887365107", "placeName": "마레지구 / 빅토르 휴고 정원 (보주 광장)"}, {"day": "파리 Day 1", "date": "2024-12-19T00:00:00.000Z", "time": "", "latitude": "48.86428687003596", "longitude": "2.3059953711141743", "placeName": "바토무슈 유람선"}]	안녕하세요 노현서님,\n\n먼저 TIP 를 이용해주셔서 감사합니다 :) \n\n총 금액 600유로 * 1510원 = 856000 원 - 할인 5만원 \n= \n\n카드결제 혹은 아래로 이체 해주시면 예약이 확정되십니다. \n\n\n피드백 언제든지 편하게 주시면 일정에 추가 및 변경 등 반영하여 드리겠습니다. \n\n(주) 파리클래스\n하나은행 15591004663104\n\n감사합니다!\n\n* 여행자 보험은 필수 입니다 :)\n* 취소 및 환불 \n3주전 100% 환불 가능\n2주전 80% 환불 가능\n1주전 50% 환불 가능\n그외 환불 불가.	\N	\N	\N	\N
13	f	invoiced	{파리}	2025-01-26 00:00:00	2025-02-04 00:00:00	2	1	leisure	all_inclusive	{hotel,"airport pick up and drop off","tour guide"}	1. 깔끔한 호텔 2. 친절한 여성분	6598700	KWR	f	\N	https://s.tosspayments.com/Bk2-nRMwNoY	66f539c9-5f6b-49a4-aeb9-4a15f8ea3066	2024-11-13 18:30:38.566	2024-11-27 13:04:43.764	f	[{"label": "배재연님 여행", "value": "가족여행 - 파리 / 어른2 아이 13세 1"}]	[{"day": "DAY 1  파리", "date": "2025-01-20T00:00:00.000Z", "time": "18:30", "latitude": "49.00407396716818", "longitude": "2.579229068056557", "placeName": "파리 샤를드골 2E"}, {"day": "DAY 2 파리", "date": "2025-01-21T00:00:00.000Z", "time": "10:00", "latitude": "48.86018724343484", "longitude": "2.3265828548816025", "placeName": "오르세 프라이빗 가이드 투어"}, {"day": "DAY 2 파리", "date": "2025-01-21T00:00:00.000Z", "time": "12:00", "latitude": "48.863583325525376", "longitude": "2.3275264837176772", "placeName": "튈르리 정원"}, {"day": "DAY 2 파리", "date": "2025-01-21T00:00:00.000Z", "time": "12:30", "latitude": "48.86577422551924", "longitude": "2.321171324194925", "placeName": "콩코르드 광장"}, {"day": "DAY 2 파리", "date": "2025-01-21T00:00:00.000Z", "time": "14:30", "latitude": "48.87437658741584", "longitude": "2.295215107387299", "placeName": "개선문 (외관 - 패스해도됨)"}, {"day": "DAY 2 파리", "date": "2025-01-21T00:00:00.000Z", "time": "14:30", "latitude": "48.87310836151725", "longitude": "2.2978633260464547", "placeName": "샹젤리제 거리 (+쇼핑)"}, {"day": "DAY 3 파리", "date": "2025-01-22T00:00:00.000Z", "time": "15:00", "latitude": "48.86241604680591", "longitude": "2.3503467710882178", "placeName": "샤틀레 레고 스토어"}, {"day": "DAY 3 파리", "date": "2025-01-22T00:00:00.000Z", "time": "16:00", "latitude": "48.87297768662734", "longitude": "2.3150493458805594", "placeName": "샹제리제 파리 생제르망 스토어"}, {"day": "DAY 3 파리", "date": "2025-01-22T00:00:00.000Z", "time": "21:00", "latitude": "48.84157859375149", "longitude": "2.2530933125523047", "placeName": "파리 생제르망 경기"}, {"day": "DAY 4 파리", "date": "2025-01-23T00:00:00.000Z", "time": "09:30", "latitude": "48.867512805669435", "longitude": "2.7836251837178767", "placeName": "디즈니 랜드 파리"}, {"day": "DAY 5 베르사유", "date": "2025-01-24T00:00:00.000Z", "time": "10:00", "latitude": "48.86073812286629", "longitude": "2.338480846408854", "placeName": "루브르 프라이빗 가이드 투어"}, {"day": "DAY 5 베르사유", "date": "2025-01-24T00:00:00.000Z", "time": "12:30", "latitude": "48.80412573214119", "longitude": "2.1216891972067655", "placeName": "베르사유 미슐랭 Ore Restaurant(알랑두카스)"}, {"day": "DAY 5 베르사유", "date": "2025-01-24T00:00:00.000Z", "time": "15:00", "latitude": "48.8049991305724", "longitude": "2.1204197702220524", "placeName": "베르사유 프라이빗 투어"}, {"day": "DAY 6 파리", "date": "2025-01-25T00:00:00.000Z", "time": "", "latitude": "48.856614", "longitude": "2.3522219", "placeName": "오전 마카롱 클래스"}, {"day": "DAY 6 파리", "date": "2025-01-25T00:00:00.000Z", "time": "", "latitude": "48.841863276226086", "longitude": "2.356542610162717", "placeName": "오후 자연사 박물관 or 에펠탑 옆 아쿠아리움"}, {"day": "DAY 7 파리", "date": "2025-01-26T00:00:00.000Z", "time": "10:00", "latitude": "48.886550903732235", "longitude": "2.3431217057607476", "placeName": "몽마르트언덕"}, {"day": "DAY 7 파리", "date": "2025-01-26T00:00:00.000Z", "time": "10:30", "latitude": "48.8867820525801", "longitude": "2.343102443386202", "placeName": "샤크레쾨르 대성당"}, {"day": "DAY 7 파리", "date": "2025-01-26T00:00:00.000Z", "time": "11:00", "latitude": "48.88490774339832", "longitude": "2.3386021063060225", "placeName": "사랑해 벽"}, {"day": "DAY 7 파리", "date": "2025-01-26T00:00:00.000Z", "time": "11:30", "latitude": "48.886827689951836", "longitude": "2.340759281867793", "placeName": "테르트르 광장"}, {"day": "DAY 7 파리", "date": "2025-01-26T00:00:00.000Z", "time": "15:00", "latitude": "48.872103750839685", "longitude": "2.3316335837181423", "placeName": "오페라 가르니에 내관"}, {"day": "DAY 7 파리", "date": "2025-01-26T00:00:00.000Z", "time": "16:00", "latitude": "48.86754192053343", "longitude": "2.3295742260461467", "placeName": "방돔 광장"}, {"day": "DAY 7 파리", "date": "2025-01-26T00:00:00.000Z", "time": "16:30", "latitude": "48.86525747102869", "longitude": "2.337906982652549", "placeName": "팔레 루아얄"}, {"day": "DAY 7 파리", "date": "2025-01-26T00:00:00.000Z", "time": "17:00", "latitude": "48.87437658741584", "longitude": "2.295215107387299", "placeName": "개선문 올라가기"}, {"day": "DAY 7 파리", "date": "2025-01-26T00:00:00.000Z", "time": "19:00", "latitude": "48.860636211124515", "longitude": "2.332497215012335", "placeName": "프라이빗 보트"}, {"day": "DAY 8 파리", "date": "2025-01-27T00:00:00.000Z", "time": "10:30", "latitude": "48.860734318781084", "longitude": "2.36683036730194", "placeName": "마레 지구 편집샵 (메르시)"}, {"day": "DAY 8 파리", "date": "2025-01-27T00:00:00.000Z", "time": "15:00", "latitude": "48.87379165535374", "longitude": "2.3320776945557267", "placeName": "라파예트 백화점"}, {"day": "마지막날 샴파뉴", "date": "2025-01-28T00:00:00.000Z", "time": "10:00", "latitude": "49.042959361617896", "longitude": "3.9606841484744444", "placeName": "샴파뉴 투어 - 차량"}, {"day": "마지막날", "date": "2025-01-28T00:00:00.000Z", "time": "17:00", "latitude": "49.00407396716818", "longitude": "2.579229068056557", "placeName": "파리 > 샤를드골 2E"}]	11월 27일 \n리츠 호텔 20-22일 \n슈페리어룸 > 이그제티브룸 무료 업그레이드 / 조식 포함 가격 \n공항 픽업 포함 *\n2185유로 * 2박 = 4370 유로 (약 10% 할인) \n4370유로 * 1510원 = 6 598 700원 \n결제하여 주시면 예약이 확정됩니다. \n예약 확정서는 워킹데이 기준 2-3일 내로 받으실 수 있게 됩니다. \n* 취소 및 환불은 3주전 가능합니다. (패션위크 기준) \n그외는 불가능 하시며, 취소 후 다시 예약시 금액이 달라질수 있습니다. \n* 도시세 1인 10유로는 관광법상 오셔서 체크인시 진행하시면 됩니다. \n\n-----------------------------------------------\n\nSO/ Paris hotel\nso-hotels.com\n1. 루브탑뷰 (2개룸 컨넥팅) 1박 2개룸 총 가격 1130유로 > 파클 할인 1090유로 (조식 포함 가격)\n2. 파리 스카이라인 뷰 1박 2개룸 총 가격 1280유로 > 파클 할인 1220유로 (조식 포함 가격)\n\n-------------\nNEXT > \n일정 확정 \n디즈니 랜드 티켓 2장 + 패스트트랙\n\n27일 이동만 돕는 가이딩*\n--------------------------------------\n11월 23일 견적 업데이트 \n견적 및 금액 - 1월 20-28일 645만원\n\n포함 사항*\n공항 픽업 및 샌딩 각 20만원 상당 \n오르세 & 베르사유 & 루브르 프라이빗 가이드 투어 (각 약 40만원 상당)\n샴페인 차량투어 \n프라이이빗 보트 \n10:00-18:00 동행 가이드 비용\n전 일정 티켓 비용\n디즈니 랜드 티켓 비용 (패스트 트랙 포함)\n디즈니 랜드 픽업 샌딩 \n남편분 공항 픽업 & 샌딩\n생제르망 픽업 & 샌딩\n\n불포함 사항*\n식비 / 각종 팁 비용\n\n11월 26일 - 예약금 지불 완료.	\N	b43a86d5-866e-466b-b75f-5ee89d89b15c	\N	\N
30	f	awaitingResponse	{Cannes}	2024-12-02 00:00:00	2024-12-12 00:00:00	1	0	business	all_inclusive	{economy,hotel}	ILTM	\N	\N	f	\N	\N	67e1575a-f7f7-4df0-951e-a1a46dfd10e8	2024-11-27 20:22:24.558	2024-11-27 20:28:22.599	f	[{"label": "ILTM", "value": "business"}]	[{"day": "공항", "date": "2024-12-01T00:00:00.000Z", "time": "", "latitude": "0", "longitude": "0", "placeName": "orly"}]	\N	\N	\N		\N
31	t	canceled	{Cannes}	2024-12-31 00:00:00	2025-01-01 00:00:00	1	0	business	custom	{budget,golf}		\N	\N	f	\N	\N	89427ca0-375b-4274-8ed9-d30685fca27a	2024-11-27 22:54:29.266	2024-11-27 22:56:35.485	f	\N	\N	\N	\N	\N		\N
33	f	invoiced	{Nice}	2024-12-02 00:00:00	2024-12-12 00:00:00	2	0	business	all_inclusive	{business,"airport pick up and drop off",car,"tour guide",hotel,budget}		5000	EUR	f	\N	paykdaalflk.fr	89427ca0-375b-4274-8ed9-d30685fca27a	2024-11-29 13:56:37.342	2024-11-29 13:58:37.966	f	\N	[{"day": "DAY 1  nive", "date": "2024-11-29T00:00:00.000Z", "time": "15:00", "latitude": "48.83460481430889", "longitude": "139.73177242328197", "placeName": "aird]"}]	\N	\N	\N	5000	\N
34	f	pending	{Paris,Prague}	2024-12-10 00:00:00	2024-12-11 00:00:00	2	0	business	custom	{business,budget,golf,"winery & champagne","luxury brand shopping"}		\N	\N	f	\N	\N	67e1575a-f7f7-4df0-951e-a1a46dfd10e8	2024-11-29 14:54:53.703	2024-11-29 14:54:53.703	f	\N	\N	\N	\N	\N		\N
35	f	invoiced	{Melbourne,Sydney}	2024-11-30 00:00:00	2024-12-02 00:00:00	1	0	business	custom	{economy,"airport pick up and drop off",budget,golf,"art & gallery","winery & champagne"}	art gallery lvoer	900000	EUR	f	\N	asfdfs.fr	67e1575a-f7f7-4df0-951e-a1a46dfd10e8	2024-11-29 15:34:33.803	2024-11-29 15:36:28.694	f	\N	[{"day": "DAY 1", "date": "2024-12-04T00:00:00.000Z", "time": "", "latitude": "35.68756627878243", "longitude": "139.76506210985414", "placeName": "Hoshinoya Tokyo"}, {"day": "DAY 2", "date": "2024-12-05T00:00:00.000Z", "time": "", "latitude": "35.68756627878243", "longitude": "139.76506210985414", "placeName": "Hoshinoya Tokyo"}]	\N	\N	\N	900000	\N
32	f	awaitingResponse	{파리}	2024-12-29 00:00:00	2025-01-04 00:00:00	2	1	leisure	custom	{"airport pick up and drop off","tour guide",car,"translation services","aesthetic cafes","michelin restaurants","patisserie/cooking classes","art & gallery","winery & champagne","spa/hot springs"}	먹고노는데아끼지않는 초4여아키우는집이고요\n\n애는 손으로하는걸좋아해요 그림요리 아빠는요리진심이고요 ㅡ요리사아녜요\n전 파키타를 꼭봐야하고요\n\n박물과 루브르 오르셰는 티컷샀지만 투어없이는 해석이 어렵습니다 3일오후6시 4일오전10시 스냅촬영있습니다. 저는 가르니에도가고싶으나사진용으로만요 먹고노는데 진심입니다	\N	\N	f	\N	\N	64b7f0a4-9b37-4160-947c-4a615633d1cd	2024-11-29 10:05:23.01	2024-11-29 22:33:52.292	f	\N	[{"day": "Day 1 파리", "date": "2024-12-29T00:00:00.000Z", "time": "17:30", "latitude": "49.00935865647749", "longitude": "2.5513830183887305", "placeName": "파리 샤를드골 공항"}, {"day": "Day 2 파리", "date": "2024-12-30T00:00:00.000Z", "time": "10:00", "latitude": "48.873911632860185", "longitude": "2.2950060391337677", "placeName": "개선문"}, {"day": "Day 2 파리", "date": "2024-12-30T00:00:00.000Z", "time": "10:30", "latitude": "48.866530080296265", "longitude": "2.3069756616344783", "placeName": "디올 카페"}, {"day": "Day 2 파리", "date": "2024-12-30T00:00:00.000Z", "time": "11:00", "latitude": "48.872302713197136", "longitude": "2.299608709807515", "placeName": "샹젤리제 거리 쇼핑"}, {"day": "Day 2 파리", "date": "2024-12-30T00:00:00.000Z", "time": "12:00", "latitude": "48.86667680531665", "longitude": "2.3208825507044484", "placeName": "콩코르드 광장"}, {"day": "Day 2 파리", "date": "2024-12-30T00:00:00.000Z", "time": "13:00", "latitude": "48.863253197260114", "longitude": "2.333397670214296", "placeName": "점심 Loulou paris"}, {"day": "Day 2 파리", "date": "2024-12-30T00:00:00.000Z", "time": "15:00", "latitude": "48.86068871397932", "longitude": "2.3377298274952714", "placeName": "루브르 박물관"}, {"day": "Day 2 파리", "date": "2024-12-30T00:00:00.000Z", "time": "17:00", "latitude": "48.86360055744981", "longitude": "2.3274934158467633", "placeName": "튈르리 크리스마스 마켓"}, {"day": "Day 3 파리", "date": "2024-12-31T00:00:00.000Z", "time": "09:00", "latitude": "48.85667606834155", "longitude": "2.3408819880066214", "placeName": "퐁네프 다리"}, {"day": "Day 3 파리", "date": "2024-12-31T00:00:00.000Z", "time": "09:30", "latitude": "48.85303170684288", "longitude": "2.3498806391325555", "placeName": "노트르담 대성당"}, {"day": "Day 3 파리", "date": "2024-12-31T00:00:00.000Z", "time": "10:30", "latitude": "48.85269723949031", "longitude": "2.3470873668391263", "placeName": "셰익스피어 서점"}, {"day": "Day 3 파리", "date": "2024-12-31T00:00:00.000Z", "time": "13:00", "latitude": "48.86045193601215", "longitude": "2.3267545158574965", "placeName": "오르세 프라이빗 투어"}, {"day": "Day 3 파리", "date": "2024-12-31T00:00:00.000Z", "time": "15:30", "latitude": "48.869025538139546", "longitude": "2.330170727753839", "placeName": "파크 하얏트 카페"}, {"day": "Day 3 파리", "date": "2024-12-31T00:00:00.000Z", "time": "17:00", "latitude": "48.84680846863765", "longitude": "2.336373797526851", "placeName": "뤽상부르 공원"}, {"day": "Day 3 파리", "date": "2024-12-31T00:00:00.000Z", "time": "17:30", "latitude": "48.85132398701022", "longitude": "2.3244957256411256", "placeName": "르봉막셰 백화점 (쇼핑+식품관)"}, {"day": "Day 4 파리", "date": "2025-01-01T00:00:00.000Z", "time": "11:00", "latitude": "48.862970575317156", "longitude": "2.34271712564181", "placeName": "피놀트 컬렉션 현대 미술관"}, {"day": "Day 4 파리", "date": "2025-01-01T00:00:00.000Z", "time": "14:00", "latitude": "48.866273911399475", "longitude": "2.3125541740333997", "placeName": "그랑팔레 스케이트장"}, {"day": "Day 4 파리", "date": "2025-01-01T00:00:00.000Z", "time": "16:30", "latitude": "48.86370185591553", "longitude": "2.337033017978955", "placeName": "팔레 루아얄 + 정원"}, {"day": "Day 4 파리", "date": "2025-01-01T00:00:00.000Z", "time": "17:00", "latitude": "48.86754897798719", "longitude": "2.329509852624706", "placeName": "방돔 광장"}, {"day": "Day 4 파리", "date": "2025-01-01T00:00:00.000Z", "time": "17:30", "latitude": "48.86896269983575", "longitude": "2.333018945815711", "placeName": "오페라 거리"}, {"day": "Day 4 파리", "date": "2025-01-01T00:00:00.000Z", "time": "20:00", "latitude": "48.872093194294614", "longitude": "2.3316335865729445", "placeName": "오페라 가르니에 파키타 공연"}, {"day": "Day 5 베르사유 & 파리", "date": "2025-01-02T00:00:00.000Z", "time": "10:45", "latitude": "48.805006196843145", "longitude": "2.1203553968021955", "placeName": "베르사유 프라이빗 가이드 투어"}, {"day": "Day 5 베르사유 & 파리", "date": "2025-01-02T00:00:00.000Z", "time": "13:00", "latitude": "48.80159812382462", "longitude": "2.119851910678056", "placeName": "베르사유 미슐랭 1 - Ore restaurant (알랑두카스)"}, {"day": "Day 5 베르사유 & 파리", "date": "2025-01-02T00:00:00.000Z", "time": "14:30", "latitude": "48.86086253937685", "longitude": "2.366853354477911", "placeName": "마레지구 메르시 매장"}, {"day": "Day 5 베르사유 & 파리", "date": "2025-01-02T00:00:00.000Z", "time": "15:30", "latitude": "48.860393945112214", "longitude": "2.365335305060047", "placeName": "마레지구 소품샵"}, {"day": "Day 5 베르사유 & 파리", "date": "2025-01-02T00:00:00.000Z", "time": "18:00", "latitude": "0", "longitude": "0", "placeName": "오후6시 스냅촬영"}, {"day": "Day 6 파리", "date": "2025-01-03T00:00:00.000Z", "time": "10:00", "latitude": "48.85956406023097", "longitude": "2.3424116526242416", "placeName": "사마리텐 백화점"}, {"day": "Day 6 파리", "date": "2025-01-03T00:00:00.000Z", "time": "11:00", "latitude": "48.8590335799495", "longitude": "2.343215652448571", "placeName": "LV DREAM 루이비통 전시"}, {"day": "Day 6 파리", "date": "2025-01-03T00:00:00.000Z", "time": "12:00", "latitude": "48.85848923520181", "longitude": "2.3432020826776876", "placeName": "루이비통 카페"}, {"day": "Day 6 파리", "date": "2025-01-03T00:00:00.000Z", "time": "13:00", "latitude": "48.85883818176163", "longitude": "2.342016942781813", "placeName": "Le tout paris 식당"}, {"day": "Day 6 파리", "date": "2025-01-03T00:00:00.000Z", "time": "14:30", "latitude": "48.88692558726796", "longitude": "2.343003617768222", "placeName": "몽마르뜨 언덕"}, {"day": "Day 6 파리", "date": "2025-01-03T00:00:00.000Z", "time": "15:00", "latitude": "48.886860271680426", "longitude": "2.3430550351280046", "placeName": "사크레쾨르 성당"}, {"day": "Day 6 파리", "date": "2025-01-03T00:00:00.000Z", "time": "15:30", "latitude": "48.88657371904461", "longitude": "2.3408880274967405", "placeName": "테르트르 광장 + 기념품샵"}, {"day": "Day 6 파리", "date": "2025-01-03T00:00:00.000Z", "time": "17:00", "latitude": "48.884895386453174", "longitude": "2.3385350814619468", "placeName": "사랑해벽"}, {"day": "Day 6 파리", "date": "2025-01-03T00:00:00.000Z", "time": "18:00", "latitude": "48.864158724680365", "longitude": "2.3058515514981606", "placeName": "바토무슈 유람선"}, {"day": "Day 7 파리", "date": "2025-01-04T00:00:00.000Z", "time": "10:00", "latitude": "48.87675816986825", "longitude": "2.2635453544788455", "placeName": "루이비통 파운데이션"}, {"day": "Day 7 파리", "date": "2025-01-04T00:00:00.000Z", "time": "12:30", "latitude": "48.87790213526335", "longitude": "2.2696418726874463", "placeName": "볼룬뉴 숲"}, {"day": "Day 7 파리", "date": "2025-01-04T00:00:00.000Z", "time": "14:00", "latitude": "48.86283892182219", "longitude": "2.2875477259411463", "placeName": "트로카데로 광장"}, {"day": "Day 7 파리", "date": "2025-01-04T00:00:00.000Z", "time": "16:20", "latitude": "49.00935865647749", "longitude": "2.5513830183887305", "placeName": "공항 샌딩 (비행 19:20)"}]	안녕하세요, \n\n먼저 일정 보내드립니다:)\n혹시 더 더하고 싶으시거나 빼고 싶으신 것들이 있다면, 알려주시면 언제든지 수정이 가능하십니다!\n\n감사합니다 ☺️	\N	9d46032b-5377-45c2-af01-78a3492898fa	얼마나될까요 300?	\N
\.


--
-- Data for Name: ResetChance; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ResetChance" (id, "userId", "createdAt") FROM stdin;
\.


--
-- Data for Name: Upload; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Upload" (id, title, "fileType", "createdAt", "updatedAt", "requestId") FROM stdin;
de09c8ac-0a4f-40b1-af19-ef3919f3ddf4	Test	png	2024-11-03 23:17:05.674	2024-11-03 23:17:05.674	1
f2927533-1d0d-4f51-b52d-464fb773e3fc	Ticket	pdf	2024-11-04 11:47:05.867	2024-11-04 11:47:05.867	1
a53271d6-4e0a-4c67-90ed-4ea9c3130123	리츠 칼튼 호텔 확정서	pdf	2024-11-13 11:37:09.162	2024-11-13 11:37:09.162	11
b64521a0-ee3b-4c38-8f2f-7627cd7db7c9	파리 생제르망 경기 임시 티켓	png	2024-11-14 12:50:31.272	2024-11-14 12:50:31.272	13
b4b095db-93de-4ae9-b3aa-3c567ba6c2a9	현동우님 세비야 호텔 예약서	png	2024-11-16 22:55:28.82	2024-11-16 22:55:28.82	17
f47d04d4-cf42-4e3b-8004-bb78797878f9	유민지님 호텔 컨펌 바우처	png	2024-11-19 16:20:21.271	2024-11-19 16:20:21.271	7
cf7b4b9b-cdbe-4601-9097-7180d550d74a	비행기표	pdf	2024-11-19 17:24:16.626	2024-11-19 17:24:16.626	19
ee8dab79-d99c-407e-b59a-73ce7b48189f	호시노야 공홈 가격	png	2024-11-20 14:49:29.398	2024-11-20 14:49:29.398	21
3291463e-8f40-4b76-be62-216ef43cfdf4	안가람님 호시노야 호텔 예약 확정서	pdf	2024-11-21 11:14:18.076	2024-11-21 11:14:18.076	21
e973059b-610d-45d3-843b-e505b4da3340	마드리드 세비야 가족 티켓	pdf	2024-11-21 11:47:36.772	2024-11-21 11:47:36.772	17
48e0bcf8-aa28-4d52-ad90-1b4f2b26d044	D	pdf	2024-11-22 17:10:35.451	2024-11-22 17:10:35.451	9
f60fa1a7-8bf2-4a48-a45b-5253265a6232	알함브라 티켓	pdf	2024-11-24 18:51:58.089	2024-11-24 18:51:58.089	17
e00f249e-c2f8-4dc1-93dd-4b4f018978d2	파라솔 티켓	pdf	2024-11-24 18:52:15.028	2024-11-24 18:52:15.028	17
6180f18d-e646-485c-9b8c-ad8eeb3b53f2	팔라시오 리얼 티켓	pdf	2024-11-24 18:52:44.446	2024-11-24 18:52:44.446	17
ef78b7c7-1157-4e05-bda7-6703c1c79011	미니밴 예약	jpg	2024-11-25 17:09:06.2	2024-11-25 17:09:06.2	17
71692c27-4e42-4a9d-b964-1c48ade08cb7	플라밍고 티켓	pdf	2024-11-25 17:09:20.953	2024-11-25 17:09:20.953	17
84ed407e-343d-414b-8015-5ac733d6fb29	프라그 티켓	pdf	2024-11-25 17:09:34.446	2024-11-25 17:09:34.446	17
af8523b9-bc45-47dd-8499-528449d9098c	알카자 티켓	pdf	2024-11-25 17:09:46.364	2024-11-25 17:09:46.364	17
2b1bfa6f-7f9d-49e4-87b1-90d4428bd8d3	트렌 티켓	pdf	2024-11-25 17:09:55.874	2024-11-25 17:09:55.874	17
bc66fb13-7cf4-4e57-aca9-ec2840a0448e	세비야 대성당 티켓	pdf	2024-11-25 17:10:12.084	2024-11-25 17:10:12.084	17
b969b4c6-8aa3-43ff-aa5d-4812ce5b2cf2	트렌 귀이아 티켓	pdf	2024-11-25 17:10:33.296	2024-11-25 17:10:33.296	17
b0844d7b-2908-4e15-ba21-beebb52c91cb	베르사유	jpg	2024-11-29 11:36:43.5	2024-11-29 11:36:43.5	32
0b851587-38e4-42d1-9961-6b8811082dd7	세비야 성당	pdf	2024-11-29 12:26:28.114	2024-11-29 12:26:28.114	17
ba089ee9-75f5-4cb2-ae35-3e617af27cd9	런던 비행편 티켓	jpg	2024-11-29 13:05:00.216	2024-11-29 13:05:00.216	32
ea83976d-0290-4ac7-a1a7-2a01a126d5e8	서울 파리 비행편 티켓	jpg	2024-11-29 13:05:17.61	2024-11-29 13:05:17.61	32
52f027ff-d533-4661-97e3-5a2dccb0ead5	dfdf	pdf	2024-11-29 15:36:45.683	2024-11-29 15:36:45.683	35
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, email, password, name, "phoneNumber", birthday, gender, extra, "businessNumber", "accountType", "moneySpent", "userLevel", "createdAt", "updatedAt", passcode, newsletter, referrer) FROM stdin;
67e1575a-f7f7-4df0-951e-a1a46dfd10e8	admin@tip.com	$2b$10$ymhkbxstA3GwCTiHgjjxt.rE/DEgom6E5C3mk..tCoDD.MiWVk5Fa	Tip Admin	010-1234-5678	1990-01-01 00:00:00	Female	\N	\N	Admin	0	tip_white	2024-10-23 22:00:22.209	2024-10-23 22:00:22.209	\N	f	\N
e8dd5762-628a-4360-ac9c-351fe17cdeb7	223jisun@naver.com	$2b$10$TkYrSKej7d/b48yKuVRQ6uNvy0CG37zSYFS3.bZ6t35UbjFJpWqqy	전지선	01072668387	2024-02-22 15:00:00	Female	\N	\N	Leisure	0	tip_white	2024-11-06 18:47:36.869	2024-11-06 19:40:54.652	\N	t	223jisun@naver.com
6989c589-14ef-46dd-a1cf-07d78e4ed329	ds1aef@gmail.com	$2b$10$ZniV7YXv2wZWICJVulOUgemDN7b0D6FT.ZopGmL6FUZM0dTuvINi.	남재홍	01091754691	1980-07-16 15:00:00	Male	\N	\N	Leisure	0	tip_white	2024-11-01 23:09:35.305	2024-11-08 06:41:25.268	741568	f	\N
45d756c0-a1b0-4c48-9e2d-910a0e1ccf29	yoomj91@gmail.com	$2b$10$mqm13/wq/.w6CvX4VVGBpeyFPhpXeqJAFUg42h3CijBTodLhvCRry	minjie yoo	+821034184344	1991-10-18 15:00:00	Female	\N	\N	Leisure	0	tip_white	2024-11-09 10:29:13.73	2024-11-09 10:29:13.73	\N	t	yoomj91@gmail.com
40908a5e-6865-4241-b361-82750a05f9d0	wgj00171@naver.com	$2b$10$U2QuNsaOKnCb83v.SU5MLuLi9bdpEs.xXYOzetEbPxrdOuYuoxR/a	엄성실	01031530374	1993-06-25 15:00:00	Female	\N	\N	Leisure	0	tip_white	2024-11-09 13:25:04.815	2024-11-09 13:25:04.815	\N	t	parisclass.france@gmail.com
9a981083-4cc7-4e06-b388-707fb6db0256	kimmi7830@gmail.com	$2b$10$vbTk4.gE01h4UV/0lb8E1ez6OJ/0f3l5S88cjGbqaPUNdBwm1aisS	김미경	01080085811	1978-07-29 15:00:00	Female	\N	\N	Leisure	0	tip_white	2024-11-10 12:07:25.507	2024-11-10 12:07:25.507	\N	t	parisclass.france@gmail.com
0c1d4b1b-9f17-4ee4-b7e0-43cbf04fb2fa	daeun__1991@naver.com	$2b$10$PljqkB7.UvMu0d.RLTQxWeSyiSvd1Qiil/ry36/ymTx1ZL19Mqpu.	박다은	01047033975	1991-09-21 15:00:00	Female	\N	\N	Leisure	0	tip_white	2024-11-11 14:31:50.991	2024-11-11 14:31:50.991	\N	t	123@naver.com
59baba60-cdb4-4c10-9e79-9384756d2081	iamdevduke@gmail.com	$2b$10$vZxm0QwWIMDOt9/Cww/iwuhRhKrgIallSjPt3/OdWx4n9aHsOXLQ2	김주형	7082894286	2024-05-29 15:00:00	Male	\N	\N	Leisure	0	tip_white	2024-11-04 20:57:55.956	2024-11-12 15:27:03.687	914976	t	dukekim47@gmail.com
89427ca0-375b-4274-8ed9-d30685fca27a	hannah@parisclass.com	$2b$10$MROE6sVVPmT41WBhJogz.OrxmgXXVa5lj8ex0E4PWMlV1u2AtRiUi	PARIS CLASS	+33695963988	1991-04-24 22:00:00	Female	\N	0	Business	0	tip_white	2024-11-03 17:22:36.925	2024-11-12 17:54:39.569	989692	f	\N
c944a4dc-4442-4bdf-ae4e-2d31b70c584a	dukekim47@gmail.com	$2b$10$SUJ1Pf9M9Qbu.zim8JWKb.O6hIIBHY4iqaFkSCTtAKuw9VGrEFKh2	Test Sign Up	7082894286	2024-06-27 15:00:00	Male	\N	\N	Leisure	0	tip_white	2024-11-13 13:05:40.58	2024-11-13 13:05:40.58	\N	t	
e0d6d239-b296-43ab-a536-0cd009c509b7	duke@centraldiv.com	$2b$10$Ol1iDtFtnGdSUzd.i.1.GO9ANIXDF0bB/hRH2W3.fwkTLZDWsnYYy	Duke Kim	2527230023	2024-10-29 15:00:00	Male	\N	\N	Leisure	0	tip_white	2024-11-13 13:28:18.552	2024-11-13 13:28:18.552	\N	t	
66f539c9-5f6b-49a4-aeb9-4a15f8ea3066	lovlyjj215@naver.com	$2b$10$JsKMHdHG.b6Xqe3WTHqN1eTfJnofgn5TDGZ5bZ2aAarzb6CHHQI4y	배재연	01020982214	2024-11-01 15:00:00	Female	\N	\N	Leisure	0	tip_white	2024-11-13 17:29:32.849	2024-11-13 17:29:32.849	\N	t	parisclass.france@gmail.com
f54bdea7-0cd6-4333-9046-d3f0a555bb53	Hwdw0320@naver.com	$2b$10$ncjQ3rtJELIx3d50mVQlHeVd/MgXYvIdOPVLu3QPVriO7lS2vTt5y	김해원	010.8783.0830 	2024-11-16 01:31:58.366	Male	\N	\N	Leisure	0	tip_white	2024-11-16 01:32:10.362	2024-11-16 01:32:10.362	\N	t	
85b25d8e-c6b7-4e82-b7bd-719877104a9c	entbaro@naver.com	$2b$10$8BPWsG0dVs5nx3KKgpFAnu1lxVYk/oDazpGC.7Jhx8B8zmJZO4Bnm	현동우	010-6449-3299 	1978-01-29 15:00:00	Male	\N	\N	Leisure	0	tip_white	2024-11-16 13:21:28.961	2024-11-16 13:21:28.961	\N	t	
6595b064-085c-4ad3-a95b-645c5e55fdfa	bjwy3@naver.com	$2b$10$uP7s3T3i9bzmPm7nZh.iF.GFpcvElbFmJtsTJjy6SzhTaryaDR7Ge	곽윤희	01074563752	1991-08-11 15:00:00	Female	\N	\N	Leisure	0	tip_white	2024-11-17 22:25:36.675	2024-11-17 22:25:36.675	\N	f	
0ddc2028-a651-415a-987d-cb7ca1f7f3a6	ming1241@naver.com	$2b$10$ICpWDdBVlXhZYlMZbkeVLe5RK0bBse5MufWlA0o/JzPU/MzGT2IaO	정명화	01032461241	1991-03-28 15:00:00	Female	\N	\N	Leisure	0	tip_white	2024-11-18 03:21:26.702	2024-11-18 03:21:26.702	\N	t	
92e4c16b-d63b-4777-91f3-6de8af0cd906	Sungkyu7508@gmail.com	$2b$10$jNtnGJoJita08oVUkA5w.O06aoy74Hfk8gIqcmM7K1qCuUusSqrmG	Kim sungkyu	0640823741	1975-08-25 23:00:00	Male	\N	\N	Leisure	0	tip_white	2024-11-18 11:48:18.145	2024-11-18 11:48:18.145	\N	t	
50ede376-26f6-4632-98f0-da8373cdc498	babystar506@gmail.com	$2b$10$ER4jpf/tDpKbwnGRz.hsWexbXh9ooanr2.kXYJCgE19iIas3mxWWS	이현정	01043348461	1991-06-18 15:00:00	Female	\N	\N	Leisure	0	tip_white	2024-11-18 12:01:35.403	2024-11-18 12:01:35.403	\N	t	
17547855-765d-435e-a15c-4e0119ccf2a5	3-gomeisa@hanmail.net	$2b$10$XBLDNI/atfCfBNxwNhN5pOKzuaAkImOq3iR6CgaZUhusd3Qv1/zp.	김주호	01047067097	1985-10-22 15:00:00	Male	\N	\N	Leisure	0	tip_white	2024-11-18 12:04:40.162	2024-11-18 12:04:40.162	\N	t	babystar506@gmail.com
a3e3dbe7-69bc-4c45-b234-df13e539756c	Clarahan0366@gmail.com	$2b$10$5UsLOKEPSeOYzrLgcoIG1OUQCiTyas91wPkL1gGIxq05Ty4yW3GZW	한아름	821045500366	1991-11-20 15:00:00	Female	\N	\N	Leisure	0	tip_white	2024-11-18 14:13:49.26	2024-11-18 14:13:49.26	\N	t	
2069acc9-a487-43b3-9428-7b287f025885	garam_0914@naver.com	$2b$10$xdK3TgTDxIizCHiBZytkTeIGMs/y6GbwmlmD2cbGjSjtC3NL7ccHi	안가람	01046164079	1991-09-13 15:00:00	Male	\N	7318703534	Business	0	tip_white	2024-11-20 09:22:54.325	2024-11-20 09:22:54.325	\N	t	
bac73180-a977-4e0e-9a1e-94b718281845	krpark0388@gmail.com	$2b$10$mCcZjpF4VTyq.ZeeWfTBV.sDiT7.dgHzqGzp2Vf9yfi0vqLQDx4Gy	박극로	01092660388	1952-11-04 15:00:00	Male	\N	\N	Leisure	0	tip_white	2024-11-21 19:26:14.476	2024-11-21 19:26:14.476	\N	t	
e47a1e61-cec5-424d-a589-0fb6c895fb24	im65321@gmail.com	$2b$10$ota3QCAbIaPwc7HysSr7vOCqh1UPOnSVGp87urBEpVEQTfFrKDGcm	임성배	01047516397	1965-03-26 15:00:00	Female	\N	\N	Leisure	0	tip_white	2024-11-22 17:29:42.411	2024-11-22 17:29:42.411	\N	t	
54e96f24-ca06-4567-8515-60327710f904	geedile@gmail.com	$2b$10$cB87MNRD.kax26PoDX6QruNkavxsmDWNjTwWsTwDx/RdflB50qCIu	Gugulethu Dile	16477086850	2023-10-08 04:00:00	Female	\N	\N	Leisure	0	tip_white	2024-11-22 18:24:56.272	2024-11-22 18:24:56.272	\N	t	geedile@gmail.com
e3dd0a44-eff1-4b7a-b03c-6014aed8754e	itsjelee@naver.com	$2b$10$P791.Ep3J58bgWsFJCTYbuWNhC8jPbeu820HLxptQww7R2vHtMZP2	이주은	01094672109	1989-10-31 15:00:00	Female	\N	\N	Leisure	0	tip_white	2024-11-23 11:27:44.373	2024-11-23 11:27:44.373	\N	f	
e821886f-812d-433e-a825-18b79fbbcdaf	hurgyu@naver.com	$2b$10$x2EuVKo1tS7A8FizDXoL4e98HjczrbChdX3uLA0QPG5N0.uwAxMpa	허규영	01048917171	1992-01-24 15:00:00	Male	\N	\N	Leisure	0	tip_white	2024-11-23 22:50:56.75	2024-11-23 22:50:56.75	\N	f	
85604b11-e773-4526-872d-0a35e02266d1	hellen95@naver.com	$2b$10$tyYZh4sA71WfhpdwE30D0.IRv6.W.iCumBPnrr9SWI798P/54Zuvm	노현서	0145756881	1995-10-01 15:00:00	Female	\N	\N	Leisure	0	tip_white	2024-11-25 15:37:05.67	2024-11-25 15:37:05.67	\N	t	
5f00c3da-ec91-4272-a782-46d9c27ed2d3	hongmyee@hotmail.com	$2b$10$9LLB3zfvzb0cFiNA1jYZGeldmrbHCFxneEIiC4QpKpxxbuYxZiFOy	신홍미	01089444882	1974-05-04 15:00:00	Female	\N	\N	Leisure	0	tip_white	2024-11-26 10:56:34.534	2024-11-26 10:56:34.534	\N	f	
751fa931-e08a-478b-bc01-9974515db194	Sk5220534@hotmail.com	$2b$10$3SJ6FtUGKlC1lgYoFaMj6.AcJZ7EPmTpv/YnQy7DxkHVFBPshRZI6	손용환	01084152500	2024-11-25 15:00:00	Male	\N	\N	Leisure	0	tip_white	2024-11-26 13:02:41.903	2024-11-26 13:02:41.903	\N	t	
e64faccf-1002-4ccd-8c65-337cb81a35ae	sopbyul@gmail.com	$2b$10$4NHAfhZLQRS1DQgKj/7.1eNLH1kzHcwda.giG20vnDiJK1TTsIq9W	조은별	0695030079	1991-01-10 23:00:00	Female	\N	\N	Leisure	0	tip_white	2024-11-27 11:18:32.863	2024-11-27 11:18:32.863	\N	t	
64b7f0a4-9b37-4160-947c-4a615633d1cd	always0206@naver.com	$2b$10$m78l3y2P35f7df7mxzS78.IztlqbZVs71g5CmUq6p2O0VEQ.GEM7y	김수미	01085894724	1982-10-22 15:00:00	Female	\N	\N	Leisure	0	tip_white	2024-11-29 09:46:10.996	2024-11-29 09:46:10.996	\N	t	
\.


--
-- Name: AddedInvoices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."AddedInvoices_id_seq"', 1, false);


--
-- Name: EditRequest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."EditRequest_id_seq"', 11, true);


--
-- Name: ExtraRequests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ExtraRequests_id_seq"', 1, false);


--
-- Name: Request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Request_id_seq"', 35, true);


--
-- Name: AddedInvoices AddedInvoices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AddedInvoices"
    ADD CONSTRAINT "AddedInvoices_pkey" PRIMARY KEY (id);


--
-- Name: Coupon Coupon_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Coupon"
    ADD CONSTRAINT "Coupon_pkey" PRIMARY KEY (id);


--
-- Name: EditRequest EditRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EditRequest"
    ADD CONSTRAINT "EditRequest_pkey" PRIMARY KEY (id);


--
-- Name: ExtraRequests ExtraRequests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ExtraRequests"
    ADD CONSTRAINT "ExtraRequests_pkey" PRIMARY KEY (id);


--
-- Name: Request Request_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Request_pkey" PRIMARY KEY (id);


--
-- Name: ResetChance ResetChance_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ResetChance"
    ADD CONSTRAINT "ResetChance_pkey" PRIMARY KEY (id);


--
-- Name: Upload Upload_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Upload"
    ADD CONSTRAINT "Upload_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Coupon_code_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Coupon_code_key" ON public."Coupon" USING btree (code);


--
-- Name: Request_sharedLink_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Request_sharedLink_key" ON public."Request" USING btree ("sharedLink");


--
-- Name: ResetChance_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "ResetChance_userId_key" ON public."ResetChance" USING btree ("userId");


--
-- Name: User_email_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_email_idx" ON public."User" USING btree (email);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_name_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_name_idx" ON public."User" USING btree (name);


--
-- Name: User_passcode_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_passcode_key" ON public."User" USING btree (passcode);


--
-- Name: AddedInvoices AddedInvoices_requestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AddedInvoices"
    ADD CONSTRAINT "AddedInvoices_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES public."Request"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: EditRequest EditRequest_requestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EditRequest"
    ADD CONSTRAINT "EditRequest_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES public."Request"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ExtraRequests ExtraRequests_requestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ExtraRequests"
    ADD CONSTRAINT "ExtraRequests_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES public."Request"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ExtraRequests ExtraRequests_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ExtraRequests"
    ADD CONSTRAINT "ExtraRequests_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Request Request_couponId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Request_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES public."Coupon"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Request Request_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ResetChance ResetChance_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ResetChance"
    ADD CONSTRAINT "ResetChance_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Upload Upload_requestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Upload"
    ADD CONSTRAINT "Upload_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES public."Request"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

