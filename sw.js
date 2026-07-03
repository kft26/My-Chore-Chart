const CACHE='cq-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html'])));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res.status===200){const cl=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cl));}return res;}).catch(()=>{if(e.request.mode==='navigate')return caches.match('./index.html');})));});
