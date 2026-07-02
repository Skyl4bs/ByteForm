"use client";

import posthog from "posthog-js";
import {
  POSTHOG_KEY,
  POSTHOG_PROXY_HOST,
  isAnalyticsEnabled,
} from "./config";
import type { AnalyticsEventName, AnalyticsProps } from "./events";

let initialized = false;

/**
 * Initialize the browser SDK exactly once per page load.
 *
 * Called from the top-level provider, *not* from event-capture call sites,
 * so that components can safely call `capture(...)` without worrying about
 * order of operations.
 */
export function initPostHog(): void {
  if (initialized || !isAnalyticsEnabled || typeof window === "undefined") {
    return;
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_PROXY_HOST,
    // We trigger pageviews manually from the provider so SPA navigation in
    // the App Router is captured reliably.
    capture_pageview: false,
    capture_pageleave: true,
    // Only create person profiles for users we explicitly `identify()`.
    // Anonymous traffic is still tracked for funnels/retention, but we
    // don't burn billed MTUs on people who never sign up.
    person_profiles: "identified_only",
    // Session recording is enabled — controlled centrally from the PostHog
    // UI (Project settings → Session replay) so we can throttle sampling
    // or pause without a deploy.
    disable_session_recording: false,
    session_recording: {
      // Mask all <input>, <textarea> and elements marked `ph-no-capture`
      // so we never record what people type. Visual interactions only.
      maskAllInputs: true,
      maskTextSelector: ".ph-no-capture",
    },
    // Quieter console in development.
    loaded: (ph) => {
      if (process.env.NODE_ENV === "development") ph.debug(false);
    },
  });

  initialized = true;
}

export function capture(
  event: AnalyticsEventName,
  properties?: AnalyticsProps
): void {
  if (!isAnalyticsEnabled || typeof window === "undefined") return;
  posthog.capture(event, properties);
}

export function identifyUser(
  distinctId: string,
  properties?: AnalyticsProps
): void {
  if (!isAnalyticsEnabled || typeof window === "undefined") return;
  posthog.identify(distinctId, properties);
}

export function resetUser(): void {
  if (!isAnalyticsEnabled || typeof window === "undefined") return;
  posthog.reset();
}

export function capturePageview(url: string): void {
  if (!isAnalyticsEnabled || typeof window === "undefined") return;
  posthog.capture("$pageview", { $current_url: url });
}
