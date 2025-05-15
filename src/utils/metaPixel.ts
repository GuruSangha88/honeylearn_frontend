
/**
 * Utility functions for Facebook Meta Pixel events
 */

// Check if fbq is available
const isFbqAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
};

/**
 * Track a page view event
 * @param path The path of the viewed page
 */
export const trackPageView = (path?: string): void => {
  if (isFbqAvailable()) {
    if (path) {
      window.fbq('track', 'PageView', { path });
    } else {
      window.fbq('track', 'PageView');
    }
    console.log('📊 Meta PageView event tracked', path ? { path } : '');
  }
};

/**
 * Track a sign-up event
 * @param method The sign-up method used (email, google, etc.)
 */
export const trackSignUp = (method: string = 'email'): void => {
  if (isFbqAvailable()) {
    window.fbq('track', 'CompleteRegistration', { method });
    console.log('📊 Meta CompleteRegistration event tracked', { method });
  }
};

/**
 * Track a trial start event
 */
export const trackTrialStart = (): void => {
  if (isFbqAvailable()) {
    window.fbq('track', 'StartTrial', {
      value: 9.99,
      currency: 'USD',
      predicted_ltv: 119.88 // 9.99 * 12 months
    });
    console.log('📊 Meta StartTrial event tracked');
  }
};

/**
 * Track a subscription purchase event
 * @param value The value of the purchase
 */
export const trackSubscription = (value: number = 9.99): void => {
  if (isFbqAvailable()) {
    window.fbq('track', 'Purchase', {
      value,
      currency: 'USD',
      content_type: 'subscription'
    });
    console.log('📊 Meta Purchase event tracked', { value });
  }
};

/**
 * Track when users view specific content
 * @param contentName The name of the content being viewed
 * @param contentId Optional content ID
 * @param contentType The type of content (e.g., 'topic', 'lesson')
 */
export const trackViewContent = (contentName: string, contentId?: string, contentType: string = 'lesson'): void => {
  if (isFbqAvailable()) {
    window.fbq('track', 'ViewContent', {
      content_name: contentName,
      content_ids: contentId ? [contentId] : undefined,
      content_type: contentType
    });
    console.log('📊 Meta ViewContent event tracked', { contentName, contentId, contentType });
  }
};

/**
 * Track a lead event (when a user shows interest)
 * @param source The source of the lead (e.g., 'newsletter', 'free_trial')
 */
export const trackLead = (source: string): void => {
  if (isFbqAvailable()) {
    window.fbq('track', 'Lead', { source });
    console.log('📊 Meta Lead event tracked', { source });
  }
};
