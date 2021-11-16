const APP_PREFIX = 'budget-tracker-';
const VERSION = '0.1'
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/assets/css/styles.css',
    '/assets/js/index.js',
    '/assets/js/idb.js',
    '/manifest.json',
    '/assets/icons/icon-512x512.png',
    '/assets/icons/icon-384x384.png',
    '/assets/icons/icon-192x192.png',
    '/assets/icons/icon-152x152.png',
    '/assets/icons/icon-144x144.png',
    '/assets/icons/icon-128x128.png',
    '/assets/icons/icon-96x96.png',
    '/assets/icons/icon-72x72.png'
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    )
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            let cacheKeepList = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            })

            cacheKeepList.push(CACHE_NAME);

            return Promise.all(keyList.map(function (key, i) {
                if (cacheKeepList.indexOf(key) === -1) {
                    console.log('deleting cache : ' + keyList[i]);
                    return caches.delete(keyList[i]);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function (evt) {
    evt.respondWith(
        caches.match(evt.request).then(request => {
            if (request) {
                console.log(evt.request.url);
                return fetch(evt.request)
            }
        })
    )
});