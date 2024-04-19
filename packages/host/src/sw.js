//import { cache } from "webpack";

const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

self.addEventListener('install', function(event) {
    console.log("service worker instaling.", event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            console.log("[Service Worker] Precatching Static Data")
            cache.addAll(
                '/',
                'index.html',
                'main.bundle.js',
                '/assets/logo.png',
                '/sounds/fairy.mp3',
                'manifest.json'
                );
            //cache.put('')
        })
    );
});

self.addEventListener('activate', function(event) {
    console.log("service worker activating.", event);
    event.waitUntil(
        caches.keys()
        .then(keyList => {
            return Promise.all(keyList.map(key => {
                if(key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
                    console.log('[Service Worker] Removing old cache', key);
                    return caches.delete(key);

                }
            }));
        })
    )
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    console.log("service worker fetching.", event.request.url);
    /// excepcion para audio
    if (event.request.url.endsWith('sounds/fairy.mp3')) {
        event.respondWith(
            caches.match(event.request).then(response => {
                return response || fetch(event.request);
            }).catch(error => {
                console.error('Fetching failed:', error);
                return new Response('Failed to fetch audio', {
                    status: 404,
                    headers: { 'Content-Type': 'text/plain' }
                });
            })
        );
    }
    ///
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if(response) {
                return response;
            } else {
                return fetch(event.request)
                .then(response => {
                    caches.open(CACHE_DYNAMIC_NAME)
                    .then(cache => {
                        cache.put(event.request.url, response.clone());
                        return response;
                    })
                    .catch(err => console.log(err))
                })
            }
        })
    )
});