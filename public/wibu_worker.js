
self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
    console.log('Service worker installing...');
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
    console.log('Service worker activating...');
});

self.addEventListener('push', function (event) {
    console.log('Push event received:', event);
})
