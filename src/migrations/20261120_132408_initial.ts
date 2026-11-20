import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('es');
  CREATE TYPE "public"."enum_inquiries_type" AS ENUM('experience', 'corporate', 'general', 'waitlist', 'gift');
  CREATE TYPE "public"."enum_inquiries_occasion" AS ENUM('cumpleanos', 'aniversario', 'propuesta', 'amigos', 'familia', 'empresa', 'otra');
  CREATE TYPE "public"."enum_inquiries_status" AS ENUM('new', 'in_progress', 'proposal_sent', 'confirmed', 'lost', 'spam');
  CREATE TYPE "public"."enum_inquiries_source_device" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_conversion_events_type" AS ENUM('whatsapp_click', 'phone_click', 'booking_click');
  CREATE TYPE "public"."enum_conversion_events_source_device" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_experiences_occasions" AS ENUM('pareja', 'amigos', 'familia', 'grupos', 'empresas');
  CREATE TYPE "public"."enum_experiences_departures_days_of_week" AS ENUM('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun');
  CREATE TYPE "public"."enum_experiences_price_options_passenger_type" AS ENUM('adulto', 'menor', 'jubilado', 'residente', 'grupo');
  CREATE TYPE "public"."enum_experiences_availability" AS ENUM('active', 'coming_soon', 'paused', 'archived');
  CREATE TYPE "public"."enum_experiences_time_of_day" AS ENUM('manana', 'mediodia', 'tarde');
  CREATE TYPE "public"."enum_experiences_booking_mode" AS ENUM('inherit', 'contact', 'external_link', 'widget');
  CREATE TYPE "public"."enum_experiences_booking_provider" AS ENUM('none', 'turitop', 'bokun', 'fareharbor', 'other');
  CREATE TYPE "public"."enum_experiences_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__experiences_v_version_occasions" AS ENUM('pareja', 'amigos', 'familia', 'grupos', 'empresas');
  CREATE TYPE "public"."enum__experiences_v_version_departures_days_of_week" AS ENUM('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun');
  CREATE TYPE "public"."enum__experiences_v_version_price_options_passenger_type" AS ENUM('adulto', 'menor', 'jubilado', 'residente', 'grupo');
  CREATE TYPE "public"."enum__experiences_v_version_availability" AS ENUM('active', 'coming_soon', 'paused', 'archived');
  CREATE TYPE "public"."enum__experiences_v_version_time_of_day" AS ENUM('manana', 'mediodia', 'tarde');
  CREATE TYPE "public"."enum__experiences_v_version_booking_mode" AS ENUM('inherit', 'contact', 'external_link', 'widget');
  CREATE TYPE "public"."enum__experiences_v_version_booking_provider" AS ENUM('none', 'turitop', 'bokun', 'fareharbor', 'other');
  CREATE TYPE "public"."enum__experiences_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__experiences_v_published_locale" AS ENUM('es');
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('video', 'image', 'split', 'solid');
  CREATE TYPE "public"."enum_pages_blocks_editorial_background" AS ENUM('claro', 'piedra', 'verde');
  CREATE TYPE "public"."enum_pages_blocks_quote_background" AS ENUM('claro', 'piedra', 'verde');
  CREATE TYPE "public"."enum_pages_blocks_experience_grid_source" AS ENUM('featured', 'all', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_experience_grid_columns" AS ENUM('3', '4');
  CREATE TYPE "public"."enum_pages_blocks_facts_items_icon" AS ENUM('sol', 'ola', 'copa', 'ancla', 'reloj', 'pin', 'grupo', 'estrella', 'barco', 'brujula', 'calendario');
  CREATE TYPE "public"."enum_pages_blocks_facts_background" AS ENUM('claro', 'piedra', 'verde');
  CREATE TYPE "public"."enum_pages_blocks_gallery_layout" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum_pages_blocks_form_form_type" AS ENUM('experience', 'corporate', 'general', 'waitlist');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('video', 'image', 'split', 'solid');
  CREATE TYPE "public"."enum__pages_v_blocks_editorial_background" AS ENUM('claro', 'piedra', 'verde');
  CREATE TYPE "public"."enum__pages_v_blocks_quote_background" AS ENUM('claro', 'piedra', 'verde');
  CREATE TYPE "public"."enum__pages_v_blocks_experience_grid_source" AS ENUM('featured', 'all', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_experience_grid_columns" AS ENUM('3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_facts_items_icon" AS ENUM('sol', 'ola', 'copa', 'ancla', 'reloj', 'pin', 'grupo', 'estrella', 'barco', 'brujula', 'calendario');
  CREATE TYPE "public"."enum__pages_v_blocks_facts_background" AS ENUM('claro', 'piedra', 'verde');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_layout" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum__pages_v_blocks_form_form_type" AS ENUM('experience', 'corporate', 'general', 'waitlist');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('es');
  CREATE TYPE "public"."enum_faqs_category" AS ENUM('reservas', 'clima', 'a-bordo', 'seguridad', 'chicos', 'accesibilidad', 'como-llegar', 'privados');
  CREATE TYPE "public"."enum_testimonials_origin" AS ENUM('google', 'tripadvisor', 'instagram', 'directo');
  CREATE TYPE "public"."enum_promotions_benefit_type" AS ENUM('percent', 'amount', 'two_for_one', 'other');
  CREATE TYPE "public"."enum_banners_placement" AS ENUM('top_bar', 'home_after_hero', 'experience_page', 'experiences_list');
  CREATE TYPE "public"."enum_banners_style" AS ENUM('piedra', 'verde');
  CREATE TYPE "public"."enum_media_register" AS ENUM('paisaje', 'experiencia', 'detalle', 'equipo', 'obra');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_integrations_notifications_types" AS ENUM('experience', 'corporate', 'general', 'waitlist', 'gift');
  CREATE TYPE "public"."enum_integrations_site_mode" AS ENUM('preapertura', 'consultas', 'reservas');
  CREATE TYPE "public"."enum_integrations_booking_provider" AS ENUM('none', 'turitop', 'bokun', 'fareharbor', 'other');
  CREATE TABLE "inquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_inquiries_type" NOT NULL,
  	"name" varchar NOT NULL,
  	"phone" varchar,
  	"email" varchar,
  	"experience_id" integer,
  	"requested_date" timestamp(3) with time zone,
  	"guests" numeric,
  	"occasion" "enum_inquiries_occasion",
  	"event_type" varchar,
  	"company" varchar,
  	"tax_id" varchar,
  	"budget" numeric,
  	"interest" varchar,
  	"message" varchar,
  	"promotion_id" integer,
  	"status" "enum_inquiries_status" DEFAULT 'new' NOT NULL,
  	"assignee_id" integer,
  	"estimated_value" numeric,
  	"internal_notes" varchar,
  	"source_page_path" varchar,
  	"source_cta_location" varchar,
  	"source_ref_code" varchar,
  	"source_referrer" varchar,
  	"source_utm_source" varchar,
  	"source_utm_medium" varchar,
  	"source_utm_campaign" varchar,
  	"source_utm_content" varchar,
  	"source_utm_term" varchar,
  	"source_gclid" varchar,
  	"source_fbclid" varchar,
  	"source_device" "enum_inquiries_source_device",
  	"consent_marketing" boolean,
  	"privacy_version" varchar,
  	"ip_hash" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "conversion_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_conversion_events_type" NOT NULL,
  	"experience_id" integer,
  	"source_page_path" varchar,
  	"source_cta_location" varchar,
  	"source_ref_code" varchar,
  	"source_referrer" varchar,
  	"source_utm_source" varchar,
  	"source_utm_medium" varchar,
  	"source_utm_campaign" varchar,
  	"source_utm_content" varchar,
  	"source_utm_term" varchar,
  	"source_gclid" varchar,
  	"source_fbclid" varchar,
  	"source_device" "enum_conversion_events_source_device",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "experiences_occasions" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_experiences_occasions",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "experiences_itinerary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"time" varchar
  );
  
  CREATE TABLE "experiences_itinerary_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "experiences_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "experiences_included_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "experiences_extras" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"price" numeric
  );
  
  CREATE TABLE "experiences_extras_locales" (
  	"name" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "experiences_departures_days_of_week" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_experiences_departures_days_of_week",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "experiences_departures" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"time" varchar,
  	"season_id" integer,
  	"external_slot_id" varchar
  );
  
  CREATE TABLE "experiences_departures_locales" (
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "experiences_price_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"passenger_type" "enum_experiences_price_options_passenger_type",
  	"season_id" integer,
  	"amount" numeric,
  	"is_from_price" boolean,
  	"external_rate_id" varchar
  );
  
  CREATE TABLE "experiences_price_options_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"availability" "enum_experiences_availability" DEFAULT 'active',
  	"featured" boolean,
  	"order" numeric DEFAULT 0,
  	"time_of_day" "enum_experiences_time_of_day",
  	"hero_image_id" integer,
  	"hero_image_mobile_id" integer,
  	"hero_video_id" integer,
  	"gallery_id" integer,
  	"duration_minutes" numeric,
  	"capacity" numeric,
  	"min_guests" numeric,
  	"min_age" numeric,
  	"availability_note_expires_at" timestamp(3) with time zone,
  	"price_valid_until" timestamp(3) with time zone,
  	"ref_code" varchar,
  	"booking_mode" "enum_experiences_booking_mode" DEFAULT 'inherit',
  	"booking_provider" "enum_experiences_booking_provider" DEFAULT 'none',
  	"booking_external_product_id" varchar,
  	"booking_external_url" varchar,
  	"booking_widget_config" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_experiences_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "experiences_locales" (
  	"title" varchar,
  	"tagline" varchar,
  	"description" jsonb,
  	"important_info" jsonb,
  	"boarding_point" varchar,
  	"accessibility" jsonb,
  	"availability_note_text" varchar,
  	"price_fallback_text" varchar DEFAULT 'Consultá el precio',
  	"whatsapp_message" varchar DEFAULT 'Hola, quiero consultar por {experiencia}. Somos __ personas para el día __. (Ref. {ref})',
  	"cta_label" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "experiences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "_experiences_v_version_occasions" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__experiences_v_version_occasions",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_experiences_v_version_itinerary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"time" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_experiences_v_version_itinerary_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_experiences_v_version_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_experiences_v_version_included_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_experiences_v_version_extras" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"price" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_experiences_v_version_extras_locales" (
  	"name" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_experiences_v_version_departures_days_of_week" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__experiences_v_version_departures_days_of_week",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_experiences_v_version_departures" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"time" varchar,
  	"season_id" integer,
  	"external_slot_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_experiences_v_version_departures_locales" (
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_experiences_v_version_price_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"passenger_type" "enum__experiences_v_version_price_options_passenger_type",
  	"season_id" integer,
  	"amount" numeric,
  	"is_from_price" boolean,
  	"external_rate_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_experiences_v_version_price_options_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_experiences_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_availability" "enum__experiences_v_version_availability" DEFAULT 'active',
  	"version_featured" boolean,
  	"version_order" numeric DEFAULT 0,
  	"version_time_of_day" "enum__experiences_v_version_time_of_day",
  	"version_hero_image_id" integer,
  	"version_hero_image_mobile_id" integer,
  	"version_hero_video_id" integer,
  	"version_gallery_id" integer,
  	"version_duration_minutes" numeric,
  	"version_capacity" numeric,
  	"version_min_guests" numeric,
  	"version_min_age" numeric,
  	"version_availability_note_expires_at" timestamp(3) with time zone,
  	"version_price_valid_until" timestamp(3) with time zone,
  	"version_ref_code" varchar,
  	"version_booking_mode" "enum__experiences_v_version_booking_mode" DEFAULT 'inherit',
  	"version_booking_provider" "enum__experiences_v_version_booking_provider" DEFAULT 'none',
  	"version_booking_external_product_id" varchar,
  	"version_booking_external_url" varchar,
  	"version_booking_widget_config" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__experiences_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__experiences_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_experiences_v_locales" (
  	"version_title" varchar,
  	"version_tagline" varchar,
  	"version_description" jsonb,
  	"version_important_info" jsonb,
  	"version_boarding_point" varchar,
  	"version_accessibility" jsonb,
  	"version_availability_note_text" varchar,
  	"version_price_fallback_text" varchar DEFAULT 'Consultá el precio',
  	"version_whatsapp_message" varchar DEFAULT 'Hola, quiero consultar por {experiencia}. Somos __ personas para el día __. (Ref. {ref})',
  	"version_cta_label" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_experiences_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_hero_variant" DEFAULT 'image',
  	"label" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"image_mobile_id" integer,
  	"video_id" integer,
  	"primary_cta_label" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_editorial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"body" jsonb,
  	"background" "enum_pages_blocks_editorial_background" DEFAULT 'claro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"background" "enum_pages_blocks_quote_background" DEFAULT 'claro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_experience_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"source" "enum_pages_blocks_experience_grid_source" DEFAULT 'featured',
  	"columns" "enum_pages_blocks_experience_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"time" varchar,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_facts_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_facts_items_icon",
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"background" "enum_pages_blocks_facts_background" DEFAULT 'claro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_boat_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_boat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"text" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"gallery_id" integer,
  	"layout" "enum_pages_blocks_gallery_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_promo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"promotion_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"form_type" "enum_pages_blocks_form_form_type",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_location" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_closing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"experiences_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_hero_variant" DEFAULT 'image',
  	"label" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"image_mobile_id" integer,
  	"video_id" integer,
  	"primary_cta_label" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_editorial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"body" jsonb,
  	"background" "enum__pages_v_blocks_editorial_background" DEFAULT 'claro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"background" "enum__pages_v_blocks_quote_background" DEFAULT 'claro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_experience_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"source" "enum__pages_v_blocks_experience_grid_source" DEFAULT 'featured',
  	"columns" "enum__pages_v_blocks_experience_grid_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"time" varchar,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_facts_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_facts_items_icon",
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"background" "enum__pages_v_blocks_facts_background" DEFAULT 'claro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_boat_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_boat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"text" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"gallery_id" integer,
  	"layout" "enum__pages_v_blocks_gallery_layout" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_promo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"promotion_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"form_type" "enum__pages_v_blocks_form_form_type",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_location" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_closing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"experiences_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" "enum_faqs_category" NOT NULL,
  	"order" numeric DEFAULT 0,
  	"show_on_faq_page" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faqs_locales" (
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"author" varchar NOT NULL,
  	"origin" "enum_testimonials_origin" NOT NULL,
  	"date" timestamp(3) with time zone,
  	"rating" numeric,
  	"experience_id" integer,
  	"source_url" varchar,
  	"publish_consent" boolean DEFAULT false NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "promotions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"internal_name" varchar NOT NULL,
  	"image_id" integer,
  	"benefit_type" "enum_promotions_benefit_type",
  	"benefit_value" numeric,
  	"code" varchar,
  	"starts_at" timestamp(3) with time zone NOT NULL,
  	"ends_at" timestamp(3) with time zone NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"featured_on_home" boolean,
  	"priority" numeric DEFAULT 0,
  	"has_landing" boolean,
  	"slug" varchar,
  	"cta_href" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "promotions_locales" (
  	"title" varchar NOT NULL,
  	"body" varchar,
  	"terms" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "promotions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"experiences_id" integer
  );
  
  CREATE TABLE "banners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"internal_name" varchar NOT NULL,
  	"placement" "enum_banners_placement" NOT NULL,
  	"image_id" integer,
  	"cta_href" varchar,
  	"promotion_id" integer,
  	"style" "enum_banners_style" DEFAULT 'piedra',
  	"starts_at" timestamp(3) with time zone,
  	"ends_at" timestamp(3) with time zone,
  	"enabled" boolean DEFAULT true,
  	"priority" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "banners_locales" (
  	"text" varchar NOT NULL,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "seasons_ranges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"from" timestamp(3) with time zone NOT NULL,
  	"to" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "seasons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"priority" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "seasons_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"credit" varchar,
  	"register" "enum_media_register",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumb_url" varchar,
  	"sizes_thumb_width" numeric,
  	"sizes_thumb_height" numeric,
  	"sizes_thumb_mime_type" varchar,
  	"sizes_thumb_filesize" numeric,
  	"sizes_thumb_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_hero_mobile_url" varchar,
  	"sizes_hero_mobile_width" numeric,
  	"sizes_hero_mobile_height" numeric,
  	"sizes_hero_mobile_mime_type" varchar,
  	"sizes_hero_mobile_filesize" numeric,
  	"sizes_hero_mobile_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "galleries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"cover_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "galleries_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "galleries_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"experiences_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"inquiries_id" integer,
  	"conversion_events_id" integer,
  	"experiences_id" integer,
  	"pages_id" integer,
  	"faqs_id" integer,
  	"testimonials_id" integer,
  	"promotions_id" integer,
  	"banners_id" integer,
  	"seasons_id" integer,
  	"categories_id" integer,
  	"media_id" integer,
  	"galleries_id" integer,
  	"users_id" integer,
  	"redirects_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_credentials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "site_settings_credentials_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_name" varchar DEFAULT 'Espíritu del Lago',
  	"endorsement" varchar DEFAULT 'Una experiencia de SOYM S.A.',
  	"legal_name" varchar DEFAULT 'SOYM S.A.',
  	"tax_id" varchar,
  	"legal_address" varchar,
  	"whatsapp" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"boarding_point_name" varchar DEFAULT 'Club Náutico Calamuchita',
  	"address" varchar,
  	"locality" varchar DEFAULT 'Villa Ciudad Parque',
  	"region" varchar DEFAULT 'Córdoba',
  	"lat" numeric,
  	"lng" numeric,
  	"maps_url" varchar,
  	"instagram" varchar,
  	"facebook" varchar,
  	"tiktok" varchar,
  	"youtube" varchar,
  	"tripadvisor" varchar,
  	"google_business" varchar,
  	"title_template" varchar DEFAULT '%s · Espíritu del Lago',
  	"default_og_image_id" integer,
  	"search_console_verification" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"hours" varchar,
  	"directions" varchar,
  	"payment_methods" varchar,
  	"deposit_policy" varchar,
  	"default_title" varchar DEFAULT 'Navegá el Lago Los Molinos · Espíritu del Lago',
  	"default_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "navigation_main" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_main_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_footer_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_cta_href" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_locales" (
  	"header_cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "announcement" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean,
  	"href" varchar,
  	"expires_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "announcement_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "integrations_notifications_types" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_integrations_notifications_types",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "integrations_notifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "integrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_mode" "enum_integrations_site_mode" DEFAULT 'preapertura' NOT NULL,
  	"booking_provider" "enum_integrations_booking_provider" DEFAULT 'none',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_experience_id_experiences_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_promotion_id_promotions_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_assignee_id_users_id_fk" FOREIGN KEY ("assignee_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "conversion_events" ADD CONSTRAINT "conversion_events_experience_id_experiences_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_occasions" ADD CONSTRAINT "experiences_occasions_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_itinerary" ADD CONSTRAINT "experiences_itinerary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_itinerary_locales" ADD CONSTRAINT "experiences_itinerary_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences_itinerary"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_included" ADD CONSTRAINT "experiences_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_included_locales" ADD CONSTRAINT "experiences_included_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences_included"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_extras" ADD CONSTRAINT "experiences_extras_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_extras_locales" ADD CONSTRAINT "experiences_extras_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences_extras"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_departures_days_of_week" ADD CONSTRAINT "experiences_departures_days_of_week_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experiences_departures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_departures" ADD CONSTRAINT "experiences_departures_season_id_seasons_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."seasons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_departures" ADD CONSTRAINT "experiences_departures_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_departures_locales" ADD CONSTRAINT "experiences_departures_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences_departures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_price_options" ADD CONSTRAINT "experiences_price_options_season_id_seasons_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."seasons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_price_options" ADD CONSTRAINT "experiences_price_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_price_options_locales" ADD CONSTRAINT "experiences_price_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences_price_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_hero_video_id_media_id_fk" FOREIGN KEY ("hero_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_gallery_id_galleries_id_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_locales" ADD CONSTRAINT "experiences_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_locales" ADD CONSTRAINT "experiences_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_occasions" ADD CONSTRAINT "_experiences_v_version_occasions_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_experiences_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_itinerary" ADD CONSTRAINT "_experiences_v_version_itinerary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experiences_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_itinerary_locales" ADD CONSTRAINT "_experiences_v_version_itinerary_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experiences_v_version_itinerary"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_included" ADD CONSTRAINT "_experiences_v_version_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experiences_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_included_locales" ADD CONSTRAINT "_experiences_v_version_included_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experiences_v_version_included"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_extras" ADD CONSTRAINT "_experiences_v_version_extras_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experiences_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_extras_locales" ADD CONSTRAINT "_experiences_v_version_extras_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experiences_v_version_extras"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_departures_days_of_week" ADD CONSTRAINT "_experiences_v_version_departures_days_of_week_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_experiences_v_version_departures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_departures" ADD CONSTRAINT "_experiences_v_version_departures_season_id_seasons_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."seasons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_departures" ADD CONSTRAINT "_experiences_v_version_departures_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experiences_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_departures_locales" ADD CONSTRAINT "_experiences_v_version_departures_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experiences_v_version_departures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_price_options" ADD CONSTRAINT "_experiences_v_version_price_options_season_id_seasons_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."seasons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_price_options" ADD CONSTRAINT "_experiences_v_version_price_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experiences_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_price_options_locales" ADD CONSTRAINT "_experiences_v_version_price_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experiences_v_version_price_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v" ADD CONSTRAINT "_experiences_v_parent_id_experiences_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experiences"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experiences_v" ADD CONSTRAINT "_experiences_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experiences_v" ADD CONSTRAINT "_experiences_v_version_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("version_hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experiences_v" ADD CONSTRAINT "_experiences_v_version_hero_video_id_media_id_fk" FOREIGN KEY ("version_hero_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experiences_v" ADD CONSTRAINT "_experiences_v_version_gallery_id_galleries_id_fk" FOREIGN KEY ("version_gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experiences_v_locales" ADD CONSTRAINT "_experiences_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experiences_v_locales" ADD CONSTRAINT "_experiences_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experiences_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_rels" ADD CONSTRAINT "_experiences_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_experiences_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_rels" ADD CONSTRAINT "_experiences_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_rels" ADD CONSTRAINT "_experiences_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_editorial" ADD CONSTRAINT "pages_blocks_editorial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_quote" ADD CONSTRAINT "pages_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_experience_grid" ADD CONSTRAINT "pages_blocks_experience_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_steps" ADD CONSTRAINT "pages_blocks_timeline_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline" ADD CONSTRAINT "pages_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_facts_items" ADD CONSTRAINT "pages_blocks_facts_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_facts" ADD CONSTRAINT "pages_blocks_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_boat_specs" ADD CONSTRAINT "pages_blocks_boat_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_boat"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_boat" ADD CONSTRAINT "pages_blocks_boat_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_boat" ADD CONSTRAINT "pages_blocks_boat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_gallery_id_galleries_id_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_promo" ADD CONSTRAINT "pages_blocks_promo_promotion_id_promotions_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_promo" ADD CONSTRAINT "pages_blocks_promo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form" ADD CONSTRAINT "pages_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_location" ADD CONSTRAINT "pages_blocks_location_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_closing" ADD CONSTRAINT "pages_blocks_closing_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_closing" ADD CONSTRAINT "pages_blocks_closing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_editorial" ADD CONSTRAINT "_pages_v_blocks_editorial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_quote" ADD CONSTRAINT "_pages_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_experience_grid" ADD CONSTRAINT "_pages_v_blocks_experience_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_steps" ADD CONSTRAINT "_pages_v_blocks_timeline_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline" ADD CONSTRAINT "_pages_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_facts_items" ADD CONSTRAINT "_pages_v_blocks_facts_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_facts" ADD CONSTRAINT "_pages_v_blocks_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_boat_specs" ADD CONSTRAINT "_pages_v_blocks_boat_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_boat"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_boat" ADD CONSTRAINT "_pages_v_blocks_boat_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_boat" ADD CONSTRAINT "_pages_v_blocks_boat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_gallery_id_galleries_id_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_promo" ADD CONSTRAINT "_pages_v_blocks_promo_promotion_id_promotions_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_promo" ADD CONSTRAINT "_pages_v_blocks_promo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form" ADD CONSTRAINT "_pages_v_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_location" ADD CONSTRAINT "_pages_v_blocks_location_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_closing" ADD CONSTRAINT "_pages_v_blocks_closing_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_closing" ADD CONSTRAINT "_pages_v_blocks_closing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_locales" ADD CONSTRAINT "faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_experience_id_experiences_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_locales" ADD CONSTRAINT "testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "promotions" ADD CONSTRAINT "promotions_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "promotions_locales" ADD CONSTRAINT "promotions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "promotions_rels" ADD CONSTRAINT "promotions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "promotions_rels" ADD CONSTRAINT "promotions_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "banners" ADD CONSTRAINT "banners_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "banners" ADD CONSTRAINT "banners_promotion_id_promotions_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "banners_locales" ADD CONSTRAINT "banners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."banners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seasons_ranges" ADD CONSTRAINT "seasons_ranges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seasons_locales" ADD CONSTRAINT "seasons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "galleries" ADD CONSTRAINT "galleries_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "galleries_locales" ADD CONSTRAINT "galleries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "galleries_rels" ADD CONSTRAINT "galleries_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "galleries_rels" ADD CONSTRAINT "galleries_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_inquiries_fk" FOREIGN KEY ("inquiries_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_conversion_events_fk" FOREIGN KEY ("conversion_events_id") REFERENCES "public"."conversion_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_promotions_fk" FOREIGN KEY ("promotions_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_banners_fk" FOREIGN KEY ("banners_id") REFERENCES "public"."banners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_seasons_fk" FOREIGN KEY ("seasons_id") REFERENCES "public"."seasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_galleries_fk" FOREIGN KEY ("galleries_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_credentials" ADD CONSTRAINT "site_settings_credentials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_credentials_locales" ADD CONSTRAINT "site_settings_credentials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_credentials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_main" ADD CONSTRAINT "navigation_main_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_main_locales" ADD CONSTRAINT "navigation_main_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_main"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer" ADD CONSTRAINT "navigation_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_locales" ADD CONSTRAINT "navigation_footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_locales" ADD CONSTRAINT "navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcement_locales" ADD CONSTRAINT "announcement_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "integrations_notifications_types" ADD CONSTRAINT "integrations_notifications_types_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."integrations_notifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "integrations_notifications" ADD CONSTRAINT "integrations_notifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."integrations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "inquiries_experience_idx" ON "inquiries" USING btree ("experience_id");
  CREATE INDEX "inquiries_promotion_idx" ON "inquiries" USING btree ("promotion_id");
  CREATE INDEX "inquiries_assignee_idx" ON "inquiries" USING btree ("assignee_id");
  CREATE INDEX "inquiries_updated_at_idx" ON "inquiries" USING btree ("updated_at");
  CREATE INDEX "inquiries_created_at_idx" ON "inquiries" USING btree ("created_at");
  CREATE INDEX "conversion_events_experience_idx" ON "conversion_events" USING btree ("experience_id");
  CREATE INDEX "conversion_events_updated_at_idx" ON "conversion_events" USING btree ("updated_at");
  CREATE INDEX "conversion_events_created_at_idx" ON "conversion_events" USING btree ("created_at");
  CREATE INDEX "experiences_occasions_order_idx" ON "experiences_occasions" USING btree ("order");
  CREATE INDEX "experiences_occasions_parent_idx" ON "experiences_occasions" USING btree ("parent_id");
  CREATE INDEX "experiences_itinerary_order_idx" ON "experiences_itinerary" USING btree ("_order");
  CREATE INDEX "experiences_itinerary_parent_id_idx" ON "experiences_itinerary" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "experiences_itinerary_locales_locale_parent_id_unique" ON "experiences_itinerary_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "experiences_itinerary_locales_parent_id_idx" ON "experiences_itinerary_locales" USING btree ("_parent_id");
  CREATE INDEX "experiences_included_order_idx" ON "experiences_included" USING btree ("_order");
  CREATE INDEX "experiences_included_parent_id_idx" ON "experiences_included" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "experiences_included_locales_locale_parent_id_unique" ON "experiences_included_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "experiences_included_locales_parent_id_idx" ON "experiences_included_locales" USING btree ("_parent_id");
  CREATE INDEX "experiences_extras_order_idx" ON "experiences_extras" USING btree ("_order");
  CREATE INDEX "experiences_extras_parent_id_idx" ON "experiences_extras" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "experiences_extras_locales_locale_parent_id_unique" ON "experiences_extras_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "experiences_extras_locales_parent_id_idx" ON "experiences_extras_locales" USING btree ("_parent_id");
  CREATE INDEX "experiences_departures_days_of_week_order_idx" ON "experiences_departures_days_of_week" USING btree ("order");
  CREATE INDEX "experiences_departures_days_of_week_parent_idx" ON "experiences_departures_days_of_week" USING btree ("parent_id");
  CREATE INDEX "experiences_departures_order_idx" ON "experiences_departures" USING btree ("_order");
  CREATE INDEX "experiences_departures_parent_id_idx" ON "experiences_departures" USING btree ("_parent_id");
  CREATE INDEX "experiences_departures_season_idx" ON "experiences_departures" USING btree ("season_id");
  CREATE UNIQUE INDEX "experiences_departures_locales_locale_parent_id_unique" ON "experiences_departures_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "experiences_departures_locales_parent_id_idx" ON "experiences_departures_locales" USING btree ("_parent_id");
  CREATE INDEX "experiences_price_options_order_idx" ON "experiences_price_options" USING btree ("_order");
  CREATE INDEX "experiences_price_options_parent_id_idx" ON "experiences_price_options" USING btree ("_parent_id");
  CREATE INDEX "experiences_price_options_season_idx" ON "experiences_price_options" USING btree ("season_id");
  CREATE UNIQUE INDEX "experiences_price_options_locales_locale_parent_id_unique" ON "experiences_price_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "experiences_price_options_locales_parent_id_idx" ON "experiences_price_options_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "experiences_slug_idx" ON "experiences" USING btree ("slug");
  CREATE INDEX "experiences_hero_image_idx" ON "experiences" USING btree ("hero_image_id");
  CREATE INDEX "experiences_hero_image_mobile_idx" ON "experiences" USING btree ("hero_image_mobile_id");
  CREATE INDEX "experiences_hero_video_idx" ON "experiences" USING btree ("hero_video_id");
  CREATE INDEX "experiences_gallery_idx" ON "experiences" USING btree ("gallery_id");
  CREATE INDEX "experiences_updated_at_idx" ON "experiences" USING btree ("updated_at");
  CREATE INDEX "experiences_created_at_idx" ON "experiences" USING btree ("created_at");
  CREATE INDEX "experiences__status_idx" ON "experiences" USING btree ("_status");
  CREATE INDEX "experiences_meta_meta_image_idx" ON "experiences_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "experiences_locales_locale_parent_id_unique" ON "experiences_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "experiences_locales_parent_id_idx" ON "experiences_locales" USING btree ("_parent_id");
  CREATE INDEX "experiences_rels_order_idx" ON "experiences_rels" USING btree ("order");
  CREATE INDEX "experiences_rels_parent_idx" ON "experiences_rels" USING btree ("parent_id");
  CREATE INDEX "experiences_rels_path_idx" ON "experiences_rels" USING btree ("path");
  CREATE INDEX "experiences_rels_categories_id_idx" ON "experiences_rels" USING btree ("categories_id");
  CREATE INDEX "experiences_rels_faqs_id_idx" ON "experiences_rels" USING btree ("faqs_id");
  CREATE INDEX "_experiences_v_version_occasions_order_idx" ON "_experiences_v_version_occasions" USING btree ("order");
  CREATE INDEX "_experiences_v_version_occasions_parent_idx" ON "_experiences_v_version_occasions" USING btree ("parent_id");
  CREATE INDEX "_experiences_v_version_itinerary_order_idx" ON "_experiences_v_version_itinerary" USING btree ("_order");
  CREATE INDEX "_experiences_v_version_itinerary_parent_id_idx" ON "_experiences_v_version_itinerary" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_experiences_v_version_itinerary_locales_locale_parent_id_un" ON "_experiences_v_version_itinerary_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_experiences_v_version_itinerary_locales_parent_id_idx" ON "_experiences_v_version_itinerary_locales" USING btree ("_parent_id");
  CREATE INDEX "_experiences_v_version_included_order_idx" ON "_experiences_v_version_included" USING btree ("_order");
  CREATE INDEX "_experiences_v_version_included_parent_id_idx" ON "_experiences_v_version_included" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_experiences_v_version_included_locales_locale_parent_id_uni" ON "_experiences_v_version_included_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_experiences_v_version_included_locales_parent_id_idx" ON "_experiences_v_version_included_locales" USING btree ("_parent_id");
  CREATE INDEX "_experiences_v_version_extras_order_idx" ON "_experiences_v_version_extras" USING btree ("_order");
  CREATE INDEX "_experiences_v_version_extras_parent_id_idx" ON "_experiences_v_version_extras" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_experiences_v_version_extras_locales_locale_parent_id_uniqu" ON "_experiences_v_version_extras_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_experiences_v_version_extras_locales_parent_id_idx" ON "_experiences_v_version_extras_locales" USING btree ("_parent_id");
  CREATE INDEX "_experiences_v_version_departures_days_of_week_order_idx" ON "_experiences_v_version_departures_days_of_week" USING btree ("order");
  CREATE INDEX "_experiences_v_version_departures_days_of_week_parent_idx" ON "_experiences_v_version_departures_days_of_week" USING btree ("parent_id");
  CREATE INDEX "_experiences_v_version_departures_order_idx" ON "_experiences_v_version_departures" USING btree ("_order");
  CREATE INDEX "_experiences_v_version_departures_parent_id_idx" ON "_experiences_v_version_departures" USING btree ("_parent_id");
  CREATE INDEX "_experiences_v_version_departures_season_idx" ON "_experiences_v_version_departures" USING btree ("season_id");
  CREATE UNIQUE INDEX "_experiences_v_version_departures_locales_locale_parent_id_u" ON "_experiences_v_version_departures_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_experiences_v_version_departures_locales_parent_id_idx" ON "_experiences_v_version_departures_locales" USING btree ("_parent_id");
  CREATE INDEX "_experiences_v_version_price_options_order_idx" ON "_experiences_v_version_price_options" USING btree ("_order");
  CREATE INDEX "_experiences_v_version_price_options_parent_id_idx" ON "_experiences_v_version_price_options" USING btree ("_parent_id");
  CREATE INDEX "_experiences_v_version_price_options_season_idx" ON "_experiences_v_version_price_options" USING btree ("season_id");
  CREATE UNIQUE INDEX "_experiences_v_version_price_options_locales_locale_parent_i" ON "_experiences_v_version_price_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_experiences_v_version_price_options_locales_parent_id_idx" ON "_experiences_v_version_price_options_locales" USING btree ("_parent_id");
  CREATE INDEX "_experiences_v_parent_idx" ON "_experiences_v" USING btree ("parent_id");
  CREATE INDEX "_experiences_v_version_version_slug_idx" ON "_experiences_v" USING btree ("version_slug");
  CREATE INDEX "_experiences_v_version_version_hero_image_idx" ON "_experiences_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_experiences_v_version_version_hero_image_mobile_idx" ON "_experiences_v" USING btree ("version_hero_image_mobile_id");
  CREATE INDEX "_experiences_v_version_version_hero_video_idx" ON "_experiences_v" USING btree ("version_hero_video_id");
  CREATE INDEX "_experiences_v_version_version_gallery_idx" ON "_experiences_v" USING btree ("version_gallery_id");
  CREATE INDEX "_experiences_v_version_version_updated_at_idx" ON "_experiences_v" USING btree ("version_updated_at");
  CREATE INDEX "_experiences_v_version_version_created_at_idx" ON "_experiences_v" USING btree ("version_created_at");
  CREATE INDEX "_experiences_v_version_version__status_idx" ON "_experiences_v" USING btree ("version__status");
  CREATE INDEX "_experiences_v_created_at_idx" ON "_experiences_v" USING btree ("created_at");
  CREATE INDEX "_experiences_v_updated_at_idx" ON "_experiences_v" USING btree ("updated_at");
  CREATE INDEX "_experiences_v_snapshot_idx" ON "_experiences_v" USING btree ("snapshot");
  CREATE INDEX "_experiences_v_published_locale_idx" ON "_experiences_v" USING btree ("published_locale");
  CREATE INDEX "_experiences_v_latest_idx" ON "_experiences_v" USING btree ("latest");
  CREATE INDEX "_experiences_v_autosave_idx" ON "_experiences_v" USING btree ("autosave");
  CREATE INDEX "_experiences_v_version_meta_version_meta_image_idx" ON "_experiences_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_experiences_v_locales_locale_parent_id_unique" ON "_experiences_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_experiences_v_locales_parent_id_idx" ON "_experiences_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_experiences_v_rels_order_idx" ON "_experiences_v_rels" USING btree ("order");
  CREATE INDEX "_experiences_v_rels_parent_idx" ON "_experiences_v_rels" USING btree ("parent_id");
  CREATE INDEX "_experiences_v_rels_path_idx" ON "_experiences_v_rels" USING btree ("path");
  CREATE INDEX "_experiences_v_rels_categories_id_idx" ON "_experiences_v_rels" USING btree ("categories_id");
  CREATE INDEX "_experiences_v_rels_faqs_id_idx" ON "_experiences_v_rels" USING btree ("faqs_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_locale_idx" ON "pages_blocks_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_hero_image_mobile_idx" ON "pages_blocks_hero" USING btree ("image_mobile_id");
  CREATE INDEX "pages_blocks_hero_video_idx" ON "pages_blocks_hero" USING btree ("video_id");
  CREATE INDEX "pages_blocks_editorial_order_idx" ON "pages_blocks_editorial" USING btree ("_order");
  CREATE INDEX "pages_blocks_editorial_parent_id_idx" ON "pages_blocks_editorial" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_editorial_path_idx" ON "pages_blocks_editorial" USING btree ("_path");
  CREATE INDEX "pages_blocks_editorial_locale_idx" ON "pages_blocks_editorial" USING btree ("_locale");
  CREATE INDEX "pages_blocks_quote_order_idx" ON "pages_blocks_quote" USING btree ("_order");
  CREATE INDEX "pages_blocks_quote_parent_id_idx" ON "pages_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quote_path_idx" ON "pages_blocks_quote" USING btree ("_path");
  CREATE INDEX "pages_blocks_quote_locale_idx" ON "pages_blocks_quote" USING btree ("_locale");
  CREATE INDEX "pages_blocks_experience_grid_order_idx" ON "pages_blocks_experience_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_experience_grid_parent_id_idx" ON "pages_blocks_experience_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_experience_grid_path_idx" ON "pages_blocks_experience_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_experience_grid_locale_idx" ON "pages_blocks_experience_grid" USING btree ("_locale");
  CREATE INDEX "pages_blocks_timeline_steps_order_idx" ON "pages_blocks_timeline_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_steps_parent_id_idx" ON "pages_blocks_timeline_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_steps_locale_idx" ON "pages_blocks_timeline_steps" USING btree ("_locale");
  CREATE INDEX "pages_blocks_timeline_order_idx" ON "pages_blocks_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_parent_id_idx" ON "pages_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_path_idx" ON "pages_blocks_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_timeline_locale_idx" ON "pages_blocks_timeline" USING btree ("_locale");
  CREATE INDEX "pages_blocks_facts_items_order_idx" ON "pages_blocks_facts_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_facts_items_parent_id_idx" ON "pages_blocks_facts_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_facts_items_locale_idx" ON "pages_blocks_facts_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_facts_order_idx" ON "pages_blocks_facts" USING btree ("_order");
  CREATE INDEX "pages_blocks_facts_parent_id_idx" ON "pages_blocks_facts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_facts_path_idx" ON "pages_blocks_facts" USING btree ("_path");
  CREATE INDEX "pages_blocks_facts_locale_idx" ON "pages_blocks_facts" USING btree ("_locale");
  CREATE INDEX "pages_blocks_boat_specs_order_idx" ON "pages_blocks_boat_specs" USING btree ("_order");
  CREATE INDEX "pages_blocks_boat_specs_parent_id_idx" ON "pages_blocks_boat_specs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_boat_specs_locale_idx" ON "pages_blocks_boat_specs" USING btree ("_locale");
  CREATE INDEX "pages_blocks_boat_order_idx" ON "pages_blocks_boat" USING btree ("_order");
  CREATE INDEX "pages_blocks_boat_parent_id_idx" ON "pages_blocks_boat" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_boat_path_idx" ON "pages_blocks_boat" USING btree ("_path");
  CREATE INDEX "pages_blocks_boat_locale_idx" ON "pages_blocks_boat" USING btree ("_locale");
  CREATE INDEX "pages_blocks_boat_image_idx" ON "pages_blocks_boat" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_gallery_locale_idx" ON "pages_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_gallery_idx" ON "pages_blocks_gallery" USING btree ("gallery_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_locale_idx" ON "pages_blocks_testimonials" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_locale_idx" ON "pages_blocks_faq" USING btree ("_locale");
  CREATE INDEX "pages_blocks_promo_order_idx" ON "pages_blocks_promo" USING btree ("_order");
  CREATE INDEX "pages_blocks_promo_parent_id_idx" ON "pages_blocks_promo" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_promo_path_idx" ON "pages_blocks_promo" USING btree ("_path");
  CREATE INDEX "pages_blocks_promo_locale_idx" ON "pages_blocks_promo" USING btree ("_locale");
  CREATE INDEX "pages_blocks_promo_promotion_idx" ON "pages_blocks_promo" USING btree ("promotion_id");
  CREATE INDEX "pages_blocks_form_order_idx" ON "pages_blocks_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_parent_id_idx" ON "pages_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_path_idx" ON "pages_blocks_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_locale_idx" ON "pages_blocks_form" USING btree ("_locale");
  CREATE INDEX "pages_blocks_location_order_idx" ON "pages_blocks_location" USING btree ("_order");
  CREATE INDEX "pages_blocks_location_parent_id_idx" ON "pages_blocks_location" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_location_path_idx" ON "pages_blocks_location" USING btree ("_path");
  CREATE INDEX "pages_blocks_location_locale_idx" ON "pages_blocks_location" USING btree ("_locale");
  CREATE INDEX "pages_blocks_closing_order_idx" ON "pages_blocks_closing" USING btree ("_order");
  CREATE INDEX "pages_blocks_closing_parent_id_idx" ON "pages_blocks_closing" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_closing_path_idx" ON "pages_blocks_closing" USING btree ("_path");
  CREATE INDEX "pages_blocks_closing_locale_idx" ON "pages_blocks_closing" USING btree ("_locale");
  CREATE INDEX "pages_blocks_closing_image_idx" ON "pages_blocks_closing" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_locales_parent_id_idx" ON "pages_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_locale_idx" ON "pages_rels" USING btree ("locale");
  CREATE INDEX "pages_rels_experiences_id_idx" ON "pages_rels" USING btree ("experiences_id","locale");
  CREATE INDEX "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id","locale");
  CREATE INDEX "pages_rels_faqs_id_idx" ON "pages_rels" USING btree ("faqs_id","locale");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_locale_idx" ON "_pages_v_blocks_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_hero_image_mobile_idx" ON "_pages_v_blocks_hero" USING btree ("image_mobile_id");
  CREATE INDEX "_pages_v_blocks_hero_video_idx" ON "_pages_v_blocks_hero" USING btree ("video_id");
  CREATE INDEX "_pages_v_blocks_editorial_order_idx" ON "_pages_v_blocks_editorial" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_editorial_parent_id_idx" ON "_pages_v_blocks_editorial" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_editorial_path_idx" ON "_pages_v_blocks_editorial" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_editorial_locale_idx" ON "_pages_v_blocks_editorial" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_quote_order_idx" ON "_pages_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_quote_parent_id_idx" ON "_pages_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_quote_path_idx" ON "_pages_v_blocks_quote" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_quote_locale_idx" ON "_pages_v_blocks_quote" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_experience_grid_order_idx" ON "_pages_v_blocks_experience_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_experience_grid_parent_id_idx" ON "_pages_v_blocks_experience_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_experience_grid_path_idx" ON "_pages_v_blocks_experience_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_experience_grid_locale_idx" ON "_pages_v_blocks_experience_grid" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_timeline_steps_order_idx" ON "_pages_v_blocks_timeline_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_steps_parent_id_idx" ON "_pages_v_blocks_timeline_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_steps_locale_idx" ON "_pages_v_blocks_timeline_steps" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_timeline_order_idx" ON "_pages_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_parent_id_idx" ON "_pages_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_path_idx" ON "_pages_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_timeline_locale_idx" ON "_pages_v_blocks_timeline" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_facts_items_order_idx" ON "_pages_v_blocks_facts_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_facts_items_parent_id_idx" ON "_pages_v_blocks_facts_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_facts_items_locale_idx" ON "_pages_v_blocks_facts_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_facts_order_idx" ON "_pages_v_blocks_facts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_facts_parent_id_idx" ON "_pages_v_blocks_facts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_facts_path_idx" ON "_pages_v_blocks_facts" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_facts_locale_idx" ON "_pages_v_blocks_facts" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_boat_specs_order_idx" ON "_pages_v_blocks_boat_specs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_boat_specs_parent_id_idx" ON "_pages_v_blocks_boat_specs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_boat_specs_locale_idx" ON "_pages_v_blocks_boat_specs" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_boat_order_idx" ON "_pages_v_blocks_boat" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_boat_parent_id_idx" ON "_pages_v_blocks_boat" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_boat_path_idx" ON "_pages_v_blocks_boat" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_boat_locale_idx" ON "_pages_v_blocks_boat" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_boat_image_idx" ON "_pages_v_blocks_boat" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_gallery_locale_idx" ON "_pages_v_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_gallery_idx" ON "_pages_v_blocks_gallery" USING btree ("gallery_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_locale_idx" ON "_pages_v_blocks_testimonials" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_locale_idx" ON "_pages_v_blocks_faq" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_promo_order_idx" ON "_pages_v_blocks_promo" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_promo_parent_id_idx" ON "_pages_v_blocks_promo" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_promo_path_idx" ON "_pages_v_blocks_promo" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_promo_locale_idx" ON "_pages_v_blocks_promo" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_promo_promotion_idx" ON "_pages_v_blocks_promo" USING btree ("promotion_id");
  CREATE INDEX "_pages_v_blocks_form_order_idx" ON "_pages_v_blocks_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_parent_id_idx" ON "_pages_v_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_path_idx" ON "_pages_v_blocks_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_locale_idx" ON "_pages_v_blocks_form" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_location_order_idx" ON "_pages_v_blocks_location" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_location_parent_id_idx" ON "_pages_v_blocks_location" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_location_path_idx" ON "_pages_v_blocks_location" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_location_locale_idx" ON "_pages_v_blocks_location" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_closing_order_idx" ON "_pages_v_blocks_closing" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_closing_parent_id_idx" ON "_pages_v_blocks_closing" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_closing_path_idx" ON "_pages_v_blocks_closing" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_closing_locale_idx" ON "_pages_v_blocks_closing" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_closing_image_idx" ON "_pages_v_blocks_closing" USING btree ("image_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_locales_parent_id_idx" ON "_pages_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_locale_idx" ON "_pages_v_rels" USING btree ("locale");
  CREATE INDEX "_pages_v_rels_experiences_id_idx" ON "_pages_v_rels" USING btree ("experiences_id","locale");
  CREATE INDEX "_pages_v_rels_testimonials_id_idx" ON "_pages_v_rels" USING btree ("testimonials_id","locale");
  CREATE INDEX "_pages_v_rels_faqs_id_idx" ON "_pages_v_rels" USING btree ("faqs_id","locale");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE UNIQUE INDEX "faqs_locales_locale_parent_id_unique" ON "faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faqs_locales_parent_id_idx" ON "faqs_locales" USING btree ("_parent_id");
  CREATE INDEX "testimonials_experience_idx" ON "testimonials" USING btree ("experience_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE UNIQUE INDEX "testimonials_locales_locale_parent_id_unique" ON "testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "testimonials_locales_parent_id_idx" ON "testimonials_locales" USING btree ("_parent_id");
  CREATE INDEX "promotions_image_idx" ON "promotions" USING btree ("image_id");
  CREATE UNIQUE INDEX "promotions_code_idx" ON "promotions" USING btree ("code");
  CREATE UNIQUE INDEX "promotions_slug_idx" ON "promotions" USING btree ("slug");
  CREATE INDEX "promotions_updated_at_idx" ON "promotions" USING btree ("updated_at");
  CREATE INDEX "promotions_created_at_idx" ON "promotions" USING btree ("created_at");
  CREATE UNIQUE INDEX "promotions_locales_locale_parent_id_unique" ON "promotions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "promotions_locales_parent_id_idx" ON "promotions_locales" USING btree ("_parent_id");
  CREATE INDEX "promotions_rels_order_idx" ON "promotions_rels" USING btree ("order");
  CREATE INDEX "promotions_rels_parent_idx" ON "promotions_rels" USING btree ("parent_id");
  CREATE INDEX "promotions_rels_path_idx" ON "promotions_rels" USING btree ("path");
  CREATE INDEX "promotions_rels_experiences_id_idx" ON "promotions_rels" USING btree ("experiences_id");
  CREATE INDEX "banners_image_idx" ON "banners" USING btree ("image_id");
  CREATE INDEX "banners_promotion_idx" ON "banners" USING btree ("promotion_id");
  CREATE INDEX "banners_updated_at_idx" ON "banners" USING btree ("updated_at");
  CREATE INDEX "banners_created_at_idx" ON "banners" USING btree ("created_at");
  CREATE UNIQUE INDEX "banners_locales_locale_parent_id_unique" ON "banners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "banners_locales_parent_id_idx" ON "banners_locales" USING btree ("_parent_id");
  CREATE INDEX "seasons_ranges_order_idx" ON "seasons_ranges" USING btree ("_order");
  CREATE INDEX "seasons_ranges_parent_id_idx" ON "seasons_ranges" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "seasons_slug_idx" ON "seasons" USING btree ("slug");
  CREATE INDEX "seasons_updated_at_idx" ON "seasons" USING btree ("updated_at");
  CREATE INDEX "seasons_created_at_idx" ON "seasons" USING btree ("created_at");
  CREATE UNIQUE INDEX "seasons_locales_locale_parent_id_unique" ON "seasons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "seasons_locales_parent_id_idx" ON "seasons_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categories_locales_parent_id_idx" ON "categories_locales" USING btree ("_parent_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumb_sizes_thumb_filename_idx" ON "media" USING btree ("sizes_thumb_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_hero_mobile_sizes_hero_mobile_filename_idx" ON "media" USING btree ("sizes_hero_mobile_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "galleries_slug_idx" ON "galleries" USING btree ("slug");
  CREATE INDEX "galleries_cover_idx" ON "galleries" USING btree ("cover_id");
  CREATE INDEX "galleries_updated_at_idx" ON "galleries" USING btree ("updated_at");
  CREATE INDEX "galleries_created_at_idx" ON "galleries" USING btree ("created_at");
  CREATE UNIQUE INDEX "galleries_locales_locale_parent_id_unique" ON "galleries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "galleries_locales_parent_id_idx" ON "galleries_locales" USING btree ("_parent_id");
  CREATE INDEX "galleries_rels_order_idx" ON "galleries_rels" USING btree ("order");
  CREATE INDEX "galleries_rels_parent_idx" ON "galleries_rels" USING btree ("parent_id");
  CREATE INDEX "galleries_rels_path_idx" ON "galleries_rels" USING btree ("path");
  CREATE INDEX "galleries_rels_media_id_idx" ON "galleries_rels" USING btree ("media_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_experiences_id_idx" ON "redirects_rels" USING btree ("experiences_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_inquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("inquiries_id");
  CREATE INDEX "payload_locked_documents_rels_conversion_events_id_idx" ON "payload_locked_documents_rels" USING btree ("conversion_events_id");
  CREATE INDEX "payload_locked_documents_rels_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("experiences_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_promotions_id_idx" ON "payload_locked_documents_rels" USING btree ("promotions_id");
  CREATE INDEX "payload_locked_documents_rels_banners_id_idx" ON "payload_locked_documents_rels" USING btree ("banners_id");
  CREATE INDEX "payload_locked_documents_rels_seasons_id_idx" ON "payload_locked_documents_rels" USING btree ("seasons_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_galleries_id_idx" ON "payload_locked_documents_rels" USING btree ("galleries_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_credentials_order_idx" ON "site_settings_credentials" USING btree ("_order");
  CREATE INDEX "site_settings_credentials_parent_id_idx" ON "site_settings_credentials" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_credentials_locales_locale_parent_id_unique" ON "site_settings_credentials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_credentials_locales_parent_id_idx" ON "site_settings_credentials_locales" USING btree ("_parent_id");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_locales_parent_id_idx" ON "site_settings_locales" USING btree ("_parent_id");
  CREATE INDEX "navigation_main_order_idx" ON "navigation_main" USING btree ("_order");
  CREATE INDEX "navigation_main_parent_id_idx" ON "navigation_main" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_main_locales_locale_parent_id_unique" ON "navigation_main_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_main_locales_parent_id_idx" ON "navigation_main_locales" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_order_idx" ON "navigation_footer" USING btree ("_order");
  CREATE INDEX "navigation_footer_parent_id_idx" ON "navigation_footer" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_footer_locales_locale_parent_id_unique" ON "navigation_footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_footer_locales_parent_id_idx" ON "navigation_footer_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_locales_locale_parent_id_unique" ON "navigation_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_locales_parent_id_idx" ON "navigation_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "announcement_locales_locale_parent_id_unique" ON "announcement_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "announcement_locales_parent_id_idx" ON "announcement_locales" USING btree ("_parent_id");
  CREATE INDEX "integrations_notifications_types_order_idx" ON "integrations_notifications_types" USING btree ("order");
  CREATE INDEX "integrations_notifications_types_parent_idx" ON "integrations_notifications_types" USING btree ("parent_id");
  CREATE INDEX "integrations_notifications_order_idx" ON "integrations_notifications" USING btree ("_order");
  CREATE INDEX "integrations_notifications_parent_id_idx" ON "integrations_notifications" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "inquiries" CASCADE;
  DROP TABLE "conversion_events" CASCADE;
  DROP TABLE "experiences_occasions" CASCADE;
  DROP TABLE "experiences_itinerary" CASCADE;
  DROP TABLE "experiences_itinerary_locales" CASCADE;
  DROP TABLE "experiences_included" CASCADE;
  DROP TABLE "experiences_included_locales" CASCADE;
  DROP TABLE "experiences_extras" CASCADE;
  DROP TABLE "experiences_extras_locales" CASCADE;
  DROP TABLE "experiences_departures_days_of_week" CASCADE;
  DROP TABLE "experiences_departures" CASCADE;
  DROP TABLE "experiences_departures_locales" CASCADE;
  DROP TABLE "experiences_price_options" CASCADE;
  DROP TABLE "experiences_price_options_locales" CASCADE;
  DROP TABLE "experiences" CASCADE;
  DROP TABLE "experiences_locales" CASCADE;
  DROP TABLE "experiences_rels" CASCADE;
  DROP TABLE "_experiences_v_version_occasions" CASCADE;
  DROP TABLE "_experiences_v_version_itinerary" CASCADE;
  DROP TABLE "_experiences_v_version_itinerary_locales" CASCADE;
  DROP TABLE "_experiences_v_version_included" CASCADE;
  DROP TABLE "_experiences_v_version_included_locales" CASCADE;
  DROP TABLE "_experiences_v_version_extras" CASCADE;
  DROP TABLE "_experiences_v_version_extras_locales" CASCADE;
  DROP TABLE "_experiences_v_version_departures_days_of_week" CASCADE;
  DROP TABLE "_experiences_v_version_departures" CASCADE;
  DROP TABLE "_experiences_v_version_departures_locales" CASCADE;
  DROP TABLE "_experiences_v_version_price_options" CASCADE;
  DROP TABLE "_experiences_v_version_price_options_locales" CASCADE;
  DROP TABLE "_experiences_v" CASCADE;
  DROP TABLE "_experiences_v_locales" CASCADE;
  DROP TABLE "_experiences_v_rels" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_editorial" CASCADE;
  DROP TABLE "pages_blocks_quote" CASCADE;
  DROP TABLE "pages_blocks_experience_grid" CASCADE;
  DROP TABLE "pages_blocks_timeline_steps" CASCADE;
  DROP TABLE "pages_blocks_timeline" CASCADE;
  DROP TABLE "pages_blocks_facts_items" CASCADE;
  DROP TABLE "pages_blocks_facts" CASCADE;
  DROP TABLE "pages_blocks_boat_specs" CASCADE;
  DROP TABLE "pages_blocks_boat" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_promo" CASCADE;
  DROP TABLE "pages_blocks_form" CASCADE;
  DROP TABLE "pages_blocks_location" CASCADE;
  DROP TABLE "pages_blocks_closing" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_editorial" CASCADE;
  DROP TABLE "_pages_v_blocks_quote" CASCADE;
  DROP TABLE "_pages_v_blocks_experience_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_facts_items" CASCADE;
  DROP TABLE "_pages_v_blocks_facts" CASCADE;
  DROP TABLE "_pages_v_blocks_boat_specs" CASCADE;
  DROP TABLE "_pages_v_blocks_boat" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_promo" CASCADE;
  DROP TABLE "_pages_v_blocks_form" CASCADE;
  DROP TABLE "_pages_v_blocks_location" CASCADE;
  DROP TABLE "_pages_v_blocks_closing" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "faqs_locales" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "testimonials_locales" CASCADE;
  DROP TABLE "promotions" CASCADE;
  DROP TABLE "promotions_locales" CASCADE;
  DROP TABLE "promotions_rels" CASCADE;
  DROP TABLE "banners" CASCADE;
  DROP TABLE "banners_locales" CASCADE;
  DROP TABLE "seasons_ranges" CASCADE;
  DROP TABLE "seasons" CASCADE;
  DROP TABLE "seasons_locales" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "galleries" CASCADE;
  DROP TABLE "galleries_locales" CASCADE;
  DROP TABLE "galleries_rels" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_credentials" CASCADE;
  DROP TABLE "site_settings_credentials_locales" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "navigation_main" CASCADE;
  DROP TABLE "navigation_main_locales" CASCADE;
  DROP TABLE "navigation_footer" CASCADE;
  DROP TABLE "navigation_footer_locales" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "navigation_locales" CASCADE;
  DROP TABLE "announcement" CASCADE;
  DROP TABLE "announcement_locales" CASCADE;
  DROP TABLE "integrations_notifications_types" CASCADE;
  DROP TABLE "integrations_notifications" CASCADE;
  DROP TABLE "integrations" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_inquiries_type";
  DROP TYPE "public"."enum_inquiries_occasion";
  DROP TYPE "public"."enum_inquiries_status";
  DROP TYPE "public"."enum_inquiries_source_device";
  DROP TYPE "public"."enum_conversion_events_type";
  DROP TYPE "public"."enum_conversion_events_source_device";
  DROP TYPE "public"."enum_experiences_occasions";
  DROP TYPE "public"."enum_experiences_departures_days_of_week";
  DROP TYPE "public"."enum_experiences_price_options_passenger_type";
  DROP TYPE "public"."enum_experiences_availability";
  DROP TYPE "public"."enum_experiences_time_of_day";
  DROP TYPE "public"."enum_experiences_booking_mode";
  DROP TYPE "public"."enum_experiences_booking_provider";
  DROP TYPE "public"."enum_experiences_status";
  DROP TYPE "public"."enum__experiences_v_version_occasions";
  DROP TYPE "public"."enum__experiences_v_version_departures_days_of_week";
  DROP TYPE "public"."enum__experiences_v_version_price_options_passenger_type";
  DROP TYPE "public"."enum__experiences_v_version_availability";
  DROP TYPE "public"."enum__experiences_v_version_time_of_day";
  DROP TYPE "public"."enum__experiences_v_version_booking_mode";
  DROP TYPE "public"."enum__experiences_v_version_booking_provider";
  DROP TYPE "public"."enum__experiences_v_version_status";
  DROP TYPE "public"."enum__experiences_v_published_locale";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_editorial_background";
  DROP TYPE "public"."enum_pages_blocks_quote_background";
  DROP TYPE "public"."enum_pages_blocks_experience_grid_source";
  DROP TYPE "public"."enum_pages_blocks_experience_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_facts_items_icon";
  DROP TYPE "public"."enum_pages_blocks_facts_background";
  DROP TYPE "public"."enum_pages_blocks_gallery_layout";
  DROP TYPE "public"."enum_pages_blocks_form_form_type";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_editorial_background";
  DROP TYPE "public"."enum__pages_v_blocks_quote_background";
  DROP TYPE "public"."enum__pages_v_blocks_experience_grid_source";
  DROP TYPE "public"."enum__pages_v_blocks_experience_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_facts_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_facts_background";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__pages_v_blocks_form_form_type";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_faqs_category";
  DROP TYPE "public"."enum_testimonials_origin";
  DROP TYPE "public"."enum_promotions_benefit_type";
  DROP TYPE "public"."enum_banners_placement";
  DROP TYPE "public"."enum_banners_style";
  DROP TYPE "public"."enum_media_register";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_integrations_notifications_types";
  DROP TYPE "public"."enum_integrations_site_mode";
  DROP TYPE "public"."enum_integrations_booking_provider";`)
}
