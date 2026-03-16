-- Allow direct video uploads (youtube_url is no longer required)
alter table projects alter column youtube_url drop not null;
