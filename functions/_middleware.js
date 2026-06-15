export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Only intercept HTML file requests
    if (url.pathname === '/' || url.pathname === '/index.html') {
      const response = await fetch(request);
      let html = await response.text();
      
      // Replace placeholder with environment variable
      html = html.replace(
        'RECAPTCHA_SITE_KEY_PLACEHOLDER',
        env.RECAPTCHA_SITE_KEY || 'MISSING_KEY'
      );
      
      return new Response(html, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
    }
    
    // For all other requests, pass through as-is
    return fetch(request);
  }
};