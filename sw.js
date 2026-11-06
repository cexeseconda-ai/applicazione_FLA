const VERSION = 'fla-tascabile-2026-v1';
const ASSETS = ['./', './index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event => {event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event => {event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event => { if(event.request.method!=='GET'||new URL(event.request.url).origin!==location.origin) return; event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request))); });
