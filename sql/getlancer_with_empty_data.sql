--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: activities_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE activities_type AS ENUM (
    'ContestUser',
    'Contest',
    'Project',
    'QuoteBid',
    'Message'
);


--
-- Name: activity_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE activity_type AS ENUM (
    'StatusChanged',
    'NewEntryPosted',
    'RatingPosted',
    'MessagePosted'
);


--
-- Name: apns_devices_development; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE apns_devices_development AS ENUM (
    'production',
    'sandbox'
);


--
-- Name: apns_devices_pushalert; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE apns_devices_pushalert AS ENUM (
    'disabled',
    'enabled'
);


--
-- Name: apns_devices_pushbadge; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE apns_devices_pushbadge AS ENUM (
    'disabled',
    'enabled'
);


--
-- Name: apns_devices_pushsound; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE apns_devices_pushsound AS ENUM (
    'disabled',
    'enabled'
);


--
-- Name: apns_devices_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE apns_devices_status AS ENUM (
    'registered',
    'unregistered'
);


--
-- Name: flag_categories_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE flag_categories_type AS ENUM (
    'User',
    'Contest',
    'ContestUser',
    'Job',
    'Project',
    'QuoteService',
    'Portfolio'
);


--
-- Name: flags_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE flags_type AS ENUM (
    'User',
    'Contest',
    'ContestUser',
    'Job',
    'Project',
    'QuoteService',
    'Portfolio'
);


--
-- Name: followers_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE followers_type AS ENUM (
    'User',
    'Contest'
);


--
-- Name: jobs_apply_via; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE jobs_apply_via AS ENUM (
    'via_our_site',
    'via_company'
);


--
-- Name: jobs_skills_set; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE jobs_skills_set AS ENUM (
    '8',
    '5',
    '6',
    '9',
    '11',
    '12',
    '13',
    '14',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '26'
);


--
-- Name: message_contents_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE message_contents_type AS ENUM (
    'Contest',
    'ContestUser',
    'Project',
    'ProjectBid',
    'QuoteBid'
);


--
-- Name: messages_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE messages_type AS ENUM (
    'Contest',
    'ContestUser',
    'Project',
    'ProjectBid',
    'QuoteBid'
);


--
-- Name: payment_gateway_settings_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE payment_gateway_settings_type AS ENUM (
    'text',
    'textarea',
    'select',
    'checkbox',
    'radio',
    'password'
);


--
-- Name: projects_project_categories_set; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE projects_project_categories_set AS ENUM (
    '9',
    '8',
    '7',
    '6',
    '10',
    '11',
    '12',
    '13',
    '14'
);


--
-- Name: projects_skills_set; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE projects_skills_set AS ENUM (
    '8',
    '5',
    '6',
    '9',
    '11',
    '12',
    '13',
    '14',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38'
);


--
-- Name: reviews_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE reviews_type AS ENUM (
    'ContestUser',
    'Project',
    'Request',
    'Service'
);


--
-- Name: settings_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE settings_type AS ENUM (
    'text',
    'textarea',
    'select',
    'checkbox',
    'radio',
    'password'
);


--
-- Name: transaction_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE transaction_type AS ENUM (
    'AmountAddedToWallet',
    'AdminAddedAmountToUserWallet',
    'AdminDeductedAmountToUserWallet',
    'ProjectListingFee',
    'AmountMovedToEscrow',
    'ProjectMilestonePayment',
    'ContestListingFee',
    'AmountRefundedToWalletForCanceledContest',
    'AmountRefundedToWalletForRejectedContest',
    'ContestFeaturesUpdatedFee',
    'ContestTimeExtendedFee',
    'AmountMovedToParticipant',
    'JobListingFee',
    'ServiceListingFee'
);


--
-- Name: transactions_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE transactions_type AS ENUM (
    'Wallet',
    'Contest',
    'Project',
    'Job',
    'Service',
    'QuoteCreditPurchasePlan'
);


--
-- Name: views_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE views_type AS ENUM (
    'User',
    'Contest',
    'ContestUser',
    'Job',
    'Project',
    'QuoteService',
    'Portfolio'
);


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: activities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE activities (
    id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    other_user_id bigint,
    foreign_id bigint DEFAULT 0,
    class character varying(255) NOT NULL,
    from_status_id bigint DEFAULT 0 NOT NULL,
    to_status_id bigint DEFAULT 0 NOT NULL,
    activity_type character varying(255) NOT NULL,
    model_id bigint DEFAULT 0 NOT NULL,
    model_class character varying(255),
    amount double precision DEFAULT 0 NOT NULL
);


--
-- Name: COLUMN activities.activity_type; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN activities.activity_type IS '1 - When message posted then changed to MessagePosted status 2 - when post the rating then changed to RatingPosted status 3 - Notification sent(Contest,Project,Job) 4 - Job Open status changed 5 - When apply the Job then changed to JobApply status 6 - when post the Portfolio then changed to PortfolioPosted 7 - when post the Follower then changed to FollowerPosted 8 - when post the Quote Request then changed to QuoteRequestPosted 9 - when post the QuoteBid then changed to QuoteBidPosted 10 - when post the QuoteBid then changed to QuoteBidPosted 11 - Amount changed then status should be AmountChanged(Quotebid) 12 - Project Open status changed 13 - Project status changed from new to old 14 - Select the project winner staus 15 - When post the Project Dispute then changed to ProjectDisputePosted 16 - When post the Project Bid Invoice then changed to ProjectBidInvoicePosted 17 - When completed the invoice 18 - When post the Milestone then changed to MilestonePosted 19 - Milestone status changed 20 - Contest status ';


--
-- Name: activities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE activities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE activities_id_seq OWNED BY activities.id;


--
-- Name: apns_devices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE apns_devices (
    pid integer NOT NULL,
    appname character varying(510) NOT NULL,
    appversion character varying(50),
    deviceuid character(40) NOT NULL,
    devicetoken character(64) NOT NULL,
    devicename character varying(510) NOT NULL,
    devicemodel character varying(200) NOT NULL,
    deviceversion character varying(50) NOT NULL,
    pushbadge character varying(200) DEFAULT 'enabled'::character varying,
    pushalert character varying(200) DEFAULT 'enabled'::character varying,
    pushsound character varying(200) DEFAULT 'enabled'::character varying,
    development character varying(200) DEFAULT 'production'::character varying NOT NULL,
    status character varying(200) DEFAULT 'registered'::character varying NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint NOT NULL
);


--
-- Name: attachments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE attachments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: attachments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE attachments (
    id bigint DEFAULT nextval('attachments_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    class character varying(200) NOT NULL,
    foreign_id bigint NOT NULL,
    filename character varying(510) NOT NULL,
    dir character varying(200) NOT NULL,
    mimetype character varying(200),
    filesize bigint,
    height bigint,
    width bigint,
    thumb boolean,
    description text
);


--
-- Name: bid_portfolios_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE bid_portfolios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bid_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE bid_statuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bid_statuses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE bid_statuses (
    id bigint DEFAULT nextval('bid_statuses_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(510) NOT NULL,
    bid_count bigint NOT NULL
);


--
-- Name: bids_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE bids_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bids; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE bids (
    id bigint DEFAULT nextval('bids_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    project_bid_id bigint NOT NULL,
    project_id bigint NOT NULL,
    amount double precision NOT NULL,
    description text,
    duration bigint NOT NULL,
    winner_selected_date timestamp without time zone,
    bid_status_id integer NOT NULL,
    is_notifiy boolean,
    is_withdrawn boolean DEFAULT false NOT NULL,
    is_freelancer_withdrawn boolean DEFAULT false NOT NULL,
    total_escrow_amount double precision DEFAULT 0 NOT NULL,
    amount_in_escrow double precision DEFAULT 0 NOT NULL,
    paid_escrow_amount double precision DEFAULT 0 NOT NULL,
    total_invoice_requested_amount double precision DEFAULT 0 NOT NULL,
    site_commission_from_employer double precision DEFAULT 0 NOT NULL,
    total_invoice_got_paid double precision DEFAULT 0 NOT NULL,
    site_commission_from_freelancer double precision DEFAULT 0 NOT NULL,
    development_start_date timestamp without time zone,
    development_end_date timestamp without time zone,
    is_offered_rejected boolean DEFAULT false NOT NULL,
    message_count bigint DEFAULT 0 NOT NULL,
    milestone_count bigint DEFAULT 0 NOT NULL,
    credit_purchase_log_id bigint DEFAULT 0 NOT NULL,
    is_reached_response_end_date_for_freelancer boolean DEFAULT false NOT NULL
);


--
-- Name: COLUMN bids.amount_in_escrow; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN bids.amount_in_escrow IS 'Funded and not released yet';


--
-- Name: COLUMN bids.paid_escrow_amount; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN bids.paid_escrow_amount IS 'escrow payment released';


--
-- Name: certifications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE certifications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: certifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE certifications (
    id bigint DEFAULT nextval('certifications_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    title character varying(510) NOT NULL,
    conferring_organization character varying(510) NOT NULL,
    description text NOT NULL,
    year character varying(510) NOT NULL
);


--
-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE cities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE cities (
    id bigint DEFAULT nextval('cities_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    country_id integer NOT NULL,
    state_id bigint NOT NULL,
    name character varying(90) NOT NULL,
    slug character varying(90) NOT NULL,
    latitude double precision,
    longitude double precision,
    timezone character varying(20),
    dma_id integer,
    county character varying(50),
    code character varying(8),
    is_active boolean DEFAULT false NOT NULL,
    project_count integer DEFAULT 0 NOT NULL,
    quote_service_count integer DEFAULT 0 NOT NULL,
    user_profile_count integer DEFAULT 0 NOT NULL,
    user_freelancer_count bigint DEFAULT 0 NOT NULL,
    language_id bigint
);


--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE contacts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contacts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE contacts (
    id bigint DEFAULT nextval('contacts_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    first_name character varying(200) NOT NULL,
    last_name character varying(200),
    email character varying(510) NOT NULL,
    subject character varying(510),
    message text NOT NULL,
    phone character varying(40),
    ip_id bigint
);


--
-- Name: contest_followers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE contest_followers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contest_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE contest_statuses_id_seq
    START WITH 16
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contest_statuses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE contest_statuses (
    id integer DEFAULT nextval('contest_statuses_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(255),
    slug character varying(255),
    message text,
    contest_count bigint DEFAULT 0 NOT NULL
);


--
-- Name: contest_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE contest_types_id_seq
    START WITH 30
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contest_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE contest_types (
    id integer DEFAULT nextval('contest_types_id_seq'::regclass) NOT NULL,
    resource_id integer,
    name character varying(45),
    description text,
    next integer,
    contest_count bigint,
    form_field_count bigint,
    contest_user_count bigint,
    minimum_prize double precision DEFAULT 0,
    blind_fee integer DEFAULT 0,
    private_fee integer DEFAULT 0,
    featured_fee integer DEFAULT 0,
    highlight_fee double precision,
    site_revenue double precision,
    is_watermarked boolean DEFAULT true,
    is_active boolean DEFAULT true,
    is_template boolean DEFAULT false,
    is_blind boolean DEFAULT false,
    is_featured boolean DEFAULT false,
    is_highlight boolean,
    is_private boolean DEFAULT false,
    maximum_entries_allowed bigint DEFAULT 40,
    maximum_entries_allowed_per_user bigint DEFAULT 0,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    CONSTRAINT contest_types_next_check CHECK ((next >= 0))
);


--
-- Name: contest_types_pricing_days_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE contest_types_pricing_days_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contest_types_pricing_days; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE contest_types_pricing_days (
    id integer DEFAULT nextval('contest_types_pricing_days_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    contest_type_id integer,
    pricing_day_id integer,
    price double precision
);


--
-- Name: contest_types_pricing_packages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE contest_types_pricing_packages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contest_types_pricing_packages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE contest_types_pricing_packages (
    id integer DEFAULT nextval('contest_types_pricing_packages_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    contest_type_id integer,
    pricing_package_id integer,
    price double precision,
    participant_commision double precision,
    maximum_entry_allowed integer
);


--
-- Name: contest_user_downloads_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE contest_user_downloads_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contest_user_downloads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE contest_user_downloads (
    id integer DEFAULT nextval('contest_user_downloads_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    user_id bigint,
    contest_user_id bigint,
    ip_id bigint
);


--
-- Name: contest_user_flag_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE contest_user_flag_categories_id_seq
    START WITH 4
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contest_user_flags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE contest_user_flags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contest_user_ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE contest_user_ratings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contest_user_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE contest_user_statuses_id_seq
    START WITH 6
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contest_user_statuses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE contest_user_statuses (
    id integer DEFAULT nextval('contest_user_statuses_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(255),
    description character varying(255),
    slug character varying(255),
    contest_user_count bigint DEFAULT 0 NOT NULL
);


--
-- Name: contest_users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE contest_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contest_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE contest_users (
    id integer DEFAULT nextval('contest_users_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    user_id bigint,
    contest_owner_user_id bigint,
    contest_id bigint,
    description text,
    copyright_note text,
    entry_no bigint,
    contest_user_status_id bigint DEFAULT 1,
    contest_user_total_ratings integer DEFAULT 0,
    contest_user_rating_count integer DEFAULT 0,
    average_rating double precision DEFAULT 0,
    site_revenue double precision DEFAULT 0,
    zazpay_gateway_id bigint,
    view_count bigint DEFAULT 0 NOT NULL,
    flag_count bigint DEFAULT 0 NOT NULL,
    message_count bigint DEFAULT 0 NOT NULL
);


--
-- Name: contests_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE contests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE contests (
    id integer DEFAULT nextval('contests_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    user_id bigint,
    referred_by_user_id bigint DEFAULT 0,
    contest_type_id integer,
    contest_status_id integer,
    is_send_payment_notification boolean DEFAULT false,
    resource_id integer,
    pricing_package_id integer,
    pricing_day_id integer,
    name character varying(255),
    slug character varying(255),
    description text,
    maximum_entry_allowed integer,
    maximum_entry_allowed_per_user bigint DEFAULT 0,
    reason_for_cancelation text,
    prize double precision DEFAULT 0,
    creation_cost double precision,
    actual_end_date timestamp without time zone,
    end_date timestamp without time zone,
    start_date timestamp without time zone,
    refund_request_date timestamp without time zone,
    canceled_by_admin_date timestamp without time zone,
    winner_selected_date timestamp without time zone,
    judging_date timestamp without time zone,
    pending_action_to_admin_date timestamp without time zone,
    change_requested_date timestamp without time zone,
    change_completed_date timestamp without time zone,
    paid_to_participant_date timestamp without time zone,
    completed_date timestamp without time zone,
    files_expectation_date timestamp without time zone,
    partcipant_count bigint DEFAULT 0,
    contest_user_count bigint DEFAULT 0,
    contest_user_won_count bigint DEFAULT 0,
    contest_user_eliminated_count bigint DEFAULT 0,
    contest_user_withdrawn_count bigint DEFAULT 0,
    contest_user_active_count bigint DEFAULT 0,
    message_count bigint DEFAULT 0,
    total_site_revenue bigint DEFAULT 0,
    winner_user_id bigint,
    payment_gateway_id integer,
    last_contest_user_entry_no bigint DEFAULT 0,
    is_system_flagged boolean DEFAULT false,
    is_user_flagged boolean DEFAULT false,
    is_admin_complete boolean DEFAULT false,
    admin_suspend boolean DEFAULT false,
    is_winner_selected_by_admin boolean DEFAULT false,
    is_pending_action_to_admin boolean DEFAULT false,
    is_blind boolean DEFAULT false,
    is_private boolean DEFAULT false,
    is_featured boolean DEFAULT false,
    is_highlight boolean,
    blind_contest_fee double precision DEFAULT 0,
    private_contest_fee double precision DEFAULT 0,
    featured_contest_fee double precision DEFAULT 0,
    highlight_contest_fee double precision DEFAULT 0,
    detected_suspicious_words text,
    reason_for_calcelation text,
    site_commision double precision DEFAULT 0,
    is_paid boolean DEFAULT false,
    is_uploaded_entry_design boolean DEFAULT false,
    admin_commission_amount double precision DEFAULT 0,
    affiliate_commission_amount double precision DEFAULT 0,
    zazpay_gateway_id bigint,
    zazpay_payment_id bigint,
    zazpay_pay_key character varying(250),
    zazpay_revised_amount double precision,
    upgrade text,
    participant_count bigint DEFAULT 0 NOT NULL,
    view_count bigint DEFAULT 0 NOT NULL,
    follower_count bigint DEFAULT 0 NOT NULL,
    flag_count bigint DEFAULT 0 NOT NULL,
    is_notification_sent boolean DEFAULT false NOT NULL,
    paypal_pay_key character varying(255)
);


--
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE countries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: countries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE countries (
    id integer DEFAULT nextval('countries_id_seq'::regclass) NOT NULL,
    iso_alpha2 character varying(2),
    iso_alpha3 character varying(3),
    iso_numeric integer,
    fips_code character varying(6),
    name character varying(400),
    capital character varying(400),
    areainsqkm double precision,
    population integer,
    continent character varying(2),
    tld character varying(3),
    currency character varying(3),
    currencyname character varying(20),
    phone character varying(10),
    postalcodeformat character varying(20),
    postalcoderegex character varying(20),
    languages character varying(400),
    geonameid integer,
    neighbours character varying(20),
    equivalentfipscode character varying(10),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: coupons_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE coupons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: coupons; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE coupons (
    id bigint DEFAULT nextval('coupons_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    coupon_code character varying NOT NULL,
    max_number_of_time_can_use numeric DEFAULT 0 NOT NULL,
    max_number_of_time_can_use_per_user numeric DEFAULT 0 NOT NULL,
    coupon_used_count bigint DEFAULT 0 NOT NULL,
    discount double precision NOT NULL,
    discount_type_id bigint NOT NULL,
    min_amount double precision NOT NULL,
    coupon_expiry_date date NOT NULL,
    is_active boolean NOT NULL
);


--
-- Name: credit_purchase_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE credit_purchase_logs (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    credit_purchase_plan_id bigint NOT NULL,
    credit_count integer NOT NULL,
    price double precision NOT NULL,
    discount_percentage double precision NOT NULL,
    original_price double precision NOT NULL,
    payment_gateway_id bigint,
    gateway_id bigint,
    is_payment_completed boolean DEFAULT false NOT NULL,
    coupon_id smallint,
    is_active boolean DEFAULT false NOT NULL,
    used_credit_count bigint DEFAULT 0 NOT NULL,
    paypal_pay_key character varying(255),
    expiry_date timestamp without time zone
);


--
-- Name: credit_purchase_plans; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE credit_purchase_plans (
    id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(255) NOT NULL,
    no_of_credits bigint DEFAULT 0 NOT NULL,
    price double precision NOT NULL,
    discount_percentage double precision NOT NULL,
    original_price double precision NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    day_limit bigint,
    is_welcome_plan boolean DEFAULT false NOT NULL
);


--
-- Name: discount_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE discount_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: discount_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE discount_types (
    id bigint DEFAULT nextval('discount_types_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying NOT NULL
);


--
-- Name: dispute_closed_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE dispute_closed_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dispute_closed_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE dispute_closed_types (
    id bigint DEFAULT nextval('dispute_closed_types_id_seq'::regclass) NOT NULL,
    name character varying(510),
    dispute_open_type_id bigint,
    project_role_id bigint,
    reason character varying(510),
    resolve_type character varying(510),
    action_list text NOT NULL
);


--
-- Name: dispute_open_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE dispute_open_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dispute_open_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE dispute_open_types (
    id bigint DEFAULT nextval('dispute_open_types_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(510),
    project_role_id bigint,
    is_active boolean
);


--
-- Name: dispute_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE dispute_statuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dispute_statuses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE dispute_statuses (
    id bigint DEFAULT nextval('dispute_statuses_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(510)
);


--
-- Name: educations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE educations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: educations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE educations (
    id bigint DEFAULT nextval('educations_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    country_id bigint NOT NULL,
    title character varying(510) NOT NULL,
    from_year character varying NOT NULL,
    to_year character varying NOT NULL
);


--
-- Name: email_templates_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE email_templates_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: email_templates; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE email_templates (
    id integer DEFAULT nextval('email_templates_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    "from" character varying(1000) NOT NULL,
    reply_to character varying(1000) NOT NULL,
    name character varying(300) NOT NULL,
    description text NOT NULL,
    subject character varying(510) NOT NULL,
    text_email_content text,
    html_email_content text,
    notification_content text,
    email_variables character varying(2000) NOT NULL,
    is_html boolean NOT NULL,
    is_notify boolean,
    display_name character varying(300)
);


--
-- Name: exam_answers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE exam_answers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: exam_answers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE exam_answers (
    id bigint DEFAULT nextval('exam_answers_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    exam_id bigint,
    question_id bigint,
    exams_user_id bigint,
    user_answer text,
    total_mark double precision DEFAULT 0
);


--
-- Name: exam_attends_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE exam_attends_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: exam_attends; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE exam_attends (
    id bigint DEFAULT nextval('exam_attends_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    exam_id bigint,
    user_id bigint,
    exams_user_id bigint,
    user_login_ip_id character varying(30)
);


--
-- Name: exam_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE exam_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: exam_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE exam_categories (
    id bigint DEFAULT nextval('exam_categories_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(255) NOT NULL,
    exam_count bigint DEFAULT 0 NOT NULL
);


--
-- Name: exam_levels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE exam_levels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: exam_levels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE exam_levels (
    id bigint DEFAULT nextval('exam_levels_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(510) NOT NULL,
    exam_count integer DEFAULT 0 NOT NULL
);


--
-- Name: exam_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE exam_statuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: exam_statuses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE exam_statuses (
    id bigint DEFAULT nextval('exam_statuses_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(510) NOT NULL,
    exams_user_count integer DEFAULT 0 NOT NULL
);


--
-- Name: exam_views_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE exam_views_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: exams_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE exams_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: exams; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE exams (
    id bigint DEFAULT nextval('exams_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    question_display_type_id bigint NOT NULL,
    topics_covered text NOT NULL,
    instructions text NOT NULL,
    splash_content text,
    title character varying(100),
    slug character varying(100) NOT NULL,
    duration integer DEFAULT 0 NOT NULL,
    fee double precision DEFAULT 0 NOT NULL,
    pass_mark_percentage integer NOT NULL,
    exams_question_count integer DEFAULT 0,
    exams_user_count integer DEFAULT 0 NOT NULL,
    exam_level_id bigint,
    is_active boolean,
    is_recommended boolean NOT NULL,
    additional_time_to_expire integer,
    total_fee_received double precision DEFAULT 0 NOT NULL,
    exams_user_passed_count integer DEFAULT 0 NOT NULL,
    view_count bigint DEFAULT 0 NOT NULL,
    parent_exam_id bigint,
    exam_category_id bigint
);


--
-- Name: COLUMN exams.duration; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN exams.duration IS 'in minutes';


--
-- Name: exams_questions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE exams_questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: exams_questions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE exams_questions (
    id bigint DEFAULT nextval('exams_questions_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    exam_id bigint NOT NULL,
    question_id bigint NOT NULL,
    display_order integer DEFAULT 0
);


--
-- Name: exams_users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE exams_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: exams_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE exams_users (
    id bigint DEFAULT nextval('exams_users_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    exam_id bigint,
    user_id bigint,
    fee_paid double precision,
    total_mark double precision DEFAULT 0,
    total_mark_mean double precision DEFAULT 0,
    total_mark_standard_deviation double precision DEFAULT 0,
    exam_status_id integer DEFAULT 1 NOT NULL,
    no_of_times integer,
    exam_started_date timestamp without time zone,
    exam_end_date timestamp without time zone,
    exam_level_id bigint,
    allow_duration integer DEFAULT 0 NOT NULL,
    total_question_count integer DEFAULT 0 NOT NULL,
    pass_mark_percentage double precision DEFAULT 0 NOT NULL,
    payment_gateway_id bigint,
    zazpay_gateway_id bigint,
    zazpay_payment_id bigint,
    zazpay_pay_key character varying(510),
    zazpay_revised_amount double precision,
    taken_time double precision DEFAULT 0 NOT NULL,
    percentile_rank integer,
    paypal_pay_key character varying(255)
);


--
-- Name: faq_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE faq_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: faqs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE faqs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: flag_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE flag_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: flag_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE flag_categories (
    id bigint DEFAULT nextval('flag_categories_id_seq'::regclass) NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL,
    name character varying(255) NOT NULL,
    class character varying(255),
    flag_count bigint DEFAULT 0 NOT NULL,
    is_active boolean NOT NULL
);


--
-- Name: flags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE flags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: flags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE flags (
    id bigint DEFAULT nextval('flags_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    class character varying(255) NOT NULL,
    foreign_id bigint NOT NULL,
    flag_category_id bigint NOT NULL,
    message text NOT NULL,
    ip_id bigint DEFAULT 0 NOT NULL
);


--
-- Name: followers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE followers (
    id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    foreign_id bigint,
    class character varying(255) NOT NULL,
    ip_id bigint DEFAULT 0 NOT NULL
);


--
-- Name: followers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE followers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: followers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE followers_id_seq OWNED BY followers.id;


--
-- Name: form_field_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE form_field_groups_id_seq
    START WITH 31
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: form_field_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE form_field_groups (
    id integer DEFAULT nextval('form_field_groups_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(255),
    slug character varying(255),
    foreign_id bigint,
    info text,
    "order" bigint,
    class character varying(255),
    is_deletable boolean DEFAULT true,
    is_editable boolean DEFAULT true
);


--
-- Name: form_field_submissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE form_field_submissions (
    id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    form_field_id bigint NOT NULL,
    foreign_id integer NOT NULL,
    class character varying NOT NULL,
    response text
);


--
-- Name: form_field_submissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE form_field_submissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: form_field_submissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE form_field_submissions_id_seq OWNED BY form_field_submissions.id;


--
-- Name: form_fields_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE form_fields_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: form_fields; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE form_fields (
    id bigint DEFAULT nextval('form_fields_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(510),
    label character varying(510),
    info character varying(510),
    length bigint,
    options text,
    class character varying,
    input_type_id integer DEFAULT 0 NOT NULL,
    foreign_id integer,
    form_field_group_id bigint,
    is_required boolean NOT NULL,
    is_active boolean NOT NULL,
    display_order integer NOT NULL,
    depends_on character varying(45),
    depends_value character varying(45)
);


--
-- Name: COLUMN form_fields.options; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN form_fields.options IS 'Comma separated';


--
-- Name: COLUMN form_fields.class; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN form_fields.class IS 'quote_category / contest_type';


--
-- Name: hire_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE hire_requests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hire_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE hire_requests (
    id bigint DEFAULT nextval('hire_requests_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    requested_user_id bigint,
    foreign_id bigint,
    class character varying(200) NOT NULL,
    message text NOT NULL
);


--
-- Name: input_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE input_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: input_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE input_types (
    id bigint DEFAULT nextval('input_types_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(200),
    value character varying(200)
);


--
-- Name: ips_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE ips_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ips; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE ips (
    id bigint DEFAULT nextval('ips_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    ip character varying(510),
    host character varying(200) NOT NULL,
    city_id bigint,
    state_id bigint,
    country_id bigint,
    timezone_id bigint,
    latitude double precision,
    longitude double precision
);


--
-- Name: job_applies_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE job_applies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: job_applies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE job_applies (
    id bigint DEFAULT nextval('job_applies_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    job_id bigint,
    user_id bigint,
    job_apply_status_id integer DEFAULT 1 NOT NULL,
    cover_letter text NOT NULL,
    total_resume_rating integer DEFAULT 0 NOT NULL,
    resume_rating_count integer DEFAULT 0 NOT NULL,
    ip_id bigint
);


--
-- Name: job_applies_portfolios_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE job_applies_portfolios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: job_applies_portfolios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE job_applies_portfolios (
    id bigint DEFAULT nextval('job_applies_portfolios_id_seq'::regclass) NOT NULL,
    job_apply_id bigint NOT NULL,
    portfolio_id bigint NOT NULL
);


--
-- Name: job_apply_clicks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE job_apply_clicks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: job_apply_clicks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE job_apply_clicks (
    id bigint DEFAULT nextval('job_apply_clicks_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    job_id bigint NOT NULL,
    ip_id bigint
);


--
-- Name: job_apply_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE job_apply_statuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: job_apply_statuses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE job_apply_statuses (
    id integer DEFAULT nextval('job_apply_statuses_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(510) NOT NULL,
    slug character varying(510) NOT NULL
);


--
-- Name: job_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE job_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: job_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE job_categories (
    id bigint DEFAULT nextval('job_categories_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(510) NOT NULL,
    slug character varying(510) NOT NULL,
    job_count bigint DEFAULT 0 NOT NULL,
    is_active boolean NOT NULL,
    active_job_count bigint DEFAULT 0 NOT NULL
);


--
-- Name: job_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE job_statuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: job_statuses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE job_statuses (
    id integer DEFAULT nextval('job_statuses_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(510) NOT NULL,
    slug character varying(510) NOT NULL,
    job_count bigint DEFAULT 0 NOT NULL
);


--
-- Name: job_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE job_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: job_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE job_types (
    id integer DEFAULT nextval('job_types_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(510) NOT NULL,
    slug character varying(510) NOT NULL,
    is_active boolean NOT NULL
);


--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: jobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE jobs (
    id bigint DEFAULT nextval('jobs_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    job_status_id bigint,
    job_type_id integer,
    job_category_id bigint,
    title character varying(510) NOT NULL,
    slug character varying(510) NOT NULL,
    description text NOT NULL,
    address character varying(510) NOT NULL,
    address1 character varying(510),
    city_id bigint,
    state_id bigint,
    country_id bigint,
    zip_code character varying(100),
    latitude double precision,
    longitude double precision,
    salary_from double precision,
    salary_to double precision,
    salary_type_id integer,
    is_show_salary boolean NOT NULL,
    last_date_to_apply date,
    no_of_opening integer,
    company_name character varying(255) NOT NULL,
    ip_id bigint,
    apply_via character varying(100) NOT NULL,
    job_url character varying(510),
    featured_fee numeric(5,2) DEFAULT 0.00 NOT NULL,
    urgent_fee numeric(5,2) DEFAULT 0.00 NOT NULL,
    zazpay_revised_amount double precision,
    payment_gateway_id bigint,
    zazpay_gateway_id bigint,
    zazpay_payment_id bigint,
    zazpay_pay_key character varying(510) DEFAULT ''::character varying,
    job_apply_click_count bigint DEFAULT 0 NOT NULL,
    job_apply_count bigint DEFAULT 0 NOT NULL,
    is_featured boolean DEFAULT false NOT NULL,
    is_urgent boolean DEFAULT false NOT NULL,
    is_paid boolean,
    company_website character varying(510),
    view_count bigint DEFAULT 0 NOT NULL,
    flag_count bigint DEFAULT 0 NOT NULL,
    full_address text,
    total_listing_fee double precision DEFAULT 0 NOT NULL,
    is_notification_sent boolean DEFAULT false NOT NULL,
    paypal_pay_key character varying(255),
    job_open_date timestamp without time zone,
    minimum_experience smallint,
    maximum_experience smallint
);


--
-- Name: jobs_skills_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE jobs_skills_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: jobs_skills; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE jobs_skills (
    id bigint DEFAULT nextval('jobs_skills_id_seq'::regclass) NOT NULL,
    job_id bigint NOT NULL,
    skill_id bigint NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: languages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE languages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: languages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE languages (
    id bigint DEFAULT nextval('languages_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(160) NOT NULL,
    iso2 character(2) NOT NULL,
    iso3 character(3) NOT NULL,
    is_active boolean NOT NULL
);


--
-- Name: message_contents_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE message_contents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: message_contents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE message_contents (
    id bigint DEFAULT nextval('message_contents_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    subject text NOT NULL,
    message text NOT NULL
);


--
-- Name: message_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE message_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE messages (
    id bigint DEFAULT nextval('messages_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    user_id bigint,
    other_user_id bigint,
    parent_id bigint,
    message_content_id bigint NOT NULL,
    foreign_id bigint NOT NULL,
    class character varying(255) NOT NULL,
    root character varying(255),
    freshness_ts character varying(255),
    depth bigint NOT NULL,
    materialized_path character varying(255),
    path character varying(255),
    size bigint,
    is_sender boolean NOT NULL,
    is_read boolean,
    is_deleted boolean,
    is_private boolean,
    is_child_replied boolean,
    model_id bigint DEFAULT 0 NOT NULL
);


--
-- Name: milestone_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE milestone_statuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: milestone_statuses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE milestone_statuses (
    id bigint DEFAULT nextval('milestone_statuses_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(510) NOT NULL,
    slug character varying(510) NOT NULL,
    is_active character varying(2) NOT NULL,
    milestone_count bigint NOT NULL,
    "order" bigint NOT NULL
);


--
-- Name: milestones_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE milestones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: milestones; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE milestones (
    id bigint DEFAULT nextval('milestones_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    project_id bigint,
    user_id bigint,
    amount double precision,
    description text,
    milestone_status_id bigint,
    bid_id bigint,
    completed_date date,
    escrow_amount_requested_date date,
    escrow_amount_released_date date,
    escrow_amount_paid_date date,
    site_commission_from_employer double precision DEFAULT 0 NOT NULL,
    site_commission_from_freelancer double precision DEFAULT 0 NOT NULL,
    payment_gateway_id bigint,
    paypal_pay_key character varying(255),
    deadline_date date,
    zazpay_gateway_id bigint
);


--
-- Name: money_transfer_accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE money_transfer_accounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: money_transfer_accounts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE money_transfer_accounts (
    id bigint DEFAULT nextval('money_transfer_accounts_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    account text NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    is_primary boolean DEFAULT false NOT NULL
);


--
-- Name: oauth_access_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE oauth_access_tokens (
    access_token character varying(40) NOT NULL,
    client_id character varying(80),
    user_id character varying(255),
    expires timestamp without time zone,
    scope text
);


--
-- Name: oauth_authorization_codes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE oauth_authorization_codes (
    authorization_code character varying(40) NOT NULL,
    client_id character varying(80),
    user_id character varying(255),
    redirect_uri character varying(2000),
    expires timestamp without time zone,
    scope character varying(2000)
);


--
-- Name: oauth_clients_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE oauth_clients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: oauth_clients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE oauth_clients (
    id integer DEFAULT nextval('oauth_clients_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id character varying(80) NOT NULL,
    client_name character varying(255) NOT NULL,
    client_id character varying(80) NOT NULL,
    client_secret character varying(80) NOT NULL,
    redirect_uri character varying(2000),
    grant_types character varying(80) NOT NULL,
    scope character varying(100),
    client_url character varying(255),
    logo_url character varying(255),
    tos_url character varying(255),
    policy_url character varying(2000)
);


--
-- Name: oauth_jwt; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE oauth_jwt (
    client_id character varying(80) NOT NULL,
    subject character varying(80),
    public_key character varying(2000)
);


--
-- Name: oauth_refresh_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE oauth_refresh_tokens (
    refresh_token character varying(40) NOT NULL,
    client_id character varying(80),
    user_id character varying(255),
    expires timestamp without time zone,
    scope text
);


--
-- Name: oauth_scopes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE oauth_scopes (
    scope text NOT NULL,
    is_default boolean
);


--
-- Name: pages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE pages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE pages (
    id bigint DEFAULT nextval('pages_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    parent_id bigint,
    title character varying(510) NOT NULL,
    title_es character varying(510),
    content text,
    content_es text,
    template character varying(510),
    draft boolean,
    lft bigint,
    rght bigint,
    level integer DEFAULT 0 NOT NULL,
    meta_keywords character varying(510),
    description_meta_tag text,
    url text,
    slug character varying(510) NOT NULL,
    is_default boolean NOT NULL
);


--
-- Name: payment_gateway_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE payment_gateway_settings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payment_gateway_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE payment_gateway_settings (
    id bigint DEFAULT nextval('payment_gateway_settings_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    payment_gateway_id bigint NOT NULL,
    name character varying(512) NOT NULL,
    type character varying(512) NOT NULL,
    options text NOT NULL,
    test_mode_value text,
    live_mode_value text,
    label character varying(1024) NOT NULL,
    description text NOT NULL
);


--
-- Name: payment_gateways_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE payment_gateways_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payment_gateways; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE payment_gateways (
    id integer DEFAULT nextval('payment_gateways_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(510) NOT NULL,
    slug character varying(510),
    description text NOT NULL,
    is_test_mode boolean NOT NULL,
    is_active boolean NOT NULL,
    display_name character varying(510) NOT NULL
);


--
-- Name: portfolio_reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE portfolio_reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: portfolio_tags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE portfolio_tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: portfolio_thumbs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE portfolio_thumbs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: portfolio_views_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE portfolio_views_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: portfolios_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE portfolios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: portfolios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE portfolios (
    id bigint DEFAULT nextval('portfolios_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    user_id bigint,
    description text NOT NULL,
    message_count smallint DEFAULT 0,
    follower_count smallint DEFAULT 0,
    view_count bigint DEFAULT 0 NOT NULL,
    flag_count bigint DEFAULT 0 NOT NULL,
    title character varying(255) NOT NULL,
    is_admin_suspend boolean DEFAULT false NOT NULL
);


--
-- Name: portfolios_tags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE portfolios_tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pricing_days_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE pricing_days_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pricing_days; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE pricing_days (
    id integer DEFAULT nextval('pricing_days_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    no_of_days integer,
    global_price double precision DEFAULT 0,
    is_active boolean DEFAULT false
);


--
-- Name: pricing_packages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE pricing_packages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pricing_packages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE pricing_packages (
    id integer DEFAULT nextval('pricing_packages_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(100),
    description text,
    global_price double precision DEFAULT 0,
    participant_commision double precision DEFAULT 0,
    maximum_entry_allowed integer,
    features text,
    is_active boolean DEFAULT true
);


--
-- Name: project_bid_invoice_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE project_bid_invoice_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_bid_invoice_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE project_bid_invoice_items (
    id bigint DEFAULT nextval('project_bid_invoice_items_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    project_bid_invoice_id bigint NOT NULL,
    description text NOT NULL,
    amount double precision NOT NULL
);


--
-- Name: project_bid_invoices_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE project_bid_invoices_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_bid_invoices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE project_bid_invoices (
    id bigint DEFAULT nextval('project_bid_invoices_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    project_id bigint,
    bid_id bigint,
    amount double precision NOT NULL,
    site_fee double precision DEFAULT 0 NOT NULL,
    paid_on timestamp without time zone,
    pay_key character varying(255),
    zazpay_pay_key character varying(255),
    zazpay_payment_id bigint,
    zazpay_gateway_id bigint,
    zazpay_revised_amount double precision,
    site_commission_from_employer double precision,
    site_commission_from_freelancer double precision,
    user_id bigint,
    is_paid boolean DEFAULT false NOT NULL,
    payment_gateway_id bigint,
    paypal_pay_key character varying(255)
);


--
-- Name: project_bids_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE project_bids_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_bids; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE project_bids (
    id bigint DEFAULT nextval('project_bids_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    project_id bigint,
    amount double precision NOT NULL,
    duration bigint,
    total_bid_amount double precision,
    closed_date timestamp without time zone,
    is_closed boolean DEFAULT false NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    bidding_start_date timestamp without time zone,
    bidding_end_date timestamp without time zone,
    site_commission_from_employer double precision DEFAULT 0 NOT NULL,
    site_commission_from_freelancer double precision DEFAULT 0 NOT NULL,
    total_paid_amount double precision DEFAULT 0 NOT NULL,
    lowest_bid_amount double precision DEFAULT 0 NOT NULL,
    bid_count bigint DEFAULT 0 NOT NULL
);


--
-- Name: project_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE project_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE project_categories (
    id bigint DEFAULT nextval('project_categories_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(510) NOT NULL,
    project_count bigint,
    is_active boolean NOT NULL,
    active_project_count bigint DEFAULT 0 NOT NULL,
    icon_class character varying(255)
);


--
-- Name: project_disputes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE project_disputes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_disputes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE project_disputes (
    id bigint DEFAULT nextval('project_disputes_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    user_id bigint,
    project_id bigint,
    dispute_open_type_id bigint,
    reason text,
    dispute_status_id bigint,
    resolved_date timestamp without time zone,
    favour_role_id bigint,
    last_replied_user_id bigint,
    last_replied_date timestamp without time zone,
    dispute_closed_type_id bigint,
    message_count bigint,
    expected_rating double precision,
    bid_id bigint NOT NULL
);


--
-- Name: project_ranges_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE project_ranges_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_ranges; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE project_ranges (
    id bigint DEFAULT nextval('project_ranges_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(40) NOT NULL,
    min_amount double precision NOT NULL,
    max_amount double precision NOT NULL,
    is_active boolean NOT NULL,
    project_count bigint DEFAULT 0 NOT NULL,
    active_project_count bigint DEFAULT 0 NOT NULL,
    user_id bigint DEFAULT 0 NOT NULL
);


--
-- Name: project_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE project_statuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_statuses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE project_statuses (
    id bigint DEFAULT nextval('project_statuses_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(510) NOT NULL,
    project_count bigint NOT NULL,
    is_active boolean NOT NULL
);


--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE projects (
    id bigint DEFAULT nextval('projects_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    project_status_id bigint NOT NULL,
    project_range_id bigint NOT NULL,
    name character varying(510) NOT NULL,
    slug character varying(510) NOT NULL,
    description text,
    total_listing_fee double precision NOT NULL,
    cancelled_date timestamp without time zone,
    ip_id bigint,
    freelancer_user_id bigint,
    bid_duration bigint DEFAULT 0 NOT NULL,
    is_featured boolean DEFAULT false NOT NULL,
    is_private boolean DEFAULT false NOT NULL,
    is_hidded_bid boolean DEFAULT false NOT NULL,
    is_pre_paid boolean DEFAULT false NOT NULL,
    is_urgent boolean DEFAULT false NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    is_dispute boolean DEFAULT false NOT NULL,
    is_cancel_request_freelancer boolean DEFAULT false NOT NULL,
    is_cancel_request_employer boolean DEFAULT false NOT NULL,
    funded_date timestamp without time zone,
    last_reopened_date timestamp without time zone,
    payment_completed_date timestamp without time zone,
    listing_fee double precision DEFAULT 0 NOT NULL,
    is_paid boolean DEFAULT false NOT NULL,
    is_reopened boolean DEFAULT false NOT NULL,
    zazpay_gateway_id bigint,
    zazpay_payment_id bigint,
    zazpay_pay_key character varying(255),
    zazpay_revised_amount double precision,
    is_notification_sent boolean DEFAULT false NOT NULL,
    project_type_id bigint DEFAULT 1 NOT NULL,
    site_commission_from_employer double precision DEFAULT 0 NOT NULL,
    site_commission_from_freelancer double precision DEFAULT 0 NOT NULL,
    total_paid_amount double precision DEFAULT 0 NOT NULL,
    additional_descriptions text,
    mutual_cancel_note text,
    project_rating_count bigint DEFAULT 0 NOT NULL,
    flag_count bigint DEFAULT 0 NOT NULL,
    message_count bigint DEFAULT 0 NOT NULL,
    follower_count bigint DEFAULT 0 NOT NULL,
    total_ratings bigint DEFAULT 0 NOT NULL,
    milestone_count bigint DEFAULT 0 NOT NULL,
    view_count bigint DEFAULT 0 NOT NULL,
    project_bid_invoice_count bigint DEFAULT 0 NOT NULL,
    payment_gateway_id bigint,
    paypal_pay_key character varying(255)
);


--
-- Name: COLUMN projects.project_type_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN projects.project_type_id IS '1. FIXED PRICE 2. HOURLY RATE';


--
-- Name: projects_project_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE projects_project_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: projects_project_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE projects_project_categories (
    id bigint DEFAULT nextval('projects_project_categories_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    project_category_id bigint NOT NULL,
    project_id bigint NOT NULL
);


--
-- Name: projects_users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE projects_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: provider_users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE provider_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: provider_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE provider_users (
    id bigint DEFAULT nextval('provider_users_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    provider_id bigint NOT NULL,
    foreign_id character varying(255),
    access_token character varying(255) NOT NULL,
    access_token_secret character varying(255),
    is_connected boolean DEFAULT true NOT NULL,
    profile_picture_url character varying(255)
);


--
-- Name: providers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE providers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: providers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE providers (
    id bigint DEFAULT nextval('providers_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(255),
    slug character varying(265) NOT NULL,
    secret_key character varying(255),
    api_key character varying(255),
    icon_class character varying(255),
    button_class character varying(255),
    is_active boolean DEFAULT true NOT NULL,
    "position" bigint
);


--
-- Name: publications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE publications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: publications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE publications (
    id bigint DEFAULT nextval('publications_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    title character varying(510) NOT NULL,
    publisher character varying(510) NOT NULL,
    description text NOT NULL
);


--
-- Name: question_answer_options_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE question_answer_options_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: question_answer_options; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE question_answer_options (
    id bigint DEFAULT nextval('question_answer_options_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    question_id bigint NOT NULL,
    option text NOT NULL,
    is_correct_answer boolean
);


--
-- Name: question_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE question_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: question_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE question_categories (
    id bigint DEFAULT nextval('question_categories_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(500),
    question_count integer DEFAULT 0 NOT NULL
);


--
-- Name: question_display_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE question_display_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: question_display_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE question_display_types (
    id integer DEFAULT nextval('question_display_types_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(510)
);


--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE questions (
    id bigint DEFAULT nextval('questions_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    question_category_id bigint NOT NULL,
    question text NOT NULL,
    info_tip character varying(510),
    is_active boolean,
    exams_question_count bigint DEFAULT 0
);


--
-- Name: quote_activities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE quote_activities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quote_activity_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE quote_activity_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quote_bid_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE quote_bid_statuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quote_bids_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE quote_bids_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quote_bids; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE quote_bids (
    id bigint DEFAULT nextval('quote_bids_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    quote_request_id bigint NOT NULL,
    quote_service_id bigint,
    quote_status_id bigint DEFAULT 1 NOT NULL,
    is_direct_send boolean DEFAULT false NOT NULL,
    quote_amount double precision,
    quote_type character varying(100),
    price_note text,
    quote_last_update_on timestamp without time zone,
    hired_on timestamp without time zone,
    completed_on timestamp without time zone,
    requestor_received_message_count bigint DEFAULT 0 NOT NULL,
    provider_received_message_count bigint DEFAULT 0 NOT NULL,
    requestor_unread_message_count bigint DEFAULT 0 NOT NULL,
    provider_unread_message_count bigint DEFAULT 0 NOT NULL,
    is_provider_readed boolean DEFAULT false NOT NULL,
    is_requestor_readed boolean DEFAULT false NOT NULL,
    used_credit_count integer DEFAULT 0 NOT NULL,
    user_id bigint,
    service_provider_user_id bigint,
    escrow_amount double precision DEFAULT 0 NOT NULL,
    site_commission double precision DEFAULT 0 NOT NULL,
    is_paid_to_escrow boolean DEFAULT false NOT NULL,
    is_escrow_amount_released boolean DEFAULT false NOT NULL,
    coupon_id bigint DEFAULT 0 NOT NULL,
    last_new_quote_remainder_notify_date_to_freelancer timestamp without time zone,
    credit_purchase_log_id bigint,
    private_note_of_incomplete text,
    is_first_level_quote_request boolean DEFAULT true NOT NULL,
    is_show_bid_to_requestor boolean DEFAULT true NOT NULL,
    closed_on timestamp without time zone
);


--
-- Name: COLUMN quote_bids.quote_type; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN quote_bids.quote_type IS '1. Flat Rate 2. Hourly Rate 3. More Information Required';


--
-- Name: COLUMN quote_bids.user_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN quote_bids.user_id IS 'Request owner user Id';


--
-- Name: COLUMN quote_bids.service_provider_user_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN quote_bids.service_provider_user_id IS 'Service owner user Id';


--
-- Name: quote_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE quote_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quote_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE quote_categories (
    id bigint DEFAULT nextval('quote_categories_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    parent_category_id bigint,
    name character varying(510) NOT NULL,
    slug character varying(510) NOT NULL,
    form_field_count bigint DEFAULT 0 NOT NULL,
    quote_request_count bigint DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    credit_point_for_sending_quote bigint DEFAULT 0 NOT NULL,
    description text,
    is_featured boolean DEFAULT true NOT NULL
);


--
-- Name: quote_categories_quote_services_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE quote_categories_quote_services_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quote_categories_quote_services; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE quote_categories_quote_services (
    id bigint DEFAULT nextval('quote_categories_quote_services_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    quote_category_id bigint NOT NULL,
    quote_service_id bigint NOT NULL
);


--
-- Name: quote_credit_purchase_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE quote_credit_purchase_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quote_credit_purchase_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE quote_credit_purchase_logs_id_seq OWNED BY credit_purchase_logs.id;


--
-- Name: quote_credit_purchase_plans_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE quote_credit_purchase_plans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quote_credit_purchase_plans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE quote_credit_purchase_plans_id_seq OWNED BY credit_purchase_plans.id;


--
-- Name: quote_faq_answers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE quote_faq_answers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quote_faq_answers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE quote_faq_answers (
    id bigint DEFAULT nextval('quote_faq_answers_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    quote_service_id bigint NOT NULL,
    quote_faq_question_template_id bigint,
    quote_user_faq_question_id bigint,
    answer text NOT NULL
);


--
-- Name: quote_faq_question_templates_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE quote_faq_question_templates_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quote_faq_question_templates; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE quote_faq_question_templates (
    id bigint DEFAULT nextval('quote_faq_question_templates_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    question text NOT NULL,
    is_active boolean
);


--
-- Name: quote_form_submission_fields_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE quote_form_submission_fields_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quote_request_form_fields; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE quote_request_form_fields (
    id bigint DEFAULT nextval('quote_form_submission_fields_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    quote_form_field_id bigint NOT NULL,
    quote_request_id bigint NOT NULL,
    response text
);


--
-- Name: quote_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE quote_requests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quote_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE quote_requests (
    id bigint DEFAULT nextval('quote_requests_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    quote_category_id bigint,
    user_id bigint,
    quote_service_id bigint,
    title character varying(510) NOT NULL,
    description text NOT NULL,
    best_day_time_for_work character varying(510) NOT NULL,
    full_address character varying(510),
    address character varying(510),
    city_id bigint,
    state_id bigint,
    country_id bigint,
    zip_code character varying(510),
    latitude double precision,
    longitude double precision,
    phone_no character varying(100),
    quote_bid_count integer DEFAULT 0 NOT NULL,
    is_archived boolean DEFAULT false NOT NULL,
    is_send_request_to_other_service_providers boolean DEFAULT false NOT NULL,
    quote_bid_new_count bigint DEFAULT 0 NOT NULL,
    quote_bid_discussion_count bigint DEFAULT 0 NOT NULL,
    quote_bid_hired_count bigint DEFAULT 0 NOT NULL,
    quote_bid_completed_count bigint DEFAULT 0 NOT NULL,
    is_request_for_buy boolean DEFAULT false NOT NULL,
    last_new_quote_remainder_notify_date timestamp without time zone,
    is_quote_bid_sent boolean DEFAULT false NOT NULL,
    radius character varying(50),
    is_first_level_quote_request_sent boolean DEFAULT false NOT NULL,
    is_updated_bid_visibility_to_requestor boolean DEFAULT true NOT NULL,
    quote_bid_pending_discussion_count bigint DEFAULT 0 NOT NULL,
    quote_bid_closed_count bigint DEFAULT 0 NOT NULL,
    quote_bid_not_completed_count bigint DEFAULT (0)::bigint NOT NULL
);


--
-- Name: quote_service_audios_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE quote_service_audios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quote_service_audios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE quote_service_audios (
    id bigint DEFAULT nextval('quote_service_audios_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    quote_service_id bigint NOT NULL,
    embed_code text NOT NULL
);


--
-- Name: quote_service_photos_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE quote_service_photos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quote_service_photos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE quote_service_photos (
    id bigint DEFAULT nextval('quote_service_photos_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    quote_service_id bigint NOT NULL,
    caption character varying(255)
);


--
-- Name: quote_service_videos_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE quote_service_videos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quote_service_videos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE quote_service_videos (
    id bigint DEFAULT nextval('quote_service_videos_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    quote_service_id bigint NOT NULL,
    embed_code text NOT NULL,
    video_url text
);


--
-- Name: quote_services_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE quote_services_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quote_services; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE quote_services (
    id bigint DEFAULT nextval('quote_services_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    business_name character varying(510) NOT NULL,
    slug character varying(510) NOT NULL,
    how_does_your_service_stand_out text NOT NULL,
    full_address character varying(510) NOT NULL,
    address character varying(200) NOT NULL,
    city_id bigint NOT NULL,
    state_id bigint NOT NULL,
    country_id bigint NOT NULL,
    zip_code character varying(510),
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    website_url character varying(200),
    phone_number character varying(40) NOT NULL,
    is_service_provider_travel_to_customer_place boolean NOT NULL,
    service_provider_travels_upto integer,
    is_customer_travel_to_me boolean NOT NULL,
    is_over_phone_or_internet boolean NOT NULL,
    is_active boolean NOT NULL,
    quote_service_photo_count bigint DEFAULT 0 NOT NULL,
    quote_service_audio_count bigint DEFAULT 0 NOT NULL,
    quote_service_video_count bigint DEFAULT 0 NOT NULL,
    quote_faq_answer_count integer DEFAULT 0,
    quote_bid_count bigint DEFAULT 0 NOT NULL,
    quote_service_flag_count bigint DEFAULT 0 NOT NULL,
    under_discussion_count bigint DEFAULT 0 NOT NULL,
    hired_count bigint DEFAULT 0 NOT NULL,
    completed_count bigint DEFAULT 0 NOT NULL,
    year_founded bigint,
    number_of_employees bigint,
    what_do_you_enjoy_about_the_work_you_do text NOT NULL,
    view_count bigint DEFAULT 0 NOT NULL,
    flag_count bigint DEFAULT 0 NOT NULL,
    total_rating integer DEFAULT 0 NOT NULL,
    review_count bigint DEFAULT 0 NOT NULL,
    quote_bid_new_count bigint DEFAULT 0 NOT NULL,
    quote_bid_discussion_count bigint DEFAULT 0 NOT NULL,
    quote_bid_hired_count bigint DEFAULT 0 NOT NULL,
    quote_bid_completed_count bigint DEFAULT 0 NOT NULL,
    is_admin_suspend boolean DEFAULT false NOT NULL,
    quote_bid_not_completed_count bigint DEFAULT 0 NOT NULL,
    quote_bid_closed_count bigint DEFAULT 0 NOT NULL
);


--
-- Name: quote_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE quote_statuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quote_statuses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE quote_statuses (
    id bigint DEFAULT nextval('quote_statuses_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(510) NOT NULL
);


--
-- Name: quote_user_faq_questions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE quote_user_faq_questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quote_user_faq_questions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE quote_user_faq_questions (
    id bigint DEFAULT nextval('quote_user_faq_questions_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    user_id bigint,
    question text
);


--
-- Name: resources_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE resources_id_seq
    START WITH 3
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: resources; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE resources (
    id integer DEFAULT nextval('resources_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(255),
    description text,
    folder_name character varying(255),
    contest_count bigint,
    contest_user_count bigint,
    revenue double precision,
    class_name character varying
);


--
-- Name: resume_downloads_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE resume_downloads_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: resume_downloads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE resume_downloads (
    id bigint DEFAULT nextval('resume_downloads_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    job_apply_id bigint,
    ip_id bigint
);


--
-- Name: resume_ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE resume_ratings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: resume_ratings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE resume_ratings (
    id bigint DEFAULT nextval('resume_ratings_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    job_id bigint NOT NULL,
    job_apply_id bigint NOT NULL,
    rating integer DEFAULT 0 NOT NULL,
    comment text NOT NULL
);


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE reviews (
    id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    to_user_id bigint,
    foreign_id bigint NOT NULL,
    class character varying(255) NOT NULL,
    rating integer DEFAULT 0 NOT NULL,
    message text,
    ip_id bigint DEFAULT 0 NOT NULL,
    is_freelancer boolean DEFAULT true,
    model_id bigint,
    model_class character varying(255)
);


--
-- Name: COLUMN reviews.user_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN reviews.user_id IS 'Reviewed By';


--
-- Name: COLUMN reviews.class; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN reviews.class IS 'ContestUser, QuoteService, QuoteBid, Contest, Project, Bid';


--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE reviews_id_seq OWNED BY reviews.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE roles (
    id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(50) NOT NULL,
    is_active boolean DEFAULT true NOT NULL
);


--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE roles_id_seq OWNED BY roles.id;


--
-- Name: salary_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE salary_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: salary_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE salary_types (
    id integer DEFAULT nextval('salary_types_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(510) NOT NULL,
    is_active boolean NOT NULL
);


--
-- Name: setting_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE setting_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: setting_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE setting_categories (
    id bigint DEFAULT nextval('setting_categories_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(200) NOT NULL,
    description text NOT NULL
);


--
-- Name: settings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE settings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE settings (
    id bigint DEFAULT nextval('settings_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    setting_category_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    value text,
    description text,
    type character varying(8) NOT NULL,
    label character varying(255) NOT NULL,
    "position" integer NOT NULL,
    option_values text,
    is_send_to_frontend boolean DEFAULT true NOT NULL
);


--
-- Name: skills_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE skills_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: skills; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE skills (
    id integer DEFAULT nextval('skills_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(510) NOT NULL,
    slug character varying(510) NOT NULL,
    project_count bigint DEFAULT 0 NOT NULL,
    user_count bigint DEFAULT 0 NOT NULL,
    open_project_count bigint DEFAULT 0 NOT NULL,
    is_active boolean NOT NULL,
    active_job_count bigint DEFAULT 0 NOT NULL,
    job_count bigint DEFAULT 0 NOT NULL
);


--
-- Name: skills_portfolios_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE skills_portfolios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: skills_portfolios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE skills_portfolios (
    id integer DEFAULT nextval('skills_portfolios_id_seq'::regclass) NOT NULL,
    portfolio_id bigint NOT NULL,
    skill_id bigint NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: skills_projects_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE skills_projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: skills_projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE skills_projects (
    id integer DEFAULT nextval('skills_projects_id_seq'::regclass) NOT NULL,
    project_id bigint NOT NULL,
    skill_id bigint NOT NULL
);


--
-- Name: skills_users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE skills_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: skills_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE skills_users (
    id integer DEFAULT nextval('skills_users_id_seq'::regclass) NOT NULL,
    user_id bigint,
    skill_id bigint,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: states_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE states_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: states; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE states (
    id bigint DEFAULT nextval('states_id_seq'::regclass) NOT NULL,
    country_id bigint NOT NULL,
    name character varying(90) NOT NULL,
    code character varying(16),
    adm1code character(4),
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: timezones_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE timezones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: timezones; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE timezones (
    id bigint DEFAULT nextval('timezones_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    code character varying(510) NOT NULL,
    name character varying(510) NOT NULL,
    gmt_offset character varying(20) NOT NULL,
    dst_offset character varying(20) NOT NULL,
    raw_offset character varying(20) NOT NULL,
    hasdst boolean NOT NULL
);


--
-- Name: transaction_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE transaction_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE transactions (
    id bigint DEFAULT nextval('transactions_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    to_user_id bigint,
    foreign_id bigint NOT NULL,
    class character varying(255) NOT NULL,
    transaction_type character varying(255) NOT NULL,
    payment_gateway_id bigint,
    amount double precision NOT NULL,
    site_revenue_from_freelancer double precision DEFAULT 0,
    coupon_id smallint,
    site_revenue_from_employer double precision DEFAULT 0 NOT NULL,
    model_id bigint,
    model_class character varying(255),
    zazpay_gateway_id bigint
);


--
-- Name: COLUMN transactions.class; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN transactions.class IS 'Contest,Job,QuoteService,Wallet,QuoteBid,CreditPurchaseLog,Project,Milestone,ProjectBidInvoice,ExamsUser,UserCashWithdrawal';


--
-- Name: COLUMN transactions.transaction_type; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN transactions.transaction_type IS '1. Amount added to wallet when post the wallet 2. Amount added to user wallet 3. Amount deduct to user wallet 4. When post the projects 5. The milestone is status changed to EscrowFunded 7. When post the contests 8. Contest status changed to cancelled 9. Contest status changed to rejected 10. When update the features functions 12. When contest completed the amount move to Participant 13. When post the jobs 14. When post the services 15. While credit_purchase_logs then added this type 16. While commision added the employer 17. While commision added the freelancer 18. While project withdraw then changed';


--
-- Name: upload_hosters_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE upload_hosters_id_seq
    START WITH 5
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: upload_hosters; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE upload_hosters (
    id integer DEFAULT nextval('upload_hosters_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    upload_service_id integer,
    upload_service_type_id integer,
    total_upload_count bigint,
    total_upload_error_count bigint,
    total_upload_filesize bigint,
    is_active boolean
);


--
-- Name: upload_service_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE upload_service_settings_id_seq
    START WITH 12
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: upload_service_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE upload_service_settings (
    id integer DEFAULT nextval('upload_service_settings_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    upload_service_id integer,
    name character varying(255),
    value character varying(255)
);


--
-- Name: upload_service_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE upload_service_types_id_seq
    START WITH 3
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: upload_service_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE upload_service_types (
    id integer DEFAULT nextval('upload_service_types_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(20),
    slug character varying(20)
);


--
-- Name: upload_services_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE upload_services_id_seq
    START WITH 3
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: upload_services; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE upload_services (
    id integer DEFAULT nextval('upload_services_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(20),
    slug character varying(20),
    total_quota bigint DEFAULT 0,
    total_upload_count bigint,
    total_upload_filesize bigint,
    total_upload_error_count bigint
);


--
-- Name: upload_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE upload_statuses_id_seq
    START WITH 4
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: upload_statuses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE upload_statuses (
    id integer DEFAULT nextval('upload_statuses_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(255)
);


--
-- Name: uploads_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE uploads_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: uploads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE uploads (
    id integer DEFAULT nextval('uploads_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    upload_service_type_id integer,
    upload_service_id integer,
    user_id bigint,
    contest_user_id bigint,
    upload_status_id integer,
    video_url character varying(255),
    vimeo_video_id character varying(255),
    youtube_video_id character varying(255),
    vimeo_thumbnail_url character varying(255),
    youtube_thumbnail_url character varying(255),
    video_title character varying(255),
    filesize bigint,
    failure_message character varying(255),
    soundcloud_audio_id character varying(255),
    audio_url character varying(255)
);


--
-- Name: user_add_wallet_amounts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE user_add_wallet_amounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_cash_withdrawals_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE user_cash_withdrawals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_cash_withdrawals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE user_cash_withdrawals (
    id bigint DEFAULT nextval('user_cash_withdrawals_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    withdrawal_status_id bigint DEFAULT 1 NOT NULL,
    amount double precision NOT NULL,
    remark text,
    money_transfer_account_id bigint NOT NULL,
    withdrawal_fee double precision DEFAULT 0 NOT NULL
);


--
-- Name: COLUMN user_cash_withdrawals.withdrawal_status_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN user_cash_withdrawals.withdrawal_status_id IS '1. Pending 2. Under Process 3. Rejected 4. Success';


--
-- Name: user_logins_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE user_logins_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_logins; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE user_logins (
    id bigint DEFAULT nextval('user_logins_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    ip_id bigint,
    user_agent character varying(1000) NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE users (
    id bigint DEFAULT nextval('users_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    role_id integer DEFAULT 2 NOT NULL,
    username character varying(510) NOT NULL,
    email character varying(510) NOT NULL,
    password character varying(200) NOT NULL,
    bid_count bigint DEFAULT 0 NOT NULL,
    won_bid_count bigint DEFAULT 0 NOT NULL,
    user_login_count bigint DEFAULT 0 NOT NULL,
    project_count bigint DEFAULT 0 NOT NULL,
    project_flag_count bigint DEFAULT 0 NOT NULL,
    job_flag_count bigint DEFAULT 0 NOT NULL,
    quote_service_flag_count bigint DEFAULT 0 NOT NULL,
    portfolio_flag_count bigint DEFAULT 0 NOT NULL,
    available_wallet_amount double precision DEFAULT 0,
    ip_id bigint,
    last_login_ip_id bigint,
    last_logged_in_time timestamp without time zone,
    is_agree_terms_conditions boolean DEFAULT false NOT NULL,
    is_active boolean DEFAULT false NOT NULL,
    is_email_confirmed boolean DEFAULT false NOT NULL,
    total_amount_withdrawn double precision DEFAULT 0 NOT NULL,
    job_count bigint DEFAULT 0 NOT NULL,
    job_apply_count bigint DEFAULT 0 NOT NULL,
    portfolio_count bigint DEFAULT 0 NOT NULL,
    portfolio_favorite_count bigint DEFAULT 0 NOT NULL,
    quote_service_count bigint DEFAULT 0 NOT NULL,
    quote_request_count bigint DEFAULT 0 NOT NULL,
    quote_bid_count bigint DEFAULT 0 NOT NULL,
    exams_user_count integer DEFAULT 0 NOT NULL,
    exams_user_passed_count integer DEFAULT 0 NOT NULL,
    zazpay_receiver_account_id bigint,
    available_credit_count bigint DEFAULT 0 NOT NULL,
    total_credit_bought bigint DEFAULT 0 NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    gender_id integer,
    quote_credit_purchase_log_count bigint DEFAULT 0 NOT NULL,
    contest_count bigint DEFAULT 0 NOT NULL,
    contest_user_count bigint DEFAULT 0 NOT NULL,
    total_site_revenue_as_employer double precision DEFAULT 0 NOT NULL,
    total_site_revenue_as_freelancer double precision DEFAULT 0 NOT NULL,
    total_earned_amount_as_freelancer double precision DEFAULT 0 NOT NULL,
    view_count bigint DEFAULT 0 NOT NULL,
    follower_count bigint DEFAULT 0 NOT NULL,
    flag_count bigint DEFAULT 0 NOT NULL,
    total_rating_as_employer integer DEFAULT 0 NOT NULL,
    review_count_as_employer bigint DEFAULT 0 NOT NULL,
    total_rating_as_freelancer integer DEFAULT 0 NOT NULL,
    review_count_as_freelancer bigint DEFAULT 0 NOT NULL,
    education_count bigint DEFAULT 0 NOT NULL,
    work_profile_count bigint DEFAULT 0 NOT NULL,
    certificate_count bigint DEFAULT 0 NOT NULL,
    publication_count bigint DEFAULT 0 NOT NULL,
    address character varying,
    address1 character varying,
    city_id bigint,
    state_id bigint,
    country_id bigint,
    zip_code character varying,
    latitude double precision,
    longitude double precision,
    full_address text,
    expired_balance_credit_points bigint DEFAULT 0 NOT NULL,
    is_made_deposite boolean DEFAULT false NOT NULL,
    hourly_rate double precision,
    total_spend_amount_as_employer double precision DEFAULT 0 NOT NULL,
    project_completed_count bigint DEFAULT 0 NOT NULL,
    project_failed_count bigint DEFAULT 0 NOT NULL,
    designation character varying,
    about_me text,
    blocked_amount double precision DEFAULT 0,
    is_have_unreaded_activity boolean DEFAULT false NOT NULL
);


--
-- Name: vaults; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE vaults (
    id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    masked_cc character varying(100) NOT NULL,
    credit_card_type character varying(100) NOT NULL,
    vault_key character varying(100),
    vault_id bigint,
    user_id bigint,
    email character varying(200),
    address text,
    city character varying(100),
    state character varying(100),
    country character varying(100),
    zip_code character varying(100),
    phone character varying(100),
    is_primary boolean DEFAULT true,
    credit_card_expire character varying(100),
    expire_month integer,
    expire_year integer,
    cvv2 character varying(10),
    first_name character varying(100),
    last_name character varying(100),
    payment_type smallint DEFAULT 1 NOT NULL
);


--
-- Name: vaults_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE vaults_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: vaults_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE vaults_id_seq OWNED BY vaults.id;


--
-- Name: views; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE views (
    id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    foreign_id bigint NOT NULL,
    class character varying(255) NOT NULL,
    ip_id bigint DEFAULT 0 NOT NULL
);


--
-- Name: views_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE views_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: views_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE views_id_seq OWNED BY views.id;


--
-- Name: wallet_transaction_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE wallet_transaction_logs (
    id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    foreign_id bigint DEFAULT 0 NOT NULL,
    class character varying(100) NOT NULL,
    amount double precision DEFAULT 0 NOT NULL,
    status character varying(100) DEFAULT ''::character varying,
    payment_type character varying(100) DEFAULT ''::character varying
);


--
-- Name: wallet_transaction_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE wallet_transaction_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wallet_transaction_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE wallet_transaction_logs_id_seq OWNED BY wallet_transaction_logs.id;


--
-- Name: wallets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE wallets (
    id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    amount double precision NOT NULL,
    payment_gateway_id smallint DEFAULT 0 NOT NULL,
    gateway_id bigint,
    is_payment_completed boolean DEFAULT false NOT NULL,
    paypal_pay_key character varying(250)
);


--
-- Name: wallets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE wallets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wallets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE wallets_id_seq OWNED BY wallets.id;


--
-- Name: work_profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE work_profiles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: work_profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE work_profiles (
    id bigint DEFAULT nextval('work_profiles_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    title character varying(510) NOT NULL,
    description text,
    from_month_year character varying NOT NULL,
    to_month_year character varying,
    company character varying,
    currently_working boolean
);


--
-- Name: zazpay_ipn_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE zazpay_ipn_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: zazpay_ipn_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE zazpay_ipn_logs (
    id bigint DEFAULT nextval('zazpay_ipn_logs_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    ip bigint,
    post_variable text
);


--
-- Name: zazpay_payment_gateways_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE zazpay_payment_gateways_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: zazpay_payment_gateways; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE zazpay_payment_gateways (
    id bigint DEFAULT nextval('zazpay_payment_gateways_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    zazpay_gateway_name character varying(510),
    zazpay_gateway_id bigint,
    zazpay_payment_group_id bigint NOT NULL,
    zazpay_gateway_details text,
    days_after_amount_paid bigint,
    is_marketplace_supported boolean
);


--
-- Name: zazpay_payment_gateways_users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE zazpay_payment_gateways_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: zazpay_payment_gateways_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE zazpay_payment_gateways_users (
    id bigint DEFAULT nextval('zazpay_payment_gateways_users_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    zazpay_payment_gateway_id bigint NOT NULL
);


--
-- Name: zazpay_payment_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE zazpay_payment_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: zazpay_payment_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE zazpay_payment_groups (
    id integer DEFAULT nextval('zazpay_payment_groups_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    zazpay_group_id bigint NOT NULL,
    name character varying(400),
    thumb_url text
);


--
-- Name: zazpay_transaction_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE zazpay_transaction_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: zazpay_transaction_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE zazpay_transaction_logs (
    id bigint DEFAULT nextval('zazpay_transaction_logs_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint,
    amount double precision NOT NULL,
    payment_id bigint,
    class character varying(100),
    foreign_id bigint,
    zazpay_pay_key character varying(510),
    merchant_id bigint,
    gateway_id integer,
    gateway_name character varying(510),
    status character varying(100),
    payment_type character varying(100),
    buyer_id bigint,
    buyer_email character varying(510),
    buyer_address character varying(510)
);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY activities ALTER COLUMN id SET DEFAULT nextval('activities_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY credit_purchase_logs ALTER COLUMN id SET DEFAULT nextval('quote_credit_purchase_logs_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY credit_purchase_plans ALTER COLUMN id SET DEFAULT nextval('quote_credit_purchase_plans_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY followers ALTER COLUMN id SET DEFAULT nextval('followers_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY form_field_submissions ALTER COLUMN id SET DEFAULT nextval('form_field_submissions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY reviews ALTER COLUMN id SET DEFAULT nextval('reviews_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY roles ALTER COLUMN id SET DEFAULT nextval('roles_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY vaults ALTER COLUMN id SET DEFAULT nextval('vaults_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY views ALTER COLUMN id SET DEFAULT nextval('views_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY wallet_transaction_logs ALTER COLUMN id SET DEFAULT nextval('wallet_transaction_logs_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY wallets ALTER COLUMN id SET DEFAULT nextval('wallets_id_seq'::regclass);


--
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: -
--

COPY activities (id, created_at, updated_at, user_id, other_user_id, foreign_id, class, from_status_id, to_status_id, activity_type, model_id, model_class, amount) FROM stdin;
\.


--
-- Name: activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('activities_id_seq', 127, true);


--
-- Data for Name: apns_devices; Type: TABLE DATA; Schema: public; Owner: -
--

COPY apns_devices (pid, appname, appversion, deviceuid, devicetoken, devicename, devicemodel, deviceversion, pushbadge, pushalert, pushsound, development, status, created_at, updated_at, user_id) FROM stdin;
\.


--
-- Data for Name: attachments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY attachments (id, created_at, updated_at, class, foreign_id, filename, dir, mimetype, filesize, height, width, thumb, description) FROM stdin;
\.


--
-- Name: attachments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('attachments_id_seq', 59, true);


--
-- Name: bid_portfolios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('bid_portfolios_id_seq', 1, false);


--
-- Data for Name: bid_statuses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY bid_statuses (id, created_at, updated_at, name, bid_count) FROM stdin;
1	2011-03-31 18:06:20	2011-03-31 18:06:20	Pending	0
2	2011-03-31 18:06:50	2011-03-31 18:06:50	Won	0
3	2011-03-31 18:06:50	2011-03-31 18:06:50	Lost	0
\.


--
-- Name: bid_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('bid_statuses_id_seq', 3, true);


--
-- Data for Name: bids; Type: TABLE DATA; Schema: public; Owner: -
--

COPY bids (id, created_at, updated_at, user_id, project_bid_id, project_id, amount, description, duration, winner_selected_date, bid_status_id, is_notifiy, is_withdrawn, is_freelancer_withdrawn, total_escrow_amount, amount_in_escrow, paid_escrow_amount, total_invoice_requested_amount, site_commission_from_employer, total_invoice_got_paid, site_commission_from_freelancer, development_start_date, development_end_date, is_offered_rejected, message_count, milestone_count, credit_purchase_log_id, is_reached_response_end_date_for_freelancer) FROM stdin;
\.


--
-- Name: bids_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('bids_id_seq', 18, true);


--
-- Data for Name: certifications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY certifications (id, created_at, updated_at, user_id, title, conferring_organization, description, year) FROM stdin;
\.


--
-- Name: certifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('certifications_id_seq', 2, true);


--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: -
--

COPY cities (id, created_at, updated_at, country_id, state_id, name, slug, latitude, longitude, timezone, dma_id, county, code, is_active, project_count, quote_service_count, user_profile_count, user_freelancer_count, language_id) FROM stdin;
\.


--
-- Name: cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('cities_id_seq', 374, true);


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY contacts (id, created_at, updated_at, user_id, first_name, last_name, email, subject, message, phone, ip_id) FROM stdin;
\.


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('contacts_id_seq', 1, false);


--
-- Name: contest_followers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('contest_followers_id_seq', 1, false);


--
-- Data for Name: contest_statuses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY contest_statuses (id, created_at, updated_at, name, slug, message, contest_count) FROM stdin;
1	1970-01-01 00:00:00	2012-12-22 17:35:10	Payment Pending	payment-pending	Contest payment is not completed.	0
2	1970-01-01 00:00:00	1970-01-01 00:00:00	Pending Approval	pending-approval	Contest waiting for admin approval.	0
3	1970-01-01 00:00:00	1970-01-01 00:00:00	Open	open	New ##CONTEST## posted by ##HOLDER_NAME##	0
4	1970-01-01 00:00:00	1970-01-01 00:00:00	Rejected	rejected 	##CONTEST## rejected by Admin	0
5	1970-01-01 00:00:00	2012-04-27 09:25:29	Request for Cancellation	request-for-refund	##HOLDER_NAME## requested for refund and cancellation for ##CONTEST##	0
6	1970-01-01 00:00:00	1970-01-01 00:00:00	Canceled By Admin	canceled-by-admin	##CONTEST##  canceled by admin	0
7	1970-01-01 00:00:00	1970-01-01 00:00:00	Judging	judging	Stopped receiving entries for  ##CONTEST## and waiting for ##HOLDER_NAME##'s judgment. 	0
8	1970-01-01 00:00:00	1970-01-01 00:00:00	Winner Selected	winner-selected	##HOLDER_NAME## selected ##WINNER_USER## as winner for ##CONTEST## for entry ##ENTRY_NO##.	0
9	1970-01-01 00:00:00	1970-01-01 00:00:00	Winner Selected By Admin	winner-selected-by-admin	##WINNER_USER## selected as winner by Admin for entry ##ENTRY_NO##.	0
10	1970-01-01 00:00:00	1970-01-01 00:00:00	Change Requested	change-requested	Contest holder ##HOLDER_NAME## requested for changes in ##CONTEST##.	0
11	1970-01-01 00:00:00	1970-01-01 00:00:00	Change Completed	change-completed	##WINNER_USER## completed the changes requested by ##HOLDER_NAME## in ##CONTEST##	0
16	2017-01-03 12:17:27	2017-01-03 12:17:27	Pending Action to Admin	pending-action-to-admin	##CONTEST## status changed to Pending Action to Admin	0
13	2017-01-03 12:17:27	2017-01-03 12:17:27	Delivery Files Uploaded	delivery-files-uploaded	Delivery Files Uploaded	0
14	2017-01-03 12:17:27	2017-01-03 12:17:27	Completed	completed	##CONTEST##  completed.	0
15	2017-01-03 12:17:27	2017-01-03 12:17:27	Paid to Participant	paid-to-participant	Contest prize ##CONTEST_AMOUNT## for the contest ##CONTEST## is paid to ##WINNER_USER##	0
12	2017-01-03 12:17:27	2017-01-03 12:17:27	Expecting Deliverables	expectingdeliverables	##CONTEST##  ExpectingDeliverables.	0
\.


--
-- Name: contest_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('contest_statuses_id_seq', 16, true);


--
-- Data for Name: contest_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY contest_types (id, resource_id, name, description, next, contest_count, form_field_count, contest_user_count, minimum_prize, blind_fee, private_fee, featured_fee, highlight_fee, site_revenue, is_watermarked, is_active, is_template, is_blind, is_featured, is_highlight, is_private, maximum_entries_allowed, maximum_entries_allowed_per_user, created_at, updated_at) FROM stdin;
9	1	Design Contest - Logo Design	Design Contest - Logo Design	\N	0	5	0	70	0	0	0	0	0	t	t	t	f	f	f	f	0	100	\N	\N
10	1	Design Contest - T-shirt Design	Design Contest - T-shirt Design	\N	0	6	0	70	0	0	0	0	0	t	t	t	f	f	f	f	0	100	\N	\N
11	1	Design Contest - Banner Design	Design Contest - Banner Design	\N	0	9	0	70	0	0	0	0	0	t	t	t	f	f	f	f	0	100	\N	\N
12	1	Design Contest - Website Desing	Design Contest - Website, Webpage or Landing Page Design	\N	0	9	0	70	0	0	0	0	0	t	t	t	f	f	f	f	0	100	\N	\N
13	1	Design Contest - Mobile App Design	Design Contest - Mobile App Design	\N	0	5	0	70	0	0	0	0	0	t	t	t	f	f	f	f	0	100	\N	\N
14	1	Creativeallies - Small Poster	Creativeallies - Small Poster	\N	0	6	0	70	0	0	0	0	0	t	t	t	f	f	f	f	3	100	\N	\N
18	1	Hatchwise - Website	Hatchwise - Website	\N	0	12	0	70	0	0	0	0	0	t	t	t	f	f	f	f	0	100	\N	\N
15	1	Creativeallies - Large Poster	Creativeallies - Large Poster	\N	0	10	0	70	0	0	0	0	0	t	t	t	f	f	f	f	0	100	\N	\N
16	1	Creativeallies - T-shirt	Creativeallies - T-shirt	\N	0	6	0	70	0	0	0	0	0	t	t	t	f	f	f	f	3	100	\N	\N
17	1	Hatchwise - Logo	Hatchwise - Logo	\N	0	9	0	70	0	0	0	0	0	t	t	t	f	f	f	f	3	100	\N	\N
19	1	Hatchwise - T-shirt	Hatchwise - T-shirt	\N	0	7	0	70	0	0	0	0	0	t	t	t	f	f	f	f	3	100	\N	\N
20	1	Hatchwise - Banner Ad	Hatchwise - Banner Ad	\N	0	12	0	70	0	0	0	0	0	t	t	t	f	f	f	f	0	100	\N	\N
21	1	Logobids - Logo	Logobids - Logo	\N	0	8	0	70	0	0	0	0	0	t	t	t	f	f	f	f	0	100	\N	\N
22	1	Logo Contest - Logo	Logo Contest - Logo	\N	0	8	0	70	0	0	0	0	0	t	t	t	f	f	f	f	3	100	\N	\N
23	1	Logoarena - Logo	Logoarena - Logo	\N	0	11	0	70	0	0	0	0	0	t	t	t	f	f	f	f	3	100	\N	\N
24	1	Design Crowd - Logo	Design Crowd - Logo	\N	0	7	0	70	0	0	0	0	0	t	t	t	f	f	f	f	3	100	\N	\N
25	1	Design Crowd - Web	Design Crowd - Web	\N	0	6	0	70	0	0	0	0	0	t	t	t	f	f	f	f	3	100	\N	\N
26	1	Design Crowd - Banner Ad	Design Crowd - Banner Ad	\N	0	6	0	70	0	0	0	0	0	t	t	t	f	f	f	f	0	100	\N	\N
27	1	Design Crowd - Graphic	Design Crowd - Graphic	\N	0	9	0	70	0	0	0	0	0	t	t	t	f	f	f	f	3	100	\N	\N
28	1	Design Crowd - App	Design Crowd - App	\N	0	6	0	70	0	0	0	0	0	t	t	t	f	f	f	f	3	100	\N	\N
29	2	Wooshi	Wooshi	\N	0	5	0	70	0	0	0	0	0	t	t	t	f	f	f	f	3	100	\N	\N
30	1	Design Contest- Stationery Design	Design Contest- Stationery Design	\N	\N	\N	\N	199	0	0	0	0	0	t	t	f	f	f	\N	f	10	10	2016-12-10 11:48:12	2016-12-10 11:48:12
31	1	99designs - Logo design	Logo design	\N	\N	\N	\N	99	0	0	0	0	0	t	t	f	f	f	\N	f	10	10	2016-12-10 13:12:01	2016-12-10 13:12:01
32	1	99designs - Business card design	Business card design	\N	\N	\N	\N	199	0	0	0	0	0	t	t	f	f	f	\N	f	30	30	2016-12-10 13:13:16	2016-12-10 13:13:16
33	1	99designs - T-shirt design	T-shirt design	\N	\N	\N	\N	199	0	0	0	0	0	t	t	f	f	f	\N	f	20	30	2016-12-10 13:13:57	2016-12-10 13:13:57
34	1	99designs - Brochure design	Brochure design	\N	\N	\N	\N	299	0	0	0	0	0	t	t	f	f	f	\N	f	15	30	2016-12-10 13:14:40	2016-12-10 13:14:40
35	1	99designs - Banner Ad Design	Banner Ad Design	\N	\N	\N	\N	49	0	0	0	0	0	t	t	f	f	f	\N	f	17	30	2016-12-10 13:15:32	2016-12-10 13:15:32
36	1	99designs - Landing page design	Landing page design	\N	\N	\N	\N	349	0	0	0	0	0	t	t	f	f	f	\N	f	27	10	2016-12-10 13:16:48	2016-12-10 13:16:48
\.


--
-- Name: contest_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('contest_types_id_seq', 36, true);


--
-- Data for Name: contest_types_pricing_days; Type: TABLE DATA; Schema: public; Owner: -
--

COPY contest_types_pricing_days (id, created_at, updated_at, contest_type_id, pricing_day_id, price) FROM stdin;
1	2016-12-10 11:53:41	2016-12-10 11:53:41	30	1	70
2	2016-12-10 13:25:15	2016-12-10 13:25:15	31	1	80
3	2016-12-10 13:26:51	2016-12-10 13:26:51	32	2	50
4	2016-12-10 13:28:18	2016-12-10 13:28:18	35	4	50
\.


--
-- Name: contest_types_pricing_days_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('contest_types_pricing_days_id_seq', 4, true);


--
-- Data for Name: contest_types_pricing_packages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY contest_types_pricing_packages (id, created_at, updated_at, contest_type_id, pricing_package_id, price, participant_commision, maximum_entry_allowed) FROM stdin;
1	2016-12-10 11:54:12	2016-12-10 11:54:12	30	1	70	6	25
2	2016-12-10 13:25:34	2016-12-10 13:25:34	31	1	70	6	20
3	2016-12-10 13:27:18	2016-12-10 13:27:18	33	3	70	6	20
4	2016-12-10 13:29:02	2016-12-10 13:29:02	36	4	90	6	10
\.


--
-- Name: contest_types_pricing_packages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('contest_types_pricing_packages_id_seq', 4, true);


--
-- Data for Name: contest_user_downloads; Type: TABLE DATA; Schema: public; Owner: -
--

COPY contest_user_downloads (id, created_at, user_id, contest_user_id, ip_id) FROM stdin;
\.


--
-- Name: contest_user_downloads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('contest_user_downloads_id_seq', 1, false);


--
-- Name: contest_user_flag_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('contest_user_flag_categories_id_seq', 4, false);


--
-- Name: contest_user_flags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('contest_user_flags_id_seq', 1, false);


--
-- Name: contest_user_ratings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('contest_user_ratings_id_seq', 1, false);


--
-- Data for Name: contest_user_statuses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY contest_user_statuses (id, created_at, updated_at, name, description, slug, contest_user_count) FROM stdin;
1	2011-10-01 10:44:30	2011-10-01 10:44:30	Active	This entry is in active status	active	0
2	2011-10-01 10:44:30	2011-10-01 10:44:30	Won	This entry won!	won	0
3	1970-01-01 00:00:00	1970-01-01 00:00:00	Lost	Entry is in lost status	lost	0
4	2011-10-01 10:44:30	2011-10-01 10:44:30	Withdrawn	This entry has been withdrawn	withdrawn	0
5	2011-10-01 10:44:30	2011-10-01 10:44:30	Eliminated	This entry has been eliminated	eliminated	0
\.


--
-- Name: contest_user_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('contest_user_statuses_id_seq', 6, false);


--
-- Data for Name: contest_users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY contest_users (id, created_at, updated_at, user_id, contest_owner_user_id, contest_id, description, copyright_note, entry_no, contest_user_status_id, contest_user_total_ratings, contest_user_rating_count, average_rating, site_revenue, zazpay_gateway_id, view_count, flag_count, message_count) FROM stdin;
\.


--
-- Name: contest_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('contest_users_id_seq', 16, true);


--
-- Data for Name: contests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY contests (id, created_at, updated_at, user_id, referred_by_user_id, contest_type_id, contest_status_id, is_send_payment_notification, resource_id, pricing_package_id, pricing_day_id, name, slug, description, maximum_entry_allowed, maximum_entry_allowed_per_user, reason_for_cancelation, prize, creation_cost, actual_end_date, end_date, start_date, refund_request_date, canceled_by_admin_date, winner_selected_date, judging_date, pending_action_to_admin_date, change_requested_date, change_completed_date, paid_to_participant_date, completed_date, files_expectation_date, partcipant_count, contest_user_count, contest_user_won_count, contest_user_eliminated_count, contest_user_withdrawn_count, contest_user_active_count, message_count, total_site_revenue, winner_user_id, payment_gateway_id, last_contest_user_entry_no, is_system_flagged, is_user_flagged, is_admin_complete, admin_suspend, is_winner_selected_by_admin, is_pending_action_to_admin, is_blind, is_private, is_featured, is_highlight, blind_contest_fee, private_contest_fee, featured_contest_fee, highlight_contest_fee, detected_suspicious_words, reason_for_calcelation, site_commision, is_paid, is_uploaded_entry_design, admin_commission_amount, affiliate_commission_amount, zazpay_gateway_id, zazpay_payment_id, zazpay_pay_key, zazpay_revised_amount, upgrade, participant_count, view_count, follower_count, flag_count, is_notification_sent, paypal_pay_key) FROM stdin;
\.


--
-- Name: contests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('contests_id_seq', 9, true);


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: -
--

COPY countries (id, iso_alpha2, iso_alpha3, iso_numeric, fips_code, name, capital, areainsqkm, population, continent, tld, currency, currencyname, phone, postalcodeformat, postalcoderegex, languages, geonameid, neighbours, equivalentfipscode, created_at, updated_at) FROM stdin;
1	AF	AFG	4	AF	Afghanistan	Kabul	647500	29121286	AS	.af	AFN	Afghani	93			fa-AF,ps,uz-AF,tk	1149361	TM,CN,IR,TJ,PK,UZ	\r	\N	\N
2	AX	ALA	248		Aland Islands	Mariehamn	0	26711	EU	.ax	EUR	Euro	+358-18			sv-AX	661882		FI\r	\N	\N
3	AL	ALB	8	AL	Albania	Tirana	28748	2986952	EU	.al	ALL	Lek	355			sq,el	783754	MK,GR,CS,ME,RS,XK	\r	\N	\N
4	DZ	DZA	12	AG	Algeria	Algiers	2381740	34586184	AF	.dz	DZD	Dinar	213	#####	^(d{5})$	ar-DZ	2589581	NE,EH,LY,MR,TN,MA,ML	\r	\N	\N
5	AS	ASM	16	AQ	American Samoa	Pago Pago	199	57881	OC	.as	USD	Dollar	+1-684			en-AS,sm,to	5880801		\r	\N	\N
6	AD	AND	20	AN	Andorra	Andorra la Vella	468	84000	EU	.ad	EUR	Euro	376	AD###	^(?:AD)*(d{3})$	ca	3041565	ES,FR	\r	\N	\N
7	AO	AGO	24	AO	Angola	Luanda	1246700	13068161	AF	.ao	AOA	Kwanza	244			pt-AO	3351879	CD,NA,ZM,CG	\r	\N	\N
8	AI	AIA	660	AV	Anguilla	The Valley	102	13254	NA	.ai	XCD	Dollar	+1-264			en-AI	3573511		\r	\N	\N
9	AQ	ATA	10	AY	Antarctica		14000000	0	AN	.aq							6697173		\r	\N	\N
10	AG	ATG	28	AC	Antigua and Barbuda	St. John's	443	86754	NA	.ag	XCD	Dollar	+1-268			en-AG	3576396		\r	\N	\N
11	AR	ARG	32	AR	Argentina	Buenos Aires	2766890	41343201	SA	.ar	ARS	Peso	54	@####@@@	^([A-Z]d{4}[A-Z]{3})	es-AR,en,it,de,fr,gn	3865483	CL,BO,UY,PY,BR	\r	\N	\N
12	AM	ARM	51	AM	Armenia	Yerevan	29800	2968000	AS	.am	AMD	Dram	374	######	^(d{6})$	hy	174982	GE,IR,AZ,TR	\r	\N	\N
13	AW	ABW	533	AA	Aruba	Oranjestad	193	71566	NA	.aw	AWG	Guilder	297			nl-AW,es,en	3577279		\r	\N	\N
14	AU	AUS	36	AS	Australia	Canberra	7686850	21515754	OC	.au	AUD	Dollar	61	####	^(d{4})$	en-AU	2077456		\r	\N	\N
15	AT	AUT	40	AU	Austria	Vienna	83858	8205000	EU	.at	EUR	Euro	43	####	^(d{4})$	de-AT,hr,hu,sl	2782113	CH,DE,HU,SK,CZ,IT,SI	\r	\N	\N
16	AZ	AZE	31	AJ	Azerbaijan	Baku	86600	8303512	AS	.az	AZN	Manat	994	AZ ####	^(?:AZ)*(d{4})$	az,ru,hy	587116	GE,IR,AM,TR,RU	\r	\N	\N
17	BS	BHS	44	BF	Bahamas	Nassau	13940	301790	NA	.bs	BSD	Dollar	+1-242			en-BS	3572887		\r	\N	\N
18	BH	BHR	48	BA	Bahrain	Manama	665	738004	AS	.bh	BHD	Dinar	973	####|###	^(d{3}d?)$	ar-BH,en,fa,ur	290291		\r	\N	\N
19	BD	BGD	50	BG	Bangladesh	Dhaka	144000	156118464	AS	.bd	BDT	Taka	880	####	^(d{4})$	bn-BD,en	1210997	MM,IN	\r	\N	\N
20	BB	BRB	52	BB	Barbados	Bridgetown	431	285653	NA	.bb	BBD	Dollar	+1-246	BB#####	^(?:BB)*(d{5})$	en-BB	3374084		\r	\N	\N
21	BY	BLR	112	BO	Belarus	Minsk	207600	9685000	EU	.by	BYR	Ruble	375	######	^(d{6})$	be,ru	630336	PL,LT,UA,RU,LV	\r	\N	\N
22	BE	BEL	56	BE	Belgium	Brussels	30510	10403000	EU	.be	EUR	Euro	32	####	^(d{4})$	nl-BE,fr-BE,de-BE	2802361	DE,NL,LU,FR	\r	\N	\N
23	BZ	BLZ	84	BH	Belize	Belmopan	22966	314522	NA	.bz	BZD	Dollar	501			en-BZ,es	3582678	GT,MX	\r	\N	\N
24	BJ	BEN	204	BN	Benin	Porto-Novo	112620	9056010	AF	.bj	XOF	Franc	229			fr-BJ	2395170	NE,TG,BF,NG	\r	\N	\N
25	BM	BMU	60	BD	Bermuda	Hamilton	53	65365	NA	.bm	BMD	Dollar	+1-441	@@ ##	^([A-Z]{2}d{2})$	en-BM,pt	3573345		\r	\N	\N
26	BT	BTN	64	BT	Bhutan	Thimphu	47000	699847	AS	.bt	BTN	Ngultrum	975			dz	1252634	CN,IN	\r	\N	\N
27	BO	BOL	68	BL	Bolivia	Sucre	1098580	9947418	SA	.bo	BOB	Boliviano	591			es-BO,qu,ay	3923057	PE,CL,PY,BR,AR	\r	\N	\N
28	BQ	BES	535		Bonaire, Saint Eustatius and Saba 		0	18012	NA	.bq	USD	Dollar	599			nl,pap,en	7626844		\r	\N	\N
29	BA	BIH	70	BK	Bosnia and Herzegovina	Sarajevo	51129	4590000	EU	.ba	BAM	Marka	387	#####	^(d{5})$	bs,hr-BA,sr-BA	3277605	CS,HR,ME,RS	\r	\N	\N
30	BW	BWA	72	BC	Botswana	Gaborone	600370	2029307	AF	.bw	BWP	Pula	267			en-BW,tn-BW	933860	ZW,ZA,NA	\r	\N	\N
31	BV	BVT	74	BV	Bouvet Island		0	0	AN	.bv	NOK	Krone					3371123		\r	\N	\N
32	BR	BRA	76	BR	Brazil	Brasilia	8511965	201103330	SA	.br	BRL	Real	55	#####-###	^(d{8})$	pt-BR,es,en,fr	3469034	SR,PE,BO,UY,GY,PY,GF	\r	\N	\N
33	IO	IOT	86	IO	British Indian Ocean Territory	Diego Garcia	60	4000	AS	.io	USD	Dollar	246			en-IO	1282588		\r	\N	\N
34	VG	VGB	92	VI	British Virgin Islands	Road Town	153	21730	NA	.vg	USD	Dollar	+1-284			en-VG	3577718		\r	\N	\N
35	BN	BRN	96	BX	Brunei	Bandar Seri Begawan	5770	395027	AS	.bn	BND	Dollar	673	@@####	^([A-Z]{2}d{4})$	ms-BN,en-BN	1820814	MY	\r	\N	\N
36	BG	BGR	100	BU	Bulgaria	Sofia	110910	7148785	EU	.bg	BGN	Lev	359	####	^(d{4})$	bg,tr-BG	732800	MK,GR,RO,CS,TR,RS	\r	\N	\N
37	BF	BFA	854	UV	Burkina Faso	Ouagadougou	274200	16241811	AF	.bf	XOF	Franc	226			fr-BF	2361809	NE,BJ,GH,CI,TG,ML	\r	\N	\N
38	BI	BDI	108	BY	Burundi	Bujumbura	27830	9863117	AF	.bi	BIF	Franc	257			fr-BI,rn	433561	TZ,CD,RW	\r	\N	\N
39	KH	KHM	116	CB	Cambodia	Phnom Penh	181040	14453680	AS	.kh	KHR	Riels	855	#####	^(d{5})$	km,fr,en	1831722	LA,TH,VN	\r	\N	\N
40	CM	CMR	120	CM	Cameroon	Yaounde	475440	19294149	AF	.cm	XAF	Franc	237			en-CM,fr-CM	2233387	TD,CF,GA,GQ,CG,NG	\r	\N	\N
41	CA	CAN	124	CA	Canada	Ottawa	9984670	33679000	NA	.ca	CAD	Dollar	1	@#@ #@#	^([a-zA-Z]d[a-zA-Z]d	en-CA,fr-CA,iu	6251999	US	\r	\N	\N
42	CV	CPV	132	CV	Cape Verde	Praia	4033	508659	AF	.cv	CVE	Escudo	238	####	^(d{4})$	pt-CV	3374766		\r	\N	\N
43	KY	CYM	136	CJ	Cayman Islands	George Town	262	44270	NA	.ky	KYD	Dollar	+1-345			en-KY	3580718		\r	\N	\N
44	CF	CAF	140	CT	Central African Republic	Bangui	622984	4844927	AF	.cf	XAF	Franc	236			fr-CF,sg,ln,kg	239880	TD,SD,CD,SS,CM,CG	\r	\N	\N
45	TD	TCD	148	CD	Chad	N'Djamena	1284000	10543464	AF	.td	XAF	Franc	235			fr-TD,ar-TD,sre	2434508	NE,LY,CF,SD,CM,NG	\r	\N	\N
46	CL	CHL	152	CI	Chile	Santiago	756950	16746491	SA	.cl	CLP	Peso	56	#######	^(d{7})$	es-CL	3895114	PE,BO,AR	\r	\N	\N
47	CN	CHN	156	CH	China	Beijing	9596960	1330044000	AS	.cn	CNY	Yuan Renminbi	86	######	^(d{6})$	zh-CN,yue,wuu,dta,ug,za	1814991	LA,BT,TJ,KZ,MN,AF,NP	\r	\N	\N
48	CX	CXR	162	KT	Christmas Island	Flying Fish Cove	135	1500	AS	.cx	AUD	Dollar	61	####	^(d{4})$	en,zh,ms-CC	2078138		\r	\N	\N
49	CC	CCK	166	CK	Cocos Islands	West Island	14	628	AS	.cc	AUD	Dollar	61			ms-CC,en	1547376		\r	\N	\N
50	CO	COL	170	CO	Colombia	Bogota	1138910	44205293	SA	.co	COP	Peso	57			es-CO	3686110	EC,PE,PA,BR,VE	\r	\N	\N
51	KM	COM	174	CN	Comoros	Moroni	2170	773407	AF	.km	KMF	Franc	269			ar,fr-KM	921929		\r	\N	\N
52	CK	COK	184	CW	Cook Islands	Avarua	240	21388	OC	.ck	NZD	Dollar	682			en-CK,mi	1899402		\r	\N	\N
53	CR	CRI	188	CS	Costa Rica	San Jose	51100	4516220	NA	.cr	CRC	Colon	506	####	^(d{4})$	es-CR,en	3624060	PA,NI	\r	\N	\N
54	HR	HRV	191	HR	Croatia	Zagreb	56542	4491000	EU	.hr	HRK	Kuna	385	HR-#####	^(?:HR)*(d{5})$	hr-HR,sr	3202326	HU,SI,CS,BA,ME,RS	\r	\N	\N
55	CU	CUB	192	CU	Cuba	Havana	110860	11423000	NA	.cu	CUP	Peso	53	CP #####	^(?:CP)*(d{5})$	es-CU	3562981	US	\r	\N	\N
56	CW	CUW	531	UC	Curacao	 Willemstad	0	141766	NA	.cw	ANG	Guilder	599			nl,pap	7626836		\r	\N	\N
57	CY	CYP	196	CY	Cyprus	Nicosia	9250	1102677	EU	.cy	EUR	Euro	357	####	^(d{4})$	el-CY,tr-CY,en	146669		\r	\N	\N
58	CZ	CZE	203	EZ	Czech Republic	Prague	78866	10476000	EU	.cz	CZK	Koruna	420	### ##	^(d{5})$	cs,sk	3077311	PL,DE,SK,AT	\r	\N	\N
59	CD	COD	180	CG	Democratic Republic of the Congo	Kinshasa	2345410	70916439	AF	.cd	CDF	Franc	243			fr-CD,ln,kg	203312	TZ,CF,SS,RW,ZM,BI,UG	\r	\N	\N
60	DK	DNK	208	DA	Denmark	Copenhagen	43094	5484000	EU	.dk	DKK	Krone	45	####	^(d{4})$	da-DK,en,fo,de-DK	2623032	DE	\r	\N	\N
61	DJ	DJI	262	DJ	Djibouti	Djibouti	23000	740528	AF	.dj	DJF	Franc	253			fr-DJ,ar,so-DJ,aa	223816	ER,ET,SO	\r	\N	\N
62	DM	DMA	212	DO	Dominica	Roseau	754	72813	NA	.dm	XCD	Dollar	+1-767			en-DM	3575830		\r	\N	\N
63	DO	DOM	214	DR	Dominican Republic	Santo Domingo	48730	9823821	NA	.do	DOP	Peso	+1-809 and	#####	^(d{5})$	es-DO	3508796	HT	\r	\N	\N
64	TL	TLS	626	TT	East Timor	Dili	15007	1154625	OC	.tl	USD	Dollar	670			tet,pt-TL,id,en	1966436	ID	\r	\N	\N
65	EC	ECU	218	EC	Ecuador	Quito	283560	14790608	SA	.ec	USD	Dollar	593	@####@	^([a-zA-Z]d{4}[a-zA-	es-EC	3658394	PE,CO	\r	\N	\N
66	EG	EGY	818	EG	Egypt	Cairo	1001450	80471869	AF	.eg	EGP	Pound	20	#####	^(d{5})$	ar-EG,en,fr	357994	LY,SD,IL	\r	\N	\N
67	SV	SLV	222	ES	El Salvador	San Salvador	21040	6052064	NA	.sv	USD	Dollar	503	CP ####	^(?:CP)*(d{4})$	es-SV	3585968	GT,HN	\r	\N	\N
68	GQ	GNQ	226	EK	Equatorial Guinea	Malabo	28051	1014999	AF	.gq	XAF	Franc	240			es-GQ,fr	2309096	GA,CM	\r	\N	\N
69	ER	ERI	232	ER	Eritrea	Asmara	121320	5792984	AF	.er	ERN	Nakfa	291			aa-ER,ar,tig,kun,ti-ER	338010	ET,SD,DJ	\r	\N	\N
70	EE	EST	233	EN	Estonia	Tallinn	45226	1291170	EU	.ee	EUR	Euro	372	#####	^(d{5})$	et,ru	453733	RU,LV	\r	\N	\N
71	ET	ETH	231	ET	Ethiopia	Addis Ababa	1127127	88013491	AF	.et	ETB	Birr	251	####	^(d{4})$	am,en-ET,om-ET,ti-ET,so-ET,sid	337996	ER,KE,SD,SS,SO,DJ	\r	\N	\N
72	FK	FLK	238	FK	Falkland Islands	Stanley	12173	2638	SA	.fk	FKP	Pound	500			en-FK	3474414		\r	\N	\N
73	FO	FRO	234	FO	Faroe Islands	Torshavn	1399	48228	EU	.fo	DKK	Krone	298	FO-###	^(?:FO)*(d{3})$	fo,da-FO	2622320		\r	\N	\N
74	FJ	FJI	242	FJ	Fiji	Suva	18270	875983	OC	.fj	FJD	Dollar	679			en-FJ,fj	2205218		\r	\N	\N
75	FI	FIN	246	FI	Finland	Helsinki	337030	5244000	EU	.fi	EUR	Euro	358	#####	^(?:FI)*(d{5})$	fi-FI,sv-FI,smn	660013	NO,RU,SE	\r	\N	\N
76	FR	FRA	250	FR	France	Paris	547030	64768389	EU	.fr	EUR	Euro	33	#####	^(d{5})$	fr-FR,frp,br,co,ca,eu,oc	3017382	CH,DE,BE,LU,IT,AD,MC	\r	\N	\N
77	GF	GUF	254	FG	French Guiana	Cayenne	91000	195506	SA	.gf	EUR	Euro	594	#####	^((97)|(98)3d{2})$	fr-GF	3381670	SR,BR	\r	\N	\N
78	PF	PYF	258	FP	French Polynesia	Papeete	4167	270485	OC	.pf	XPF	Franc	689	#####	^((97)|(98)7d{2})$	fr-PF,ty	4030656		\r	\N	\N
79	TF	ATF	260	FS	French Southern Territories	Port-aux-Francais	7829	140	AN	.tf	EUR	Euro				fr	1546748		\r	\N	\N
80	GA	GAB	266	GB	Gabon	Libreville	267667	1545255	AF	.ga	XAF	Franc	241			fr-GA	2400553	CM,GQ,CG	\r	\N	\N
81	GM	GMB	270	GA	Gambia	Banjul	11300	1593256	AF	.gm	GMD	Dalasi	220			en-GM,mnk,wof,wo,ff	2413451	SN	\r	\N	\N
82	GE	GEO	268	GG	Georgia	Tbilisi	69700	4630000	AS	.ge	GEL	Lari	995	####	^(d{4})$	ka,ru,hy,az	614540	AM,AZ,TR,RU	\r	\N	\N
83	DE	DEU	276	GM	Germany	Berlin	357021	81802257	EU	.de	EUR	Euro	49	#####	^(d{5})$	de	2921044	CH,PL,NL,DK,BE,CZ,LU	\r	\N	\N
84	GH	GHA	288	GH	Ghana	Accra	239460	24339838	AF	.gh	GHS	Cedi	233			en-GH,ak,ee,tw	2300660	CI,TG,BF	\r	\N	\N
85	GI	GIB	292	GI	Gibraltar	Gibraltar	6.5	27884	EU	.gi	GIP	Pound	350			en-GI,es,it,pt	2411586	ES	\r	\N	\N
86	GR	GRC	300	GR	Greece	Athens	131940	11000000	EU	.gr	EUR	Euro	30	### ##	^(d{5})$	el-GR,en,fr	390903	AL,MK,TR,BG	\r	\N	\N
87	GL	GRL	304	GL	Greenland	Nuuk	2166086	56375	NA	.gl	DKK	Krone	299	####	^(d{4})$	kl,da-GL,en	3425505		\r	\N	\N
88	GD	GRD	308	GJ	Grenada	St. George's	344	107818	NA	.gd	XCD	Dollar	+1-473			en-GD	3580239		\r	\N	\N
89	GP	GLP	312	GP	Guadeloupe	Basse-Terre	1780	443000	NA	.gp	EUR	Euro	590	#####	^((97)|(98)d{3})$	fr-GP	3579143	AN	\r	\N	\N
90	GU	GUM	316	GQ	Guam	Hagatna	549	159358	OC	.gu	USD	Dollar	+1-671	969##	^(969d{2})$	en-GU,ch-GU	4043988		\r	\N	\N
91	GT	GTM	320	GT	Guatemala	Guatemala City	108890	13550440	NA	.gt	GTQ	Quetzal	502	#####	^(d{5})$	es-GT	3595528	MX,HN,BZ,SV	\r	\N	\N
92	GG	GGY	831	GK	Guernsey	St Peter Port	78	65228	EU	.gg	GBP	Pound	+44-1481	@# #@@|@## #@@|@@# #	^(([A-Z]d{2}[A-Z]{2}	en,fr	3042362		\r	\N	\N
93	GN	GIN	324	GV	Guinea	Conakry	245857	10324025	AF	.gn	GNF	Franc	224			fr-GN	2420477	LR,SN,SL,CI,GW,ML	\r	\N	\N
94	GW	GNB	624	PU	Guinea-Bissau	Bissau	36120	1565126	AF	.gw	XOF	Franc	245	####	^(d{4})$	pt-GW,pov	2372248	SN,GN	\r	\N	\N
95	GY	GUY	328	GY	Guyana	Georgetown	214970	748486	SA	.gy	GYD	Dollar	592			en-GY	3378535	SR,BR,VE	\r	\N	\N
96	HT	HTI	332	HA	Haiti	Port-au-Prince	27750	9648924	NA	.ht	HTG	Gourde	509	HT####	^(?:HT)*(d{4})$	ht,fr-HT	3723988	DO	\r	\N	\N
97	HM	HMD	334	HM	Heard Island and McDonald Islands		412	0	AN	.hm	AUD	Dollar					1547314		\r	\N	\N
98	HN	HND	340	HO	Honduras	Tegucigalpa	112090	7989415	NA	.hn	HNL	Lempira	504	@@####	^([A-Z]{2}d{4})$	es-HN	3608932	GT,NI,SV	\r	\N	\N
99	HK	HKG	344	HK	Hong Kong	Hong Kong	1092	6898686	AS	.hk	HKD	Dollar	852			zh-HK,yue,zh,en	1819730		\r	\N	\N
100	HU	HUN	348	HU	Hungary	Budapest	93030	9930000	EU	.hu	HUF	Forint	36	####	^(d{4})$	hu-HU	719819	SK,SI,RO,UA,CS,HR,AT	\r	\N	\N
101	IS	ISL	352	IC	Iceland	Reykjavik	103000	308910	EU	.is	ISK	Krona	354	###	^(d{3})$	is,en,de,da,sv,no	2629691		\r	\N	\N
102	IN	IND	356	IN	India	New Delhi	3287590	1173108018	AS	.in	INR	Rupee	91	######	^(d{6})$	en-IN,hi,bn,te,mr,ta,ur,gu,kn,ml,or,pa,as,bh,sat,ks,ne,sd,kok,doi,mni,sit,sa,fr,lus,inc	1269750	CN,NP,MM,BT,PK,BD	\r	\N	\N
103	ID	IDN	360	ID	Indonesia	Jakarta	1919440	242968342	AS	.id	IDR	Rupiah	62	#####	^(d{5})$	id,en,nl,jv	1643084	PG,TL,MY	\r	\N	\N
104	IR	IRN	364	IR	Iran	Tehran	1648000	76923300	AS	.ir	IRR	Rial	98	##########	^(d{10})$	fa-IR,ku	130758	TM,AF,IQ,AM,PK,AZ,TR	\r	\N	\N
105	IQ	IRQ	368	IZ	Iraq	Baghdad	437072	29671605	AS	.iq	IQD	Dinar	964	#####	^(d{5})$	ar-IQ,ku,hy	99237	SY,SA,IR,JO,TR,KW	\r	\N	\N
106	IE	IRL	372	EI	Ireland	Dublin	70280	4622917	EU	.ie	EUR	Euro	353			en-IE,ga-IE	2963597	GB	\r	\N	\N
143	MX	MEX	484	MX	Mexico	Mexico City	1972550	112468855	NA	.mx	MXN	Peso	52	#####	^(d{5})$	es-MX	3996063	GT,US,BZ	\r	\N	\N
107	IM	IMN	833	IM	Isle of Man	Douglas, Isle of Man	572	75049	EU	.im	GBP	Pound	+44-1624	@# #@@|@## #@@|@@# #	^(([A-Z]d{2}[A-Z]{2}	en,gv	3042225		\r	\N	\N
108	IL	ISR	376	IS	Israel	Jerusalem	20770	7353985	AS	.il	ILS	Shekel	972	#####	^(d{5})$	he,ar-IL,en-IL,	294640	SY,JO,LB,EG,PS	\r	\N	\N
109	IT	ITA	380	IT	Italy	Rome	301230	60340328	EU	.it	EUR	Euro	39	#####	^(d{5})$	it-IT,de-IT,fr-IT,sc,ca,co,sl	3175395	CH,VA,SI,SM,FR,AT	\r	\N	\N
110	CI	CIV	384	IV	Ivory Coast	Yamoussoukro	322460	21058798	AF	.ci	XOF	Franc	225			fr-CI	2287781	LR,GH,GN,BF,ML	\r	\N	\N
111	JM	JAM	388	JM	Jamaica	Kingston	10991	2847232	NA	.jm	JMD	Dollar	+1-876			en-JM	3489940		\r	\N	\N
112	JP	JPN	392	JA	Japan	Tokyo	377835	127288000	AS	.jp	JPY	Yen	81	###-####	^(d{7})$	ja	1861060		\r	\N	\N
113	JE	JEY	832	JE	Jersey	Saint Helier	116	90812	EU	.je	GBP	Pound	+44-1534	@# #@@|@## #@@|@@# #	^(([A-Z]d{2}[A-Z]{2}	en,pt	3042142		\r	\N	\N
114	JO	JOR	400	JO	Jordan	Amman	92300	6407085	AS	.jo	JOD	Dinar	962	#####	^(d{5})$	ar-JO,en	248816	SY,SA,IQ,IL,PS	\r	\N	\N
115	KZ	KAZ	398	KZ	Kazakhstan	Astana	2717300	15340000	AS	.kz	KZT	Tenge	7	######	^(d{6})$	kk,ru	1522867	TM,CN,KG,UZ,RU	\r	\N	\N
116	KE	KEN	404	KE	Kenya	Nairobi	582650	40046566	AF	.ke	KES	Shilling	254	#####	^(d{5})$	en-KE,sw-KE	192950	ET,TZ,SS,SO,UG	\r	\N	\N
117	KI	KIR	296	KR	Kiribati	Tarawa	811	92533	OC	.ki	AUD	Dollar	686			en-KI,gil	4030945		\r	\N	\N
118	XK	XKX	0	KV	Kosovo	Pristina	0	1800000	EU		EUR	Euro				sq,sr	831053	RS,AL,MK,ME	\r	\N	\N
119	KW	KWT	414	KU	Kuwait	Kuwait City	17820	2789132	AS	.kw	KWD	Dinar	965	#####	^(d{5})$	ar-KW,en	285570	SA,IQ	\r	\N	\N
120	KG	KGZ	417	KG	Kyrgyzstan	Bishkek	198500	5508626	AS	.kg	KGS	Som	996	######	^(d{6})$	ky,uz,ru	1527747	CN,TJ,UZ,KZ	\r	\N	\N
121	LA	LAO	418	LA	Laos	Vientiane	236800	6368162	AS	.la	LAK	Kip	856	#####	^(d{5})$	lo,fr,en	1655842	CN,MM,KH,TH,VN	\r	\N	\N
122	LV	LVA	428	LG	Latvia	Riga	64589	2217969	EU	.lv	LVL	Lat	371	LV-####	^(?:LV)*(d{4})$	lv,ru,lt	458258	LT,EE,BY,RU	\r	\N	\N
123	LB	LBN	422	LE	Lebanon	Beirut	10400	4125247	AS	.lb	LBP	Pound	961	#### ####|####	^(d{4}(d{4})?)$	ar-LB,fr-LB,en,hy	272103	SY,IL	\r	\N	\N
124	LS	LSO	426	LT	Lesotho	Maseru	30355	1919552	AF	.ls	LSL	Loti	266	###	^(d{3})$	en-LS,st,zu,xh	932692	ZA	\r	\N	\N
125	LR	LBR	430	LI	Liberia	Monrovia	111370	3685076	AF	.lr	LRD	Dollar	231	####	^(d{4})$	en-LR	2275384	SL,CI,GN	\r	\N	\N
126	LY	LBY	434	LY	Libya	Tripolis	1759540	6461454	AF	.ly	LYD	Dinar	218			ar-LY,it,en	2215636	TD,NE,DZ,SD,TN,EG	\r	\N	\N
127	LI	LIE	438	LS	Liechtenstein	Vaduz	160	35000	EU	.li	CHF	Franc	423	####	^(d{4})$	de-LI	3042058	CH,AT	\r	\N	\N
128	LT	LTU	440	LH	Lithuania	Vilnius	65200	3565000	EU	.lt	LTL	Litas	370	LT-#####	^(?:LT)*(d{5})$	lt,ru,pl	597427	PL,BY,RU,LV	\r	\N	\N
129	LU	LUX	442	LU	Luxembourg	Luxembourg	2586	497538	EU	.lu	EUR	Euro	352	####	^(d{4})$	lb,de-LU,fr-LU	2960313	DE,BE,FR	\r	\N	\N
130	MO	MAC	446	MC	Macao	Macao	254	449198	AS	.mo	MOP	Pataca	853			zh,zh-MO,pt	1821275		\r	\N	\N
131	MK	MKD	807	MK	Macedonia	Skopje	25333	2061000	EU	.mk	MKD	Denar	389	####	^(d{4})$	mk,sq,tr,rmm,sr	718075	AL,GR,CS,BG,RS,XK	\r	\N	\N
132	MG	MDG	450	MA	Madagascar	Antananarivo	587040	21281844	AF	.mg	MGA	Ariary	261	###	^(d{3})$	fr-MG,mg	1062947		\r	\N	\N
133	MW	MWI	454	MI	Malawi	Lilongwe	118480	15447500	AF	.mw	MWK	Kwacha	265			ny,yao,tum,swk	927384	TZ,MZ,ZM	\r	\N	\N
134	MY	MYS	458	MY	Malaysia	Kuala Lumpur	329750	28274729	AS	.my	MYR	Ringgit	60	#####	^(d{5})$	ms-MY,en,zh,ta,te,ml,pa,th	1733045	BN,TH,ID	\r	\N	\N
135	MV	MDV	462	MV	Maldives	Male	300	395650	AS	.mv	MVR	Rufiyaa	960	#####	^(d{5})$	dv,en	1282028		\r	\N	\N
136	ML	MLI	466	ML	Mali	Bamako	1240000	13796354	AF	.ml	XOF	Franc	223			fr-ML,bm	2453866	SN,NE,DZ,CI,GN,MR,BF	\r	\N	\N
137	MT	MLT	470	MT	Malta	Valletta	316	403000	EU	.mt	EUR	Euro	356	@@@ ###|@@@ ##	^([A-Z]{3}d{2}d?)$	mt,en-MT	2562770		\r	\N	\N
138	MH	MHL	584	RM	Marshall Islands	Majuro	181.300000000000011	65859	OC	.mh	USD	Dollar	692			mh,en-MH	2080185		\r	\N	\N
139	MQ	MTQ	474	MB	Martinique	Fort-de-France	1100	432900	NA	.mq	EUR	Euro	596	#####	^(d{5})$	fr-MQ	3570311		\r	\N	\N
140	MR	MRT	478	MR	Mauritania	Nouakchott	1030700	3205060	AF	.mr	MRO	Ouguiya	222			ar-MR,fuc,snk,fr,mey,wo	2378080	SN,DZ,EH,ML	\r	\N	\N
141	MU	MUS	480	MP	Mauritius	Port Louis	2040	1294104	AF	.mu	MUR	Rupee	230			en-MU,bho,fr	934292		\r	\N	\N
142	YT	MYT	175	MF	Mayotte	Mamoudzou	374	159042	AF	.yt	EUR	Euro	262	#####	^(d{5})$	fr-YT	1024031		\r	\N	\N
144	FM	FSM	583	FM	Micronesia	Palikir	702	107708	OC	.fm	USD	Dollar	691	#####	^(d{5})$	en-FM,chk,pon,yap,kos,uli,woe,nkr,kpg	2081918		\r	\N	\N
145	MD	MDA	498	MD	Moldova	Chisinau	33843	4324000	EU	.md	MDL	Leu	373	MD-####	^(?:MD)*(d{4})$	ro,ru,gag,tr	617790	RO,UA	\r	\N	\N
146	MC	MCO	492	MN	Monaco	Monaco	1.94999999999999996	32965	EU	.mc	EUR	Euro	377	#####	^(d{5})$	fr-MC,en,it	2993457	FR	\r	\N	\N
147	MN	MNG	496	MG	Mongolia	Ulan Bator	1565000	3086918	AS	.mn	MNT	Tugrik	976	######	^(d{6})$	mn,ru	2029969	CN,RU	\r	\N	\N
148	ME	MNE	499	MJ	Montenegro	Podgorica	14026	666730	EU	.me	EUR	Euro	382	#####	^(d{5})$	sr,hu,bs,sq,hr,rom	3194884	AL,HR,BA,RS,XK	\r	\N	\N
149	MS	MSR	500	MH	Montserrat	Plymouth	102	9341	NA	.ms	XCD	Dollar	+1-664			en-MS	3578097		\r	\N	\N
150	MA	MAR	504	MO	Morocco	Rabat	446550	31627428	AF	.ma	MAD	Dirham	212	#####	^(d{5})$	ar-MA,fr	2542007	DZ,EH,ES	\r	\N	\N
151	MZ	MOZ	508	MZ	Mozambique	Maputo	801590	22061451	AF	.mz	MZN	Metical	258	####	^(d{4})$	pt-MZ,vmw	1036973	ZW,TZ,SZ,ZA,ZM,MW	\r	\N	\N
152	MM	MMR	104	BM	Myanmar	Nay Pyi Taw	678500	53414374	AS	.mm	MMK	Kyat	95	#####	^(d{5})$	my	1327865	CN,LA,TH,BD,IN	\r	\N	\N
153	NA	NAM	516	WA	Namibia	Windhoek	825418	2128471	AF	.na	NAD	Dollar	264			en-NA,af,de,hz,naq	3355338	ZA,BW,ZM,AO	\r	\N	\N
154	NR	NRU	520	NR	Nauru	Yaren	21	10065	OC	.nr	AUD	Dollar	674			na,en-NR	2110425		\r	\N	\N
155	NP	NPL	524	NP	Nepal	Kathmandu	140800	28951852	AS	.np	NPR	Rupee	977	#####	^(d{5})$	ne,en	1282988	CN,IN	\r	\N	\N
156	NL	NLD	528	NL	Netherlands	Amsterdam	41526	16645000	EU	.nl	EUR	Euro	31	#### @@	^(d{4}[A-Z]{2})$	nl-NL,fy-NL	2750405	DE,BE	\r	\N	\N
157	AN	ANT	530	NT	Netherlands Antilles	Willemstad	960	136197	NA	.an	ANG	Guilder	599			nl-AN,en,es	0	GP	\r	\N	\N
158	NC	NCL	540	NC	New Caledonia	Noumea	19060	216494	OC	.nc	XPF	Franc	687	#####	^(d{5})$	fr-NC	2139685		\r	\N	\N
159	NZ	NZL	554	NZ	New Zealand	Wellington	268680	4252277	OC	.nz	NZD	Dollar	64	####	^(d{4})$	en-NZ,mi	2186224		\r	\N	\N
160	NI	NIC	558	NU	Nicaragua	Managua	129494	5995928	NA	.ni	NIO	Cordoba	505	###-###-#	^(d{7})$	es-NI,en	3617476	CR,HN	\r	\N	\N
161	NE	NER	562	NG	Niger	Niamey	1267000	15878271	AF	.ne	XOF	Franc	227	####	^(d{4})$	fr-NE,ha,kr,dje	2440476	TD,BJ,DZ,LY,BF,NG,ML	\r	\N	\N
162	NG	NGA	566	NI	Nigeria	Abuja	923768	154000000	AF	.ng	NGN	Naira	234	######	^(d{6})$	en-NG,ha,yo,ig,ff	2328926	TD,NE,BJ,CM	\r	\N	\N
163	NU	NIU	570	NE	Niue	Alofi	260	2166	OC	.nu	NZD	Dollar	683			niu,en-NU	4036232		\r	\N	\N
164	NF	NFK	574	NF	Norfolk Island	Kingston	34.6000000000000014	1828	OC	.nf	AUD	Dollar	672			en-NF	2155115		\r	\N	\N
165	KP	PRK	408	KN	North Korea	Pyongyang	120540	22912177	AS	.kp	KPW	Won	850	###-###	^(d{6})$	ko-KP	1873107	CN,KR,RU	\r	\N	\N
166	MP	MNP	580	CQ	Northern Mariana Islands	Saipan	477	53883	OC	.mp	USD	Dollar	+1-670			fil,tl,zh,ch-MP,en-MP	4041468		\r	\N	\N
167	NO	NOR	578	NO	Norway	Oslo	324220	4985870	EU	.no	NOK	Krone	47	####	^(d{4})$	no,nb,nn,se,fi	3144096	FI,RU,SE	\r	\N	\N
168	OM	OMN	512	MU	Oman	Muscat	212460	2967717	AS	.om	OMR	Rial	968	###	^(d{3})$	ar-OM,en,bal,ur	286963	SA,YE,AE	\r	\N	\N
169	PK	PAK	586	PK	Pakistan	Islamabad	803940	184404791	AS	.pk	PKR	Rupee	92	#####	^(d{5})$	ur-PK,en-PK,pa,sd,ps,brh	1168579	CN,AF,IR,IN	\r	\N	\N
170	PW	PLW	585	PS	Palau	Melekeok	458	19907	OC	.pw	USD	Dollar	680	96940	^(96940)$	pau,sov,en-PW,tox,ja,fil,zh	1559582		\r	\N	\N
171	PS	PSE	275	WE	Palestinian Territory	East Jerusalem	5970	3800000	AS	.ps	ILS	Shekel	970			ar-PS	6254930	JO,IL	\r	\N	\N
172	PA	PAN	591	PM	Panama	Panama City	78200	3410676	NA	.pa	PAB	Balboa	507			es-PA,en	3703430	CR,CO	\r	\N	\N
173	PG	PNG	598	PP	Papua New Guinea	Port Moresby	462840	6064515	OC	.pg	PGK	Kina	675	###	^(d{3})$	en-PG,ho,meu,tpi	2088628	ID	\r	\N	\N
174	PY	PRY	600	PA	Paraguay	Asuncion	406750	6375830	SA	.py	PYG	Guarani	595	####	^(d{4})$	es-PY,gn	3437598	BO,BR,AR	\r	\N	\N
175	PE	PER	604	PE	Peru	Lima	1285220	29907003	SA	.pe	PEN	Sol	51			es-PE,qu,ay	3932488	EC,CL,BO,BR,CO	\r	\N	\N
176	PH	PHL	608	RP	Philippines	Manila	300000	99900177	AS	.ph	PHP	Peso	63	####	^(d{4})$	tl,en-PH,fil	1694008		\r	\N	\N
177	PN	PCN	612	PC	Pitcairn	Adamstown	47	46	OC	.pn	NZD	Dollar	870			en-PN	4030699		\r	\N	\N
178	PL	POL	616	PL	Poland	Warsaw	312685	38500000	EU	.pl	PLN	Zloty	48	##-###	^(d{5})$	pl	798544	DE,LT,SK,CZ,BY,UA,RU	\r	\N	\N
179	PT	PRT	620	PO	Portugal	Lisbon	92391	10676000	EU	.pt	EUR	Euro	351	####-###	^(d{7})$	pt-PT,mwl	2264397	ES	\r	\N	\N
180	PR	PRI	630	RQ	Puerto Rico	San Juan	9104	3916632	NA	.pr	USD	Dollar	+1-787 and	#####-####	^(d{9})$	en-PR,es-PR	4566966		\r	\N	\N
181	QA	QAT	634	QA	Qatar	Doha	11437	840926	AS	.qa	QAR	Rial	974			ar-QA,es	289688	SA	\r	\N	\N
182	CG	COG	178	CF	Republic of the Congo	Brazzaville	342000	3039126	AF	.cg	XAF	Franc	242			fr-CG,kg,ln-CG	2260494	CF,GA,CD,CM,AO	\r	\N	\N
183	RE	REU	638	RE	Reunion	Saint-Denis	2517	776948	AF	.re	EUR	Euro	262	#####	^((97)|(98)(4|7|8)d{	fr-RE	935317		\r	\N	\N
184	RO	ROU	642	RO	Romania	Bucharest	237500	21959278	EU	.ro	RON	Leu	40	######	^(d{6})$	ro,hu,rom	798549	MD,HU,UA,CS,BG,RS	\r	\N	\N
185	RU	RUS	643	RS	Russia	Moscow	17100000	140702000	EU	.ru	RUB	Ruble	7	######	^(d{6})$	ru,tt,xal,cau,ady,kv,ce,tyv,cv,udm,tut,mns,bua,myv,mdf,chm,ba,inh,tut,kbd,krc,ava,sah,nog	2017370	GE,CN,BY,UA,KZ,LV,PL	\r	\N	\N
186	RW	RWA	646	RW	Rwanda	Kigali	26338	11055976	AF	.rw	RWF	Franc	250			rw,en-RW,fr-RW,sw	49518	TZ,CD,BI,UG	\r	\N	\N
187	BL	BLM	652	TB	Saint Barthelemy	Gustavia	21	8450	NA	.gp	EUR	Euro	590	### ###		fr	3578476		\r	\N	\N
188	SH	SHN	654	SH	Saint Helena	Jamestown	410	7460	AF	.sh	SHP	Pound	290	STHL 1ZZ	^(STHL1ZZ)$	en-SH	3370751		\r	\N	\N
189	KN	KNA	659	SC	Saint Kitts and Nevis	Basseterre	261	49898	NA	.kn	XCD	Dollar	+1-869			en-KN	3575174		\r	\N	\N
190	LC	LCA	662	ST	Saint Lucia	Castries	616	160922	NA	.lc	XCD	Dollar	+1-758			en-LC	3576468		\r	\N	\N
191	MF	MAF	663	RN	Saint Martin	Marigot	53	35925	NA	.gp	EUR	Euro	590	### ###		fr	3578421	SX	\r	\N	\N
192	PM	SPM	666	SB	Saint Pierre and Miquelon	Saint-Pierre	242	7012	NA	.pm	EUR	Euro	508	#####	^(97500)$	fr-PM	3424932		\r	\N	\N
193	VC	VCT	670	VC	Saint Vincent and the Grenadines	Kingstown	389	104217	NA	.vc	XCD	Dollar	+1-784			en-VC,fr	3577815		\r	\N	\N
194	WS	WSM	882	WS	Samoa	Apia	2944	192001	OC	.ws	WST	Tala	685			sm,en-WS	4034894		\r	\N	\N
195	SM	SMR	674	SM	San Marino	San Marino	61.2000000000000028	31477	EU	.sm	EUR	Euro	378	4789#	^(4789d)$	it-SM	3168068	IT	\r	\N	\N
196	ST	STP	678	TP	Sao Tome and Principe	Sao Tome	1001	175808	AF	.st	STD	Dobra	239			pt-ST	2410758		\r	\N	\N
197	SA	SAU	682	SA	Saudi Arabia	Riyadh	1960582	25731776	AS	.sa	SAR	Rial	966	#####	^(d{5})$	ar-SA	102358	QA,OM,IQ,YE,JO,AE,KW	\r	\N	\N
198	SN	SEN	686	SG	Senegal	Dakar	196190	12323252	AF	.sn	XOF	Franc	221	#####	^(d{5})$	fr-SN,wo,fuc,mnk	2245662	GN,MR,GW,GM,ML	\r	\N	\N
199	RS	SRB	688	RI	Serbia	Belgrade	88361	7344847	EU	.rs	RSD	Dinar	381	######	^(d{6})$	sr,hu,bs,rom	6290252	AL,HU,MK,RO,HR,BA,BG	\r	\N	\N
200	CS	SCG	891	YI	Serbia and Montenegro	Belgrade	102350	10829175	EU	.cs	RSD	Dinar	381	#####	^(d{5})$	cu,hu,sq,sr	0	AL,HU,MK,RO,HR,BA,BG	\r	\N	\N
201	SC	SYC	690	SE	Seychelles	Victoria	455	88340	AF	.sc	SCR	Rupee	248			en-SC,fr-SC	241170		\r	\N	\N
202	SL	SLE	694	SL	Sierra Leone	Freetown	71740	5245695	AF	.sl	SLL	Leone	232			en-SL,men,tem	2403846	LR,GN	\r	\N	\N
203	SG	SGP	702	SN	Singapore	Singapur	692.700000000000045	4701069	AS	.sg	SGD	Dollar	65	######	^(d{6})$	cmn,en-SG,ms-SG,ta-SG,zh-SG	1880251		\r	\N	\N
204	SX	SXM	534	NN	Sint Maarten	Philipsburg	0	37429	NA	.sx	ANG	Guilder	599			nl,en	7609695	MF	\r	\N	\N
205	SK	SVK	703	LO	Slovakia	Bratislava	48845	5455000	EU	.sk	EUR	Euro	421	###  ##	^(d{5})$	sk,hu	3057568	PL,HU,CZ,UA,AT	\r	\N	\N
206	SI	SVN	705	SI	Slovenia	Ljubljana	20273	2007000	EU	.si	EUR	Euro	386	SI- ####	^(?:SI)*(d{4})$	sl,sh	3190538	HU,IT,HR,AT	\r	\N	\N
207	SB	SLB	90	BP	Solomon Islands	Honiara	28450	559198	OC	.sb	SBD	Dollar	677			en-SB,tpi	2103350		\r	\N	\N
208	SO	SOM	706	SO	Somalia	Mogadishu	637657	10112453	AF	.so	SOS	Shilling	252	@@  #####	^([A-Z]{2}d{5})$	so-SO,ar-SO,it,en-SO	51537	ET,KE,DJ	\r	\N	\N
209	ZA	ZAF	710	SF	South Africa	Pretoria	1219912	49000000	AF	.za	ZAR	Rand	27	####	^(d{4})$	zu,xh,af,nso,en-ZA,tn,st,ts,ss,ve,nr	953987	ZW,SZ,MZ,BW,NA,LS	\r	\N	\N
210	GS	SGS	239	SX	South Georgia and the South Sandwich Islands	Grytviken	3903	30	AN	.gs	GBP	Pound				en	3474415		\r	\N	\N
211	KR	KOR	410	KS	South Korea	Seoul	98480	48422644	AS	.kr	KRW	Won	82	SEOUL ###-###	^(?:SEOUL)*(d{6})$	ko-KR,en	1835841	KP	\r	\N	\N
212	SS	SSD	728	OD	South Sudan	Juba	644329	8260490	AF		SSP	Pound	211			en	7909807	CD,CF,ET,KE,SD,UG,	\r	\N	\N
213	ES	ESP	724	SP	Spain	Madrid	504782	46505963	EU	.es	EUR	Euro	34	#####	^(d{5})$	es-ES,ca,gl,eu,oc	2510769	AD,PT,GI,FR,MA	\r	\N	\N
214	LK	LKA	144	CE	Sri Lanka	Colombo	65610	21513990	AS	.lk	LKR	Rupee	94	#####	^(d{5})$	si,ta,en	1227603		\r	\N	\N
215	SD	SDN	729	SU	Sudan	Khartoum	1861484	35000000	AF	.sd	SDG	Pound	249	#####	^(d{5})$	ar-SD,en,fia	366755	SS,TD,EG,ET,ER,LY,CF	\r	\N	\N
216	SR	SUR	740	NS	Suriname	Paramaribo	163270	492829	SA	.sr	SRD	Dollar	597			nl-SR,en,srn,hns,jv	3382998	GY,BR,GF	\r	\N	\N
217	SJ	SJM	744	SV	Svalbard and Jan Mayen	Longyearbyen	62049	2550	EU	.sj	NOK	Krone	47			no,ru	607072		\r	\N	\N
218	SZ	SWZ	748	WZ	Swaziland	Mbabane	17363	1354051	AF	.sz	SZL	Lilangeni	268	@###	^([A-Z]d{3})$	en-SZ,ss-SZ	934841	ZA,MZ	\r	\N	\N
219	SE	SWE	752	SW	Sweden	Stockholm	449964	9045000	EU	.se	SEK	Krona	46	SE-### ##	^(?:SE)*(d{5})$	sv-SE,se,sma,fi-SE	2661886	NO,FI	\r	\N	\N
220	CH	CHE	756	SZ	Switzerland	Berne	41290	7581000	EU	.ch	CHF	Franc	41	####	^(d{4})$	de-CH,fr-CH,it-CH,rm	2658434	DE,IT,LI,FR,AT	\r	\N	\N
221	SY	SYR	760	SY	Syria	Damascus	185180	22198110	AS	.sy	SYP	Pound	963			ar-SY,ku,hy,arc,fr,en	163843	IQ,JO,IL,TR,LB	\r	\N	\N
222	TW	TWN	158	TW	Taiwan	Taipei	35980	22894384	AS	.tw	TWD	Dollar	886	#####	^(d{5})$	zh-TW,zh,nan,hak	1668284		\r	\N	\N
223	TJ	TJK	762	TI	Tajikistan	Dushanbe	143100	7487489	AS	.tj	TJS	Somoni	992	######	^(d{6})$	tg,ru	1220409	CN,AF,KG,UZ	\r	\N	\N
224	TZ	TZA	834	TZ	Tanzania	Dodoma	945087	41892895	AF	.tz	TZS	Shilling	255			sw-TZ,en,ar	149590	MZ,KE,CD,RW,ZM,BI,UG	\r	\N	\N
225	TH	THA	764	TH	Thailand	Bangkok	514000	67089500	AS	.th	THB	Baht	66	#####	^(d{5})$	th,en	1605651	LA,MM,KH,MY	\r	\N	\N
226	TG	TGO	768	TO	Togo	Lome	56785	6587239	AF	.tg	XOF	Franc	228			fr-TG,ee,hna,kbp,dag,ha	2363686	BJ,GH,BF	\r	\N	\N
227	TK	TKL	772	TL	Tokelau		10	1466	OC	.tk	NZD	Dollar	690			tkl,en-TK	4031074		\r	\N	\N
228	TO	TON	776	TN	Tonga	Nuku'alofa	748	122580	OC	.to	TOP	Pa'anga	676			to,en-TO	4032283		\r	\N	\N
229	TT	TTO	780	TD	Trinidad and Tobago	Port of Spain	5128	1228691	NA	.tt	TTD	Dollar	+1-868			en-TT,hns,fr,es,zh	3573591		\r	\N	\N
230	TN	TUN	788	TS	Tunisia	Tunis	163610	10589025	AF	.tn	TND	Dinar	216	####	^(d{4})$	ar-TN,fr	2464461	DZ,LY	\r	\N	\N
231	TR	TUR	792	TU	Turkey	Ankara	780580	77804122	AS	.tr	TRY	Lira	90	#####	^(d{5})$	tr-TR,ku,diq,az,av	298795	SY,GE,IQ,IR,GR,AM,AZ	\r	\N	\N
232	TM	TKM	795	TX	Turkmenistan	Ashgabat	488100	4940916	AS	.tm	TMT	Manat	993	######	^(d{6})$	tk,ru,uz	1218197	AF,IR,UZ,KZ	\r	\N	\N
233	TC	TCA	796	TK	Turks and Caicos Islands	Cockburn Town	430	20556	NA	.tc	USD	Dollar	+1-649	TKCA 1ZZ	^(TKCA 1ZZ)$	en-TC	3576916		\r	\N	\N
234	TV	TUV	798	TV	Tuvalu	Funafuti	26	10472	OC	.tv	AUD	Dollar	688			tvl,en,sm,gil	2110297		\r	\N	\N
235	VI	VIR	850	VQ	U.S. Virgin Islands	Charlotte Amalie	352	108708	NA	.vi	USD	Dollar	+1-340			en-VI	4796775		\r	\N	\N
236	UG	UGA	800	UG	Uganda	Kampala	236040	33398682	AF	.ug	UGX	Shilling	256			en-UG,lg,sw,ar	226074	TZ,KE,SS,CD,RW	\r	\N	\N
237	UA	UKR	804	UP	Ukraine	Kiev	603700	45415596	EU	.ua	UAH	Hryvnia	380	#####	^(d{5})$	uk,ru-UA,rom,pl,hu	690791	PL,MD,HU,SK,BY,RO,RU	\r	\N	\N
238	AE	ARE	784	AE	United Arab Emirates	Abu Dhabi	82880	4975593	AS	.ae	AED	Dirham	971			ar-AE,fa,en,hi,ur	290557	SA,OM	\r	\N	\N
239	GB	GBR	826	UK	United Kingdom	London	244820	62348447	EU	.uk	GBP	Pound	44	@# #@@|@## #@@|@@# #	^(([A-Z]d{2}[A-Z]{2}	en-GB,cy-GB,gd	2635167	IE	\r	\N	\N
240	US	USA	840	US	United States	Washington	9629091	310232863	NA	.us	USD	Dollar	1	#####-####	^(d{9})$	en-US,es-US,haw,fr	6252001	CA,MX,CU	\r	\N	\N
241	UM	UMI	581		United States Minor Outlying Islands		0	0	OC	.um	USD	Dollar	1			en-UM	5854968		\r	\N	\N
242	UY	URY	858	UY	Uruguay	Montevideo	176220	3477000	SA	.uy	UYU	Peso	598	#####	^(d{5})$	es-UY	3439705	BR,AR	\r	\N	\N
243	UZ	UZB	860	UZ	Uzbekistan	Tashkent	447400	27865738	AS	.uz	UZS	Som	998	######	^(d{6})$	uz,ru,tg	1512440	TM,AF,KG,TJ,KZ	\r	\N	\N
244	VU	VUT	548	NH	Vanuatu	Port Vila	12200	221552	OC	.vu	VUV	Vatu	678			bi,en-VU,fr-VU	2134431		\r	\N	\N
245	VA	VAT	336	VT	Vatican	Vatican City	0.440000000000000002	921	EU	.va	EUR	Euro	379			la,it,fr	3164670	IT	\r	\N	\N
246	VE	VEN	862	VE	Venezuela	Caracas	912050	27223228	SA	.ve	VEF	Bolivar	58	####	^(d{4})$	es-VE	3625428	GY,BR,CO	\r	\N	\N
247	VN	VNM	704	VM	Vietnam	Hanoi	329560	89571130	AS	.vn	VND	Dong	84	######	^(d{6})$	vi,en,fr,zh,km	1562822	CN,LA,KH	\r	\N	\N
248	WF	WLF	876	WF	Wallis and Futuna	Mata Utu	274	16025	OC	.wf	XPF	Franc	681	#####	^(986d{2})$	wls,fud,fr-WF	4034749		\r	\N	\N
249	EH	ESH	732	WI	Western Sahara	El-Aaiun	266000	273008	AF	.eh	MAD	Dirham	212			ar,mey	2461445	DZ,MR,MA	\r	\N	\N
250	YE	YEM	887	YM	Yemen	Sanaa	527970	23495361	AS	.ye	YER	Rial	967			ar-YE	69543	SA,OM	\r	\N	\N
251	ZM	ZMB	894	ZA	Zambia	Lusaka	752614	13460305	AF	.zm	ZMK	Kwacha	260	#####	^(d{5})$	en-ZM,bem,loz,lun,lue,ny,toi	895949	ZW,TZ,MZ,CD,NA,MW,AO	\r	\N	\N
252	ZW	ZWE	716	ZI	Zimbabwe	Harare	390580	11651858	AF	.zw	ZWL	Dollar	263			en-ZW,sn,nr,nd	878675	ZA,MZ,BW,ZM	\r	\N	\N
\.


--
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('countries_id_seq', 252, true);


--
-- Data for Name: coupons; Type: TABLE DATA; Schema: public; Owner: -
--

COPY coupons (id, created_at, updated_at, coupon_code, max_number_of_time_can_use, max_number_of_time_can_use_per_user, coupon_used_count, discount, discount_type_id, min_amount, coupon_expiry_date, is_active) FROM stdin;
\.


--
-- Name: coupons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('coupons_id_seq', 1, false);


--
-- Data for Name: credit_purchase_logs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY credit_purchase_logs (id, created_at, updated_at, user_id, credit_purchase_plan_id, credit_count, price, discount_percentage, original_price, payment_gateway_id, gateway_id, is_payment_completed, coupon_id, is_active, used_credit_count, paypal_pay_key, expiry_date) FROM stdin;
\.


--
-- Data for Name: credit_purchase_plans; Type: TABLE DATA; Schema: public; Owner: -
--

COPY credit_purchase_plans (id, created_at, updated_at, name, no_of_credits, price, discount_percentage, original_price, is_active, day_limit, is_welcome_plan) FROM stdin;
1	2016-12-14 15:13:42	2016-12-14 15:13:42	Premium	100	45	10	50	t	\N	f
2	2016-12-14 15:15:47	2016-12-14 15:15:47	Gold	250	90	10	100	t	\N	f
3	2016-12-14 15:17:51	2016-12-14 15:17:51	Platinum	500	170	15	200	t	\N	f
5	2017-05-25 17:17:51	2017-05-25 17:17:51	Welcome Plan	10	0	0	0	t	14	t
\.


--
-- Data for Name: discount_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY discount_types (id, created_at, updated_at, name) FROM stdin;
1	2017-01-06 12:11:52	2017-01-06 12:11:52	Percentage
2	2017-01-06 12:11:52	2017-01-06 12:11:52	Amount
\.


--
-- Name: discount_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('discount_types_id_seq', 2, true);


--
-- Data for Name: dispute_closed_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY dispute_closed_types (id, name, dispute_open_type_id, project_role_id, reason, resolve_type, action_list) FROM stdin;
3	\N	2	4	Employer given poor feedback	Rating will be updated	<li>Freelancer rating will be updated with expected one.</li>
4	\N	2	3	Employer given proper feedback	Resolved without any change	<li>Resolved without any change.</li>
5	\N	3	4	Project matched the project requirements	Project will be closed and funds moved to freelancer	<li>Remaining escrow amount move to freelancer.</li><li>Project status moved to "Final Review Pending" or "Completed".</li>
6	\N	3	3	Project does not match the project requirements	Refunded & Canceled Project	<li>Remaining escrow amount move to employer wallet.</li><li>Project status moved to "Canceled by Admin".</li>
7	\N	4	4	Freelancer given proper feedback	Resolved without any change	<li>Remaining escrow amount move to freelancer.</li><li>Project status moved to "Final Review Pending" or "Completed".</li>
8	\N	4	3	Freelancer given poor feedback	Rating will be updated	<li>Employer rating will be updated with expected one.</li>
1	\N	1	3	Employer giving more work without reason	Refunded & Canceled Project	<li>Remaining escrow amount move to employer wallet.</li><li>Project status move to "Canceled by Admin".</li>
2	\N	1	4	The work given as per project description and the work need to be completed	Project moved to development again	<li>Project status move to "Under Development" for rework.</li>
\.


--
-- Name: dispute_closed_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('dispute_closed_types_id_seq', 8, true);


--
-- Data for Name: dispute_open_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY dispute_open_types (id, created_at, updated_at, name, project_role_id, is_active) FROM stdin;
1	2011-09-19 11:17:43	2011-09-19 11:17:43	Employer giving more work without reason	4	t
2	2011-09-19 11:17:43	2011-09-19 11:17:43	Employer given poor feedback	4	t
3	2011-09-19 11:18:50	2011-09-19 11:18:50	Project does not match the project requirements	3	t
4	2011-09-19 11:18:50	2011-09-19 11:18:50	Freelancer given poor feedback	3	t
\.


--
-- Name: dispute_open_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('dispute_open_types_id_seq', 4, true);


--
-- Data for Name: dispute_statuses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY dispute_statuses (id, created_at, updated_at, name) FROM stdin;
1	2010-12-22 10:46:41	2010-12-22 10:46:41	Open
2	2010-12-22 10:46:41	2010-12-22 10:46:41	Under Discussion
3	2010-12-22 10:46:41	2010-12-22 10:46:41	Waiting for Administrator Decision
4	2010-12-22 10:46:41	2010-12-22 10:46:41	Closed
\.


--
-- Name: dispute_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('dispute_statuses_id_seq', 4, true);


--
-- Data for Name: educations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY educations (id, created_at, updated_at, user_id, country_id, title, from_year, to_year) FROM stdin;
\.


--
-- Name: educations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('educations_id_seq', 3, true);


--
-- Data for Name: email_templates; Type: TABLE DATA; Schema: public; Owner: -
--

COPY email_templates (id, created_at, updated_at, "from", reply_to, name, description, subject, text_email_content, html_email_content, notification_content, email_variables, is_html, is_notify, display_name) FROM stdin;
77	2015-07-02 16:11:45	2015-07-02 16:11:45	##FROM_EMAIL##		Work Completed Notification	we will send this mail, when the work get completed.	"##REQUEST_NAME##" has completed by ##FREELANCER##	Hi ##EMPLOYER##,\n\n"##REQUEST_NAME##" has completed by ##FREELANCER##.\nClick below link to send response.\n##RESPONSE_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N	SITE_NAME, SITE_URL,FREELANCER,EMPLOYER,RESPONSE_URL,BUSINESSNAME,RESPONSE_URL	f	f	Work Completed Notification
8	2009-05-22 16:48:38	2015-04-10 14:21:46	##FROM_EMAIL##		Admin User Deactivate	We will send this mail to user, when user deactive by administator.	[##SITE_NAME##] Your ##SITE_NAME## account has been deactivated	Hi ##USERNAME##,\n\nYour ##SITE_NAME## account has been deactivated.\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N	SITE_NAME,USERNAME	f	f	Admin User Deactivate
60	2014-05-20 15:36:00	2015-04-11 08:51:37	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Portfolio Review Added	When a review added for a portfolio we will send this to the portfolio owner.	[##SITE_NAME##][##PORTFOLIO_NAME##] New review has been added	Dear ##USERNAME##,\n\t\n##REVIEW_USER## has added review on portfolio ##PORTFOLIO_NAME##.\n\nPlease click the following link to view the portfolio,\n##PORTFOLIO_LINK##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		##REVIEW_USER## has added review on portfolio ##PORTFOLIO_NAME##.		f	t	Portfolio Review Added
76	2015-07-02 16:11:45	2015-07-02 16:11:45	##FROM_EMAIL##		Work Closed Notification	we will send this mail, when the work closed.	##EMPLOYER## marked as closed for "##REQUEST_NAME##"	Hi ##FREELANCER##,\n\n##EMPLOYER## marked as closed for "##REQUEST_NAME##"\nClick below link for more information.\n##RESPONSE_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N	SITE_NAME, SITE_URL,FREELANCER,CUSTOMERNAME,RESPONSE_URL,BUSINESSNAME,RESPONSE_URL	f	f	Work Closed Notification
78	2016-01-20 16:11:45	2016-01-20 16:11:45	##FROM_EMAIL##		Start Skill Test Notification	we will send this mail, when freelancer paid fee for skill test.	Start your skill test - ##EXAM##	Hi ##USERNAME##,\r\n\r\nYour payment of skill test "##EXAM##" is received. \r\n\nPlease follow the below link to start skill test now. \r\n\n##EXAM_LINK##\r\n\nIf you already taken this exam please ignore this mail.\r\n\n\r\nThanks,\r\n##SITE_NAME##\r\n##SITE_URL##		\N	SITE_NAME, SITE_URL, USERNAME, EXAM, EXAM_LINK	f	f	Start Skill Test Notification
58	2014-05-12 19:39:00	2015-04-11 08:50:04	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Portfolio Favorite Added	This is sent to portfolio owner when portfolio is favorited.	[##SITE_NAME##][##PORTFOLIO_NAME##] Portfolio has been favorited	Dear ##USERNAME##,\n\nThe portfolio ##PORTFOLIO_NAME## has been favorited by ##FAV_USERNAME##.\n\nPlease click the following link to view the portfolio,\n##PORTFOLIO_LINK##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		##FAV_USERNAME## favorited portfolio ##PORTFOLIO_NAME##.	USERNAME, PORTFOLIO_NAME, SITE_NAME, SITE_URL, FAV_USERNAME, PORTFOLIO_LINK	f	t	Portfolio Favorite Added
81	2017-01-05 12:16:22	2017-01-05 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	newcontestentry	We will send this mail to\ncontest owner, when a user posts a new entry.	There is a new entry for your contest!!!	Hi ##USERNAME##,\n\nYour contest ##CONTEST## got a new entry!!!\n\nClick the below link to check it out..\n\n##CONTEST##\nEntry Details:\nEntry No: ###ENTRY_ID##\nPosted User: #OTHER_USERNAME##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N	USERNAME,CONTEST_NAME,SITE_NAME,CONTEST_HOLDER,CONTEST_URL	f	t	New Contest Entry
82	2017-01-05 12:16:22	2017-01-05 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	newcontest	we will send this when a new contest is added.	New contest added - ##CONTEST_NAME##	Dear Admin,\n\nNew contest added.\n\nContest Name: ##CONTEST_NAME##\nContest Holder: ##CONTEST_HOLDER##\nURL: ##CONTEST_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N	USERNAME,CONTEST_NAME,SITE_NAME,CONTEST_HOLDER,CONTEST_URL	f	t	New Contest
83	2017-01-05 12:16:22	2017-01-05 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	newcontestforparticipants	we will send this when a new contest is added to all previous participants.	New contest added - ##CONTEST_NAME##	Dear ##USER_NAME##,\n\nNew contest was added in ##SITE_NAME## by ##CONTEST_HOLDER##. To view the contest click the below URL, ##CONTEST_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N	USERNAME,CONTEST_NAME,SITE_NAME,CONTEST_HOLDER,CONTEST_URL	f	t	New Contest For Participants
84	2017-01-05 12:16:22	2017-01-05 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	conteststatuschangealert	we will send this mail, when we change the contest status.	[##CONTEST_NAME##] Status changed	Dear ##PARTICIPANT##,\n\nThe "##CONTEST_NAME##" contest was ##CONTEST_STATUS## in ##SITE_NAME##.\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N	USERNAME,CONTEST_NAME,SITE_NAME,CONTEST_HOLDER,CONTEST_URL,CONTEST_STATUS	f	t	Contest Status Change Alert
85	2017-01-05 12:16:22	2017-01-05 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	entrystatuschangealert	we will send this mail, when we change the contest entry status.	[##CONTEST_NAME##] Entry Status changed	Dear ##USERNAME##,\n\nThe status of the contest "##CONTEST_NAME##" entry is changed from "##PREVIOUS_STATUS##" to "##CURRENT_STATUS##".\n\n##CONTEST_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N	USERNAME,CONTEST_NAME,SITE_NAME,CONTEST_HOLDER,CONTEST_URL	f	t	Entry Status Change Alert
66	2015-07-02 16:11:45	2015-07-02 16:11:45	##FROM_EMAIL##		Quote - Feedback Updated Notification	we will send this mail, when user update the feedback.	Feedback updated for "##REQUEST_NAME##"	Hi ##FREELANCER##,\n\nFeedback updated for "##REQUEST_NAME##" from ##EMPLOYER##\nClick below link for more information.\n##RESPONSE_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N	SITE_NAME, SITE_URL,FREELANCER,EMPLOYER,RESPONSE_URL,BUSINESSNAME,RESPONSE_URL	f	f	Quote - Feedback Updated Notification
86	2017-01-05 12:16:22	2017-01-05 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	contestactivityalert	we will send this mail, when we change the contest status.	[##CONTEST_NAME##] Status changed: ##PREVIOUS_STATUS## -> ##CURRENT_STATUS##	Dear ##USERNAME##,\n\nThe status of the contest "##CONTEST_NAME##" is changed from "##PREVIOUS_STATUS##" to "##CURRENT_STATUS##".\n\n##CONTEST_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N		f	t	Activity Alert Mail
69	2015-07-02 16:11:45	2015-07-02 16:11:45	##FROM_EMAIL##		New Quote Request Received Notification	System will send this mail to freelancer when new quote request received.	[##SITE_NAME##] Quote request received for ##CATEGORY_NAME##	Hi ##FREELANCER##,\n\n##EMPLOYER## requested quote for ##CATEGORY_NAME##.\n\nRequest: ##REQUEST_TITLE##\nDescription: ##REQUEST_DESCRIPTION##\nTime: ##PREFERRED_TIME##\nLocation: ##WORK_LOCATION##\n\nManage quote requests and works: ##MY_WORK_PAGE_LINK##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N	SITE_NAME, SITE_URL,FREELANCER,EMPLOYER,RESPONSE_URL,BUSINESSNAME,RESPONSE_URL	f	f	New Quote Request Received Notification
67	2015-07-02 16:11:45	2015-07-02 16:11:45	##FROM_EMAIL##		Hired Notification	we will send this mail, when provider hired by the requestor.	##EMPLOYER## hired you for "##REQUEST_NAME##"	Hi ##FREELANCER##,\r\n\r\n##EMPLOYER## hired you for "##REQUEST_NAME##"\r\nClick below link for more information.\r\n##RESPONSE_URL##\r\n\r\nThanks,\r\n##SITE_NAME##\r\n##SITE_URL##		\N	SITE_NAME, SITE_URL,FREELANCER,EMPLOYER,RESPONSE_URL,BUSINESSNAME,RESPONSE_URL	f	f	Hired Notification
56	2014-05-12 19:39:00	2015-04-11 08:48:06	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Project Favorite Added	This is sent to project owner when project is favorited.	[##SITE_NAME##][##PROJECT_NAME##] Project has been favorited	Dear ##USERNAME##,\n\nThe project ##PROJECT_NAME## has been favorited by ##FAV_USERNAME##.\n\nPlease click the following link to view the project,\n##PROJECT_LINK##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		##FAV_USERNAME## favorited project ##PROJECT_NAME##.	USERNAME, PROJECT_NAME, SITE_NAME, SITE_URL, FAV_USERNAME, PROJECT_LINK	f	t	Project Favorite Added
55	2014-05-12 19:28:00	2015-04-11 08:47:12	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Job Expired Alert	This is sent to admin, job employer when job is expired.	[##SITE_NAME##][##JOB_NAME##] Job has been expired	Dear ##USERNAME##,\n\nThe job ##JOB_NAME## has been expired on ##SITE_NAME##.\n\nPlease click the following link to view the job,\n##JOB_LINK##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		The job ##JOB_NAME## has been expired.	USERNAME, JOB_NAME, SITE_NAME, SITE_URL	f	t	Job Expired Alert
54	2014-05-12 19:23:00	2015-04-11 08:45:53	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Job Cancelled Alert	we will send this mail, when cancelled a job	[##SITE_NAME##][##JOB_NAME##] Job Cancelled	Dear ##USERNAME##,\n \nThe "##JOB_NAME##" job was cancelled in ##SITE_NAME##. \n\nThanks,\n##SITE_NAME##\n##SITE_URL##		The "##JOB_NAME##" job was cancelled.	JOB_NAME,SITE_NAME,SITE_URL,USER_NAME	f	t	Job Cancelled Alert
53	2014-05-12 18:32:00	2015-04-11 08:45:08	##FROM_EMAIL##	##REPLY_TO_EMAIL##	New portfolio opened	When new a new portfolio of favorite user opened.	[##SITE_NAME##] ##FAV_USERNAME##'s Portfolio Opened	Dear ##USERNAME##, \n\n##FAV_USERNAME## has added new portfolio [##PORTFOLIO_NAME##]. \n\nPlease click the following link to place your bid. \n##PORTFOLIO_LINK## \n\nThanks,\n##SITE_NAME##\n##SITE_URL##		##FAV_USERNAME## has added new portfolio ##PORTFOLIO_NAME##.	USERNAME,PORTFOLIO_NAME,PORTFOLIO_LINK,FAV_USERNAME	f	t	New portfolio opened
51	2010-11-12 19:54:29	2015-04-11 08:43:16	##FROM_EMAIL##	##REPLY_TO_EMAIL##	New job opened	When new a new job of favorite user opened.	[##SITE_NAME##] ##FAV_USERNAME##'s Job Opened	Dear ##USERNAME##,\n\n##FAV_USERNAME## has added new job [##JOB_NAME##]. \n\nPlease click the following link to place your bid.\n##JOB_LINK##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		##FAV_USERNAME## has added new job [##JOB_NAME##].	USERNAME,JOB_NAME,JOB_LINK,FAV_USERNAME	f	t	New job opened
52	2015-07-02 16:11:45	2015-04-11 08:44:14	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Admin Job Status Alert	we will send this when a job status change.	[##SITE_NAME##][##JOB_NAME##] Status: ##OLD_STATUS## -> ##NEW_STATUS##	Hi,\n\nStatus was changed for job "##JOB_NAME##".\n\nStatus: ##OLD_STATUS## -> ##NEW_STATUS##\n\nPlease click the following link to view the job,\n##JOB_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##\n		\N	OLD_STATUS,NEW_STATUS,JOB_NAME,JOB_URL,SITE_NAME,SITE_URL	f	f	Admin Job Status Alert
50	2014-04-23 00:00:00	2015-04-11 08:42:11	##FROM_EMAIL##	##REPLY_TO_EMAIL##	New Resume Notification	When new job apply was made, an internal message will be sent to the employer of the job notifiying an new resume.	[##SITE_NAME##][##JOB_TITLE##] New application has been received	Dear ##USERNAME##,\n\t\nNew application has been received.\nApplicant: ##APPLY_USERNAME##\n\nPlease click the following link to view the resume,\n##RESUMES_LINK##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		New application has been received from ##APPLY_USERNAME## for the Job ##JOB_TITLE##. ##RESUMES_LINK##	USERNAME,APPLY_USERNAME,JOB_TITLE,RESUMES_LINK	f	t	New Resume Notification
49	2014-03-10 11:19:26	2015-04-11 08:41:08	##FROM_EMAIL##		Admin Deduct Fund	we will send this mail to user, when a admin deduct fund from user wallet.	[##SITE_NAME##] Welcome to ##SITE_NAME##	Hi ##USERNAME##,\n\nAdmin deducted fund from your wallet. \n\nThanks, \n##SITE_NAME## \n##SITE_URL##		\N	SITE_NAME,USERNAME,SITE_URL	f	f	Admin Deduct Fund
48	2014-03-11 17:31:55	2015-04-11 08:40:35	##FROM_EMAIL##		Admin Add Fund	we will send this mail to user, when a admin add fund to user wallet.	[##SITE_NAME##] Welcome to ##SITE_NAME##	Hi ##USERNAME##, \n\nAdmin added fund to your wallet. \n\nThanks, \n##SITE_NAME## \n##SITE_URL##		\N	SITE_NAME,USERNAME,SITE_URL	f	f	Admin Add Fund
10	2009-07-07 15:47:09	2015-04-10 14:23:09	##FROM_EMAIL##		adminchangepassword	we will send this mail to user, when admin change user's password.	[##SITE_NAME##] Password changed	Hi ##USERNAME##,\n\nAdmin reset your password for your  ##SITE_NAME## account.\n\nYour new password: ##PASSWORD##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N	SITE_NAME,PASSWORD,USERNAME	f	f	Admin Change Password
41	2012-04-27 11:54:22	2015-04-11 08:34:02	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Work Completed Alert For Project Owner	when work marked as completed by freelancer, alert mail goes to employer	[##SITE_NAME##][##PROJECT_NAME##] work has been completed	Dear ##USERNAME##,\n\n##BUYER_USERNAME## has completed work for the project "##PROJECT_NAME##".\n\nPlease click the following link to view the project, ##PROJECT_LINK## \n\nThanks, \n##SITE_NAME##\n##SITE_URL##		\N	USERNAME,BUYER_USERNAME,PROJECT_NAME,PROJECT_LINK	f	f	Work Completed Alert For Project Owner
38	2012-04-27 12:14:27	2015-04-11 08:32:06	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Update Project Notification	When project updated, an internal message will be sent to the bidded freelancer.	[##SITE_NAME##][##PROJECT_NAME##] Project has been updated	Dear ##BUYER_USERNAME##,\n\t\n##USERNAME## has updated the project "##PROJECT_NAME##".\n\nPlease click the following link to view the project, ##PROJECT_LINK##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		##USERNAME## has updated the project "##PROJECT_NAME##".	USERNAME,BUYER_USERNAME,PROJECT_NAME,PROJECT_LINK,AMOUNT,DURATION	f	t	Update Project Notification
35	2015-07-02 16:11:45	2015-04-11 08:28:58	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Reject Mutual Cancel	we will send this when a user reject mutual cancel.	[##SITE_NAME##][##PROJECT_NAME##] "##PROJECT_NAME##" mutual cancel has been rejected	Hi ##USER##, \n\n"##PROJECT_NAME##" mutual cancel has been rejected. \n\nPlease click the following link to view details, ##PROJECT_LINK## \n\nThanks, \n##SITE_NAME## \n##SITE_URL##		\N	##USER##, ##PROJECT_NAME##, ##PROJECT_LINK##, ##SITE_NAME##, ##SITE_URL##	f	f	Reject Mutual Cancel
34	2015-07-02 16:11:45	2015-04-11 08:27:57	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Accept Mutual Cancel	we will send this when a user accept mutual cancel.	[##SITE_NAME##][##PROJECT_NAME##] "##PROJECT_NAME##" has been mutually cancelled	Hi ##USER##, \n\n"##PROJECT_NAME##" has been mutually cancelled. \n\nPlease click the following link to view details, ##PROJECT_LINK## \n\nThanks, \n##SITE_NAME## \n##SITE_URL##		\N	##USER##, ##PROJECT_NAME##, ##PROJECT_LINK##, ##SITE_NAME##, ##SITE_URL##	f	f	Accept Mutual Cancel
29	2015-07-02 16:11:45	2015-04-10 15:46:43	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Mutual Cancel Alert	we will send this when a project owner or developer request for mutual cancel.	[##SITE_NAME##][##PROJECT_NAME##]##USER## has requested for mutual cancel	Hi ##TO_USER##, \n\n##USER## has requested for mutual cancel for the project "##PROJECT_NAME##". \n\nPlease click the following link to view details, ##PROJECT_LINK## \n\nThanks, \n##SITE_NAME## \n##SITE_URL## 		\N	##TO_USER##, ##USER##, ##PROJECT_NAME##, ##PROJECT_URL##, ##SITE_NAME##, ##SITE_URL##	f	f	Mutual Cancel Alert
9	2009-05-22 16:50:25	2015-04-10 14:22:10	##FROM_EMAIL##		adminuserdelete	We will send this mail to user, when user delete by administrator.	[##SITE_NAME##] Your ##SITE_NAME## account has been removed	Hi ##USERNAME##,\n\nYour ##SITE_NAME## account has been removed.\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N	SITE_NAME,USERNAME	f	f	Admin User Delete
21	2015-07-02 16:11:45	2015-04-10 15:01:05	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Admin Project Status Alert	we will send this when a project status change.	[##SITE_NAME##][##PROJECT_NAME##] Status: ##OLD_STATUS## -> ##NEW_STATUS##	Hi,\n\nStatus was changed for project "##PROJECT_NAME##".\n\nStatus: ##OLD_STATUS## -> ##NEW_STATUS##\n\nPlease click the following link to view the project,\n##PROJECT_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##\n		\N	OLD_STATUS,NEW_STATUS,PROJECT_NAME,PROJECT_URL,SITE_NAME,SITE_URL	f	f	Admin Project Status Alert
39	2012-04-27 11:54:22	2015-04-11 08:32:50	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Winner Acceptance Notification	when bidder accept the winner selected request.	[##SITE_NAME##][##PROJECT_NAME##] ##BUYER_USERNAME## has accepted your winner selected request	Dear ##USERNAME##, \n\n##BUYER_USERNAME## has accepted your winner selected request for the project "##PROJECT_NAME##".\n\nPlease click the following link to view the project, ##PROJECT_LINK## \n\nThanks, \n##SITE_NAME## \n##SITE_URL##		##BUYER_USERNAME## has accepted your winner selected request for the project "##PROJECT_NAME##".	USERNAME,BUYER_USERNAME,PROJECT_NAME,PROJECT_LINK	f	t	Winner Acceptance Notification
37	2012-04-27 11:54:22	2015-04-11 08:31:24	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Update Bid Notification	When bid was updated, an internal message will be sent to the employer of the project notifying an update bid.	[##SITE_NAME##] ##BUYER_USERNAME##	Dear ##USERNAME##,\n##FREELANCER_USERNAME## updated bid amount for ##PROJECT_NAME##\nAmount: ##AMOUNT##\nDuration: ##DURATION##\nPlease click the following link to view the project ##PROJECT_LINK##\nThanks,\n##SITE_NAME##\n##SITE_URL##		##BUYER_USERNAME## has been updated his/her bid on ##PROJECT_NAME##.	USERNAME,BUYER_USERNAME,PROJECT_NAME,PROJECT_LINK,AMOUNT,DURATION	f	t	Update Bid Notification
18	2010-12-06 18:20:07	2015-04-10 14:59:15	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Project Cancelled Alert	we will send this mail, when cancelled a project	[##SITE_NAME##][##PROJECT_NAME##] Project Cancelled	Dear ##USERNAME##,\n \nThe "##PROJECT_NAME##" project was cancelled in ##SITE_NAME##. \n\nThanks,\n##SITE_NAME##\n##SITE_URL##		The "##PROJECT_NAME##" project was cancelled.	PROJECT_NAME,SITE_NAME,SITE_URL,USER_NAME	f	t	Project Cancelled Alert
17	2010-11-12 19:54:29	2015-04-10 14:42:11	##FROM_EMAIL##	##REPLY_TO_EMAIL##	New project opened for bidding	When new a new project of favorite user opened for bidding.	[##SITE_NAME##][##PROJECT_NAME##] ##FAV_USERNAME##'s Project for Bidding	Dear ##USERNAME##,\n\n##FAV_USERNAME## has added new project for bidding. Please click the following link to place your bid.\n##PROJECT_LINK##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		##FAV_USERNAME## has added new project ##PROJECT_NAME##	USERNAME,PROJECT_NAME,PROJECT_LINK,FAV_USERNAME	f	t	New project opened for bidding
79	2017-01-05 12:16:22	2017-01-05 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	contestpaymentpendingalert	if the contest is in payment pending status mail send to contest\nholder.	[##CONTEST_NAME##] Payment pending	Dear ##USERNAME##,\n\n  Your contest "##CONTEST_NAME##" is currently under Inactive status due to pending payment.  You can pay the contest payment using the following URL, ##PENDING_PAYMENT_URL##.\n             If you fails to make a payment within ##PENDING_PAYMENT_DAYS## days, the contest leads to auto delete.\n\nThanks,\n ##SITE_NAME##\n ##SITE_URL##		\N	USERNAME, CONTEST_NAME, PENDING_PAYMENT_URL, PENDING_PAYMENT_DAYS, SITE_NAME, SITE_URL	f	t	Contest Payment Pending Alert
16	2010-11-12 19:54:29	2015-04-10 14:41:19	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Bid Notification	When new min bid was closed, an email message will be sent to all bidder of the project notifiying ther bid status.	[##SITE_NAME##][##PROJECT_NAME##] You have ##BID_STATUS## the bid	Dear ##USERNAME##,\n\t\nYou have ##BID_STATUS## the bid for the ##PROJECT_NAME##. Please click the following link to view the project,\n##PROJECT_LINK##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		You have ##BID_STATUS## the bid for the ##PROJECT_NAME##	USERNAME,PROJECT_NAME,PROJECT_LINK,BID_STATUS	f	t	Bid Notification
7	2009-05-22 16:45:38	2015-04-10 14:21:20	##FROM_EMAIL##		Admin User Active 	We will send this mail to user, when user active   \r\nby administator.	[##SITE_NAME##] Your ##SITE_NAME## account has been activated	Hi ##USERNAME##,\n\nYour account has been activated.\n\nThanks,\n##SITE_NAME##\n##SITE_URL##\n		\N	SITE_NAME,USERNAME	f	f	Admin User Active 
4	2009-03-02 00:00:00	2015-04-10 14:18:22	##FROM_EMAIL##		Admin User Add	we will send this mail to user, when a admin add a new user.	[##SITE_NAME##] Welcome to ##SITE_NAME##	Hi ##USERNAME##,\n\n##SITE_NAME## team added you as a user in ##SITE_NAME##.\n\nYour account details.\n##LOGINLABEL##: ##USEDTOLOGIN##\nPassword: ##PASSWORD##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N	SITE_NAME,USERNAME,PASSWORD, LOGINLABEL, USEDTOLOGIN	f	f	Admin User Add
3	2009-02-20 10:15:19	2015-04-10 14:14:02	##FROM_EMAIL##		newuserjoin	we will send this mail to admin, when a new user registered in the site. For this you have to enable "admin mail after register" in the settings page.	[##SITE_NAME##] New user joined in ##SITE_NAME## account	Hi, \n\nA new user named "##USERNAME##" has joined in ##SITE_NAME## account. \n\nUsername: ##USERNAME##\nEmail: ##USEREMAIL##\nSignup IP: ##SIGNUPIP##\n\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N	SITE_NAME,USERNAME	f	f	New User Join
2	2009-02-20 10:15:57	2015-05-07 08:29:31	##FROM_EMAIL##		activationrequest	we will send this mail, when user registering an account he/she will get an activation request.	[##SITE_NAME##] Please activate your ##SITE_NAME## account	Hi ##USERNAME##,\n\nYour account has been created. \nPlease visit the following URL to activate your account.\n##ACTIVATION_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N	SITE_NAME,USERNAME,ACTIVATION_URL	f	f	Activation Request
24	2015-07-02 16:11:45	2015-04-10 15:41:37	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Admin Dispute Alert	we will send this when a project dispute opened.	[##SITE_NAME##][##PROJECT_NAME##] Dispute opened 	Hi,\n\nNew dispute opened for project "##PROJECT_NAME##".\nDisputer: ##DISPUTER## (##DISPUTERTYPE##)\nDisputed: ##DISPUTED## (##DISPUTEDTYPE##)\nDispute Reason: ##DISPUTETYPE##\nReason/Comments: ##REASON## \n\nPlease click the following link to view the project,\n##PROJECT_URL## \n\nThanks,\n##SITE_NAME##\n##SITE_URL## 		\N		f	f	Admin Dispute Alert
1	2009-02-20 10:24:49	2015-04-17 12:40:54	##FROM_EMAIL##		forgotpassword	we will send this mail, when user submit the forgot password form.	[##SITE_NAME##] Forgot password	Hi ##USERNAME##, \n\nWe have changed new password as per your requested.\n\nNew password: \n\n##PASSWORD##\n\nThanks, \n##SITE_NAME## \n##SITE_URL##		\N	USERNAME,RESET_URL,SITE_NAME	f	f	Forgot Password
73	2015-07-02 16:11:45	2015-07-02 16:11:45	##FROM_EMAIL##		Quote Updated Notification	we will send this mail, when user update the quote.	[##SITE_NAME##] Updated quote received for ##REQUEST_NAME##	Hi ##EMPLOYER##,\n\nYou have received updated quote for ##REQUEST_NAME## sent by ##FREELANCER##.\nClick below link to send response.\n##RESPONSE_URL##\n\nService Provider: ##BUSINESS_NAME##\nQuote: ##QUOTE_AMOUNT## / ##PRICE_TYPE##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N	SITE_NAME, SITE_URL,FREELANCER,EMPLOYER,RESPONSE_URL,BUSINESSNAME,RESPONSE_URL	f	f	Quote Updated Notification
99	2017-05-25 12:16:22	2017-05-25 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	New Invoice Received Notification	 System will send this mail to employer when new invoice created by freelancer	[##SITE_NAME##][##PROJECT_NAME##] New invoice received	Hi ##EMPLOYER##,\n\nNew invoice raised by ##FREELANCER## for the ##PROJECT_NAME##.\n\nDetail: ##DESCRIPTION## (ID: ##INVOICE_ID##)\nAmount: ##CURRENCY####AMOUNT##\n\nManage this project: ##PROJECT_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##	\N	\N	SITE_NAME,SITE_URL,EMPLOYER	f	f	New Invoice Received Notification
100	2017-05-25 12:16:22	2017-05-25 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Invoice Paid Notification	System will send this mail to freelancer when new invoice paid by employer	 [##SITE_NAME##][##PROJECT_NAME##] Payment received for invoice	Hi ##FREELANCER##,\n\n##EMPLOYER## paid invoice for the ##PROJECT_NAME##.\n\nDetail: ##DESCRIPTION## (ID: ##INVOICE_ID##)\nAmount: ##CURRENCY####AMOUNT##\n\nManage this project: ##PROJECT_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##	\N	\N	SITE_NAME,SITE_URL,EMPLOYER	f	f	Invoice Paid Notification
22	2011-04-19 13:40:47	2015-04-10 15:02:03	##FROM_EMAIL##	##REPLY_TO_EMAIL##	New Milestone Notification	 System will send this mail to freelancer when new milestone created by employer	[##SITE_NAME##][##PROJECT_NAME##] New milestone added	Hi ##FREELANCER##,\n\nNew milestone added by ##EMPLOYER## for the ##PROJECT_NAME##.\n\nDetail: ##DESCRIPTION## (ID: ##MILESTONE_ID##)\nAmount: ##CURRENCY####AMOUNT##\nDeadline: ##DEADLINE##\n\nManage this project: ##PROJECT_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##			SITE_NAME,SITE_URL,FREELANCER,EMPLOYER	f	f	New Milestone Notification
101	2017-05-25 12:16:22	2017-05-25 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	New Milestone Requested Notification	System will send this mail to employer when new milestone requested by employer	[##SITE_NAME##][##PROJECT_NAME##] New milestone requested	Hi ##EMPLOYER##,\n\nNew milestone requested by ##USERNAME## for the ##PROJECT_NAME##.\n\nDetail: ##DESCRIPTION## (ID: ##MILESTONE_ID##)\nAmount: ##CURRENCY####AMOUNT##\nDeadline: ##DEADLINE##\n\nManage this project: ##PROJECT_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##	\N	\N	SITE_NAME,SITE_URL,EMPLOYER	f	f	New Milestone Requested Notification
102	2017-05-25 12:16:22	2017-05-25 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Milestone - Escrow Requested Notification	System will send this mail to employer when new requested escrow amount by freelancer	[##SITE_NAME##][##PROJECT_NAME##] Escrow amount requested for milestone	Hi ##EMPLOYER##,\n\nEscrow amount requested by ##USERNAME## for the ##PROJECT_NAME##.\n\nDetail: ##DESCRIPTION## (ID: ##MILESTONE_ID##)\nAmount: ##CURRENCY####AMOUNT##\nDeadline: ##DEADLINE##\n\nManage this project: ##PROJECT_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##	\N	\N	SITE_NAME,SITE_URL,EMPLOYER	f	f	Milestone - Escrow Requested Notification
103	2017-05-25 12:16:22	2017-05-25 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Milestone - Escrow Amount Paid Notification	System will send this mail to freelancer when new escrow amount paid by employer	[##SITE_NAME##][##PROJECT_NAME##] Escrow amount paid for milestone	Hi ##FREELANCER##,\n\nEscrow amount paid by ##USERNAME## for the ##PROJECT_NAME##.\n\nDetail: ##DESCRIPTION## (ID: ##MILESTONE_ID##)\nAmount: ##CURRENCY####AMOUNT##\nDeadline: ##DEADLINE##\n\nManage this project: ##PROJECT_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##	\N	\N	SITE_NAME,SITE_URL,EMPLOYER	f	f	Milestone - Escrow Amount Paid Notification
105	2017-05-25 12:16:22	2017-05-25 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Milestone - Requested Escrow Amount Release Notification	System will send this mail to employer when new requested to release escrow amount by freelancer	[##SITE_NAME##][##PROJECT_NAME##] Requested to release escrow amount for milestone	Hi ##EMPLOYER##,\n\n##USERNAME## requested to release escrow amount for milestone of ##PROJECT_NAME##.\n\nDetail: ##DESCRIPTION## (ID: ##MILESTONE_ID##)\nAmount: ##CURRENCY####AMOUNT##\nDeadline: ##DEADLINE##\n\nManage this project: ##PROJECT_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##	\N	\N	SITE_NAME,SITE_URL,EMPLOYER	f	f	Milestone - Requested Escrow Amount Release Notification
106	2017-05-25 12:16:22	2017-05-25 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Milestone - Escrow Released Notification	System will send this mail to freelancer when escrow amount released by employer	[##SITE_NAME##][##PROJECT_NAME##] Escrow amount released	Hi ##FREELANCER##,\n\n##EMPLOYER## released escrow amount for milestone of ##PROJECT_NAME##.\n\nDetail: ##DESCRIPTION## (ID: ##MILESTONE_ID##)\nAmount: ##CURRENCY####AMOUNT##\nDeadline: ##DEADLINE##\n\nManage this project: ##PROJECT_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##	\N	\N	SITE_NAME,SITE_URL,EMPLOYER	f	f	Milestone - Escrow Released Notification
96	2017-01-05 12:16:22	2017-01-05 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	projectopenstatus	we will send this mail, when a\nuser get new message	New Project "##PROJECT_NAME##" Open for Bidding on ##SITE_NAME##...	Hi ##CUSTOMER_NAME## ,\n\nNew project "##PROJECT_NAME##".\n\n##PROJECT_DESCRIPTION## \n\nPlease click the following link to view the project,\n##PROJECT_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N	CUSTOMER_NAME,PROJECT_NAME,PROJECT_URL,SITE_NAME,SITE_URL,PROJECT_DESCRIPTION	f	f	Project Open Status Alert Follower
107	2017-05-25 12:16:22	2017-05-25 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Milestone Cancelled Notification	System will send this mail to opsite party when milestone cancelled by anyone.	[##SITE_NAME##][##PROJECT_NAME##] Milestone Cancelled	Hi ##USERNAME##,\n\n##ACTION_TAKER_USERNAME## cancelled the milestone of ##PROJECT_NAME##.\n\nDetail: ##DESCRIPTION## (ID: ##MILESTONE_ID##)\nAmount: ##CURRENCY####AMOUNT##\nDeadline: ##DEADLINE##\n\nManage this project: ##PROJECT_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##	\N	\N	SITE_NAME,SITE_URL,EMPLOYER	f	f	Milestone Cancelled Notification
65	2015-07-02 16:11:45	2015-07-02 16:11:45	##FROM_EMAIL##		Quote - Feedback Received Notification	we will send this mail, when user received the feedback.	Feedback received for "##REQUEST_NAME##"	Hi ##EMPLOYER##,\n\nFeedback received for "##REQUEST_NAME##" from ##FREELANCER##\nClick below link for more information.\n##RESPONSE_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N	SITE_NAME, SITE_URL,FREELANCER,CUSTOMERNAME,RESPONSE_URL,BUSINESSNAME,RESPONSE_URL	f	f	Quote - Feedback Received Notification
109	2017-06-16 16:11:45	2017-06-16 18:44:14	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Hired Me Notification	we will send this mail ti user, when user submit the contact us form.	[##SITE_NAME##][##PROJECT_NAME##] ##EMPLOYER##	Hi ##FREELANCER##,\n##EMPLOYER## sent interest about your profile and invite you to bid his/her project.\nProject: ##PROJECT_NAME##\nPrivate Message: ##MESSAGE##\nProject Link: ##RESUMES_LINK##\nThanks,\n##SITE_NAME##\n##SITE_URL##	\N	\N	MESSAGE, POST_DATE, SITE_NAME, CONTACT_URL, FIRST_NAME, LAST_NAME, SUBJECT, SITE_URL	f	f	Hired Me Notification
110	2017-06-16 16:11:45	2017-06-16 18:44:14	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Job Published Notification	System will sent this mail to employer when job was opened in site.\n	[##SITE_NAME##][##JOB_NAME##] Your job published in ##SITE_NAME##	Hi ##USERNAME##\n\n"##JOB_NAME##" was published in ##SITE_NAME##\n\nSee your job: ##JOB_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##	\N	\N	OLD_STATUS,NEW_STATUS,JOB_NAME,JOB_URL,SITE_NAME,SITE_URL	f	f	Job Published Notification
112	2017-06-19 12:14:27	2017-06-19 12:44:27	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Bid Withdraw Notification	System will send a notify email to employer when bid withdraw by freelancer	[##SITE_NAME##] ##BUYER_USERNAME## withdraw his bidding	Dear ##USERNAME##,\n\n##FREELANCER_USERNAME## uwithdraw his/herbidding for ##PROJECT_NAME##\n\nPlease click the following link to view the project ##PROJECT_LINK##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##	\N	\N	USERNAME,BUYER_USERNAME,PROJECT_NAME,PROJECT_LINK,AMOUNT,DURATION	f	t	Bid Withdraw Notification
113	2017-06-19 11:54:22	2017-06-19 12:54:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Winner Reject Notification	when bidder reject the winner selected request	[##SITE_NAME##][##PROJECT_NAME##] ##BUYER_USERNAME## has rejected your winner selected request	\nDear ##USERNAME##, \n\n##BUYER_USERNAME## has reject your project "##PROJECT_NAME##".\n\nPlease click the following link to view the project, ##PROJECT_LINK## \n\nThanks, \n##SITE_NAME## \n##SITE_URL##	\N	\N	USERNAME,BUYER_USERNAME,PROJECT_NAME,PROJECT_LINK	f	t	Winner Reject Notification
114	2017-06-19 11:54:22	2017-06-19 12:54:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Work Completion Reject Notification	System will sent this mail to freelancer when work completion request rejected by employer	[##SITE_NAME##][##PROJECT_NAME##] ##EMPLOYER## rejected your work completion	Hi ##FREELANCER##,\n\n##EMPLOYER## rejected your work completion for ##PROJECT_NAME##.\n\nManage this project: ##PROJECT_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##\n	\N	\N	USERNAME,BUYER_USERNAME,PROJECT_NAME,PROJECT_LINK	f	t	Work Completion Reject Notification
23	2010-10-08 14:39:38	2015-04-10 15:39:30	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Bidding Expired Alert	System will send to employer, when the project getting expired.	[##SITE_NAME##][##PROJECT_NAME##] Bidding has been expired	Dear ##USERNAME##,\n\nThe bidding for the project ##PROJECT_NAME## has been expired on ##SITE_NAME##.\n\nPlease click the following link to view the project, ##PROJECT_LINK## \n\nThanks,\n##SITE_NAME##\n##SITE_URL##		The bidding for the project ##PROJECT_NAME## has been expired.	USERNAME, PROJECT_NAME, SITE_NAME, SITE_URL	f	t	Bidding Expired Alert
116	2017-01-05 12:16:22	2017-01-05 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Milestone Approved Notification	we will send this mail, when a\nuser get new message	[##SITE_NAME##][##PROJECT_NAME##] 	Hi ##FREELANCER##,\n\n Milestone approved by ##EMPLOYER## for the ##PROJECT_NAME##.\n\n Detail: ##DESCRIPTION## (ID: ##MILESTONE_ID##)\n Amount: ##AMOUNT##\n Deadline: ##DEADLINE##\n\n Manage this project: ##PROJECT_URL##\n\n Thanks,\n ##SITE_NAME##\n ##SITE_URL##	\N	\N	USERNAME,MESSAGE,MESSAGE_LINK,SITE_NAME	f	f	Milestone Approved Notification
117	2012-04-27 11:54:22	2012-04-27 11:54:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Project Feedback Received Notification	System will sent this mail to users when feedback received for their project.	[##SITE_NAME##][##PROJECT_NAME##] 	Hi ##USERNAME##\n\nFeedback received for "##PROJECT_NAME##" from ##REVIEWER##\n\nManage this project: ##PROJECT_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##	\N	\N		f	\N	Project Feedback Received Notification
118	2015-04-07 11:40:00	2015-04-07 11:40:00	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Project Feedback Updated Notification	System will sent this mail to users when feedback updated for their project.	[##SITE_NAME##][##PROJECT_NAME##]	Hi ##USERNAME##\n\nFeedback updated for "##PROJECT_NAME##" by ##REVIEWER##\n\nManage this project: ##PROJECT_URL##\n\nThanks,\n##SITE_NAME##\n\t\n##SITE_URL##		\N		f	\N	Project Feedback Updated Notification
119	2017-06-20 16:11:45	2017-06-20 17:11:45	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Work Incomplete Notification	we will send this mail, when the work  incompleted.	"##REQUEST_NAME##" has incompleted by ##FREELANCER##	Hi ##EMPLOYER##,\n\n"##REQUEST_NAME##" has incompleted by ##FREELANCER##.\nClick below link to send response.\n##RESPONSE_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##	\N	\N	SITE_NAME, SITE_URL,FREELANCER,EMPLOYER,RESPONSE_URL,BUSINESSNAME,RESPONSE_URL	f	f	Work Incomplete Notification
120	2017-01-05 12:16:22	2017-01-05 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	New Message Received in Project	System will send to user when new conversion received for project	[##SITE_NAME##]	 Hi ##USERNAME##,\n\n        ##SENDER_USERNAME## sent you a message for ##PROJECT_NAME##.\n\n        Message: ##MESSAGE##\n\n        For reply ##RESPONSE_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##	\N	\N	USERNAME,MESSAGE,MESSAGE_LINK,SITE_NAME	f	f	New Message Received in Project
121	2017-01-05 12:16:22	2017-01-05 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	New Message Received in Quote Request	System will send to user when new conversion received for request or service.	[##SITE_NAME##]	Hi ##USERNAME##,\n\n        ##SENDER_USERNAME## sent you a message for ##CATEGORY##.\n\n        Message: ##MESSAGE##\n\n        For reply ##RESPONSE_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##	\N	\N	USERNAME,MESSAGE,MESSAGE_LINK,SITE_NAME	f	f	New Message Received in Quote Request
72	2015-07-02 16:11:45	2015-07-02 16:11:45	##FROM_EMAIL##		Quote Received Notification	System will send this mail to employer when get response from freelancer.	 [##SITE_NAME##] Quote received for ##CATEGORY_NAME##	Hi ##EMPLOYER##,\n\nYou have received the quote for ##REQUEST_NAME## sent by ##FREELANCER##.\n\nService Provider: ##BUSINESS_NAME##\nNote: ##PAYMENT_NOTE##\nQuote: ##QUOTE_AMOUNT## / ##PRICE_TYPE##\n\nManage your request: ##RESPONSE_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N	SITE_NAME, SITE_URL,FREELANCER,EMPLOYER,RESPONSE_URL,BUSINESSNAME,RESPONSE_URL	f	f	Quote Received Notification
108	2017-06-13 12:16:22	2017-06-13 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Quote Received Reminder Notification	System will send this mail to employer if not response any quotes within 6 hours from first quote received.	 [##SITE_NAME##] Reminder: Quote received for ##CATEGORY_NAME##	Hi ##EMPLOYER##,\n\nYou have received ##NUMBER_OF_QUOTES## quotes for ##REQUEST_NAME##.\n\nRequest Category: ##CATEGORY_NAME##\nNumber of Quote Received: ##NUMBER_OF_QUOTES##\n\nManage your request: ##RESPONSE_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##	\N	\N	SITE_NAME,SITE_URL,FREELANCER,EMPLOYER,BUSINESSNAME,CATEGORYNAME,REQUEST_DESCRIPTION,LOCATION,FORMFIELDS,RESPONSE_URL	f	f	Quote Received Reminder Notification
47	2015-07-02 16:11:45	2015-04-11 08:39:43	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Follow Email	we will send this mail to users, when a user followed by them add a project or funded for a project or followed a project	##FOLLOWED_USER## started following you	Hi ##USER##,\n    \n##FOLLOWED_USER## started following you on ##SITE_NAME##.\n\nThanks,\n##SITE_NAME##\n##SITE_URL##			FOLLOWED_USER, ACTTION, PROJECT, USER	f	t	Follow Email
13	2010-11-12 19:54:29	2015-04-10 14:37:14	##FROM_EMAIL##	##REPLY_TO_EMAIL##	New Bid Notification	System will send a notify email to employer when new bid was made	[##SITE_NAME##][##PROJECT_NAME##] New bid has been received	Dear ##USERNAME##,\nNew bid has been received for ##PROJECT_NAME##\nBidder: ##FREELANCER_USERNAME##\nAmount: ##AMOUNT##\nDuration: ##DURATION##\n\nPlease click the following link to view the project\n##PROJECT_LINK##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		New bid has been received for ##PROJECT_LINK##. Bidder: ##FREELANCER_USERNAME##. Amount: ##AMOUNT##. Duration: ##DURATION##	USERNAME,FREELANCER_USERNAME,PROJECT_NAME,PROJECT_LINK,AMOUNT,DURATION	f	t	New Bid Notification
25	2015-07-02 16:11:45	2015-04-10 15:43:47	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Dispute Alert	we will send this when a project dispute opened.	[##SITE_NAME##][##PROJECT_NAME##] Dispute opened 	Hi ##DISPUTED##,\n\nNew dispute opened for project "##PROJECT_NAME##".\nDisputer: ##DISPUTER## (##DISPUTERTYPE##)\nDispute Reason: ##DISPUTETYPE## \nReason/Comments: ##REASON## \n\nPlease click the following link to view the project, ##PROJECT_URL## \n\nThanks,\n##SITE_NAME##\n##SITE_URL## 		\N		f	f	Dispute Alert
111	2017-06-16 17:55:52	2017-06-16 17:55:52	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Project Published Notification	System will sent this mail to employer when project was opened for bidding.\n	[##SITE_NAME##][##PROJECT_NAME##] has been published	Hi ##USERNAME##\n\n"##PROJECT_NAME##" was opened for bidding in ##SITE_NAME##\n\nManage this project: ##PROJECT_URL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##\n	\N	\N	MESSAGE, POST_DATE, SITE_NAME, CONTACT_URL, FIRST_NAME, LAST_NAME, SUBJECT, SITE_URL	f	f	Project Published Notification
122	2017-07-20 12:16:22	2017-07-20 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Credit plan expired	When the Credit plan expired then mail to user	[##SITE_NAME##] Your current plan expired	Hi ##USER##,\n\nYour credit plan ##PLAN_NAME## was expired in ##SITE_NAME##.\n\nThanks,\n##SITE_NAME##\n##SITE_URL##	\N	\N	USERNAME,PROJECT_NAME,PROJECT_LINK,FAV_USERNAME	f	f	Credit plan expired
11	2009-10-14 18:31:14	2015-04-10 14:25:08	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Contact Us	We will send this mail to admin, when user submit any contact form.	[##SITE_NAME##] ##SUBJECT##	##MESSAGE##\r\n\r\n----------------------------------------------------\r\nTelephone    : ##TELEPHONE##\r\nIP           : ##IP##, ##SITE_NAME##\r\nWhois        : http://whois.sc/##IP##\r\nURL          : ##SITE_URL##\r\n----------------------------------------------------		\N	FROM_URL, IP, TELEPHONE, MESSAGE, SITE_NAME, SUBJECT, FROM_EMAIL, LAST_NAME, FIRST_NAME	f	f	Contact Us 
12	2009-10-14 19:20:59	2015-04-10 14:35:19	##FROM_EMAIL##		Contact Us Auto Reply	we will send this mail ti user, when user submit the contact us form.	[##SITE_NAME##] RE: ##SUBJECT##	Hi ##FIRST_NAME####LAST_NAME##,\r\n\r\n   Thanks for contacting us. We'll get back to you shortly.\r\n\r\n   Please do not reply to this automated response. If you have not contacted us and if you feel this is an error, please contact us through our site ##CONTACT_EMAIL##\r\n\r\n------ On ##POST_DATE## you wrote from ##IP## -----\r\n\r\n##MESSAGE##\r\n\r\n\r\nThanks,\r\n##SITE_NAME##\r\n##SITE_URL##		\N	MESSAGE, POST_DATE, SITE_NAME, CONTACT_URL, FIRST_NAME, LAST_NAME, SUBJECT, SITE_URL	f	f	Contact Us Auto Reply
104	2017-05-25 12:16:22	2017-05-25 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Milestone - Milestone Completed Notification	System will send this mail to employer when new milestone completed by freelancer	 [##SITE_NAME##][##PROJECT_NAME##] Milestone completed	Hi ##EMPLOYER##,\r\n\r\nMilestone work completed by ##FREELANCER## for the ##PROJECT_NAME##.\r\n\r\nDetail: ##DESCRIPTION## (ID: ##MILESTONE_ID##)\r\nAmount: ##CURRENCY####AMOUNT##\r\nDeadline: ##DEADLINE##\r\n\r\nManage this project: ##PROJECT_URL##\r\n\r\nThanks,\r\n##SITE_NAME##\r\n##SITE_URL##	\N	\N	SITE_NAME,SITE_URL,EMPLOYER	f	f	Milestone - Milestone Completed Notification
123	2018-06-11 10:13:27	2018-06-11 10:13:27	##FROM_EMAIL##		changepassword	we will send this mail\r\nto user, when the user change password.	[##SITE_NAME##] Password changed.	Hi ##USERNAME##,\r\n\r\nYour password has been changed\r\n\r\nYour new password:\r\n##PASSWORD##\r\n\r\nThanks,\r\n##SITE_NAME##\r\n##SITE_URL##	\N	\N		f	\N	Change Password
5	2009-05-22 16:51:14	2015-04-10 14:19:22	##FROM_EMAIL##		welcomemail	we will send this mail, when user register in this site and get activate.	[##SITE_NAME##] Welcome to ##SITE_NAME##	Hi ##USERNAME##,\n\nWe wish to say a quick hello and thanks for registering at ##SITE_NAME##.\n\nIf you did not request this account and feel this is in error, please\ncontact us at ##CONTACT_EMAIL##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##		\N	SITE_NAME, USERNAME, SUPPORT_EMAIL	f	f	Welcome Email
125	2017-01-05 12:16:22	2017-01-05 12:16:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	newmessage	System will send to user when new conversion received for project	[##SITE_NAME##]	 Hi ##OTHERUSERNAME##,\n\n        ##USERNAME## sent you a message.\n\n        Message: ##MESSAGE##\n\n        For reply ##MESSAGE_LINK##\n\nThanks,\n##SITE_NAME##\n##SITE_URL##	\N	\N	USERNAME,MESSAGE,MESSAGE_LINK,SITE_NAME,OTHERUSERNAME	f	f	newmessage
126	2012-04-27 11:54:22	2012-04-27 11:54:22	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Bidder Winner Acceptance Notification	when bidder accept the winner selected request.	[##SITE_NAME##][##PROJECT_NAME##] ##BUYER_USERNAME## has accepted your winner selected request	Dear ##USERNAME##, \r\n\r\n##BUYER_USERNAME## has accepted your winner selected request for the project "##PROJECT_NAME##".\r\n\r\nPlease click the following link to view the project, ##PROJECT_LINK## \r\n\r\nThanks, \r\n##SITE_NAME## \r\n##SITE_URL##	\N	##BUYER_USERNAME## has accepted your winner selected request for the project "##PROJECT_NAME##".	USERNAME,BUYER_USERNAME,PROJECT_NAME,PROJECT_LINK	f	t	Bidder Winner Acceptance Notification
127	2015-04-11 08:33:19	2015-04-11 08:33:19	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Escrow Funded Alert For Bidder	when amount funded in escrow, alert to bidder	[##SITE_NAME##][##PROJECT_NAME##] ##USERNAME## has funded amount in escrow	Dear ##BUYER_USERNAME##, \r\n\r\n##USERNAME## has funded amount ##AMOUNT## in escrow account for the project "##PROJECT_NAME##".\r\n\r\nPlease click the following link to view the project, ##PROJECT_LINK## \r\n\r\nThanks, \r\n##SITE_NAME## \r\n##SITE_URL##	\N	##USERNAME## has funded amount ##AMOUNT## in escrow account for the project "##PROJECT_NAME##".	USERNAME,BUYER_USERNAME,PROJECT_NAME,PROJECT_LINK,AMOUNT	f	t	Escrow Funded Alert For Bidder
128	2015-07-02 16:11:45	2015-07-02 16:11:45	##FROM_EMAIL##		Feedback Received Notification	we will send this mail, when user received the feedback.	Feedback received for "##REQUEST_NAME##"	Hi ##EMPLOYER##,\r\n\r\nFeedback received for "##REQUEST_NAME##" from ##FREELANCER##\r\nClick below link for more information.\r\n##RESPONSE_URL##\r\n\r\nThanks,\r\n##SITE_NAME##\r\n##SITE_URL##	\N	\N	SITE_NAME, SITE_URL,FREELANCER,CUSTOMERNAME,RESPONSE_URL,BUSINESSNAME,RESPONSE_URL	f	f	Feedback Received Notification
129	2015-07-02 16:11:45	2015-07-02 16:11:45	##FROM_EMAIL##		Feedback Updated Notification	we will send this mail, when user update the feedback.	Feedback updated for "##REQUEST_NAME##"	Hi ##FREELANCER##,\r\n\r\nFeedback updated for "##REQUEST_NAME##" from ##EMPLOYER##\r\nClick below link for more information.\r\n##RESPONSE_URL##\r\n\r\nThanks,\r\n##SITE_NAME##\r\n##SITE_URL##	\N	\N	SITE_NAME, SITE_URL,FREELANCER,EMPLOYER,RESPONSE_URL,BUSINESSNAME,RESPONSE_URL	f	f	Feedback Updated Notification
130	2015-04-10 14:02:33	2015-04-10 14:02:33	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Milestone Status Alert	we will send this when a project milestone status change.	[##SITE_NAME##][##PROJECT_NAME##] Status: ##OLD_STATUS## -> ##NEW_STATUS##	Hi,\r\n\r\nMilestone status was changed for project "##PROJECT_NAME##" - "##MILESTONE_NAME##".\r\n\r\nStatus: ##OLD_STATUS## -> ##NEW_STATUS##\r\n\r\nPlease click the following link to view the milestone on project,\r\n##PROJECT_URL##\r\n\r\nThanks,\r\n##SITE_NAME##\r\n##SITE_URL##\r\n	\N	Milestone status was changed from ##OLD_STATUS## to ##NEW_STATUS## for project "##PROJECT_NAME##" - "##MILESTONE_NAME##".	MILESTONE_NAME,OLD_STATUS,NEW_STATUS,PROJECT_NAME,PROJECT_URL,SITE_NAME,SITE_URL	f	t	Milestone Status Alert
131	2015-04-10 14:40:26	2015-04-10 14:40:26	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Min Bid Notification	When new min bid was made, an internal message will be sent to the bidder of the project notifiying an new bid.	[##SITE_NAME##][##PROJECT_NAME##] New bid has been received	Dear ##USERNAME##,\r\n\t\r\nNew bid has been received for ##PROJECT_NAME##.\r\n\r\nBidder: ##BUYER_USERNAME##\r\nAmount: ##AMOUNT##\r\nDuration: ##DURATION##\r\n\r\nPlease click the following link to view the project,\r\n##PROJECT_LINK##\r\n\r\nThanks,\r\n##SITE_NAME##\r\n##SITE_URL##	\N	##BUYER_USERNAME## bidded on ##PROJECT_NAME##. Amount: ##AMOUNT## Duration: ##DURATION##	USERNAME,BUYER_USERNAME,PROJECT_NAME,PROJECT_LINK,AMOUNT,DURATION	f	t	Min Bid Notification
132	2015-04-10 15:47:49	2015-04-10 15:47:49	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Mutual Cancel Request Sent	we will send this when a user request for mutual cancel.	[##SITE_NAME##][##PROJECT_NAME##]Your mutual cancel request for "##PROJECT_NAME##" has sent	Hi ##USER##, \r\n\r\nYour mutual cancel request for "##PROJECT_NAME##" has sent. \r\nPlease click the following link to view details, ##PROJECT_LINK## \r\n\r\nThanks, \r\n##SITE_NAME##\r\n##SITE_URL##	\N	\N	##USER##, ##PROJECT_NAME##, ##PROJECT_URL##, ##SITE_NAME##, ##SITE_URL##	f	f	Mutual Cancel Request Sent
133	2015-04-10 14:38:12	2015-04-10 14:38:12	##FROM_EMAIL##	##REPLY_TO_EMAIL##	New Bid Buyer Notification	Internal mail sent to the bidder when he makes a new bid.	[##SITE_NAME##][##PROJECT_NAME##] Your bid was sent	Dear ##USERNAME##,\r\n\r\nYour bid for project ##PROJECT_NAME## has been sent.\r\n\r\nPlease click the following link to view the project,\r\n##PROJECT_LINK##\r\n\r\nThanks,\r\n##SITE_NAME##\r\n##SITE_URL##	\N	\N	SITE_NAME, USERNAME, PROJECT_NAME,	f	f	New Bid Buyer Notification
134	2015-04-11 08:52:33	2015-04-11 08:52:33	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Project Added Notification	When a project is added, we will send this to all the valid freelancers.	[##SITE_NAME##] New Project has been added	Dear ##FREELANCER_NAME##,\r\n\t\r\nNew project - ##PROJECT_NAME## has been added by ##EMPLOYER_NAME## in ##SITENAME##\r\n\r\nPlease click the following link to view the project,\r\n##PROJECT_LINK##\r\n\r\nThanks,\r\n##SITE_NAME##\r\n##SITE_URL##	\N	New project - ##PROJECT_NAME## has been added by ##EMPLOYER_NAME##	SITE_NAME,SITE_URL,FREELANCER_NAME,PROJECT_NAME,EMPLOYER_NAME,PROJECT_LINK	f	t	Project Added Notification
135	2015-04-10 15:00:14	2015-04-10 15:00:14	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Project Bid Cancelled By Bidder	we will send this mail, when cancelled a project bid by bidder	[##SITE_NAME##][##PROJECT_NAME##] Project bid cancelled by Bidder	Dear ##USERNAME##,\r\n \r\nYour "##PROJECT_NAME##" project bid was cancelled by ##BUYER_USERNAME##.\r\n\r\nPlease click the following link to view the project,\r\n##PROJECT_LINK##\r\n\r\nThanks,\r\n##SITE_NAME##\r\n##SITE_URL##	\N	Your "##PROJECT_NAME##" project bid was cancelled by ##BUYER_USERNAME##.	PROJECT_NAME,SITE_NAME,SITE_URL,USER_NAME	f	t	Project Bid Cancelled By Bidder
36	2010-10-08 14:39:38	2015-04-11 08:30:07	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Project Bidding Closed Alert	System will send to employer, when the project bidding getting closed.	[##SITE_NAME##][##PROJECT_NAME##] Project has been closed 	Dear ##USERNAME##, \n\nThe bidding for project ##PROJECT_NAME## has been closed on ##SITE_NAME##. \n\nPlease click the following link to view the project, ##PROJECT_LINK## \n\nThanks, \n##SITE_NAME## \n##SITE_URL##		The bidding for project ##PROJECT_NAME## has been closed.	USERNAME, PROJECT_NAME, SITE_NAME, SITE_URL	f	t	Project Bidding Closed Alert
136	2015-04-11 08:30:07	2015-04-11 08:30:07	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Project Closed Alert	This is sent to admin, project employer when project is closed .	[##SITE_NAME##][##PROJECT_NAME##] Project has been closed 	Dear ##USERNAME##, \r\n\r\nThe bidding for project ##PROJECT_NAME## has been closed on ##SITE_NAME##. \r\n\r\nPlease click the following link to view the project, ##PROJECT_LINK## \r\n\r\nThanks, \r\n##SITE_NAME## \r\n##SITE_URL##	\N	The bidding for project ##PROJECT_NAME## has been closed.	USERNAME, PROJECT_NAME, SITE_NAME, SITE_URL	f	t	Project Closed Alert
137	2015-07-02 16:11:45	2015-07-02 16:11:45	##FROM_EMAIL##	##REPLY_TO_EMAIL##	Update Preferred Time Notification	we will send this mail, when user update the preferred time.	Preferred time received for ##REQUEST_NAME##	Hi ##PROVIDER##,\r\n\r\nPreferred time received for ##REQUEST_NAME## sent by ##REQUESTOR##\r\nClick below link to send response.\r\n##MY_WORK_LINK##\r\n\r\nThanks,\r\n##SITE_NAME##\r\n##SITE_URL##	\N	\N	SITE_NAME, SITE_URL, PROVIDER, REQUEST_NAME, REQUESTOR, MY_WORK_LINK	f	f	Update Preferred Time Notification
\.


--
-- Name: email_templates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('email_templates_id_seq', 137, true);


--
-- Data for Name: exam_answers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY exam_answers (id, created_at, updated_at, user_id, exam_id, question_id, exams_user_id, user_answer, total_mark) FROM stdin;
\.


--
-- Name: exam_answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('exam_answers_id_seq', 10, true);


--
-- Data for Name: exam_attends; Type: TABLE DATA; Schema: public; Owner: -
--

COPY exam_attends (id, created_at, updated_at, exam_id, user_id, exams_user_id, user_login_ip_id) FROM stdin;
\.


--
-- Name: exam_attends_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('exam_attends_id_seq', 1, false);


--
-- Data for Name: exam_categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY exam_categories (id, created_at, updated_at, name, exam_count) FROM stdin;
1	2016-12-23 13:25:13	2016-12-23 13:25:13	Websites, IT & Software	0
2	2016-12-23 13:35:46	2016-12-23 13:35:46	Mobile Phones & Computing	0
3	2016-12-23 13:35:46	2016-12-23 13:35:46	Writing & Content	0
4	2016-12-23 13:35:46	2016-12-23 13:35:46	Design, Media & Architecture	0
5	2016-12-23 13:35:46	2016-12-23 13:35:46	Engineering & Science	0
6	2016-12-23 13:35:46	2016-12-23 13:35:46	Sales & Marketing	0
7	2016-12-23 13:35:46	2016-12-23 13:35:46	Business, Accounting, Human Resources & Legal	0
8	2016-12-23 13:35:46	2016-12-23 13:35:46	Translation & Languages	0
9	2016-12-23 13:35:46	2016-12-23 13:35:46	Other	0
\.


--
-- Name: exam_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('exam_categories_id_seq', 10, true);


--
-- Data for Name: exam_levels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY exam_levels (id, created_at, updated_at, name, exam_count) FROM stdin;
1	2015-12-16 09:23:07	2015-12-16 09:23:07	Level 1	0
2	2015-12-16 09:23:07	2015-12-16 09:23:07	Level 2	0
3	2015-12-16 09:23:07	2015-12-16 09:23:07	Level 3	0
\.


--
-- Name: exam_levels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('exam_levels_id_seq', 3, true);


--
-- Data for Name: exam_statuses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY exam_statuses (id, created_at, updated_at, name, exams_user_count) FROM stdin;
1	2010-01-29 18:30:10	2010-02-16 10:53:16	Inprogress	0
2	2010-01-29 18:30:10	2010-02-16 10:53:16	Incomplete	0
3	2010-01-29 18:30:41	2010-02-16 10:53:16	Passed	0
4	2016-01-27 18:47:47	2016-01-27 18:47:47	Failed	0
5	2015-12-17 13:37:12	2016-01-05 12:06:22	Exam Fee Payment Pending	0
6	2015-12-17 13:37:12	2016-01-05 12:06:22	Fee Paid / Not Started	0
7	2015-12-17 13:37:12	2016-01-05 12:06:22	Suspended Due to Taking Overtime	0
\.


--
-- Name: exam_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('exam_statuses_id_seq', 7, true);


--
-- Name: exam_views_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('exam_views_id_seq', 1, false);


--
-- Data for Name: exams; Type: TABLE DATA; Schema: public; Owner: -
--

COPY exams (id, created_at, updated_at, question_display_type_id, topics_covered, instructions, splash_content, title, slug, duration, fee, pass_mark_percentage, exams_question_count, exams_user_count, exam_level_id, is_active, is_recommended, additional_time_to_expire, total_fee_received, exams_user_passed_count, view_count, parent_exam_id, exam_category_id) FROM stdin;
\.


--
-- Name: exams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('exams_id_seq', 29, true);


--
-- Data for Name: exams_questions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY exams_questions (id, created_at, updated_at, exam_id, question_id, display_order) FROM stdin;
\.


--
-- Name: exams_questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('exams_questions_id_seq', 311, true);


--
-- Data for Name: exams_users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY exams_users (id, created_at, updated_at, exam_id, user_id, fee_paid, total_mark, total_mark_mean, total_mark_standard_deviation, exam_status_id, no_of_times, exam_started_date, exam_end_date, exam_level_id, allow_duration, total_question_count, pass_mark_percentage, payment_gateway_id, zazpay_gateway_id, zazpay_payment_id, zazpay_pay_key, zazpay_revised_amount, taken_time, percentile_rank, paypal_pay_key) FROM stdin;
\.


--
-- Name: exams_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('exams_users_id_seq', 1, true);


--
-- Name: faq_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('faq_categories_id_seq', 2, true);


--
-- Name: faqs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('faqs_id_seq', 1, false);


--
-- Data for Name: flag_categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY flag_categories (id, created_at, updated_at, name, class, flag_count, is_active) FROM stdin;
4	2017-05-16	2017-05-16	Sexual Content	Project	0	t
5	2017-05-16	2017-05-16	Violent or Repulsive Content	Project	0	t
6	2017-05-16	2017-05-16	Hateful or Abusive Content	Project	0	t
7	2017-05-16	2017-05-16	Ham Dangerous Acts	Project	0	t
8	2017-05-16	2017-05-16	Spam	Project	0	t
9	2017-05-16	2017-05-16	Infringes My Rights	Project	0	t
10	2017-05-16	2017-05-16	Sexual Content	Job	0	t
11	2017-05-16	2017-05-16	Violent or Repulsive Content	Job	0	t
12	2017-05-16	2017-05-16	Hateful or Abusive Content	Job	0	t
13	2017-05-16	2017-05-16	Ham Dangerous Acts	Job	0	t
14	2017-05-16	2017-05-16	Spam	Job	0	t
15	2017-05-16	2017-05-16	Infringes My Rights	Job	0	t
16	2017-05-16	2017-05-16	Sexual Content	User	0	t
17	2017-05-16	2017-05-16	Violent or Repulsive Content	User	0	t
18	2017-05-16	2017-05-16	Hateful or Abusive Content	User	0	t
19	2017-05-16	2017-05-16	Ham Dangerous Acts	User	0	t
20	2017-05-16	2017-05-16	Spam	User	0	t
21	2017-05-16	2017-05-16	Infringes My Rights	User	0	t
22	2017-05-16	2017-05-16	Sexual Content	Contest	0	t
23	2017-05-16	2017-05-16	Violent or Repulsive Content	Contest	0	t
24	2017-05-16	2017-05-16	Hateful or Abusive Content	Contest	0	t
25	2017-05-16	2017-05-16	Ham Dangerous Acts	Contest	0	t
26	2017-05-16	2017-05-16	Spam	Contest	0	t
27	2017-05-16	2017-05-16	Infringes My Rights	Contest	0	t
28	2017-05-16	2017-05-16	Sexual Content	ContestUser	0	t
29	2017-05-16	2017-05-16	Violent or Repulsive Content	ContestUser	0	t
30	2017-05-16	2017-05-16	Hateful or Abusive Content	ContestUser	0	t
31	2017-05-16	2017-05-16	Ham Dangerous Acts	ContestUser	0	t
32	2017-05-16	2017-05-16	Spam	ContestUser	0	t
33	2017-05-16	2017-05-16	Infringes My Rights	ContestUser	0	t
34	2017-05-16	2017-05-16	Sexual Content	QuoteService	0	t
35	2017-05-16	2017-05-16	Violent or Repulsive Content	QuoteService	0	t
36	2017-05-16	2017-05-16	Hateful or Abusive Content	QuoteService	0	t
37	2017-05-16	2017-05-16	Ham Dangerous Acts	QuoteService	0	t
38	2017-05-16	2017-05-16	Spam	QuoteService	0	t
39	2017-05-16	2017-05-16	Infringes My Rights	QuoteService	0	t
40	2017-05-16	2017-05-16	Sexual Content	Portfolio	0	t
41	2017-05-16	2017-05-16	Violent or Repulsive Content	Portfolio	0	t
42	2017-05-16	2017-05-16	Hateful or Abusive Content	Portfolio	0	t
43	2017-05-16	2017-05-16	Ham Dangerous Acts	Portfolio	0	t
44	2017-05-16	2017-05-16	Spam	Portfolio	0	t
45	2017-05-16	2017-05-16	Infringes My Rights	Portfolio	0	t
\.


--
-- Name: flag_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('flag_categories_id_seq', 45, true);


--
-- Data for Name: flags; Type: TABLE DATA; Schema: public; Owner: -
--

COPY flags (id, created_at, updated_at, user_id, class, foreign_id, flag_category_id, message, ip_id) FROM stdin;
\.


--
-- Name: flags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('flags_id_seq', 1, false);


--
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY followers (id, created_at, updated_at, user_id, foreign_id, class, ip_id) FROM stdin;
\.


--
-- Name: followers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('followers_id_seq', 8, true);


--
-- Data for Name: form_field_groups; Type: TABLE DATA; Schema: public; Owner: -
--

COPY form_field_groups (id, created_at, updated_at, name, slug, foreign_id, info, "order", class, is_deletable, is_editable) FROM stdin;
1	2013-08-27 17:22:45	2013-08-27 17:22:47	Others	others	1		1	ContestType	t	t
2	2013-08-27 17:22:45	2013-08-27 17:22:47	Others	others	2		1	ContestType	t	t
3	2013-08-27 17:22:45	2013-08-27 17:22:47	Others	others	3		1	ContestType	t	t
4	2013-08-27 17:22:45	2013-08-27 17:22:47	Others	others	4		1	ContestType	t	t
5	2013-08-27 17:22:45	2013-08-27 17:22:47	Others	others	5		1	ContestType	t	t
6	2013-08-27 17:22:45	2013-08-27 17:22:47	Others	others	6		1	ContestType	t	t
8	2013-08-27 17:22:45	2013-08-27 17:22:47	Others	others	8		1	ContestType	t	t
9	2013-09-18 17:17:22	2013-09-18 17:17:22	Others		9		\N	ContestType	t	f
10	2013-09-18 17:37:12	2013-09-18 17:37:12	Other		10		\N	ContestType	t	t
11	2013-09-18 17:47:52	2013-09-18 17:47:52	Others		11		\N	ContestType	t	f
12	2013-09-18 17:57:19	2013-09-18 17:57:19	Other		12		\N	ContestType	t	f
13	2013-09-18 18:05:37	2013-09-18 18:05:37	Other		13		\N	ContestType	t	f
14	2013-09-18 18:06:43	2013-09-18 18:06:43	Others		14		\N	ContestType	t	f
15	2013-09-18 18:11:04	2013-09-18 18:11:04	Other		15		\N	ContestType	t	f
16	2013-09-18 18:11:32	2013-09-18 18:11:32	Others		16		\N	ContestType	t	f
17	2013-09-18 18:14:47	2013-09-18 18:14:47	Others		17		\N	ContestType	t	f
18	2013-09-18 18:16:02	2013-09-18 18:16:02	Others		18		\N	ContestType	t	f
19	2013-09-18 18:22:31	2013-09-18 18:22:31	Others		19		\N	ContestType	t	f
20	2013-09-18 18:23:23	2013-09-18 18:23:23	Others		20		\N	ContestType	t	f
21	2013-09-18 18:25:29	2013-09-18 18:25:29	Others		22		\N	ContestType	t	f
22	2013-09-18 18:25:53	2013-09-18 18:25:53	Other		21		\N	ContestType	t	f
23	2013-09-18 18:29:17	2013-09-18 18:29:17	Others		23		\N	ContestType	t	f
24	2013-09-18 18:30:54	2013-09-18 18:30:54	Others		24		\N	ContestType	t	f
25	2013-09-18 18:31:29	2013-09-18 18:31:29	Target Market		23		\N	ContestType	t	f
26	2013-09-18 18:36:55	2013-09-18 18:36:55	Others		25		\N	ContestType	t	f
27	2013-09-18 18:38:32	2013-09-18 18:38:32	Others		27		\N	ContestType	t	f
28	2013-09-18 18:39:32	2013-09-18 18:39:32	Others		28		\N	ContestType	t	f
29	2013-09-18 18:39:36	2013-09-18 18:39:36	Other		26		\N	ContestType	t	f
30	2013-09-18 18:47:50	2013-09-18 18:47:50	Others		29		\N	ContestType	t	f
31	2016-12-10 12:04:19	2016-12-10 12:04:19	Stationery	\N	30	Stationery	\N	ContestType	t	t
32	2016-12-10 13:42:00	2016-12-10 13:42:00	Others	\N	31		\N	ContestType	t	t
33	2016-12-10 13:42:06	2016-12-10 13:42:06	Others	\N	32		\N	ContestType	t	t
34	2016-12-10 13:42:12	2016-12-10 13:42:12	Others	\N	33		\N	ContestType	t	t
35	2016-12-10 13:42:16	2016-12-10 13:42:16	Others	\N	34		\N	ContestType	t	t
36	2016-12-10 13:42:21	2016-12-10 13:42:21	Others	\N	35		\N	ContestType	t	t
37	2016-12-10 13:42:25	2016-12-10 13:42:25	Others	\N	36		\N	ContestType	t	t
38	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	9	\N	\N	QuoteCategory	t	t
39	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	12	\N	\N	QuoteCategory	t	t
40	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	13	\N	\N	QuoteCategory	t	t
41	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	14	\N	\N	QuoteCategory	t	t
42	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	16	\N	\N	QuoteCategory	t	t
43	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	18	\N	\N	QuoteCategory	t	t
44	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	19	\N	\N	QuoteCategory	t	t
45	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	20	\N	\N	QuoteCategory	t	t
46	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	21	\N	\N	QuoteCategory	t	t
47	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	23	\N	\N	QuoteCategory	t	t
48	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	24	\N	\N	QuoteCategory	t	t
49	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	25	\N	\N	QuoteCategory	t	t
50	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	26	\N	\N	QuoteCategory	t	t
51	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	27	\N	\N	QuoteCategory	t	t
52	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	28	\N	\N	QuoteCategory	t	t
53	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	30	\N	\N	QuoteCategory	t	t
54	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	31	\N	\N	QuoteCategory	t	t
55	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	32	\N	\N	QuoteCategory	t	t
56	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	33	\N	\N	QuoteCategory	t	t
57	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	34	\N	\N	QuoteCategory	t	t
58	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	35	\N	\N	QuoteCategory	t	t
59	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	36	\N	\N	QuoteCategory	t	t
60	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	37	\N	\N	QuoteCategory	t	t
61	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	38	\N	\N	QuoteCategory	t	t
62	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	39	\N	\N	QuoteCategory	t	t
63	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	41	\N	\N	QuoteCategory	t	t
64	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	42	\N	\N	QuoteCategory	t	t
65	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	43	\N	\N	QuoteCategory	t	t
66	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	44	\N	\N	QuoteCategory	t	t
67	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	45	\N	\N	QuoteCategory	t	t
68	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	47	\N	\N	QuoteCategory	t	t
69	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	48	\N	\N	QuoteCategory	t	t
70	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	49	\N	\N	QuoteCategory	t	t
71	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	50	\N	\N	QuoteCategory	t	t
72	2016-12-16 14:20:56	2016-12-16 14:20:56	Others	\N	51	\N	\N	QuoteCategory	t	t
73	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	52	\N	\N	QuoteCategory	t	t
74	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	53	\N	\N	QuoteCategory	t	t
75	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	55	\N	\N	QuoteCategory	t	t
76	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	56	\N	\N	QuoteCategory	t	t
77	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	57	\N	\N	QuoteCategory	t	t
78	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	58	\N	\N	QuoteCategory	t	t
79	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	59	\N	\N	QuoteCategory	t	t
80	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	60	\N	\N	QuoteCategory	t	t
81	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	61	\N	\N	QuoteCategory	t	t
82	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	4	\N	\N	QuoteCategory	t	t
83	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	5	\N	\N	QuoteCategory	t	t
84	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	6	\N	\N	QuoteCategory	t	t
85	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	7	\N	\N	QuoteCategory	t	t
86	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	8	\N	\N	QuoteCategory	t	t
87	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	62	\N	\N	QuoteCategory	t	t
88	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	63	\N	\N	QuoteCategory	t	t
89	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	64	\N	\N	QuoteCategory	t	t
90	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	66	\N	\N	QuoteCategory	t	t
91	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	67	\N	\N	QuoteCategory	t	t
92	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	68	\N	\N	QuoteCategory	t	t
93	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	70	\N	\N	QuoteCategory	t	t
94	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	71	\N	\N	QuoteCategory	t	t
95	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	72	\N	\N	QuoteCategory	t	t
96	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	73	\N	\N	QuoteCategory	t	t
97	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	74	\N	\N	QuoteCategory	t	t
98	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	75	\N	\N	QuoteCategory	t	t
99	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	76	\N	\N	QuoteCategory	t	t
100	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	97	\N	\N	QuoteCategory	t	t
101	2016-12-16 14:20:57	2016-12-16 14:20:57	Others	\N	11	\N	\N	QuoteCategory	t	t
\.


--
-- Name: form_field_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('form_field_groups_id_seq', 101, true);


--
-- Data for Name: form_field_submissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY form_field_submissions (id, created_at, updated_at, form_field_id, foreign_id, class, response) FROM stdin;
\.


--
-- Name: form_field_submissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('form_field_submissions_id_seq', 65, true);


--
-- Data for Name: form_fields; Type: TABLE DATA; Schema: public; Owner: -
--

COPY form_fields (id, created_at, updated_at, name, label, info, length, options, class, input_type_id, foreign_id, form_field_group_id, is_required, is_active, display_order, depends_on, depends_value) FROM stdin;
48	2012-07-31 17:52:58	2017-05-08 06:24:54	when-do-you-want-the-work-done	When do you want the work done?		0		QuoteCategory	2	16	42	t	t	46	\N	\N
64	2012-07-31 18:36:36	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Real estate, Data entry, Transcription, Contracts attorney, Wills & estate planning, Other	QuoteCategory	5	18	43	t	t	64	\N	\N
58	2012-07-31 18:10:36	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Estate attorney, Family law attorney, Real estate attorney, Wills & estate planning, Other	QuoteCategory	4	19	44	t	t	58	\N	\N
70	2012-10-24 11:42:09	2017-05-08 06:24:54	how-often	How often?		0	One time,More than once a week,Once a week,Once a month	QuoteCategory	5	23	47	t	t	4	\N	\N
102	2012-10-24 12:22:41	2017-05-08 06:24:54	anything-else-the-dj-should-know	Anything else the DJ should know?		0		QuoteCategory	2	30	53	f	t	102	\N	\N
191	2012-12-19 12:41:19	2017-05-08 06:24:54	pick-up-location	Pick-up location		0		QuoteCategory	1	43	65	t	t	9	\N	\N
192	2012-12-19 12:41:33	2017-05-08 06:24:54	drop-off-location	Drop-off location		0		QuoteCategory	1	43	65	t	t	10	\N	\N
376	2012-12-20 15:56:54	2017-05-08 06:24:54	platform	Platform		0	PC, Mac, Mobile, Other	QuoteCategory	4	74	97	t	t	376	\N	\N
497	2012-12-20 19:10:15	2017-05-08 06:24:54	when-do-you-want-the-work-done	When do you want the work done?\t		0		QuoteCategory	1	97	100	t	t	5	\N	\N
65	2012-07-31 18:37:05	2017-05-08 06:24:54	what-do-you-need	What do you need?		0		QuoteCategory	1	18	43	t	t	65	\N	\N
62	2012-07-31 18:30:57	2017-05-08 06:24:54	when-do-you-want-the-work-done	When do you want the work done?		0		QuoteCategory	1	19	44	t	t	62	\N	\N
90	2012-10-24 12:05:42	2017-05-08 06:24:54	what-do-you-need	What do you need?		0		QuoteCategory	2	27	51	t	t	90	\N	\N
109	2012-10-24 12:30:57	2017-05-08 06:24:54	-anything-else-the-caterer-chef-should-know	    Anything else the caterer & chef should know?		0		QuoteCategory	2	31	54	f	t	109	\N	\N
108	2012-10-24 12:30:34	2017-05-08 06:24:54	additional-service	Additional Service		0	Appetizers,Beverages (non-alcoholic),Beverages (alcoholic),No additional service,Other	QuoteCategory	4	31	54	t	t	108	\N	\N
260	2012-12-19 13:56:19	2017-05-08 06:24:54	when-would-you-like-to-speak-with-a-travel-agent	When would you like to speak with a travel agent?		0		QuoteCategory	1	50	71	t	t	260	\N	\N
265	2012-12-19 13:59:38	2017-05-08 06:24:54	anything-else-the-life-coach-should-know	Anything else the life coach should know?		0		QuoteCategory	1	52	73	t	t	265	\N	\N
266	2012-12-19 13:59:48	2017-05-08 06:24:54	when-would-you-like-to-start-your-sessions	When would you like to start your sessions?		0		QuoteCategory	1	52	73	t	t	266	\N	\N
291	2012-12-19 15:48:12	2017-05-08 06:24:54	anything-else-the-arts-and-crafts-instructor-should-know	Anything else the arts and crafts instructor should know?		0		QuoteCategory	1	58	78	t	t	291	\N	\N
309	2012-12-19 16:03:47	2017-05-08 06:24:54	anything-else-the-personal-trainer-should-know	Anything else the personal trainer should know?		0		QuoteCategory	1	60	80	t	t	309	\N	\N
321	2012-12-19 16:19:01	2017-05-08 06:24:54	anything-else-the-life-coach-should-know	Anything else the life coach should know?		0		QuoteCategory	1	62	87	t	t	321	\N	\N
330	2012-12-19 16:27:55	2017-05-08 06:24:54	anything-else-the-teacher-should-know	Anything else the teacher should know?		0		QuoteCategory	1	64	89	t	t	330	\N	\N
336	2012-12-20 15:37:05	2017-05-08 06:24:54	anything-else-the-editor-should-know	Anything else the editor should know?		0		QuoteCategory	1	66	90	t	t	336	\N	\N
337	2012-12-20 15:37:15	2017-05-08 06:24:54	when-do-you-want-the-editing-finished	When do you want the editing finished?		0		QuoteCategory	1	66	90	t	t	337	\N	\N
343	2012-12-20 15:39:15	2017-05-08 06:24:54	anything-else-the-translator-should-know	Anything else the translator should know?		0		QuoteCategory	1	67	91	t	t	343	\N	\N
344	2012-12-20 15:39:50	2017-05-08 06:24:54	when-do-you-want-the-translation-finished	When do you want the translation finished?		0		QuoteCategory	1	67	91	t	t	344	\N	\N
349	2012-12-20 15:43:31	2017-05-08 06:24:54	anything-else-the-writer-should-know	Anything else the writer should know?		0		QuoteCategory	1	68	92	t	t	349	\N	\N
357	2012-12-20 15:48:40	2017-05-08 06:24:54	anything-else-the-audio-video-should-know	Anything else the audio & video should know?		0		QuoteCategory	1	70	93	t	t	357	\N	\N
369	2012-12-20 15:53:38	2017-05-08 06:24:54	what-do-you-need	What do you need?		0		QuoteCategory	1	72	95	t	t	369	\N	\N
370	2012-12-20 15:53:50	2017-05-08 06:24:54	when-do-you-want-the-work-done	When do you want the work done?		0		QuoteCategory	1	72	95	t	t	370	\N	\N
372	2012-12-20 15:54:50	2017-05-08 06:24:54	what-do-you-need	What do you need?		0		QuoteCategory	1	73	96	t	t	372	\N	\N
378	2012-12-20 15:57:20	2017-05-08 06:24:54	anything-else-the-software-developer-should-know	Anything else the software developer should know?		0		QuoteCategory	1	74	97	t	t	378	\N	\N
379	2012-12-20 15:57:32	2017-05-08 06:24:54	when-do-you-want-the-work-done	When do you want the work done?		0		QuoteCategory	1	74	97	t	t	379	\N	\N
383	2012-12-20 15:58:45	2017-05-08 06:24:54	anything-else-the-web-developer-should-know	Anything else the web developer should know?		0		QuoteCategory	1	75	98	t	t	383	\N	\N
152	2012-10-24 13:15:54	2017-05-08 06:24:54	anything-else-the-wedding-photographer-should-know	Anything else the wedding photographer should know?		0		QuoteCategory	2	38	61	f	t	152	\N	\N
169	2012-12-19 12:03:46	2017-05-08 06:24:54	something-specific	Something specific?		0	Turbo / Supercharger, Body kit, Air suspension, Coil-over suspension, Wheels / Tires, Port and Polish (cylinder head), I'm not sure	QuoteCategory	4	41	63	t	t	8	\N	\N
179	2012-12-19 12:18:29	2017-05-08 06:24:54	what-is-your-cars-year-make-and-model	What is your car's year, make and model?		0		QuoteCategory	1	42	64	t	t	179	\N	\N
211	2012-12-19 12:54:16	2017-05-08 06:24:54	anything-else-the-auto-broker-should-know	Anything else the auto broker should know?		0		QuoteCategory	1	45	67	t	t	211	\N	\N
220	2012-12-19 13:07:44	2017-05-08 06:24:54	anything-else-the-beautician-should-know	Anything else the beautician should know?		0		QuoteCategory	1	47	68	t	t	220	\N	\N
253	2012-12-19 13:52:34	2017-05-08 06:24:54	anything-else-the-personal-trainer-should-know	Anything else the personal trainer should know?		0		QuoteCategory	1	48	69	t	t	253	\N	\N
49	2012-07-31 18:00:09	2017-05-08 06:24:54	service-type	Service type		0	Insurance quote, Consultation, Other	QuoteCategory	4	21	46	t	t	49	\N	\N
244	2012-12-19 13:45:19	2017-05-08 06:24:54	anything-else-the-massage-should-know	Anything else the massage should know?		0		QuoteCategory	1	51	72	t	t	244	\N	\N
274	2012-12-19 15:10:36	2017-05-08 06:24:54	anything-else-the-academic-subjects-should-know	Anything else the academic subjects should know?		0		QuoteCategory	1	55	75	t	t	274	\N	\N
275	2012-12-19 15:10:51	2017-05-08 06:24:54	when-do-you-want-to-start-your-academic-subjects-class	When do you want to start your academic subjects class?		0		QuoteCategory	1	55	75	t	t	275	\N	\N
285	2012-12-19 15:43:47	2017-05-08 06:24:54	anything-else-the-computer-teacher-should-know-anything-else-the-computer-teacher-should-know	Anything else the computer teacher should know?Anything else the computer teacher should know?		0		QuoteCategory	1	57	77	t	t	285	\N	\N
286	2012-12-19 15:44:03	2017-05-08 06:24:54	when-do-you-want-your-computer-fixed	When do you want your computer fixed?		0		QuoteCategory	1	57	77	t	t	286	\N	\N
301	2012-12-19 15:57:16	2017-05-08 06:24:54	anything-else-the-arts-and-crafts-instructor-should-know	Anything else the arts and crafts instructor should know?		0		QuoteCategory	1	59	79	t	t	301	\N	\N
12	2012-07-31 17:32:50	2017-05-08 06:24:54	service-type	Service type		0	Personal, Business	QuoteCategory	5	4	82	t	t	9	\N	\N
13	2012-07-31 17:32:50	2017-05-08 06:24:54	when-do-you-want-your-errands-taken-care-of	When do you want your errands taken care of?		0		QuoteCategory	2	4	82	t	t	10	\N	\N
14	2012-07-31 17:32:50	2017-05-08 06:24:54	travel-preferences	Travel preferences		0	The errand specialist can travel to me, I can travel to the errand specialist, We can work remotely (over the phone or Internet)	QuoteCategory	4	4	82	t	t	11	\N	\N
322	2012-12-19 16:19:14	2017-05-08 06:24:54	when-would-you-like-to-start-your-sessions	When would you like to start your sessions?		0		QuoteCategory	1	62	87	t	t	322	\N	\N
326	2012-12-19 16:21:44	2017-05-08 06:24:54	anything-else-the-music-teacher-should-know	Anything else the music teacher should know?		0		QuoteCategory	1	63	88	t	t	326	\N	\N
390	2012-12-20 18:20:58	2017-05-08 06:24:54	when-do-you-want-your-air-conditioning-done	When do you want your air conditioning done?		0		QuoteCategory	1	76	99	t	t	390	\N	\N
10	2012-07-31 17:28:17	2017-04-13 11:16:37	when-do-you-want-your-errands-taken-care-of	When do you want your errands taken care of?		0		QuoteCategory	2	3	\N	t	t	10	\N	\N
11	2012-07-31 17:30:29	2017-04-13 11:16:37	travel-preferences	Travel preferences		0	The errand specialist can travel to me, I can travel to the errand specialist, We can work remotely (over the phone or Internet)	QuoteCategory	4	3	\N	t	t	11	\N	\N
34	2012-07-31 17:42:19	2017-05-08 06:24:54	what-kind-of-cleaning	What kind of cleaning?		0	One-time, Recurring, Move-in / Move-out, Other	QuoteCategory	4	12	39	t	t	34	\N	\N
35	2012-07-31 17:43:14	2017-05-08 06:24:54	what-do-you-need-cleaned	What do you need cleaned?		0	General dirt and grime, Splattered food, General odors, Smoke or soot, Cooking grease, Other	QuoteCategory	4	12	39	t	t	35	\N	\N
38	2012-07-31 17:46:01	2017-05-08 06:24:54	reason-for-cleaning	Reason for cleaning?		0	Move out, Estate sale, General cleaning, Hoarding, Foreclosure, Other	QuoteCategory	4	13	40	t	t	38	\N	\N
39	2012-07-31 17:46:32	2017-05-08 06:24:54	are-there-any-large-or-heavy-items-to-move	Are there any large or heavy items to move?		0	Yes, No	QuoteCategory	5	13	40	t	t	39	\N	\N
40	2012-07-31 17:46:55	2017-05-08 06:24:54	whats-your-location	What's your location?		0	Home, Office, Other	QuoteCategory	5	13	40	t	t	40	\N	\N
42	2012-07-31 17:49:01	2017-05-08 06:24:54	what-kind-of-cleanup	What kind of cleanup?		0	Hauling, Moving items within property, Yard / landscape cleanup, Other 	QuoteCategory	4	14	41	t	t	42	\N	\N
43	2012-07-31 17:49:57	2017-05-08 06:24:54	what-types-of-materials-are-involved	What types of materials are involved?		0	General trash, Yard clippings, Assorted junk, Construction debris, Furniture, Hazardous, Major appliance, Other	QuoteCategory	4	14	41	t	t	43	\N	\N
53	2012-07-31 18:06:16	2017-05-08 06:24:54	service-type	Service type		0	Sales, Live Response, Technical Support, Other	QuoteCategory	5	20	45	t	t	53	\N	\N
57	2012-07-31 18:09:18	2017-05-08 06:24:54	travel-preferences	Travel preferences		0	The customer service representative can travel to me, We can work remotely (over the phone or Internet)	QuoteCategory	4	20	45	t	t	57	\N	\N
56	2012-07-31 18:08:41	2017-05-08 06:24:54	when-do-you-want-the-work-done	When do you want the work done?		0		QuoteCategory	2	20	45	t	t	56	\N	\N
54	2012-07-31 18:07:20	2017-05-08 06:24:54	service-environment	Service environment		0	Call Center, Event, In person, Online/Virtual, Other	QuoteCategory	4	20	45	t	t	54	\N	\N
50	2012-07-31 18:01:00	2017-05-08 06:24:54	insurance-type	Insurance type		0	Life, Property, Health, Commercial, Auto, Other	QuoteCategory	4	21	46	t	t	50	\N	\N
51	2012-07-31 18:02:11	2017-05-08 06:24:54	when-do-you-want-to-meet-with-a-broker	When do you want to meet with a broker?		0		QuoteCategory	2	21	46	t	t	51	\N	\N
644	2017-05-11 14:06:01	2017-05-11 14:06:01	Upload your file	Upload your file		\N		ContestType	8	11	11	f	t	0	\N	\N
52	2012-07-31 18:03:16	2017-05-08 06:24:54	travel-preferences	Travel preferences		0	The insurance broker can travel to me, I can travel to the insurance broker	QuoteCategory	4	21	46	t	t	52	\N	\N
111	2012-10-24 12:44:29	2017-05-08 06:24:54	service-type	Service type		0	Cremation,Memorial,Ash scattering,Dove releasing,Other	QuoteCategory	4	32	55	t	t	111	\N	\N
204	2012-12-19 12:47:55	2017-05-08 06:24:54	what-is-your-cars-year-make-and-model	What is your car's year, make and model?		0		QuoteCategory	1	44	66	t	t	204	\N	\N
205	2012-12-19 12:48:14	2017-05-08 06:24:54	anything-else-the-auto-technician-should-know	Anything else the auto technician should know?		0		QuoteCategory	1	44	66	t	t	205	\N	\N
212	2012-12-19 12:54:29	2017-05-08 06:24:54	when-do-you-want-to-meet-with-a-broker	When do you want to meet with a broker?		0		QuoteCategory	1	45	67	t	t	212	\N	\N
15	2012-07-31 17:33:18	2017-05-08 06:24:54	service-type	Service type		0	Personal, Business	QuoteCategory	5	5	83	t	t	9	\N	\N
18	2012-07-31 17:33:36	2017-05-08 06:24:54	service-type	Service type		0	Personal, Business	QuoteCategory	5	6	84	t	t	9	\N	\N
19	2012-07-31 17:33:36	2017-05-08 06:24:54	when-do-you-want-your-errands-taken-care-of	When do you want your errands taken care of?		0		QuoteCategory	2	6	84	t	t	10	\N	\N
20	2012-07-31 17:33:36	2017-05-08 06:24:54	travel-preferences	Travel preferences		0	The errand specialist can travel to me, I can travel to the errand specialist, We can work remotely (over the phone or Internet)	QuoteCategory	4	6	84	t	t	11	\N	\N
21	2012-07-31 17:33:54	2017-05-08 06:24:54	service-type	Service type		0	Personal, Business	QuoteCategory	5	7	85	t	t	9	\N	\N
22	2012-07-31 17:33:54	2017-05-08 06:24:54	when-do-you-want-your-errands-taken-care-of	When do you want your errands taken care of?		0		QuoteCategory	2	7	85	t	t	10	\N	\N
45	2012-07-31 17:51:53	2017-04-13 11:16:37	what-do-you-need	What do you need?		0		QuoteCategory	2	15	\N	t	t	45	\N	\N
46	2012-07-31 17:52:07	2017-04-13 11:16:37	when-do-you-want-the-work-done	When do you want the work done?		0		QuoteCategory	2	15	\N	t	t	46	\N	\N
23	2012-07-31 17:33:54	2017-05-08 06:24:54	travel-preferences	Travel preferences		0	The errand specialist can travel to me, I can travel to the errand specialist, We can work remotely (over the phone or Internet)	QuoteCategory	4	7	85	t	t	11	\N	\N
24	2012-07-31 17:34:12	2017-05-08 06:24:54	service-type	Service type		0	Personal, Business	QuoteCategory	5	8	86	t	t	9	\N	\N
787	2017-05-11 14:06:03	2017-05-11 14:06:03	Target Market	Target Market		\N		ContestType	2	27	27	f	t	0	\N	\N
25	2012-07-31 17:34:12	2017-05-08 06:24:54	when-do-you-want-your-errands-taken-care-of	When do you want your errands taken care of?		0		QuoteCategory	2	8	86	t	t	10	\N	\N
26	2012-07-31 17:34:12	2017-05-08 06:24:54	travel-preferences	Travel preferences		0	The errand specialist can travel to me, I can travel to the errand specialist, We can work remotely (over the phone or Internet)	QuoteCategory	4	8	86	t	t	11	\N	\N
373	2012-12-20 15:55:03	2017-05-08 06:24:54	when-do-you-want-the-work-done	When do you want the work done?		0		QuoteCategory	2	73	96	t	t	373	\N	\N
30	2012-07-31 17:38:18	2017-05-08 06:24:54	how-often	How often?		0	One-time / Light clean, Every other week, One-time / Deep clean, Monthly, Weekly, I'm not sure yet	QuoteCategory	5	11	101	t	t	1	\N	\N
59	2012-07-31 18:29:34	2017-05-08 06:24:54	what-kind-of-legal-service	What kind of legal service?		0	Legal document assistant, Notary public, Legal research, Process server, Legal transcription, Mobile notary, Other 	QuoteCategory	4	19	44	t	t	59	\N	\N
60	2012-07-31 18:30:04	2017-05-08 06:24:54	nature-of-legal-needs	Nature of legal needs?		0	Personal / Home, I'm not sure, Business	QuoteCategory	4	19	44	t	t	60	\N	\N
67	2012-10-24 11:39:03	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Babysitting,Errands,Laundry Service,Other	QuoteCategory	5	23	47	t	t	1	\N	\N
68	2012-10-24 11:39:46	2017-05-08 06:24:54	how-many-children	How many children?		0	1,2,3,4,5 or more	QuoteCategory	5	23	47	t	t	2	\N	\N
69	2012-10-24 11:40:53	2017-05-08 06:24:54	age-s	Age(s)		0	1 or younger,2-4,5-6,7-8,9-10,11-12,13-15,16 or older	QuoteCategory	4	23	47	f	t	3	\N	\N
71	2012-10-24 11:43:16	2017-05-08 06:24:54	anything-else-the-babysitter-should-know	Anything else the babysitter should know?		0		QuoteCategory	2	23	47	f	t	71	\N	\N
73	2012-10-24 11:47:27	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Dog Walking,Pet Sitting,Pet Care,Other	QuoteCategory	5	24	48	t	t	73	\N	\N
74	2012-10-24 11:48:34	2017-05-08 06:24:54	how-often	How often?		0	Daily walk,Multiple daily walks,More than once a week,Once a week,One-time walk	QuoteCategory	5	24	48	t	t	74	\N	\N
75	2012-10-24 11:49:31	2017-05-08 06:24:54	additional-services-required	Additional services required?		0	Feeding,Baths,Grooming,Medication,No additional services,I'm not sure yet	QuoteCategory	4	24	48	t	t	75	\N	\N
76	2012-10-24 11:50:00	2017-05-08 06:24:54	what-size-is-your-dog	What size is your dog?		0	Small,Medium,Large	QuoteCategory	5	24	48	t	t	76	\N	\N
78	2012-10-24 11:53:17	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Senior Care,Nurse,Other	QuoteCategory	5	25	49	t	t	1	\N	\N
79	2012-10-24 11:55:34	2017-05-08 06:24:54	care-services	Care services		0	In-home care,Bathing,Meal preparation,Light housekeeping,Transportation,Laundry,Grocery shopping,Other	QuoteCategory	4	25	49	t	t	2	\N	\N
80	2012-10-24 11:56:48	2017-05-08 06:24:54	current-living-situation	Current living situation		0	Home (independent),Home (with spouse or family),Home (with care service),Retirement community,Residential care home,Nursing home,Hospital,Other	QuoteCategory	5	25	49	t	t	3	\N	\N
81	2012-10-24 11:57:46	2017-05-08 06:24:54	special-medical-services	Special medical services		0	Nursing care,Recovery from injury or sugery,Palliative care/symptom management,Hospice care,Physical therapy,Administer medicine,None,Other	QuoteCategory	4	25	49	t	t	4	\N	\N
84	2012-10-24 12:01:29	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Pet Sitting,Personal Assistant,Errands,House Sitting,Grocery Shopping,Other	QuoteCategory	5	26	50	t	t	84	\N	\N
85	2012-10-24 12:02:29	2017-05-08 06:24:54	which-pet-s-need-a-sitter	Which pet(s) need a sitter?		0	Dog(s),Cat(s),Fish,Bird(s),Reptile(s),Bunny / Rabbit(s),Other	QuoteCategory	4	26	50	t	t	85	\N	\N
86	2012-10-24 12:03:04	2017-05-08 06:24:54	how-long	How long?		0	One-time extended stay (multiple days),One day only,Regular (weekly, monthly, etc.),Other	QuoteCategory	4	26	50	t	t	86	\N	\N
87	2012-10-24 12:03:59	2017-05-08 06:24:54	will-your-pet-s-need-any-other-services	Will your pet(s) need any other services?		0	Feeding,Bathing,Grooming,Medication,No additional services,Other	QuoteCategory	4	26	50	t	t	87	\N	\N
88	2012-10-24 12:04:33	2017-05-08 06:24:54	anything-else-the-pet-sitter-should-know	Anything else the pet sitter should know?		0		QuoteCategory	2	26	50	f	t	88	\N	\N
93	2012-10-24 12:07:42	2017-05-08 06:24:54	dominant-characteristic-s	Dominant characteristic(s)		0	Inattention,Hyperactivity,Impulsiveness,Other	QuoteCategory	4	28	52	t	t	93	\N	\N
94	2012-10-24 12:08:17	2017-05-08 06:24:54	additional-service-s	Additional service(s)		0	Educational assistance,Occupational assistance,None,Other	QuoteCategory	4	28	52	t	t	94	\N	\N
95	2012-10-24 12:08:59	2017-05-08 06:24:54	anything-else-the-adhd-caregiver-should-know	Anything else the ADHD caregiver should know?		0		QuoteCategory	2	28	52	f	t	95	\N	\N
97	2012-10-24 12:18:52	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	DJ,MC / Host,Event Lighting, Sound & Video,Other	QuoteCategory	5	30	53	t	t	97	\N	\N
98	2012-10-24 12:19:48	2017-05-08 06:24:54	what-kind-of-event	What kind of event?		0	Wedding,Birthday party,Office party,General event/party,Other	QuoteCategory	5	30	53	t	t	98	\N	\N
99	2012-10-24 12:20:41	2017-05-08 06:24:54	how-many-hours	How many hours?		0	1 hour(s),2 hour(s),3 hour(s),4 hour(s),5 hour(s),6 hour(s) or more	QuoteCategory	5	30	53	t	t	99	\N	\N
101	2012-10-24 12:22:07	2017-05-08 06:24:54	what-equipment-do-you-need	What equipment do you need?		0	Sound/PA system,Microphones,Disco lighting,Fog machine,I'm not sure yet	QuoteCategory	4	30	53	t	t	101	\N	\N
137	2012-10-24 13:07:41	2017-05-08 06:24:54	number-of-guests	Number of guests		0	Fewer than 50,50-100,100-150,150-200,More than 200	QuoteCategory	5	36	59	t	t	137	\N	\N
235	2012-12-19 13:36:21	2017-05-08 06:24:54	anything-else-the-massage-health-should-know	Anything else the massage health should know?		0		QuoteCategory	1	49	70	t	t	235	\N	\N
226	2012-12-19 13:33:57	2017-05-08 06:24:54	specialty	Specialty		0	Hypnotherapy, Psychotherapy, General therapist, Child psychology, Musical / sound therapy, Spiritual / holistic	QuoteCategory	4	49	70	t	t	226	\N	\N
763	2017-05-11 14:06:03	2017-05-11 14:06:03	Business name	Business name		\N		ContestType	1	23	25	f	t	0	\N	\N
227	2012-12-19 13:34:10	2017-05-08 06:24:54	what-type-of-reading	What type of reading?		0	Aura, Distance reading, Lithomancy and crystallomancy, Numerology, Psychometry, Rune reading, I'm not sure, Other	QuoteCategory	4	49	70	t	t	227	\N	\N
228	2012-12-19 13:34:30	2017-05-08 06:24:54	what-are-your-goals-from-the-psychic-reading	What are your goals from the psychic reading?		0	Predictions, Advice, Afterlife communication, I'm not sure, Other	QuoteCategory	4	49	70	t	t	228	\N	\N
247	2012-12-19 13:47:11	2017-05-08 06:24:54	what-do-you-need	What do you need?		0		QuoteCategory	2	53	74	t	t	247	\N	\N
289	2012-12-19 15:47:31	2017-05-08 06:24:54	age	Age		0	Child, Teen, Adult	QuoteCategory	5	58	78	t	t	289	\N	\N
350	2012-12-20 15:43:45	2017-05-08 06:24:54	when-do-you-want-the-work-done	When do you want the work done?		0		QuoteCategory	2	68	92	t	t	350	\N	\N
104	2012-10-24 12:27:02	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Catering and Chef,Party Planning,Other	QuoteCategory	5	31	54	t	t	104	\N	\N
112	2012-10-24 12:45:24	2017-05-08 06:24:54	service-location	Service location		0	Funeral home chapel,Place of worship (e.g. church, temple),Cemetery chapel,Graveside,Home,I'm not sure,Other	QuoteCategory	5	32	55	t	t	112	\N	\N
113	2012-10-24 12:46:08	2017-05-08 06:24:54	special-ceremonies-or-rites	Special ceremonies or rites		0	Free & Accepted Masons,Veterans/military,Elks,Moose,None,Other	QuoteCategory	4	32	55	t	t	113	\N	\N
114	2012-10-24 12:46:28	2017-05-08 06:24:54	anything-else-the-funeral-service-professional-should-know	Anything else the funeral service professional should know?		0		QuoteCategory	2	32	55	f	t	114	\N	\N
120	2012-10-24 12:51:03	2017-05-08 06:24:54	additional-service	Additional Service		0	Appetizers,Beverages (non-alcoholic),Beverages (alcoholic),No additional service,Other	QuoteCategory	4	33	56	t	t	120	\N	\N
116	2012-10-24 12:48:11	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Catering and Chef,Personal Chef,Other	QuoteCategory	5	33	56	t	t	116	\N	\N
9	2012-07-31 17:27:55	2017-04-13 11:16:38	service-type	Service type		0	Personal, Business	QuoteCategory	4	3	\N	t	t	9	\N	\N
117	2012-10-24 12:49:14	2017-05-08 06:24:54	what-type-of-event	What type of event?		0	Buffet catered event,Buffet dinner party,Plated dinner party,Personal meal(s),Cocktail party,Food truck,I'm not sure yet	QuoteCategory	5	33	56	t	t	117	\N	\N
118	2012-10-24 12:50:01	2017-05-08 06:24:54	what-kind-of-cuisine	What kind of cuisine?		0	Casual American,Mexican/Latin,Formal American,Italian,BBQ,Vegetarian/Vegan,I'm not sure yet,Other	QuoteCategory	4	33	56	t	t	118	\N	\N
119	2012-10-24 12:50:35	2017-05-08 06:24:54	how-many-people	How many people?		0	Fewer than 10,10-25,25-50,50-100,100-150,150-200,More than 200	QuoteCategory	5	33	56	t	t	119	\N	\N
123	2012-10-24 12:57:27	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Wedding Photography,Event Photography,Photography,Headshot Photography,Other	QuoteCategory	5	34	57	t	t	123	\N	\N
124	2012-10-24 12:58:20	2017-05-08 06:24:54	what-events-do-you-need-shot	What events do you need shot?		0	Ceremony photos,Reception photos,Ceremony preparation,Engagement photos,Family photos,I'm not sure yet,Other	QuoteCategory	4	34	57	t	t	124	\N	\N
125	2012-10-24 12:59:17	2017-05-08 06:24:54	whats-your-wedding-style	What's your wedding style?		0	Intimate,Outdoor,Indoor,Formal,It's a big party,Semi-Formal / Casual,I'm not sure yet,Other	QuoteCategory	4	34	57	t	t	125	\N	\N
126	2012-10-24 12:59:52	2017-05-08 06:24:54	whats-your-estimated-budget	What's your estimated budget?		0	Less than $1,000,$1,000-$3,000,$3,000-$5,000,More than $5,000	QuoteCategory	5	34	57	t	t	126	\N	\N
127	2012-10-24 13:00:17	2017-05-08 06:24:54	anything-else-the-wedding-photographer-should-know	Anything else the wedding photographer should know?		0		QuoteCategory	2	34	57	f	t	127	\N	\N
129	2012-10-24 13:02:22	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Computer Repair,Wedding Videography,Videography,Photo Scanning,Data Recovery Service,DVD & CD Conversion & Duplication,Other	QuoteCategory	5	35	58	t	t	129	\N	\N
130	2012-10-24 13:03:24	2017-05-08 06:24:54	what-do-you-need-repaired	What do you need repaired?		0	Windows desktop,Windows laptop,Mac desktop,Mac laptop,Tablet,Smartphone,Peripherals (printer, keyboard, monitor),Other	QuoteCategory	4	35	58	t	t	130	\N	\N
131	2012-10-24 13:04:25	2017-05-08 06:24:54	what-do-you-need-help-with	What do you need help with?		0	Figuring out what's wrong,Fixing hardware,Fixing software,Screen is cracked or damaged,Virus or malware removal,Connecting to the Internet,Connecting devices,Computer won't turn on,Other	QuoteCategory	4	35	58	t	t	131	\N	\N
132	2012-10-24 13:04:51	2017-05-08 06:24:54	anything-else-the-computer-technician-should-know	Anything else the computer technician should know?		0		QuoteCategory	2	35	58	f	t	132	\N	\N
134	2012-10-24 13:06:19	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	DJ,MC / Host,Event Lighting, Sound & Video,Other	QuoteCategory	5	36	59	t	t	134	\N	\N
135	2012-10-24 13:06:55	2017-05-08 06:24:54	what-kind-of-event	What kind of event?		0	Wedding,Birthday party,Office party,General event/party,Other	QuoteCategory	5	36	59	t	t	135	\N	\N
136	2012-10-24 13:07:16	2017-05-08 06:24:54	how-many-hours	How many hours?		0	1 hour(s),2 hour(s),3 hour(s),4 hour(s),5 hour(s),6 hour(s) or more	QuoteCategory	5	36	59	t	t	136	\N	\N
138	2012-10-24 13:08:18	2017-05-08 06:24:54	what-equipment-do-you-need	What equipment do you need?		0	Sound/PA system,Microphones,Disco lighting,Fog machine,I'm not sure yet	QuoteCategory	4	36	59	t	t	138	\N	\N
139	2012-10-24 13:08:33	2017-05-08 06:24:54	anything-else-the-dj-should-know	Anything else the DJ should know?		0		QuoteCategory	2	36	59	f	t	139	\N	\N
141	2012-10-24 13:09:44	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	DJ,MC / Host,Event Lighting, Sound & Video,Other	QuoteCategory	5	37	60	t	t	141	\N	\N
142	2012-10-24 13:10:30	2017-05-08 06:24:54	services	Services		0	Lighting,Live music,Recorded music,Video,Other	QuoteCategory	4	37	60	t	t	142	\N	\N
143	2012-10-24 13:11:18	2017-05-08 06:24:54	event-type	Event type		0	Wedding,Fundraiser,Adult party,Children's party,Corporate,Other	QuoteCategory	5	37	60	t	t	143	\N	\N
144	2012-10-24 13:11:59	2017-05-08 06:24:54	event-length	Event length		0	1 hour or less,1-2 hours,2-3 hours,3-4 hours,4 hours or more	QuoteCategory	5	37	60	t	t	144	\N	\N
145	2012-10-24 13:12:25	2017-05-08 06:24:54	number-of-guests	Number of guests		0	Fewer than 50,50-100,100-150,150-200,More than 200	QuoteCategory	5	37	60	t	t	145	\N	\N
16	2012-07-31 17:33:18	2017-05-08 06:24:54	when-do-you-want-your-errands-taken-care-of	When do you want your errands taken care of?		0		QuoteCategory	2	5	83	t	t	10	\N	\N
17	2012-07-31 17:33:18	2017-05-08 06:24:54	travel-preferences	Travel preferences		0	The errand specialist can travel to me, I can travel to the errand specialist, We can work remotely (over the phone or Internet)	QuoteCategory	4	5	83	t	t	11	\N	\N
148	2012-10-24 13:14:14	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Wedding Photography,Event Photography,Photography,Headshot Photography,Other	QuoteCategory	5	38	61	t	t	148	\N	\N
158	2012-12-19 11:33:16	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Auto Repair, Vehicle Detailing, Car Wash, Car Detailing, Car Restoration, Car Tuning and Modifying, Other	QuoteCategory	5	41	63	t	t	1	\N	\N
159	2012-12-19 11:37:10	2017-05-08 06:24:54	what-needs-work	What needs work?		0	Transmission, Brakes, A/C and heating, Electrical and lights, Scheduled maintenance, Full detailing (interior and exterior), Exterior detailing, Interior detailing, Scratch & swirl repair, Stain removal, Window cleaning, Other	QuoteCategory	4	41	63	t	t	2	\N	\N
55	2012-07-31 18:08:20	2017-05-08 06:24:54	preferred-languages	Preferred languages		0	English, German, Spanish, Other, French	QuoteCategory	4	20	45	t	t	55	\N	\N
166	2012-12-19 12:01:53	2017-05-08 06:24:54	any-special-instructions-or-requests	Any special instructions or requests?		0	Waxing, Claying (clay bar), Steam clean interior, Steam clean engine bay, Leather conditioning, Convertible top cleaning, Nothing else, Other	QuoteCategory	4	41	63	t	t	5	\N	\N
165	2012-12-19 11:56:41	2017-05-08 06:24:54	what-kind-of-vehicle	What kind of vehicle?		0	Car, Truck/SUV, Commercial truck, RV, Boat, Other	QuoteCategory	5	41	63	t	t	4	\N	\N
170	2012-12-19 12:15:21	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Auto Repair, Vehicle Electronics, Car Restoration, Car Tuning and Modifying, Other	QuoteCategory	5	42	64	t	t	1	\N	\N
183	2012-12-19 12:38:54	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Limousine Driving, Ground Transportation, Wedding Transportation, Taxi, Airport Shuttle	QuoteCategory	5	43	65	t	t	1	\N	\N
184	2012-12-19 12:39:18	2017-05-08 06:24:54	what-kind-of-event-are-you-having	What kind of event are you having?		0	Wedding, Birthday, Transfer, Bachelor(ette) party, Prom, Date, Business, Other	QuoteCategory	4	43	65	t	t	2	\N	\N
187	2012-12-19 12:40:14	2017-05-08 06:24:54	what-is-the-transport-for	What is the transport for?		0	Airport/shuttle service, General transportation, Wedding/special event, Leisure/party, Corporate/business, Other	QuoteCategory	4	43	65	t	t	5	\N	\N
188	2012-12-19 12:40:34	2017-05-08 06:24:54	what-kind-of-transportation-do-you-need	What kind of transportation do you need?		0	Limousine, Vintage Luxury, Horse-drawn carriage, Shuttle service, I'm not sure, Other	QuoteCategory	4	43	65	t	t	6	\N	\N
189	2012-12-19 12:40:49	2017-05-08 06:24:54	who-will-be-transported	Who will be transported?		0	Bride and Groom only, Small wedding party, Large wedding party, Guests, I'm not sure, Other	QuoteCategory	4	43	65	t	t	7	\N	\N
190	2012-12-19 12:41:05	2017-05-08 06:24:54	approximate-travel-distance	Approximate travel distance?		0	Less than 10 miles, 10-25 miles, 25-50 miles, More than 50 miles	QuoteCategory	4	43	65	t	t	8	\N	\N
197	2012-12-19 12:45:57	2017-05-08 06:24:54	what-kind-of-vehicle	What kind of vehicle?		0	Car, Truck/SUV, Commercial truck, RV, Boat, Other	QuoteCategory	5	44	66	t	t	197	\N	\N
201	2012-12-19 12:47:09	2017-05-08 06:24:54	what-kind-of-restoration	What kind of restoration?		0	Component (Engine or Transmission), Partial (Frame-on), Full (Frame-off), I'm not sure, Other	QuoteCategory	5	44	66	t	t	201	\N	\N
202	2012-12-19 12:47:25	2017-05-08 06:24:54	what-needs-attention	What needs attention?		0	Rust (body / chassis), Paint, Interior / Upholstery, Electrical, Chrome / Trim, SuspensionComplete vehicle	QuoteCategory	4	44	66	t	t	202	\N	\N
203	2012-12-19 12:47:41	2017-05-08 06:24:54	something-specific	Something specific?		0	Turbo / Supercharger, Body kit, Air suspension, Coil-over suspension, Wheels / Tires, Port and Polish (cylinder head), I'm not sure	QuoteCategory	4	44	66	t	t	203	\N	\N
196	2012-12-19 12:45:28	2017-05-08 06:24:54	what-kind-of-work	What kind of work?		0	I'm not sure what's wrong, Engine, Transmission, Brakes, A/C and heating, Electrical and lights, Scheduled maintenance	QuoteCategory	4	44	66	t	t	196	\N	\N
199	2012-12-19 12:46:39	2017-05-08 06:24:54	what-kind-of-electronics	What kind of electronics?		0	Audio (stereo/speakers), Remote Starter, Alarm / security, Safety (backup sensors / camera), Navigation (GPS), Other	QuoteCategory	4	44	66	t	t	199	\N	\N
200	2012-12-19 12:46:52	2017-05-08 06:24:54	what-do-you-need-done	What do you need done?		0	Install, Repair, Replace, Remove, Modification/Custom, Other	QuoteCategory	4	44	66	t	t	200	\N	\N
207	2012-12-19 12:48:47	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me	QuoteCategory	5	44	66	t	t	207	\N	\N
195	2012-12-19 12:44:36	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Auto Repair, Vehicle Electronics, Car Restoration, Car Tuning and Modifying, Other	QuoteCategory	4	44	66	t	t	195	\N	\N
261	2012-12-19 13:56:34	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me	QuoteCategory	5	50	71	t	t	261	\N	\N
367	2012-12-20 15:52:39	2017-05-08 06:24:54	anything-else-the-designer-should-know	Anything else the designer should know?		0		QuoteCategory	1	71	94	t	t	367	\N	\N
386	2012-12-20 18:19:43	2017-05-08 06:24:54	what-kind-of-work	What kind of work?		0	Install, Repair, Replace	QuoteCategory	4	76	99	t	t	386	\N	\N
210	2012-12-19 12:54:02	2017-05-08 06:24:54	additional-services	Additional services		0	Consignment, Appraisal, Inspection, None, Other	QuoteCategory	4	45	67	t	t	210	\N	\N
217	2012-12-19 13:05:32	2017-05-08 06:24:54	what-do-you-need-done	What do you need done?		0	Manicure, Pedicure, Overlays and Extensions, Nail polish, Nail art / design, Sculpted extensions, Other	QuoteCategory	4	47	68	t	t	217	\N	\N
214	2012-12-19 13:02:24	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Beautician, Nail Care, Other	QuoteCategory	4	47	68	t	t	214	\N	\N
215	2012-12-19 13:03:43	2017-05-08 06:24:54	what-kind-of-beauty-care	What kind of beauty care?		0	Hair (styling or extension), Eyelash extension, Nails (manicure/pedicure), Makeup, Permanent makeup, Skin care, Eyebrow and face threading, Other	QuoteCategory	4	47	68	t	t	215	\N	\N
216	2012-12-19 13:04:12	2017-05-08 06:24:54	would-you-like-anything-else	Would you like anything else?		0	Massage, Body Wrap, No other services needed, Other	QuoteCategory	4	47	68	t	t	216	\N	\N
251	2012-12-19 13:50:30	2017-05-08 06:24:54	where-do-you-want-to-train	Where do you want to train?		0	Gym / Fitness Center, Home, Outdoors, Other	QuoteCategory	4	48	69	t	t	251	\N	\N
223	2012-12-19 13:33:04	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Massage Therapy, Spiritual Counseling, Alternative Healing, Therapist, Therapist, Psychic Reading, Reiki Healing	QuoteCategory	4	49	70	t	t	223	\N	\N
224	2012-12-19 13:33:24	2017-05-08 06:24:54	what-kind-of-counseling	What kind of counseling?		0	Psychic, Tarot reading, Palm reading, Astrology, Shaman, Spell Casting, Medium, Other	QuoteCategory	4	49	70	t	t	224	\N	\N
225	2012-12-19 13:33:45	2017-05-08 06:24:54	what-do-you-want-to-focus-on	What do you want to focus on?		0	Relationship / Love, Life, Career, Finance, Health, Decision making, Deceased, Other	QuoteCategory	4	49	70	t	t	225	\N	\N
257	2012-12-19 13:55:33	2017-05-08 06:24:54	travel-method	Travel method		0	Air, Car, Boat, Train, Other	QuoteCategory	4	50	71	t	t	257	\N	\N
239	2012-12-19 13:43:49	2017-05-08 06:24:54	what-are-your-goals	What are your goals?		0	Relaxation / stress relief, Pain relief, Increase flexibility, Increase circulation, Emotional healing, Detoxification, Physical (Sports) therapy, Other	QuoteCategory	4	51	72	t	t	2	\N	\N
238	2012-12-19 13:43:29	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Massage Therapy, Alternative Healing	QuoteCategory	4	51	72	t	t	1	\N	\N
371	2012-12-20 15:54:07	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me, Neither (phone or internet)	QuoteCategory	5	72	95	t	t	371	\N	\N
240	2012-12-19 13:44:08	2017-05-08 06:24:54	what-method-of-treatment	What method of treatment?		0	Reiki, Colon therapy, Acupuncture, Herbalism, Naturopathy, Homeopathy, Acupressure, Chiropractic / osteopathy, Craniosacral therapy, Other	QuoteCategory	4	51	72	t	t	3	\N	\N
267	2012-12-19 14:00:02	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me	QuoteCategory	5	52	73	t	t	267	\N	\N
249	2012-12-19 13:47:56	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me, Neither (phone or internet)	QuoteCategory	4	53	74	t	t	249	\N	\N
293	2012-12-19 15:48:52	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me	QuoteCategory	5	58	78	t	t	293	\N	\N
311	2012-12-19 16:04:16	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me	QuoteCategory	5	60	80	t	t	311	\N	\N
305	2012-12-19 16:01:17	2017-05-08 06:24:54	what-are-your-fitness-goals	What are your fitness goals?		0	Weight loss, Firming and toning, Weight gain and muscle build, Endurance training, Sport-specific training, Other	QuoteCategory	4	60	80	t	t	305	\N	\N
317	2012-12-19 16:11:23	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me	QuoteCategory	5	61	81	t	t	317	\N	\N
329	2012-12-19 16:27:15	2017-05-08 06:24:54	what-do-you-need-done	What do you need done?		0		QuoteCategory	4	64	89	t	t	329	\N	\N
332	2012-12-19 16:28:30	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me	QuoteCategory	5	64	89	t	t	332	\N	\N
351	2012-12-20 15:43:59	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me, Neither (phone or internet)	QuoteCategory	5	68	92	t	t	351	\N	\N
164	2012-12-19 11:42:24	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me	QuoteCategory	5	41	63	t	t	12	\N	\N
182	2012-12-19 12:19:27	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me	QuoteCategory	5	42	64	t	t	182	\N	\N
222	2012-12-19 13:08:17	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me	QuoteCategory	5	47	68	t	t	222	\N	\N
250	2012-12-19 13:49:55	2017-05-08 06:24:54	what-are-your-fitness-goals	What are your fitness goals?		0	Weight loss, Firming and toning, Weight gain and muscle build, Endurance training, Sport-specific training, Other	QuoteCategory	4	48	69	t	t	250	\N	\N
237	2012-12-19 13:36:49	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me, Neither (phone or internet)	QuoteCategory	5	49	70	t	t	237	\N	\N
241	2012-12-19 13:44:28	2017-05-08 06:24:54	how-often	How often?		0	One time, Once or twice a month, Once or twice a week, Recurring, I'm not sure, Other	QuoteCategory	4	51	72	t	t	4	\N	\N
246	2012-12-19 13:45:52	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me, Neither (phone or internet)	QuoteCategory	5	51	72	t	t	246	\N	\N
262	2012-12-19 13:58:24	2017-05-08 06:24:54	coaching-type	Coaching type		0	Life, Career, Health/Wellness, Health/Wellness, Other	QuoteCategory	4	52	73	t	t	262	\N	\N
269	2012-12-19 15:08:59	2017-05-08 06:24:54	what-type-of-math	What type of math?		0	Arithmetic / General, Algebra, Geometry, Calculus, Precalculus, Statistics, Other	QuoteCategory	4	55	75	t	t	269	\N	\N
270	2012-12-19 15:09:15	2017-05-08 06:24:54	what-type-of-algebra	What type of algebra?		0	Abstract, Elementary (basic), I'm not sure	QuoteCategory	4	55	75	t	t	270	\N	\N
278	2012-12-19 15:27:13	2017-05-08 06:24:54	how-often-would-you-like-to-meet-with-a-tutor	How often would you like to meet with a tutor?		0	Daily, Several times a week, Once a week, Once or twice a week, Once or twice a month, I'm not sure, Other	QuoteCategory	4	56	76	t	t	278	\N	\N
277	2012-12-19 15:26:37	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Accounting Training, Marketing Training, Business Finance Training, College Admissions Counseling, Economics Tutoring, ACT Preparation, ASVAB Preparation, GED Preparation, GMAT Preparation, GRE Preparation, ISEE Preparation, TOEFL Preparation, Math Tutoring, Algebra Tutoring, Calculus Tutoring	QuoteCategory	4	56	76	t	t	277	\N	\N
282	2012-12-19 15:42:43	2017-05-08 06:24:54	what-do-you-want-help-with	What do you want help with?		0	General PC, General Apple/Mac, Word Processing (Word), Spreadsheets (Excel), Presentation (Powerpoint), Quickbooks, Graphics (Photoshop), Database/SQL, CAD, Other	QuoteCategory	4	57	77	t	t	282	\N	\N
288	2012-12-19 15:46:43	2017-05-08 06:24:54	what-kind-of-arts-crafts	What kind of Arts & Crafts?		0	Painting, Drawing, Sculpting, Pottery, Jewelry making, Calligraphy, Book making, Beadmaking, Basket weaving, Other	QuoteCategory	4	58	78	t	t	288	\N	\N
295	2012-12-19 15:52:47	2017-05-08 06:24:54	what-kind-of-arts-crafts	What kind of Arts & Crafts?		0	Painting, Drawing, Sculpting, Pottery, Jewelry making, Calligraphy, Book making, Beadmaking, Basket weaving, Other	QuoteCategory	4	59	79	t	t	295	\N	\N
296	2012-12-19 15:53:44	2017-05-08 06:24:54	what-kind-of-paints	What kind of paints?		0	Watercolor, Acrylics, Oil, I'm not sure / As recommended, Other	QuoteCategory	4	59	79	t	t	296	\N	\N
297	2012-12-19 15:54:28	2017-05-08 06:24:54	what-kind-of-painting	What kind of painting?		0	Traditional (canvas/paper), Wall / Mural art, Face / Body painting, I'm not sure, Other	QuoteCategory	4	59	79	t	t	297	\N	\N
294	2012-12-19 15:51:48	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Arts and Crafts Lessons, Painting Lessons	QuoteCategory	4	59	79	t	t	294	\N	\N
304	2012-12-19 16:00:49	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Personal Training, Running and Jogging Instruction, Triathalon Training	QuoteCategory	4	60	80	t	t	304	\N	\N
306	2012-12-19 16:01:38	2017-05-08 06:24:54	where-do-you-want-to-train	Where do you want to train?		0	Gym / Fitness Center, Home, Outdoors, Other	QuoteCategory	4	60	80	t	t	306	\N	\N
313	2012-12-19 16:09:01	2017-05-08 06:24:54	what-are-your-current-language-skills	What are your current language skills?		0	Beginner speaking, Conversational speaking, Fluent speaking, Beginner reading/writing, Intermediate reading/writing, Advanced reading/writing	QuoteCategory	4	61	81	t	t	313	\N	\N
318	2012-12-19 16:17:52	2017-05-08 06:24:54	coaching-type	Coaching type		0	Life, Career, Health/Wellness, Dating/relationship, Other	QuoteCategory	4	62	87	t	t	318	\N	\N
325	2012-12-19 16:21:17	2017-05-08 06:24:54	current-level-of-experience	Current level of experience?		0	No Experience, Beginning, Intermediate, Advanced, Not sure	QuoteCategory	4	63	88	t	t	325	\N	\N
334	2012-12-20 15:36:38	2017-05-08 06:24:54	what-kind-of-editing	What kind of editing?		0	Proofreading, Book, Copyediting, Dissertation, Script, Application, General document / writing, Other	QuoteCategory	4	66	90	t	t	334	\N	\N
374	2012-12-20 15:55:23	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me, Neither (phone or internet)	QuoteCategory	5	73	96	t	t	374	\N	\N
380	2012-12-20 15:57:46	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me, Neither (phone or internet)	QuoteCategory	5	74	97	t	t	380	\N	\N
384	2012-12-20 15:59:00	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me, Neither (phone or internet)	QuoteCategory	5	75	98	t	t	384	\N	\N
28	2012-07-31 17:34:35	2017-05-08 06:24:54	when-do-you-want-your-errands-taken-care-of	When do you want your errands taken care of?		0		QuoteCategory	2	9	38	t	t	10	\N	\N
29	2012-07-31 17:34:35	2017-05-08 06:24:54	travel-preferences	Travel preferences		0	The errand specialist can travel to me, I can travel to the errand specialist, We can work remotely (over the phone or Internet)	QuoteCategory	4	9	38	t	t	11	\N	\N
36	2012-07-31 17:43:59	2017-05-08 06:24:54	what-kind-of-business	What kind of business?		0	Retail or restaurant, Manufacturing or industrial, Health-care facility, Property management, School or church, Other	QuoteCategory	4	12	39	t	t	36	\N	\N
47	2012-07-31 17:52:58	2017-05-08 06:24:54	what-do-you-need	What do you need?		0		QuoteCategory	1	16	42	t	t	45	\N	\N
287	2012-12-19 15:44:21	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me, Neither (phone or internet)	QuoteCategory	4	57	77	t	t	287	\N	\N
303	2012-12-19 15:57:55	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me	QuoteCategory	5	59	79	t	t	303	\N	\N
323	2012-12-19 16:19:33	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me	QuoteCategory	5	62	87	t	t	323	\N	\N
328	2012-12-19 16:22:08	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me, Neither (phone or internet)	QuoteCategory	5	63	88	t	t	328	\N	\N
335	2012-12-20 15:36:54	2017-05-08 06:24:54	what-kind-of-project	What kind of project?		0	A single project, A variety of project, I'm not sure yet	QuoteCategory	4	66	90	t	t	335	\N	\N
338	2012-12-20 15:37:34	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me, Neither (phone or internet)	QuoteCategory	5	66	90	t	t	338	\N	\N
339	2012-12-20 15:38:07	2017-05-08 06:24:54	original-language	Original language		0	Arabic, Cantonese, French, German, Hindi, Japanese, Korean, Mandarin, Portuguese, Russian, Swahili, Other	QuoteCategory	4	67	91	t	t	339	\N	\N
340	2012-12-20 15:38:21	2017-05-08 06:24:54	translate-to	Translate to		0	English, Other	QuoteCategory	4	67	91	t	t	340	\N	\N
345	2012-12-20 15:40:06	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me, Neither (phone or internet)	QuoteCategory	5	67	91	t	t	345	\N	\N
27	2012-07-31 17:34:35	2017-05-08 06:24:54	service-type	Service type		0	Personal, Business	QuoteCategory	5	9	38	t	t	9	\N	\N
346	2012-12-20 15:42:39	2017-05-08 06:24:54	project-type	Project type		0	Ghostwriting, Academic, Grant, Blog, Web content / SEO, Resume, Speech, Technical, Other	QuoteCategory	4	68	92	t	t	346	\N	\N
352	2012-12-20 15:47:31	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Audio Recording, Songwriting	QuoteCategory	4	70	93	t	t	352	\N	\N
354	2012-12-20 15:48:00	2017-05-08 06:24:54	what-genre-of-music	What genre of music?		0	Rock/Pop, R&B, Rap, Country, Ballad, Dance, Other	QuoteCategory	4	70	93	t	t	354	\N	\N
355	2012-12-20 15:48:15	2017-05-08 06:24:54	what-kind-of-recording	What kind of recording?		0	Music recording, Voiceover recording, Commercial, Other	QuoteCategory	4	70	93	t	t	355	\N	\N
356	2012-12-20 15:48:29	2017-05-08 06:24:54	anything-else	Anything else?		0	Mixing, Mastering, Editing, Pre-production, Post-production, None, Other	QuoteCategory	4	70	93	t	t	356	\N	\N
360	2012-12-20 15:49:48	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Web Design, Graphic Design, Logo Design, Print Design, Other	QuoteCategory	4	71	94	t	t	360	\N	\N
361	2012-12-20 15:50:09	2017-05-08 06:24:54	what-kind-of-work	What kind of work?		0	Build (development), Design/produce graphics, Fix website, Update content, Install software or script, Print (cards/posters/artwork), Logo / Branding, Web / Digital Art, Presentation (PowerPoint), Other	QuoteCategory	4	71	94	t	t	361	\N	\N
364	2012-12-20 15:51:43	2017-05-08 06:24:54	what-kind-of-organization	What kind of organization?		0	Personal, Business, Small Organization, Non-profit, School / Educational, Government / Public service, Other	QuoteCategory	4	71	94	t	t	364	\N	\N
368	2012-12-20 15:52:59	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me, Neither (phone or internet)	QuoteCategory	5	71	94	t	t	368	\N	\N
375	2012-12-20 15:56:06	2017-05-08 06:24:54	project-type	Project type		0	General, Game, Interface, Scripts & utilities, QA, VOIP, Other	QuoteCategory	4	74	97	t	t	375	\N	\N
377	2012-12-20 15:57:09	2017-05-08 06:24:54	language	Language		0	Python, C++, C, PHP, Java, Perl, ASP, Ruby, I'm not sure yet, Other	QuoteCategory	4	74	97	t	t	377	\N	\N
381	2012-12-20 15:58:20	2017-05-08 06:24:54	what-do-you-need-developed	What do you need developed?		0	Basic website, General web programming, Online store, Database, Social media integration, Blog, Other	QuoteCategory	4	75	98	t	t	381	\N	\N
387	2012-12-20 18:19:57	2017-05-08 06:24:54	what-kind-of-air-conditioner	What kind of air conditioner? 		0	Central A/C, Window A/C, Portable A/C	QuoteCategory	4	76	99	t	t	387	\N	\N
389	2012-12-20 18:20:40	2017-05-08 06:24:54	anything-else-the-hvac-technician-should-know	Anything else the HVAC technician should know?		0		QuoteCategory	2	76	99	t	t	389	\N	\N
493	2012-12-20 19:09:10	2017-05-08 06:24:54	project-type	Project type		0	Install, Repair, Replace, Clean	QuoteCategory	4	97	100	t	t	3	\N	\N
495	2012-12-20 19:09:52	2017-05-08 06:24:54	what-kind-of-window-treatments	What kind of window treatments?		0	Window tinting, Blinds or shades, Drapes or curtains, Indoor shutters, Electronic drape/shade/blind opener, Other	QuoteCategory	4	97	100	t	t	2	\N	\N
496	2012-12-20 19:10:03	2017-05-08 06:24:54	anything-else-the-window-treatment-specialist-should-know	Anything else the window treatment specialist should know?		0		QuoteCategory	2	97	100	t	t	4	\N	\N
66	2012-07-31 18:37:20	2017-05-08 06:24:54	when-do-you-want-the-work-done	When do you want the work done?		0		QuoteCategory	1	18	43	t	t	66	\N	\N
61	2012-07-31 18:30:38	2017-05-08 06:24:54	service-commitment	Service commitment		0	Consultation, Representation, Other	QuoteCategory	5	19	44	t	t	61	\N	\N
63	2012-07-31 18:31:42	2017-05-08 06:24:54	travel-preferences	Travel preferences		0	The legal services specialist can travel to me, I can travel to the legal services specialist, We can work remotely (over the phone or Internet)	QuoteCategory	4	19	44	t	t	63	\N	\N
82	2012-10-24 11:58:13	2017-05-08 06:24:54	anything-else-the-senior-care-specialist-should-know	Anything else the senior care specialist should know?		0		QuoteCategory	2	25	49	f	t	5	\N	\N
92	2012-10-24 12:07:04	2017-05-08 06:24:54	age	Age		0	Child,Teen,Adult	QuoteCategory	4	28	52	t	t	92	\N	\N
100	2012-10-24 12:21:20	2017-05-08 06:24:54	number-of-guests	Number of guests		0	Fewer than 50,50-100,100-150,150-200,More than 200	QuoteCategory	5	30	53	t	t	100	\N	\N
105	2012-10-24 12:27:56	2017-05-08 06:24:54	what-type-of-event	What type of event?		0	Buffet catered event,Buffet dinner party,Plated dinner party,Personal meal(s),Cocktail party,Food truck,I'm not sure yet	QuoteCategory	5	31	54	t	t	105	\N	\N
106	2012-10-24 12:28:50	2017-05-08 06:24:54	what-kind-of-cuisine	What kind of cuisine?		0	Casual American,Mexican/Latin,Formal American,Italian,BBQ,Vegetarian/Vegan,I'm not sure yet,Other	QuoteCategory	4	31	54	t	t	106	\N	\N
107	2012-10-24 12:29:52	2017-05-08 06:24:54	how-many-people	How many people?		0	Fewer than 10,10-25,25-50,50-100,100-150,150-200,More than 200	QuoteCategory	5	31	54	t	t	107	\N	\N
121	2012-10-24 12:54:07	2017-05-08 06:24:54	anything-else-the-caterer-chef-should-know	Anything else the caterer & chef should know?		0		QuoteCategory	2	33	56	f	t	121	\N	\N
146	2012-10-24 13:12:47	2017-05-08 06:24:54	anything-else-the-event-producer-should-know	Anything else the event producer should know?		0		QuoteCategory	2	37	60	f	t	146	\N	\N
149	2012-10-24 13:14:49	2017-05-08 06:24:54	what-events-do-you-need-shot	What events do you need shot?		0	Ceremony photos,Reception photos,Ceremony preparation,Engagement photos,Family photos,I'm not sure yet,Other	QuoteCategory	4	38	61	t	t	149	\N	\N
150	2012-10-24 13:15:14	2017-05-08 06:24:54	whats-your-wedding-style	What's your wedding style?		0	Intimate,Outdoor,Indoor,Formal,It's a big party,Semi-Formal / Casual,I'm not sure yet,Other	QuoteCategory	4	38	61	t	t	150	\N	\N
151	2012-10-24 13:15:38	2017-05-08 06:24:54	whats-your-estimated-budget	What's your estimated budget?		0	Less than $1,000,$1,000-$3,000,$3,000-$5,000,More than $5,000	QuoteCategory	5	38	61	t	t	151	\N	\N
154	2012-11-08 17:37:31	2017-05-08 06:24:54	what-are-you-moving	What are you moving?		0	Full home, Office, 1-2 rooms, I'm not sure yet, Just a few things, Other	QuoteCategory	4	39	62	t	t	1	\N	\N
155	2012-11-08 17:37:31	2017-05-08 06:24:54	what-kind-of-assistance-do-you-need	What kind of assistance do you need?		0	Movers (labor), Piano moving, Transportation (truck/van), Packing, Other	QuoteCategory	4	39	62	t	t	2	\N	\N
156	2012-11-08 17:37:31	2017-05-08 06:24:54	how-far-are-you-moving	How far are you moving?		0	Less than 10 miles, Greater than 100 miles, 10-25 miles, I'm not sure yet, 25-100 miles	QuoteCategory	4	39	62	t	t	3	\N	\N
161	2012-12-19 11:39:45	2017-05-08 06:24:54	what-is-your-cars-year-make-and-model	What is your car's year, make and model?		0		QuoteCategory	1	41	63	t	t	9	\N	\N
162	2012-12-19 11:41:19	2017-05-08 06:24:54	anything-else-the-auto-technician-should-know	Anything else the auto technician should know?		0		QuoteCategory	1	41	63	t	t	10	\N	\N
160	2012-12-19 11:39:00	2017-05-08 06:24:54	how-many-miles-on-the-car	How many miles on the car?		0	Less than 36000, 36000 - 60000, 60000 - 100000, 100000 - 120000, 120000 - 180000, More than 180000	QuoteCategory	5	41	63	t	t	3	\N	\N
167	2012-12-19 12:02:32	2017-05-08 06:24:54	what-kind-of-restoration	What kind of restoration?		0	Component (Engine or Transmission), Partial (Frame-on), Full (Frame-off), I'm not sure, Other	QuoteCategory	4	41	63	t	t	6	\N	\N
168	2012-12-19 12:02:57	2017-05-08 06:24:54	what-needs-attention	What needs attention?		0	Rust (body / chassis), Paint, Interior / Upholstery, Electrical, Chrome / Trim, SuspensionComplete vehicle	QuoteCategory	4	41	63	t	t	7	\N	\N
180	2012-12-19 12:18:45	2017-05-08 06:24:54	anything-else-the-auto-technician-should-know	Anything else the auto technician should know?		0		QuoteCategory	1	42	64	t	t	180	\N	\N
172	2012-12-19 12:16:29	2017-05-08 06:24:54	what-kind-of-vehicle	What kind of vehicle?		0	Car, Truck/SUV, Commercial truck, RV, Boat, Other	QuoteCategory	4	42	64	t	t	3	\N	\N
174	2012-12-19 12:17:15	2017-05-08 06:24:54	what-kind-of-electronics	What kind of electronics?		0	Audio (stereo/speakers), Remote Starter, Alarm / security, Safety (backup sensors / camera), Navigation (GPS), Other	QuoteCategory	4	42	64	t	t	174	\N	\N
176	2012-12-19 12:17:44	2017-05-08 06:24:54	what-kind-of-restoration	What kind of restoration?		0	Component (Engine or Transmission), Partial (Frame-on), Full (Frame-off), I'm not sure, Other	QuoteCategory	4	42	64	t	t	176	\N	\N
177	2012-12-19 12:18:00	2017-05-08 06:24:54	what-needs-attention	What needs attention?		0	Rust (body / chassis), Paint, Interior / Upholstery, Electrical, Chrome / Trim, SuspensionComplete vehicle	QuoteCategory	4	42	64	t	t	177	\N	\N
178	2012-12-19 12:18:15	2017-05-08 06:24:54	something-specific	Something specific?		0	Turbo / Supercharger, Body kit, Air suspension, Coil-over suspension, Wheels / Tires, Port and Polish (cylinder head), I'm not sure	QuoteCategory	4	42	64	t	t	178	\N	\N
193	2012-12-19 12:41:46	2017-05-08 06:24:54	anything-else-the-limousine-driver-should-know	Anything else the limousine driver should know?		0		QuoteCategory	1	43	65	t	t	11	\N	\N
213	2012-12-19 12:54:51	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me, Neither (phone or internet)	QuoteCategory	5	45	67	t	t	213	\N	\N
218	2012-12-19 13:06:30	2017-05-08 06:24:54	what-kind-of-nail-care	What kind of nail care?		0	French manicure, Opi soak-off gel manicure, Luxury manicure, Brazilian Manicure, Paraffin wax, American manicure, i'm not sure, Other	QuoteCategory	4	47	68	t	t	218	\N	\N
219	2012-12-19 13:07:10	2017-05-08 06:24:54	what-kind-of-nail-art	What kind of nail art?		0	Airbrushed, Free Style, Stamp, 3D, No nail art needed, Other	QuoteCategory	4	47	68	t	t	219	\N	\N
255	2012-12-19 13:53:22	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me	QuoteCategory	5	48	69	t	t	255	\N	\N
229	2012-12-19 13:34:44	2017-05-08 06:24:54	which-branch-of-reiki	Which branch of Reiki?		0	Traditional Japanese, Western, I'm not sure / As recommended, Other	QuoteCategory	4	49	70	t	t	229	\N	\N
230	2012-12-19 13:35:02	2017-05-08 06:24:54	what-are-your-goals	What are your goals?		0	Relaxation / stress relief, Pain relief, Increase flexibility, Increase circulation, Emotional healing, Detoxification, Physical (Sports) therapy, Other	QuoteCategory	4	49	70	t	t	230	\N	\N
259	2012-12-19 13:56:09	2017-05-08 06:24:54	anything-else-the-travel-agent-should-know	Anything else the travel agent should know?		0		QuoteCategory	1	50	71	t	t	259	\N	\N
271	2012-12-19 15:09:45	2017-05-08 06:24:54	what-are-your-learning-goals	What are your learning goals?		0	Improve grades at school, Prepare for a standardized test, Learn new topics and techniques, Advance my career, Other	QuoteCategory	4	55	75	t	t	271	\N	\N
268	2012-12-19 15:08:40	2017-05-08 06:24:54	which-service-are-you-interested-in	Which service are you interested in?		0	Math Tutoring, Algebra Tutoring, Trigonometry Tutoring	QuoteCategory	5	55	75	t	t	268	\N	\N
276	2012-12-19 15:11:15	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me, Neither (phone or internet)	QuoteCategory	5	55	75	t	t	276	\N	\N
315	2012-12-19 16:09:47	2017-05-08 06:24:54	anything-else-the-language-tutor-should-know	Anything else the language tutor should know?		0		QuoteCategory	1	61	81	t	t	315	\N	\N
359	2012-12-20 15:49:06	2017-05-08 06:24:54	travel-preference	Travel preference		0	I travel to the provider, The provider travels to me, Neither (phone or internet)	QuoteCategory	5	70	93	t	t	359	\N	\N
208	2012-12-19 12:53:29	2017-05-08 06:24:54	car-type	Car type		0	Used, New	QuoteCategory	5	45	67	t	t	208	\N	\N
209	2012-12-19 12:53:43	2017-05-08 06:24:54	purchase-type	Purchase type		0	Buying, Leasing	QuoteCategory	5	45	67	t	t	209	\N	\N
232	2012-12-19 13:35:34	2017-05-08 06:24:54	age	Age		0	Child, Adolescent, Adult	QuoteCategory	5	49	70	t	t	232	\N	\N
231	2012-12-19 13:35:18	2017-05-08 06:24:54	preference-of-healers-gender	Preference of healer's gender		0	Male, Female, No preference	QuoteCategory	5	49	70	t	t	231	\N	\N
256	2012-12-19 13:55:00	2017-05-08 06:24:54	travel-type	Travel type		0	Leisure, Tour, Event, Business, Other	QuoteCategory	5	50	71	t	t	256	\N	\N
243	2012-12-19 13:45:08	2017-05-08 06:24:54	preference-of-healers-gender	Preference of healer's gender		0	Male, Female, No preference	QuoteCategory	5	51	72	t	t	243	\N	\N
263	2012-12-19 13:59:00	2017-05-08 06:24:54	coachs-gender	Coach's gender		0	Male, Female, No preference	QuoteCategory	5	52	73	t	t	263	\N	\N
264	2012-12-19 13:59:19	2017-05-08 06:24:54	age	Age		0	Child, Adolescent, Adult	QuoteCategory	5	52	73	t	t	264	\N	\N
273	2012-12-19 15:10:18	2017-05-08 06:24:54	age-of-student	Age of student		0	5 or less, 6 - 8, 9 - 11, 12 - 14, 15 - 17, 18 - 20, 21 - 23, 24 - 26, 27 - 29, 30 or more	QuoteCategory	5	55	75	t	t	273	\N	\N
298	2012-12-19 15:55:52	2017-05-08 06:24:54	skill-level	Skill level		0	No Experience, Beginning, Intermediate, Advanced, Not sure	QuoteCategory	5	59	79	t	t	298	\N	\N
299	2012-12-19 15:56:29	2017-05-08 06:24:54	age	Age		0	Child, Teen, Adult	QuoteCategory	5	59	79	t	t	299	\N	\N
307	2012-12-19 16:02:36	2017-05-08 06:24:54	age	Age		0	Child, Teen, Adult	QuoteCategory	5	60	80	t	t	307	\N	\N
320	2012-12-19 16:18:39	2017-05-08 06:24:54	age	Age		0	Child, Adolescent, Adult	QuoteCategory	5	62	87	t	t	320	\N	\N
319	2012-12-19 16:18:14	2017-05-08 06:24:54	coachs-gender	Coach's gender		0	Male, Female, No preference	QuoteCategory	5	62	87	t	t	319	\N	\N
341	2012-12-20 15:38:40	2017-05-08 06:24:54	number-of-pages	Number of pages		0	1 - 2, 3 - 4, 5 - 7, 8 - 10, More than 10, Not sure	QuoteCategory	5	67	91	t	t	341	\N	\N
347	2012-12-20 15:42:55	2017-05-08 06:24:54	number-of-pages	Number of pages		0	1 - 2, 3 - 4, 5 - 7, 8 - 10, More than 10, Not sure	QuoteCategory	5	68	92	t	t	347	\N	\N
382	2012-12-20 15:58:35	2017-05-08 06:24:54	amount-of-work	Amount of work		0	One project, Multiple projects	QuoteCategory	5	75	98	t	t	382	\N	\N
388	2012-12-20 18:20:19	2017-05-08 06:24:54	location	Location		0	Home, Multi-unit, Business, Other	QuoteCategory	5	76	99	t	t	388	\N	\N
494	2012-12-20 19:09:26	2017-05-08 06:24:54	location	Location		0	Home, Business, Other	QuoteCategory	5	97	100	t	t	1	\N	\N
31	2012-07-31 17:39:15	2017-05-08 06:24:54	how-many-bedrooms	How many bedrooms?		0	Studio, 1 bedroom, 2 bedrooms, 3 bedrooms, 4 bedrooms, 5+ bedrooms	QuoteCategory	5	11	101	t	t	2	\N	\N
578	2017-05-11 14:06:00	2017-05-11 14:06:00	Color preferences	Do you have any specific colors in mind?   Colors  		\N		ContestType	11	1	1	f	t	10	\N	\N
272	2012-12-19 15:10:02	2017-05-08 06:24:54	how-often	How often?		0	Daily, Several times a week, Once a week, Once or twice a week, Once or twice a month, I'm not sure, Other	QuoteCategory	5	55	75	t	t	272	\N	\N
280	2012-12-19 15:27:56	2017-05-08 06:24:54	age-of-student	Age of student 		0	5 or less, 6 - 8, 9 - 11, 12 - 14, 15 - 17, 18 - 20, 21 - 23, 24 - 26, 27 - 29, 30 or more	QuoteCategory	5	56	76	t	t	280	\N	\N
283	2012-12-19 15:43:17	2017-05-08 06:24:54	what-is-your-level-of-experience	What is your level of experience?		0	Beginner, Intermediate, Advanced	QuoteCategory	5	57	77	t	t	283	\N	\N
290	2012-12-19 15:47:50	2017-05-08 06:24:54	supplement-to-coursework-school	Supplement to coursework/school?		0	Yes, No	QuoteCategory	5	58	78	t	t	290	\N	\N
308	2012-12-19 16:03:24	2017-05-08 06:24:54	how-often	How often?		0	Daily, Several times a week, Once a week, Once or twice a week, Once or twice a month, I'm not sure, Other	QuoteCategory	5	60	80	t	t	308	\N	\N
312	2012-12-19 16:08:02	2017-05-08 06:24:54	what-language-are-you-learning	What language are you learning?		0	Spanish, French, French, Mandarin, Italian, Portuguese, German, Japanese, Other	QuoteCategory	5	61	81	t	t	312	\N	\N
314	2012-12-19 16:09:20	2017-05-08 06:24:54	how-often	How often?		0	Daily, Several times a week, Once a week, Once or twice a week, Once or twice a month, I'm not sure, Other	QuoteCategory	5	61	81	t	t	314	\N	\N
324	2012-12-19 16:21:03	2017-05-08 06:24:54	how-often-do-you-want-lessons	How often do you want lessons?		0	Daily, Several times a week, Once a week, Once or twice a week, Once or twice a month, I'm not sure, Other	QuoteCategory	5	63	88	t	t	324	\N	\N
333	2012-12-20 15:36:12	2017-05-08 06:24:54	how-many-pages	How many pages?		0	1 - 10, 11 - 50, 51 - 100, 100 - 200, 200+	QuoteCategory	5	66	90	t	t	333	\N	\N
342	2012-12-20 15:39:02	2017-05-08 06:24:54	what-kind-of-project	What kind of project?		0	A single project, A variety of project, I'm not sure yet	QuoteCategory	5	67	91	t	t	342	\N	\N
348	2012-12-20 15:43:13	2017-05-08 06:24:54	what-kind-of-project	What kind of project?		0	A single project, A variety of project, I'm not sure yet	QuoteCategory	5	68	92	t	t	348	\N	\N
353	2012-12-20 15:47:47	2017-05-08 06:24:54	what-kind-of-project	What kind of project?		0	Lyric writing, Songwriting, Music composition, Other	QuoteCategory	5	70	93	t	t	353	\N	\N
32	2012-07-31 17:40:18	2017-05-08 06:24:54	how-many-bathrooms	How many bathrooms?		0	1 bathroom, 2 bathrooms, 3 bathrooms, 4 bathrooms, 5+ bathrooms	QuoteCategory	5	11	101	t	t	3	\N	\N
252	2012-12-19 13:52:16	2017-05-08 06:24:54	how-often	How often?		0	Daily, Several times a week, Once a week, Once or twice a month, I'm not sure yet	QuoteCategory	5	48	69	t	t	252	\N	\N
233	2012-12-19 13:35:51	2017-05-08 06:24:54	how-often	How often?		0	One time, Once or twice a month, Once or twice a week, Recurring, I'm not sure, Other	QuoteCategory	5	49	70	t	t	233	\N	\N
234	2012-12-19 13:36:08	2017-05-08 06:24:54	how-long-of-a-session	How long of a session?		0	0-30 minutes, 30-60 minutes, 60-90 minutes, 90-120 minutes, More than 120 minutes	QuoteCategory	5	49	70	t	t	234	\N	\N
242	2012-12-19 13:44:42	2017-05-08 06:24:54	how-long-of-a-session	How long of a session?		0	0-30 minutes, 30-60 minutes, 60-90 minutes, 90-120 minutes, More than 120 minutes	QuoteCategory	5	51	72	t	t	5	\N	\N
281	2012-12-19 15:28:14	2017-05-08 06:24:54	current-academic-level	Current academic level?		0	Elementary school, Middle school, High school, Test prep, College, Adult	QuoteCategory	5	56	76	t	t	281	\N	\N
284	2012-12-19 15:43:35	2017-05-08 06:24:54	how-often-do-you-want-lessons	How often do you want lessons?		0	Daily, Several times a week, Once a week, Once or twice a week, Once or twice a month, I'm not sure, Other	QuoteCategory	5	57	77	t	t	284	\N	\N
300	2012-12-19 15:56:52	2017-05-08 06:24:54	supplement-to-coursework-school	Supplement to coursework/school?		0	Yes, No	QuoteCategory	5	59	79	t	t	300	\N	\N
362	2012-12-20 15:50:22	2017-05-08 06:24:54	do-you-have-a-design-concept	Do you have a design concept?		0	I know what I want, I have some ideas in my mind, I need consultation	QuoteCategory	5	71	94	t	t	362	\N	\N
363	2012-12-20 15:50:42	2017-05-08 06:24:54	how-many-logos	How many logos?		0	1 - 2 logos, 3 - 5 logos, 6 or more logos	QuoteCategory	5	71	94	t	t	363	\N	\N
365	2012-12-20 15:52:09	2017-05-08 06:24:54	whats-the-scope-of-the-project	What's the scope of the project?		0	One-time projects, Ongoing projects, I'm not sure	QuoteCategory	5	71	94	t	t	365	\N	\N
366	2012-12-20 15:52:28	2017-05-08 06:24:54	do-you-need-printing-services	Do you need printing services?		0	Yes, No 	QuoteCategory	5	71	94	t	t	366	\N	\N
198	2012-12-19 12:46:20	2017-05-08 06:24:54	how-many-miles-on-the-car	How many miles on the car?		0	Less than 36000, 36000 - 60000, 60000 - 100000, 100000 - 120000, 120000 - 180000, More than 180000	QuoteCategory	5	44	66	t	t	198	\N	\N
258	2012-12-19 13:55:55	2017-05-08 06:24:54	accommodations-required	Accommodations required?		0	Yes, No	QuoteCategory	5	50	71	t	t	258	\N	\N
279	2012-12-19 15:27:35	2017-05-08 06:24:54	any-preference-for-the-tutors-gender	Any preference for the tutor's gender?		0	Male, Female, No preference	QuoteCategory	5	56	76	t	t	279	\N	\N
171	2012-12-19 12:15:45	2017-05-08 06:24:54	what-kind-of-work	What kind of work?		0	I'm not sure what's wrong, Engine, Transmission, Brakes, A/C and heating, Electrical and lights, Scheduled maintenance	QuoteCategory	5	42	64	t	t	2	\N	\N
173	2012-12-19 12:16:58	2017-05-08 06:24:54	how-many-miles-on-the-car	How many miles on the car?		0	Less than 36000, 36000 - 60000, 60000 - 100000, 100000 - 120000, 120000 - 180000, More than 180000	QuoteCategory	5	42	64	t	t	173	\N	\N
175	2012-12-19 12:17:29	2017-05-08 06:24:54	what-do-you-need-done	What do you need done?		0	Install, Repair, Replace, Remove, Modification/Custom, Other	QuoteCategory	5	42	64	t	t	175	\N	\N
185	2012-12-19 12:39:40	2017-05-08 06:24:54	how-many-passengers-do-you-expect	How many passengers do you expect?		0	1 - 3 people, 4 - 6 people, 7 - 9 people, 10 - 12 people, 13 - 15 people, 16 - 18 people, 19 people or more	QuoteCategory	5	43	65	t	t	3	\N	\N
186	2012-12-19 12:39:57	2017-05-08 06:24:54	what-kind-of-driving-service-will-you-need	What kind of driving service will you need?		0	One-way transfer, Two-way transfer, Hourly Service, Not sure, Other	QuoteCategory	5	43	65	t	t	4	\N	\N
574	2017-05-11 14:06:00	2017-05-11 14:06:00	Business name	What is your business name?	E.g. Acme	\N		ContestType	1	1	1	f	t	0	\N	\N
575	2017-05-11 14:06:00	2017-05-11 14:06:00	Description of business	In a sentence or two, describe what your business does	E.g. We sell anvils and other industrial goods to manufacturing companies and hobbyists all over the world.	\N		ContestType	2	1	1	f	t	1	\N	\N
576	2017-05-11 14:06:00	2017-05-11 14:06:00	Industry	Select your industry		\N	Accounding & Financial, Agriculture, Animal & pet, Architectural, Art & Design, Attorney & Law, Automotive, Bar & NightClub, Business & Counsulting, ChildCare, Cleaning & Maintenance, Communications	ContestType	3	1	1	f	t	2	\N	\N
577	2017-05-11 14:06:00	2017-05-11 14:06:00	Values to communicate	What values should your logo communicate?  		\N		ContestType	12	1	1	f	t	9	\N	\N
579	2017-05-11 14:06:00	2017-05-11 14:06:00	Business cards designed with your logo	Would you business cards designed with your logo?	We recommend settling on a logo design first and then working with the designers in the latter days of your contest to design the business cards. 	\N	No, I just want a logo thanks, Yes, I'd like a business card designed as well	ContestType	5	1	1	f	t	12	\N	\N
580	2017-05-11 14:06:00	2017-05-11 14:06:00	Notes	What details need to go on your business cards?	Eg: On the front your logo and website address. On the back your name title, email address and phone. 	\N		ContestType	2	1	1	f	t	13	\N	\N
581	2017-05-11 14:06:00	2017-05-11 14:06:00	Quote to print your business cards	Would you like a free quote to print your business cards?		\N	Yes - I'd like a printing partner to contact me with a free, no obligation quote, No - I will organize printing myself	ContestType	5	1	1	f	t	14	\N	\N
582	2017-05-11 14:06:00	2017-05-11 14:06:00	To be used on	Where will your logo be used?		\N	Print, Online, Merchandise, Signs, Television/screen	ContestType	4	1	1	f	t	11	\N	\N
583	2017-05-11 14:06:00	2017-05-11 14:06:00	Logo you want on the stationery	Do you have a logo you want on the stationery		\N	Yes, No (We recommend you launch a logo contest before a stationery contest then)	ContestType	5	2	2	f	t	0	\N	\N
584	2017-05-11 14:06:00	2017-05-11 14:06:00	Name to incorporate in the logo	What brand name do you want on your stationery?	E.g. Acme	\N		ContestType	1	2	2	f	t	0	\N	\N
585	2017-05-11 14:06:00	2017-05-11 14:06:00	Description of the organization and its target audience	Describe what your organization or product does and its target audience	E.g. We sell anvils and other industrial goods to manufacturing companies and hobbyists all over the world.	\N		ContestType	2	2	2	f	t	0	\N	\N
586	2017-05-11 14:06:00	2017-05-11 14:06:00	Industry	Select your industry		\N	Accounding & Financial, Agriculture, Animal & pet, Architectural, Art & Design, Attorney & Law, Automotive, Bar & NightClub, Business & Counsulting, ChildCare, Cleaning & Maintenance, Communications	ContestType	3	2	2	f	t	0	\N	\N
587	2017-05-11 14:06:00	2017-05-11 14:06:00	To be used on	What stationery items do you want designed?	Choose stationary item to be designed	\N	Business cards, Letterheads, Note/Compliment slips, Envelopes	ContestType	4	2	2	f	t	0	\N	\N
588	2017-05-11 14:06:00	2017-05-11 14:06:00	To be used on	What details do you want on your stationery items?	E.g:  Name, title, contact details and website URL (where applicable)	\N		ContestType	2	2	2	f	t	0	\N	\N
589	2017-05-11 14:06:00	2017-05-11 14:06:00	Business card details	Do you have ideas about the visual style you want?	Providing your thoughts on colors, textures, shapes, photography illustration and typography will help guide designers. 	\N		ContestType	2	2	2	f	t	0	\N	\N
590	2017-05-11 14:06:00	2017-05-11 14:06:00	What to avoid	Is there anything that should be avoided?		\N		ContestType	2	2	2	f	t	0	\N	\N
591	2017-05-11 14:06:00	2017-05-11 14:06:00	Notes	Do you have an existing website designers can reference?	E.g. www.acme.com	\N		ContestType	1	2	2	f	t	0	\N	\N
592	2017-05-11 14:06:00	2017-05-11 14:06:00	Files attached	Do you have any images, sketches or documents that might be helpful?	E.g. Your current logo, photos, illustrations, content, layout ideas etc	\N		ContestType	8	2	2	f	t	0	\N	\N
593	2017-05-11 14:06:00	2017-05-11 14:06:00	Free quote to print your stationery items	Would you like a free quote to print your stationery items?		\N	Yes - I'd like a printing partner to contact me with a free, no obligation quote, No - I will organize printing myself	ContestType	5	2	2	f	t	0	\N	\N
788	2017-05-11 14:06:03	2017-05-11 14:06:03	Upload Files	Upload Files		\N		ContestType	8	27	27	f	t	0	\N	\N
594	2017-05-11 14:06:00	2017-05-11 14:06:00	T-shirt type	What kind of t-shirt do you want designed?		\N	Standard short-sleeve T-Shirt, Tank top, Polo shirt, Short sleeved button up shirt, Dress/business shirt	ContestType	5	3	3	f	t	0	\N	\N
595	2017-05-11 14:06:00	2017-05-11 14:06:00	Target audience	Who is the t-shirt for?		\N	Men, Women, Boys, Girls	ContestType	4	3	3	f	t	0	\N	\N
596	2017-05-11 14:06:00	2017-05-11 14:06:00		Do you have a logo you want on the t-shirt		\N	Yes, No (We recommend you launch a logo contest before a t-shirt contest then)	ContestType	5	3	3	f	t	0	\N	\N
597	2017-05-11 14:06:00	2017-05-11 14:06:00	Color of the t-shirt material	Do you have a color in mind for the t-shirt material?		\N	Yes, No	ContestType	5	3	3	f	t	0	\N	\N
598	2017-05-11 14:06:00	2017-05-11 14:06:00	Required on the t-shirt	What is required on the t-shirt?	E.g. Slogan, organisation or product name, website address, phone number.	\N		ContestType	2	3	3	f	t	0	\N	\N
599	2017-05-11 14:06:00	2017-05-11 14:06:00	Style/theme ideas for the t-shirt	Do you have ideas about the visual style you want?	Tip: Providing your thoughts on colors, textures, shapes, photography illustration and typography will help guide designers. 	\N		ContestType	2	3	3	f	t	0	\N	\N
600	2017-05-11 14:06:00	2017-05-11 14:06:00	What to avoid	Is there anything that should be avoided?		\N		ContestType	2	3	3	f	t	0	\N	\N
601	2017-05-11 14:06:00	2017-05-11 14:06:00	Files attached	Do you have any\nimages, sketches or documents that might be helpful?	E.g. Your current logo, photos, illustrations, content, layout ideas etc.	\N		ContestType	8	3	3	f	t	0	\N	\N
602	2017-05-11 14:06:00	2017-05-11 14:06:00	Organization name	What is your organization name?	E.g. Acme	\N		ContestType	1	4	4	f	t	0	\N	\N
603	2017-05-11 14:06:00	2017-05-11 14:06:00	Description of the organization and its target audience	Briefly describe what your organization does	E.g. We sell anvils and other industrial goods to manufacturing companies and hobbyists all over the world.	\N		ContestType	2	4	4	f	t	0	\N	\N
604	2017-05-11 14:06:00	2017-05-11 14:06:00	Industry	Select your industry		\N	Accounding & Financial, Agriculture, Animal & pet, Architectural, Art & Design, Attorney & Law, Automotive, Bar & NightClub, Business & Counsulting, ChildCare, Cleaning & Maintenance, Communications	ContestType	3	4	4	f	t	0	\N	\N
605	2017-05-11 14:06:00	2017-05-11 14:06:00	Description	Describe what you want designed	Describe your aims and requirements in detail here — the more specific, the better. Tell the designers what is required, but also let them know where they’re free to be creative.	\N		ContestType	2	4	4	f	t	0	\N	\N
606	2017-05-11 14:06:00	2017-05-11 14:06:00	Files attached	Do you have any\nimages, sketches or documents that might be helpful?	E.g. Your current logo, photos, illustrations, content, layout ideas etc.	\N		ContestType	8	4	4	f	t	0	\N	\N
607	2017-05-11 14:06:00	2017-05-11 14:06:00	Notes	Is there anything else you would like to communicate to the designers? 		\N		ContestType	2	4	4	f	t	0	\N	\N
608	2017-05-11 14:06:00	2017-05-11 14:06:00	Organization name	What is the name of your business or organization?	E.g. Acme	\N		ContestType	1	5	5	f	t	0	\N	\N
609	2017-05-11 14:06:00	2017-05-11 14:06:00	Description of the organization and its target audience	Who is the target audience for your brochure?	E.g. Age, gender, location, education, interests, lifestyle, behaviour, values.	\N		ContestType	2	5	5	f	t	0	\N	\N
610	2017-05-11 14:06:00	2017-05-11 14:06:00	Brochure to design	What kind of brochure do you want designed?		\N	Half-fold (4 sides) , Tri-fold (6 sides) , Gate-fold (3 sides) 	ContestType	5	5	5	f	t	0	\N	\N
611	2017-05-11 14:06:00	2017-05-11 14:06:00	Requirements - front of brochure	What is required on the front of your brochure?	E.g. Title text, photo, illustration, company logo, phone number.	\N		ContestType	2	5	5	f	t	0	\N	\N
612	2017-05-11 14:06:00	2017-05-11 14:06:00	Requirements - body of brochure	What is required in the body of your brochure?	Tip: You may also upload a document in the attachments area below.	\N		ContestType	2	5	5	f	t	0	\N	\N
613	2017-05-11 14:06:00	2017-05-11 14:06:00	Requirements - back of brochure	What is required on the back cover of your brochure?	E.g. Text, website link, contact details, QR code.	\N		ContestType	2	5	5	f	t	0	\N	\N
614	2017-05-11 14:06:00	2017-05-11 14:06:00	Style/theme ideas for the brochure	Do you have ideas about what visual style you want?	E.g. Imagery, typography and colors.  Tip: Providing links or uploading examples you like will greatly help designers.	\N		ContestType	2	5	5	f	t	0	\N	\N
615	2017-05-11 14:06:00	2017-05-11 14:06:00	What to avoid	Is there anything that should be avoided?		\N		ContestType	2	5	5	f	t	0	\N	\N
616	2017-05-11 14:06:00	2017-05-11 14:06:00	Files attached	Do you have any images, sketches or documents that might be helpful?	E.g. Your current logo, photos, illustrations, content, layout ideas etc.	\N		ContestType	8	5	5	f	t	0	\N	\N
617	2017-05-11 14:06:00	2017-05-11 14:06:00	Organization name	What is the name of your app?	E.g. Acme	\N		ContestType	1	6	6	f	t	0	\N	\N
618	2017-05-11 14:06:00	2017-05-11 14:06:00	Description of the organization and its target audience	Briefly describe what your app does	E.g. The app allows our customers to browse and purchase anvils on their mobile phone.	\N		ContestType	2	6	6	f	t	0	\N	\N
619	2017-05-11 14:06:00	2017-05-11 14:06:00	Industry	Select your industry		\N	Accounding & Financial, Agriculture, Animal & pet, Architectural, Art & Design, Attorney & Law, Automotive, Bar & NightClub, Business & Counsulting, ChildCare, Cleaning & Maintenance, Communications	ContestType	3	6	6	f	t	0	\N	\N
620	2017-05-11 14:06:00	2017-05-11 14:06:00	Screens want design	How many screens do you want designed?	Tip: If you require more than 5 screens, we recommend you focus on identifying a design direction first and then working with the designer 1-to-1 after your contest, to complete the subsequent screens.	\N	1 screen, 2 screens, 3 screens, 4 screens, 5 screens	ContestType	5	6	6	f	t	0	\N	\N
621	2017-05-11 14:06:00	2017-05-11 14:06:00	Description	Describe the screens and the main work flows for your app	  Tip: How do people use your app? How do users move around from screen to screen?  E.g. From the home screen users can either search or browse our range of anvils. From a search results or category page they can go through to an anvil details page. Here 	\N		ContestType	2	6	6	f	t	0	\N	\N
622	2017-05-11 14:06:01	2017-05-11 14:06:01	Notes	What ideas do you have for the style/theme of your app?	Tip: Providing your thoughts on colors, textures shapes, photography, illustration and typography will help guide designers. As will providing links to examples you like.	\N		ContestType	2	6	6	f	t	0	\N	\N
623	2017-05-11 14:06:01	2017-05-11 14:06:01	What to avoid	Is there anything that should be avoided?		\N		ContestType	2	6	6	f	t	0	\N	\N
624	2017-05-11 14:06:01	2017-05-11 14:06:01	Device need design	What device do you need designs for?	If you require designs for more than 1 device we recommend identifying a design direction first and then working with the designer 1-to-1 after the contest has finished.	\N	iPhone, Android, iPad, Apple Mac, Windows, Linux	ContestType	5	6	6	f	t	0	\N	\N
625	2017-05-11 14:06:01	2017-05-11 14:06:01	Notes	Do you have an existing website designers can reference?	E.g. www.acme.com	\N		ContestType	1	6	6	f	t	0	\N	\N
741	2017-05-11 14:06:02	2017-05-11 14:06:02	Avoid Designs	Anything you DON'T want in a design?		\N		ContestType	2	21	22	f	t	0	\N	\N
626	2017-05-11 14:06:01	2017-05-11 14:06:01	Files attached	Do you have anyimages, sketches or documents that might be helpful?	E.g. Your current logo, photos, illustrations, content, layout ideas etc.	\N		ContestType	8	6	6	f	t	0	\N	\N
627	2017-05-11 14:06:01	2017-05-11 14:06:01	Organization name	What is your organization name?	E.g. Acme	\N		ContestType	1	8	8	f	t	1	\N	\N
628	2017-05-11 14:06:01	2017-05-11 14:06:01	Organization profile	Briefly describe what your organization does	E.g. We sell anvils and other industrial goods to manufacturing companies and hobbyists all over the world.	\N		ContestType	11	8	8	f	t	0	\N	\N
629	2017-05-11 14:06:01	2017-05-11 14:06:01	Industry 	Select your industry		\N	Accounding & Financial, Agriculture, Animal & pet, Architectural, Art & Design, Attorney & Law, Automotive, Bar & NightClub, Business & Counsulting, ChildCare, Cleaning & Maintenance, Communications	ContestType	3	8	8	f	t	2	\N	\N
630	2017-05-11 14:06:01	2017-05-11 14:06:01	Design wanted	Describe what you want designed	Describe your aims and requirements in detail here — the more specific, the better. Tell the designers what is required, but also let them know where they’re free to be creative.	\N		ContestType	2	8	8	f	t	3	\N	\N
631	2017-05-11 14:06:01	2017-05-11 14:06:01	Documents uploaded	Do you have any images, sketches or documents that might be helpful?	E.g. Your current logo, photos, illustrations, content, layout ideas etc.	\N		ContestType	8	8	8	f	t	4	\N	\N
632	2017-05-11 14:06:01	2017-05-11 14:06:01	Communication to designers	Is there anything else you would like to communicate to the designers? 		\N		ContestType	2	8	8	f	t	5	\N	\N
633	2017-05-11 14:06:01	2017-05-11 14:06:01	Look & Feel for your design	Tell us how you want the new design to look and feel?		\N	Minimal,Complex 	ContestType	12	9	9	f	t	0	\N	\N
634	2017-05-11 14:06:01	2017-05-11 14:06:01	Industry	Select your industry		\N	Accounting,Automotive,Beauty,Construction,Consulting,Education,Entertainment,Events,Financial and Insurance,Home and Garden,Legal,Manufacturing and Wholesale,Media\\\\,Medical and Dental,Natural Resources,Non-Profit,Real Estate,Religious,Restaurant,Retail,Service Industries,Sports and Recreation,Technology,Travel and Hospitality,Other	ContestType	3	9	9	f	t	0	\N	\N
635	2017-05-11 14:06:01	2017-05-11 14:06:01	Purpose of use	Do you have any particular colors in mind? 		\N	Print (Business cards\\\\, letterheads\\\\, brochures\\\\, etc.),Online (Website\\\\, online advertising\\\\, banner ads\\\\, etc.),Merchandise (Mugs\\\\, T-shirts\\\\, etc.),Signs (Including shops\\\\, billboards\\\\, etc.),Television / screen	ContestType	4	9	9	f	t	0	\N	\N
636	2017-05-11 14:06:01	2017-05-11 14:06:01	Help files	Do you have logos, sketches or other images that may be helpful?		\N	Yes,No	ContestType	5	9	9	f	t	0	\N	\N
637	2017-05-11 14:06:01	2017-05-11 14:06:01	Upload File	Upload your file		\N		ContestType	8	9	9	f	t	0	\N	\N
638	2017-05-11 14:06:01	2017-05-11 14:06:01	New design  look and feel?	Tell us how you want the new design to look and feel?		\N	Minimal, Complex	ContestType	12	10	10	f	t	0	\N	\N
639	2017-05-11 14:06:01	2017-05-11 14:06:01	Industry	Select your industry		\N	Accounting, Automotive, Beauty, Construction, Consulting, Education, Entertainment, Events, Financial and Insurance, Home and Garden, Internet, Legal, Manufacturing and Wholesale, Media, Medical and Dental, Natural Resources,Non-Profit,Real Estate,Other	ContestType	3	10	10	f	t	0	\N	\N
640	2017-05-11 14:06:01	2017-05-11 14:06:01	Designers to use one of our present templates	Would you like the designers to use one of our preset templates to display their entries?		\N	Regular, Girls, Ringer	ContestType	5	10	10	f	t	0	\N	\N
641	2017-05-11 14:06:01	2017-05-11 14:06:01	Logos, sketches or other images	Do you have logos, sketches or other images that may be helpful?		\N	Yes, No	ContestType	5	10	10	f	t	0	\N	\N
642	2017-05-11 14:06:01	2017-05-11 14:06:01	File	Upload your file		\N		ContestType	8	10	10	f	t	0	\N	\N
643	2017-05-11 14:06:01	2017-05-11 14:06:01	URL	Enter URL		\N		ContestType	1	10	10	f	t	0	\N	\N
645	2017-05-11 14:06:01	2017-05-11 14:06:01	Look & Feel for your design	Tell us how you want the new design to look and feel?		\N	Minimal,Complex	ContestType	12	11	11	f	t	0	\N	\N
677	2017-05-11 14:06:01	2017-05-11 14:06:01	Suggested Theme & Style	Suggested Theme & Style	Help designers find the right spirit. A theme can be the name of a song	\N		ContestType	2	15	15	f	t	0	\N	\N
646	2017-05-11 14:06:01	2017-05-11 14:06:01	Industry	Select your industry		\N	Accounting,Automotive,Beauty,Construction,Consulting,Education,Entertainment,Events,Financial and Insurance,Home and Garden,Legal,Manufacturing and Wholesale,Media\\\\,Medical and Dental,Natural Resources,Non-Profit,Real Estate,Religious,Restaurant,Retail,Se	ContestType	3	11	11	f	t	0	\N	\N
647	2017-05-11 14:06:01	2017-05-11 14:06:01	Choose color	Do you have any particular colors in mind?		\N		ContestType	11	11	11	f	t	0	\N	\N
648	2017-05-11 14:06:01	2017-05-11 14:06:01	Custom banner size	What size do you want your web banner to be?	Enter the banner size or click and select one of the most commun banners.	\N		ContestType	1	11	11	f	t	0	\N	\N
649	2017-05-11 14:06:01	2017-05-11 14:06:01	Enter URL	Enter URL		\N		ContestType	1	11	11	f	t	0	\N	\N
650	2017-05-11 14:06:01	2017-05-11 14:06:01	Standard Web Banners	Standard Web Banners		\N	468 x 60 - Full banner (view),240 x 400 - Fat Skyscraper (view),728 x 90 - Leaderboard (view),234 x 60 - Half Banner (view),336 x 280 - Square (view),180 x 150 - Rectangle (view),300 x 250 - Square (view),125 x 125 - Square Button (view),250 x 250 - Square (view),120 x 90 - Button (view),160 x 600 - Skyscraper (view),120 x 90 - Button (view),120 x 600 - Skyscraper (view),120 x 60 - Button (view),120 x 240 - Small Skyscraper (view),120 x 30 - Button (view),230 x 33 - Small Banner (view),728 x 210 - Large Leaderboard (view),720 x 300 - Large Leaderboard (view),500 x 350 - Pop-up (view),550 x 480 - Pop-up (view),300 x 600 - Half Page Banner (view),94 x 15 - Blog Button (view)	ContestType	4	11	11	f	t	0	\N	\N
651	2017-05-11 14:06:01	2017-05-11 14:06:01	Sample Design	Do you have examples to inspire the designers?	List websites that you like and describe what you like about them.  For example: www.abs-marketing.com - I like the homepage of website, the colors and imagery used however as well as the menu however the gallery page is not very well organized.	\N		ContestType	2	11	11	f	t	0	\N	\N
652	2017-05-11 14:06:01	2017-05-11 14:06:01	Help files	Do you have logos, sketches or other images that may be helpful?		\N	Yes,No	ContestType	5	11	11	f	t	0	\N	\N
653	2017-05-11 14:06:01	2017-05-11 14:06:01	New design  look and feel?	Tell us how you want the new design to look and feel?		\N	Minimal, Complex	ContestType	12	12	12	f	t	0	\N	\N
654	2017-05-11 14:06:01	2017-05-11 14:06:01	Industry	Select your industry		\N	Accounting, Automotive, Beauty, Construction, Consulting, Education, Entertainment, Events, Financial and Insurance, Home and Garden, Internet, Legal, Manufacturing and Wholesale, Media, Medical and Dental, Natural Resources,Non-Profit,Real Estate,Other	ContestType	3	12	12	f	t	0	\N	\N
655	2017-05-11 14:06:01	2017-05-11 14:06:01	Existing website URL	If it is a redesign, please specify the URL of the existing website		\N		ContestType	1	12	12	f	t	0	\N	\N
656	2017-05-11 14:06:01	2017-05-11 14:06:01	Examples and inspire the designers	Do you have examples to inspire the designers?	List websites that you like and describe what you like about them.  For example: www.abs-marketing.com - I like the homepage of website, the colors and imagery used however as well as the menu however the gallery page is not very well organized.	\N		ContestType	2	12	12	f	t	0	\N	\N
657	2017-05-11 14:06:01	2017-05-11 14:06:01	Free coding services quote	Would you like a free coding services quote to build your chosen design?	At the end of your contest, once you have selected a winner, you receive design files (usually Photoshop files) containing visual mockups of how your website should look - not coded webpages.	\N	Yes, No	ContestType	5	12	12	f	t	0	\N	\N
658	2017-05-11 14:06:01	2017-05-11 14:06:01	Content Management System	Do you have a specific Content Management System in mind?	This will assist our coding partner in providing an accurate quote. If you are unsure, our coding partner will provide more detail on these options during the quoting process.	\N	Not sure,Plain HTML,Joomla,Wordpress,Drupal,Other	ContestType	3	12	12	f	t	0	\N	\N
659	2017-05-11 14:06:01	2017-05-11 14:06:01	Logos, sketches or other images	Do you have logos, sketches or other images that may be helpful?		\N	Yes, No	ContestType	5	12	12	f	t	0	\N	\N
660	2017-05-11 14:06:01	2017-05-11 14:06:01	Files	Upload your file		\N		ContestType	8	12	12	f	t	0	\N	\N
661	2017-05-11 14:06:01	2017-05-11 14:06:01	URL	Enter URL		\N		ContestType	1	12	12	f	t	0	\N	\N
662	2017-05-11 14:06:01	2017-05-11 14:06:01	Tell us how you want the new design to look and feel?	Tell us how you want the new design to look and feel?		\N	Minimal, Complex	ContestType	12	13	13	f	t	0	\N	\N
663	2017-05-11 14:06:01	2017-05-11 14:06:01	Select your industry	Select your industry		\N	Accounting, Automotive, Beauty, Construction, Consulting, Education, Entertainment, Events, Financial and Insurance, Home and Garden, Internet, Legal, Manufacturing and Wholesale, Media, Medical and Dental, Natural Resources,Non-Profit,Real Estate,Other	ContestType	3	13	13	f	t	0	\N	\N
664	2017-05-11 14:06:01	2017-05-11 14:06:01	Do you have logos, sketches or other images that may be helpful?	Do you have logos, sketches or other images that may be helpful?		\N	Yes, No	ContestType	5	13	13	f	t	0	\N	\N
665	2017-05-11 14:06:01	2017-05-11 14:06:01	Upload your file	Upload your file		\N		ContestType	8	13	13	f	t	0	\N	\N
666	2017-05-11 14:06:01	2017-05-11 14:06:01	Enter URL	Enter URL		\N		ContestType	1	13	13	f	t	0	\N	\N
667	2017-05-11 14:06:01	2017-05-11 14:06:01	Support Files	Support Files	Examples: Logos, concept sketches, band photos (you must have rights to all photos). 	\N		ContestType	8	14	14	f	t	0	\N	\N
668	2017-05-11 14:06:01	2017-05-11 14:06:01	Suggested Theme & Style	Suggested Theme & Style	Help designers find the right spirit. A theme can be the name of a song	\N		ContestType	2	14	14	f	t	0	\N	\N
669	2017-05-11 14:06:01	2017-05-11 14:06:01	Things To Include	Things To Include	Things designers should include in their creation	\N		ContestType	1	14	14	f	t	0	\N	\N
670	2017-05-11 14:06:01	2017-05-11 14:06:01	Things To Avoid	Things To Avoid	Things designers should specifically avoid.  Examples: No photos of the band. No literal interpretations. Avoid using photographs.	\N		ContestType	1	14	14	f	t	0	\N	\N
671	2017-05-11 14:06:01	2017-05-11 14:06:01	Style Guidelines	Style Guidelines	Move the sliders to the left or right to help point the designers in the right direction.	\N	Quiet, Loud	ContestType	12	14	14	f	t	0	\N	\N
672	2017-05-11 14:06:01	2017-05-11 14:06:01	Required Text	Required Text	You'll get better designs and more designs when you require less text.	\N		ContestType	2	14	14	f	t	0	\N	\N
673	2017-05-11 14:06:01	2017-05-11 14:06:01	Profile Picture	Upload A Profile Picture		\N		ContestType	8	15	15	f	t	0	\N	\N
674	2017-05-11 14:06:01	2017-05-11 14:06:01	Design A Large Poster	Design A Large Poster For		\N		ContestType	1	15	15	f	t	0	\N	\N
675	2017-05-11 14:06:01	2017-05-11 14:06:01	Submission Deadline	Submission Deadline	We recommend you accept designs for at least 2 weeks, 4+ weeks recommended	\N		ContestType	6	15	15	f	t	0	\N	\N
676	2017-05-11 14:06:01	2017-05-11 14:06:01	Contest Description	Contest Description	Be sure to include what you need, why you need it and what it will be used for. This description is important - it will appear when people share your contest on Facebook.	\N		ContestType	2	15	15	f	t	0	\N	\N
678	2017-05-11 14:06:01	2017-05-11 14:06:01	Things To Include	Things To Include	Things designers should include in their creation	\N		ContestType	2	15	15	f	t	0	\N	\N
679	2017-05-11 14:06:01	2017-05-11 14:06:01	Things To Avoid	Things To Avoid	Things designers should specifically avoid.  Examples: No photos of the band. No literal interpretations. Avoid using photographs.	\N		ContestType	2	15	15	f	t	0	\N	\N
680	2017-05-11 14:06:01	2017-05-11 14:06:01	Style Guidelines	Style Guidelines	Move the sliders to the left or right to help point the designers in the right direction.	\N	Quiet, Loud	ContestType	12	15	15	f	t	0	\N	\N
681	2017-05-11 14:06:01	2017-05-11 14:06:01	Required Text	Required Text		\N		ContestType	2	15	15	f	t	0	\N	\N
682	2017-05-11 14:06:01	2017-05-11 14:06:01	Support Files	Support Files (Optional)	Examples: Logos, concept sketches, band photos (you must have rights to all photos). Accepted file types .jpg, .png, .gif & .pdf. Max file size 5mb.	\N		ContestType	8	15	15	f	t	0	\N	\N
683	2017-05-11 14:06:01	2017-05-11 14:06:01	Support Files	Support Files	Examples: Logos, concept sketches, band photos (you must have rights to all photos). 	\N		ContestType	1	16	16	f	t	0	\N	\N
684	2017-05-11 14:06:01	2017-05-11 14:06:01	Suggested Theme & Style	Suggested Theme & Style	Help designers find the right spirit. A theme can be the name of a song	\N		ContestType	2	16	16	f	t	0	\N	\N
685	2017-05-11 14:06:01	2017-05-11 14:06:01	Things To Include	Things To Include	Things designers should include in their creation	\N		ContestType	1	16	16	f	t	0	\N	\N
686	2017-05-11 14:06:01	2017-05-11 14:06:01	Things To Avoid	Things To Avoid	Things designers should specifically avoid.  Examples: No photos of the band. No literal interpretations. Avoid using photographs.	\N		ContestType	1	16	16	f	t	0	\N	\N
687	2017-05-11 14:06:02	2017-05-11 14:06:02	Style Guidelines	Style Guidelines		\N	Quiet, Loud	ContestType	12	16	16	f	t	0	\N	\N
688	2017-05-11 14:06:02	2017-05-11 14:06:02	Required Text	Required Text	You'll get better designs and more designs when you require less text.	\N		ContestType	2	16	16	f	t	0	\N	\N
689	2017-05-11 14:06:02	2017-05-11 14:06:02	Company or Website Name	Your Company or Website Name	E.g. Some name	\N		ContestType	1	17	17	f	t	0	\N	\N
690	2017-05-11 14:06:02	2017-05-11 14:06:02	Slogan	Do you want any slogans or taglines on your logo?	Leave this blank if you don't have a slogan	\N		ContestType	1	17	17	f	t	0	\N	\N
691	2017-05-11 14:06:02	2017-05-11 14:06:02	Target Audience	Describe your company and organization and target audience. 	Be as detailed as possible.	\N		ContestType	2	17	17	f	t	0	\N	\N
692	2017-05-11 14:06:02	2017-05-11 14:06:02	Communicate to designers	What would you like to communicate to the designers?	Let the designers know what you would like in your entries.	\N		ContestType	2	17	17	f	t	0	\N	\N
693	2017-05-11 14:06:02	2017-05-11 14:06:02	Things to Avoid	I do not want this in the entries	If you would rather not see something in your design, put it here.	\N		ContestType	2	17	17	f	t	0	\N	\N
786	2017-05-11 14:06:03	2017-05-11 14:06:03	Look & Feel for your design	Look and Feel Slider		\N	Elegant,Bold	ContestType	12	27	27	f	t	0	\N	\N
694	2017-05-11 14:06:02	2017-05-11 14:06:02	Logo Usage	How will this logo be used?		\N	Print (business cards\\\\, letterheads\\\\, brochures etc.), Online (website\\\\, online advertising\\\\, banner ads etc.), Merchandise (mugs\\\\, t-shirts etc.), Signs (including shops\\\\, billboards etc.), Television/screen	ContestType	4	17	17	f	t	0	\N	\N
695	2017-05-11 14:06:02	2017-05-11 14:06:02	Logo Communicate	What values should your logo communicate?	Adjust the sliders to the value you prefer.	\N	Feminine,Masculine	ContestType	12	17	17	f	t	0	\N	\N
696	2017-05-11 14:06:02	2017-05-11 14:06:02	Colors of Logo	What colors would you like to see in your logo?		\N		ContestType	11	17	17	f	t	0	\N	\N
697	2017-05-11 14:06:02	2017-05-11 14:06:02	Brief Summary	Type a very brief summary of this contest:		\N		ContestType	1	17	17	f	t	0	\N	\N
698	2017-05-11 14:06:02	2017-05-11 14:06:02	Types of file you will get	Types of file you will get		\N		ContestType	1	18	18	f	t	0	\N	\N
699	2017-05-11 14:06:02	2017-05-11 14:06:02	Company Name	Your Company or Website Name		\N		ContestType	1	18	18	f	t	0	\N	\N
700	2017-05-11 14:06:02	2017-05-11 14:06:02	Website link	Do you have a link to your website?		\N		ContestType	1	18	18	f	t	0	\N	\N
701	2017-05-11 14:06:02	2017-05-11 14:06:02	About your organization	Describe your company and organization and target audience. 		\N		ContestType	2	18	18	f	t	0	\N	\N
702	2017-05-11 14:06:02	2017-05-11 14:06:02	Communication to the designer	What would you like to communicate to the designers?		\N		ContestType	2	18	18	f	t	0	\N	\N
703	2017-05-11 14:06:02	2017-05-11 14:06:02	I do not want this in the entries	I do not want this in the entries		\N		ContestType	2	18	18	f	t	0	\N	\N
704	2017-05-11 14:06:02	2017-05-11 14:06:02	Color	What colors would you like to see in your design?		\N		ContestType	1	18	18	f	t	0	\N	\N
705	2017-05-11 14:06:02	2017-05-11 14:06:02	Common associations in western culture	Common associations in western culture		\N		ContestType	2	18	18	f	t	0	\N	\N
706	2017-05-11 14:06:02	2017-05-11 14:06:02	Upload files	Upload files		\N		ContestType	8	18	18	f	t	0	\N	\N
707	2017-05-11 14:06:02	2017-05-11 14:06:02	Sumary	Type a very brief summary of this contest		\N		ContestType	1	18	18	f	t	0	\N	\N
708	2017-05-11 14:06:02	2017-05-11 14:06:02	Contact Name	Contact Name		\N		ContestType	1	18	18	f	t	0	\N	\N
709	2017-05-11 14:06:02	2017-05-11 14:06:02	Contact Phone Number	Contact Phone Number		\N		ContestType	1	18	18	f	t	0	\N	\N
710	2017-05-11 14:06:02	2017-05-11 14:06:02	Things To Avoid	I do not want this in the entries	If you would rather not see something in your design, put it here.	\N		ContestType	2	19	19	f	t	0	\N	\N
711	2017-05-11 14:06:02	2017-05-11 14:06:02	Company or Website Name	Your Company or Website Name	E.g. Some name	\N		ContestType	1	19	19	f	t	0	\N	\N
712	2017-05-11 14:06:02	2017-05-11 14:06:02	Company name in design	Company name that will be on the design?		\N		ContestType	1	19	19	f	t	0	\N	\N
713	2017-05-11 14:06:02	2017-05-11 14:06:02	Target Audience	Describe your company and organization and target audience	Be as detailed as possible.	\N		ContestType	2	19	19	f	t	0	\N	\N
714	2017-05-11 14:06:02	2017-05-11 14:06:02	Communicate to designers	What would you like to communicate to the designers?	Let the designers know what you would like in your entries.	\N		ContestType	2	19	19	f	t	0	\N	\N
715	2017-05-11 14:06:02	2017-05-11 14:06:02	Colors	What colors would you like to see in your design?		\N		ContestType	11	19	19	f	t	0	\N	\N
716	2017-05-11 14:06:02	2017-05-11 14:06:02	Brief Summary	Type a very brief summary of this contest		\N		ContestType	1	19	19	f	t	0	\N	\N
717	2017-05-11 14:06:02	2017-05-11 14:06:02	Company Name	Your Company or Website Name		\N		ContestType	1	20	20	f	t	0	\N	\N
718	2017-05-11 14:06:02	2017-05-11 14:06:02	Name in your design	Company name that will be on the design?		\N		ContestType	1	20	20	f	t	0	\N	\N
719	2017-05-11 14:06:02	2017-05-11 14:06:02	Describe audience	Describe your company and organization and target audience.		\N		ContestType	2	20	20	f	t	0	\N	\N
720	2017-05-11 14:06:02	2017-05-11 14:06:02	Communication to the designer	What would you like to communicate to the designers?		\N		ContestType	2	20	20	f	t	0	\N	\N
721	2017-05-11 14:06:02	2017-05-11 14:06:02	I do not want this in the entries	I do not want this in the entries		\N		ContestType	2	20	20	f	t	0	\N	\N
722	2017-05-11 14:06:02	2017-05-11 14:06:02	Color	What colors would you like to see in your design?		\N		ContestType	1	20	20	f	t	0	\N	\N
723	2017-05-11 14:06:02	2017-05-11 14:06:02	Common associations in western culture	Common associations in western culture		\N		ContestType	2	20	20	f	t	0	\N	\N
724	2017-05-11 14:06:02	2017-05-11 14:06:02	Types of file you will get	Types of file you will get		\N		ContestType	1	20	20	f	t	0	\N	\N
725	2017-05-11 14:06:02	2017-05-11 14:06:02	Upload files	Upload files		\N		ContestType	8	20	20	f	t	0	\N	\N
726	2017-05-11 14:06:02	2017-05-11 14:06:02	Sumary	Type a very brief summary of this contest		\N		ContestType	2	20	20	f	t	0	\N	\N
727	2017-05-11 14:06:02	2017-05-11 14:06:02	Contact Name	Contact Name		\N		ContestType	1	20	20	f	t	0	\N	\N
728	2017-05-11 14:06:02	2017-05-11 14:06:02	Contact Phone Number	Contact Phone Number		\N		ContestType	1	20	20	f	t	0	\N	\N
729	2017-05-11 14:06:02	2017-05-11 14:06:02	Business Name	Business Name	(Exact text that will be in your logo design)	\N		ContestType	1	22	21	f	t	0	\N	\N
730	2017-05-11 14:06:02	2017-05-11 14:06:02	Slogan	Slogan - Tagline		\N		ContestType	1	22	21	f	t	0	\N	\N
731	2017-05-11 14:06:02	2017-05-11 14:06:02	Description	Description		\N		ContestType	2	22	21	f	t	0	\N	\N
732	2017-05-11 14:06:02	2017-05-11 14:06:02	Communicate to designers	The top three things you want to communicate through your logo		\N		ContestType	2	22	21	f	t	0	\N	\N
733	2017-05-11 14:06:02	2017-05-11 14:06:02	Target Audience	Please describe the target audience for your logo	Give some specific details about your design: Demographics: Age, Sex, Location,  Income, Occupation, Education, Industry, Lifestyle, Interests, Behavior, Opinions. 	\N		ContestType	2	22	21	f	t	0	\N	\N
734	2017-05-11 14:06:02	2017-05-11 14:06:02	Colors	Please describe the colors you would like to see (or not see) in your logo or leave blank to leave color choices up to the designer.		\N		ContestType	11	22	21	f	t	0	\N	\N
735	2017-05-11 14:06:02	2017-05-11 14:06:02	Design Preference Sliders	Design Preference Sliders		\N	Feminine,Masculine	ContestType	12	22	21	f	t	0	\N	\N
736	2017-05-11 14:06:02	2017-05-11 14:06:02	Logo Usage	Where will your logo be used ?		\N	Web, Print, Signage and Billboards, Television, Imprinted Promotional Products 	ContestType	4	22	21	f	t	0	\N	\N
737	2017-05-11 14:06:02	2017-05-11 14:06:02	Brandname For Logo	Which brandname do you want in your logo?	Example: Acme Inc.	\N		ContestType	1	21	22	f	t	0	\N	\N
738	2017-05-11 14:06:02	2017-05-11 14:06:02	Slogan or Tagline	Do you have a slogan or tagline to be incorporated in the logo?	If you don't have a slogan, just leave this empty.	\N		ContestType	1	21	22	f	t	0	\N	\N
739	2017-05-11 14:06:02	2017-05-11 14:06:02	Company or Product and your Target Market. 	Tell us about your company or product, and your target market. 	Example: We sell anvils and other industrial goods to manufacturing companies and hobbyists all over the world.	\N		ContestType	1	21	22	f	t	0	\N	\N
740	2017-05-11 14:06:02	2017-05-11 14:06:02	Design 	What are you looking for in a design?		\N		ContestType	2	21	22	f	t	0	\N	\N
742	2017-05-11 14:06:02	2017-05-11 14:06:02	Allow ClipArt	Do you want to allow ClipArt	Yes - Designers may use pre-fabricated, royalty-free clip art in the design. No - Designers must be creative and original with the entire design.	\N	Yes, No	ContestType	5	21	22	f	t	0	\N	\N
743	2017-05-11 14:06:02	2017-05-11 14:06:02	Colors & Inspirations	Colors & Inspirations	Do you have specific colors or images in mind? If not, just skip this step…	\N		ContestType	11	21	22	f	t	0	\N	\N
744	2017-05-11 14:06:02	2017-05-11 14:06:02	Sample Image	Sample Image		\N		ContestType	8	21	22	f	t	0	\N	\N
745	2017-05-11 14:06:03	2017-05-11 14:06:03	Business name	Business name		\N		ContestType	1	23	23	f	t	0	\N	\N
746	2017-05-11 14:06:03	2017-05-11 14:06:03	Slogan (optional)	Slogan (optional)		\N		ContestType	1	23	23	f	t	0	\N	\N
747	2017-05-11 14:06:03	2017-05-11 14:06:03	Briefly describe your business:	Briefly describe your business:		\N		ContestType	2	23	23	f	t	0	\N	\N
748	2017-05-11 14:06:03	2017-05-11 14:06:03	Industry type	Industry type		\N	Accounting,Automotive,Beauty,Construction,Consulting,Education,Entertainment,Events,Financial and Insurance,Home and Garden,Legal,Manufacturing and Wholesale,Media\\\\,Medical and Dental,Natural Resources,Non-Profit,Real Estate,Religious,Restaurant,Retail,Service Industries,Sports and Recreation,Technology,Travel and Hospitality,Other	ContestType	3	23	23	f	t	0	\N	\N
749	2017-05-11 14:06:03	2017-05-11 14:06:03	Target Market for your logo	Target Market for your logo		\N		ContestType	2	23	23	f	t	0	\N	\N
750	2017-05-11 14:06:03	2017-05-11 14:06:03	Top 3 things to communicate through your logo	Top 3 things to communicate through your logo		\N		ContestType	1	23	23	f	t	0	\N	\N
751	2017-05-11 14:06:03	2017-05-11 14:06:03	What values should your logo communicate?	What values should your logo communicate?		\N	Feminine,Masculine	ContestType	12	23	23	f	t	0	\N	\N
752	2017-05-11 14:06:03	2017-05-11 14:06:03	Please describe the colors you would like to see in your logo	Please describe the colors you would like to see in your logo		\N		ContestType	2	23	23	f	t	0	\N	\N
753	2017-05-11 14:06:03	2017-05-11 14:06:03	Share	Share if you have a logo idea or some additional information that would be useful to the designers (optional)		\N		ContestType	2	23	23	f	t	0	\N	\N
754	2017-05-11 14:06:03	2017-05-11 14:06:03	Upload File	Do you have some documents that might be helpful to include in your contest? 		\N		ContestType	8	23	23	f	t	0	\N	\N
755	2017-05-11 14:06:03	2017-05-11 14:06:03	Where will your logo be used?	Where will your logo be used?		\N	Billboards & Signs,Mobile/Tablet App,Mugs,T-shirts,Print Television Web  	ContestType	4	23	23	f	t	0	\N	\N
756	2017-05-11 14:06:03	2017-05-11 14:06:03	Logo Text	Logo Text	What do you want your logo to say on it	\N		ContestType	1	24	24	f	t	0	\N	\N
757	2017-05-11 14:06:03	2017-05-11 14:06:03	Must Have	Must Have	Tell the designers what is compulsory to have in their designs.	\N		ContestType	2	24	24	f	t	0	\N	\N
758	2017-05-11 14:06:03	2017-05-11 14:06:03	Nice to Haves	Nice to Haves	Tell the designers some ideas you would like to see.	\N		ContestType	2	24	24	f	t	0	\N	\N
759	2017-05-11 14:06:03	2017-05-11 14:06:03	Should Not Haves	Should Not Haves	Rule out things you definitely don't want to see and be specific.	\N		ContestType	2	24	24	f	t	0	\N	\N
760	2017-05-11 14:06:03	2017-05-11 14:06:03	Look and Feel Slider	Look and Feel Slider		\N	Elegant,Bold	ContestType	12	24	24	f	t	0	\N	\N
761	2017-05-11 14:06:03	2017-05-11 14:06:03	Target Market	Target Market	Who is the audience for your design or buyer of your product?	\N		ContestType	2	24	24	f	t	0	\N	\N
762	2017-05-11 14:06:03	2017-05-11 14:06:03	Files	Upload Files		\N		ContestType	8	24	24	f	t	0	\N	\N
764	2017-05-11 14:06:03	2017-05-11 14:06:03	Slogan (optional)	Slogan (optional)		\N		ContestType	1	23	25	f	t	0	\N	\N
765	2017-05-11 14:06:03	2017-05-11 14:06:03	Briefly describe your business:	Briefly describe your business:		\N		ContestType	2	23	25	f	t	0	\N	\N
766	2017-05-11 14:06:03	2017-05-11 14:06:03	Industry type	Industry type		\N	Accounting,Automotive,Beauty,Construction,Consulting,Education,Entertainment,Events,Financial and Insurance,Home and Garden,Legal,Manufacturing and Wholesale,Media\\\\,Medical and Dental,Natural Resources,Non-Profit,Real Estate,Religious,Restaurant,Retail,Service Industries,Sports and Recreation,Technology,Travel and Hospitality,Other	ContestType	3	23	25	f	t	0	\N	\N
767	2017-05-11 14:06:03	2017-05-11 14:06:03	Target Market for your logo	Target Market for your logo		\N		ContestType	2	23	25	f	t	0	\N	\N
768	2017-05-11 14:06:03	2017-05-11 14:06:03	Top 3 things to communicate through your logo	Top 3 things to communicate through your logo		\N		ContestType	1	23	25	f	t	0	\N	\N
769	2017-05-11 14:06:03	2017-05-11 14:06:03	What values should your logo communicate?	What values should your logo communicate?		\N	Feminine,Masculine	ContestType	12	23	25	f	t	0	\N	\N
770	2017-05-11 14:06:03	2017-05-11 14:06:03	Please describe the colors you would like to see in your logo	Please describe the colors you would like to see in your logo		\N		ContestType	2	23	25	f	t	0	\N	\N
771	2017-05-11 14:06:03	2017-05-11 14:06:03	Share	Share if you have a logo idea or some additional information that would be useful to the designers (optional)		\N		ContestType	2	23	25	f	t	0	\N	\N
772	2017-05-11 14:06:03	2017-05-11 14:06:03	Upload File	Do you have some documents that might be helpful to include in your contest? 		\N		ContestType	8	23	25	f	t	0	\N	\N
773	2017-05-11 14:06:03	2017-05-11 14:06:03	Where will your logo be used?	Where will your logo be used?		\N	Billboards & Signs,Mobile/Tablet App,Mugs,T-shirts,Print Television Web  	ContestType	4	23	25	f	t	0	\N	\N
774	2017-05-11 14:06:03	2017-05-11 14:06:03	Must Have	Must Have	Tell the designers what is compulsory to have in their designs.	\N		ContestType	2	25	26	f	t	0	\N	\N
775	2017-05-11 14:06:03	2017-05-11 14:06:03	Nice to Haves	Nice to Haves	Tell the designers some ideas you would like to see.	\N		ContestType	2	25	26	f	t	0	\N	\N
776	2017-05-11 14:06:03	2017-05-11 14:06:03	Should Not Haves	Should Not Haves	Rule out things you definitely don't want to see and be specific.	\N		ContestType	2	25	26	f	t	0	\N	\N
777	2017-05-11 14:06:03	2017-05-11 14:06:03	Look and Feel Slider	Look and Feel Slider		\N	Elegant,Bold	ContestType	12	25	26	f	t	0	\N	\N
778	2017-05-11 14:06:03	2017-05-11 14:06:03	Target Market	Target Market	Who is the audience for your design or buyer of your product?	\N		ContestType	2	25	26	f	t	0	\N	\N
779	2017-05-11 14:06:03	2017-05-11 14:06:03	Files	Upload Files		\N		ContestType	8	25	26	f	t	0	\N	\N
780	2017-05-11 14:06:03	2017-05-11 14:06:03	Task description	Task description		\N		ContestType	2	27	27	f	t	0	\N	\N
781	2017-05-11 14:06:03	2017-05-11 14:06:03	Name your project	Name your project		\N		ContestType	1	27	27	f	t	0	\N	\N
782	2017-05-11 14:06:03	2017-05-11 14:06:03	Project duration	Project duration		\N	2 days,5 days,10 days,15 days	ContestType	3	27	27	f	t	0	\N	\N
783	2017-05-11 14:06:03	2017-05-11 14:06:03	Must Have	Must Have		\N		ContestType	2	27	27	f	t	0	\N	\N
784	2017-05-11 14:06:03	2017-05-11 14:06:03	Nice to Haves	Nice to Haves		\N		ContestType	2	27	27	f	t	0	\N	\N
785	2017-05-11 14:06:03	2017-05-11 14:06:03	Should Not Haves	Should Not Haves		\N		ContestType	2	27	27	f	t	0	\N	\N
789	2017-05-11 14:06:03	2017-05-11 14:06:03	Files	Upload Files		\N		ContestType	8	28	28	f	t	0	\N	\N
790	2017-05-11 14:06:03	2017-05-11 14:06:03	Must Have	Must Have	Tell the designers what is compulsory to have in their designs.	\N		ContestType	2	28	28	f	t	0	\N	\N
791	2017-05-11 14:06:03	2017-05-11 14:06:03	Nice to Haves	Nice to Haves	Tell the designers some ideas you would like to see.	\N		ContestType	2	28	28	f	t	0	\N	\N
792	2017-05-11 14:06:03	2017-05-11 14:06:03	Should Not Haves	Should Not Haves	Rule out things you definitely don't want to see and be specific.	\N		ContestType	2	28	28	f	t	0	\N	\N
793	2017-05-11 14:06:03	2017-05-11 14:06:03	Look and Feel Slider	Look and Feel Slider		\N	Elegant,Bold	ContestType	12	28	28	f	t	0	\N	\N
794	2017-05-11 14:06:03	2017-05-11 14:06:03	Target Market	Target Market	Who is the audience for your design or buyer of your product?	\N		ContestType	2	28	28	f	t	0	\N	\N
795	2017-05-11 14:06:03	2017-05-11 14:06:03	Must Have	Must Have	Tell the designers what is compulsory to have in their designs.	\N		ContestType	2	26	29	f	t	0	\N	\N
796	2017-05-11 14:06:03	2017-05-11 14:06:03	Nice to Haves	Nice to Haves	Tell the designers some ideas you would like to see.	\N		ContestType	2	26	29	f	t	0	\N	\N
797	2017-05-11 14:06:03	2017-05-11 14:06:03	Should Not Haves	Should Not Haves	Rule out things you definitely don't want to see and be specific.	\N		ContestType	2	26	29	f	t	0	\N	\N
798	2017-05-11 14:06:03	2017-05-11 14:06:03	Look and Feel Slider	Look and Feel Slider		\N	Elegant, Bold	ContestType	12	26	29	f	t	0	\N	\N
799	2017-05-11 14:06:03	2017-05-11 14:06:03	Target Market	Target Market	Who is the audience for your design or buyer of your product?	\N		ContestType	2	26	29	f	t	0	\N	\N
800	2017-05-11 14:06:03	2017-05-11 14:06:03	Files	Upload Files		\N		ContestType	8	26	29	f	t	0	\N	\N
801	2017-05-11 14:06:03	2017-05-11 14:06:03	Options	Options		\N	Voiceover required?,Music required?,NDA required?	ContestType	4	29	30	f	t	0	\N	\N
802	2017-05-11 14:06:03	2017-05-11 14:06:03	Client name	Client name		\N		ContestType	1	29	30	f	t	0	\N	\N
803	2017-05-11 14:06:03	2017-05-11 14:06:03	Client URL	Client URL		\N		ContestType	1	29	30	f	t	0	\N	\N
804	2017-05-11 14:06:03	2017-05-11 14:06:03	Brief	Brief		\N		ContestType	2	29	30	f	t	0	\N	\N
805	2017-05-11 14:06:03	2017-05-11 14:06:03	Supporting files	Supporting files	Upload any files or documents that may help creatives understand your project better. 	\N		ContestType	8	29	30	f	t	0	\N	\N
\.


--
-- Name: form_fields_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('form_fields_id_seq', 805, true);


--
-- Data for Name: hire_requests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY hire_requests (id, created_at, updated_at, user_id, requested_user_id, foreign_id, class, message) FROM stdin;
\.


--
-- Name: hire_requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('hire_requests_id_seq', 1, false);


--
-- Data for Name: input_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY input_types (id, created_at, updated_at, name, value) FROM stdin;
3	2009-10-22 13:21:46	2009-10-22 13:21:46	Select Box	select
4	2009-11-12 14:51:51	2009-11-12 14:51:51	Check Boxes	checkbox
5	2009-11-12 14:51:51	2009-11-12 14:51:51	Radio Buttons	radio
6	2009-11-12 15:03:10	2009-11-12 15:03:10	Date Picker	datepicker
7	2009-11-12 15:03:10	2009-11-12 15:03:10	Time Picker	timepicker
8	2016-12-10 15:38:30	2016-12-10 15:38:30	File Upload	file
9	2016-12-10 15:39:12	2016-12-10 15:39:12	Datetime Picker	datetime
10	2016-12-10 15:40:22	2016-12-10 15:40:22	Multiple Option Select Box	multiselect
11	2016-12-10 15:40:56	2016-12-10 15:40:56	Color Picker	color
12	2016-12-10 15:41:34	2016-12-10 15:41:34	Slider	slider
1	2009-10-22 13:21:46	2009-10-22 13:21:46	Single Line of Text	textInput
2	2009-10-22 13:21:46	2009-10-22 13:21:46	Multiple Lines of Text	textArea
\.


--
-- Name: input_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('input_types_id_seq', 12, true);


--
-- Data for Name: ips; Type: TABLE DATA; Schema: public; Owner: -
--

COPY ips (id, created_at, updated_at, ip, host, city_id, state_id, country_id, timezone_id, latitude, longitude) FROM stdin;
\.


--
-- Name: ips_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('ips_id_seq', 1, true);


--
-- Data for Name: job_applies; Type: TABLE DATA; Schema: public; Owner: -
--

COPY job_applies (id, created_at, updated_at, job_id, user_id, job_apply_status_id, cover_letter, total_resume_rating, resume_rating_count, ip_id) FROM stdin;
\.


--
-- Name: job_applies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('job_applies_id_seq', 4, true);


--
-- Data for Name: job_applies_portfolios; Type: TABLE DATA; Schema: public; Owner: -
--

COPY job_applies_portfolios (id, job_apply_id, portfolio_id) FROM stdin;
\.


--
-- Name: job_applies_portfolios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('job_applies_portfolios_id_seq', 1, false);


--
-- Data for Name: job_apply_clicks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY job_apply_clicks (id, created_at, updated_at, user_id, job_id, ip_id) FROM stdin;
\.


--
-- Name: job_apply_clicks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('job_apply_clicks_id_seq', 1, false);


--
-- Data for Name: job_apply_statuses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY job_apply_statuses (id, created_at, updated_at, name, slug) FROM stdin;
1	2014-04-02 16:47:52	2014-04-02 16:47:52	New	new
2	2014-04-02 16:47:52	2014-04-02 16:47:52	Inprocess	inprocess
3	2014-04-02 16:48:33	2014-04-02 16:48:33	Selected	selected
4	2014-04-02 16:48:33	2014-04-02 16:48:33	Rejected	rejected
\.


--
-- Name: job_apply_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('job_apply_statuses_id_seq', 4, true);


--
-- Data for Name: job_categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY job_categories (id, created_at, updated_at, name, slug, job_count, is_active, active_job_count) FROM stdin;
1	2014-04-02 16:56:45	2014-04-02 16:56:45	Accounting/Finance/Insurance	accounting-finance-insurance	0	t	0
2	2014-04-02 16:56:45	2014-04-02 16:56:45	Administrative/Clerical	administrative-clerical	0	t	0
3	2014-04-02 16:56:45	2014-04-02 16:56:45	Banking/Real Estate/Mortgage Professionals	banking-real-estate-mortgage-professionals	0	t	0
4	2014-04-02 16:56:45	2014-04-02 16:56:45	Biotech/R&D/Science	biotech-r-d-science	0	t	0
5	2014-04-02 16:56:45	2014-04-02 16:56:45	Building Construction/Skilled Trades	building-construction-skilled-trades	0	t	0
7	2014-04-02 16:56:45	2014-04-02 16:56:45	Creative/Design	creative-design	0	t	0
8	2014-04-02 16:56:45	2014-04-02 16:56:45	Customer Support/Client Care	customer-support-client-care	0	t	0
9	2014-04-02 16:56:45	2014-04-02 16:56:45	Editorial/Writing	editorial-writing	0	t	0
10	2014-04-02 16:56:45	2014-04-02 16:56:45	Education/Training	education-training	0	t	0
11	2014-04-02 16:56:45	2014-04-02 16:56:45	Engineering	engineering	0	t	0
12	2014-04-02 16:56:45	2014-04-02 16:56:45	Food Services/Hospitality	food-services-hospitality	0	t	0
13	2014-04-02 16:56:45	2014-04-02 16:56:45	Human Resources	human-resources	0	t	0
14	2014-04-02 16:56:45	2014-04-02 16:56:45	Installation/Maintenance/Repair	installation-maintenance-repair	0	t	0
16	2014-04-02 16:56:45	2014-04-02 16:56:45	Legal	legal	0	t	0
17	2014-04-02 16:56:45	2014-04-02 16:56:45	Logistics/Transportation	logistics-transportation	0	t	0
18	2014-04-02 16:56:45	2014-04-02 16:56:45	Manufacturing/Production/Operations	manufacturing-production-operations	0	t	0
19	2014-04-02 16:56:45	2014-04-02 16:56:45	Marketing/Product	marketing-product	0	t	0
25	2014-04-02 16:56:45	2014-04-02 16:56:45	Other	other	0	t	0
20	2014-04-02 16:56:45	2014-04-02 16:56:45	Medical/Health	medical-health	0	t	0
21	2014-04-02 16:56:45	2014-04-02 16:56:45	Project/Program Management	project-program-management	0	t	0
22	2014-04-02 16:56:45	2014-04-02 16:56:45	Quality Assurance/Safety	quality-assurance-safety	0	t	0
24	2014-04-02 16:56:45	2014-04-02 16:56:45	Security/Protective Services	security-protective-services	0	t	0
15	2014-04-02 16:56:45	2017-04-29 13:01:31	IT/Software Development	it-software-development	0	t	0
23	2014-04-02 16:56:45	2017-04-29 13:08:56	Sales/Retail/Business Development	sales-retail-business-development	0	t	0
6	2014-04-02 16:56:45	2017-04-29 13:13:29	Business/Strategic Management	business-strategic-management	0	t	0
\.


--
-- Name: job_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('job_categories_id_seq', 25, true);


--
-- Data for Name: job_statuses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY job_statuses (id, created_at, updated_at, name, slug, job_count) FROM stdin;
1	2014-04-02 16:44:23	2014-04-02 16:44:23	Draft	draft	0
2	2014-04-02 16:44:23	2014-04-02 16:44:23	Payment Pending	payment-pending	0
3	2014-04-02 16:44:59	2014-04-02 16:44:59	Pending Approval	pending-approval	0
4	2014-04-02 16:44:59	2014-04-02 16:44:59	Open	open	0
5	2014-04-02 16:45:30	2014-04-02 16:45:30	Inactive by Employer	canceled-by-employer 	0
6	2014-04-02 16:45:30	2014-04-02 16:45:30	Expired	expired	0
7	2014-04-02 16:45:42	2014-04-02 16:45:42	Archived	archived	0
8	2017-04-25 16:45:42	2017-04-25 16:45:42	Canceled By Admin	canceled--by-admin	0
\.


--
-- Name: job_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('job_statuses_id_seq', 8, true);


--
-- Data for Name: job_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY job_types (id, created_at, updated_at, name, slug, is_active) FROM stdin;
1	2014-04-02 17:03:45	2014-04-02 17:03:45	Full Time	full-time	t
2	2014-04-02 17:03:45	2014-04-02 17:03:45	Part Time	part-time	t
3	2014-04-02 17:03:57	2014-04-02 17:03:57	Freelance	freelance	t
\.


--
-- Name: job_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('job_types_id_seq', 3, true);


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY jobs (id, created_at, updated_at, user_id, job_status_id, job_type_id, job_category_id, title, slug, description, address, address1, city_id, state_id, country_id, zip_code, latitude, longitude, salary_from, salary_to, salary_type_id, is_show_salary, last_date_to_apply, no_of_opening, company_name, ip_id, apply_via, job_url, featured_fee, urgent_fee, zazpay_revised_amount, payment_gateway_id, zazpay_gateway_id, zazpay_payment_id, zazpay_pay_key, job_apply_click_count, job_apply_count, is_featured, is_urgent, is_paid, company_website, view_count, flag_count, full_address, total_listing_fee, is_notification_sent, paypal_pay_key, job_open_date, minimum_experience, maximum_experience) FROM stdin;
\.


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('jobs_id_seq', 7, true);


--
-- Data for Name: jobs_skills; Type: TABLE DATA; Schema: public; Owner: -
--

COPY jobs_skills (id, job_id, skill_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: jobs_skills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('jobs_skills_id_seq', 31, true);


--
-- Data for Name: languages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY languages (id, created_at, updated_at, name, iso2, iso3, is_active) FROM stdin;
1	2009-07-01 13:52:24	2009-07-01 13:52:24	Afar	aa	aar	t
2	2009-07-01 13:52:24	2009-07-01 13:52:24	Abkhazian	ab	abk	t
3	2009-07-01 13:52:24	2009-07-01 13:52:24	Avestan	ae	ave	t
4	2009-07-01 13:52:24	2009-07-01 13:52:24	Afrikaans	af	afr	t
5	2009-07-01 13:52:24	2009-07-01 13:52:24	Akan	ak	aka	t
6	2009-07-01 13:52:24	2009-07-01 13:52:24	Amharic	am	amh	t
7	2009-07-01 13:52:24	2009-07-01 13:52:24	Aragonese	an	arg	t
8	2009-07-01 13:52:24	2012-02-16 15:27:29	Arabic	ar	ara	t
9	2009-07-01 13:52:24	2009-07-01 13:52:24	Assamese	as	asm	t
10	2009-07-01 13:52:24	2009-07-01 13:52:24	Avaric	av	ava	t
11	2009-07-01 13:52:24	2009-07-01 13:52:24	Aymara	ay	aym	t
12	2009-07-01 13:52:24	2009-07-01 13:52:24	Azerbaijani	az	aze	t
13	2009-07-01 13:52:24	2009-07-01 13:52:24	Bashkir	ba	bak	t
14	2009-07-01 13:52:24	2009-07-01 13:52:24	Belarusian	be	bel	t
15	2009-07-01 13:52:24	2009-07-01 13:52:24	Bulgarian	bg	bul	t
16	2009-07-01 13:52:24	2009-07-01 13:52:24	Bihari	bh	bih	t
17	2009-07-01 13:52:24	2009-07-01 13:52:24	Bislama	bi	bis	t
18	2009-07-01 13:52:24	2009-07-01 13:52:24	Bambara	bm	bam	t
19	2009-07-01 13:52:24	2012-01-28 19:44:46	Bengali	bn	ben	f
20	2009-07-01 13:52:24	2009-07-01 13:52:24	Tibetan	bo	bod	t
21	2009-07-01 13:52:24	2009-07-01 13:52:24	Breton	br	bre	t
22	2009-07-01 13:52:24	2009-07-01 13:52:24	Bosnian	bs	bos	t
23	2009-07-01 13:52:24	2009-07-01 13:52:24	Catalan	ca	cat	t
24	2009-07-01 13:52:25	2009-07-01 13:52:25	Chechen	ce	che	t
25	2009-07-01 13:52:25	2009-07-01 13:52:25	Chamorro	ch	cha	t
26	2009-07-01 13:52:25	2009-07-01 13:52:25	Corsican	co	cos	t
27	2009-07-01 13:52:25	2009-07-01 13:52:25	Cree	cr	cre	t
28	2009-07-01 13:52:25	2009-07-01 13:52:25	Czech	cs	ces	t
29	2009-07-01 13:52:25	2009-07-01 13:52:25	Church Slavic	cu	chu	t
30	2009-07-01 13:52:25	2009-07-01 13:52:25	Chuvash	cv	chv	t
31	2009-07-01 13:52:25	2009-07-01 13:52:25	Welsh	cy	cym	t
32	2009-07-01 13:52:25	2009-07-01 13:52:25	Danish	da	dan	t
33	2009-07-01 13:52:25	2009-07-01 13:52:25	German	de	deu	t
34	2009-07-01 13:52:25	2009-07-01 13:52:25	Divehi	dv	div	t
35	2009-07-01 13:52:25	2009-07-01 13:52:25	Dzongkha	dz	dzo	t
36	2009-07-01 13:52:25	2009-07-01 13:52:25	Ewe	ee	ewe	t
37	2009-07-01 13:52:25	2009-07-01 13:52:25	Greek	el	ell	t
38	2009-07-01 13:52:25	2009-07-01 13:52:25	English	en	eng	t
39	2009-07-01 13:52:25	2009-07-01 13:52:25	Esperanto	eo	epo	t
40	2009-07-01 13:52:25	2009-07-01 13:52:25	Spanish	es	spa	t
41	2009-07-01 13:52:25	2009-07-01 13:52:25	Estonian	et	est	t
42	2009-07-01 13:52:25	2009-07-01 13:52:25	Basque	eu	eus	t
43	2009-07-01 13:52:25	2009-07-01 13:52:25	Persian	fa	fas	t
44	2009-07-01 13:52:25	2009-07-01 13:52:25	Fulah	ff	ful	t
45	2009-07-01 13:52:25	2009-07-01 13:52:25	Finnish	fi	fin	t
46	2009-07-01 13:52:25	2009-07-01 13:52:25	Fijian	fj	fij	t
47	2009-07-01 13:52:25	2009-07-01 13:52:25	Faroese	fo	fao	t
48	2009-07-01 13:52:25	2009-07-01 13:52:25	French	fr	fra	t
49	2009-07-01 13:52:25	2009-07-01 13:52:25	Western Frisian	fy	fry	t
50	2009-07-01 13:52:25	2009-07-01 13:52:25	Irish	ga	gle	t
51	2009-07-01 13:52:25	2009-07-01 13:52:25	Scottish Gaelic	gd	gla	t
52	2009-07-01 13:52:25	2009-07-01 13:52:25	Galician	gl	glg	t
53	2009-07-01 13:52:25	2009-07-01 13:52:25	Guaran	gn	grn	t
54	2009-07-01 13:52:25	2009-07-01 13:52:25	Gujarati	gu	guj	t
55	2009-07-01 13:52:25	2009-07-01 13:52:25	Manx	gv	glv	t
56	2009-07-01 13:52:25	2009-07-01 13:52:25	Hausa	ha	hau	t
57	2009-07-01 13:52:25	2009-07-01 13:52:25	Hebrew	he	heb	t
58	2009-07-01 13:52:25	2009-07-01 13:52:25	Hindi	hi	hin	t
59	2009-07-01 13:52:25	2009-07-01 13:52:25	Hiri Motu	ho	hmo	t
60	2009-07-01 13:52:25	2009-07-01 13:52:25	Croatian	hr	hrv	t
61	2009-07-01 13:52:25	2009-07-01 13:52:25	Haitian	ht	hat	t
62	2009-07-01 13:52:25	2009-07-01 13:52:25	Hungarian	hu	hun	t
63	2009-07-01 13:52:25	2009-07-01 13:52:25	Armenian	hy	hye	t
64	2009-07-01 13:52:25	2009-07-01 13:52:25	Herero	hz	her	t
65	2009-07-01 13:52:25	2009-07-01 13:52:25	Interlingua (International Auxiliary Language Association)	ia	ina	t
66	2009-07-01 13:52:25	2009-07-01 13:52:25	Indonesian	id	ind	t
67	2009-07-01 13:52:25	2009-07-01 13:52:25	Interlingue	ie	ile	t
68	2009-07-01 13:52:25	2009-07-01 13:52:25	Igbo	ig	ibo	t
69	2009-07-01 13:52:25	2009-07-01 13:52:25	Sichuan Yi	ii	iii	t
70	2009-07-01 13:52:25	2009-07-01 13:52:25	Inupiaq	ik	ipk	t
71	2009-07-01 13:52:25	2009-07-01 13:52:25	Ido	io	ido	t
72	2009-07-01 13:52:25	2009-07-01 13:52:25	Icelandic	is	isl	t
73	2009-07-01 13:52:25	2009-07-01 13:52:25	Italian	it	ita	t
74	2009-07-01 13:52:25	2009-07-01 13:52:25	Inuktitut	iu	iku	t
75	2009-07-01 13:52:25	2009-07-01 13:52:25	Japanese	ja	jpn	t
76	2009-07-01 13:52:25	2009-07-01 13:52:25	Javanese	jv	jav	t
77	2009-07-01 13:52:25	2009-07-01 13:52:25	Georgian	ka	kat	t
78	2009-07-01 13:52:25	2009-07-01 13:52:25	Kongo	kg	kon	t
79	2009-07-01 13:52:25	2009-07-01 13:52:25	Kikuyu	ki	kik	t
80	2009-07-01 13:52:25	2009-07-01 13:52:25	Kwanyama	kj	kua	t
81	2009-07-01 13:52:25	2009-07-01 13:52:25	Kazakh	kk	kaz	t
82	2009-07-01 13:52:25	2009-07-01 13:52:25	Kalaallisut	kl	kal	t
83	2009-07-01 13:52:25	2009-07-01 13:52:25	Khmer	km	khm	t
84	2009-07-01 13:52:25	2009-07-01 13:52:25	Kannada	kn	kan	t
85	2009-07-01 13:52:25	2009-07-01 13:52:25	Korean	ko	kor	t
86	2009-07-01 13:52:25	2009-07-01 13:52:25	Kanuri	kr	kau	t
87	2009-07-01 13:52:25	2009-07-01 13:52:25	Kashmiri	ks	kas	t
88	2009-07-01 13:52:25	2009-07-01 13:52:25	Kurdish	ku	kur	t
89	2009-07-01 13:52:25	2009-07-01 13:52:25	Komi	kv	kom	t
90	2009-07-01 13:52:25	2009-07-01 13:52:25	Cornish	kw	cor	t
91	2009-07-01 13:52:25	2009-07-01 13:52:25	Kirghiz	ky	kir	t
92	2009-07-01 13:52:25	2009-07-01 13:52:25	Latin	la	lat	t
93	2009-07-01 13:52:25	2009-07-01 13:52:25	Luxembourgish	lb	ltz	t
94	2009-07-01 13:52:25	2009-07-01 13:52:25	Ganda	lg	lug	t
95	2009-07-01 13:52:25	2009-07-01 13:52:25	Limburgish	li	lim	t
96	2009-07-01 13:52:25	2009-07-01 13:52:25	Lingala	ln	lin	t
97	2009-07-01 13:52:25	2009-07-01 13:52:25	Lao	lo	lao	t
98	2009-07-01 13:52:25	2009-07-01 13:52:25	Lithuanian	lt	lit	t
99	2009-07-01 13:52:25	2009-07-01 13:52:25	Luba-Katanga	lu	lub	t
100	2009-07-01 13:52:25	2009-07-01 13:52:25	Latvian	lv	lav	t
101	2009-07-01 13:52:25	2009-07-01 13:52:25	Malagasy	mg	mlg	t
102	2009-07-01 13:52:25	2009-07-01 13:52:25	Marshallese	mh	mah	t
103	2009-07-01 13:52:25	2009-07-01 13:52:25	M	mi	mri	t
104	2009-07-01 13:52:25	2009-07-01 13:52:25	Macedonian	mk	mkd	t
105	2009-07-01 13:52:25	2009-07-01 13:52:25	Malayalam	ml	mal	t
106	2009-07-01 13:52:25	2009-07-01 13:52:25	Mongolian	mn	mon	t
107	2009-07-01 13:52:25	2009-07-01 13:52:25	Marathi	mr	mar	t
108	2009-07-01 13:52:25	2009-07-01 13:52:25	Malay	ms	msa	t
109	2009-07-01 13:52:25	2009-07-01 13:52:25	Maltese	mt	mlt	t
110	2009-07-01 13:52:25	2009-07-01 13:52:25	Burmese	my	mya	t
111	2009-07-01 13:52:25	2009-07-01 13:52:25	Nauru	na	nau	t
112	2009-07-01 13:52:25	2009-07-01 13:52:25	Norwegian Bokm	nb	nob	t
113	2009-07-01 13:52:25	2009-07-01 13:52:25	North Ndebele	nd	nde	t
114	2009-07-01 13:52:25	2009-07-01 13:52:25	Nepali	ne	nep	t
115	2009-07-01 13:52:25	2009-07-01 13:52:25	Ndonga	ng	ndo	t
116	2009-07-01 13:52:25	2009-07-01 13:52:25	Dutch	nl	nld	t
117	2009-07-01 13:52:25	2009-07-01 13:52:25	Norwegian Nynorsk	nn	nno	t
118	2009-07-01 13:52:25	2009-07-01 13:52:25	Norwegian	no	nor	t
119	2009-07-01 13:52:25	2009-07-01 13:52:25	South Ndebele	nr	nbl	t
120	2009-07-01 13:52:25	2009-07-01 13:52:25	Navajo	nv	nav	t
121	2009-07-01 13:52:25	2009-07-01 13:52:25	Chichewa	ny	nya	t
122	2009-07-01 13:52:25	2009-07-01 13:52:25	Occitan	oc	oci	t
123	2009-07-01 13:52:25	2009-07-01 13:52:25	Ojibwa	oj	oji	t
124	2009-07-01 13:52:25	2009-07-01 13:52:25	Oromo	om	orm	t
125	2009-07-01 13:52:25	2009-07-01 13:52:25	Oriya	or	ori	t
126	2009-07-01 13:52:25	2009-07-01 13:52:25	Ossetian	os	oss	t
127	2009-07-01 13:52:25	2009-07-01 13:52:25	Panjabi	pa	pan	t
128	2009-07-01 13:52:25	2009-07-01 13:52:25	P	pi	pli	t
129	2009-07-01 13:52:25	2009-07-01 13:52:25	Polish	pl	pol	t
130	2009-07-01 13:52:25	2009-07-01 13:52:25	Pashto	ps	pus	t
131	2009-07-01 13:52:25	2009-07-01 13:52:25	Portuguese	pt	por	t
132	2009-07-01 13:52:25	2009-07-01 13:52:25	Quechua	qu	que	t
133	2009-07-01 13:52:25	2009-07-01 13:52:25	Raeto-Romance	rm	roh	t
134	2009-07-01 13:52:25	2009-07-01 13:52:25	Kirundi	rn	run	t
135	2009-07-01 13:52:25	2009-07-01 13:52:25	Romanian	ro	ron	t
136	2009-07-01 13:52:25	2009-07-01 13:52:25	Russian	ru	rus	t
137	2009-07-01 13:52:25	2009-07-01 13:52:25	Kinyarwanda	rw	kin	t
138	2009-07-01 13:52:25	2009-07-01 13:52:25	Sanskrit	sa	san	t
139	2009-07-01 13:52:25	2009-07-01 13:52:25	Sardinian	sc	srd	t
140	2009-07-01 13:52:25	2009-07-01 13:52:25	Sindhi	sd	snd	t
141	2009-07-01 13:52:25	2009-07-01 13:52:25	Northern Sami	se	sme	t
142	2009-07-01 13:52:25	2009-07-01 13:52:25	Sango	sg	sag	t
143	2009-07-01 13:52:25	2009-07-01 13:52:25	Sinhala	si	sin	t
144	2009-07-01 13:52:25	2009-07-01 13:52:25	Slovak	sk	slk	t
145	2009-07-01 13:52:25	2009-07-01 13:52:25	Slovenian	sl	slv	t
146	2009-07-01 13:52:25	2009-07-01 13:52:25	Samoan	sm	smo	t
147	2009-07-01 13:52:25	2009-07-01 13:52:25	Shona	sn	sna	t
148	2009-07-01 13:52:25	2009-07-01 13:52:25	Somali	so	som	t
149	2009-07-01 13:52:25	2009-07-01 13:52:25	Albanian	sq	sqi	t
150	2009-07-01 13:52:25	2009-07-01 13:52:25	Serbian	sr	srp	t
151	2009-07-01 13:52:25	2009-07-01 13:52:25	Swati	ss	ssw	t
152	2009-07-01 13:52:25	2009-07-01 13:52:25	Southern Sotho	st	sot	t
153	2009-07-01 13:52:25	2009-07-01 13:52:25	Sundanese	su	sun	t
154	2009-07-01 13:52:25	2009-07-01 13:52:25	Swedish	sv	swe	t
155	2009-07-01 13:52:25	2009-07-01 13:52:25	Swahili	sw	swa	t
156	2009-07-01 13:52:25	2009-07-01 13:52:25	Tamil	ta	tam	t
157	2009-07-01 13:52:25	2009-07-01 13:52:25	Telugu	te	tel	t
158	2009-07-01 13:52:25	2009-07-01 13:52:25	Tajik	tg	tgk	t
159	2009-07-01 13:52:25	2009-07-01 13:52:25	Thai	th	tha	t
160	2009-07-01 13:52:25	2009-07-01 13:52:25	Tigrinya	ti	tir	t
161	2009-07-01 13:52:25	2009-07-01 13:52:25	Turkmen	tk	tuk	t
162	2009-07-01 13:52:25	2009-07-01 13:52:25	Tagalog	tl	tgl	t
163	2009-07-01 13:52:25	2009-07-01 13:52:25	Tswana	tn	tsn	t
164	2009-07-01 13:52:25	2009-07-01 13:52:25	Tonga	to	ton	t
165	2009-07-01 13:52:25	2009-07-01 13:52:25	Turkish	tr	tur	t
166	2009-07-01 13:52:25	2009-07-01 13:52:25	Tsonga	ts	tso	t
167	2009-07-01 13:52:25	2009-07-01 13:52:25	Tatar	tt	tat	t
168	2009-07-01 13:52:25	2009-07-01 13:52:25	Twi	tw	twi	t
169	2009-07-01 13:52:25	2009-07-01 13:52:25	Tahitian	ty	tah	t
170	2009-07-01 13:52:25	2009-07-01 13:52:25	Uighur	ug	uig	t
171	2009-07-01 13:52:25	2009-07-01 13:52:25	Ukrainian	uk	ukr	t
172	2009-07-01 13:52:25	2009-07-01 13:52:25	Urdu	ur	urd	t
173	2009-07-01 13:52:25	2009-07-01 13:52:25	Uzbek	uz	uzb	t
174	2009-07-01 13:52:25	2009-07-01 13:52:25	Venda	ve	ven	t
175	2009-07-01 13:52:25	2009-07-01 13:52:25	Vietnamese	vi	vie	t
176	2009-07-01 13:52:25	2009-07-01 13:52:25	Volap	vo	vol	t
177	2009-07-01 13:52:25	2009-07-01 13:52:25	Walloon	wa	wln	t
178	2009-07-01 13:52:25	2009-07-01 13:52:25	Wolof	wo	wol	t
179	2009-07-01 13:52:25	2009-07-01 13:52:25	Xhosa	xh	xho	t
180	2009-07-01 13:52:25	2009-07-01 13:52:25	Yiddish	yi	yid	t
181	2009-07-01 13:52:25	2009-07-01 13:52:25	Yoruba	yo	yor	t
182	2009-07-01 13:52:25	2009-07-01 13:52:25	Zhuang	za	zha	t
183	2009-07-01 13:52:25	2009-07-01 13:52:25	Chinese	zh	zho	t
184	2009-07-01 13:52:25	2009-07-01 13:52:25	Zulu	zu	zul	t
185	2012-01-28 19:45:13	2012-01-28 19:45:13	hungaro	hu	hu 	t
\.


--
-- Name: languages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('languages_id_seq', 185, true);


--
-- Data for Name: message_contents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY message_contents (id, created_at, updated_at, subject, message) FROM stdin;
\.


--
-- Name: message_contents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('message_contents_id_seq', 19, true);


--
-- Name: message_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('message_types_id_seq', 51, true);


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY messages (id, created_at, updated_at, user_id, other_user_id, parent_id, message_content_id, foreign_id, class, root, freshness_ts, depth, materialized_path, path, size, is_sender, is_read, is_deleted, is_private, is_child_replied, model_id) FROM stdin;
\.


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('messages_id_seq', 38, true);


--
-- Data for Name: milestone_statuses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY milestone_statuses (id, created_at, updated_at, name, slug, is_active, milestone_count, "order") FROM stdin;
1	2011-09-17 13:35:54	2011-09-17 13:35:54	Milestone  Suggested	pending	1	0	1
2	2011-09-17 13:35:54	2011-09-17 13:35:54	Milestone Set	approved	1	0	2
3	2011-09-17 13:39:22	2011-09-17 13:39:22	Requested for Escrow	request-escrow	1	0	3
5	2011-04-01 20:05:15	2011-04-01 20:05:15	Completed	milestone-completed	1	0	7
4	2011-04-01 20:05:15	2011-04-01 20:05:15	Escrow Funded	escrow-added	1	0	4
6	2011-04-01 20:05:15	2011-04-01 20:05:15	Requested for Release	request-for-release	1	0	6
7	2011-09-17 13:39:22	2011-09-17 13:39:22	Escrow Released	completed	1	0	7
8	2011-09-17 13:39:22	2011-09-17 13:39:22	Canceled	canceled	t	0	8
\.


--
-- Name: milestone_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('milestone_statuses_id_seq', 8, true);


--
-- Data for Name: milestones; Type: TABLE DATA; Schema: public; Owner: -
--

COPY milestones (id, created_at, updated_at, project_id, user_id, amount, description, milestone_status_id, bid_id, completed_date, escrow_amount_requested_date, escrow_amount_released_date, escrow_amount_paid_date, site_commission_from_employer, site_commission_from_freelancer, payment_gateway_id, paypal_pay_key, deadline_date, zazpay_gateway_id) FROM stdin;
\.


--
-- Name: milestones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('milestones_id_seq', 2, true);


--
-- Data for Name: money_transfer_accounts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY money_transfer_accounts (id, created_at, updated_at, user_id, account, is_active, is_primary) FROM stdin;
\.


--
-- Name: money_transfer_accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('money_transfer_accounts_id_seq', 3, true);


--
-- Data for Name: oauth_access_tokens; Type: TABLE DATA; Schema: public; Owner: -
--

COPY oauth_access_tokens (access_token, client_id, user_id, expires, scope) FROM stdin;
\.


--
-- Data for Name: oauth_authorization_codes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY oauth_authorization_codes (authorization_code, client_id, user_id, redirect_uri, expires, scope) FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY oauth_clients (id, created_at, updated_at, user_id, client_name, client_id, client_secret, redirect_uri, grant_types, scope, client_url, logo_url, tos_url, policy_url) FROM stdin;
1	2016-05-13 15:28:23	2016-05-13 15:28:23	1		2212711849319225	14uumnygq6xyorsry8l382o3myr852hb	\N	client_credentials password refresh_token authorization_code	\N	\N	\N	\N	\N
\.


--
-- Name: oauth_clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('oauth_clients_id_seq', 1, true);


--
-- Data for Name: oauth_jwt; Type: TABLE DATA; Schema: public; Owner: -
--

COPY oauth_jwt (client_id, subject, public_key) FROM stdin;
\.


--
-- Data for Name: oauth_refresh_tokens; Type: TABLE DATA; Schema: public; Owner: -
--

COPY oauth_refresh_tokens (refresh_token, client_id, user_id, expires, scope) FROM stdin;
\.


--
-- Data for Name: oauth_scopes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY oauth_scopes (scope, is_default) FROM stdin;
canViewUser	f
canListUserTransactions	f
canUserCreateUserCashWithdrawals	f
canUserViewUserCashWithdrawals	f
canUserListUserCashWithdrawals	f
canUserCreateMoneyTransferAccount	f
canUserUpdateMoneyTransferAccount	f
canUserViewMoneyTransferAccount	f
canUserListMoneyTransferAccount	f
canUserDeleteMoneyTransferAccount	f
canListQuoteBid	f
canCreateQuoteRequest	f
canListUserQuoteRequestFormField	f
canPostQuoteFaqAnswer	f
canDeleteQuoteFaqAnswerId	f
canUpdateQuoteFaqAnswerId	f
canAddQuoteService	f
canDeleteQuoteService	f
canUpdateQuoteService	f
canCreateQuoteServicePhoto	f
canUpdateQuoteServicePhoto	f
canDeleteQuoteServicePhoto	f
canCreateQuoteServiceVideo	f
canDeleteQuoteServiceVideo	f
canUpdateQuoteServiceVideo	f
canCreateQuoteServiceAudio	f
canDeleteQuoteServiceAudio	f
canUpdateQuoteServiceAudio	f
canGetQuoteFaqQuestionTemplate	f
canCreateQuoteCreditPurchasLog	f
canUserListQuoteFormField	f
canDeletePortfolio	f
canUpdatePortfolio	f
canCreatePortfolio	f
canGetquoteBid	f
canUpdateUser	f
canCreateJob	f
canUpdateJob	f
canDeleteJob	f
canUpdateJobApply	f
canViewJobApply	f
canCreateJobApply	f
canListJobApplyStatus	f
canCreateExamsQuestion	f
canCreateExamAnswer	f
canViewExamAnswer	f
canDeleteExamAnswer	f
canUpdateExamAnswer	f
canListExamLevel	f
canUserViewJob	f
canUserPortfolio	f
canUpdateExamsAnswer	f
canViewMyQuoteService	f
canGetMe	f
canViewMyContest	f
canViewMyContestUser	f
canDeleteContest	f
canUpdateContest	f
canCreateContest	f
canDeleteContestUser	f
canCreateContestUser	f
canUpdateContestUser	f
canUserViewJobApply	f
canListJobStat	f
canListJobApplyStat	f
canListResumeRating	f
canCreateResumeRating	f
canDeleteResumeRating	f
canViewResumeRating	f
canUpdateResumeRating	f
canListEmployerJobApply	f
canListJobApplyResumeRating	f
canCreateMoneyTransferAccount	t
canViewMoneyTransferAccount	t
canUpdateMoneyTransferAccount	t
canDeleteMoneyTransferAccount	t
canListExamsQuestions	f
canGetMyQuoteCreditPurchasLog	f
canListMyQuoteRequest	f
canCreateExamUser	f
canUpdateQuoteBid	f
canViewExamUser	t
canUserViewExamsUsers	f
canCreateProject	f
canDeleteProject	f
canUpdateProject	f
canUserViewProjects	f
canCreateBid	f
canUpdateProjectUpdateStatus	f
canCreateFollower	f
canCreateMilestone	f
canUpdateMilestoneUpdateStatus	f
canCreateMessage	f
canListEmployerBid	f
canListMyBid	f
canUpdateBidUpdateStatus	f
canUpdateMilestone	f
canCreateOrder	f
canCreateWorkProfile	f
canUpdateWorkProfile	f
canDeleteWorkProfile	f
canCreateEducation	f
canUpdateEducation	f
canDeleteEducation	f
canCreateCertification	f
canUpdateCertification	f
canDeleteCertification	f
canCreatePublication	f
canDeletePublication	f
canUpdatePublication	f
canCreateProjectBidInvoice	f
canUpdateProjectBidInvoice	f
canListProjectBidInvoice	f
canViewProjectBidInvoice	f
canListBid	f
canUpdatePaymentEscrow	f
canListProjectDispute	f
canCreateProjectDispute	f
canGetQuoteFaqQuestionTemplateId	f
canViewGetCoupon	f
canListMilestone	f
canListProjectStat	f
canCreateHireRequest	f
canListActiveProject	f
canListDisputeOpenType	f
canListProjectAttachment	f
canCreateProjectAttachment	f
canDeleteProjectAttachment	f
canCreateWallet	f
canDeleteFollower	f
canCreateQuoteCategory	f
canUpdateQuoteCategory	f
canUpdateContestStatus	f
canViewContestStatus	f
canListContestStatus	f
canListFollower	f
canViewFollower	f
canViewQuoteBid	f
canViewContestType	f
canUpdateQuoteRequest	f
canDeleteBid	f
canViewBid	f
canUpdateBid	f
canDeleteMilestone	f
canViewMilestone	f
canDeleteFlag	f
canListMyMilestone	f
canListActivity	f
canListMeProjectBidInvoice	f
canListEmployerProjectBidInvoice	f
canListMyEmployerMilestone	f
canDeleteProjectBidInvoice	f
canListHireRequest	f
canDeleteHireRequest	f
canUpdateHireRequest	f
canQuoteServiceStats	f
canViewFreelancerBidStats	f
canEmployerPayStats	f
canQuoteRequestStats	f
canCreateValut	f
canUpdateValut	f
canDeleteValut	f
canListMeActivity	f
\.


--
-- Data for Name: pages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY pages (id, created_at, updated_at, parent_id, title, title_es, content, content_es, template, draft, lft, rght, level, meta_keywords, description_meta_tag, url, slug, is_default) FROM stdin;
2	2009-07-11 11:16:54	2009-07-21 15:53:27	\N	About		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus convallis leo sit amet commodo. Sed adipiscing mi et dui elementum sed fringilla leo volutpat. Donec at malesuada sem. Nullam risus libero, interdum sit amet aliquam luctus, condimentum at nisi. Praesent fermentum bibendum sem, sit amet semper nunc tempor et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacinia nisl nec neque egestas adipiscing pellentesque dolor convallis. In blandit nulla vitae diam semper non pellentesque risus dictum. In mollis semper neque. Integer suscipit hendrerit metus ac ornare. Maecenas posuere varius adipiscing. Aenean feugiat, turpis sed dictum gravida, orci neque luctus nulla, eu facilisis mi nulla porta enim. Nunc at ipsum dui, bibendum ultricies eros. Nam est lorem, mollis vel aliquam sed, tristique vel odio. In hac habitasse platea dictumst.</p>\r\n\r\n<p>Cras metus dolor, egestas ut commodo sed, laoreet ac quam. Quisque sed ante risus, non scelerisque tortor. Cras lacinia dui sed dui cursus ultricies. In hac habitasse platea dictumst. Morbi diam sem, sodales sit amet viverra quis, sagittis in nunc. Phasellus fermentum, nunc at consequat sagittis, metus tortor sollicitudin velit, tempus elementum elit sapien sit amet dui. Maecenas sodales, urna et dignissim pharetra, nulla leo ultrices lorem, vitae iaculis justo dolor sed mauris.</p>\r\n\r\n<p>Etiam condimentum bibendum felis, sit amet placerat libero bibendum at. Donec tincidunt magna sit amet sapien consequat commodo. Integer sit amet magna tincidunt leo congue blandit et nec leo. Proin id lectus condimentum velit auctor pharetra eget eget enim. Donec nec suscipit erat. Nullam lacinia nibh sed nibh eleifend suscipit eget porttitor metus. Integer lobortis est tempus dolor sagittis sit amet tristique nisi congue. Quisque viverra, velit non euismod ornare, risus erat convallis risus, a pretium mauris dolor vitae eros. Suspendisse sed diam id massa interdum auctor at fringilla ipsum. Curabitur pellentesque, elit vel mollis ullamcorper, nunc diam sollicitudin quam, eget accumsan risus lorem at erat. Sed pharetra purus urna. Nam euismod felis sit amet libero placerat at consequat tortor molestie.</p>	\N	about.ctp	f	\N	\N	0	\N	\N	\N	about	f
7	2009-07-21 15:56:45	2015-05-27 16:24:57	\N	Term and conditions		<h2>Web Site Terms and Conditions of Use</h2><h3>1. Terms</h3>By accessing this web site you are agreeing to be bound by these web site Terms and Conditions of Use all applicable laws and regulations and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms you are prohibited from using or accessing this site. The materials contained in this web site are protected by applicable copyright and trade mark law.<h3>2. Use License</h3><ol><li>Permission is granted to temporarily download one copy of the materials (information or software) on Agriya's web site for personal non-commercial transitory viewing only. This is the grant of a license not a transfer of title and under this license you may not:<ol><li>modify or copy the materials;</li><li>use the materials for any commercial purpose or for any public display (commercial or non-commercial);</li><li>attempt to decompile or reverse engineer any software contained on&nbsp;Agriya's web site;</li><li>remove any copyright or other proprietary notations from the materials; or</li><li>transfer the materials to another person or mirror the materials on any other server.</li></ol></li><li>This license shall automatically terminate if you violate any of these restrictions and may be terminated by&nbsp;Agriya&nbsp;at any&nbsp;time. Upon terminating your viewing of these materials or upon the termination of this license you must destroy any downloaded materials in your possession whether in electronic or printed format.</li></ol><h3>3. Disclaimer</h3>The materials on&nbsp;Agriya's web site are provided as is.&nbsp;Agriya&nbsp;makes no warranties expressed or implied and hereby&nbsp;disclaims&nbsp;and negates all other warranties including without limitation implied warranties or conditions of merchantability fitness for a particular purpose or non-infringement of intellectual property or other violation of rights. Further&nbsp;Agriya&nbsp;does not warrant or make any representations concerning the accuracy likely results or reliability of the use of&nbsp;the materials on its Internet web site or otherwise relating to such materials or on any sites linked to this site.<h3>4. Limitations</h3>In no event shall&nbsp;Agriya&nbsp;or its suppliers be liable for any damages (including without limitation damages for loss of data or profit&nbsp;or due to business interruption) arising out of the use or inability to use the materials on&nbsp;Agriya's Internet site even if&nbsp;Agriya&nbsp;or a&nbsp;Agriya&nbsp;authorized representative has been notified orally or in writing of the possibility of such&nbsp;damage.&nbsp;Because some jurisdictions do not allow limitations on implied warranties or limitations of liability for consequential or incidental damages these limitations may not apply to you.<h3>5. Revisions and Errata</h3>The materials appearing on&nbsp;Agriya's web site could include technical typographical or photographic errors.&nbsp;Agriya&nbsp;does&nbsp;not&nbsp;warrant that any of the materials on its web site are accurate complete or current.&nbsp;Agriya&nbsp;may make&nbsp;changes to the materials contained on its web site at any time without notice.&nbsp;Agriya&nbsp;does not however make any&nbsp;commitment to update the materials.<h3>6. Links</h3>Agriya&nbsp;has not reviewed all of the sites linked to its Internet web site and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by&nbsp;Agriya&nbsp;of the site. Use of any such linked web site is at the&nbsp;user's own risk.<h3>7. Site Terms of Use Modifications</h3>Agriya&nbsp;may revise these terms of use for its web site at any time without notice. By using this web site you are agreeing to be bound by the then current version of these Terms and Conditions of Use.	\N		f	\N	\N	0			/term-and-conditions	term-and-conditions	f
9	2011-06-24 16:55:35	2011-10-07 05:42:07	\N	Privacy		<p>For each visitor to our Web page our Web server automatically recognizes no information regarding the domain or e-mail address.</p><p>We collect the e-mail addresses of those who post messages to our bulletin board the e-mail addresses of those who communicate with us via e-mail the e-mail addresses of those who make postings to our chat areas user-specific information on what pages consumers access or visit information volunteered by the consumer such as survey information and/or site registrations name and address telephone number.</p><p>The information we collect is disclosed when legally required to do so at the request of governmental authorities conducting an investigation to verify or enforce compliance with the policies governing our Website and applicable laws or to protect against misuse or unauthorized use of our Website to a successor entity in connection with a corporate merger consolidation sale of assets or other corporate change respecting the Website.</p><p>With respect to cookies. We use cookies to record session information such as items that consumers add to their shopping cart.</p><p>If you do not want to receive e-mail from us in the future please let us know by sending us e-mail at the above address.</p><p>Persons who supply us with their telephone numbers on-line will only receive telephone contact from us with information regarding orders they have placed on-line. Please provide us with your name and phone number. We will be sure your name is removed from the list we share with other organizations.</p><p>With respect to Ad Servers. We do not partner with or have special relationships with any ad server companies.</p><p>From time to time we may use customer information for new unanticipated uses not previously disclosed in our privacy notice. If our information practices change at some time in the future we will post the policy changes to our Web site to notify you of these changes and we will use for these new purposes only data collected from the time of the policy change forward. If you are concerned about how your information is used you should check back at our Web site periodically.</p><p>Upon request we provide site visitors with access to transaction information (e.g. dates on which customers made purchases amounts and types of purchases) that we maintain about them.</p><p>Upon request we offer visitors the ability to have inaccuracies corrected in contact information transaction information.</p><p>With respect to security. When we transfer and receive certain types of sensitive information such as financial or health information we redirect visitors to a secure server and will notify visitors through a pop-up screen on our site.</p><p>If you feel that this site is not following its stated information policy you may contact us at the above addresses or phone number.</p>\r\n	\N	\N	f	\N	\N	0	\N		/privacy	privacy	f
14	2011-04-01 20:05:15	2011-04-01 20:05:15	\N	How It Works		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer erat  augue, condimentum ac commodo in, consectetur pellentesque quam. Sed  varius semper suscipit. Fusce tincidunt pharetra leo, quis tincidunt  magna posuere non. Quisque hendrerit quam nec elit ornare volutpat.  Proin consectetur iaculis orci ac tincidunt. Nam ultrices fermentum mi  eu consectetur. Praesent ante quam, viverra placerat mollis non,  scelerisque quis erat. Maecenas elit sapien, gravida nec sagittis at,  ultricies bibendum dolor.</p>\r\n<p>Suspendisse dolor ante, dignissim nec aliquet rhoncus, egestas rhoncus  dui. Nulla rutrum, ipsum at ullamcorper porttitor, dolor erat eleifend  odio, in consectetur nisl mi eget nulla. In non enim quis eros viverra  interdum. Phasellus venenatis sem in mi accumsan vel pretium ligula  sodales. Praesent eu gravida sem. In et semper urna. Suspendisse  potenti. Proin a ipsum sit amet purus laoreet hendrerit sed sed tellus.  Nulla feugiat enim sapien, at feugiat turpis. Aliquam ac ante in ipsum  feugiat dignissim.</p>\r\n<p>Cras tempus venenatis dictum. Fusce laoreet turpis hendrerit tortor  gravida non lacinia lectus elementum. Proin posuere odio fermentum orci  placerat ac tempor mauris condimentum. Pellentesque luctus turpis eget  ligula imperdiet auctor. Nam eros elit, fermentum vitae varius non,  dignissim quis erat. Ut accumsan bibendum dui eget elementum. Mauris  ante magna, lacinia aliquet sollicitudin at, interdum vel lorem. Nullam  odio dui, malesuada a feugiat sed, tincidunt non augue.</p>	\N	\N	f	\N	\N	0	\N	\N	/how-it-works	how-it-works	f
15	2011-04-01 20:05:15	2011-04-01 20:05:15	\N	Acceptable Use Policy		<p>You are independently responsible for complying with all applicable  laws in all of your actions related to your use of PayPal&rsquo;s services,  regardless of the purpose of the use. In addition, you must adhere to  the terms of this Acceptable Use Policy.</p>\r\n<p><strong>Prohibited Activities</strong></p>\r\n<p>You may not use the PayPal service for activities that:</p>\r\n<ol>\r\n<li> violate any law, statute, ordinance or regulation </li>\r\n<li> relate to sales of (a) narcotics, steroids, certain  controlled substances or other products that present a risk to consumer  safety, (b) drug paraphernalia, (c) items that encourage, promote,  facilitate or instruct others to engage in illegal activity, (d) items  that promote hate, violence, racial intolerance, or the financial  exploitation of a crime, (e) items that are considered obscene, (f)  items that infringe or violate any copyright, trademark, right of  publicity or privacy or any other proprietary right under the laws of  any jurisdiction, (g) certain sexually oriented materials or services,  (h) ammunition, firearms, or certain firearm parts or accessories, or  (i) certain weapons or knives regulated under applicable law </li>\r\n<li> relate to transactions that (a) show the personal information  of third parties in violation of applicable law, (b) support pyramid or  ponzi schemes, matrix programs, other &ldquo;get rich quick&rdquo; schemes or  certain multi-level marketing programs, (c) are associated with  purchases of real property, annuities or lottery contracts, lay-away  systems, off-shore banking or transactions to finance or refinance debts  funded by a credit card, (d) are for the sale of certain items before  the seller has control or possession of the item, (e) are by payment  processors to collect payments on behalf of merchants, (f) are  associated with the following Money Service Business Activities: the  sale of traveler&rsquo;s cheques or money orders, currency exchanges or cheque  cashing, or (g) provide certain credit repair or debt settlement  services </li>\r\n<li> involve the sales of products or services identified by government agencies to have a high likelihood of being fraudulent </li>\r\n<li>violate applicable laws or industry regulations regarding the  sale of (a) tobacco products, or (b) prescription drugs and devices</li>\r\n<li> involve gambling, gaming and/or any other activity with an  entry fee and a prize, including, but not limited to casino games,  sports betting, horse or greyhound racing, lottery tickets, other  ventures that facilitate gambling, games of skill (whether or not it is  legally defined as a lottery) and sweepstakes unless the operator has  obtained prior approval from PayPal and the operator and customers are  located exclusively in jurisdictions where such activities are permitted  by law. </li>\r\n</ol>	\N	\N	f	\N	\N	0	\N	\N	/aup	aup	f
16	2016-12-16 11:27:37	2016-12-16 11:27:37	\N	FAQ		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer erat  augue, condimentum ac commodo in, consectetur pellentesque quam. Sed  varius semper suscipit. Fusce tincidunt pharetra leo, quis tincidunt  magna posuere non. Quisque hendrerit quam nec elit ornare volutpat.  Proin consectetur iaculis orci ac tincidunt. Nam ultrices fermentum mi  eu consectetur. Praesent ante quam, viverra placerat mollis non,  scelerisque quis erat. Maecenas elit sapien, gravida nec sagittis at,  ultricies bibendum dolor.</p>\n<p>Suspendisse dolor ante, dignissim nec aliquet rhoncus, egestas rhoncus  dui. Nulla rutrum, ipsum at ullamcorper porttitor, dolor erat eleifend  odio, in consectetur nisl mi eget nulla. In non enim quis eros viverra  interdum. Phasellus venenatis sem in mi accumsan vel pretium ligula  sodales. Praesent eu gravida sem. In et semper urna. Suspendisse  potenti. Proin a ipsum sit amet purus laoreet hendrerit sed sed tellus.  Nulla feugiat enim sapien, at feugiat turpis. Aliquam ac ante in ipsum  feugiat dignissim.</p>\n<p>Cras tempus venenatis dictum. Fusce laoreet turpis hendrerit tortor  gravida non lacinia lectus elementum. Proin posuere odio fermentum orci  placerat ac tempor mauris condimentum. Pellentesque luctus turpis eget  ligula imperdiet auctor. Nam eros elit, fermentum vitae varius non,  dignissim quis erat. Ut accumsan bibendum dui eget elementum. Mauris  ante magna, lacinia aliquet sollicitudin at, interdum vel lorem. Nullam  odio dui, malesuada a feugiat sed, tincidunt non augue.</p>	NULL	NULL	f	\N	\N	0	NULL	\N	/faq	faq	f
18	2016-12-16 11:18:33	2016-12-16 11:18:33	\N	Help		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer erat  augue, condimentum ac commodo in, consectetur pellentesque quam. Sed  varius semper suscipit. Fusce tincidunt pharetra leo, quis tincidunt  magna posuere non. Quisque hendrerit quam nec elit ornare volutpat.  Proin consectetur iaculis orci ac tincidunt. Nam ultrices fermentum mi  eu consectetur. Praesent ante quam, viverra placerat mollis non,  scelerisque quis erat. Maecenas elit sapien, gravida nec sagittis at,  ultricies bibendum dolor.</p>\r\n<p>Suspendisse dolor ante, dignissim nec aliquet rhoncus, egestas rhoncus  dui. Nulla rutrum, ipsum at ullamcorper porttitor, dolor erat eleifend  odio, in consectetur nisl mi eget nulla. In non enim quis eros viverra  interdum. Phasellus venenatis sem in mi accumsan vel pretium ligula  sodales. Praesent eu gravida sem. In et semper urna. Suspendisse  potenti. Proin a ipsum sit amet purus laoreet hendrerit sed sed tellus.  Nulla feugiat enim sapien, at feugiat turpis. Aliquam ac ante in ipsum  feugiat dignissim.</p>\r\n<p>Cras tempus venenatis dictum. Fusce laoreet turpis hendrerit tortor  gravida non lacinia lectus elementum. Proin posuere odio fermentum orci  placerat ac tempor mauris condimentum. Pellentesque luctus turpis eget  ligula imperdiet auctor. Nam eros elit, fermentum vitae varius non,  dignissim quis erat. Ut accumsan bibendum dui eget elementum. Mauris  ante magna, lacinia aliquet sollicitudin at, interdum vel lorem. Nullam  odio dui, malesuada a feugiat sed, tincidunt non augue.</p>	\N	NULL	f	\N	\N	0	NULL	\N	/help	help	f
\.


--
-- Name: pages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('pages_id_seq', 20, true);


--
-- Data for Name: payment_gateway_settings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY payment_gateway_settings (id, created_at, updated_at, payment_gateway_id, name, type, options, test_mode_value, live_mode_value, label, description) FROM stdin;
31	2013-08-26 13:36:25	2013-08-26 13:36:27	2	is_payment_via_api	checkbox					Enable/Disable the ##CURRENT_PAYMENT## option
38	2015-02-13 00:00:00	2015-02-13 00:00:00	2	zazpay_transaction_fee_payer	text		Buyer	Buyer		
49	2016-08-10 16:38:04	2016-08-10 16:38:04	1	payment_gateway_all_credentials	text				All Gateway Credentials	All Payment Gateway Credentials
30	2013-08-26 12:34:11	2013-08-26 12:34:13	2	zazpay_subscription_plan	text		One Time Payment			Subscription plan name
48	2016-08-10 16:38:04	2016-12-10 11:17:59	1	zazpay_subscription_plan	text		One Time Payment	Pay as you go	Zazpay Subscription Plan	
26	2013-08-26 12:32:41	2013-08-26 12:32:43	2	zazpay_merchant_id	text		17671			
29	2013-08-26 12:33:42	2013-08-26 12:33:44	2	zazpay_api_key	text		3ddf96f8c31930d84c5a16073db50d7c9fe4dd27			
28	2013-08-26 12:33:25	2013-08-26 12:33:27	2	zazpay_secret_string	text		1ab0af3e03fd457cd42ee7907653bb633ed8d833			
27	2013-08-26 12:33:01	2013-08-26 12:33:04	2	zazpay_website_id	text		17999			
51	2017-05-16 11:29:32	2017-05-16 11:29:32	3	paypal_client_id	text		AaFSgezSJciunkPSb4CkRXq4peg90miVeOqfckaCsMOw57TcYfxRDnXXSctqWPZEWx-euOKJJ4wz6Hr-	\N	Client ID	PayPal Client ID
52	2017-05-16 11:29:32	2017-05-16 11:29:32	3	paypal_client_Secret	text		EGDZ_szCqR9VC1AlrYmN0YnVfsaX6qAVcoF1UI-RuRK5Die_1ji5blzUmUkrQ5ofh5P3v_x6th5mtq7G	CLIENT_SECRET	Client Secret	PayPal Client Secret
\.


--
-- Name: payment_gateway_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('payment_gateway_settings_id_seq', 53, true);


--
-- Data for Name: payment_gateways; Type: TABLE DATA; Schema: public; Owner: -
--

COPY payment_gateways (id, created_at, updated_at, name, slug, description, is_test_mode, is_active, display_name) FROM stdin;
1	2010-05-10 10:43:02	2011-02-28 07:59:19	Wallet	wallet	Payment within the website using user's account balance.	t	t	Wallet
2	2013-08-26 12:28:30	2013-08-26 12:28:33	ZazPay	zazpay	Payment through ZazPay	t	t	ZazPay
3	2017-05-16 12:28:30	2017-05-16 12:28:30	PayPalREST	paypalrest	Payment through PayPalREST	t	t	PayPal
\.


--
-- Name: payment_gateways_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('payment_gateways_id_seq', 4, true);


--
-- Name: portfolio_reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('portfolio_reviews_id_seq', 1, false);


--
-- Name: portfolio_tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('portfolio_tags_id_seq', 1, false);


--
-- Name: portfolio_thumbs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('portfolio_thumbs_id_seq', 1, false);


--
-- Name: portfolio_views_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('portfolio_views_id_seq', 1, false);


--
-- Data for Name: portfolios; Type: TABLE DATA; Schema: public; Owner: -
--

COPY portfolios (id, created_at, updated_at, user_id, description, message_count, follower_count, view_count, flag_count, title, is_admin_suspend) FROM stdin;
\.


--
-- Name: portfolios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('portfolios_id_seq', 12, true);


--
-- Name: portfolios_tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('portfolios_tags_id_seq', 1, false);


--
-- Data for Name: pricing_days; Type: TABLE DATA; Schema: public; Owner: -
--

COPY pricing_days (id, created_at, updated_at, no_of_days, global_price, is_active) FROM stdin;
1	2016-12-10 11:53:04	2016-12-10 11:53:04	30	50	t
2	2016-12-10 13:06:09	2016-12-10 13:06:09	360	50	t
3	2016-12-10 13:06:22	2016-12-10 13:06:22	1	10	t
4	2016-12-10 13:06:52	2016-12-10 13:06:52	10	20	t
5	2016-12-10 13:07:07	2016-12-10 13:07:07	25	40	t
6	2016-12-10 13:07:19	2016-12-10 13:07:19	5	15	t
\.


--
-- Name: pricing_days_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('pricing_days_id_seq', 6, true);


--
-- Data for Name: pricing_packages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY pricing_packages (id, created_at, updated_at, name, description, global_price, participant_commision, maximum_entry_allowed, features, is_active) FROM stdin;
1	2016-12-10 11:51:51	2016-12-10 11:51:51	Silver	Our Silver package includes a bigger prize, so you’ll have more designs to choose from.	140	5	24	Creative design for less Expect ~15 designs Basic designer prize Skilled phone, email and chat support 100% money-back guarantee	t
2	2016-12-10 13:01:10	2016-12-10 13:01:10	Gold	Attract great designers and get priority support	195	50	30	Your project will be shown to designers before silver projects	t
3	2016-12-10 13:02:37	2016-12-10 13:02:37	Bronze	Bronze	10	0	20	 	t
4	2016-12-10 13:04:39	2016-12-10 13:04:39	Platinum	Attract the best designers and receive one-on-one assistance	295	10	40	 	t
\.


--
-- Name: pricing_packages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('pricing_packages_id_seq', 4, true);


--
-- Data for Name: project_bid_invoice_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY project_bid_invoice_items (id, created_at, updated_at, project_bid_invoice_id, description, amount) FROM stdin;
\.


--
-- Name: project_bid_invoice_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('project_bid_invoice_items_id_seq', 1, true);


--
-- Data for Name: project_bid_invoices; Type: TABLE DATA; Schema: public; Owner: -
--

COPY project_bid_invoices (id, created_at, updated_at, project_id, bid_id, amount, site_fee, paid_on, pay_key, zazpay_pay_key, zazpay_payment_id, zazpay_gateway_id, zazpay_revised_amount, site_commission_from_employer, site_commission_from_freelancer, user_id, is_paid, payment_gateway_id, paypal_pay_key) FROM stdin;
\.


--
-- Name: project_bid_invoices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('project_bid_invoices_id_seq', 1, true);


--
-- Data for Name: project_bids; Type: TABLE DATA; Schema: public; Owner: -
--

COPY project_bids (id, created_at, updated_at, user_id, project_id, amount, duration, total_bid_amount, closed_date, is_closed, is_active, bidding_start_date, bidding_end_date, site_commission_from_employer, site_commission_from_freelancer, total_paid_amount, lowest_bid_amount, bid_count) FROM stdin;
\.


--
-- Name: project_bids_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('project_bids_id_seq', 10, true);


--
-- Data for Name: project_categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY project_categories (id, created_at, updated_at, name, project_count, is_active, active_project_count, icon_class) FROM stdin;
10	2011-07-27 12:29:01	2013-11-14 15:09:21	Data Entry	0	t	0	\N
11	2011-07-27 12:29:32	2013-11-14 11:27:38	Product Sourcing & Manufacturing	0	t	0	\N
13	2011-07-27 12:30:16	2013-11-14 13:35:40	Business, Accounting & Legal	0	t	0	\N
14	2011-07-27 12:30:41	2013-11-12 08:02:59	Customized	0	t	0	\N
9	2011-07-27 12:28:41	2017-04-28 07:40:34	Design	0	t	0	\N
12	2011-07-27 12:29:54	2017-04-29 07:47:08	Sales & Marketing	0	t	0	\N
8	2011-07-27 12:27:59	2017-04-29 07:47:08	Writing	0	t	0	\N
6	2011-07-27 12:26:55	2017-04-29 07:47:08	Websites IT & Software	0	t	0	\N
7	2011-07-27 12:27:23	2017-04-29 07:47:08	Mobile	0	t	0	\N
\.


--
-- Name: project_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('project_categories_id_seq', 14, true);


--
-- Data for Name: project_disputes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY project_disputes (id, created_at, updated_at, user_id, project_id, dispute_open_type_id, reason, dispute_status_id, resolved_date, favour_role_id, last_replied_user_id, last_replied_date, dispute_closed_type_id, message_count, expected_rating, bid_id) FROM stdin;
\.


--
-- Name: project_disputes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('project_disputes_id_seq', 1, false);


--
-- Data for Name: project_ranges; Type: TABLE DATA; Schema: public; Owner: -
--

COPY project_ranges (id, created_at, updated_at, name, min_amount, max_amount, is_active, project_count, active_project_count, user_id) FROM stdin;
3	2011-03-30 07:54:17	2017-04-28 07:42:27	Medium	500	2000	t	0	0	0
4	2017-04-29 06:48:11	2017-04-29 06:48:11	Custom Range	500	2000	f	0	0	2
1	2011-03-30 07:53:09	2017-04-29 07:47:08	Very Small	10	200	t	0	0	0
2	2011-03-30 07:53:41	2017-04-29 07:47:08	Small	200	500	t	0	0	0
\.


--
-- Name: project_ranges_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('project_ranges_id_seq', 4, true);


--
-- Data for Name: project_statuses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY project_statuses (id, created_at, updated_at, name, project_count, is_active) FROM stdin;
5	2011-03-29 10:55:22	2011-03-29 10:55:25	Bidding Expired	0	t
9	2011-03-29 10:55:22	2011-03-29 10:55:25	Bidding Closed	0	t
10	2011-03-29 10:55:22	2011-03-29 10:55:25	Employer Canceled	0	t
12	2011-03-29 10:55:22	2011-03-29 10:55:25	Mutually Canceled	0	t
13	2011-03-29 10:55:22	2011-03-29 10:55:25	Canceled By Admin	0	t
16	2011-03-29 10:55:22	2011-03-29 10:55:25	Closed	0	t
6	2011-03-29 10:55:22	2017-04-28 09:00:34	Winner Selected	0	t
11	2011-03-29 10:55:22	2017-04-28 09:01:37	Under Development	0	t
1	2011-03-29 10:55:22	2017-04-29 06:48:11	Draft	0	t
3	2011-03-29 10:55:22	2017-04-29 07:25:00	Pending For Approval	0	t
2	2011-03-29 10:55:22	2017-04-29 07:44:44	Payment Pending	0	t
4	2011-03-29 10:55:22	2017-04-29 07:47:08	Open For Bidding	0	t
15	2011-03-29 10:55:22	2017-04-29 09:01:06	Completed	0	t
14	2011-03-29 10:55:22	2017-04-29 09:01:41	Final Review Pending	0	t
\.


--
-- Name: project_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('project_statuses_id_seq', 17, true);


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: -
--

COPY projects (id, created_at, updated_at, user_id, project_status_id, project_range_id, name, slug, description, total_listing_fee, cancelled_date, ip_id, freelancer_user_id, bid_duration, is_featured, is_private, is_hidded_bid, is_pre_paid, is_urgent, is_active, is_dispute, is_cancel_request_freelancer, is_cancel_request_employer, funded_date, last_reopened_date, payment_completed_date, listing_fee, is_paid, is_reopened, zazpay_gateway_id, zazpay_payment_id, zazpay_pay_key, zazpay_revised_amount, is_notification_sent, project_type_id, site_commission_from_employer, site_commission_from_freelancer, total_paid_amount, additional_descriptions, mutual_cancel_note, project_rating_count, flag_count, message_count, follower_count, total_ratings, milestone_count, view_count, project_bid_invoice_count, payment_gateway_id, paypal_pay_key) FROM stdin;
\.


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('projects_id_seq', 10, true);


--
-- Data for Name: projects_project_categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY projects_project_categories (id, created_at, updated_at, project_category_id, project_id) FROM stdin;
\.


--
-- Name: projects_project_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('projects_project_categories_id_seq', 17, true);


--
-- Name: projects_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('projects_users_id_seq', 1, false);


--
-- Data for Name: provider_users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY provider_users (id, created_at, updated_at, user_id, provider_id, foreign_id, access_token, access_token_secret, is_connected, profile_picture_url) FROM stdin;
\.


--
-- Name: provider_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('provider_users_id_seq', 1, false);


--
-- Data for Name: providers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY providers (id, created_at, updated_at, name, slug, secret_key, api_key, icon_class, button_class, is_active, "position") FROM stdin;
1	2017-01-02 06:38:18	2017-01-02 06:38:18	Twitter	twitter	\N	\N	fa-twitter	btn-twitter	t	2
2	2017-01-02 06:38:18	2017-01-02 06:38:18	Facebook	facebook	\N	\N	fa-facebook	btn-facebook	t	2
3	2017-01-02 06:38:18	2017-01-02 06:38:18	Google	google	\N	\N	fa-google-plus	btn-google	t	3
\.


--
-- Name: providers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('providers_id_seq', 3, true);


--
-- Data for Name: publications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY publications (id, created_at, updated_at, user_id, title, publisher, description) FROM stdin;
\.


--
-- Name: publications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('publications_id_seq', 2, true);


--
-- Data for Name: question_answer_options; Type: TABLE DATA; Schema: public; Owner: -
--

COPY question_answer_options (id, created_at, updated_at, question_id, option, is_correct_answer) FROM stdin;
\.


--
-- Name: question_answer_options_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('question_answer_options_id_seq', 1117, true);


--
-- Data for Name: question_categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY question_categories (id, created_at, updated_at, name, question_count) FROM stdin;
1	2009-11-04 13:27:07	2010-02-15 02:50:40	PHP	0
2	2009-11-04 13:27:20	2009-11-04 13:27:20	JAVA	0
3	2009-11-04 13:27:32	2009-11-04 13:27:32	Ajax	0
4	2009-11-04 13:27:43	2009-11-04 13:27:43	MySQL	0
5	2009-11-04 13:27:56	2009-11-04 13:27:56	General	0
6	2009-11-04 13:28:22	2009-11-04 13:28:22	CSS	0
7	2009-11-04 13:28:36	2009-11-04 13:28:36	.Net	0
8	2009-11-04 13:28:57	2009-11-04 13:28:57	Javascript	0
10	2009-11-04 13:29:20	2009-11-04 13:29:20	JQuery	0
13	2009-11-13 10:14:30	2009-11-13 10:14:30	English	0
14	2009-11-13 10:56:31	2009-11-13 10:56:31	Aptitude	0
15	2009-11-13 11:11:32	2009-11-13 11:11:32	HTML & Javascript	0
16	2010-02-19 10:14:41	2010-02-19 10:14:41	General & Technical	0
17	2010-03-04 07:52:25	2010-03-04 07:52:25	Technical	0
18	2010-04-05 06:04:34	2010-04-05 06:04:34	HTML	0
19	2010-05-10 10:08:01	2010-05-10 10:08:01	Flash	0
20	2010-06-09 11:43:25	2010-06-09 11:43:25	CakePHP	0
21	2015-04-16 07:43:00	2015-04-16 07:43:00	General Attitude	0
23	2015-04-16 16:10:31	2015-04-16 16:10:31	Design	0
24	2016-01-21 12:42:50	2016-01-21 12:42:50	C++	0
25	2016-01-21 12:43:56	2016-01-21 12:43:56	Computer Networking	0
26	2016-01-21 12:44:57	2016-01-21 12:44:57	DBMS and Design	0
27	2016-01-21 12:45:29	2016-01-21 12:45:29	MS-DOS	0
28	2016-01-21 12:45:49	2016-01-21 12:45:49	MS-WORD	0
29	2016-01-21 12:46:08	2016-01-21 12:46:08	MS-PowerPoint	0
30	2016-01-21 12:46:39	2016-01-21 12:46:39	JDBC	0
\.


--
-- Name: question_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('question_categories_id_seq', 31, true);


--
-- Data for Name: question_display_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY question_display_types (id, created_at, updated_at, name) FROM stdin;
1	2009-11-02 14:40:23	2009-11-02 14:40:23	All Questions Listing in Single Page
2	2016-01-02 14:40:23	2016-01-02 14:40:23	Question Displaying in Silder View
\.


--
-- Name: question_display_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('question_display_types_id_seq', 2, true);


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY questions (id, created_at, updated_at, question_category_id, question, info_tip, is_active, exams_question_count) FROM stdin;
1	2016-01-21 12:51:32	2016-01-21 12:51:58	24	What is the correct value to return to the operating system upon the successful completion of a program?		t	1
2	2016-01-21 12:54:06	2016-01-21 12:54:06	24	What is the only function all C++ programs must contain?		t	1
3	2016-01-21 12:56:39	2016-01-21 12:56:39	24	What punctuation is used to signal the beginning and end of code blocks?		t	1
4	2016-01-21 13:00:22	2016-01-21 13:00:22	24	What punctuation ends most lines of C++ code?		t	1
5	2016-01-21 13:02:26	2016-01-21 13:02:26	24	Which of the following is a correct comment?		t	1
6	2016-01-21 13:03:56	2016-01-21 13:03:56	24	Which of the following is not a correct variable type?		t	1
7	2016-01-21 13:36:31	2016-01-21 13:36:31	24	Which of the following is the correct operator to compare two variables?		t	1
8	2016-01-21 13:38:15	2016-01-21 13:38:15	24	Which of the following is true?		t	1
9	2016-01-21 13:39:32	2016-01-21 13:39:32	24	Which of the following is the boolean operator for logical-and?		t	1
10	2016-01-21 13:41:51	2016-01-21 13:41:51	24	Evaluate !(1 && !(0 || 1)).		t	1
11	2016-01-21 13:43:31	2016-01-21 13:43:31	24	Identify the correct statement		t	1
12	2016-01-21 13:44:34	2016-01-21 13:44:34	24	The directives for the preprocessors begin with		t	1
13	2016-01-21 13:46:11	2016-01-21 13:46:11	24	The file iostream includes?		t	1
14	2016-01-21 13:48:51	2016-01-21 13:48:51	24	There is a unique function in C++ program by where all C++ programs start their execution?		t	1
15	2016-01-21 13:49:55	2016-01-21 13:49:55	24	Every function in C++ are followed by		t	1
16	2016-01-21 13:51:02	2016-01-21 13:51:02	24	Which of the following is false?		t	1
17	2016-01-21 13:51:57	2016-01-21 13:51:57	24	Every statement in C++ program should end with?		t	1
18	2016-01-21 13:53:04	2016-01-21 13:53:04	24	Which of the following statement is true about preprocessor directives?		t	1
19	2016-01-21 13:53:57	2016-01-21 13:53:57	24	A block comment can be written by		t	1
20	2016-01-21 13:56:58	2016-01-21 13:56:58	24	When writing comments you can		t	1
21	2016-01-21 13:58:25	2016-01-21 13:58:25	24	A variable is/are		t	1
22	2016-01-21 13:59:45	2016-01-21 13:59:45	24	Which of the following can not be used as identifiers?		t	1
23	2016-01-21 14:00:43	2016-01-21 14:00:43	24	Which of the following identifiers is invalid?		t	1
24	2016-01-21 14:01:28	2016-01-21 14:01:28	24	Which of the following can not be used as valid identifier?		t	1
25	2016-01-21 14:02:22	2016-01-21 14:02:22	24	The difference between x and ‘x’ is		t	1
26	2016-01-21 14:03:21	2016-01-21 14:03:21	24	Which of the following is not a valid escape code?		t	1
27	2016-01-21 14:04:11	2016-01-21 14:04:11	24	Which of the following statement is true?		t	1
28	2016-01-21 14:05:05	2016-01-21 14:05:05	24	Regarding #difine which of the following statement is false?		t	1
29	2016-01-21 14:06:07	2016-01-21 14:06:07	24	Regarding following statement  which of the statements is true?\\r\\nconst int pathwidth=100;		t	1
30	2016-01-21 14:07:02	2016-01-21 14:07:02	24	In an assignment statement		t	1
40	2016-01-21 14:23:14	2016-01-21 14:23:14	25	What is the number of separate protocol layers at the serial interface gateway specified by the X.25 standard?		t	1
39	2016-01-21 14:21:33	2016-01-21 14:21:33	25	Which of the following might be used by a company to satisfy its growing communications needs?		t	1
38	2016-01-21 14:20:20	2016-01-21 14:20:20	25	Which of the following communication modes support two-way traffic but in only one direction at a time?		t	1
37	2016-01-21 14:18:57	2016-01-21 14:18:57	25	The x.25 standard specifies a 		t	1
36	2016-01-21 14:16:02	2016-01-21 14:16:02	25	Layer one of the OSI model is		t	1
35	2016-01-21 14:14:09	2016-01-21 14:14:09	25	How many OSI layers are covered in the X.25 standard?		t	1
34	2016-01-21 14:12:43	2016-01-21 14:12:43	25	The process of converting analog signals into digital signals so they can be processed by a receiving computer is referred to as:		t	1
33	2016-01-21 14:11:38	2016-01-21 14:11:38	25	Which of the following performs modulation and demodulation?		t	1
41	2016-01-21 14:25:30	2016-01-21 14:25:30	25	The interactive transmission of data within a time sharing system may be best suited to ?		t	1
42	2016-01-21 14:27:21	2016-01-21 14:27:21	25	Which of the following statement is incorrect?		t	1
43	2016-01-21 14:28:19	2016-01-21 14:28:19	25	Which of hte following is considered a broad band communication channel?		t	1
44	2016-01-21 14:29:06	2016-01-21 14:29:06	25	Which of the following is not a transmission medium?		t	1
45	2016-01-21 14:29:59	2016-01-21 14:29:59	25	Which of the following does not allow multiple uses or devices to share one communication line?		t	1
46	2016-01-21 14:30:55	2016-01-21 14:30:55	25	Which of the following signal is not standard RS-232-C signal?		t	1
47	2016-01-21 14:32:10	2016-01-21 14:32:10	25	Which of the following statement is incorrect?		t	1
48	2016-01-21 14:33:16	2016-01-21 14:33:16	25	Which of the following is an advantage to using fiber optics data transmission?		t	1
49	2016-01-21 14:34:25	2016-01-21 14:34:25	25	Which of the following is required to communicate between two computers?		t	1
50	2016-01-21 14:35:14	2016-01-21 14:35:14	25	The transmission signal coding method of TI carrier is called		t	1
51	2016-01-21 14:36:39	2016-01-21 14:36:39	25	Which data communication method is used to transmit the data over a serial communication link?		t	1
52	2016-01-21 14:38:04	2016-01-21 14:38:04	25	What is the minimum number of wires needed to send data over a serial communication link layer?		t	1
53	2016-01-21 14:39:52	2016-01-21 14:39:52	25	Which of the following types of channels moves data relatively slowly?		t	1
54	2016-01-21 14:41:04	2016-01-21 14:41:04	25	Most data communications involving telegraph lines use:\\r\\n\\r\\n		t	1
55	2016-01-21 14:42:17	2016-01-21 14:42:17	25	communications device that combines transmissions from several I/O devices into one line is a 		t	1
56	2016-01-21 14:43:42	2016-01-21 14:43:42	25	How much power (roughly) a light emitting diode can couple into an optical fiber?		t	1
57	2016-01-21 14:45:02	2016-01-21 14:45:02	25	The synchronous modems are more costly than the asynchronous modems because		t	1
58	2016-01-21 14:46:11	2016-01-21 14:46:11	25	Which of the following statement is correct?		t	1
59	2016-01-21 14:47:16	2016-01-21 14:47:16	25	In a synchronous modem, the digital-to-analog converter transmits signal to the 		t	1
60	2016-01-21 14:49:10	2016-01-21 14:49:10	25	Which of the following communications lines is best suited to interactive processing applications?		t	1
61	2016-01-21 14:51:33	2016-01-21 14:51:33	26	The ascending order of a data hirerchy is:		t	1
62	2016-01-21 14:53:12	2016-01-21 14:53:12	26	Which of the following is true of a network structure?		t	1
63	2016-01-21 14:54:54	2016-01-21 14:54:54	26	Which of the following is a problem of file management system?		t	1
64	2016-01-21 14:56:34	2016-01-21 14:56:34	26	One data dictionery software package is called		t	1
65	2016-01-21 14:57:41	2016-01-21 14:57:41	26	The function of a database is ...		t	1
66	2016-01-21 14:58:51	2016-01-21 14:58:51	26	What is the language used by most of the DBMSs for helping their users to access data?		t	1
67	2016-01-21 14:59:51	2016-01-21 14:59:51	26	The model for a record management system might be		t	1
68	2016-01-21 15:01:11	2016-01-21 15:01:11	26	Primitive operations common to all record management system include		t	1
69	2016-01-21 15:02:07	2016-01-21 15:02:07	26	In a large DBMS		t	1
70	2016-01-21 15:03:14	2016-01-21 15:03:14	26	Information can be transferred between the DBMS and a		t	1
71	2016-01-21 15:04:23	2016-01-21 15:04:23	26	Which of the following fields in a student file can be used as a primary key?		t	1
72	2016-01-21 15:05:40	2016-01-21 15:05:40	26	Which of the following is not an advantage of the database approach		t	1
73	2016-01-21 15:07:30	2016-01-21 15:07:30	26	Which of the following contains a complete record of all activity that affected the contents of a database during a certain period of time?		t	1
74	2016-01-21 15:08:50	2016-01-21 15:08:50	26	In the DBMS approach, application programs perform the 		t	1
75	2016-01-21 15:09:53	2016-01-21 15:09:53	26	A set of programs that handle a firm's database responsibilities is called		t	1
76	2016-01-21 15:11:27	2016-01-21 15:11:27	26	Which is the make given to the database management system which is able to handle full text data, image data, audio and video?		t	1
77	2016-01-21 15:12:25	2016-01-21 15:12:25	26	A record management system		t	1
78	2016-01-21 15:13:08	2016-01-21 15:13:08	26	A command that lets you change one or more fields in a record is		t	1
79	2016-01-21 15:14:01	2016-01-21 15:14:01	26	A transparent DBMS		t	1
80	2016-01-21 15:15:02	2016-01-21 15:15:02	26	A file produced by a spreadsheet 		t	1
81	2016-01-21 15:16:30	2016-01-21 15:16:30	26	Which of the following is not true of the traditional approach to information processing		t	1
82	2016-01-21 15:18:22	2016-01-21 15:18:22	26	Which of the following hardware component is the most important to the operation of database management system?		t	1
83	2016-01-21 15:19:36	2016-01-21 15:19:36	26	Generalized database management system do not retrieve data to meet routine request		t	1
84	2016-01-21 15:22:29	2016-01-21 15:22:29	26	Batch processing is appropriate if		t	1
85	2016-01-21 15:23:18	2016-01-21 15:23:18	26	Large collection of files are called		t	1
86	2016-01-21 15:24:08	2016-01-21 15:24:08	26	Which of the following is not a relational database?		t	1
87	2016-01-21 15:25:13	2016-01-21 15:25:13	26	In order to use a record management system		t	1
88	2016-01-21 15:26:18	2016-01-21 15:26:18	26	Sort/Report generators		t	1
89	2016-01-21 15:28:04	2016-01-21 15:28:04	26	If a piece of data is stored in two places in the database, then 		t	1
90	2016-01-21 15:29:21	2016-01-21 15:29:21	26	An audit trail		t	1
91	2016-01-21 15:31:28	2016-01-21 15:31:28	1	A script is a		t	1
92	2016-01-21 15:32:12	2016-01-21 15:32:12	1	When compared to the compiled program, scripts run		t	1
93	2016-01-21 15:34:10	2016-01-21 15:34:10	1	PHP is a widely used ……………. scripting language that is especially suited for web development and can be embedded into html		t	1
94	2016-01-21 15:35:13	2016-01-21 15:35:13	1	Which of the following is not true?		t	1
95	2016-01-21 15:36:54	2016-01-21 15:36:54	1	Which of the following variables is not a predefined variable?		t	1
96	2016-01-21 15:37:57	2016-01-21 15:37:57	1	You can define a constant by using the define() function. Once a constant is defined		t	1
97	2016-01-21 15:38:55	2016-01-21 15:38:55	1	The following piece of script will output:\\r\\n<?\\r\\n$email=’admin@psexam.com’;\\r\\n$new=strstr($email, ‘@&rsquoWink;\\r\\nprint $new;\\r\\n?>		t	1
98	2016-01-21 15:39:53	2016-01-21 15:39:53	1	Which of the following function returns the number of characters in a string variable?		t	1
99	2016-01-21 15:40:45	2016-01-21 15:40:45	1	When you need to obtain the ASCII value of a character which of the following function you apply in PHP?		t	1
100	2016-01-21 15:41:47	2016-01-21 15:41:47	1	A variable $word is set to “HELLO WORLD”, which of the following script returns in title case?		t	1
101	2016-01-21 15:43:02	2016-01-21 15:43:02	1	In mail($param2, $param2, $param3, $param4), the $param2 contains:		t	1
102	2016-01-21 15:45:05	2016-01-21 15:45:05	1	Study following steps and determine the correct order\\r\\n(1)   Open a connection to MySql server\\r\\n(2)   Execute the SQL query\\r\\n(3)   Fetch the data from query\\r\\n(4)   Select database\\r\\n(5)   Close Connection		t	1
103	2016-01-21 15:45:55	2016-01-21 15:45:55	1	Which of the following is not a session function?		t	1
104	2016-01-21 15:46:47	2016-01-21 15:46:47	1	When uploading a file if the UPLOAD_ERR-OK contains value 0 it means		t	1
105	2016-01-21 15:47:53	2016-01-21 15:47:53	1	Which of the following delimiter syntax is PHP's default delimiter syntax		t	1
106	2016-01-21 15:49:02	2016-01-21 15:49:02	1	Which of the following statement produce different output		t	1
107	2016-01-21 15:52:51	2016-01-21 15:52:51	1	Php supports all four different ways of delimiting. In this context identify the false statement		t	1
108	2016-01-21 15:53:45	2016-01-21 15:53:45	1	Which of following function return 1 when output is successful?		t	1
109	2016-01-21 15:54:35	2016-01-21 15:54:35	1	Which of the following data type is not seal or datetype supported by PHP		t	1
110	2016-01-21 15:55:30	2016-01-21 15:55:30	1	For integer data type PHP 6 introduced		t	1
111	2016-01-22 05:52:29	2016-01-22 05:52:29	1	Trace the odd data type		t	1
112	2016-01-22 05:54:55	2016-01-22 05:54:55	1	Which of the folowing are valid float values?		t	1
113	2016-01-22 05:57:46	2016-01-22 05:57:46	1	Which datatypes are treaded as arrays		t	1
114	2016-01-22 05:58:46	2016-01-22 05:58:46	1	Casting operator introduced in PHP 6 is		t	1
115	2016-01-22 05:59:58	2016-01-22 05:59:58	1	When defining identifier in PHP you should remember that		t	1
116	2016-01-22 06:01:03	2016-01-22 06:01:03	1	Identify the invalid identifier		t	1
117	2016-01-22 06:02:07	2016-01-22 06:02:07	1	Identify the variable scope that is not supported by PHP		t	1
118	2016-01-22 06:03:12	2016-01-22 06:03:12	1	The output of ofllowing script would be\\r\\n\\r\\n$somerar=15;\\r\\n\\r\\nfunction ad it () {\\r\\n\\r\\nGLOBAL $somevar;\\r\\n\\r\\n$somerar++ ;\\r\\n\\r\\necho "somerar is $somerar";\\r\\n\\r\\n}\\r\\n\\r\\naddit ();		t	1
119	2016-01-22 06:04:03	2016-01-22 06:04:03	1	The left associative dot operator (.) is used in PHP for		t	1
120	2016-01-22 06:05:28	2016-01-22 06:05:28	1	Trace the false statement		t	1
121	2016-01-22 06:07:31	2016-01-22 06:07:31	27	In MS-Dos 6.22, which part identifies the product uniquely		t	1
122	2016-01-22 06:08:32	2016-01-22 06:08:32	27	In Ms-Dos what command you will use to display system date?		t	1
123	2016-01-22 06:09:25	2016-01-22 06:09:25	27	While working with Ms-Dos which command transfers a specific file from one disk to another?		t	1
124	2016-01-22 06:10:21	2016-01-22 06:10:21	27	If you don’t know the current time, which command will you use to display		t	1
125	2016-01-22 06:11:20	2016-01-22 06:11:20	27	Which command divides the surface of the blank disk into sectors and assign a unique address to each one		t	1
126	2016-01-22 06:12:07	2016-01-22 06:12:07	27	Each time you turn on your computer, it will check on the control file		t	1
127	2016-01-22 06:12:50	2016-01-22 06:12:50	27	If you need to duplicate the entire disk, which command will you use?		t	1
128	2016-01-22 06:13:30	2016-01-22 06:13:30	27	Which of the following extensions suggest that the file is a backup copy		t	1
129	2016-01-22 06:14:16	2016-01-22 06:14:16	27	Which command lists the contents of current directory of a disk		t	1
130	2016-01-22 06:15:06	2016-01-22 06:15:06	27	Only filenames and extensions are to be displayed in wide format, which command you’ll use?		t	1
131	2016-01-22 06:16:37	2016-01-22 06:16:37	27	Which command displays all the files having the same name but different extensions?		t	1
132	2016-01-22 06:17:32	2016-01-22 06:17:32	27	Which command displays only file and directory names without size, date and time information?		t	1
133	2016-01-22 06:18:16	2016-01-22 06:18:16	27	Which command displays comma for thousand separating on file size while listing?		t	1
134	2016-01-22 06:19:09	2016-01-22 06:19:09	27	Which command is used to display all the files having the (.exe) extension but different filename?		t	1
135	2016-01-22 06:20:00	2016-01-22 06:20:00	27	Which command should be used to display all files within the specified subordinate directory of the subdirectory?		t	1
136	2016-01-22 06:20:46	2016-01-22 06:20:46	27	Which command displays the directory list including files in tree structure?		t	1
137	2016-01-22 06:22:01	2016-01-22 06:22:01	27	Which command will be used to display a file within the specified directory of pathname?		t	1
138	2016-01-22 06:22:47	2016-01-22 06:22:47	27	Which command creates a directory or subdirectory?		t	1
139	2016-01-22 06:23:38	2016-01-22 06:23:38	27	Which command displays current directory name or change from one to another?		t	1
140	2016-01-22 06:24:36	2016-01-22 06:24:36	27	Which command is used to delete the directory that is empty?		t	1
142	2016-01-22 06:27:00	2016-01-22 06:27:00	27	In which year the first operating system was developed		t	1
143	2016-01-22 06:27:41	2016-01-22 06:27:41	27	MS-DOS developed in		t	1
144	2016-01-22 06:28:37	2016-01-22 06:28:37	27	Maximum length of DOS command using any optional parameter is		t	1
145	2016-01-22 06:30:42	2016-01-22 06:30:42	27	Which keys can be pressed quit without saving in DOS		t	1
146	2016-01-22 06:31:44	2016-01-22 06:31:44	27	CHKDSK command is used to		t	1
147	2016-01-22 06:32:34	2016-01-22 06:32:34	27	Which file is the batch file that is read while booting a computer?		t	1
148	2016-01-22 06:33:41	2016-01-22 06:33:41	27	Which command is used to backup in DOS 6+ Version		t	1
149	2016-01-22 06:35:03	2016-01-22 06:35:03	27	Copy and Xcopy are same in the sense		t	1
150	2016-01-22 06:37:03	2016-01-22 06:37:03	27	Which command be used to clear the screen and display the operating system prompt on the first line of the display?		t	1
151	2016-01-22 06:39:18	2016-01-22 06:39:18	28	Which of the following is not valid version of MS Office?		t	1
152	2016-01-22 06:40:13	2016-01-22 06:40:13	28	You cannot close MS Word application by		t	1
153	2016-01-22 06:41:08	2016-01-22 06:41:08	28	The key F12 opens a		t	1
154	2016-01-22 06:42:41	2016-01-22 06:42:41	28	What is the short cut key to open the Open dialog box?		t	1
155	2016-01-22 06:43:42	2016-01-22 06:43:42	28	A feature of MS Word that saves the document automatically after certain interval is available on		t	1
156	2016-01-22 06:44:54	2016-01-22 06:44:54	28	Where can you find the horizontal split bar on MS Word screen?		t	1
157	2016-01-22 06:46:42	2016-01-22 06:46:42	28	Which of the following is not available on the Ruler of MS Word screen?		t	1
158	2016-01-22 06:49:48	2016-01-22 06:49:48	28	What is place to the left of horizontal scroll bar?		t	1
159	2016-01-22 06:51:18	2016-01-22 06:51:18	28	Which file starts MS Word?		t	1
160	2016-01-22 06:52:08	2016-01-22 06:52:08	28	How many ways you can save a document?		t	1
161	2016-01-22 06:54:04	2016-01-22 06:54:04	28	Pressing F8 key for three times selects		t	1
162	2016-01-22 06:54:57	2016-01-22 06:54:57	28	What happens if you press Ctrl + Shift + F8?		t	1
163	2016-01-22 06:55:53	2016-01-22 06:55:53	28	How can you disable extended selection mode?		t	1
164	2016-01-22 06:56:53	2016-01-22 06:56:53	28	What does EXT indicator on status bar of MS Word indicate?		t	1
165	2016-01-22 06:57:49	2016-01-22 06:57:49	28	What is the maximum number of lines you can set for a drop cap?		t	1
166	2016-01-22 06:58:53	2016-01-22 06:58:53	28	What is the default number of lines to drop for drop cap?		t	1
167	2016-01-22 06:59:59	2016-01-22 06:59:59	28	What is the shortcut key you can press to create a copyright symbol?		t	1
168	2016-01-22 07:00:37	2016-01-22 07:00:37	28	How many columns can you insert in a word document in maximum?		t	1
169	2016-01-22 07:01:20	2016-01-22 07:01:20	28	What is the smallest and largest font size available in Font Size tool on formatting toolbar?		t	1
170	2016-01-22 07:02:40	2016-01-22 07:02:40	28	What is the maximum font size you can apply for any character?		t	1
171	2016-01-22 07:03:34	2016-01-22 07:03:34	28	What happens when you click on Insert >> Picture >> Clip Art		t	1
172	2016-01-22 07:04:51	2016-01-22 07:04:51	28	Which option is not available in Insert Table Autofit behavior?		t	1
173	2016-01-22 07:05:51	2016-01-22 07:05:51	28	To autofit the width of column		t	1
174	2016-01-22 07:06:41	2016-01-22 07:06:41	28	From which menu you can insert Header and Footer?		t	1
175	2016-01-22 07:07:34	2016-01-22 07:07:34	28	After typing header text, how can you quickly enter footer text?		t	1
176	2016-01-22 07:08:34	2016-01-22 07:08:34	28	When inserting Page number in footer it appeared 1 but you wish to show a. How can you do that?		t	1
177	2016-01-22 07:09:50	2016-01-22 07:09:50	28	Which of the following statement is false?		t	1
178	2016-01-22 07:10:52	2016-01-22 07:10:52	28	Where can you change the vertical alignment?		t	1
179	2016-01-22 07:11:48	2016-01-22 07:11:48	28	To get to the ‘Symbol’ dialog box, click on the ______ menu and choose ‘Symbol’.		t	1
239	2016-01-22 10:56:57	2016-01-22 10:56:57	18	Most search engines give serious importance to meta tags when ranking websites in their listings?		t	1
180	2016-01-22 07:13:00	2016-01-22 07:13:00	28	Which of the following symbol sets would be most likely to contain a mathematical symbol such as a degree sign, greater than or equal to, or a Greek letter?		t	1
181	2016-01-22 07:19:23	2016-01-22 07:19:23	29	Which file format can be added to a PowerPoint show?		t	1
182	2016-01-22 07:20:46	2016-01-22 07:20:46	29	In Microsoft PowerPoint two kind of sound effects files that can be added to the presentation are		t	1
183	2016-01-22 07:22:05	2016-01-22 07:22:05	29	Material consisting of text and numbers is best presented as		t	1
184	2016-01-22 07:22:54	2016-01-22 07:22:54	29	What is a motion path?		t	1
185	2016-01-22 07:23:41	2016-01-22 07:23:41	29	What is a slide-title master pair?		t	1
186	2016-01-22 07:24:27	2016-01-22 07:24:27	29	Which of the following should you use if you want all the slide in the presentation to have the same “look”?		t	1
187	2016-01-22 07:25:21	2016-01-22 07:25:21	29	in the context of animations, what is a trigger?		t	1
188	2016-01-22 07:26:23	2016-01-22 07:26:23	29	If you have a PowerPoint show you created and want to send using email to another teacher you can add the show to your email message as a (an)		t	1
189	2016-01-22 07:27:10	2016-01-22 07:27:10	29	In order to edit a chart, you can		t	1
190	2016-01-22 07:28:24	2016-01-22 07:28:24	29	To exit the PowerPoint		t	1
191	2016-01-22 07:29:34	2016-01-22 07:29:34	29	Which option on the custom animation task pane allows you to apply a preset or custom motion path?		t	1
192	2016-01-22 07:30:21	2016-01-22 07:30:21	29	What is the term used when a clip art image changes the direction of faces?		t	1
193	2016-01-22 07:31:34	2016-01-22 07:31:34	29	The slide that is used to introduce a topic and set the tone for the presentation is called the		t	1
194	2016-01-22 07:32:22	2016-01-22 07:32:22	29	Which of the following features should you use when typing in the notes text box?		t	1
195	2016-01-22 07:33:11	2016-01-22 07:33:11	29	Which option allows you to select line, curve, freeform or scribble tools?		t	1
196	2016-01-22 07:34:01	2016-01-22 07:34:01	29	Which of the following should be used when you want to add a slide to an existing presentation?		t	1
197	2016-01-22 07:34:50	2016-01-22 07:34:50	29	The size of the organization chart object		t	1
198	2016-01-22 07:35:54	2016-01-22 07:35:54	29	which of the following is the default page setup orientation of slide in PowerPoint		t	1
199	2016-01-22 07:36:43	2016-01-22 07:36:43	29	Want a PowerPoint photo album slide show to play continuously?		t	1
200	2016-01-22 07:37:26	2016-01-22 07:37:26	29	what is defined by the handout master?		t	1
201	2016-01-22 07:42:47	2016-01-22 07:42:47	29	To select all of the boxes of an organization chart		t	1
202	2016-01-22 07:43:28	2016-01-22 07:43:28	29	You can show the shortcut menu during the slide show by		t	1
203	2016-01-22 07:44:37	2016-01-22 07:44:37	29	Auto clipart is a feature that		t	1
204	2016-01-22 07:45:34	2016-01-22 07:45:34	29	To edit the text within the boxes of an organization chart, you		t	1
205	2016-01-22 07:46:53	2016-01-22 07:46:53	29	Whidh of the following allow you to select more than one slide in a presentation?		t	1
206	2016-01-22 07:47:37	2016-01-22 07:47:37	29	The view that displays the slides on a presentation as miniature representations of the slides is called		t	1
207	2016-01-22 07:48:25	2016-01-22 07:48:25	29	The PowerPoint view that displays only text (title and bullets) is		t	1
208	2016-01-22 07:49:59	2016-01-22 07:49:59	29	In Microsoft PowerPoint the entry effect as one slide replaces another in a show is called a (an)		t	1
209	2016-01-22 07:50:57	2016-01-22 07:50:57	29	Which of the following presentation elements can you modify using the slide master?		t	1
210	2016-01-22 07:52:09	2016-01-22 07:52:09	29	Which of the following provides a printed copy of your presentation?		t	1
211	2016-01-22 07:54:37	2016-01-22 07:54:37	18	Is it possible to set up a browser so it refuse pages that does not have a content rating meta tag?		t	1
212	2016-01-22 10:56:57	2016-01-22 10:56:57	18	When images are used as links they get a blue border.		t	1
213	2016-01-22 10:56:57	2016-01-22 10:56:57	18	A 6 digit Hex color (#FF9966) defines values of Red, Blue and Green in which order?		t	1
214	2016-01-22 10:56:57	2016-01-22 10:56:57	18	When you count to 15 using hexadecimal numbers, the highest number is what?		t	1
215	2016-01-22 10:56:57	2016-01-22 10:56:57	18	The <small> and <big> tags are special in what way?		t	1
216	2016-01-22 10:56:57	2016-01-22 10:56:57	18	What does vlink mean ?		t	1
217	2016-01-22 10:56:57	2016-01-22 10:56:57	18	Banners, buttons, dividers, clipart and other simple images usually work best as?		t	1
218	2016-01-22 10:56:57	2016-01-22 10:56:57	18	Which format usually works best for photos?		t	1
219	2016-01-22 10:56:57	2016-01-22 10:56:57	18	<a> and </a> are the tags used for?		t	1
220	2016-01-22 10:56:57	2016-01-22 10:56:57	18	What does the GENERATOR meta tag tell?		t	1
221	2016-01-22 10:56:57	2016-01-22 10:56:57	18	What tag is used to add columns to tables?		t	1
222	2016-01-22 10:56:57	2016-01-22 10:56:57	18	Use<td> and </td>to add what to your tables?		t	1
223	2016-01-22 10:56:57	2016-01-22 10:56:57	18	What is the REFRESH meta tag used for?		t	1
224	2016-01-22 10:56:57	2016-01-22 10:56:57	18	Screen colors are defined by which colors?		t	1
225	2016-01-22 10:56:57	2016-01-22 10:56:57	18	What tag can prevent sites with adult content from being seen on MSIEbrowsers?		t	1
226	2016-01-22 10:56:57	2016-01-22 10:56:57	18	To specify a font for your whole page add which tag?		t	1
227	2016-01-22 10:56:57	2016-01-22 10:56:57	18	Increasing the cellpadding value will what?		t	1
228	2016-01-22 10:56:57	2016-01-22 10:56:57	18	Which has higher priority, cell settings or table settings?		t	1
229	2016-01-22 10:56:57	2016-01-22 10:56:57	18	To change the size of an image in HTML use what?		t	1
230	2016-01-22 10:56:57	2016-01-22 10:56:57	18	Hex-colors are the only way to define colors on the web?		t	1
231	2016-01-22 10:56:57	2016-01-22 10:56:57	18	What does HTML stand for?		t	1
232	2016-01-22 10:56:57	2016-01-22 10:56:57	18	What is the correct HTML for adding a background color?		t	1
233	2016-01-22 10:56:57	2016-01-22 10:56:57	18	To make the appearance of the colors more powerful on your site do which of the following?		t	1
234	2016-01-22 10:56:57	2016-01-22 10:56:57	18	If the background image is smaller than the screen, what will happen?		t	1
235	2016-01-22 10:56:57	2016-01-22 10:56:57	18	HTML defines colors using hexidecimal values, while graphics programs most often use what?		t	1
236	2016-01-22 10:56:57	2016-01-22 10:56:57	18	The <title> tag belongs where in your HTML?		t	1
237	2016-01-22 10:56:57	2016-01-22 10:56:57	18	If you don		t	1
238	2016-01-22 10:56:57	2016-01-22 10:56:57	18	How can you make a list that lists the items with numbers?		t	1
240	2016-01-22 10:56:57	2016-01-22 10:56:57	18	Which colors consist of equal amounts of all basic colors?		t	1
241	2016-01-22 10:56:57	2016-01-22 10:56:57	30	How many transaction isolation levels are defined in java.sql.Connection interface?		t	1
242	2016-01-22 10:56:57	2016-01-22 10:56:57	30	Which packages contain the JDBC classes?		t	1
243	2016-01-22 10:56:57	2016-01-22 10:56:57	30	Which type of driver provides JDBC access via one or more ODBC drivers?		t	1
244	2016-01-22 10:56:57	2016-01-22 10:56:57	30	Which type of driver converts JDBC calls into the network protocol used by the database nagement system directly?		t	1
245	2016-01-22 10:56:57	2016-01-22 10:56:57	30	Which type of Statement can execute parameterized queries?		t	1
246	2016-01-22 10:56:57	2016-01-22 10:56:57	30	How can you retrieve information from a ResultSet?		t	1
247	2016-01-22 10:56:57	2016-01-22 10:56:57	30	How can you execute DML statements (i.e. insert, delete, update) in the database?		t	1
248	2016-01-22 10:56:57	2016-01-22 10:56:57	30	How do you know in your Java program that a SQL warning is generated as a result of executing a SQL statement in\\nthe database?		t	1
249	2016-01-22 10:56:57	2016-01-22 10:56:57	30	What is, in terms of JDBC, a DataSource?		t	1
250	2016-01-22 10:56:57	2016-01-22 10:56:57	30	What is the meaning of ResultSet.TYPE_SCROLL_INSENSITIVE		t	1
251	2016-01-22 10:56:57	2016-01-22 10:56:57	30	Are ResultSets updateable?		t	1
252	2016-01-22 10:56:57	2016-01-22 10:56:57	30	What is the disadvantage of Type-4 Native-Protocol Driver?		t	1
253	2016-01-22 10:56:57	2016-01-22 10:56:57	30	How can you start a database transaction in the database?		t	1
254	2016-01-22 10:56:57	2016-01-22 10:56:57	30	What is the meaning of the transaction isolation level TRANSACTION_REPEATABLE_READ		t	1
255	2016-01-22 10:56:57	2016-01-22 10:56:57	30	The class java.sql.Timestamp has its super class as		t	1
256	2016-01-22 10:56:57	2016-01-22 10:56:57	30	How can you execute a stored procedure in the database?		t	1
257	2016-01-22 10:56:57	2016-01-22 10:56:57	30	What happens if you call the method close() on a ResultSet object?		t	1
258	2016-01-22 10:56:57	2016-01-22 10:56:57	30	What happens if you call deleteRow() on a ResultSet object?		t	1
259	2016-01-22 10:56:57	2016-01-22 10:56:57	30	All raw data types (including binary documents or images) should be read and uploaded to the database as an array of		t	1
260	2016-01-22 10:56:57	2016-01-22 10:56:57	30	What is correct about DDL statements (create, grant,...)?		t	1
261	2016-01-22 10:56:57	2016-01-22 10:56:57	30	The JDBC-ODBC Bridge supports multiple concurrent open statements per connection?		t	1
262	2016-01-22 10:56:57	2016-01-22 10:56:57	30	Which of the following allows non repeatable read in JDBC Connection?		t	1
263	2016-01-22 10:56:57	2016-01-22 10:56:57	30	Which of the following statements is false as far as different type of statements is concern in JDBC?		t	1
264	2016-01-22 10:56:57	2016-01-22 10:56:57	30	Which of the following methods are needed for loading a database driver in JDBC?		t	1
265	2016-01-22 10:56:57	2016-01-22 10:56:57	30	Which of the following is false as far as type 4 driver is concern?		t	1
266	2016-01-22 10:56:57	2016-01-22 10:56:57	30	To execute a stored procedure 		t	1
267	2016-01-22 10:56:57	2016-01-22 10:56:57	30	Which driver is efficient and always preferable for using JDBC applications?		t	1
268	2016-01-22 10:56:58	2016-01-22 10:56:58	30	JDBC facilitates to store the java objects by using which of the methods of PreparedStatement\\n1. setObject () 2. setBlob() 3. setClob()		t	1
269	2016-01-22 10:56:58	2016-01-22 10:56:58	30	Which statement is static and synchronized in JDBC API?		t	1
270	2016-01-22 10:56:58	2016-01-22 10:56:58	30	The JDBC-ODBC bridge is		t	1
271	2016-01-22 10:56:58	2016-01-22 10:56:58	13	When can we meet again?		t	1
272	2016-01-22 10:56:58	2016-01-22 10:56:58	13	My aunt is going to stay with me.		t	1
273	2016-01-22 10:56:58	2016-01-22 10:56:58	13	When do you study?		t	1
274	2016-01-22 10:56:58	2016-01-22 10:56:58	13	Would you prefer lemonade or orange juice?		t	1
275	2016-01-22 10:56:58	2016-01-22 10:56:58	13	Let's have dinner now.		t	1
276	2016-01-22 10:56:58	2016-01-22 10:56:58	13	The snow was ...... heavily when I left the house.		t	1
277	2016-01-22 10:56:58	2016-01-22 10:56:58	13	I can't find my keys anywhere - I ...... have left them at work.		t	1
278	2016-01-22 10:56:58	2016-01-22 10:56:58	13	When a car pulled out in front of her, Jane did well not to ...... control of her bicycle.		t	1
279	2016-01-22 10:56:58	2016-01-22 10:56:58	13	According to Richard's ...... the train leaves at 7 o'clock.		t	1
280	2016-01-22 10:56:58	2016-01-22 10:56:58	13	When you stay in a country for some time you get used to the people's ...... of life.		t	1
31	2016-01-21 14:09:18	2016-01-21 14:09:18	25	In OSI network architecture, the dialogue control and token management are responsibility of		t	1
32	2016-01-21 14:10:25	2016-01-21 14:10:25	25	In OSI network architecture, the routing is performed by		t	1
141	2016-01-22 06:26:14	2016-01-22 06:26:14	27	An entire path name, consisting of several sub-directory names can contain upto		t	1
281	2016-01-22 12:01:57	2016-01-22 12:01:57	13	You should not have a dog if you are not ...... to look after it.		f	0
282	2016-01-22 12:05:02	2016-01-22 12:05:02	13	The farmhouse was so isolated that they had to generate their own electricity ......		f	0
\.


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('questions_id_seq', 283, true);


--
-- Name: quote_activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('quote_activities_id_seq', 1, false);


--
-- Name: quote_activity_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('quote_activity_types_id_seq', 18, true);


--
-- Name: quote_bid_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('quote_bid_statuses_id_seq', 4, true);


--
-- Data for Name: quote_bids; Type: TABLE DATA; Schema: public; Owner: -
--

COPY quote_bids (id, created_at, updated_at, quote_request_id, quote_service_id, quote_status_id, is_direct_send, quote_amount, quote_type, price_note, quote_last_update_on, hired_on, completed_on, requestor_received_message_count, provider_received_message_count, requestor_unread_message_count, provider_unread_message_count, is_provider_readed, is_requestor_readed, used_credit_count, user_id, service_provider_user_id, escrow_amount, site_commission, is_paid_to_escrow, is_escrow_amount_released, coupon_id, last_new_quote_remainder_notify_date_to_freelancer, credit_purchase_log_id, private_note_of_incomplete, is_first_level_quote_request, is_show_bid_to_requestor, closed_on) FROM stdin;
\.


--
-- Name: quote_bids_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('quote_bids_id_seq', 13, true);


--
-- Data for Name: quote_categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY quote_categories (id, created_at, updated_at, parent_category_id, name, slug, form_field_count, quote_request_count, is_active, credit_point_for_sending_quote, description, is_featured) FROM stdin;
25	2012-10-24 11:52:37	2013-01-10 16:55:24	22	Seniors	seniors	5	0	t	0		f
26	2012-10-24 12:00:24	2013-01-10 16:55:24	22	Errands	errands	5	0	t	0		f
27	2012-10-24 12:05:07	2013-01-10 16:55:24	22	Safety	safety	1	0	t	0		f
28	2012-10-24 12:06:25	2013-01-10 16:55:24	22	Special needs	special-needs	4	0	t	0		f
30	2012-10-24 12:17:14	2013-01-10 16:55:24	29	Entertainment	entertainment	6	0	t	0		f
31	2012-10-24 12:26:24	2013-01-10 16:55:24	29	Party planning	party-planning	6	0	t	0		f
32	2012-10-24 12:31:39	2013-01-10 16:55:24	29	Specialized event services	specialized-event-services	4	0	t	0		f
33	2012-10-24 12:47:11	2013-01-10 16:55:24	29	Food & beverage	food-beverage	6	0	t	0		f
34	2012-10-24 12:54:46	2013-01-10 16:55:24	29	Photography	photography	5	0	t	0		f
35	2012-10-24 13:01:10	2013-01-10 16:55:24	29	Videography	videography	4	0	t	0		f
37	2012-10-24 13:09:06	2013-01-10 16:55:24	29	Production & set up	production-set-up	6	0	t	0		f
38	2012-10-24 13:13:25	2013-01-10 16:55:24	29	Wedding only services	wedding-only-services	5	0	t	0		f
41	2012-12-19 11:27:47	2013-01-10 16:55:24	40	Detailing	detailing	12	0	t	0		f
43	2012-12-19 12:20:33	2013-01-10 16:55:24	40	Transportation	transportation	12	0	t	0		f
44	2012-12-19 12:43:59	2013-01-10 16:55:24	40	Modification 	modification-	13	0	t	0		f
45	2012-12-19 12:53:09	2013-01-10 16:55:24	40	Specialized vehicle services	specialized-vehicle-services	6	0	t	0		f
47	2012-12-19 12:58:02	2013-01-10 16:55:24	46	Beauty	beauty	9	0	t	0		f
48	2012-12-19 12:58:17	2013-01-10 16:55:24	46	Fitness	fitness	6	0	t	0		f
49	2012-12-19 12:58:36	2013-01-10 16:55:24	46	Health	health	15	0	t	0		f
50	2012-12-19 12:58:54	2013-01-10 16:55:24	46	Leisure	leisure	6	0	t	0		f
51	2012-12-19 12:59:09	2013-01-10 16:55:24	46	Massage	massage	9	0	t	0		f
52	2012-12-19 12:59:41	2013-01-10 16:55:24	46	Therapy	therapy	6	0	t	0		f
53	2012-12-19 12:59:59	2013-01-10 16:55:24	46	Wardrobe	wardrobe	3	0	t	0		f
55	2012-12-19 14:52:43	2015-09-03 09:15:54	54	Academic subjects	academic-subjects	9	0	t	0		f
56	2012-12-19 14:53:09	2013-01-10 16:55:24	54	Business & professional	business-professional	5	0	t	0		f
57	2012-12-19 14:54:05	2015-09-03 09:42:10	54	Computer skills	computer-skills	6	0	t	0		f
58	2012-12-19 14:54:23	2013-01-10 16:55:24	54	Crafts & hobbies	crafts-hobbies	6	0	t	0		f
59	2012-12-19 14:54:41	2013-01-10 16:55:24	54	Creative & performing arts	creative-performing-arts	10	0	t	0		f
60	2012-12-19 14:55:09	2015-09-25 16:10:58	54	Health & fitness 	health-fitness-	8	0	t	0		f
61	2012-12-19 14:56:34	2013-01-10 16:55:24	54	Language	language	6	0	t	0		f
4	2012-07-31 17:32:50	2013-01-10 16:55:23	3	Courier/deliveries	courier-deliveries	3	0	t	0		t
5	2012-07-31 17:33:18	2013-01-10 16:55:23	3	Driving/transportation	driving-transportation	3	0	t	0		t
6	2012-07-31 17:33:36	2013-01-10 16:55:23	3	Gift wrapping	gift-wrapping	3	0	t	0		t
7	2012-07-31 17:33:54	2013-01-10 16:55:23	3	Grocery shopping & delivery	grocery-shopping-delivery	3	0	t	0		t
62	2012-12-19 14:56:51	2013-01-10 16:55:24	54	Life & home	life-home	6	0	t	0		f
63	2012-12-19 14:57:08	2015-09-02 08:13:41	54	Music	music	5	0	t	0		f
64	2012-12-19 14:57:23	2013-01-10 16:55:24	54	Specialized instruction 	specialized-instruction-	4	0	t	0		f
66	2012-12-20 15:35:56	2013-01-10 16:55:24	65	Editing	editing	6	0	t	0		f
67	2012-12-20 15:37:51	2013-01-10 16:55:24	65	Translation	translation	7	0	t	0		f
68	2012-12-20 15:42:08	2013-01-10 16:55:24	65	Writing	writing	6	0	t	0		f
70	2012-12-20 15:47:04	2013-01-10 16:55:24	69	Audio & video	audio-video	8	0	t	0		f
71	2012-12-20 15:49:25	2013-01-10 16:55:24	69	Design	design	9	0	t	0		f
72	2012-12-20 15:53:26	2013-01-10 16:55:24	69	Networking & information systems	networking-information-systems	3	0	t	0		f
73	2012-12-20 15:54:34	2013-01-10 16:55:24	69	Repair	repair	3	0	t	0		f
74	2012-12-20 15:55:47	2013-01-10 16:55:24	69	Software development	software-development	6	0	t	0		f
75	2012-12-20 15:58:07	2013-01-10 16:55:24	69	Web development	web-development	4	0	t	0		f
3	2012-07-31 17:27:01	2013-01-10 16:55:23	\N	Delivery	delivery	3	0	t	0		f
10	2012-07-31 17:36:48	2012-12-20 16:02:05	\N	Home services	home-services	0	0	t	0		f
17	2012-07-31 17:57:20	2012-07-31 17:57:20	\N	Business & legal	business-legal	0	0	t	0		f
42	2012-12-19 12:06:38	2017-04-29 10:28:21	40	Repair	repair	13	0	t	0		f
22	2012-10-24 11:37:23	2012-10-24 11:37:23	\N	Family	family	0	0	t	0		f
13	2012-07-31 17:45:04	2013-01-10 16:55:23	10	Cleaning out	cleaning-out	4	0	t	0		f
14	2012-07-31 17:48:20	2013-01-10 16:55:23	10	Property cleanup and junk removal	property-cleanup-and-junk-removal	3	0	t	0		f
18	2012-07-31 17:57:35	2013-01-10 16:55:23	17	Administrative support	administrative-support	3	0	t	0		f
19	2012-07-31 17:57:48	2013-01-10 16:55:23	17	Legal	legal	6	0	t	0		f
20	2012-07-31 17:58:02	2013-01-10 16:55:23	17	Customer service	customer-service	5	0	t	0		f
21	2012-07-31 17:58:15	2013-01-10 16:55:23	17	Sales & marketing	sales-marketing	4	0	t	0		f
23	2012-10-24 11:38:07	2013-01-10 16:55:24	22	Children	children	5	0	t	0		f
24	2012-10-24 11:46:16	2013-01-10 16:55:24	22	Pets	pets	4	0	t	0		f
29	2012-10-24 12:16:30	2012-10-24 12:16:30	\N	Events	events	0	0	t	0		f
36	2012-10-24 13:05:44	2017-05-08 08:56:53	29	Music	music	6	0	t	0		f
8	2012-07-31 17:34:11	2017-05-08 09:31:08	3	Laundry	laundry	3	0	t	0		t
12	2012-07-31 17:41:19	2017-05-08 09:33:59	10	Commercial cleaning	commercial-cleaning	4	0	t	0		f
40	2012-12-19 11:26:56	2012-12-19 11:26:56	\N	Cars & trucks	cars-trucks	0	0	t	0		f
46	2012-12-19 12:57:35	2012-12-19 12:57:35	\N	Health & beauty	health-beauty	0	0	t	0		f
54	2012-12-19 14:52:08	2012-12-19 14:52:08	\N	Classes & lessons	classes-lessons	0	0	t	0		f
65	2012-12-20 15:35:35	2012-12-20 15:35:36	\N	Writing & translation	writing-translation	0	0	t	0		f
69	2012-12-20 15:45:45	2012-12-20 15:45:45	\N	Tech & web services	tech-web-services	0	0	t	0		f
11	2012-07-31 17:37:15	2013-01-10 16:55:23	10	Home Services	home-services	5	0	t	0		f
76	2012-12-20 18:19:25	2017-04-29 10:26:23	10	Air conditioning & cooling	air-conditioning-cooling	5	0	t	0		f
97	2012-12-20 19:08:56	2017-05-08 08:53:57	10	Windows	windows	5	0	t	0		f
39	2012-11-08 17:37:27	2017-05-08 09:07:12	3	Bouquet Delivery	bouquet-delivery	4	0	t	0		f
9	2012-07-31 17:34:35	2013-01-10 16:55:23	3	Other	other	3	0	f	0		f
16	2012-07-31 17:52:58	2013-01-10 16:55:23	10	Other	other	2	0	f	0		f
15	2012-07-31 17:51:06	2013-01-10 16:55:23	\N	Other	other	2	0	f	0		f
\.


--
-- Name: quote_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('quote_categories_id_seq', 97, true);


--
-- Data for Name: quote_categories_quote_services; Type: TABLE DATA; Schema: public; Owner: -
--

COPY quote_categories_quote_services (id, created_at, updated_at, quote_category_id, quote_service_id) FROM stdin;
\.


--
-- Name: quote_categories_quote_services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('quote_categories_quote_services_id_seq', 114, true);


--
-- Name: quote_credit_purchase_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('quote_credit_purchase_logs_id_seq', 4, true);


--
-- Name: quote_credit_purchase_plans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('quote_credit_purchase_plans_id_seq', 5, true);


--
-- Data for Name: quote_faq_answers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY quote_faq_answers (id, created_at, updated_at, quote_service_id, quote_faq_question_template_id, quote_user_faq_question_id, answer) FROM stdin;
\.


--
-- Name: quote_faq_answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('quote_faq_answers_id_seq', 12, true);


--
-- Data for Name: quote_faq_question_templates; Type: TABLE DATA; Schema: public; Owner: -
--

COPY quote_faq_question_templates (id, created_at, updated_at, question, is_active) FROM stdin;
1	2012-08-02 16:06:31	2012-08-02 19:02:59	Describe the most common types of jobs you do for your clients	t
2	2012-08-02 16:07:25	2012-08-02 19:03:13	What advice do you have for a customer looking to hire a provider like you?	t
3	2012-08-02 19:03:26	2012-08-02 19:03:26	If you were a customer, what do you wish you knew about your trade? Any inside secrets to share?	t
4	2012-08-02 19:03:39	2012-08-02 19:03:39	What questions should a consumer ask to hire the right service professional?	t
5	2012-08-02 19:03:53	2012-08-02 19:03:53	What important information should buyers have thought through before seeking you out?	t
6	2012-08-02 19:04:12	2012-08-02 19:04:12	Why does your work stand out from others who do what you do?	t
7	2012-08-02 19:04:25	2012-08-02 19:04:25	What do you like most about your job?	t
8	2012-08-02 19:04:54	2012-08-02 19:04:54	What questions do customers most commonly ask you? What's your answer?	t
9	2012-08-02 19:05:11	2012-08-02 19:05:11	Do you have a favorite story from your work?	t
10	2012-08-02 19:05:26	2012-08-02 19:05:26	What do you wish customers knew about you or your profession?	t
11	2012-08-02 19:05:42	2012-08-02 19:05:42	How did you decide to get in your line of work?	t
12	2012-08-02 19:06:00	2012-08-02 19:06:00	Tell us about a recent job you did that you are particularly proud of.	t
13	2012-08-02 19:06:14	2012-08-02 19:06:14	Do you do any sort of continuing education to stay up on the latest developments in your field?	t
14	2012-08-02 19:06:42	2012-08-02 19:06:42	What are the latest developments in your field? Are there any exciting things coming in the next few years or decade that will change your line of business?	t
15	2012-08-02 19:06:59	2012-08-02 19:06:59	Describe your most recent project, what it involved, how much it cost, and how long it took.	t
16	2012-08-02 19:07:17	2012-08-02 19:07:17	If you have a complicated pricing system for your service, please give all the details here.	t
17	2012-08-02 19:07:32	2012-08-02 19:07:32	If you were advising someone who wanted to get into your profession, what would you suggest?	t
19	2012-08-02 19:08:27	2015-07-16 08:21:39	What are you currently working on improving?	t
23	2015-07-16 08:21:09	2015-07-16 08:21:09	what is your main goal?	t
\.


--
-- Name: quote_faq_question_templates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('quote_faq_question_templates_id_seq', 23, true);


--
-- Name: quote_form_submission_fields_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('quote_form_submission_fields_id_seq', 1, false);


--
-- Data for Name: quote_request_form_fields; Type: TABLE DATA; Schema: public; Owner: -
--

COPY quote_request_form_fields (id, created_at, updated_at, quote_form_field_id, quote_request_id, response) FROM stdin;
\.


--
-- Data for Name: quote_requests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY quote_requests (id, created_at, updated_at, quote_category_id, user_id, quote_service_id, title, description, best_day_time_for_work, full_address, address, city_id, state_id, country_id, zip_code, latitude, longitude, phone_no, quote_bid_count, is_archived, is_send_request_to_other_service_providers, quote_bid_new_count, quote_bid_discussion_count, quote_bid_hired_count, quote_bid_completed_count, is_request_for_buy, last_new_quote_remainder_notify_date, is_quote_bid_sent, radius, is_first_level_quote_request_sent, is_updated_bid_visibility_to_requestor, quote_bid_pending_discussion_count, quote_bid_closed_count, quote_bid_not_completed_count) FROM stdin;
\.


--
-- Name: quote_requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('quote_requests_id_seq', 8, true);


--
-- Data for Name: quote_service_audios; Type: TABLE DATA; Schema: public; Owner: -
--

COPY quote_service_audios (id, created_at, updated_at, quote_service_id, embed_code) FROM stdin;
\.


--
-- Name: quote_service_audios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('quote_service_audios_id_seq', 1, false);


--
-- Data for Name: quote_service_photos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY quote_service_photos (id, created_at, updated_at, quote_service_id, caption) FROM stdin;
\.


--
-- Name: quote_service_photos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('quote_service_photos_id_seq', 22, true);


--
-- Data for Name: quote_service_videos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY quote_service_videos (id, created_at, updated_at, quote_service_id, embed_code, video_url) FROM stdin;
\.


--
-- Name: quote_service_videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('quote_service_videos_id_seq', 11, true);


--
-- Data for Name: quote_services; Type: TABLE DATA; Schema: public; Owner: -
--

COPY quote_services (id, created_at, updated_at, user_id, business_name, slug, how_does_your_service_stand_out, full_address, address, city_id, state_id, country_id, zip_code, latitude, longitude, website_url, phone_number, is_service_provider_travel_to_customer_place, service_provider_travels_upto, is_customer_travel_to_me, is_over_phone_or_internet, is_active, quote_service_photo_count, quote_service_audio_count, quote_service_video_count, quote_faq_answer_count, quote_bid_count, quote_service_flag_count, under_discussion_count, hired_count, completed_count, year_founded, number_of_employees, what_do_you_enjoy_about_the_work_you_do, view_count, flag_count, total_rating, review_count, quote_bid_new_count, quote_bid_discussion_count, quote_bid_hired_count, quote_bid_completed_count, is_admin_suspend, quote_bid_not_completed_count, quote_bid_closed_count) FROM stdin;
\.


--
-- Name: quote_services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('quote_services_id_seq', 11, true);


--
-- Data for Name: quote_statuses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY quote_statuses (id, created_at, updated_at, name) FROM stdin;
1	2016-11-14 17:39:50	2016-11-14 17:39:50	New
2	2016-11-14 17:39:50	2016-11-14 17:39:50	Under Discussion
3	2016-11-14 17:42:11	2016-11-14 17:42:11	Hired
4	2016-11-14 17:42:50	2016-11-14 17:42:50	Completed
5	2016-11-14 17:42:50	2016-11-14 17:42:50	Not Interested
6	2017-01-06 13:25:36	2017-01-06 13:25:36	Closed
7	2017-05-19 10:49:50	2017-05-19 10:49:50	Not Completed
\.


--
-- Name: quote_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('quote_statuses_id_seq', 6, true);


--
-- Data for Name: quote_user_faq_questions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY quote_user_faq_questions (id, created_at, updated_at, user_id, question) FROM stdin;
\.


--
-- Name: quote_user_faq_questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('quote_user_faq_questions_id_seq', 6, true);


--
-- Data for Name: resources; Type: TABLE DATA; Schema: public; Owner: -
--

COPY resources (id, created_at, updated_at, name, description, folder_name, contest_count, contest_user_count, revenue, class_name) FROM stdin;
1	2011-09-21 15:29:20	2011-09-21 15:29:20	Image	Image contest	image	0	0	0	fa fa-image
2	2013-07-30 16:51:35	2013-07-30 16:51:35	Video	Video contest	video	0	0	0	fa fa-video-camera
3	2013-07-30 16:51:35	2013-07-30 16:51:35	Audio	Audio contest	audio	0	0	0	fa fa-volume-up
4	2013-07-30 16:51:35	2013-07-30 16:51:35	Text	Text contest	text	0	0	0	fa fa-edit
\.


--
-- Name: resources_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('resources_id_seq', 3, false);


--
-- Data for Name: resume_downloads; Type: TABLE DATA; Schema: public; Owner: -
--

COPY resume_downloads (id, created_at, updated_at, user_id, job_apply_id, ip_id) FROM stdin;
\.


--
-- Name: resume_downloads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('resume_downloads_id_seq', 1, false);


--
-- Data for Name: resume_ratings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY resume_ratings (id, created_at, updated_at, user_id, job_id, job_apply_id, rating, comment) FROM stdin;
\.


--
-- Name: resume_ratings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('resume_ratings_id_seq', 1, false);


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: -
--

COPY reviews (id, created_at, updated_at, user_id, to_user_id, foreign_id, class, rating, message, ip_id, is_freelancer, model_id, model_class) FROM stdin;
\.


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('reviews_id_seq', 2, true);


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY roles (id, created_at, updated_at, name, is_active) FROM stdin;
1	2016-10-12 19:16:55	2016-10-12 19:16:55	Admin	t
2	2016-10-12 19:16:55	2016-10-12 19:16:55	User	t
3	2017-01-06 12:11:52	2017-01-06 12:11:52	Employer	t
4	2017-01-06 12:11:52	2017-01-06 12:11:52	Freelancer	t
\.


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('roles_id_seq', 4, true);


--
-- Data for Name: salary_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY salary_types (id, created_at, updated_at, name, is_active) FROM stdin;
1	2014-04-02 17:05:45	2014-04-02 17:05:45	Per Annum	t
2	2014-04-02 17:05:45	2014-04-02 17:05:45	Per Month	t
3	2014-04-02 17:06:16	2014-04-02 17:06:16	Per Week	t
4	2014-04-02 17:06:16	2014-04-02 17:06:16	Per Day	t
5	2014-04-02 17:06:43	2014-04-02 17:06:43	Per Hour	t
6	2014-04-02 17:06:43	2014-04-02 17:06:43	Per Job	t
\.


--
-- Name: salary_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('salary_types_id_seq', 6, true);


--
-- Data for Name: setting_categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY setting_categories (id, created_at, updated_at, name, description) FROM stdin;
2	2016-05-30 12:17:27	2016-05-30 12:17:27	SEO	Manage content, meta data and other information relevant to browsers or search engines.
3	2016-05-30 12:24:36	2016-05-30 12:24:36	Regional, Currency & Language	Manage site default language, currency and date-time format.
1	2016-05-30 12:17:27	2016-05-30 12:17:27	System	Manage site name, contact email, from email and reply to email.
4	2016-05-30 12:25:53	2016-05-30 12:25:53	Account	Manage user account related settings
5	2016-05-30 12:17:27	2016-05-30 12:17:27	Wallet	Manage wallet related settings.
6	2016-05-30 12:17:27	2016-05-30 12:17:27	Withdrawals	Manage withdrawal related settings.
7	2016-05-30 12:17:27	2016-05-30 12:17:27	Third Party API	Manage third party API related settings
8	2016-05-30 12:17:27	2016-05-30 12:17:27	Widget	Widgets for header, footer, view page. Widgets can be in iframe and JavaScript embed code, etc (e.g., Twitter Widget, Facebook Like Box, Facebook Feeds Code, Google Ads).
9	2016-11-25 11:29:32	2016-11-25 11:29:32	Contest	Manage Contest related settings
10	2016-12-01 18:35:48	2016-12-01 18:35:48	Job	Manage Job related settings
11	2016-12-15 12:11:22	2016-12-15 12:11:22	Quote	Manage Quote related settings
129	2016-12-20 14:58:18	2016-12-20 14:58:18	Project	Manage Project related settings
128	2016-12-20 14:58:18	2016-12-20 14:58:18	Exam	Manage Exam related settings
130	2017-03-07 12:17:27	2017-03-07 12:17:27	Subscriptions and Credit Point System	Manage Subscriptions and Credit Point System related settings.
131	2017-03-13 12:17:27	2017-03-13 12:17:27	Dispute	Manage Dispute related settings
133	2017-05-11 11:29:32	2017-05-11 11:29:32	Image Resource	Manage Image Resource related settings
132	2017-05-18 12:17:27	2017-05-18 12:17:27	Portfolio	Manage Portfolio related settings.
\.


--
-- Name: setting_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('setting_categories_id_seq', 133, true);


--
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY settings (id, created_at, updated_at, setting_category_id, name, value, description, type, label, "position", option_values, is_send_to_frontend) FROM stdin;
12	2016-05-30 12:25:53	2016-05-30 12:24:36	3	CURRENCY_SYMBOL	$	Site Currency symbol of PayPal Currency Code. eg. $ for USD	text	Site Currency Symbol	1	\N	t
19	2016-05-30 12:17:27	2016-05-30 12:17:27	4	USER_IS_ADMIN_ACTIVATE_AFTER_REGISTER	0	On enabling this feature, the user will not be able to login until the Admin (that will be you) approves their registration.	checkbox	Enable Administrator Approval After Registration	1	\N	t
21	2016-05-30 12:17:27	2016-05-30 12:17:27	4	USER_IS_AUTO_LOGIN_AFTER_REGISTER	0	On enabling this feature, users will be automatically logged-in after registration. (Only when "Email Verification" & "Admin Approval" is disabled)	checkbox	Enable Auto Login After Registration	3	\N	t
14	2016-05-30 12:24:36	2016-05-30 12:24:36	4	USER_IS_ALLOW_SWITCH_LANGUAGE	1	On enabling this feature, users can change site language to their choice.	checkbox	Enable User to Switch Language	1	\N	t
22	2016-05-30 12:17:27	2016-05-30 12:17:27	5	WALLET_MIN_WALLET_AMOUNT	10	This is the minimum amount a user can add to his wallet.	text	Minimum wallet amount	1	\N	t
23	2016-05-30 12:24:36	2016-05-30 12:24:36	5	WALLET_MAX_WALLET_AMOUNT	20000	This is the maximum amount a user can add to his wallet. (If left empty, then, no maximum amount restrictions).	text	Maximum wallet amount	2	\N	t
24	2016-05-30 12:24:36	2016-05-30 12:24:36	6	USER_MINIMUM_WITHDRAW_AMOUNT	2	This is the minimum amount a user can withdraw from their wallet.	text	Minimum Withdrawal Amount	1	\N	t
25	2016-05-30 12:17:27	2016-05-30 12:17:27	6	USER_MAXIMUM_WITHDRAW_AMOUNT	10000	This is the maximum amount a user can withdraw from their wallet.	text	Maximum Withdrawal Amount	2	\N	t
6	2016-05-30 12:24:36	2016-05-30 12:17:27	7	GOOGLE_RECAPTCHA_CODE	6Le2SCQTAAAAABgGIgDxO1LiqN-emZKteGFj7Apa	Google recpatcha code.	text	Google Recaptcha Code	1	\N	t
9	2016-05-30 12:17:27	2016-05-30 12:24:36	2	SITE_TRACKING_SCRIPT	<script type="text/javascript"> var _gaq = _gaq || []; _gaq.push(['_setAccount', 'UA-18572079-3']); _gaq.push(['_setDomainName', '.dev.agriya.com']); _gaq.push(['_setAllowAnchor', true]); _gaq.push(['_trackPageview']); _gaq.push(function() { href = window.location.search; href.replace(/(utm_source|utm_medium|utm_campaign|utm_term|utm_content)+=[^\\&]*/g, '').replace(/\\&+/g, '&').replace(/\\?\\&/g, '?').replace(/(\\?|\\&)$/g, ''); if (history.replaceState) history.replaceState(null, '', location.pathname + href + location.hash);}); (function() { var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); })(); </script>	This is the site tracker script used for tracking and analyzing the data on how the people are getting into your website. e.g., Google Analytics. <a href="http://www.google.com/analytics" target="_blank">http://www.google.com/analytics</a>	textarea	Site Tracker Code	3	\N	t
27	2016-05-30 12:17:27	2016-05-30 12:17:27	4	USER_IS_LOGOUT_AFTER_CHANGE_PASSWORD	0	By enabling this feature, When user changes the password, he will automatically log-out.	checkbox	Enable User to Logout after Password Change	5	\N	t
30	2016-05-30 12:17:27	2016-05-30 12:17:27	4	USER_IS_CAPTCHA_ENABLED_FORGOT_PASSWORD	0	On enabling this feature, captcha will display forgot password page.	checkbox	Enable Captcha Forgot password	8	\N	t
504	2016-12-09 06:16:22	2016-12-09 06:16:22	1	SITE_FACEBOOK_URL	https://www.facebook.com/agriya		text	Site Facebook URL	6	\N	t
505	2016-12-09 20:13:57	2016-12-09 20:13:57	1	SITE_TWITTER_URL	https://twitter.com/agriya	\N	text	Site Twitter URL	7	\N	t
506	2016-12-09 06:16:22	2016-12-09 06:16:22	1	SITE_YOUTUBE_URL	https://www.youtube.com/channel/UCcxmjGrb-E8CKXFv2RKOG5A	\N	text	Site Youtube URL	8	\N	t
507	2016-12-09 06:16:22	2016-12-09 06:16:22	1	SITE_PINTEREST_URL	https://pinterest.com/agriya/	\N	text	Site Pinterest URL	9	\N	t
508	2016-12-09 06:16:22	2016-12-09 06:16:22	1	SITE_GOOGLEPLUS_URL	https://plus.google.com/+AgriyaNews	\N	text	Site Google Plus URL	10	\N	t
484	2016-11-25 11:29:32	2016-11-25 11:29:32	9	CONTEST_REQUEST_FOR_CANCELLATION	2	Enable Request for Cancellation option only when the selected type count is less than or equal to this value. Leave empty for no limit.	text	Limit Required to Enable Request for Cancellation	4	\N	t
493	2016-11-28 11:29:32	2016-11-28 11:29:32	9	CONTEST_PAYMENT_PENDING_DAYS_LIMIT	1	If Contest Holder doesn''t pay in above mentioned days, contest will be deleted.The process that could happen during the cron run.	text	Payment for Contest	5	\N	t
481	2016-11-25 11:29:32	2016-11-25 11:29:32	0	CONTEST_VIDEO_SIZE	8	By changing this value entry video size allowed will changed. (In MB)	text	Entry Video size	1	\N	t
5	2016-05-30 12:25:53	2016-05-30 12:25:53	1	SITE_NAME	getlancer	This name will be used in all pages and emails.	text	Site name	1	\N	t
483	2016-11-25 11:29:32	2016-11-25 11:29:32	133	CONTEST_IMAGE_SIZE	3	By changing this value entry image size allowed will changed.(In MB)	text	Entry Image size	3	\N	t
20	2016-05-30 12:17:27	2016-05-30 12:17:27	4	USER_IS_EMAIL_VERIFICATION_FOR_REGISTER	1	On enabling this feature, the users are required to verify their email address which will be provided by them during registration. (Users cannot login until the email address is verified)	checkbox	Enable Email Verification After Registration	2	\N	t
482	2016-11-25 11:29:32	2016-11-25 11:29:32	9	MAX_UPLOAD_SIZE_OF_IMAGE_CONTEST_ENTRY	2	By changing this value allowed entry image size will be changed. (In MB). Leave it blank for no validation.	text	Max Contest entry File Size Limitation	2	\N	f
15	2016-05-30 12:17:27	2016-05-30 12:17:27	4	USER_USING_TO_LOGIN	username	You can select the option from the drop-downs to login into the site	select	Login Handle	1	username,email	t
13	2016-05-30 12:17:27	2016-05-30 12:17:27	3	CURRENCY_CODE	USD	PayPal doesnt support all currencies; refer, <a href="https://www.paypal.com/cgi-bin/webscr?cmd=p/sell/mc/mc_wa-outside">https://www.paypal.com/cgi-bin/webscr?cmd=p/sell/mc/mc_wa-outside</a> for list of supported currencies in PayPal. The selected currency will be used as site default currency. (All payments, transaction will use this currency).	text	Currency Code	2		t
494	2016-11-28 00:10:22	2016-11-28 00:10:22	9	CONTEST_JUDGING_STATUS_DAYS_LIMIT	10	Contest will move to "Pending Action to Admin", when contest holder doesn't select winner before mentioned days. In that case, Admin will be forced to select winner.	text	From Judging Status	7	\N	t
495	2016-11-28 11:29:32	2016-11-28 11:29:32	9	CONTEST_WINNER_SELECTED__TO_COMPLETED_DAYS	10	Contest will move to "Pending Action to Admin", when contest holder doesn't request any change in entry or mark as completed before mentioned days. In that case, Admin will be forced to complete contest.	text	From Winner Selected Status	8	\N	t
501	2016-12-01 18:35:48	2016-12-01 18:35:48	10	URGENT_FEE_FOR_JOB	5	This is the job fee for listing job under urgent category.	text	Urgent Job	3	\N	t
500	2016-12-01 18:35:48	2016-12-01 18:35:48	10	LISTING_FEE_FOR_JOB	5	Fee for listing the project to this web	text	Job Listing Fee	2	\N	t
529	2016-12-19 13:09:48	2016-12-19 13:09:48	128	IS_FEE_NEEDED_FOR_RERATTEMPTS	1	Disable this, if no need for skill test fee for reattempting failed test.	checkbox	Enable Skill Test Fee for Reattempts?	1	\N	f
496	2016-11-28 00:10:22	2016-11-28 00:10:22	9	CONTEST_CHANGE_COMPLETED_TO_COMPLETED_DAYS	10	Contest will move to "Pending Action to Admin", when contest holder doesn't request any new change in entry or mark as completed before mentioned days. In that case, Admin will be forced to complete contest.	text	From Change Completed Status	9	\N	t
498	2016-11-30 00:10:22	2016-11-30 00:10:22	9	CONTEST_ENABLE_AUTO_APPROVAL	1	After payment check whether Enable Auto Approval After New Contest true, then set as Open or Pending Approval	text	Enabel auto approval	12	\N	t
525	2016-12-19 12:51:40	2016-12-19 12:51:40	128	IS_ALLOW_TO_RECONTINUE_SKILL_TEST	1	If disabled mean, user can't recontinue the test if skipping test in between the time due to internet connection broken, or pressing browse back button etc. 	checkbox	Allow User to Recontinue the Skill Test?	1	\N	t
480	2016-08-10 12:25:53	2016-12-10 11:17:57	0	SITE_DOMAIN_SECRET_HASH	0614868e-ad76-413b-a991-4fa3ef440b3c	Zazpay Domain Secret Hash	text	Zazpay Domain Secret hash	0	\N	f
535	2016-12-19 16:18:21	2016-12-19 16:18:21	128	IS_ENABLED_HIERARCHY_LEVEL_ATTENDING_EXAM	0	By enabling this, user can attend the exam by hierarchy wise. Like level 2 can attend after level 1 complete.	checkbox	Enable checking level hierarchy when attending exam?	1	\N	t
537	2016-12-20 15:02:35	2016-12-20 15:02:35	129	PROJECT_LISTING_FEE	5	Fee for listing the project to this web.	text	Project Listing Fee	1	\N	t
538	2016-12-20 15:04:45	2016-12-20 15:04:45	129	PROJECT_FEATURED_FEE	5	This is the project fee for listing project under featured category.	text	Featured Project	1	\N	t
549	2016-12-20 16:03:45	2016-12-20 16:03:45	129	PROJECT_MAX_DAYS_TO_SELECT_WINNER	100	This is the maximum number of day(s) to select winner after bidding closed.	text	Maximum Number of Day(s) to Select Winner	1	\N	t
545	2016-12-20 15:53:35	2016-12-20 15:53:35	129	PROJECT_WITHDRAW_FREELANCER_DAYS	3	This is the maximum number of days for freelancer to accept or reject select as winner projects. If failed to accept or reject, then employer can withdraw freelancer from the project.	text	Maximum Number of Days to Accept/Reject Project	1	\N	t
542	2016-12-20 15:08:15	2016-12-20 15:08:15	129	PROJECT_PRIVATE_PROJECT_FEE	5	This is the fee for hiding the project from public listing (without login) and search engine.	text	Private Project Fee	1	\N	t
541	2016-12-20 15:07:55	2016-12-20 15:07:55	129	PROJECT_HIDDEN_BID_FEE	5	This is the fee for hiding the project bids from other freelancer.	text	Hidden Bid Fee	1	\N	t
540	2016-12-20 15:07:15	2016-12-20 15:07:15	129	PROJECT_URGENT_FEE	5	This is the fee for hiding the project bids from other freelancer. Featured Project -> Featured Project Fee Project Listing Fee: Fee for listing the project to this web. -> Fee for listing the project to this website.	text	Urgent Project Fee	1	\N	t
551	2016-12-20 16:05:28	2016-12-20 16:05:28	129	PROJECT_MAX_BID_DURATION	100	Set maximum bidding duration for a project. Leave it blank for no limitation.	text	Maximum Bidding Duration	1	\N	t
1	2016-05-30 12:25:53	2016-05-30 12:24:36	1	SITE_FROM_EMAIL	productdemo.admin@gmail.com	You can change this email address so that 'From' email will be changed in all email communication.	text	From Email Address	1	\N	f
2	2016-05-30 12:25:53	2016-05-30 12:25:53	1	SITE_CONTACT_EMAIL	productdemo.admin@gmail.com	Contact email	test	Contact Email	3	\N	f
10	2016-05-30 12:24:36	2016-05-30 12:17:27	2	SITE_ROBOTS	Content for robots.txt; (search engine) robots specific instructions. Refer, <a href="http://www.robotstxt.org/">http://www.robotstxt.org/</a> for syntax and usage.	\N	textarea	robots.txt	4		f
4	2016-05-30 12:25:53	2016-05-30 12:25:53	1	SUPPORT_EMAIL	productdemo.admin@gmail.com	Support email	text	Support Email Address	4	\N	f
28	2016-05-30 12:17:27	2016-05-30 12:17:27	4	USER_IS_WELCOME_MAIL_AFTER_REGISTER	0	On enabling this feature, users will receive a welcome mail after registration.	checkbox	Enable Sending Welcome Mail After Registration	6	\N	f
29	2016-05-30 12:17:27	2016-05-30 12:17:27	4	USER_IS_ADMIN_MAIL_AFTER_REGISTER	0	On enabling this feature, notification mail will be sent to administrator on each registration.	checkbox	Enable Notify Administrator on Each Registration	7	\N	f
3	2016-05-30 12:17:27	2016-05-30 12:25:53	1	SITE_REPLY_TO_EMAIL		You can change this email address so that 'Reply To' email will be changed in all email communication.	text	Reply To Email Address	2	\N	f
479	2016-08-10 12:25:53	2016-12-10 11:18:00	0	SITE_IS_WEBSITE_CREATED	1	Zazpay website account created	checkbox	Zazpay Website Account created	0	\N	f
565	2016-12-20 06:16:22	2016-12-20 06:16:22	1	SITE_LINKEDIN_URL	\N	This is the site's "Linkedin" url displayed in the footer.	text	Linkedin URL	11	\N	t
478	2016-08-10 12:25:53	2016-08-10 12:25:53	0	SITE_IS_ENABLE_ZAZPAY_PLUGIN	0	When site purchased ZazPay plugin 	checkbox	Enable Zazpay plugin	0	\N	t
8	2016-05-30 12:24:36	2016-05-30 12:17:27	2	META_DESCRIPTION	freelancer clone	These are the short descriptions for your site which will be used by the search engines on the search result pages to display preview snippets for a given page.	textarea	Description	2		f
7	2016-05-30 12:17:27	2016-05-30 12:24:36	2	META_KEYWORDS	frelancer, getlancer, scriptlancer	These are the keywords used for improving search engine results of our site.\\r\\n(Comma separated for multiple keywords).	text	Keywords	1	\N	f
490	2016-11-28 11:29:32	2016-11-28 11:29:32	0	HOSTER_AUDIO_TYPE	normal		radio	Hoster Audio Type	14	normal,direct	f
491	2016-11-28 11:29:32	2016-11-28 11:29:32	0	HOSTER_SERVICE	vimeo		radio	Hoster Service	14	youtube,vimeo	f
485	2016-11-28 11:29:32	2016-11-28 11:29:32	133	WATERMARK_TEXT	Getlancer		text	Watermark Text	10	\N	f
486	2016-11-28 11:29:32	2016-11-28 11:29:32	133	WATERMARK_POSITION_Y	73		text	Y Position of Watermark	11	\N	f
487	2016-11-28 11:29:32	2016-11-28 11:29:32	133	WATERMARK_POSITION_X	30		text	X Position of Watermark	12	\N	f
569	2016-12-20 15:09:42	2016-12-20 15:09:42	1	SITE_FOURSQUARE_URL	\N	This is the site's "Foursquare" url displayed in the footer.	text	Foursquare URL	15	\N	t
570	2016-12-20 15:09:42	2016-12-20 15:09:42	1	SITE_INSTAGRAM_URL	\N	This is the site's "Instagram" url displayed in the footer.	text	Instagram URL	16	\N	t
567	2016-12-20 15:09:42	2016-12-20 15:09:42	1	SITE_TUMBLR_URL	\N	This is the site's "Tumblr" url displayed in the footer.	text	Tumblr URL	13	\N	t
568	2016-12-20 15:09:42	2016-12-20 15:09:42	1	SITE_VIMEO_URL	\N	This is the site's "Vimeo" url displayed in the footer.	text	Vimeo URL	14	\N	t
566	2016-12-20 15:09:42	2016-12-20 15:09:42	1	SITE_FLICKR_URL	\N	This is the site's "Flickr" url displayed in the footer.	text	Flickr URL	12	\N	t
489	2016-11-28 11:29:32	2016-11-28 11:29:32	133	WATERMARK_TYPE	Watermark Image	By selecting the water mark type can be changed.	radio	Watermark Type	14	Watermark Image,Enable Text Watermark	f
596	2017-05-18 12:17:27	2017-05-18 12:17:27	6	WITHDRAW_REQUEST_FEE	2	withdraw request fee	text	Withdraw Request Fee	4		t
522	2016-12-16 10:57:24	2016-12-16 10:57:24	130	IS_ALLOW_PROVIDER_TO_SEND_MESSAGE_BEFORE_PAY_CREDIT	0	"1" for allow, otherwise "0". Note: If this is disabled and Provider has already subscribed, address will automatically be get shown by charging from subscription plan.	text	Allow Service Provider to view complete address of work location, before paying credit point	3	\N	t
523	2016-12-16 10:59:38	2016-12-16 10:59:38	130	IS_ALLOW_PROVIDER_TO_VIEW_ADDRESS_BEFORE_PAY_CREDIT	0	"1" for allow, otherwise "0".	text	Allow Service Provider to send message through compose, before paying credit point 	4	\N	t
531	2016-12-19 13:16:54	2016-12-19 13:16:54	128	MAX_NUMBER_OF_TIME_PER_USER_PER_EXAM	3	This is the maximum number, to allow a user to reattempts same skill test. Leave blank for no limit. Enter 0 for no reattempts	text	Maximum Number of Time User Can Reattempt Same Skill Test.	1	\N	f
533	2016-12-19 13:25:36	2016-12-19 13:25:36	128	REATTEMPT_DURATION		This is the number of days user must wait to reattempt the particular same skill test after failure before. Leave blank for no restriction.	text	Reattempt duration	1	\N	f
592	2017-03-07 12:17:27	2017-03-07 12:17:27	130	CREDIT_POINT_FOR_SENDING_QUOTE_FOR_REQUEST	1	Credit point for sending quote for request.	text	Credit point for sending quote for request	1	\N	t
577	2017-01-04 06:16:22	2017-01-04 06:16:22	121	CONTEST_ALLOW_ALL_USERS_TO_COMMENT_UPTO_STATUS	Open	All user to comment up to selected level	select	All user to comment up to limited level	1	Open,Judging,WinnerSelected,Completed	f
578	2017-01-04 06:16:22	2017-01-04 06:16:22	121	MESSAGE_THREAD_MAX_DEPTH	3	0 for unlimited. Below this thread level "Reply" option will not be available. This is to avoid broken design due to thread level.	text	Thread Maximum Depth	1	\N	f
590	2017-03-04 06:16:22	2017-03-04 06:16:22	120	CONTEST_COMMISSION_FROM_FREELANCER	10	This is the commission percentage which will be taken from freelancer when accepting a contest for development.	text	Freelancer Commission Percentage (%)	1	\N	t
591	2017-03-04 06:16:22	2017-03-04 06:16:22	120	CONTEST_COMMISSION_FROM_EMPLOYER	10	This is the commission percentage which will be taken from Employer when accepting a contest for development.	text	Employer Commission Percentage (%)	1	\N	t
593	2017-03-07 12:17:27	2017-03-07 12:17:27	130	CREDIT_POINT_FOR_BIDDING_A_PROJECT	1	Credit point for bidding a project	text	Credit point for bidding a project	2	\N	t
587	2017-01-16 12:51:40	2017-01-16 12:51:40	131	DISPUTE_CONVERSATION_COUNT	1	Admin will take decision, after number of conversation to employer and freelancer.	checkbox	Number of Days to Reply Dispute	1	\N	t
585	2017-01-16 12:51:40	2017-01-16 12:51:40	131	DISPUTE_REPLY_TIME_FOR_FREELANCER	1	dispute reply time for freelancer	checkbox	dispute reply time for freelancer	1	\N	t
586	2017-01-16 12:51:40	2017-01-16 12:51:40	131	DISPUTE_REPLY_TIME_FOR_EMPLOYER	1	dispute reply time for employer	checkbox	dispute reply time for employer	1	\N	t
594	2017-03-29 12:25:53	2017-03-29 12:25:53	4	IS_ENABLED_DUAL_REGISTER	1	On enabling this option, system will allow users to register both Employer and Freelancer	checkbox	Enable dual registration (Both Employer & Freelancer)	10	\N	t
536	2016-12-20 15:01:32	2016-12-20 15:01:32	129	PROJECT_IS_AUTO_APPROVE	0	On enabling this feature, the added project will be automatically approved.	checkbox	Enable Auto Approve	1	\N	t
543	2016-12-20 15:09:35	2016-12-20 15:09:35	129	PROJECT_COMMISSION_FROM_EMPLOYER_FOR_MILESTONE	10	This is the commission percentage which will be additionally taken from employer when paying milestone amount to escrow. e.g., The milestone amount is $100 and this commission is 5%, then employer will be pay $105. Set 0 or leave it blank for no commission from employer.	text	 Employer Commission Percentage for Milestone Payments (%)	1	\N	t
580	2017-01-06 13:25:36	2017-01-06 13:25:36	0	SERVICE_COMMISSION_FOR_SALE		This is the service commission for a sale . Leave blank for not need sale commission.	text	Reattempt duration	1	\N	f
544	2016-12-20 15:51:35	2016-12-20 15:51:35	129	PROJECT_COMMISSION_FROM_FREELANCER_FOR_MILESTONE	10	This is the commission percentage which will be taken from freelancer when milestone escrow release to freelancer account. e.g., The milestone amount is $100 and this commission is 10%, then freelancer will get $90. Set 0 or leave it blank for no commission from freelancer.	text	Freelancer Commission Percentage for Milestone Payments (%)	1	\N	t
588	2017-03-04 06:16:22	2017-03-04 06:16:22	129	PROJECT_COMMISSION_FROM_EMPLOYER_FOR_INVOICE	10	This is the commission percentage which will be additionally taken from employer when paying invoice amount. e.g., The invoice amount is $100 and this commission is 5%, then employer will be pay $105. Set 0 or leave it blank for no commission from employer.	text	 Employer Commission Percentage for Invoice Payments (%)	1	\N	t
589	2017-03-04 06:16:22	2017-03-04 06:16:22	129	PROJECT_COMMISSION_FROM_FREELANCER_FOR_INVOICE	10	This is the commission percentage which will be taken from freelancer when invoice payment received from employer. e.g., The invoice amount is $100 and this commission is 10%, then freelancer will get $90. Set 0 or leave it blank for no commission from freelancer.	text	 Freelancer Commission Percentage for Invoice Payments (%)	1	\N	t
554	2016-12-20 16:50:28	2016-12-20 16:50:28	129	PROJECT_IS_ALLOW_EMPLOYER_TO_CANCEL_PROJECT	1	By enabling this feature, employer can cancel his project in Open for Bidding stage.	checkbox	Enable Employer to Cancel the Project in Open Status	1	\N	t
530	2016-12-19 13:12:52	2016-12-19 13:12:52	128	MAX_NUMBER_OF_EXAM_PER_USER_PER_DAY	3	This is the maximum number, to allow a user to attempt exam per day. Leave blank for no limit. (Value should be greater than or equal to 1; Zero won't play here)	text	Maximum Number of Exam Can Attempt Per Day	1	\N	t
532	2016-12-19 13:21:38	2016-12-19 13:21:38	128	MAX_NUMBER_OF_TIME_USER_CAN_RECONTINUE	1	This is the maximum number, to allow freelancer to recontinue the particular same skill test. Leave blank for no limit. (This will play, if "Allow User to Recontinue the Skill Test?" enabled.)	text	Maximum Number of Time User Can Recontinue the Same Skill Test	1	\N	t
582	2016-12-19 12:51:40	2016-12-19 12:51:40	130	IS_ENABLED_CREDIT_POINT_CARRY_FORWARD	1	If we enable credit point to be carry forward	checkbox	If we enable credit point to be carry forward	1	\N	t
497	2016-11-28 11:29:32	2016-11-28 11:29:32	9	CONTEST_SITE_COMMISSION_TAKEN_DAYS	2	Site Commission will move to participant before mentioned days 	text	Site Commission will move to participant before mentioned days	11	\N	t
603	2017-05-18 11:29:32	2017-05-18 11:29:32	9	ALLOWED_MIME_TYPES_OF_IMAGE_CONTEST_ENTRY	image/jpeg,image/jpg,image/gif,image/png	 By changing this value allowed mimetype will be changed. System will validate user's file with this list. Leave it blank for no validation.	text	Allowed Contest entry MIME Types	5	\N	f
492	2016-11-28 11:29:32	2016-11-28 11:29:32	0	HOSTER_AUDIO_SERVICE	soundcloud		radio	Hoster Audio Service	15	soundcloud	f
488	2016-11-28 11:29:32	2016-11-28 11:29:32	133	WATERMARK_IMAGE	logo.png	Upload JPG, PNG or GIF image to be used as watermark. PNG images with transparency give the best results.	file	Watermark Image	13	\N	f
595	2017-05-18 12:17:27	2017-05-18 12:17:27	6	WITHDRAW_REQUEST_FEE_TYPE	Percentage	Type of withdraw request	options	Fee Type	3	Percentage,Fixed Fee	t
598	2017-05-18 12:17:27	2017-05-18 12:17:27	4	ALLOWED_MIME_TYPES_OF_USER_AVATAR	image/jpeg,image/jpg,image/gif,image/png	By changing this value allowed mimetype will be changed. System will validate user's file with this list. Leave it blank for no validation.\n	text	Allowed User Avatar MIME Types	6	\N	f
599	2017-05-18 12:17:27	2017-05-18 12:17:27	4	ALLOWED_EXTENSIONS_OF_USER_AVATAR	jpg,jpeg,gif,png	By changing this value allowed extension will be changed. This will only display in user end near browse file button.	text	Allowed User Avatar File extension	7	\N	t
597	2017-05-18 12:17:27	2017-05-18 12:17:27	4	MAX_UPLOAD_SIZE_OF_USER_AVATAR	2	By changing this value allowed user avatar size will be changed. (In MB). Leave it blank for no validation.	text	Max User Avatar File Size Limitation	5	\N	f
600	2017-05-18 16:03:45	2017-05-18 16:03:45	129	MAX_UPLOAD_SIZE_FOR_PROJECT_DOCUMENT_FILE	2	By changing this value allowed project documentsize will be changed. (In MB). Leave it blank for no validation.	text	Max Project Document File Size Limitation	15	\N	f
604	2017-05-18 11:29:32	2017-05-18 11:29:32	9	ALLOWED_EXTENSIONS_OF_IMAGE_CONTEST_ENTRY	jpg,jpeg,gif,png	By changing this value allowed extension will be changed. This will only display in user end near browse file button.	text	Allowed Contest entry File extension	5	\N	t
605	2017-05-18 11:29:32	2017-05-18 11:29:32	11	MAX_UPLOAD_SIZE_OF_SERVICE_PHOTO	2	By changing this value allowed service image size will be changed. (In MB). Leave it blank for no validation.	text	Max service File Size Limitation	1	\N	f
606	2017-05-18 11:29:32	2017-05-18 11:29:32	11	ALLOWED_MIME_TYPES_OF_SERVICE_PHOTO	image/jpeg,image/jpg,image/gif,image/png	By changing this value allowed service image size will be changed. (In MB). Leave it blank for no validation.	text	Allowed Service MIME Types	2	\N	f
607	2017-05-18 11:29:32	2017-05-18 11:29:32	11	ALLOWED_EXTENSIONS_OF_SERVICE_PHOTO	jpg,jpeg,gif,png	By changing this value allowed extension will be changed. This will only display in user end near browse file button.	text	Allowed Service File extension	3	\N	t
608	2017-05-18 11:29:32	2017-05-18 11:29:32	10	MAX_UPLOAD_SIZE_OF_RESUME_FOR_JOB_APPLY	2	By changing this value allowed resume size will be changed. (In MB). Leave it blank for no validation.	text	Max Resume File Size Limitation	5	\N	f
609	2017-05-18 11:29:32	2017-05-18 11:29:32	10	ALLOWED_MIME_TYPES_OF_RESUME_FOR_JOB_APPLY	application/msword,application/pdf,text/plain,application/rtf,application/x-rtf,text/richtext	By changing this value allowed mimetype will be changed. System will validate user's file with this list. Leave it blank for no validation.	text	Allowed Resume MIME Types	6	\N	f
610	2017-05-18 11:29:32	2017-05-18 11:29:32	10	ALLOWED_EXTENSIONS_OF_RESUME_FOR_JOB_APPLY	doc,docx,pdf,txt,rtf,docm,dot	By changing this value allowed extension will be changed. This will only display in user end near browse file button.	text	Allowed Resume File extension	7	\N	t
611	2017-05-18 11:29:32	2017-05-18 11:29:32	10	ALLOWED_EXTENSIONS_OF_JOB_IMAGE	jpg,jpeg,gif,png	By changing this value allowed extension will be changed. This will only display in user end near browse file button.	text	Allowed Job File extension	7	\N	t
612	2017-05-18 11:29:32	2017-05-18 11:29:32	10	ALLOWED_MIME_TYPES_OF_JOB_IMAGE	image/jpeg,image/jpg,image/gif,image/png	By changing this value allowed mimetype will be changed. System will validate user's file with this list. Leave it blank for no validation.	text	Allowed Job MIME Types	7	\N	f
613	2017-05-18 11:29:32	2017-05-18 11:29:32	10	MAX_UPLOAD_SIZE_OF_JOB_IMAGE	2	By changing this value allowed entry image size will be changed. (In MB). Leave it blank for no validation.	text	Max Job File Size Limitation	8	\N	f
614	2017-05-18 11:29:32	2017-05-18 11:29:32	132	MAX_UPLOAD_SIZE_OF_PORTFOLIO	2	By changing this value allowed Portfolio image size will be changed. (In MB). Leave it blank for no validation.	text	Max Portfolio File Size Limitation	1	\N	f
615	2017-05-18 11:29:32	2017-05-18 11:29:32	132	ALLOWED_MIME_TYPES_OF_PORTFOLIO	image/jpeg,image/jpg,image/gif,image/png	By changing this value allowed mimetype will be changed. System will validate user's file with this list. Leave it blank for no validation.	text	Allowed Portfolio MIME Types	2	\N	f
616	2017-05-18 11:29:32	2017-05-18 11:29:32	132	ALLOWED_EXTENSIONS_OF_PORTFOLIO	jpg,jpeg,gif,png	By changing this value allowed extension will be changed. This will only display in user end near browse file button.	text	Allowed Portfolio File extension	3	\N	t
619	2017-05-19 11:29:32	2017-05-19 11:29:32	11	TIME_LIMIT_AFTER_OTHER_PROVIDER_GET_QUOTE_REQUEST	24	After this time limit other provider receive quote requests	text	Time Limit After Other Provider Getting Quote Request (In hours)	3		f
620	2017-05-19 11:29:32	2017-05-19 11:29:32	11	QUOTE_VISIBLE_LIMIT	5	This is the count for maximum number of quotes can view particular time period. e.g., If we set 5, requestor can see only first 5 quotes. Other provider Quotes will be visible after following time period.	text	Quote Visible Limit	4		t
621	2017-05-19 11:29:32	2017-05-19 11:29:32	11	TIME_LIMIT_AFTER_OTHER_PROVIDERS_QUOTE_VISIBLE_TO_REQUESTOR	24	After this time period requestor can see other providers quotes	text	Time Limit After Other Provider's Quote visible to Requestor (In hours)	5		t
622	2017-05-22 11:29:32	2017-05-22 11:29:32	0	ALLOWED_SERVICE_LOCATIONS	\N	Allowed countries or cities in services	text	Allowed service location	2	\N	t
623	2017-05-22 11:29:32	2017-05-22 11:29:32	1	CAPTCHA_TYPE	Normal		options	Captcha Type	17	Normal,Google reCAPTCHA	t
618	2017-05-19 11:29:32	2017-05-19 11:29:32	11	QUOTE_REQUEST_SENDING_RATING_UPTO	3	This is the average rating of service provider to getting quote request when new quote request posted.	text	Quote Request Send Upto	2		f
574	2017-01-03 06:16:22	2017-01-03 06:16:22	0	SITE_ENABLED_PLUGINS	Common/Wallet,Common/Withdrawal,Common/UserFollow,Bidding/Bidding,Bidding/BiddingReview,Bidding/Dispute,Bidding/Exam,Bidding/Invoice,Bidding/Milestone,Bidding/ProjectFlag,Bidding/ProjectFollow,Common/UserFlag,Common/PaypalREST	\N	text	Site Plugin	1	\N	t
602	2017-05-18 16:03:45	2017-05-18 16:03:45	129	ALLOWED_EXTENSIONS_FOR_PROJECT_DOCUMENT_FILE	pdf,doc,docx,png,jpeg,csv	By changing this value allowed extension will be changed. This will only display in user end near browse file button.	text	Allowed Project Document File extension	17	\N	t
601	2017-05-18 16:03:45	2017-05-18 16:03:45	129	ALLOWED_MIME_TYPES_FOR_PROJECT_DOCUMENT_FILE	application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,text/plain,image/jpeg,image/png	By changing this value allowed mimetype will be changed. System will validate user's file with this list. Leave it blank for no validation.	text	Allowed Project Document MIME Types	16	\N	f
617	2017-05-19 11:29:32	2017-05-19 11:29:32	11	SENDING_QUOTE_REQUEST_FLOW_TYPE	Send to All Relevant Service Provider	When run with "Send to All Relevant Service Provider", system will send quote request to all relevant service providers at a time. When run with "Rating Basis", system will send quote request to relevant service provider by rating basis. If we set as "Quote Request Send Upto" 3 mean, only greater or equal to 3 rating service provider's can got the quote requests. After "Time Limit After Other Provider Getting Quote Request" system will send quote request to other provider. If we set as "Limited Quote Per Limited Period" mean, system will quote request to all relevent service provider at a time. But only quote requestor can see limited quotes in particular period. After that period, requestor can see all quotes. We can set limit in "Quote Visible Limit" and time period in "Time Limit After Other Provider's Quote visible to Requestor".	select	Quote Request Sending Type	1	Send to All Relevant Service Provider,Rating Basis,Limited Quote Per Limited Period	t
502	2016-12-01 18:35:48	2016-12-01 18:35:48	10	FEATURED_FEE_FOR_JOB	5	This is the job fee for listing job under featured category.	text	Featured Job	4	\N	t
499	2016-12-01 18:35:48	2016-12-01 18:35:48	10	IS_NEED_ADMIN_APPROVAL_FOR_NEW_JOBS	0	On enabling this feature, the added job will be automatically approved.	checkbox	Enable Auto Approve for Job	1	\N	t
624	2017-07-20 12:24:36	2017-07-20 12:24:36	10	JOB_VALIDITY_DAY	60	The validity of job posting from the day of posting. After reaching this day, system makes it as expired job. (Note: before this date, employer can also Mark as Archived this job post). Leave it blank for no limitation. 	text	Job Validity Days	1	\N	t
528	2016-12-19 13:06:01	2016-12-19 13:06:01	0	IS_ENABLED_EXPIRE_TIME_FOR_EXAM	0	If we enable \\\\"Allow User to re-continue the skill test?\\\\", we can specify an expiry time for the skill test in add and edit the form. <br /> E.g., Let's take the test duration is 30 minutes and we shall mention 15 minutes as an expiry time. If the user gets disconnected, he can \\\\"Re-continue\\\\" the test and \\\\"Answer the questions\\\\" but he will get the remaining time of partially completed test. <br /><br />\\n\\nE.g. #1: A user starts the exam at 11:00 AM and takes a 10 minute break after 11:10 AM. Again, they restarted it by 11:20  AM. After calculating the disconnected time and the partially completed test timings a find out the remaining test time (says 20 minutes and 5 minutes of expiry time is left out). The system will display the remaining time for completing the examination. <br /><br />\\n\\nE.g. #2: User starts the exam at 11:00 AM and he disconnects from 11:10 AM. Again, they restarted the test by 11:30 AM (20 minutes break). So the system displays the remaining test time 15 minutes for the completion of the test. As he has an expiry time of 15 minutes and also he took 5 minutes extra break time. In that case, he lost 5 minutes of his exam time. In total, the remaining time left for the completion of exam is just 15 minutes.<br /><br />\\n\\nNote: If we give more time, they may try any kinds of irregular activities. If it is disabled, users can re-continue the exam but no grace time will be given and will not get any compensation for his lost time. 	checkbox	Enable Expire Time Setting?	1	\N	f
625	2017-12-19 12:25:53	2017-12-19 12:25:53	3	SITE_AVAILABLE_LANGUAGES	en,fr	The listed languages will be displayed in the drop-down menu to switch language in Front End.	text	Site Available languages	2	\N	t
11	2016-05-30 12:25:53	2016-05-30 12:25:53	3	SITE_LANGUAGE	en	The selected language will be used as default language all over the site.	text	Site language 	1	\N	t
626	2017-06-13 13:27:25	2017-06-13 13:27:25	1	SITE_TIMEZONE	+0200	This is the site timezone that will used for all the time displaying.	text	Site Timezone	19	\N	t
\.


--
-- Name: settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('settings_id_seq', 625, true);


--
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: -
--

COPY skills (id, created_at, updated_at, name, slug, project_count, user_count, open_project_count, is_active, active_job_count, job_count) FROM stdin;
8	2011-08-17 07:30:49	2012-01-27 06:23:25	Ajax	ajax	0	0	0	t	0	0
5	2011-08-17 07:30:29	2012-04-12 05:53:41	Php	php	0	0	0	t	0	0
6	2011-08-17 07:30:39	2012-04-12 05:54:58	MySql	mysql	0	0	0	t	0	0
11	2011-08-17 07:34:11	2012-04-12 05:54:54	joomla	joomla	0	0	0	t	0	0
12	2011-08-17 07:34:43	2012-04-12 05:54:51	drupal	drupal	0	0	0	t	0	0
17	2011-09-06 10:05:35	2012-04-12 05:54:42	Programming	programming	0	0	0	t	0	0
18	2011-09-06 10:06:06	2012-04-12 05:54:40	Web Programming	web-programming	0	0	0	t	0	0
19	2011-09-06 10:06:26	2012-04-12 05:54:37	Database Designing	database-designing	0	0	0	t	0	0
20	2011-09-06 10:08:13	2012-04-12 05:54:35	iPhone	iphone	0	0	0	t	0	0
23	2011-09-06 10:09:36	2012-04-12 05:55:26	CMS Programming	cms-programming	0	0	0	t	0	0
24	2011-09-06 10:10:03	2011-09-28 12:58:26	Documentation	documentation	0	0	0	f	0	0
26	2012-02-24 12:23:08	2013-09-25 13:16:17	DOT.NET	dot-net	0	0	0	t	0	0
27	2014-04-17 15:12:00	2014-04-17 15:12:56	Communication	communication	0	0	0	t	0	0
28	2014-04-17 15:13:26	2014-04-17 15:13:26	Fluent English	fluent-english	0	0	0	t	0	0
30	2014-04-17 15:45:37	2014-04-17 15:45:37	SEO	seo	0	0	0	t	0	0
35	2014-04-25 15:20:28	2014-04-25 15:20:28	OO JS	oo-js	0	0	0	t	0	0
38	2014-04-25 15:21:26	2014-04-25 15:21:26	Grunt	grunt	0	0	0	t	0	0
22	2011-09-06 10:09:19	2017-04-29 13:06:22	3D Animation	3d-animation	0	0	0	t	0	0
39	2017-04-29 16:33:15	2017-04-29 13:08:56	Sales	sales	0	0	0	t	0	0
40	2017-04-29 16:33:35	2017-04-29 13:08:57	CRM	crm	0	0	0	t	0	0
29	2014-04-17 15:39:19	2017-04-29 13:13:30	tally	tally	0	0	0	t	0	0
41	2017-04-29 13:23:38	2017-04-29 13:23:38	Graphic-Design	graphic-design	0	0	0	t	0	0
42	2017-04-29 13:28:19	2017-04-29 13:28:19	Flash-Designing	flash-designing	0	0	0	t	0	0
43	2017-04-29 13:31:18	2017-04-29 13:31:18	Flyer-Design	flyer-design	0	0	0	t	0	0
44	2017-04-29 13:32:27	2017-04-29 13:32:27	3D-Design	3d-design	0	0	0	t	0	0
31	2014-04-17 16:04:19	2017-04-29 12:55:07	Graphic Design	graphic-design	0	0	0	t	0	0
21	2011-09-06 10:08:57	2017-04-29 12:55:07	Flash Designing	flash-designing	0	0	0	t	0	0
32	2014-04-17 16:04:33	2017-04-29 12:55:07	3D Design	3d-design	0	0	0	t	0	0
13	2011-08-17 07:35:43	2017-04-29 12:58:07	Html	html	0	0	0	t	0	0
16	2011-08-17 07:39:48	2017-04-29 12:58:08	XHtml	xhtml	0	0	0	t	0	0
37	2014-04-25 15:21:15	2017-04-29 12:58:08	LESS	less	0	0	0	t	0	0
36	2014-04-25 15:20:44	2017-04-29 13:01:31	bootstrap	bootstrap	0	0	0	t	0	0
14	2011-08-17 07:35:51	2017-04-29 13:01:31	CSS	css	0	0	0	t	0	0
33	2014-04-17 16:05:00	2017-04-29 13:01:31	Flyer Design	flyer-design	0	0	0	t	0	0
34	2014-04-25 15:20:09	2017-04-29 13:01:31	AngularJS	angularjs	0	0	0	t	0	0
9	2011-08-17 07:31:11	2017-04-29 13:01:31	jquery	jquery	0	0	0	t	0	0
\.


--
-- Name: skills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('skills_id_seq', 44, true);


--
-- Data for Name: skills_portfolios; Type: TABLE DATA; Schema: public; Owner: -
--

COPY skills_portfolios (id, portfolio_id, skill_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: skills_portfolios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('skills_portfolios_id_seq', 16, true);


--
-- Data for Name: skills_projects; Type: TABLE DATA; Schema: public; Owner: -
--

COPY skills_projects (id, project_id, skill_id) FROM stdin;
\.


--
-- Name: skills_projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('skills_projects_id_seq', 30, true);


--
-- Data for Name: skills_users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY skills_users (id, user_id, skill_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: skills_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('skills_users_id_seq', 38, true);


--
-- Data for Name: states; Type: TABLE DATA; Schema: public; Owner: -
--

COPY states (id, country_id, name, code, adm1code, is_active, created_at, updated_at) FROM stdin;
\.


--
-- Name: states_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('states_id_seq', 5507, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('tags_id_seq', 1, false);


--
-- Data for Name: timezones; Type: TABLE DATA; Schema: public; Owner: -
--

COPY timezones (id, created_at, updated_at, code, name, gmt_offset, dst_offset, raw_offset, hasdst) FROM stdin;
1	2010-05-10 20:13:09	2010-05-10 20:13:09	Pacific/Apia	(GMT-11:00) Apia	-10.0	-11.0	-11.0	t
2	2010-05-10 20:13:09	2010-05-10 20:13:09	Pacific/Midway	(GMT-11:00) Midway	-11.0	-11.0	-11.0	f
3	2010-05-10 20:13:09	2010-05-10 20:13:09	Pacific/Niue	(GMT-11:00) Niue	-11.0	-11.0	-11.0	f
4	2010-05-10 20:13:09	2010-05-10 20:13:09	Pacific/Pago_Pago	(GMT-11:00) Pago Pago	-11.0	-11.0	-11.0	f
5	2010-05-10 20:13:09	2010-05-10 20:13:09	Pacific/Fakaofo	(GMT-10:00) Fakaofo	-10.0	-10.0	-10.0	f
6	2010-05-10 20:13:09	2010-05-10 20:13:09	Pacific/Honolulu	(GMT-10:00) Hawaii Time	-10.0	-10.0	-10.0	f
7	2010-05-10 20:13:09	2010-05-10 20:13:09	Pacific/Johnston	(GMT-10:00) Johnston	-10.0	-10.0	-10.0	f
8	2010-05-10 20:13:09	2010-05-10 20:13:09	Pacific/Rarotonga	(GMT-10:00) Rarotonga	-10.0	-10.0	-10.0	f
9	2010-05-10 20:13:09	2010-05-10 20:13:09	Pacific/Tahiti	(GMT-10:00) Tahiti	-10.0	-10.0	-10.0	f
10	2010-05-10 20:13:10	2010-05-10 20:13:10	Pacific/Marquesas	(GMT-09:30) Marquesas	-9.5	-9.5	-9.5	f
11	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Anchorage	(GMT-09:00) Alaska Time	-9.0	-8.0	-9.0	t
12	2010-05-10 20:13:10	2010-05-10 20:13:10	Pacific/Gambier	(GMT-09:00) Gambier	-9.0	-9.0	-9.0	f
13	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Los_Angeles	(GMT-08:00) Pacific Time	-8.0	-7.0	-8.0	t
14	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Tijuana	(GMT-08:00) Pacific Time - Tijuana	-8.0	-7.0	-8.0	t
15	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Vancouver	(GMT-08:00) Pacific Time - Vancouver	-8.0	-7.0	-8.0	t
16	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Whitehorse	(GMT-08:00) Pacific Time - Whitehorse	-8.0	-7.0	-8.0	t
17	2010-05-10 20:13:10	2010-05-10 20:13:10	Pacific/Pitcairn	(GMT-08:00) Pitcairn	-8.0	-8.0	-8.0	f
18	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Dawson_Creek	(GMT-07:00) Mountain Time - Dawson Creek	-7.0	-7.0	-7.0	f
19	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Denver	(GMT-07:00) Mountain Time (America/Denver)	-7.0	-6.0	-7.0	t
20	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Edmonton	(GMT-07:00) Mountain Time - Edmonton	-7.0	-6.0	-7.0	t
21	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Hermosillo	(GMT-07:00) Mountain Time - Hermosillo	-7.0	-7.0	-7.0	f
22	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Mazatlan	(GMT-07:00) Mountain Time - Chihuahua, Mazatlan	-7.0	-6.0	-7.0	t
23	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Phoenix	(GMT-07:00) Mountain Time - Arizona	-7.0	-7.0	-7.0	f
24	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Yellowknife	(GMT-07:00) Mountain Time - Yellowknife	-7.0	-6.0	-7.0	t
25	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Belize	(GMT-06:00) Belize	-6.0	-6.0	-6.0	f
26	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Chicago	(GMT-06:00) Central Time	-6.0	-5.0	-6.0	t
27	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Costa_Rica	(GMT-06:00) Costa Rica	-6.0	-6.0	-6.0	f
28	2010-05-10 20:13:10	2010-05-10 20:13:10	America/El_Salvador	(GMT-06:00) El Salvador	-6.0	-6.0	-6.0	f
29	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Guatemala	(GMT-06:00) Guatemala	-6.0	-6.0	-6.0	f
30	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Managua	(GMT-06:00) Managua	-6.0	-6.0	-6.0	f
31	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Mexico_City	(GMT-06:00) Central Time - Mexico City	-6.0	-5.0	-6.0	t
32	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Regina	(GMT-06:00) Central Time - Regina	-6.0	-6.0	-6.0	f
33	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Tegucigalpa	(GMT-06:00) Central Time (America/Tegucigalpa)	-6.0	-6.0	-6.0	f
34	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Winnipeg	(GMT-06:00) Central Time - Winnipeg	-6.0	-5.0	-6.0	t
35	2010-05-10 20:13:10	2010-05-10 20:13:10	Pacific/Easter	(GMT-06:00) Easter Island	-6.0	-5.0	-6.0	t
36	2010-05-10 20:13:10	2010-05-10 20:13:10	Pacific/Galapagos	(GMT-06:00) Galapagos	-6.0	-6.0	-6.0	f
37	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Bogota	(GMT-05:00) Bogota	-5.0	-5.0	-5.0	f
38	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Cayman	(GMT-05:00) Cayman	-5.0	-4.0	-5.0	t
39	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Grand_Turk	(GMT-05:00) Grand Turk	-5.0	-4.0	-5.0	t
40	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Guayaquil	(GMT-05:00) Guayaquil	-5.0	-5.0	-5.0	f
41	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Havana	(GMT-05:00) Havana	-5.0	-4.0	-5.0	t
42	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Iqaluit	(GMT-05:00) Eastern Time - Iqaluit	-5.0	-4.0	-5.0	t
43	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Jamaica	(GMT-05:00) Jamaica	-5.0	-5.0	-5.0	f
44	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Lima	(GMT-05:00) Lima	-5.0	-5.0	-5.0	f
45	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Montreal	(GMT-05:00) Eastern Time - Montreal	-5.0	-4.0	-5.0	t
46	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Nassau	(GMT-05:00) Nassau	-5.0	-4.0	-5.0	t
47	2010-05-10 20:13:10	2010-05-10 20:13:10	America/New_York	(GMT-05:00) Eastern Time	-5.0	-4.0	-5.0	t
48	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Panama	(GMT-05:00) Panama	-5.0	-5.0	-5.0	f
49	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Port-au-Prince	(GMT-05:00) Port-au-Prince	-5.0	-5.0	-5.0	f
50	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Toronto	(GMT-05:00) Eastern Time - Toronto	-5.0	-4.0	-5.0	t
51	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Caracas	(GMT-04:30) Caracas	-4.5	-4.5	-4.5	f
52	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Anguilla	(GMT-04:00) Anguilla	-4.0	-4.0	-4.0	f
53	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Antigua	(GMT-04:00) Antigua	-4.0	-4.0	-4.0	f
54	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Aruba	(GMT-04:00) Aruba	-4.0	-4.0	-4.0	f
55	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Asuncion	(GMT-04:00) Asuncion	-3.0	-4.0	-4.0	t
56	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Barbados	(GMT-04:00) Barbados	-4.0	-4.0	-4.0	f
57	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Boa_Vista	(GMT-04:00) Boa Vista	-4.0	-4.0	-4.0	f
58	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Campo_Grande	(GMT-04:00) Campo Grande	-3.0	-4.0	-4.0	f
59	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Cuiaba	(GMT-04:00) Cuiaba	-3.0	-4.0	-4.0	t
60	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Curacao	(GMT-04:00) Curacao	-4.0	-4.0	-4.0	f
61	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Dominica	(GMT-04:00) Dominica	-4.0	-4.0	-4.0	f
62	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Grenada	(GMT-04:00) Grenada	-4.0	-4.0	-4.0	f
63	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Guadeloupe	(GMT-04:00) Guadeloupe	-4.0	0.0	-4.0	t
64	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Guyana	(GMT-04:00) Guyana	-4.0	-4.0	-4.0	f
65	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Halifax	(GMT-04:00) Atlantic Time - Halifax	0.0	1.0	0.0	t
66	2010-05-10 20:13:10	2010-05-10 20:13:10	America/La_Paz	(GMT-04:00) La Paz	-4.0	-4.0	-4.0	f
67	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Manaus	(GMT-04:00) Manaus	-4.0	-4.0	-4.0	f
68	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Martinique	(GMT-04:00) Martinique	-4.0	-4.0	-4.0	f
69	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Montserrat	(GMT-04:00) Montserrat	-4.0	-4.0	-4.0	f
70	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Port_of_Spain	(GMT-04:00) Port of Spain	-4.0	-4.0	-4.0	f
225	2010-05-10 20:13:12	2010-05-10 20:13:12	Indian/Reunion	(GMT+04:00) Reunion	4.0	4.0	4.0	f
71	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Porto_Velho	(GMT-04:00) Porto Velho	-4.0	-4.0	-4.0	f
72	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Puerto_Rico	(GMT-04:00) Puerto Rico	-4.0	-4.0	-4.0	f
73	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Rio_Branco	(GMT-04:00) Rio Branco				f
74	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Santiago	(GMT-04:00) Santiago	-3.0	-4.0	-4.0	t
75	2010-05-10 20:13:10	2010-05-10 20:13:10	America/Santo_Domingo	(GMT-04:00) Santo Domingo	-4.0	-4.0	-4.0	f
76	2010-05-10 20:13:10	2010-05-10 20:13:10	America/St_Kitts	(GMT-04:00) St. Kitts	-4.0	-4.0	-4.0	f
77	2010-05-10 20:13:10	2010-05-10 20:13:10	America/St_Lucia	(GMT-04:00) St. Lucia	-4.0	-4.0	-4.0	f
78	2010-05-10 20:13:10	2010-05-10 20:13:10	America/St_Thomas	(GMT-04:00) St. Thomas	-4.0	-4.0	-4.0	f
79	2010-05-10 20:13:10	2010-05-10 20:13:10	America/St_Vincent	(GMT-04:00) St. Vincent	-4.0	-4.0	-4.0	f
80	2010-05-10 20:13:11	2010-05-10 20:13:11	America/Thule	(GMT-04:00) Thule	11.0	10.0	10.0	t
81	2010-05-10 20:13:11	2010-05-10 20:13:11	America/Tortola	(GMT-04:00) Tortola	-4.0	-4.0	-4.0	f
82	2010-05-10 20:13:11	2010-05-10 20:13:11	Antarctica/Palmer	(GMT-04:00) Palmer	1.0	2.0	1.0	t
83	2010-05-10 20:13:11	2010-05-10 20:13:11	Atlantic/Bermuda	(GMT-04:00) Bermuda	-4.0	-3.0	-4.0	t
84	2010-05-10 20:13:11	2010-05-10 20:13:11	Atlantic/Stanley	(GMT-04:00) Stanley	11.0	10.0	10.0	t
85	2010-05-10 20:13:11	2010-05-10 20:13:11	America/St_Johns	(GMT-03:30) Newfoundland Time - St. Johns	-3.5	-2.5	-3.5	t
86	2010-05-10 20:13:11	2010-05-10 20:13:11	America/Araguaina	(GMT-03:00) Araguaina	-3.0	-3.0	-3.0	f
87	2010-05-10 20:13:11	2010-05-10 20:13:11	America/Argentina/Buenos_Aires	(GMT-03:00) Buenos Aires	-3.0	-3.0	-3.0	f
88	2010-05-10 20:13:11	2010-05-10 20:13:11	America/Bahia	(GMT-03:00) Salvador	-3.0	-3.0	-3.0	f
89	2010-05-10 20:13:11	2010-05-10 20:13:11	America/Belem	(GMT-03:00) Belem	-3.0	-3.0	-3.0	f
90	2010-05-10 20:13:11	2010-05-10 20:13:11	America/Cayenne	(GMT-03:00) Cayenne	-3.0	-3.0	-3.0	f
91	2010-05-10 20:13:11	2010-05-10 20:13:11	America/Fortaleza	(GMT-03:00) Fortaleza	-3.0	-3.0	-3.0	f
92	2010-05-10 20:13:11	2010-05-10 20:13:11	America/Godthab	(GMT-03:00) Godthab	-3.0	-2.0	-3.0	t
93	2010-05-10 20:13:11	2010-05-10 20:13:11	America/Maceio	(GMT-03:00) Maceio	-3.0	-3.0	-3.0	f
94	2010-05-10 20:13:11	2010-05-10 20:13:11	America/Miquelon	(GMT-03:00) Miquelon	-3.0	-2.0	-3.0	t
95	2010-05-10 20:13:11	2010-05-10 20:13:11	America/Montevideo	(GMT-03:00) Montevideo	-2.0	-3.0	-3.0	t
96	2010-05-10 20:13:11	2010-05-10 20:13:11	America/Paramaribo	(GMT-03:00) Paramaribo	-3.0	-3.0	-3.0	f
97	2010-05-10 20:13:11	2010-05-10 20:13:11	America/Recife	(GMT-03:00) Recife	-3.0	-3.0	-3.0	f
98	2010-05-10 20:13:11	2010-05-10 20:13:11	America/Sao_Paulo	(GMT-03:00) Sao Paulo	-2.0	-3.0	-3.0	f
99	2010-05-10 20:13:11	2010-05-10 20:13:11	Antarctica/Rothera	(GMT-03:00) Rothera	-3.0	-3.0	-3.0	f
100	2010-05-10 20:13:11	2010-05-10 20:13:11	America/Noronha	(GMT-02:00) Noronha	-2.0	-3.0	-3.0	t
101	2010-05-10 20:13:11	2010-05-10 20:13:11	Atlantic/South_Georgia	(GMT-02:00) South Georgia	-2.0	-2.0	-2.0	f
102	2010-05-10 20:13:11	2010-05-10 20:13:11	America/Scoresbysund	(GMT-01:00) Scoresbysund	-1.0	0.0	-1.0	t
103	2010-05-10 20:13:11	2010-05-10 20:13:11	Atlantic/Azores	(GMT-01:00) Azores	-1.0	0.0	-1.0	t
104	2010-05-10 20:13:11	2010-05-10 20:13:11	Atlantic/Cape_Verde	(GMT-01:00) Cape Verde	-1.0	-0.0	-1.0	f
105	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Abidjan	(GMT+00:00) Abidjan	0.0	0.0	0.0	f
106	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Accra	(GMT+00:00) Accra	0.0	0.0	0.0	f
107	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Bamako	(GMT+00:00) Bamako	0.0	0.0	0.0	f
108	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Banjul	(GMT+00:00) Banjul	0.0	0.0	0.0	f
109	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Bissau	(GMT+00:00) Bissau	0.0	0.0	0.0	f
110	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Casablanca	(GMT+00:00) Casablanca	0.0	0.0	0.0	f
111	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Conakry	(GMT+00:00) Conakry	0.0	0.0	0.0	f
112	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Dakar	(GMT+00:00) Dakar	0.0	0.0	0.0	f
113	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/El_Aaiun	(GMT+00:00) El Aaiun	0.0	0.0	0.0	f
114	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Freetown	(GMT+00:00) Freetown	0.0	0.0	0.0	f
115	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Lome	(GMT+00:00) Lome	0.0	0.0	0.0	f
116	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Monrovia	(GMT+00:00) Monrovia	0.0	0.0	0.0	f
117	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Nouakchott	(GMT+00:00) Nouakchott	0.0	0.0	0.0	f
118	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Ouagadougou	(GMT+00:00) Ouagadougou	0.0	0.0	0.0	f
119	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Sao_Tome	(GMT+00:00) Sao Tome	0.0	0.0	0.0	f
120	2010-05-10 20:13:11	2010-05-10 20:13:11	America/Danmarkshavn	(GMT+00:00) Danmarkshavn	0.0	0.0	0.0	f
121	2010-05-10 20:13:11	2010-05-10 20:13:11	Atlantic/Canary	(GMT+00:00) Canary Islands				f
122	2010-05-10 20:13:11	2010-05-10 20:13:11	Atlantic/Faroe	(GMT+00:00) Faeroe	1.0	2.0	1.0	t
123	2010-05-10 20:13:11	2010-05-10 20:13:11	Atlantic/Reykjavik	(GMT+00:00) Reykjavik	0.0	0.0	0.0	f
124	2010-05-10 20:13:11	2010-05-10 20:13:11	Atlantic/St_Helena	(GMT+00:00) St Helena	-1.0	0.0	-1.0	f
125	2010-05-10 20:13:11	2010-05-10 20:13:11	Etc/GMT	(GMT+00:00) GMT (no daylight saving)	0.0	0.0	0.0	f
126	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Dublin	(GMT+00:00) Dublin	0.0	1.0	0.0	t
127	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Lisbon	(GMT+00:00) Lisbon	0.0	1.0	0.0	t
128	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/London	(GMT+00:00) London	0.0	1.0	0.0	t
129	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Algiers	(GMT+01:00) Algiers	1.0	1.0	1.0	f
130	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Bangui	(GMT+01:00) Bangui	1.0	1.0	1.0	f
131	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Brazzaville	(GMT+01:00) Brazzaville	1.0	1.0	1.0	f
132	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Ceuta	(GMT+01:00) Ceuta	1.0	2.0	1.0	t
133	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Douala	(GMT+01:00) Douala	1.0	1.0	1.0	f
134	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Kinshasa	(GMT+01:00) Kinshasa	1.0	1.0	1.0	f
135	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Lagos	(GMT+01:00) Lagos	1.0	1.0	1.0	f
136	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Libreville	(GMT+01:00) Libreville	1.0	1.0	1.0	f
137	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Luanda	(GMT+01:00) Luanda	1.0	1.0	1.0	f
138	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Malabo	(GMT+01:00) Malabo	1.0	1.0	1.0	f
139	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Ndjamena	(GMT+01:00) Ndjamena	1.0	1.0	1.0	f
140	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Niamey	(GMT+01:00) Niamey	1.0	1.0	1.0	f
141	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Porto-Novo	(GMT+01:00) Porto-Novo	1.0	1.0	1.0	f
142	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Tunis	(GMT+01:00) Tunis	1.0	2.0	1.0	t
143	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Windhoek	(GMT+01:00) Windhoek	2.0	1.0	1.0	t
144	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Amsterdam	(GMT+01:00) Amsterdam	1.0	2.0	1.0	t
145	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Andorra	(GMT+01:00) Andorra	1.0	2.0	1.0	t
224	2010-05-10 20:13:12	2010-05-10 20:13:12	Indian/Mauritius	(GMT+04:00) Mauritius	4.0	4.0	4.0	f
146	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Belgrade	(GMT+01:00) Central European Time (Europe/Belgrade)	1.0	2.0	1.0	t
147	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Berlin	(GMT+01:00) Berlin	1.0	2.0	1.0	t
148	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Brussels	(GMT+01:00) Brussels	1.0	2.0	1.0	t
149	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Budapest	(GMT+01:00) Budapest	1.0	2.0	1.0	t
150	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Copenhagen	(GMT+01:00) Copenhagen	1.0	2.0	1.0	t
151	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Gibraltar	(GMT+01:00) Gibraltar	1.0	2.0	1.0	t
152	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Luxembourg	(GMT+01:00) Luxembourg	1.0	2.0	1.0	t
153	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Madrid	(GMT+01:00) Madrid	1.0	2.0	1.0	t
154	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Malta	(GMT+01:00) Malta	1.0	2.0	1.0	t
155	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Monaco	(GMT+01:00) Monaco	1.0	2.0	1.0	t
156	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Oslo	(GMT+01:00) Oslo	1.0	2.0	1.0	t
157	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Paris	(GMT+01:00) Paris	1.0	2.0	1.0	t
158	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Prague	(GMT+01:00) Central European Time (Europe/Prague)	1.0	2.0	1.0	t
159	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Rome	(GMT+01:00) Rome	1.0	2.0	1.0	t
160	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Stockholm	(GMT+01:00) Stockholm	1.0	2.0	1.0	t
161	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Tirane	(GMT+01:00) Tirane	1.0	2.0	1.0	t
162	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Vaduz	(GMT+01:00) Vaduz	1.0	2.0	1.0	t
163	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Vienna	(GMT+01:00) Vienna	1.0	2.0	1.0	t
164	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Warsaw	(GMT+01:00) Warsaw	1.0	2.0	1.0	t
165	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Zurich	(GMT+01:00) Zurich	1.0	2.0	1.0	t
166	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Blantyre	(GMT+02:00) Blantyre	2.0	2.0	2.0	f
167	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Bujumbura	(GMT+02:00) Bujumbura	2.0	2.0	2.0	f
168	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Cairo	(GMT+02:00) Cairo	2.0	3.0	2.0	t
169	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Gaborone	(GMT+02:00) Gaborone	2.0	2.0	2.0	f
170	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Harare	(GMT+02:00) Harare	2.0	2.0	2.0	f
171	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Johannesburg	(GMT+02:00) Johannesburg	2.0	2.0	2.0	f
172	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Kigali	(GMT+02:00) Kigali	2.0	2.0	2.0	f
173	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Lubumbashi	(GMT+02:00) Lubumbashi	2.0	2.0	2.0	f
174	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Lusaka	(GMT+02:00) Lusaka	2.0	2.0	2.0	f
175	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Maputo	(GMT+02:00) Maputo	2.0	2.0	2.0	f
176	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Maseru	(GMT+02:00) Maseru	2.0	2.0	2.0	f
177	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Mbabane	(GMT+02:00) Mbabane	2.0	2.0	2.0	f
178	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Tripoli	(GMT+02:00) Tripoli	2.0	2.0	2.0	f
179	2010-05-10 20:13:11	2010-05-10 20:13:11	Asia/Amman	(GMT+02:00) Amman	2.0	3.0	2.0	t
180	2010-05-10 20:13:11	2010-05-10 20:13:11	Asia/Beirut	(GMT+02:00) Beirut	2.0	3.0	2.0	t
181	2010-05-10 20:13:11	2010-05-10 20:13:11	Asia/Damascus	(GMT+02:00) Damascus	2.0	3.0	2.0	t
182	2010-05-10 20:13:11	2010-05-10 20:13:11	Asia/Gaza	(GMT+02:00) Gaza	2.0	3.0	2.0	t
183	2010-05-10 20:13:11	2010-05-10 20:13:11	Asia/Jerusalem	(GMT+02:00) Jerusalem	2.0	3.0	2.0	t
184	2010-05-10 20:13:11	2010-05-10 20:13:11	Asia/Nicosia	(GMT+02:00) Nicosia	2.0	3.0	2.0	t
185	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Athens	(GMT+02:00) Athens	2.0	3.0	2.0	t
186	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Bucharest	(GMT+02:00) Bucharest	2.0	3.0	2.0	t
187	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Chisinau	(GMT+02:00) Chisinau	2.0	3.0	2.0	t
188	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Helsinki	(GMT+02:00) Helsinki	2.0	3.0	2.0	t
189	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Istanbul	(GMT+02:00) Istanbul	2.0	3.0	2.0	t
190	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Kaliningrad	(GMT+02:00) Moscow-01 - Kaliningrad	2.0	3.0	2.0	t
191	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Kiev	(GMT+02:00) Kiev	2.0	3.0	2.0	t
192	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Minsk	(GMT+02:00) Minsk	2.0	3.0	2.0	t
193	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Riga	(GMT+02:00) Riga	2.0	3.0	2.0	t
194	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Sofia	(GMT+02:00) Sofia	2.0	3.0	2.0	t
195	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Tallinn	(GMT+02:00) Tallinn	2.0	3.0	2.0	t
196	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Vilnius	(GMT+02:00) Vilnius	2.0	3.0	2.0	t
197	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Addis_Ababa	(GMT+03:00) Addis Ababa	3.0	3.0	3.0	f
198	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Asmara	(GMT+03:00) Asmera	3.0	3.0	3.0	f
199	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Dar_es_Salaam	(GMT+03:00) Dar es Salaam	3.0	3.0	3.0	f
200	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Djibouti	(GMT+03:00) Djibouti	3.0	3.0	3.0	f
201	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Kampala	(GMT+03:00) Kampala	3.0	3.0	3.0	f
202	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Khartoum	(GMT+03:00) Khartoum	3.0	3.0	3.0	f
203	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Mogadishu	(GMT+03:00) Mogadishu	3.0	3.0	3.0	f
204	2010-05-10 20:13:11	2010-05-10 20:13:11	Africa/Nairobi	(GMT+03:00) Nairobi	3.0	3.0	3.0	f
205	2010-05-10 20:13:11	2010-05-10 20:13:11	Antarctica/Syowa	(GMT+03:00) Syowa	9.0	9.0	9.0	f
206	2010-05-10 20:13:11	2010-05-10 20:13:11	Asia/Aden	(GMT+03:00) Aden	2.0	3.0	2.0	t
207	2010-05-10 20:13:11	2010-05-10 20:13:11	Asia/Baghdad	(GMT+03:00) Baghdad	3.0	3.0	3.0	f
208	2010-05-10 20:13:11	2010-05-10 20:13:11	Asia/Bahrain	(GMT+03:00) Bahrain	3.0	3.0	3.0	f
209	2010-05-10 20:13:11	2010-05-10 20:13:11	Asia/Kuwait	(GMT+03:00) Kuwait	3.0	3.0	3.0	f
210	2010-05-10 20:13:11	2010-05-10 20:13:11	Asia/Qatar	(GMT+03:00) Qatar	3.0	3.0	3.0	f
211	2010-05-10 20:13:11	2010-05-10 20:13:11	Asia/Riyadh	(GMT+03:00) Riyadh	3.0	3.0	3.0	f
212	2010-05-10 20:13:11	2010-05-10 20:13:11	Europe/Moscow	(GMT+03:00) Moscow+00	3.0	4.0	3.0	t
213	2010-05-10 20:13:11	2010-05-10 20:13:11	Indian/Antananarivo	(GMT+03:00) Antananarivo	3.0	3.0	3.0	f
214	2010-05-10 20:13:11	2010-05-10 20:13:11	Indian/Comoro	(GMT+03:00) Comoro	3.0	3.0	3.0	f
215	2010-05-10 20:13:11	2010-05-10 20:13:11	Indian/Mayotte	(GMT+03:00) Mayotte	3.0	3.0	3.0	f
216	2010-05-10 20:13:11	2010-05-10 20:13:11	Asia/Tehran	(GMT+03:30) Tehran	3.5	4.5	3.5	t
217	2010-05-10 20:13:11	2010-05-10 20:13:11	Asia/Baku	(GMT+04:00) Baku	4.0	5.0	4.0	t
218	2010-05-10 20:13:11	2010-05-10 20:13:11	Asia/Dubai	(GMT+04:00) Dubai	4.0	4.0	4.0	f
219	2010-05-10 20:13:11	2010-05-10 20:13:11	Asia/Muscat	(GMT+04:00) Muscat	4.0	4.0	4.0	f
220	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Tbilisi	(GMT+04:00) Tbilisi	4.0	4.0	4.0	f
221	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Yerevan	(GMT+04:00) Yerevan	4.0	5.0	4.0	t
222	2010-05-10 20:13:12	2010-05-10 20:13:12	Europe/Samara	(GMT+04:00) Moscow+01 - Samara	4.0	5.0	4.0	t
223	2010-05-10 20:13:12	2010-05-10 20:13:12	Indian/Mahe	(GMT+04:00) Mahe	4.0	4.0	4.0	f
226	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Kabul	(GMT+04:30) Kabul	4.5	4.5	4.5	f
227	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Aqtau	(GMT+05:00) Aqtau	5.0	5.0	5.0	f
228	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Aqtobe	(GMT+05:00) Aqtobe	5.0	5.0	5.0	f
229	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Ashgabat	(GMT+05:00) Ashgabat	5.0	5.0	5.0	f
230	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Dushanbe	(GMT+05:00) Dushanbe	5.0	5.0	5.0	f
231	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Karachi	(GMT+05:00) Karachi	5.0	6.0	5.0	t
232	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Tashkent	(GMT+05:00) Tashkent	5.0	5.0	5.0	f
233	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Yekaterinburg	(GMT+05:00) Moscow+02 - Yekaterinburg	5.0	6.0	5.0	t
234	2010-05-10 20:13:12	2010-05-10 20:13:12	Indian/Kerguelen	(GMT+05:00) Kerguelen	5.0	5.0	5.0	f
235	2010-05-10 20:13:12	2010-05-10 20:13:12	Indian/Maldives	(GMT+05:00) Maldives	5.0	5.0	5.0	f
236	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Kolkata	(GMT+05:30) India Standard Time	5.5	5.5	5.5	f
237	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Colombo	(GMT+05:30) Colombo	5.5	5.5	5.5	f
238	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Katmandu	(GMT+05:45) Katmandu	5.75	5.75	5.75	f
239	2010-05-10 20:13:12	2010-05-10 20:13:12	Antarctica/Mawson	(GMT+06:00) Mawson	6.0	6.0	6.0	f
240	2010-05-10 20:13:12	2010-05-10 20:13:12	Antarctica/Vostok	(GMT+06:00) Vostok	6.0	6.0	6.0	f
241	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Almaty	(GMT+06:00) Almaty	6.0	6.0	6.0	f
242	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Bishkek	(GMT+06:00) Bishkek	6.0	6.0	6.0	f
243	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Dhaka	(GMT+06:00) Dhaka	6.0	7.0	6.0	t
244	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Omsk	(GMT+06:00) Moscow+03 - Omsk, Novosibirsk	6.0	7.0	6.0	t
245	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Thimphu	(GMT+06:00) Thimphu	6.0	6.0	6.0	f
246	2010-05-10 20:13:12	2010-05-10 20:13:12	Indian/Chagos	(GMT+06:00) Chagos	6.0	6.0	6.0	f
247	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Rangoon	(GMT+06:30) Rangoon	6.5	6.5	6.5	f
248	2010-05-10 20:13:12	2010-05-10 20:13:12	Indian/Cocos	(GMT+06:30) Cocos	6.5	6.5	6.5	f
249	2010-05-10 20:13:12	2010-05-10 20:13:12	Antarctica/Davis	(GMT+07:00) Davis	-8.0	-7.0	-8.0	t
250	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Bangkok	(GMT+07:00) Bangkok	7.0	7.0	7.0	f
251	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Hovd	(GMT+07:00) Hovd	7.0	7.0	7.0	f
252	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Jakarta	(GMT+07:00) Jakarta	7.0	7.0	7.0	f
253	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Krasnoyarsk	(GMT+07:00) Moscow+04 - Krasnoyarsk	7.0	8.0	7.0	t
254	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Phnom_Penh	(GMT+07:00) Phnom Penh	7.0	7.0	7.0	f
255	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Saigon	(GMT+07:00) Hanoi	7.0	7.0	7.0	f
256	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Vientiane	(GMT+07:00) Vientiane	7.0	7.0	7.0	f
257	2010-05-10 20:13:12	2010-05-10 20:13:12	Indian/Christmas	(GMT+07:00) Christmas	-7.0	-7.0	-7.0	f
258	2010-05-10 20:13:12	2010-05-10 20:13:12	Antarctica/Casey	(GMT+08:00) Casey	8.0	8.0	8.0	f
259	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Brunei	(GMT+08:00) Brunei	8.0	8.0	8.0	f
260	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Choibalsan	(GMT+08:00) Choibalsan	8.0	8.0	8.0	f
261	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Hong_Kong	(GMT+08:00) Hong Kong	8.0	8.0	8.0	f
262	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Irkutsk	(GMT+08:00) Moscow+05 - Irkutsk	8.0	9.0	8.0	t
263	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Kuala_Lumpur	(GMT+08:00) Kuala Lumpur	8.0	8.0	8.0	f
264	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Macau	(GMT+08:00) Macau	8.0	8.0	8.0	f
265	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Makassar	(GMT+08:00) Makassar	8.0	8.0	8.0	f
266	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Manila	(GMT+08:00) Manila	8.0	8.0	8.0	f
267	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Shanghai	(GMT+08:00) China Time - Beijing	8.0	8.0	8.0	f
268	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Singapore	(GMT+08:00) Singapore	8.0	8.0	8.0	f
269	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Taipei	(GMT+08:00) Taipei	8.0	8.0	8.0	f
270	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Ulaanbaatar	(GMT+08:00) Ulaanbaatar	8.0	8.0	8.0	f
271	2010-05-10 20:13:12	2010-05-10 20:13:12	Australia/Perth	(GMT+08:00) Western Time - Perth	8.0	8.0	8.0	f
272	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Dili	(GMT+09:00) Dili	8.0	8.0	8.0	f
273	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Jayapura	(GMT+09:00) Jayapura	9.0	9.0	9.0	f
274	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Pyongyang	(GMT+09:00) Pyongyang	9.0	9.0	9.0	f
275	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Seoul	(GMT+09:00) Seoul	9.0	9.0	9.0	f
276	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Tokyo	(GMT+09:00) Tokyo	9.0	9.0	9.0	f
277	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Yakutsk	(GMT+09:00) Moscow+06 - Yakutsk	9.0	10.0	9.0	t
278	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Palau	(GMT+09:00) Palau	9.0	9.0	9.0	f
279	2010-05-10 20:13:12	2010-05-10 20:13:12	Australia/Adelaide	(GMT+09:30) Central Time - Adelaide	10.5	9.5	9.5	t
280	2010-05-10 20:13:12	2010-05-10 20:13:12	Australia/Darwin	(GMT+09:30) Central Time - Darwin	9.5	9.5	9.5	f
281	2010-05-10 20:13:12	2010-05-10 20:13:12	Antarctica/DumontDUrville	(GMT+10:00) Dumont D'Urville	10.0	10.0	10.0	f
282	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Vladivostok	(GMT+10:00) Moscow+07 - Yuzhno-Sakhalinsk	10.0	11.0	10.0	t
283	2010-05-10 20:13:12	2010-05-10 20:13:12	Australia/Brisbane	(GMT+10:00) Eastern Time - Brisbane	10.0	10.0	10.0	f
284	2010-05-10 20:13:12	2010-05-10 20:13:12	Australia/Hobart	(GMT+10:00) Eastern Time - Hobart	-6.0	-5.0	-6.0	t
285	2010-05-10 20:13:12	2010-05-10 20:13:12	Australia/Sydney	(GMT+10:00) Eastern Time - Melbourne, Sydney	11.0	10.0	10.0	t
286	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Guam	(GMT+10:00) Guam	10.0	10.0	10.0	f
287	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Port_Moresby	(GMT+10:00) Port Moresby	10.0	10.0	10.0	f
288	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Saipan	(GMT+10:00) Saipan	10.0	10.0	10.0	f
289	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Truk	(GMT+10:00) Truk	10.0	10.0	10.0	f
290	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Magadan	(GMT+11:00) Moscow+08 - Magadan	11.0	12.0	11.0	t
291	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Efate	(GMT+11:00) Efate	11.0	11.0	11.0	f
292	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Guadalcanal	(GMT+11:00) Guadalcanal	11.0	11.0	11.0	f
293	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Kosrae	(GMT+11:00) Kosrae	11.0	11.0	11.0	f
294	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Noumea	(GMT+11:00) Noumea	11.0	11.0	11.0	f
295	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Ponape	(GMT+11:00) Ponape	11.0	11.0	11.0	f
296	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Norfolk	(GMT+11:30) Norfolk	11.5	11.5	11.5	f
297	2010-05-10 20:13:12	2010-05-10 20:13:12	Asia/Kamchatka	(GMT+12:00) Moscow+09 - Petropavlovsk-Kamchatskiy	12.0	13.0	12.0	t
298	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Auckland	(GMT+12:00) Auckland	13.0	12.0	12.0	t
299	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Fiji	(GMT+12:00) Fiji	12.0	12.0	12.0	f
300	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Funafuti	(GMT+12:00) Funafuti	12.0	12.0	12.0	f
301	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Kwajalein	(GMT+12:00) Kwajalein	12.0	12.0	12.0	f
302	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Majuro	(GMT+12:00) Majuro	12.0	12.0	12.0	f
303	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Nauru	(GMT+12:00) Nauru	12.0	12.0	12.0	f
304	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Tarawa	(GMT+12:00) Tarawa	12.0	12.0	12.0	f
305	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Wake	(GMT+12:00) Wake	12.0	12.0	12.0	f
306	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Wallis	(GMT+12:00) Wallis	12.0	12.0	12.0	f
307	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Enderbury	(GMT+13:00) Enderbury	13.0	13.0	13.0	f
308	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Tongatapu	(GMT+13:00) Tongatapu	13.0	13.0	13.0	f
309	2010-05-10 20:13:12	2010-05-10 20:13:12	Pacific/Kiritimati	(GMT+14:00) Kiritimati	14.0	14.0	14.0	f
\.


--
-- Name: timezones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('timezones_id_seq', 309, true);


--
-- Name: transaction_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('transaction_types_id_seq', 33, true);


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY transactions (id, created_at, updated_at, user_id, to_user_id, foreign_id, class, transaction_type, payment_gateway_id, amount, site_revenue_from_freelancer, coupon_id, site_revenue_from_employer, model_id, model_class, zazpay_gateway_id) FROM stdin;
\.


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('transactions_id_seq', 37, true);


--
-- Data for Name: upload_hosters; Type: TABLE DATA; Schema: public; Owner: -
--

COPY upload_hosters (id, created_at, updated_at, upload_service_id, upload_service_type_id, total_upload_count, total_upload_error_count, total_upload_filesize, is_active) FROM stdin;
1	2013-06-04 00:00:00	2013-06-04 00:00:00	1	1	0	0	0	f
2	2013-06-04 00:00:00	2013-06-04 00:00:00	1	2	0	0	0	f
3	2013-06-04 00:00:00	2013-06-04 00:00:00	2	1	0	0	0	f
4	2013-06-04 00:00:00	2013-06-04 00:00:00	2	2	0	0	0	t
\.


--
-- Name: upload_hosters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('upload_hosters_id_seq', 5, false);


--
-- Data for Name: upload_service_settings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY upload_service_settings (id, created_at, updated_at, upload_service_id, name, value) FROM stdin;
1	2013-06-04 00:00:00	2013-06-04 00:00:00	1	vimeo_username	
2	2013-06-04 00:00:00	2013-06-04 00:00:00	1	vimeo_api_key	
3	2013-06-04 00:00:00	2013-06-04 00:00:00	1	vimeo_secret_key	
4	2013-06-04 00:00:00	2013-06-04 00:00:00	1	vimeo_access_token	
5	2013-06-04 00:00:00	2013-06-04 00:00:00	1	vimeo_access_token_secret	
6	2013-06-04 00:00:00	2013-06-04 00:00:00	1	vimeo_embedded_preset_id	
7	2013-06-04 00:00:00	2013-06-04 00:00:00	1	vimeo_approved_domains	
8	2013-06-04 00:00:00	2013-06-04 00:00:00	2	youtube_username	
9	2013-06-04 00:00:00	2013-06-04 00:00:00	2	youtube_password	
10	2013-06-04 00:00:00	2013-06-04 00:00:00	2	youtube_developer_key	
11	2013-06-04 00:00:00	2013-06-04 00:00:00	2	youtube_client_id	
12	2016-01-29 10:46:13	2016-11-28 10:54:01	3	soundcloud_client_id	\N
13	2016-01-29 10:46:13	2016-01-29 10:46:15	3	soundcloud_client_secret	\N
14	2016-11-28 10:54:01	2016-11-28 10:54:01	3	soundcloud_username	\N
15	2016-11-28 10:54:01	2016-11-28 10:54:01	3	soundcloud_password	\N
\.


--
-- Name: upload_service_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('upload_service_settings_id_seq', 15, true);


--
-- Data for Name: upload_service_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY upload_service_types (id, created_at, updated_at, name, slug) FROM stdin;
1	2013-06-04 00:00:00	2013-06-04 00:00:00	Direct	direct
2	2013-06-04 00:00:00	2013-06-04 00:00:00	Normal	normal
\.


--
-- Name: upload_service_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('upload_service_types_id_seq', 3, false);


--
-- Data for Name: upload_services; Type: TABLE DATA; Schema: public; Owner: -
--

COPY upload_services (id, created_at, updated_at, name, slug, total_quota, total_upload_count, total_upload_filesize, total_upload_error_count) FROM stdin;
1	2013-06-05 10:04:13	2013-06-05 10:04:13	Vimeo	vimeo	0	0	0	0
2	2013-06-05 10:04:13	2013-06-05 10:04:13	YouTube	youtube	0	0	0	0
3	2016-11-28 10:54:01	2016-11-28 10:54:01	SoundCloud	soundcloud	0	0	0	0
\.


--
-- Name: upload_services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('upload_services_id_seq', 3, true);


--
-- Data for Name: upload_statuses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY upload_statuses (id, created_at, updated_at, name) FROM stdin;
1	2013-06-04 16:50:21	2013-06-04 16:50:23	Success
2	2013-06-04 16:50:33	2013-06-04 16:50:35	Processing
3	2013-06-04 16:51:05	2013-06-04 16:51:07	Failure
\.


--
-- Name: upload_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('upload_statuses_id_seq', 4, false);


--
-- Data for Name: uploads; Type: TABLE DATA; Schema: public; Owner: -
--

COPY uploads (id, created_at, updated_at, upload_service_type_id, upload_service_id, user_id, contest_user_id, upload_status_id, video_url, vimeo_video_id, youtube_video_id, vimeo_thumbnail_url, youtube_thumbnail_url, video_title, filesize, failure_message, soundcloud_audio_id, audio_url) FROM stdin;
\.


--
-- Name: uploads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('uploads_id_seq', 1, false);


--
-- Name: user_add_wallet_amounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('user_add_wallet_amounts_id_seq', 1, false);


--
-- Data for Name: user_cash_withdrawals; Type: TABLE DATA; Schema: public; Owner: -
--

COPY user_cash_withdrawals (id, created_at, updated_at, user_id, withdrawal_status_id, amount, remark, money_transfer_account_id, withdrawal_fee) FROM stdin;
\.


--
-- Name: user_cash_withdrawals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('user_cash_withdrawals_id_seq', 3, true);


--
-- Data for Name: user_logins; Type: TABLE DATA; Schema: public; Owner: -
--

COPY user_logins (id, created_at, updated_at, user_id, ip_id, user_agent) FROM stdin;
\.


--
-- Name: user_logins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('user_logins_id_seq', 107, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY users (id, created_at, updated_at, role_id, username, email, password, bid_count, won_bid_count, user_login_count, project_count, project_flag_count, job_flag_count, quote_service_flag_count, portfolio_flag_count, available_wallet_amount, ip_id, last_login_ip_id, last_logged_in_time, is_agree_terms_conditions, is_active, is_email_confirmed, total_amount_withdrawn, job_count, job_apply_count, portfolio_count, portfolio_favorite_count, quote_service_count, quote_request_count, quote_bid_count, exams_user_count, exams_user_passed_count, zazpay_receiver_account_id, available_credit_count, total_credit_bought, first_name, last_name, gender_id, quote_credit_purchase_log_count, contest_count, contest_user_count, total_site_revenue_as_employer, total_site_revenue_as_freelancer, total_earned_amount_as_freelancer, view_count, follower_count, flag_count, total_rating_as_employer, review_count_as_employer, total_rating_as_freelancer, review_count_as_freelancer, education_count, work_profile_count, certificate_count, publication_count, address, address1, city_id, state_id, country_id, zip_code, latitude, longitude, full_address, expired_balance_credit_points, is_made_deposite, hourly_rate, total_spend_amount_as_employer, project_completed_count, project_failed_count, designation, about_me, blocked_amount, is_have_unreaded_activity) FROM stdin;
10	2017-01-10 15:44:50	2017-01-10 15:44:50	1	admin	productdemo.admin@gmail.com	$1$Dm]T+`^g$DMOW6j7MoaFoFYxeTkBGi/	0	0	0	0	0	0	0	0	0	\N	\N	\N	t	t	t	0	0	0	0	0	0	0	0	0	0	\N	0	0	\N	\N	\N	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	f	0	0	0	0			0	f
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('users_id_seq', 10, true);


--
-- Data for Name: vaults; Type: TABLE DATA; Schema: public; Owner: -
--

COPY vaults (id, created_at, updated_at, masked_cc, credit_card_type, vault_key, vault_id, user_id, email, address, city, state, country, zip_code, phone, is_primary, credit_card_expire, expire_month, expire_year, cvv2, first_name, last_name, payment_type) FROM stdin;
\.


--
-- Name: vaults_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('vaults_id_seq', 1, false);


--
-- Data for Name: views; Type: TABLE DATA; Schema: public; Owner: -
--

COPY views (id, created_at, updated_at, user_id, foreign_id, class, ip_id) FROM stdin;
\.


--
-- Name: views_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('views_id_seq', 82, true);


--
-- Data for Name: wallet_transaction_logs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY wallet_transaction_logs (id, created_at, updated_at, foreign_id, class, amount, status, payment_type) FROM stdin;
1	2017-04-28 07:20:05	2017-04-28 07:20:05	1	Project	20	Captured	Capture
2	2017-04-28 07:34:17	2017-04-28 07:34:17	2	Project	20	Captured	Capture
3	2017-04-28 07:35:55	2017-04-28 07:35:55	3	Project	20	Captured	Capture
4	2017-04-28 07:38:11	2017-04-28 07:38:11	4	Project	10	Captured	Capture
5	2017-04-29 08:32:05	2017-04-29 08:32:05	2	Milestone	110	Captured	Capture
6	2017-04-29 08:37:46	2017-04-29 08:37:46	1	projectBidInvoice	22	Captured	Capture
7	2017-04-29 08:37:58	2017-04-29 08:37:58	1	projectBidInvoice	22	Captured	Capture
8	2017-04-29 08:41:14	2017-04-29 08:41:14	1	projectBidInvoice	22	Captured	Capture
9	2017-04-29 08:41:25	2017-04-29 08:41:25	1	projectBidInvoice	22	Captured	Capture
10	2017-04-29 08:45:59	2017-04-29 08:45:59	1	projectBidInvoice	22	Captured	Capture
11	2017-04-29 08:46:10	2017-04-29 08:46:10	1	projectBidInvoice	22	Captured	Capture
12	2017-04-29 08:49:18	2017-04-29 08:49:18	1	projectBidInvoice	22	Captured	Capture
13	2017-04-29 08:49:28	2017-04-29 08:49:28	1	projectBidInvoice	22	Captured	Capture
14	2017-04-29 08:51:19	2017-04-29 08:51:19	1	projectBidInvoice	22	Captured	Capture
15	2017-04-29 08:54:33	2017-04-29 08:54:33	1	projectBidInvoice	22	Captured	Capture
16	2017-04-29 12:44:50	2017-04-29 12:44:50	1	Job	15	Captured	Capture
\.


--
-- Name: wallet_transaction_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('wallet_transaction_logs_id_seq', 16, true);


--
-- Data for Name: wallets; Type: TABLE DATA; Schema: public; Owner: -
--

COPY wallets (id, created_at, updated_at, user_id, amount, payment_gateway_id, gateway_id, is_payment_completed, paypal_pay_key) FROM stdin;
\.


--
-- Name: wallets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('wallets_id_seq', 5, true);


--
-- Data for Name: work_profiles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY work_profiles (id, created_at, updated_at, user_id, title, description, from_month_year, to_month_year, company, currently_working) FROM stdin;
\.


--
-- Name: work_profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('work_profiles_id_seq', 4, true);


--
-- Data for Name: zazpay_ipn_logs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY zazpay_ipn_logs (id, created_at, updated_at, ip, post_variable) FROM stdin;
\.


--
-- Name: zazpay_ipn_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('zazpay_ipn_logs_id_seq', 32, true);


--
-- Data for Name: zazpay_payment_gateways; Type: TABLE DATA; Schema: public; Owner: -
--

COPY zazpay_payment_gateways (id, created_at, updated_at, zazpay_gateway_name, zazpay_gateway_id, zazpay_payment_group_id, zazpay_gateway_details, days_after_amount_paid, is_marketplace_supported) FROM stdin;
\.


--
-- Name: zazpay_payment_gateways_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('zazpay_payment_gateways_id_seq', 3, true);


--
-- Data for Name: zazpay_payment_gateways_users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY zazpay_payment_gateways_users (id, created_at, updated_at, user_id, zazpay_payment_gateway_id) FROM stdin;
\.


--
-- Name: zazpay_payment_gateways_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('zazpay_payment_gateways_users_id_seq', 1, false);


--
-- Data for Name: zazpay_payment_groups; Type: TABLE DATA; Schema: public; Owner: -
--

COPY zazpay_payment_groups (id, created_at, updated_at, zazpay_group_id, name, thumb_url) FROM stdin;
\.


--
-- Name: zazpay_payment_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('zazpay_payment_groups_id_seq', 3, true);


--
-- Data for Name: zazpay_transaction_logs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY zazpay_transaction_logs (id, created_at, updated_at, user_id, amount, payment_id, class, foreign_id, zazpay_pay_key, merchant_id, gateway_id, gateway_name, status, payment_type, buyer_id, buyer_email, buyer_address) FROM stdin;
\.


--
-- Name: zazpay_transaction_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('zazpay_transaction_logs_id_seq', 34, true);


--
-- Name: activities_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY activities
    ADD CONSTRAINT activities_id PRIMARY KEY (id);


--
-- Name: apns_devices_appname_appversion_deviceuid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY apns_devices
    ADD CONSTRAINT apns_devices_appname_appversion_deviceuid_key UNIQUE (appname, appversion, deviceuid);


--
-- Name: apns_devices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY apns_devices
    ADD CONSTRAINT apns_devices_pkey PRIMARY KEY (pid);


--
-- Name: attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY attachments
    ADD CONSTRAINT attachments_pkey PRIMARY KEY (id);


--
-- Name: bid_statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY bid_statuses
    ADD CONSTRAINT bid_statuses_pkey PRIMARY KEY (id);


--
-- Name: bids_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY bids
    ADD CONSTRAINT bids_pkey PRIMARY KEY (id);


--
-- Name: certifications_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY certifications
    ADD CONSTRAINT certifications_id PRIMARY KEY (id);


--
-- Name: cities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);


--
-- Name: contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: contest_statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contest_statuses
    ADD CONSTRAINT contest_statuses_pkey PRIMARY KEY (id);


--
-- Name: contest_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contest_types
    ADD CONSTRAINT contest_types_pkey PRIMARY KEY (id);


--
-- Name: contest_types_pricing_days_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contest_types_pricing_days
    ADD CONSTRAINT contest_types_pricing_days_pkey PRIMARY KEY (id);


--
-- Name: contest_types_pricing_packages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contest_types_pricing_packages
    ADD CONSTRAINT contest_types_pricing_packages_pkey PRIMARY KEY (id);


--
-- Name: contest_user_downloads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contest_user_downloads
    ADD CONSTRAINT contest_user_downloads_pkey PRIMARY KEY (id);


--
-- Name: contest_user_statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contest_user_statuses
    ADD CONSTRAINT contest_user_statuses_pkey PRIMARY KEY (id);


--
-- Name: contest_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contest_users
    ADD CONSTRAINT contest_users_pkey PRIMARY KEY (id);


--
-- Name: contests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contests
    ADD CONSTRAINT contests_pkey PRIMARY KEY (id);


--
-- Name: countries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- Name: coupons_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY coupons
    ADD CONSTRAINT coupons_id PRIMARY KEY (id);


--
-- Name: discount_types_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY discount_types
    ADD CONSTRAINT discount_types_id PRIMARY KEY (id);


--
-- Name: dispute_closed_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY dispute_closed_types
    ADD CONSTRAINT dispute_closed_types_pkey PRIMARY KEY (id);


--
-- Name: dispute_open_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY dispute_open_types
    ADD CONSTRAINT dispute_open_types_pkey PRIMARY KEY (id);


--
-- Name: dispute_statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY dispute_statuses
    ADD CONSTRAINT dispute_statuses_pkey PRIMARY KEY (id);


--
-- Name: educations_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY educations
    ADD CONSTRAINT educations_id PRIMARY KEY (id);


--
-- Name: email_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY email_templates
    ADD CONSTRAINT email_templates_pkey PRIMARY KEY (id);


--
-- Name: exam_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exam_answers
    ADD CONSTRAINT exam_answers_pkey PRIMARY KEY (id);


--
-- Name: exam_attends_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exam_attends
    ADD CONSTRAINT exam_attends_pkey PRIMARY KEY (id);


--
-- Name: exam_categories_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exam_categories
    ADD CONSTRAINT exam_categories_id PRIMARY KEY (id);


--
-- Name: exam_levels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exam_levels
    ADD CONSTRAINT exam_levels_pkey PRIMARY KEY (id);


--
-- Name: exam_statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exam_statuses
    ADD CONSTRAINT exam_statuses_pkey PRIMARY KEY (id);


--
-- Name: exams_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exams
    ADD CONSTRAINT exams_pkey PRIMARY KEY (id);


--
-- Name: exams_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exams_questions
    ADD CONSTRAINT exams_questions_pkey PRIMARY KEY (id);


--
-- Name: exams_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exams_users
    ADD CONSTRAINT exams_users_pkey PRIMARY KEY (id);


--
-- Name: flag_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY flag_categories
    ADD CONSTRAINT flag_categories_pkey PRIMARY KEY (id);


--
-- Name: flags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY flags
    ADD CONSTRAINT flags_pkey PRIMARY KEY (id);


--
-- Name: followers_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY followers
    ADD CONSTRAINT followers_id PRIMARY KEY (id);


--
-- Name: form_field_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY form_field_groups
    ADD CONSTRAINT form_field_groups_pkey PRIMARY KEY (id);


--
-- Name: form_field_submissions_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY form_field_submissions
    ADD CONSTRAINT form_field_submissions_id PRIMARY KEY (id);


--
-- Name: form_fields_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY form_fields
    ADD CONSTRAINT form_fields_pkey PRIMARY KEY (id);


--
-- Name: hire_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY hire_requests
    ADD CONSTRAINT hire_requests_pkey PRIMARY KEY (id);


--
-- Name: input_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY input_types
    ADD CONSTRAINT input_types_pkey PRIMARY KEY (id);


--
-- Name: ips_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ips
    ADD CONSTRAINT ips_pkey PRIMARY KEY (id);


--
-- Name: job_applies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY job_applies
    ADD CONSTRAINT job_applies_pkey PRIMARY KEY (id);


--
-- Name: job_applies_portfolios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY job_applies_portfolios
    ADD CONSTRAINT job_applies_portfolios_pkey PRIMARY KEY (id);


--
-- Name: job_apply_clicks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY job_apply_clicks
    ADD CONSTRAINT job_apply_clicks_pkey PRIMARY KEY (id);


--
-- Name: job_apply_statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY job_apply_statuses
    ADD CONSTRAINT job_apply_statuses_pkey PRIMARY KEY (id);


--
-- Name: job_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY job_categories
    ADD CONSTRAINT job_categories_pkey PRIMARY KEY (id);


--
-- Name: job_statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY job_statuses
    ADD CONSTRAINT job_statuses_pkey PRIMARY KEY (id);


--
-- Name: job_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY job_types
    ADD CONSTRAINT job_types_pkey PRIMARY KEY (id);


--
-- Name: jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: jobs_skills_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY jobs_skills
    ADD CONSTRAINT jobs_skills_pkey PRIMARY KEY (id);


--
-- Name: languages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (id);


--
-- Name: message_contents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY message_contents
    ADD CONSTRAINT message_contents_pkey PRIMARY KEY (id);


--
-- Name: messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: milestone_statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY milestone_statuses
    ADD CONSTRAINT milestone_statuses_pkey PRIMARY KEY (id);


--
-- Name: milestones_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY milestones
    ADD CONSTRAINT milestones_pkey PRIMARY KEY (id);


--
-- Name: money_transfer_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY money_transfer_accounts
    ADD CONSTRAINT money_transfer_accounts_pkey PRIMARY KEY (id);


--
-- Name: oauth_clients_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY oauth_clients
    ADD CONSTRAINT oauth_clients_id PRIMARY KEY (id);


--
-- Name: pages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pages
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);


--
-- Name: payment_gateway_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY payment_gateway_settings
    ADD CONSTRAINT payment_gateway_settings_pkey PRIMARY KEY (id);


--
-- Name: payment_gateways_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY payment_gateways
    ADD CONSTRAINT payment_gateways_pkey PRIMARY KEY (id);


--
-- Name: portfolios_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY portfolios
    ADD CONSTRAINT portfolios_id PRIMARY KEY (id);


--
-- Name: pricing_days_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pricing_days
    ADD CONSTRAINT pricing_days_pkey PRIMARY KEY (id);


--
-- Name: pricing_packages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pricing_packages
    ADD CONSTRAINT pricing_packages_pkey PRIMARY KEY (id);


--
-- Name: project_bid_invoice_items_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY project_bid_invoice_items
    ADD CONSTRAINT project_bid_invoice_items_id PRIMARY KEY (id);


--
-- Name: project_bid_invoices_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY project_bid_invoices
    ADD CONSTRAINT project_bid_invoices_id PRIMARY KEY (id);


--
-- Name: project_bids_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY project_bids
    ADD CONSTRAINT project_bids_pkey PRIMARY KEY (id);


--
-- Name: project_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY project_categories
    ADD CONSTRAINT project_categories_pkey PRIMARY KEY (id);


--
-- Name: project_disputes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY project_disputes
    ADD CONSTRAINT project_disputes_pkey PRIMARY KEY (id);


--
-- Name: project_ranges_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY project_ranges
    ADD CONSTRAINT project_ranges_pkey PRIMARY KEY (id);


--
-- Name: project_statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY project_statuses
    ADD CONSTRAINT project_statuses_pkey PRIMARY KEY (id);


--
-- Name: projects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: projects_project_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY projects_project_categories
    ADD CONSTRAINT projects_project_categories_pkey PRIMARY KEY (id);


--
-- Name: provider_users_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY provider_users
    ADD CONSTRAINT provider_users_id PRIMARY KEY (id);


--
-- Name: providers_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY providers
    ADD CONSTRAINT providers_id PRIMARY KEY (id);


--
-- Name: publications_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY publications
    ADD CONSTRAINT publications_id PRIMARY KEY (id);


--
-- Name: question_answer_options_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY question_answer_options
    ADD CONSTRAINT question_answer_options_pkey PRIMARY KEY (id);


--
-- Name: question_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY question_categories
    ADD CONSTRAINT question_categories_pkey PRIMARY KEY (id);


--
-- Name: question_display_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY question_display_types
    ADD CONSTRAINT question_display_types_pkey PRIMARY KEY (id);


--
-- Name: questions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: quote_bids_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_bids
    ADD CONSTRAINT quote_bids_pkey PRIMARY KEY (id);


--
-- Name: quote_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_categories
    ADD CONSTRAINT quote_categories_pkey PRIMARY KEY (id);


--
-- Name: quote_categories_quote_services_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_categories_quote_services
    ADD CONSTRAINT quote_categories_quote_services_pkey PRIMARY KEY (id);


--
-- Name: quote_credit_purchase_logs_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY credit_purchase_logs
    ADD CONSTRAINT quote_credit_purchase_logs_id PRIMARY KEY (id);


--
-- Name: quote_credit_purchase_plans_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY credit_purchase_plans
    ADD CONSTRAINT quote_credit_purchase_plans_id PRIMARY KEY (id);


--
-- Name: quote_faq_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_faq_answers
    ADD CONSTRAINT quote_faq_answers_pkey PRIMARY KEY (id);


--
-- Name: quote_faq_question_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_faq_question_templates
    ADD CONSTRAINT quote_faq_question_templates_pkey PRIMARY KEY (id);


--
-- Name: quote_form_submission_fields_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_request_form_fields
    ADD CONSTRAINT quote_form_submission_fields_pkey PRIMARY KEY (id);


--
-- Name: quote_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_requests
    ADD CONSTRAINT quote_requests_pkey PRIMARY KEY (id);


--
-- Name: quote_service_audios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_service_audios
    ADD CONSTRAINT quote_service_audios_pkey PRIMARY KEY (id);


--
-- Name: quote_service_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_service_photos
    ADD CONSTRAINT quote_service_photos_pkey PRIMARY KEY (id);


--
-- Name: quote_service_videos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_service_videos
    ADD CONSTRAINT quote_service_videos_pkey PRIMARY KEY (id);


--
-- Name: quote_services_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_services
    ADD CONSTRAINT quote_services_pkey PRIMARY KEY (id);


--
-- Name: quote_statuses_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_statuses
    ADD CONSTRAINT quote_statuses_id PRIMARY KEY (id);


--
-- Name: quote_user_faq_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_user_faq_questions
    ADD CONSTRAINT quote_user_faq_questions_pkey PRIMARY KEY (id);


--
-- Name: resources_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY resources
    ADD CONSTRAINT resources_pkey PRIMARY KEY (id);


--
-- Name: resume_downloads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY resume_downloads
    ADD CONSTRAINT resume_downloads_pkey PRIMARY KEY (id);


--
-- Name: resume_ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY resume_ratings
    ADD CONSTRAINT resume_ratings_pkey PRIMARY KEY (id);


--
-- Name: reviews_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY reviews
    ADD CONSTRAINT reviews_id PRIMARY KEY (id);


--
-- Name: roles_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY roles
    ADD CONSTRAINT roles_id PRIMARY KEY (id);


--
-- Name: salary_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY salary_types
    ADD CONSTRAINT salary_types_pkey PRIMARY KEY (id);


--
-- Name: setting_categories_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY setting_categories
    ADD CONSTRAINT setting_categories_id PRIMARY KEY (id);


--
-- Name: settings_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY settings
    ADD CONSTRAINT settings_id PRIMARY KEY (id);


--
-- Name: skills_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (id);


--
-- Name: skills_portfolios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY skills_portfolios
    ADD CONSTRAINT skills_portfolios_pkey PRIMARY KEY (id);


--
-- Name: skills_projects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY skills_projects
    ADD CONSTRAINT skills_projects_pkey PRIMARY KEY (id);


--
-- Name: skills_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY skills_users
    ADD CONSTRAINT skills_users_pkey PRIMARY KEY (id);


--
-- Name: states_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY states
    ADD CONSTRAINT states_pkey PRIMARY KEY (id);


--
-- Name: timezones_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY timezones
    ADD CONSTRAINT timezones_pkey PRIMARY KEY (id);


--
-- Name: transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: upload_hosters_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY upload_hosters
    ADD CONSTRAINT upload_hosters_pkey PRIMARY KEY (id);


--
-- Name: upload_service_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY upload_service_settings
    ADD CONSTRAINT upload_service_settings_pkey PRIMARY KEY (id);


--
-- Name: upload_service_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY upload_service_types
    ADD CONSTRAINT upload_service_types_pkey PRIMARY KEY (id);


--
-- Name: upload_services_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY upload_services
    ADD CONSTRAINT upload_services_pkey PRIMARY KEY (id);


--
-- Name: upload_statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY upload_statuses
    ADD CONSTRAINT upload_statuses_pkey PRIMARY KEY (id);


--
-- Name: uploads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY uploads
    ADD CONSTRAINT uploads_pkey PRIMARY KEY (id);


--
-- Name: user_cash_withdrawals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_cash_withdrawals
    ADD CONSTRAINT user_cash_withdrawals_pkey PRIMARY KEY (id);


--
-- Name: user_logins_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_logins
    ADD CONSTRAINT user_logins_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: views_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY views
    ADD CONSTRAINT views_id PRIMARY KEY (id);


--
-- Name: wallets_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY wallets
    ADD CONSTRAINT wallets_id PRIMARY KEY (id);


--
-- Name: work_profiles_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY work_profiles
    ADD CONSTRAINT work_profiles_id PRIMARY KEY (id);


--
-- Name: zazpay_ipn_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY zazpay_ipn_logs
    ADD CONSTRAINT zazpay_ipn_logs_pkey PRIMARY KEY (id);


--
-- Name: zazpay_payment_gateways_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY zazpay_payment_gateways
    ADD CONSTRAINT zazpay_payment_gateways_pkey PRIMARY KEY (id);


--
-- Name: zazpay_payment_gateways_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY zazpay_payment_gateways_users
    ADD CONSTRAINT zazpay_payment_gateways_users_pkey PRIMARY KEY (id);


--
-- Name: zazpay_payment_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY zazpay_payment_groups
    ADD CONSTRAINT zazpay_payment_groups_pkey PRIMARY KEY (id);


--
-- Name: zazpay_transaction_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY zazpay_transaction_logs
    ADD CONSTRAINT zazpay_transaction_logs_pkey PRIMARY KEY (id);


--
-- Name: activities_foreign_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX activities_foreign_id ON activities USING btree (foreign_id);


--
-- Name: activities_model_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX activities_model_id ON activities USING btree (model_id);


--
-- Name: activities_other_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX activities_other_user_id ON activities USING btree (other_user_id);


--
-- Name: activities_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX activities_user_id ON activities USING btree (user_id);


--
-- Name: bid_statuses_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX bid_statuses_name ON bid_statuses USING btree (name);


--
-- Name: bids_bid_status_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX bids_bid_status_id ON bids USING btree (bid_status_id);


--
-- Name: bids_credit_purchase_log_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX bids_credit_purchase_log_id ON bids USING btree (credit_purchase_log_id);


--
-- Name: bids_project_bid_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX bids_project_bid_id ON bids USING btree (project_bid_id);


--
-- Name: bids_project_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX bids_project_id ON bids USING btree (project_id);


--
-- Name: bids_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX bids_user_id ON bids USING btree (user_id);


--
-- Name: certifications_title; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX certifications_title ON certifications USING btree (title);


--
-- Name: certifications_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX certifications_user_id ON certifications USING btree (user_id);


--
-- Name: cities_country_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_country_id ON cities USING btree (country_id);


--
-- Name: cities_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_name ON cities USING btree (name);


--
-- Name: cities_state_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_state_id ON cities USING btree (state_id);


--
-- Name: contacts_ip_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contacts_ip_id ON contacts USING btree (ip_id);


--
-- Name: contacts_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contacts_user_id ON contacts USING btree (user_id);


--
-- Name: contest_statuses_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contest_statuses_name ON contest_statuses USING btree (name);


--
-- Name: contest_statuses_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contest_statuses_slug_idx ON contest_statuses USING btree (slug);


--
-- Name: contest_types_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contest_types_name ON contest_types USING btree (name);


--
-- Name: contest_types_pricing_days_contest_type_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contest_types_pricing_days_contest_type_id_idx ON contest_types_pricing_days USING btree (contest_type_id);


--
-- Name: contest_types_pricing_days_pricing_day_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contest_types_pricing_days_pricing_day_id_idx ON contest_types_pricing_days USING btree (pricing_day_id);


--
-- Name: contest_types_pricing_packages_contest_type_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contest_types_pricing_packages_contest_type_id_idx ON contest_types_pricing_packages USING btree (contest_type_id);


--
-- Name: contest_types_pricing_packages_pricing_package_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contest_types_pricing_packages_pricing_package_id_idx ON contest_types_pricing_packages USING btree (pricing_package_id);


--
-- Name: contest_types_resource_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contest_types_resource_id_idx ON contest_types USING btree (resource_id);


--
-- Name: contest_user_downloads_contest_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contest_user_downloads_contest_user_id_idx ON contest_user_downloads USING btree (contest_user_id);


--
-- Name: contest_user_downloads_ip_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contest_user_downloads_ip_id_idx ON contest_user_downloads USING btree (ip_id);


--
-- Name: contest_user_downloads_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contest_user_downloads_user_id_idx ON contest_user_downloads USING btree (user_id);


--
-- Name: contest_user_statuses_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contest_user_statuses_name ON contest_user_statuses USING btree (name);


--
-- Name: contest_user_statuses_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contest_user_statuses_slug_idx ON contest_user_statuses USING btree (slug);


--
-- Name: contest_users_contest_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contest_users_contest_id_idx ON contest_users USING btree (contest_id);


--
-- Name: contest_users_contest_owner_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contest_users_contest_owner_user_id_idx ON contest_users USING btree (contest_owner_user_id);


--
-- Name: contest_users_contest_user_status_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contest_users_contest_user_status_id_idx ON contest_users USING btree (contest_user_status_id);


--
-- Name: contest_users_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contest_users_user_id_idx ON contest_users USING btree (user_id);


--
-- Name: contest_users_zazpay_gateway_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contest_users_zazpay_gateway_id_idx ON contest_users USING btree (zazpay_gateway_id);


--
-- Name: contests_contest_status_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contests_contest_status_id_idx ON contests USING btree (contest_status_id);


--
-- Name: contests_contest_type_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contests_contest_type_id_idx ON contests USING btree (contest_type_id);


--
-- Name: contests_payment_gateway_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contests_payment_gateway_id_idx ON contests USING btree (payment_gateway_id);


--
-- Name: contests_referred_by_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contests_referred_by_user_id_idx ON contests USING btree (referred_by_user_id);


--
-- Name: contests_resource_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contests_resource_id_idx ON contests USING btree (resource_id);


--
-- Name: contests_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contests_slug_idx ON contests USING btree (slug);


--
-- Name: contests_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contests_user_id_idx ON contests USING btree (user_id);


--
-- Name: contests_winner_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contests_winner_user_id_idx ON contests USING btree (winner_user_id);


--
-- Name: contests_zazpay_gateway_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contests_zazpay_gateway_id_idx ON contests USING btree (zazpay_gateway_id);


--
-- Name: contests_zazpay_payment_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX contests_zazpay_payment_id_idx ON contests USING btree (zazpay_payment_id);


--
-- Name: countries_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX countries_name ON countries USING btree (name);


--
-- Name: coupons_discount_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX coupons_discount_type_id ON coupons USING btree (discount_type_id);


--
-- Name: credit_purchase_logs_coupon_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX credit_purchase_logs_coupon_id ON credit_purchase_logs USING btree (coupon_id);


--
-- Name: credit_purchase_logs_gateway_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX credit_purchase_logs_gateway_id ON credit_purchase_logs USING btree (gateway_id);


--
-- Name: credit_purchase_logs_payment_gateway_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX credit_purchase_logs_payment_gateway_id ON credit_purchase_logs USING btree (payment_gateway_id);


--
-- Name: discount_types_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX discount_types_name ON discount_types USING btree (name);


--
-- Name: dispute_closed_types_dispute_open_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX dispute_closed_types_dispute_open_type_id ON dispute_closed_types USING btree (dispute_open_type_id);


--
-- Name: dispute_closed_types_project_role_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX dispute_closed_types_project_role_id ON dispute_closed_types USING btree (project_role_id);


--
-- Name: dispute_open_types_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX dispute_open_types_name ON dispute_open_types USING btree (name);


--
-- Name: dispute_open_types_project_role_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX dispute_open_types_project_role_id ON dispute_open_types USING btree (project_role_id);


--
-- Name: dispute_statuses_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX dispute_statuses_name ON dispute_statuses USING btree (name);


--
-- Name: educations_country_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX educations_country_id ON educations USING btree (country_id);


--
-- Name: educations_title; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX educations_title ON educations USING btree (title);


--
-- Name: educations_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX educations_user_id ON educations USING btree (user_id);


--
-- Name: email_templates_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX email_templates_name ON email_templates USING btree (name);


--
-- Name: exam_answers_exam_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exam_answers_exam_id ON exam_answers USING btree (exam_id);


--
-- Name: exam_answers_exams_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exam_answers_exams_user_id ON exam_answers USING btree (exams_user_id);


--
-- Name: exam_answers_question_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exam_answers_question_id ON exam_answers USING btree (question_id);


--
-- Name: exam_answers_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exam_answers_user_id ON exam_answers USING btree (user_id);


--
-- Name: exam_attends_exam_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exam_attends_exam_id ON exam_attends USING btree (exam_id);


--
-- Name: exam_attends_exams_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exam_attends_exams_user_id ON exam_attends USING btree (exams_user_id);


--
-- Name: exam_attends_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exam_attends_user_id ON exam_attends USING btree (user_id);


--
-- Name: exam_attends_user_login_ip; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exam_attends_user_login_ip ON exam_attends USING btree (user_login_ip_id);


--
-- Name: exam_categories_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exam_categories_name ON exam_categories USING btree (name);


--
-- Name: exam_levels_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exam_levels_name ON exam_levels USING btree (name);


--
-- Name: exam_statuses_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exam_statuses_name ON exam_statuses USING btree (name);


--
-- Name: exams_exam_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exams_exam_category_id ON exams USING btree (exam_category_id);


--
-- Name: exams_exam_level_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exams_exam_level_id ON exams USING btree (exam_level_id);


--
-- Name: exams_parent_exam_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exams_parent_exam_id ON exams USING btree (parent_exam_id);


--
-- Name: exams_question_display_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exams_question_display_type_id ON exams USING btree (question_display_type_id);


--
-- Name: exams_questions_exam_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exams_questions_exam_id ON exams_questions USING btree (exam_id);


--
-- Name: exams_questions_question_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exams_questions_question_id ON exams_questions USING btree (question_id);


--
-- Name: exams_users_exam_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exams_users_exam_id ON exams_users USING btree (exam_id);


--
-- Name: exams_users_exam_level_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exams_users_exam_level_id ON exams_users USING btree (exam_level_id);


--
-- Name: exams_users_exam_status_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exams_users_exam_status_id ON exams_users USING btree (exam_status_id);


--
-- Name: exams_users_payment_gateway_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exams_users_payment_gateway_id ON exams_users USING btree (payment_gateway_id);


--
-- Name: exams_users_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exams_users_user_id ON exams_users USING btree (user_id);


--
-- Name: exams_users_zazpay_gateway_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exams_users_zazpay_gateway_id ON exams_users USING btree (zazpay_gateway_id);


--
-- Name: exams_users_zazpay_payment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exams_users_zazpay_payment_id ON exams_users USING btree (zazpay_payment_id);


--
-- Name: flag_categories_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX flag_categories_name ON flag_categories USING btree (name);


--
-- Name: flags_flag_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX flags_flag_category_id ON flags USING btree (flag_category_id);


--
-- Name: flags_ip_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX flags_ip_id ON flags USING btree (ip_id);


--
-- Name: flags_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX flags_user_id ON flags USING btree (user_id);


--
-- Name: followers_foreign_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX followers_foreign_id ON followers USING btree (foreign_id);


--
-- Name: followers_ip_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX followers_ip_id ON followers USING btree (ip_id);


--
-- Name: followers_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX followers_user_id ON followers USING btree (user_id);


--
-- Name: form_field_groups_class_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX form_field_groups_class_idx ON form_field_groups USING btree (class);


--
-- Name: form_field_groups_contest_type_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX form_field_groups_contest_type_id_idx ON form_field_groups USING btree (foreign_id);


--
-- Name: form_field_groups_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX form_field_groups_name ON form_field_groups USING btree (name);


--
-- Name: form_field_groups_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX form_field_groups_slug_idx ON form_field_groups USING btree (slug);


--
-- Name: form_field_submissions_foreign_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX form_field_submissions_foreign_id ON form_field_submissions USING btree (foreign_id);


--
-- Name: form_field_submissions_form_field_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX form_field_submissions_form_field_id ON form_field_submissions USING btree (form_field_id);


--
-- Name: form_fields_foreign_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX form_fields_foreign_id ON form_fields USING btree (foreign_id);


--
-- Name: form_fields_form_field_group_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX form_fields_form_field_group_id ON form_fields USING btree (form_field_group_id);


--
-- Name: form_fields_input_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX form_fields_input_type_id ON form_fields USING btree (input_type_id);


--
-- Name: hire_requests_foreign_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX hire_requests_foreign_id ON hire_requests USING btree (foreign_id);


--
-- Name: hire_requests_requested_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX hire_requests_requested_user_id ON hire_requests USING btree (requested_user_id);


--
-- Name: hire_requests_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX hire_requests_user_id ON hire_requests USING btree (user_id);


--
-- Name: input_types_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX input_types_name ON input_types USING btree (name);


--
-- Name: ips_city_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ips_city_id ON ips USING btree (city_id);


--
-- Name: ips_country_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ips_country_id ON ips USING btree (country_id);


--
-- Name: ips_state_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ips_state_id ON ips USING btree (state_id);


--
-- Name: ips_timezone_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ips_timezone_id ON ips USING btree (timezone_id);


--
-- Name: job_applies_ip_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX job_applies_ip_id ON job_applies USING btree (ip_id);


--
-- Name: job_applies_job_apply_status_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX job_applies_job_apply_status_id ON job_applies USING btree (job_apply_status_id);


--
-- Name: job_applies_job_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX job_applies_job_id ON job_applies USING btree (job_id);


--
-- Name: job_applies_portfolios_job_apply_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX job_applies_portfolios_job_apply_id ON job_applies_portfolios USING btree (job_apply_id);


--
-- Name: job_applies_portfolios_portfolio_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX job_applies_portfolios_portfolio_id ON job_applies_portfolios USING btree (portfolio_id);


--
-- Name: job_applies_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX job_applies_user_id ON job_applies USING btree (user_id);


--
-- Name: job_apply_clicks_ip_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX job_apply_clicks_ip_id ON job_apply_clicks USING btree (ip_id);


--
-- Name: job_apply_clicks_job_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX job_apply_clicks_job_id ON job_apply_clicks USING btree (job_id);


--
-- Name: job_apply_clicks_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX job_apply_clicks_user_id ON job_apply_clicks USING btree (user_id);


--
-- Name: job_apply_statuses_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX job_apply_statuses_name ON job_apply_statuses USING btree (name);


--
-- Name: job_apply_statuses_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX job_apply_statuses_slug ON job_apply_statuses USING btree (slug);


--
-- Name: job_categories_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX job_categories_name ON job_categories USING btree (name);


--
-- Name: job_categories_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX job_categories_slug ON job_categories USING btree (slug);


--
-- Name: job_statuses_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX job_statuses_name ON job_statuses USING btree (name);


--
-- Name: job_statuses_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX job_statuses_slug ON job_statuses USING btree (slug);


--
-- Name: job_types_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX job_types_name ON job_types USING btree (name);


--
-- Name: job_types_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX job_types_slug ON job_types USING btree (slug);


--
-- Name: jobs_city_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_city_id ON jobs USING btree (city_id);


--
-- Name: jobs_country_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_country_id ON jobs USING btree (country_id);


--
-- Name: jobs_ip_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_ip_id ON jobs USING btree (ip_id);


--
-- Name: jobs_job_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_job_category_id ON jobs USING btree (job_category_id);


--
-- Name: jobs_job_status_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_job_status_id ON jobs USING btree (job_status_id);


--
-- Name: jobs_job_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_job_type_id ON jobs USING btree (job_type_id);


--
-- Name: jobs_salary_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_salary_type_id ON jobs USING btree (salary_type_id);


--
-- Name: jobs_skills_job_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_skills_job_id ON jobs_skills USING btree (job_id);


--
-- Name: jobs_skills_skill_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_skills_skill_id ON jobs_skills USING btree (skill_id);


--
-- Name: jobs_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_slug ON jobs USING btree (slug);


--
-- Name: jobs_state_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_state_id ON jobs USING btree (state_id);


--
-- Name: jobs_title; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_title ON jobs USING btree (title);


--
-- Name: jobs_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_user_id ON jobs USING btree (user_id);


--
-- Name: languages_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX languages_name ON languages USING btree (name);


--
-- Name: messages_foreign_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messages_foreign_id ON messages USING btree (foreign_id);


--
-- Name: messages_message_content_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messages_message_content_id ON messages USING btree (message_content_id);


--
-- Name: messages_other_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messages_other_user_id ON messages USING btree (other_user_id);


--
-- Name: messages_parent_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messages_parent_id ON messages USING btree (parent_id);


--
-- Name: messages_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messages_user_id ON messages USING btree (user_id);


--
-- Name: milestone_statuses_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX milestone_statuses_name ON milestone_statuses USING btree (name);


--
-- Name: milestone_statuses_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX milestone_statuses_slug ON milestone_statuses USING btree (slug);


--
-- Name: milestones_bid_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX milestones_bid_id ON milestones USING btree (bid_id);


--
-- Name: milestones_milestone_status_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX milestones_milestone_status_id ON milestones USING btree (milestone_status_id);


--
-- Name: milestones_project_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX milestones_project_id ON milestones USING btree (project_id);


--
-- Name: milestones_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX milestones_user_id ON milestones USING btree (user_id);


--
-- Name: money_transfer_accounts_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX money_transfer_accounts_user_id ON money_transfer_accounts USING btree (user_id);


--
-- Name: oauth_access_tokens_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX oauth_access_tokens_client_id ON oauth_access_tokens USING btree (client_id);


--
-- Name: oauth_access_tokens_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX oauth_access_tokens_user_id ON oauth_access_tokens USING btree (user_id);


--
-- Name: oauth_authorization_codes_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX oauth_authorization_codes_client_id ON oauth_authorization_codes USING btree (client_id);


--
-- Name: oauth_authorization_codes_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX oauth_authorization_codes_user_id ON oauth_authorization_codes USING btree (user_id);


--
-- Name: oauth_clients_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX oauth_clients_client_id ON oauth_clients USING btree (client_id);


--
-- Name: oauth_clients_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX oauth_clients_user_id ON oauth_clients USING btree (user_id);


--
-- Name: oauth_jwt_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX oauth_jwt_client_id ON oauth_jwt USING btree (client_id);


--
-- Name: oauth_refresh_tokens_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX oauth_refresh_tokens_client_id ON oauth_refresh_tokens USING btree (client_id);


--
-- Name: oauth_refresh_tokens_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX oauth_refresh_tokens_user_id ON oauth_refresh_tokens USING btree (user_id);


--
-- Name: pages_parent_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_parent_id ON pages USING btree (parent_id);


--
-- Name: pages_title; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_title ON pages USING btree (title);


--
-- Name: payment_gateway_settings_payment_gateway_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payment_gateway_settings_payment_gateway_id ON payment_gateway_settings USING btree (payment_gateway_id);


--
-- Name: payment_gateways_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payment_gateways_name ON payment_gateways USING btree (name);


--
-- Name: payment_gateways_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payment_gateways_slug ON payment_gateways USING btree (slug);


--
-- Name: portfolios_title; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX portfolios_title ON portfolios USING btree (title);


--
-- Name: portfolios_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX portfolios_user_id ON portfolios USING btree (user_id);


--
-- Name: pricing_days_no_of_days_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pricing_days_no_of_days_idx ON pricing_days USING btree (no_of_days);


--
-- Name: pricing_packages_name_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pricing_packages_name_idx ON pricing_packages USING btree (name);


--
-- Name: project_bid_invoice_items_project_bid_invoice_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX project_bid_invoice_items_project_bid_invoice_id ON project_bid_invoice_items USING btree (project_bid_invoice_id);


--
-- Name: project_bid_invoices_bid_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX project_bid_invoices_bid_id ON project_bid_invoices USING btree (bid_id);


--
-- Name: project_bid_invoices_project_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX project_bid_invoices_project_id ON project_bid_invoices USING btree (project_id);


--
-- Name: project_bid_invoices_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX project_bid_invoices_user_id ON project_bid_invoices USING btree (user_id);


--
-- Name: project_bids_project_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX project_bids_project_id ON project_bids USING btree (project_id);


--
-- Name: project_bids_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX project_bids_user_id ON project_bids USING btree (user_id);


--
-- Name: project_categories_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX project_categories_name ON project_categories USING btree (name);


--
-- Name: project_disputes_dispute_closed_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX project_disputes_dispute_closed_type_id ON project_disputes USING btree (dispute_closed_type_id);


--
-- Name: project_disputes_dispute_open_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX project_disputes_dispute_open_type_id ON project_disputes USING btree (dispute_open_type_id);


--
-- Name: project_disputes_dispute_status_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX project_disputes_dispute_status_id ON project_disputes USING btree (dispute_status_id);


--
-- Name: project_disputes_project_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX project_disputes_project_id ON project_disputes USING btree (project_id);


--
-- Name: project_disputes_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX project_disputes_user_id ON project_disputes USING btree (user_id);


--
-- Name: project_ranges_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX project_ranges_name ON project_ranges USING btree (name);


--
-- Name: project_statuses_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX project_statuses_name ON project_statuses USING btree (name);


--
-- Name: projects_project_categories_project_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX projects_project_categories_project_category_id ON projects_project_categories USING btree (project_category_id);


--
-- Name: projects_project_categories_project_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX projects_project_categories_project_id ON projects_project_categories USING btree (project_id);


--
-- Name: projects_project_range_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX projects_project_range_id ON projects USING btree (project_range_id);


--
-- Name: projects_project_status_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX projects_project_status_id ON projects USING btree (project_status_id);


--
-- Name: projects_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX projects_user_id ON projects USING btree (user_id);


--
-- Name: provider_users_foreign_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX provider_users_foreign_id ON provider_users USING btree (foreign_id);


--
-- Name: provider_users_provider_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX provider_users_provider_id ON provider_users USING btree (provider_id);


--
-- Name: provider_users_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX provider_users_user_id ON provider_users USING btree (user_id);


--
-- Name: providers_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX providers_name ON providers USING btree (name);


--
-- Name: providers_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX providers_slug ON providers USING btree (slug);


--
-- Name: publications_title; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX publications_title ON publications USING btree (title);


--
-- Name: publications_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX publications_user_id ON publications USING btree (user_id);


--
-- Name: question_answer_options_question_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX question_answer_options_question_id ON question_answer_options USING btree (question_id);


--
-- Name: question_categories_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX question_categories_name ON question_categories USING btree (name);


--
-- Name: question_display_types_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX question_display_types_name ON question_display_types USING btree (name);


--
-- Name: questions_question_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX questions_question_category_id ON questions USING btree (question_category_id);


--
-- Name: quote_bids_coupon_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_bids_coupon_id ON quote_bids USING btree (coupon_id);


--
-- Name: quote_bids_credit_purchase_log_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_bids_credit_purchase_log_id ON quote_bids USING btree (credit_purchase_log_id);


--
-- Name: quote_bids_quote_request_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_bids_quote_request_id ON quote_bids USING btree (quote_request_id);


--
-- Name: quote_bids_quote_service_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_bids_quote_service_id ON quote_bids USING btree (quote_service_id);


--
-- Name: quote_bids_quote_status_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_bids_quote_status_id ON quote_bids USING btree (quote_status_id);


--
-- Name: quote_bids_service_provider_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_bids_service_provider_user_id ON quote_bids USING btree (service_provider_user_id);


--
-- Name: quote_bids_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_bids_user_id ON quote_bids USING btree (user_id);


--
-- Name: quote_categories_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_categories_name ON quote_categories USING btree (name);


--
-- Name: quote_categories_parent_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_categories_parent_category_id ON quote_categories USING btree (parent_category_id);


--
-- Name: quote_categories_quote_services_quote_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_categories_quote_services_quote_category_id ON quote_categories_quote_services USING btree (quote_category_id);


--
-- Name: quote_categories_quote_services_quote_service_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_categories_quote_services_quote_service_id ON quote_categories_quote_services USING btree (quote_service_id);


--
-- Name: quote_categories_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_categories_slug ON quote_categories USING btree (slug);


--
-- Name: quote_credit_purchase_logs_quote_credit_purchase_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_credit_purchase_logs_quote_credit_purchase_plan_id ON credit_purchase_logs USING btree (credit_purchase_plan_id);


--
-- Name: quote_credit_purchase_logs_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_credit_purchase_logs_user_id ON credit_purchase_logs USING btree (user_id);


--
-- Name: quote_credit_purchase_plans_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_credit_purchase_plans_name ON credit_purchase_plans USING btree (name);


--
-- Name: quote_faq_answers_quote_faq_question_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_faq_answers_quote_faq_question_template_id ON quote_faq_answers USING btree (quote_faq_question_template_id);


--
-- Name: quote_faq_answers_quote_service_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_faq_answers_quote_service_id ON quote_faq_answers USING btree (quote_service_id);


--
-- Name: quote_faq_answers_quote_user_faq_question_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_faq_answers_quote_user_faq_question_id ON quote_faq_answers USING btree (quote_user_faq_question_id);


--
-- Name: quote_request_form_fields_quote_request_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_request_form_fields_quote_request_id ON quote_request_form_fields USING btree (quote_request_id);


--
-- Name: quote_requests_city_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_requests_city_id ON quote_requests USING btree (city_id);


--
-- Name: quote_requests_country_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_requests_country_id ON quote_requests USING btree (country_id);


--
-- Name: quote_requests_quote_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_requests_quote_category_id ON quote_requests USING btree (quote_category_id);


--
-- Name: quote_requests_quote_service_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_requests_quote_service_id ON quote_requests USING btree (quote_service_id);


--
-- Name: quote_requests_state_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_requests_state_id ON quote_requests USING btree (state_id);


--
-- Name: quote_requests_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_requests_user_id ON quote_requests USING btree (user_id);


--
-- Name: quote_service_audios_quote_service_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_service_audios_quote_service_id ON quote_service_audios USING btree (quote_service_id);


--
-- Name: quote_service_photos_quote_service_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_service_photos_quote_service_id ON quote_service_photos USING btree (quote_service_id);


--
-- Name: quote_service_videos_quote_service_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_service_videos_quote_service_id ON quote_service_videos USING btree (quote_service_id);


--
-- Name: quote_services_city_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_services_city_id ON quote_services USING btree (city_id);


--
-- Name: quote_services_country_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_services_country_id ON quote_services USING btree (country_id);


--
-- Name: quote_services_latitude; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_services_latitude ON quote_services USING btree (latitude);


--
-- Name: quote_services_longitude; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_services_longitude ON quote_services USING btree (longitude);


--
-- Name: quote_services_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_services_slug ON quote_services USING btree (slug);


--
-- Name: quote_services_state_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_services_state_id ON quote_services USING btree (state_id);


--
-- Name: quote_services_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_services_user_id ON quote_services USING btree (user_id);


--
-- Name: quote_user_faq_questions_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quote_user_faq_questions_user_id ON quote_user_faq_questions USING btree (user_id);


--
-- Name: resources_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX resources_name ON resources USING btree (name);


--
-- Name: resume_downloads_ip_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX resume_downloads_ip_id ON resume_downloads USING btree (ip_id);


--
-- Name: resume_downloads_job_apply_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX resume_downloads_job_apply_id ON resume_downloads USING btree (job_apply_id);


--
-- Name: resume_downloads_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX resume_downloads_user_id ON resume_downloads USING btree (user_id);


--
-- Name: resume_ratings_job_apply_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX resume_ratings_job_apply_id ON resume_ratings USING btree (job_apply_id);


--
-- Name: resume_ratings_job_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX resume_ratings_job_id ON resume_ratings USING btree (job_id);


--
-- Name: resume_ratings_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX resume_ratings_user_id ON resume_ratings USING btree (user_id);


--
-- Name: reviews_foreign_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX reviews_foreign_id ON reviews USING btree (foreign_id);


--
-- Name: reviews_ip_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX reviews_ip_id ON reviews USING btree (ip_id);


--
-- Name: reviews_model_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX reviews_model_id ON reviews USING btree (model_id);


--
-- Name: reviews_to_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX reviews_to_user_id ON reviews USING btree (to_user_id);


--
-- Name: reviews_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX reviews_user_id ON reviews USING btree (user_id);


--
-- Name: roles_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX roles_name ON roles USING btree (name);


--
-- Name: salary_types_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX salary_types_name ON salary_types USING btree (name);


--
-- Name: setting_categories_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX setting_categories_name ON setting_categories USING btree (name);


--
-- Name: settings_setting_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX settings_setting_category_id ON settings USING btree (setting_category_id);


--
-- Name: skills_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX skills_name ON skills USING btree (name);


--
-- Name: skills_portfolios_portfolio_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX skills_portfolios_portfolio_id ON skills_portfolios USING btree (portfolio_id);


--
-- Name: skills_portfolios_skill_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX skills_portfolios_skill_id ON skills_portfolios USING btree (skill_id);


--
-- Name: skills_projects_project_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX skills_projects_project_id ON skills_projects USING btree (project_id);


--
-- Name: skills_projects_skill_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX skills_projects_skill_id ON skills_projects USING btree (skill_id);


--
-- Name: skills_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX skills_slug ON skills USING btree (slug);


--
-- Name: skills_users_skill_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX skills_users_skill_id ON skills_users USING btree (skill_id);


--
-- Name: skills_users_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX skills_users_user_id ON skills_users USING btree (user_id);


--
-- Name: states_country_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX states_country_id ON states USING btree (country_id);


--
-- Name: states_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX states_name ON states USING btree (name);


--
-- Name: timezones_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX timezones_name ON timezones USING btree (name);


--
-- Name: transactions_foreign_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX transactions_foreign_id ON transactions USING btree (foreign_id);


--
-- Name: transactions_payment_gateway_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX transactions_payment_gateway_id ON transactions USING btree (payment_gateway_id);


--
-- Name: transactions_to_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX transactions_to_user_id ON transactions USING btree (to_user_id);


--
-- Name: transactions_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX transactions_user_id ON transactions USING btree (user_id);


--
-- Name: upload_hosters_upload_service_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX upload_hosters_upload_service_id_idx ON upload_hosters USING btree (upload_service_id);


--
-- Name: upload_hosters_upload_service_type_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX upload_hosters_upload_service_type_id_idx ON upload_hosters USING btree (upload_service_type_id);


--
-- Name: upload_service_settings_upload_service_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX upload_service_settings_upload_service_id_idx ON upload_service_settings USING btree (upload_service_id);


--
-- Name: upload_service_types_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX upload_service_types_name ON upload_service_types USING btree (name);


--
-- Name: upload_service_types_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX upload_service_types_slug_idx ON upload_service_types USING btree (slug);


--
-- Name: upload_services_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX upload_services_name ON upload_services USING btree (name);


--
-- Name: upload_services_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX upload_services_slug_idx ON upload_services USING btree (slug);


--
-- Name: upload_statuses_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX upload_statuses_name ON upload_statuses USING btree (name);


--
-- Name: uploads_contest_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX uploads_contest_user_id_idx ON uploads USING btree (contest_user_id);


--
-- Name: uploads_upload_service_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX uploads_upload_service_id_idx ON uploads USING btree (upload_service_id);


--
-- Name: uploads_upload_service_type_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX uploads_upload_service_type_id_idx ON uploads USING btree (upload_service_type_id);


--
-- Name: uploads_upload_status_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX uploads_upload_status_id_idx ON uploads USING btree (upload_status_id);


--
-- Name: uploads_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX uploads_user_id_idx ON uploads USING btree (user_id);


--
-- Name: uploads_vimeo_video_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX uploads_vimeo_video_id_idx ON uploads USING btree (vimeo_video_id);


--
-- Name: uploads_youtube_video_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX uploads_youtube_video_id_idx ON uploads USING btree (youtube_video_id);


--
-- Name: user_cash_withdrawals_money_transfer_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_cash_withdrawals_money_transfer_account_id ON user_cash_withdrawals USING btree (money_transfer_account_id);


--
-- Name: user_cash_withdrawals_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_cash_withdrawals_user_id ON user_cash_withdrawals USING btree (user_id);


--
-- Name: user_cash_withdrawals_withdrawal_status_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_cash_withdrawals_withdrawal_status_id ON user_cash_withdrawals USING btree (withdrawal_status_id);


--
-- Name: user_logins_ip_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_logins_ip_id ON user_logins USING btree (ip_id);


--
-- Name: user_logins_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_logins_user_id ON user_logins USING btree (user_id);


--
-- Name: users_city_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_city_id ON users USING btree (city_id);


--
-- Name: users_country_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_country_id ON users USING btree (country_id);


--
-- Name: users_email; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_email ON users USING btree (email);


--
-- Name: users_ip_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_ip_id ON users USING btree (ip_id);


--
-- Name: users_role_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_role_id ON users USING btree (role_id);


--
-- Name: users_state_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_state_id ON users USING btree (state_id);


--
-- Name: users_username; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_username ON users USING btree (username);


--
-- Name: vaults_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX vaults_user_id ON vaults USING btree (user_id);


--
-- Name: vaults_vault_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX vaults_vault_id ON vaults USING btree (vault_id);


--
-- Name: views_ip_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX views_ip_id ON views USING btree (ip_id);


--
-- Name: views_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX views_user_id ON views USING btree (user_id);


--
-- Name: wallets_gateway_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX wallets_gateway_id ON wallets USING btree (gateway_id);


--
-- Name: wallets_payment_gateway_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX wallets_payment_gateway_id ON wallets USING btree (payment_gateway_id);


--
-- Name: wallets_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX wallets_user_id ON wallets USING btree (user_id);


--
-- Name: work_profiles_title; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX work_profiles_title ON work_profiles USING btree (title);


--
-- Name: work_profiles_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX work_profiles_user_id ON work_profiles USING btree (user_id);


--
-- Name: zazpay_payment_gateways_users_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX zazpay_payment_gateways_users_user_id ON zazpay_payment_gateways_users USING btree (user_id);


--
-- Name: zazpay_payment_gateways_users_zazpay_payment_gateway_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX zazpay_payment_gateways_users_zazpay_payment_gateway_id ON zazpay_payment_gateways_users USING btree (zazpay_payment_gateway_id);


--
-- Name: zazpay_payment_gateways_zazpay_gateway_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX zazpay_payment_gateways_zazpay_gateway_id ON zazpay_payment_gateways USING btree (zazpay_gateway_id);


--
-- Name: zazpay_payment_gateways_zazpay_payment_group_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX zazpay_payment_gateways_zazpay_payment_group_id ON zazpay_payment_gateways USING btree (zazpay_payment_group_id);


--
-- Name: zazpay_payment_groups_zazpay_group_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX zazpay_payment_groups_zazpay_group_id ON zazpay_payment_groups USING btree (zazpay_group_id);


--
-- Name: zazpay_transaction_logs_gateway_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX zazpay_transaction_logs_gateway_id ON zazpay_transaction_logs USING btree (gateway_id);


--
-- Name: zazpay_transaction_logs_payment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX zazpay_transaction_logs_payment_id ON zazpay_transaction_logs USING btree (payment_id);


--
-- Name: zazpay_transaction_logs_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX zazpay_transaction_logs_user_id ON zazpay_transaction_logs USING btree (user_id);


--
-- Name: activities_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY activities
    ADD CONSTRAINT activities_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: apns_devices_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY apns_devices
    ADD CONSTRAINT apns_devices_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: bids_bid_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY bids
    ADD CONSTRAINT bids_bid_status_id_fkey FOREIGN KEY (bid_status_id) REFERENCES bid_statuses(id) ON DELETE SET NULL;


--
-- Name: bids_project_bid_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY bids
    ADD CONSTRAINT bids_project_bid_id_fkey FOREIGN KEY (project_bid_id) REFERENCES project_bids(id) ON DELETE SET NULL;


--
-- Name: bids_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY bids
    ADD CONSTRAINT bids_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL;


--
-- Name: bids_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY bids
    ADD CONSTRAINT bids_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: certifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY certifications
    ADD CONSTRAINT certifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: cities_language_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY cities
    ADD CONSTRAINT cities_language_id_fkey FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE SET NULL;


--
-- Name: contacts_ip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contacts
    ADD CONSTRAINT contacts_ip_id_fkey FOREIGN KEY (ip_id) REFERENCES ips(id) ON DELETE SET NULL;


--
-- Name: contacts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contacts
    ADD CONSTRAINT contacts_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: contest_types_pricing_days_contest_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contest_types_pricing_days
    ADD CONSTRAINT contest_types_pricing_days_contest_type_id_fkey FOREIGN KEY (contest_type_id) REFERENCES contest_types(id) ON DELETE CASCADE;


--
-- Name: contest_types_pricing_days_pricing_day_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contest_types_pricing_days
    ADD CONSTRAINT contest_types_pricing_days_pricing_day_id_fkey FOREIGN KEY (pricing_day_id) REFERENCES pricing_days(id) ON DELETE CASCADE;


--
-- Name: contest_types_pricing_packages_contest_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contest_types_pricing_packages
    ADD CONSTRAINT contest_types_pricing_packages_contest_type_id_fkey FOREIGN KEY (contest_type_id) REFERENCES contest_types(id) ON DELETE CASCADE;


--
-- Name: contest_types_pricing_packages_pricing_package_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contest_types_pricing_packages
    ADD CONSTRAINT contest_types_pricing_packages_pricing_package_id_fkey FOREIGN KEY (pricing_package_id) REFERENCES pricing_packages(id) ON DELETE CASCADE;


--
-- Name: contest_types_resource_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contest_types
    ADD CONSTRAINT contest_types_resource_id_fkey FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE SET NULL;


--
-- Name: contest_user_downloads_contest_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contest_user_downloads
    ADD CONSTRAINT contest_user_downloads_contest_user_id_fkey FOREIGN KEY (contest_user_id) REFERENCES contest_users(id) ON DELETE CASCADE;


--
-- Name: contest_user_downloads_ip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contest_user_downloads
    ADD CONSTRAINT contest_user_downloads_ip_id_fkey FOREIGN KEY (ip_id) REFERENCES ips(id) ON DELETE SET NULL;


--
-- Name: contest_user_downloads_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contest_user_downloads
    ADD CONSTRAINT contest_user_downloads_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: contest_users_contest_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contest_users
    ADD CONSTRAINT contest_users_contest_id_fkey FOREIGN KEY (contest_id) REFERENCES contests(id) ON DELETE SET NULL;


--
-- Name: contest_users_contest_user_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contest_users
    ADD CONSTRAINT contest_users_contest_user_status_id_fkey FOREIGN KEY (contest_user_status_id) REFERENCES contest_user_statuses(id) ON DELETE SET NULL;


--
-- Name: contest_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contest_users
    ADD CONSTRAINT contest_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: contests_contest_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contests
    ADD CONSTRAINT contests_contest_status_id_fkey FOREIGN KEY (contest_status_id) REFERENCES contest_statuses(id) ON DELETE SET NULL;


--
-- Name: contests_contest_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contests
    ADD CONSTRAINT contests_contest_type_id_fkey FOREIGN KEY (contest_type_id) REFERENCES contest_types(id) ON DELETE SET NULL;


--
-- Name: contests_pricing_day_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contests
    ADD CONSTRAINT contests_pricing_day_id_fkey FOREIGN KEY (pricing_day_id) REFERENCES pricing_days(id) ON DELETE SET NULL;


--
-- Name: contests_pricing_package_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contests
    ADD CONSTRAINT contests_pricing_package_id_fkey FOREIGN KEY (pricing_package_id) REFERENCES pricing_packages(id) ON DELETE SET NULL;


--
-- Name: contests_resource_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contests
    ADD CONSTRAINT contests_resource_id_fkey FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE SET NULL;


--
-- Name: contests_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contests
    ADD CONSTRAINT contests_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: coupons_discount_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY coupons
    ADD CONSTRAINT coupons_discount_type_id_fkey FOREIGN KEY (discount_type_id) REFERENCES discount_types(id) ON DELETE SET NULL;


--
-- Name: credit_purchase_logs_coupon_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY credit_purchase_logs
    ADD CONSTRAINT credit_purchase_logs_coupon_id_fkey FOREIGN KEY (coupon_id) REFERENCES coupons(id) ON DELETE SET NULL;


--
-- Name: dispute_closed_types_dispute_open_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY dispute_closed_types
    ADD CONSTRAINT dispute_closed_types_dispute_open_type_id_fkey FOREIGN KEY (dispute_open_type_id) REFERENCES dispute_open_types(id) ON DELETE SET NULL;


--
-- Name: educations_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY educations
    ADD CONSTRAINT educations_country_id_fkey FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL;


--
-- Name: educations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY educations
    ADD CONSTRAINT educations_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: exam_answers_exam_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exam_answers
    ADD CONSTRAINT exam_answers_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE SET NULL;


--
-- Name: exam_answers_exams_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exam_answers
    ADD CONSTRAINT exam_answers_exams_user_id_fkey FOREIGN KEY (exams_user_id) REFERENCES exams_users(id) ON DELETE CASCADE;


--
-- Name: exam_answers_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exam_answers
    ADD CONSTRAINT exam_answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE SET NULL;


--
-- Name: exam_answers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exam_answers
    ADD CONSTRAINT exam_answers_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: exam_attends_exam_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exam_attends
    ADD CONSTRAINT exam_attends_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE SET NULL;


--
-- Name: exam_attends_exams_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exam_attends
    ADD CONSTRAINT exam_attends_exams_user_id_fkey FOREIGN KEY (exams_user_id) REFERENCES exams_users(id) ON DELETE CASCADE;


--
-- Name: exam_attends_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exam_attends
    ADD CONSTRAINT exam_attends_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: exams_exam_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exams
    ADD CONSTRAINT exams_exam_category_id_fkey FOREIGN KEY (exam_category_id) REFERENCES exam_categories(id) ON DELETE SET NULL;


--
-- Name: exams_exam_level_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exams
    ADD CONSTRAINT exams_exam_level_id_fkey FOREIGN KEY (exam_level_id) REFERENCES exam_levels(id) ON DELETE SET NULL;


--
-- Name: exams_parent_exam_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exams
    ADD CONSTRAINT exams_parent_exam_id_fkey FOREIGN KEY (parent_exam_id) REFERENCES exams(id) ON DELETE SET NULL;


--
-- Name: exams_question_display_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exams
    ADD CONSTRAINT exams_question_display_type_id_fkey FOREIGN KEY (question_display_type_id) REFERENCES question_display_types(id) ON DELETE SET NULL;


--
-- Name: exams_questions_exam_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exams_questions
    ADD CONSTRAINT exams_questions_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE;


--
-- Name: exams_questions_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exams_questions
    ADD CONSTRAINT exams_questions_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE;


--
-- Name: exams_users_exam_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exams_users
    ADD CONSTRAINT exams_users_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE SET NULL;


--
-- Name: exams_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exams_users
    ADD CONSTRAINT exams_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: flags_flag_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY flags
    ADD CONSTRAINT flags_flag_category_id_fkey FOREIGN KEY (flag_category_id) REFERENCES flag_categories(id) ON DELETE SET NULL;


--
-- Name: flags_ip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY flags
    ADD CONSTRAINT flags_ip_id_fkey FOREIGN KEY (ip_id) REFERENCES ips(id) ON DELETE SET NULL;


--
-- Name: flags_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY flags
    ADD CONSTRAINT flags_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: followers_ip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY followers
    ADD CONSTRAINT followers_ip_id_fkey FOREIGN KEY (ip_id) REFERENCES ips(id) ON DELETE SET NULL;


--
-- Name: followers_ip_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY followers
    ADD CONSTRAINT followers_ip_id_fkey1 FOREIGN KEY (ip_id) REFERENCES ips(id) ON DELETE SET NULL;


--
-- Name: followers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY followers
    ADD CONSTRAINT followers_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: followers_user_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY followers
    ADD CONSTRAINT followers_user_id_fkey1 FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: form_fields_form_field_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY form_fields
    ADD CONSTRAINT form_fields_form_field_group_id_fkey FOREIGN KEY (form_field_group_id) REFERENCES form_field_groups(id) ON DELETE SET NULL;


--
-- Name: form_fields_input_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY form_fields
    ADD CONSTRAINT form_fields_input_type_id_fkey FOREIGN KEY (input_type_id) REFERENCES input_types(id) ON DELETE SET NULL;


--
-- Name: hire_requests_requested_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY hire_requests
    ADD CONSTRAINT hire_requests_requested_user_id_fkey FOREIGN KEY (requested_user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: hire_requests_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY hire_requests
    ADD CONSTRAINT hire_requests_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: ips_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ips
    ADD CONSTRAINT ips_city_id_fkey FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL;


--
-- Name: ips_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ips
    ADD CONSTRAINT ips_country_id_fkey FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL;


--
-- Name: ips_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ips
    ADD CONSTRAINT ips_state_id_fkey FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE SET NULL;


--
-- Name: ips_timezone_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ips
    ADD CONSTRAINT ips_timezone_id_fkey FOREIGN KEY (timezone_id) REFERENCES timezones(id) ON DELETE SET NULL;


--
-- Name: job_applies_ip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY job_applies
    ADD CONSTRAINT job_applies_ip_id_fkey FOREIGN KEY (ip_id) REFERENCES ips(id) ON DELETE SET NULL;


--
-- Name: job_applies_job_apply_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY job_applies
    ADD CONSTRAINT job_applies_job_apply_status_id_fkey FOREIGN KEY (job_apply_status_id) REFERENCES job_apply_statuses(id) ON DELETE SET NULL;


--
-- Name: job_applies_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY job_applies
    ADD CONSTRAINT job_applies_job_id_fkey FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL;


--
-- Name: job_applies_portfolios_job_apply_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY job_applies_portfolios
    ADD CONSTRAINT job_applies_portfolios_job_apply_id_fkey FOREIGN KEY (job_apply_id) REFERENCES job_applies(id) ON DELETE CASCADE;


--
-- Name: job_applies_portfolios_portfolio_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY job_applies_portfolios
    ADD CONSTRAINT job_applies_portfolios_portfolio_id_fkey FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE SET NULL;


--
-- Name: job_applies_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY job_applies
    ADD CONSTRAINT job_applies_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: job_apply_clicks_ip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY job_apply_clicks
    ADD CONSTRAINT job_apply_clicks_ip_id_fkey FOREIGN KEY (ip_id) REFERENCES ips(id) ON DELETE SET NULL;


--
-- Name: job_apply_clicks_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY job_apply_clicks
    ADD CONSTRAINT job_apply_clicks_job_id_fkey FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE;


--
-- Name: job_apply_clicks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY job_apply_clicks
    ADD CONSTRAINT job_apply_clicks_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: jobs_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY jobs
    ADD CONSTRAINT jobs_city_id_fkey FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL;


--
-- Name: jobs_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY jobs
    ADD CONSTRAINT jobs_country_id_fkey FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL;


--
-- Name: jobs_ip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY jobs
    ADD CONSTRAINT jobs_ip_id_fkey FOREIGN KEY (ip_id) REFERENCES ips(id) ON DELETE SET NULL;


--
-- Name: jobs_job_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY jobs
    ADD CONSTRAINT jobs_job_category_id_fkey FOREIGN KEY (job_category_id) REFERENCES job_categories(id) ON DELETE SET NULL;


--
-- Name: jobs_job_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY jobs
    ADD CONSTRAINT jobs_job_status_id_fkey FOREIGN KEY (job_status_id) REFERENCES job_statuses(id) ON DELETE SET NULL;


--
-- Name: jobs_job_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY jobs
    ADD CONSTRAINT jobs_job_type_id_fkey FOREIGN KEY (job_type_id) REFERENCES job_types(id) ON DELETE SET NULL;


--
-- Name: jobs_salary_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY jobs
    ADD CONSTRAINT jobs_salary_type_id_fkey FOREIGN KEY (salary_type_id) REFERENCES salary_types(id) ON DELETE SET NULL;


--
-- Name: jobs_skills_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY jobs_skills
    ADD CONSTRAINT jobs_skills_job_id_fkey FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE;


--
-- Name: jobs_skills_skill_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY jobs_skills
    ADD CONSTRAINT jobs_skills_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE;


--
-- Name: jobs_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY jobs
    ADD CONSTRAINT jobs_state_id_fkey FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE SET NULL;


--
-- Name: jobs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY jobs
    ADD CONSTRAINT jobs_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: messages_message_content_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY messages
    ADD CONSTRAINT messages_message_content_id_fkey FOREIGN KEY (message_content_id) REFERENCES message_contents(id) ON DELETE CASCADE;


--
-- Name: messages_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY messages
    ADD CONSTRAINT messages_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: milestones_milestone_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY milestones
    ADD CONSTRAINT milestones_milestone_status_id_fkey FOREIGN KEY (milestone_status_id) REFERENCES milestone_statuses(id) ON DELETE SET NULL;


--
-- Name: milestones_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY milestones
    ADD CONSTRAINT milestones_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL;


--
-- Name: milestones_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY milestones
    ADD CONSTRAINT milestones_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: money_transfer_accounts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY money_transfer_accounts
    ADD CONSTRAINT money_transfer_accounts_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: payment_gateway_settings_payment_gateway_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY payment_gateway_settings
    ADD CONSTRAINT payment_gateway_settings_payment_gateway_id_fkey FOREIGN KEY (payment_gateway_id) REFERENCES payment_gateways(id);


--
-- Name: portfolios_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY portfolios
    ADD CONSTRAINT portfolios_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: project_bid_invoice_items_project_bid_invoice_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY project_bid_invoice_items
    ADD CONSTRAINT project_bid_invoice_items_project_bid_invoice_id_fkey FOREIGN KEY (project_bid_invoice_id) REFERENCES project_bid_invoices(id);


--
-- Name: project_bid_invoices_bid_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY project_bid_invoices
    ADD CONSTRAINT project_bid_invoices_bid_id_fkey FOREIGN KEY (bid_id) REFERENCES bids(id) ON DELETE SET NULL;


--
-- Name: project_bid_invoices_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY project_bid_invoices
    ADD CONSTRAINT project_bid_invoices_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL;


--
-- Name: project_bid_invoices_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY project_bid_invoices
    ADD CONSTRAINT project_bid_invoices_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: project_bids_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY project_bids
    ADD CONSTRAINT project_bids_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;


--
-- Name: project_bids_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY project_bids
    ADD CONSTRAINT project_bids_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: project_disputes_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY project_disputes
    ADD CONSTRAINT project_disputes_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;


--
-- Name: project_disputes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY project_disputes
    ADD CONSTRAINT project_disputes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: projects_project_categories_project_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY projects_project_categories
    ADD CONSTRAINT projects_project_categories_project_category_id_fkey FOREIGN KEY (project_category_id) REFERENCES project_categories(id) ON DELETE CASCADE;


--
-- Name: projects_project_categories_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY projects_project_categories
    ADD CONSTRAINT projects_project_categories_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;


--
-- Name: projects_project_range_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY projects
    ADD CONSTRAINT projects_project_range_id_fkey FOREIGN KEY (project_range_id) REFERENCES project_ranges(id) ON DELETE SET NULL;


--
-- Name: projects_project_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY projects
    ADD CONSTRAINT projects_project_status_id_fkey FOREIGN KEY (project_status_id) REFERENCES project_statuses(id) ON DELETE SET NULL;


--
-- Name: projects_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY projects
    ADD CONSTRAINT projects_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: provider_users_provider_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY provider_users
    ADD CONSTRAINT provider_users_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE SET NULL;


--
-- Name: provider_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY provider_users
    ADD CONSTRAINT provider_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: publications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY publications
    ADD CONSTRAINT publications_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: question_answer_options_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY question_answer_options
    ADD CONSTRAINT question_answer_options_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE;


--
-- Name: questions_question_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_question_category_id_fkey FOREIGN KEY (question_category_id) REFERENCES question_categories(id) ON DELETE SET NULL;


--
-- Name: quote_bids_credit_purchase_log_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_bids
    ADD CONSTRAINT quote_bids_credit_purchase_log_id_fkey FOREIGN KEY (credit_purchase_log_id) REFERENCES credit_purchase_logs(id) ON DELETE SET NULL;


--
-- Name: quote_bids_quote_request_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_bids
    ADD CONSTRAINT quote_bids_quote_request_id_fkey FOREIGN KEY (quote_request_id) REFERENCES quote_requests(id) ON DELETE SET NULL;


--
-- Name: quote_bids_quote_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_bids
    ADD CONSTRAINT quote_bids_quote_service_id_fkey FOREIGN KEY (quote_service_id) REFERENCES quote_services(id) ON DELETE SET NULL;


--
-- Name: quote_bids_quote_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_bids
    ADD CONSTRAINT quote_bids_quote_status_id_fkey FOREIGN KEY (quote_status_id) REFERENCES quote_statuses(id) ON DELETE SET NULL;


--
-- Name: quote_bids_service_provider_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_bids
    ADD CONSTRAINT quote_bids_service_provider_user_id_fkey FOREIGN KEY (service_provider_user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: quote_bids_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_bids
    ADD CONSTRAINT quote_bids_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: quote_categories_parent_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_categories
    ADD CONSTRAINT quote_categories_parent_category_id_fkey FOREIGN KEY (parent_category_id) REFERENCES quote_categories(id) ON DELETE SET NULL;


--
-- Name: quote_categories_quote_services_quote_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_categories_quote_services
    ADD CONSTRAINT quote_categories_quote_services_quote_category_id_fkey FOREIGN KEY (quote_category_id) REFERENCES quote_categories(id) ON DELETE CASCADE;


--
-- Name: quote_categories_quote_services_quote_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_categories_quote_services
    ADD CONSTRAINT quote_categories_quote_services_quote_service_id_fkey FOREIGN KEY (quote_service_id) REFERENCES quote_services(id) ON DELETE CASCADE;


--
-- Name: quote_credit_purchase_logs_quote_credit_purchase_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY credit_purchase_logs
    ADD CONSTRAINT quote_credit_purchase_logs_quote_credit_purchase_plan_id_fkey FOREIGN KEY (credit_purchase_plan_id) REFERENCES credit_purchase_plans(id) ON DELETE SET NULL;


--
-- Name: quote_credit_purchase_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY credit_purchase_logs
    ADD CONSTRAINT quote_credit_purchase_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: quote_faq_answers_quote_faq_question_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_faq_answers
    ADD CONSTRAINT quote_faq_answers_quote_faq_question_template_id_fkey FOREIGN KEY (quote_faq_question_template_id) REFERENCES quote_faq_question_templates(id) ON DELETE CASCADE;


--
-- Name: quote_faq_answers_quote_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_faq_answers
    ADD CONSTRAINT quote_faq_answers_quote_service_id_fkey FOREIGN KEY (quote_service_id) REFERENCES quote_services(id) ON DELETE CASCADE;


--
-- Name: quote_faq_answers_quote_user_faq_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_faq_answers
    ADD CONSTRAINT quote_faq_answers_quote_user_faq_question_id_fkey FOREIGN KEY (quote_user_faq_question_id) REFERENCES quote_user_faq_questions(id) ON DELETE CASCADE;


--
-- Name: quote_request_form_fields_quote_form_field_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_request_form_fields
    ADD CONSTRAINT quote_request_form_fields_quote_form_field_id_fkey FOREIGN KEY (quote_form_field_id) REFERENCES form_fields(id) ON DELETE CASCADE;


--
-- Name: quote_request_form_fields_quote_request_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_request_form_fields
    ADD CONSTRAINT quote_request_form_fields_quote_request_id_fkey FOREIGN KEY (quote_request_id) REFERENCES quote_requests(id) ON DELETE CASCADE;


--
-- Name: quote_requests_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_requests
    ADD CONSTRAINT quote_requests_city_id_fkey FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL;


--
-- Name: quote_requests_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_requests
    ADD CONSTRAINT quote_requests_country_id_fkey FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL;


--
-- Name: quote_requests_quote_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_requests
    ADD CONSTRAINT quote_requests_quote_category_id_fkey FOREIGN KEY (quote_category_id) REFERENCES quote_categories(id) ON DELETE SET NULL;


--
-- Name: quote_requests_quote_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_requests
    ADD CONSTRAINT quote_requests_quote_service_id_fkey FOREIGN KEY (quote_service_id) REFERENCES quote_services(id) ON DELETE SET NULL;


--
-- Name: quote_requests_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_requests
    ADD CONSTRAINT quote_requests_state_id_fkey FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE SET NULL;


--
-- Name: quote_requests_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_requests
    ADD CONSTRAINT quote_requests_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: quote_service_audios_quote_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_service_audios
    ADD CONSTRAINT quote_service_audios_quote_service_id_fkey FOREIGN KEY (quote_service_id) REFERENCES quote_services(id) ON DELETE CASCADE;


--
-- Name: quote_service_photos_quote_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_service_photos
    ADD CONSTRAINT quote_service_photos_quote_service_id_fkey FOREIGN KEY (quote_service_id) REFERENCES quote_services(id) ON DELETE CASCADE;


--
-- Name: quote_service_videos_quote_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_service_videos
    ADD CONSTRAINT quote_service_videos_quote_service_id_fkey FOREIGN KEY (quote_service_id) REFERENCES quote_services(id) ON DELETE CASCADE;


--
-- Name: quote_services_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_services
    ADD CONSTRAINT quote_services_city_id_fkey FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL;


--
-- Name: quote_services_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_services
    ADD CONSTRAINT quote_services_country_id_fkey FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL;


--
-- Name: quote_services_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_services
    ADD CONSTRAINT quote_services_state_id_fkey FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE SET NULL;


--
-- Name: quote_services_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_services
    ADD CONSTRAINT quote_services_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: quote_user_faq_questions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quote_user_faq_questions
    ADD CONSTRAINT quote_user_faq_questions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: resume_downloads_ip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY resume_downloads
    ADD CONSTRAINT resume_downloads_ip_id_fkey FOREIGN KEY (ip_id) REFERENCES ips(id) ON DELETE SET NULL;


--
-- Name: resume_downloads_job_apply_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY resume_downloads
    ADD CONSTRAINT resume_downloads_job_apply_id_fkey FOREIGN KEY (job_apply_id) REFERENCES job_applies(id) ON DELETE CASCADE;


--
-- Name: resume_downloads_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY resume_downloads
    ADD CONSTRAINT resume_downloads_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: resume_ratings_job_apply_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY resume_ratings
    ADD CONSTRAINT resume_ratings_job_apply_id_fkey FOREIGN KEY (job_apply_id) REFERENCES job_applies(id) ON DELETE CASCADE;


--
-- Name: resume_ratings_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY resume_ratings
    ADD CONSTRAINT resume_ratings_job_id_fkey FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE;


--
-- Name: resume_ratings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY resume_ratings
    ADD CONSTRAINT resume_ratings_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: reviews_ip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY reviews
    ADD CONSTRAINT reviews_ip_id_fkey FOREIGN KEY (ip_id) REFERENCES ips(id) ON DELETE SET NULL;


--
-- Name: reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: skills_portfolios_portfolio_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY skills_portfolios
    ADD CONSTRAINT skills_portfolios_portfolio_id_fkey FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE;


--
-- Name: skills_portfolios_skill_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY skills_portfolios
    ADD CONSTRAINT skills_portfolios_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE;


--
-- Name: skills_projects_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY skills_projects
    ADD CONSTRAINT skills_projects_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;


--
-- Name: skills_projects_skill_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY skills_projects
    ADD CONSTRAINT skills_projects_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE;


--
-- Name: skills_users_skill_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY skills_users
    ADD CONSTRAINT skills_users_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE;


--
-- Name: skills_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY skills_users
    ADD CONSTRAINT skills_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: transactions_to_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY transactions
    ADD CONSTRAINT transactions_to_user_id_fkey FOREIGN KEY (to_user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: transactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY transactions
    ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: upload_hosters_upload_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY upload_hosters
    ADD CONSTRAINT upload_hosters_upload_service_id_fkey FOREIGN KEY (upload_service_id) REFERENCES upload_services(id) ON DELETE CASCADE;


--
-- Name: upload_hosters_upload_service_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY upload_hosters
    ADD CONSTRAINT upload_hosters_upload_service_type_id_fkey FOREIGN KEY (upload_service_type_id) REFERENCES upload_service_types(id) ON DELETE CASCADE;


--
-- Name: upload_service_settings_upload_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY upload_service_settings
    ADD CONSTRAINT upload_service_settings_upload_service_id_fkey FOREIGN KEY (upload_service_id) REFERENCES upload_services(id) ON DELETE CASCADE;


--
-- Name: uploads_contest_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY uploads
    ADD CONSTRAINT uploads_contest_user_id_fkey FOREIGN KEY (contest_user_id) REFERENCES contest_users(id) ON DELETE CASCADE;


--
-- Name: uploads_upload_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY uploads
    ADD CONSTRAINT uploads_upload_service_id_fkey FOREIGN KEY (upload_service_id) REFERENCES upload_services(id) ON DELETE SET NULL;


--
-- Name: uploads_upload_service_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY uploads
    ADD CONSTRAINT uploads_upload_service_type_id_fkey FOREIGN KEY (upload_service_type_id) REFERENCES upload_service_types(id) ON DELETE SET NULL;


--
-- Name: uploads_upload_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY uploads
    ADD CONSTRAINT uploads_upload_status_id_fkey FOREIGN KEY (upload_status_id) REFERENCES upload_statuses(id) ON DELETE SET NULL;


--
-- Name: uploads_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY uploads
    ADD CONSTRAINT uploads_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: user_cash_withdrawals_money_transfer_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_cash_withdrawals
    ADD CONSTRAINT user_cash_withdrawals_money_transfer_account_id_fkey FOREIGN KEY (money_transfer_account_id) REFERENCES money_transfer_accounts(id) ON DELETE SET NULL;


--
-- Name: user_cash_withdrawals_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_cash_withdrawals
    ADD CONSTRAINT user_cash_withdrawals_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: user_logins_ip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_logins
    ADD CONSTRAINT user_logins_ip_id_fkey FOREIGN KEY (ip_id) REFERENCES ips(id) ON DELETE SET NULL;


--
-- Name: user_logins_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_logins
    ADD CONSTRAINT user_logins_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: users_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_city_id_fkey FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL;


--
-- Name: users_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_country_id_fkey FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL;


--
-- Name: users_ip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_ip_id_fkey FOREIGN KEY (ip_id) REFERENCES ips(id) ON DELETE SET NULL;


--
-- Name: users_last_login_ip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_last_login_ip_id_fkey FOREIGN KEY (last_login_ip_id) REFERENCES ips(id) ON DELETE SET NULL;


--
-- Name: users_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_state_id_fkey FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE SET NULL;


--
-- Name: vaults_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY vaults
    ADD CONSTRAINT vaults_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: views_ip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY views
    ADD CONSTRAINT views_ip_id_fkey FOREIGN KEY (ip_id) REFERENCES ips(id) ON DELETE SET NULL;


--
-- Name: views_ip_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY views
    ADD CONSTRAINT views_ip_id_fkey1 FOREIGN KEY (ip_id) REFERENCES ips(id) ON DELETE SET NULL;


--
-- Name: views_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY views
    ADD CONSTRAINT views_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: wallets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY wallets
    ADD CONSTRAINT wallets_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: work_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY work_profiles
    ADD CONSTRAINT work_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: zazpay_payment_gateways_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY zazpay_payment_gateways_users
    ADD CONSTRAINT zazpay_payment_gateways_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: zazpay_payment_gateways_users_zazpay_payment_gateway_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY zazpay_payment_gateways_users
    ADD CONSTRAINT zazpay_payment_gateways_users_zazpay_payment_gateway_id_fkey FOREIGN KEY (zazpay_payment_gateway_id) REFERENCES zazpay_payment_gateways(id) ON DELETE SET NULL;


--
-- Name: zazpay_payment_gateways_zazpay_payment_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY zazpay_payment_gateways
    ADD CONSTRAINT zazpay_payment_gateways_zazpay_payment_group_id_fkey FOREIGN KEY (zazpay_payment_group_id) REFERENCES zazpay_payment_groups(id) ON DELETE SET NULL;


--
-- Name: zazpay_transaction_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY zazpay_transaction_logs
    ADD CONSTRAINT zazpay_transaction_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

