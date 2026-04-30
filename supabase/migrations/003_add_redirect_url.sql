-- Allow form creators to redirect respondents to a custom URL after submission.
-- When set, the runtime sends respondents to this URL instead of the thank-you screen.
alter table public.forms
  add column redirect_url text default null;
