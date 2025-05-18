// Analytics utility to track important events

/**
 * Tracks a page view in Google Analytics
 * @param pagePath The path of the page being viewed
 * @param pageTitle The title of the page being viewed
 */
export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
      page_location: window.location.href
    });
    console.log(`📊 Page view tracked: ${pageTitle}`);
  }
};

/**
 * Tracks a specific event in Google Analytics
 * @param eventName The name of the event to track
 * @param eventParams Optional parameters for the event
 */
export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
    console.log(`📊 Event tracked: ${eventName}`, eventParams);
  }
};

/**
 * Tracks a signup event in Google Analytics
 * @param method The signup method (email, google, etc.)
 */
export const trackSignup = (method: string = 'email') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'sign_up', {
      method: method
    });
    console.log(`📊 Signup tracked: ${method}`);
  }
};

/**
 * Tracks a login event in Google Analytics
 * @param method The login method (email, google, etc.)
 */
export const trackLogin = (method: string = 'email') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'login', {
      method: method
    });
    console.log(`📊 Login tracked: ${method}`);
  }
};

/**
 * Tracks when a user starts the trial subscription
 */
export const trackTrialStart = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'start_trial', {
      currency: 'USD',
      value: 9.99
    });
    console.log(`📊 Trial start tracked`);
  }
};

/**
 * Tracks a purchase event in Google Analytics
 */
export const trackSubscription = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: `sub_${new Date().getTime()}`,
      value: 9.99,
      currency: 'USD',
      items: [{
        item_id: 'premium_subscription',
        item_name: 'HoneyLearn Premium Subscription',
        price: 9.99
      }]
    });
    console.log(`📊 Subscription purchase tracked`);
  }
};
