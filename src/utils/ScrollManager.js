let subscribers = [];
let scrollY = 0;
let ticking = false;

function notify() { 
  subscribers.forEach(cb => cb(scrollY)); 
}

function onScroll() {
  scrollY = window.scrollY;
  if (!ticking) {
    requestAnimationFrame(() => {
      notify();
      ticking = false;
    });
    ticking = true;
  }
}

export const ScrollManager = {
  init() {
    if (typeof window !== "undefined" && !this._inited) {
      window.addEventListener("scroll", onScroll, { passive: true });
      this._inited = true;
    }
  },
  getScrollY: () => scrollY,
  subscribe(cb) {
    subscribers.push(cb);
    return () => { 
      subscribers = subscribers.filter(f => f !== cb); 
    };
  },
  destroy() {
    if (typeof window !== 'undefined' && this._inited) {
      window.removeEventListener('scroll', onScroll);
      subscribers = [];
      scrollY = 0;
      ticking = false;
      this._inited = false;
    }
  }
};

// Auto-initialize the manager when the module is loaded.
ScrollManager.init(); 