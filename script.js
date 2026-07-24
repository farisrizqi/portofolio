// Signature moment: contour lines morph into a network graph
// as the divider scrolls into view.
(function () {
  var morph = document.getElementById('morph');
  if (!morph) return;

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    morph.classList.add('is-active');
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          morph.classList.add('is-active');
        } else if (entry.boundingClientRect.top > 0) {
          // scrolled back above it — reset so it can replay
          morph.classList.remove('is-active');
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(morph);
})();

// Smooth active-state on nav links based on scroll position (progressive enhancement)
(function () {
  var sections = document.querySelectorAll('main section[id]');
  var links = document.querySelectorAll('.nav__links a');
  if (!sections.length || !links.length) return;

  var map = {};
  links.forEach(function (link) {
    var id = link.getAttribute('href').replace('#', '');
    map[id] = link;
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var link = map[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.style.color = ''; });
          link.style.color = 'var(--tarn-deep)';
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach(function (s) { observer.observe(s); });
})();
