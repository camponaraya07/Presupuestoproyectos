/* Sustituto local de las capacidades de Claude (db, downloads) para usar la app fuera de Claude.
   Guarda los datos en localStorage del navegador (un solo dispositivo). */
if (typeof window.claude === 'undefined') {
  const KEY = 'gestion-obras-db';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const listeners = {};
  const snapOf = c => {
    const col = load()[c] || {};
    return { docs: Object.entries(col).map(([id, d]) => ({ id, data: () => d })), metadata: { fromCache: false } };
  };
  const notify = c => (listeners[c] || []).forEach(f => f(snapOf(c)));
  const db = {
    collection: c => ({
      doc: id => ({
        set: async body => { const all = load(); (all[c] ||= {})[id] = body; localStorage.setItem(KEY, JSON.stringify(all)); notify(c); },
        delete: async () => { const all = load(); if (all[c]) delete all[c][id]; localStorage.setItem(KEY, JSON.stringify(all)); notify(c); }
      }),
      onSnapshot: next => { (listeners[c] ||= []).push(next); setTimeout(() => next(snapOf(c)), 0); return () => { listeners[c] = listeners[c].filter(f => f !== next); }; }
    })
  };
  const downloads = {
    save: async ({ filename, data }) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([data]));
      a.download = filename; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      return { status: 'saved' };
    }
  };
  window.claude = { use: async name => ({ db, downloads }[name] || null) };
}
