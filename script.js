// ==========================================================
// 1. Signature moment: Contour lines morph into network graph
// ==========================================================
(function () {
  var morph = document.getElementById('morph');
  if (!morph) return;

  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
          morph.classList.remove('is-active');
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(morph);
})();

// ==========================================================
// 2. Active-state on nav links based on scroll position
// ==========================================================
(function () {
  var sections = document.querySelectorAll('main section[id]');
  var links = document.querySelectorAll('.nav__links a:not(.nav__cta-mobile)');
  if (!sections.length || !links.length) return;

  var map = {};
  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      var id = href.replace('#', '');
      map[id] = link;
    }
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
    { rootMargin: '-30% 0px -50% 0px' }
  );

  sections.forEach(function (s) { observer.observe(s); });
})();

// ==========================================================
// 3. Theme Toggle (Light / Dark Mode with LocalStorage)
// ==========================================================
(function () {
  var toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('fnr-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('fnr-theme', 'light');
    }
  }

  toggleBtn.addEventListener('click', function () {
    var nextTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });
})();

// ==========================================================
// 4. Mobile Navigation Drawer
// ==========================================================
(function () {
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  if (!nav || !burger || !navLinks) return;

  function toggleMenu(open) {
    var isOpen = typeof open === 'boolean' ? open : !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  burger.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      toggleMenu(false);
    });
  });

  document.addEventListener('click', function (e) {
    if (nav.classList.contains('is-open') && !nav.contains(e.target)) {
      toggleMenu(false);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      toggleMenu(false);
    }
  });
})();

// ==========================================================
// 5. Interactive AI Automation & n8n Blueprint Simulator
// ==========================================================
(function () {
  var tabsContainer = document.getElementById('workflowTabs');
  var runBtn = document.getElementById('wfRunBtn');
  var statusPill = document.getElementById('wfStatusPill');
  var canvasTitle = document.getElementById('wfCanvasTitle');
  var codeOutput = document.getElementById('wfCodeOutput');
  var visualOutput = document.getElementById('wfVisualOutput');
  var previewTag = document.getElementById('wfPreviewTag');
  if (!tabsContainer) return;

  var blueprints = {
    erp: {
      file: 'n8n-production // multi-saas-agentic-pipeline.json',
      previewTag: 'WhatsApp (GOWA) & Email Dispatch',
      nodes: [
        { badge: 'TRIGGER', time: '0ms', title: 'Webhook & Cron Scheduler', desc: 'Menerima event real-time & penjadwalan penarikan data operasional klien' },
        { badge: 'REST API', time: '180ms', title: 'Multi-SaaS Connectors', desc: 'Integrasi API Kledo, Odoo, Zenoti, Mekari & Google Cloud Platform (GCP)' },
        { badge: 'MCP & ROUTER', time: '310ms', title: 'Agentic AI & Custom MCP', desc: 'Routing logic, skill, pre-built & custom MCP untuk konteks data lintas sistem' },
        { badge: 'LLM ENGINE', time: '640ms', title: 'OpenRouter (Hermes Model)', desc: 'Orkestrasi token & reasoning model AI untuk sintesis insight dan keputusan' },
        { badge: 'DISPATCH', time: '820ms', title: 'WhatsApp (GOWA) & Email', desc: 'Pengiriman laporan otomatis & notifikasi interaktif langsung ke stakeholder' }
      ],
      json: JSON.stringify({
        workflow: 'enterprise-multi-saas-sync',
        engine: 'n8n-self-hosted v1.x',
        connectors_active: ['Kledo_API', 'Odoo_RPC', 'Zenoti_REST', 'Mekari_Auth', 'GCP_BigQuery'],
        agentic_layer: {
          orchestrator: 'OpenRouter',
          model: 'nousresearch/hermes-3-llama-3.1',
          mcp_tools_called: ['fetch_kledo_invoices', 'sync_odoo_inventory', 'analyze_daily_revenue'],
          token_usage: { prompt: 612, completion: 284, latency_ms: 640 }
        },
        dispatch_status: {
          whatsapp_gowa: 'SENT (200 OK)',
          email_smtp: 'DELIVERED'
        }
      }, null, 2),
      visualHtml:
        '<div class="wa-mock">' +
        '<div class="wa-mock__header">' +
        '<span class="wa-mock__avatar">AI</span>' +
        '<div><strong>Enterprise AI Assistant (via GOWA)</strong><span>Online · Automated Business Report</span></div>' +
        '</div>' +
        '<div class="wa-mock__bubble">' +
        '<p>📊 <strong>RINGKASAN EKSEKUTIF HARIAN (AUTO-SYNC)</strong></p>' +
        '<p>Halo Tim Manajemen, berikut hasil sinkronisasi otomatis dari <strong>Kledo, Odoo &amp; Zenoti</strong> hari ini:</p>' +
        '<ul>' +
        '<li>✅ <strong>Kledo Finance:</strong> 42 Invoice terverifikasi (Rp 68.450.000)</li>' +
        '<li>📦 <strong>Odoo Inventory:</strong> 3 SKU perlu restock segera</li>' +
        '<li>👥 <strong>Zenoti &amp; Mekari:</strong> 128 transaksi cabang tersinkronisasi ke GCP</li>' +
        '</ul>' +
        '<p class="wa-mock__insight">💡 <em>AI Insight (Hermes): Pendapatan naik +14.2% dibanding rata-rata minggu lalu. Laporan PDF lengkap telah dikirim ke email direksi.</em></p>' +
        '<span class="wa-mock__time">17:00 WIB · ✓✓ Terkirim via n8n + GOWA</span>' +
        '</div>' +
        '</div>'
    },
    chatbot: {
      file: 'n8n-self-hosted // yhni-agentic-chatbot-webhook.json',
      previewTag: 'Live Web Chatbot Widget (yhniyogya.or.id)',
      nodes: [
        { badge: 'WEBHOOK', time: '0ms', title: 'Incoming Chat Webhook', desc: 'Menerima pesan pengunjung dari widget situs resmi yhniyogya.or.id via HTTP POST' },
        { badge: 'SESSION', time: '95ms', title: 'n8n Self-Hosted Router', desc: 'Manajemen memori percakapan, validasi payload & routing intent pertanyaan' },
        { badge: 'MCP SERVER', time: '240ms', title: 'Pre-built & Custom MCP', desc: 'Mengakses informasi program yayasan, jadwal kegiatan, & kontak operasional' },
        { badge: 'AI AGENT', time: '580ms', title: 'Agentic LLM Response', desc: 'Menyusun jawaban ramah, akurat, dan kontekstual sesuai basis pengetahuan yayasan' },
        { badge: 'RESPONSE', time: '690ms', title: 'Webhook JSON Reply', desc: 'Mengembalikan balasan instan ke antarmuka chat pengunjung web (< 1 detik)' }
      ],
      json: JSON.stringify({
        webhook_event: 'chat.message.received',
        source_domain: 'https://yhniyogya.or.id',
        n8n_instance: 'self-hosted-docker-linux',
        agent_execution: {
          intent_detected: 'info_program_donasi_dan_kegiatan',
          mcp_context_loaded: ['yhni_profile_kb', 'jadwal_kajian_yayasan', 'kontak_admin_wa'],
          confidence_score: 0.97,
          response_time_ms: 690
        },
        http_response: {
          status: 200,
          reply_delivered: true
        }
      }, null, 2),
      visualHtml:
        '<div class="wa-mock">' +
        '<div class="wa-mock__header">' +
        '<span class="wa-mock__avatar">YH</span>' +
        '<div><strong>Asisten AI Yayasan Haadii Nurul Ikhlas</strong><span>yhniyogya.or.id · Powered by n8n Self-Hosted</span></div>' +
        '</div>' +
        '<div class="wa-mock__bubble">' +
        '<p>👤 <strong>Pengunjung Web:</strong> <em>&ldquo;Assalamu\'alaikum, bagaimana cara menyalurkan donasi dan melihat jadwal kegiatan yayasan?&rdquo;</em></p>' +
        '<p class="wa-mock__insight">🤖 <strong>AI Agent YHNI:</strong> Wa\'alaikumussalam Kak! Untuk penyaluran donasi dan program sosial Yayasan Haadii Nurul Ikhlas, Kakak dapat langsung mengunjungi menu <strong>Program &amp; Donasi</strong> atau konfirmasi otomatis via WhatsApp Admin kami. Berikut rincian jadwal kegiatan pekan ini...</p>' +
        '<span class="wa-mock__time">Respon Otomatis dalam 0.69 detik · Webhook 200 OK</span>' +
        '</div>' +
        '</div>'
    },
    gowa: {
      file: 'cloudflare-edge // kledo-vibe-app-gowa-reminder.json',
      previewTag: 'Kledo Web App + GOWA Self-Hosted',
      nodes: [
        { badge: 'WEB & CRON', time: '0ms', title: 'Cloudflare Workers & Pages', desc: 'Trigger terjadwal (Cron) & input dari aplikasi web operasional internal (vibe coding)' },
        { badge: 'API SYNC', time: '150ms', title: 'Kledo API & Supabase', desc: 'Sinkronisasi data tagihan/operasional Kledo & antrean tugas di PostgreSQL Supabase' },
        { badge: 'EVALUATOR', time: '260ms', title: 'Priority & Due Logic', desc: 'Mengevaluasi tenggat waktu tugas, status invoice, dan daftar penerima (recipients)' },
        { badge: 'GATEWAY', time: '490ms', title: 'GOWA Automation Engine', desc: 'Mengirim payload pesan terformat melalui GOWA (Go WhatsApp WebSocket self-hosted)' },
        { badge: 'DELIVERED', time: '610ms', title: 'Real-Time WA Notification', desc: 'Pesan diterima klien/staf dengan pembaruan status otomatis di database' }
      ],
      json: JSON.stringify({
        worker_env: 'cloudflare-workers-production',
        integrations: ['Kledo_Accounting_API', 'Supabase_PostgreSQL', 'GOWA_Self_Hosted'],
        task_payload: {
          task_id: 'TSK-2026-884',
          title: 'Verifikasi Invoice Kledo #INV/2026/1092',
          assigned_to: '+628950698xxxx',
          due_in_minutes: 30,
          status: 'REMINDER_DISPATCHED'
        },
        gowa_gateway_response: {
          code: 200,
          message_id: '3EB0A892F1C48291',
          ack: 'SERVER_ACK'
        }
      }, null, 2),
      visualHtml:
        '<div class="wa-mock">' +
        '<div class="wa-mock__header">' +
        '<span class="wa-mock__avatar">GW</span>' +
        '<div><strong>GOWA Task &amp; Kledo Operations Bot</strong><span>Cloudflare Workers + GOWA Self-Hosted</span></div>' +
        '</div>' +
        '<div class="wa-mock__bubble">' +
        '<p>🔔 <strong>PENGINGAT OPERASIONAL &amp; TUGAS</strong></p>' +
        '<ul>' +
        '<li>📌 <strong>Tugas:</strong> Verifikasi Invoice Kledo <code>#INV/2026/1092</code></li>' +
        '<li>⏰ <strong>Tenggat:</strong> Hari ini, 16:00 WIB (30 menit lagi)</li>' +
        '<li>🔗 <strong>Status API Kledo:</strong> Menunggu Approval Finance</li>' +
        '</ul>' +
        '<p class="wa-mock__insight">✅ Ketik <strong>SELESAI</strong> atau klik tautan dashboard untuk memperbarui status secara real-time di Supabase.</p>' +
        '<span class="wa-mock__time">15:30 WIB · ✓✓ Delivered via GOWA Engine</span>' +
        '</div>' +
        '</div>'
    }
  };

  var nodeElements = document.querySelectorAll('#wfNodes .wf-node');
  var simTimer = null;

  function renderBlueprint(key) {
    var bp = blueprints[key];
    if (!bp) return;

    canvasTitle.textContent = bp.file;
    previewTag.textContent = bp.previewTag;
    codeOutput.innerHTML = '<code>' + bp.json.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</code>';
    visualOutput.innerHTML = bp.visualHtml;

    bp.nodes.forEach(function (n, idx) {
      var el = nodeElements[idx];
      if (!el) return;
      el.querySelector('.wf-node__badge').textContent = n.badge;
      el.querySelector('.wf-node__time').textContent = n.time;
      el.querySelector('.wf-node__title').textContent = n.title;
      el.querySelector('.wf-node__desc').textContent = n.desc;
      el.classList.remove('is-active-step');
    });

    if (statusPill) {
      statusPill.textContent = 'Status: Ready';
    }
  }

  function runSimulation() {
    clearInterval(simTimer);
    nodeElements.forEach(function (el) { el.classList.remove('is-active-step'); });

    var step = 0;
    if (statusPill) statusPill.textContent = '⚡ Running Step 1/5...';

    simTimer = setInterval(function () {
      nodeElements.forEach(function (el) { el.classList.remove('is-active-step'); });
      if (step < nodeElements.length) {
        nodeElements[step].classList.add('is-active-step');
        if (statusPill) {
          statusPill.textContent = '⚡ Executing Node ' + (step + 1) + '/5 (' + nodeElements[step].querySelector('.wf-node__badge').textContent + ')';
        }
        step++;
      } else {
        clearInterval(simTimer);
        if (statusPill) {
          statusPill.textContent = '✓ Workflow Completed (200 OK)';
        }
      }
    }, 420);
  }

  tabsContainer.querySelectorAll('.wf-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabsContainer.querySelectorAll('.wf-tab').forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
      var wfKey = tab.getAttribute('data-wf');
      renderBlueprint(wfKey);
      runSimulation();
    });
  });

  if (runBtn) {
    runBtn.addEventListener('click', function () {
      runSimulation();
    });
  }
})();

// ==========================================================
// 6. Project Output Detail Modal
// ==========================================================
(function () {
  var modal = document.getElementById('outputModal');
  var backdrop = document.getElementById('outputModalBackdrop');
  var closeBtn = document.getElementById('modalCloseBtn');
  var modalTitle = document.getElementById('modalTitle');
  var modalEyebrow = document.getElementById('modalEyebrow');
  var modalBody = document.getElementById('modalBody');
  var modalRepoName = document.getElementById('modalRepoName');
  var modalRepoLink = document.getElementById('modalRepoLink');
  var modalLiveLink = document.getElementById('modalLiveLink');
  if (!modal) return;

  var projectDetails = {
    todowa: {
      eyebrow: 'GOWA AUTOMATION · CLOUDFLARE WORKERS & PAGES · SUPABASE',
      title: 'To Do List & Reminder Otomatis (GOWA Automation)',
      repoName: 'farisrizqi/todo-wa',
      repoUrl: 'https://github.com/farisrizqi/todo-wa',
      html:
        '<span class="modal-section-label">1. Arsitektur Sistem & Alur Kerja</span>' +
        '<p>Aplikasi web produktivitas yang dirancang agar pengguna tidak melewatkan tenggat tugas penting. Menggabungkan antarmuka web modern di <strong>Cloudflare Pages</strong>, penjadwalan otomatis di <strong>Cloudflare Workers (Cron Triggers)</strong>, autentikasi & database real-time <strong>Supabase PostgreSQL</strong>, serta pengiriman pesan WhatsApp otomatis menggunakan <strong>GOWA (Go WhatsApp Self-Hosted)</strong>.</p>' +
        '<span class="modal-section-label">2. Contoh Payload Worker -> GOWA API</span>' +
        '<pre class="modal-code">POST /send/message HTTP/1.1\nHost: gowa-instance.internal\nContent-Type: application/json\n\n{\n  "phone": "6289506982507@s.whatsapp.net",\n  "message": "⏰ *PENGINGAT TUGAS*\\n\\n📌 Tugas: Integrasi API Kledo & Webhook n8n\\n⏳ Deadline: 19:00 WIB\\n\\nBalas *DONE* jika sudah selesai.",\n  "is_forwarded": false\n}</pre>' +
        '<span class="modal-section-label">3. Hasil Output ke Pengguna</span>' +
        '<p>Pengguna menerima pesan WhatsApp tepat waktu sesuai jadwal pengingat yang diatur di dashboard web, lengkap dengan sinkronisasi status tugas multi-penerima (multi-recipients).</p>'
    },
    triptaktik: {
      eyebrow: 'SIAMESE NETWORK · TENSORFLOW LITE (.TFLITE) · CAPSTONE DBS',
      title: 'Sistem Rekomendasi Pariwisata "TripTaktik"',
      repoName: 'farisrizqi/model-rekomendasi-jogja-submission-faris',
      repoUrl: 'https://github.com/farisrizqi/model-rekomendasi-jogja-submission-faris',
      html:
        '<span class="modal-section-label">1. Arsitektur Model Machine Learning</span>' +
        '<p>Menggunakan arsitektur <strong>Siamese Neural Network</strong> untuk mempelajari representasi vektor (embedding) antara profil preferensi wisatawan dan atribut destinasi wisata di Daerah Istimewa Yogyakarta. Model dikonversi dan dikuantisasi ke format <strong>.tflite (TensorFlow Lite)</strong> agar inferensi berjalan cepat dan ringan di sisi web/aplikasi.</p>' +
        '<span class="modal-section-label">2. Contoh Input & Output Inferensi (.tflite)</span>' +
        '<pre class="modal-code">// Input Preferensi Wisatawan\n{\n  "kategori_pilihan": ["Alam", "Budaya"],\n  "preferensi_harga_maks": 50000,\n  "rating_minimum": 4.5,\n  "lokasi_awal": "Kota Yogyakarta"\n}\n\n// Output Top-3 Rekomendasi (Cosine Similarity)\n[\n  { "rank": 1, "destinasi": "Tebing Breksi", "kategori": "Alam & Budaya", "similarity": 0.964 },\n  { "rank": 2, "destinasi": "Hutan Pinus Mangunan", "kategori": "Alam", "similarity": 0.941 },\n  { "rank": 3, "destinasi": "HeHa Sky View", "kategori": "Alam & Modern", "similarity": 0.918 }\n]</pre>'
    },
    flood: {
      eyebrow: 'DEEP LEARNING (LSTM) · GOOGLE EARTH ENGINE · QGIS',
      title: 'Prediksi Risiko Banjir 88 Desa (LSTM Spasial-Temporal)',
      repoName: 'farisrizqi/flood-risk-prediction',
      repoUrl: 'https://github.com/farisrizqi/flood-risk-prediction',
      html:
        '<span class="modal-section-label">1. Fusi Data Iklim & Topografi Spasial</span>' +
        '<p>Menggabungkan data deret waktu (time-series) curah hujan & kelembaban tanah dari satelit melalui <strong>Google Earth Engine (GEE)</strong> dengan ekstraksi parameter topografi spasial (kemiringan lereng, elevasi DEM, Topographic Wetness Index / TWI, dan jarak sungai) menggunakan <strong>QGIS</strong> untuk <strong>88 desa</strong>.</p>' +
        '<span class="modal-section-label">2. Contoh Output Prediksi Model LSTM</span>' +
        '<pre class="modal-code">====================================================================\nDESA            CURAH_HUJAN   ELEVASI(m)   TWI     SKOR_LSTM   STATUS\n====================================================================\nSriharjo        142.5 mm      28.4 m       16.8    0.892       TINGGI\nWukirsari       128.0 mm      41.2 m       15.1    0.845       TINGGI\nTrimulyo         94.0 mm      45.0 m       14.2    0.540       SEDANG\nDlingo           88.2 mm     310.5 m        8.4    0.120       RENDAH\n====================================================================</pre>'
    },
    flora: {
      eyebrow: 'WEB DEVELOPMENT · QR CODE INTEGRATION · DIGITALISASI DESA',
      title: 'Katalog Botani Digital (Tour Flora)',
      repoName: 'farisrizqi/flora-kkn-uad-2026',
      repoUrl: 'https://github.com/farisrizqi/flora-kkn-uad-2026',
      liveUrl: 'https://farisrizqi.github.io/flora-kkn-uad-2026/',
      html:
        '<span class="modal-section-label">1. Konsep & Implementasi Lapangan</span>' +
        '<p>Setiap tanaman di lingkungan sekolah/desa dipasangi plakat fisik berisi <strong>QR Code unik</strong>. Ketika dipindai menggunakan kamera ponsel, pengunjung langsung diarahkan ke halaman profil botani spesifik tanaman tersebut tanpa perlu mengunduh aplikasi tambahan.</p>' +
        '<span class="modal-section-label">2. Contoh Output Halaman Spesies</span>' +
        '<pre class="modal-code">URL Triggered : https://farisrizqi.github.io/flora-kkn-uad-2026/?id=jati\nNama Ilmiah   : Tectona grandis L.f.\nNama Lokal    : Pohon Jati\nKlasifikasi   : Kingdom Plantae > Famili Lamiaceae\nFitur Halaman : Galeri Morfologi Daun/Batang, Manfaat Ekologis, & Panduan Konservasi</pre>'
    }
  };

  function openModal(projectKey) {
    var data = projectDetails[projectKey];
    if (!data) return;
    modalEyebrow.textContent = data.eyebrow;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.html;
    if (modalRepoName && data.repoName) {
      modalRepoName.textContent = data.repoName;
    }
    if (modalRepoLink && data.repoUrl) {
      modalRepoLink.setAttribute('href', data.repoUrl);
    }
    if (modalLiveLink) {
      if (data.liveUrl) {
        modalLiveLink.setAttribute('href', data.liveUrl);
        modalLiveLink.hidden = false;
      } else {
        modalLiveLink.hidden = true;
      }
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.card__output-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(btn.getAttribute('data-project'));
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
})();

// ==========================================================
// 7. Project Filtering (Semua, Automation, ML, Web)
// ==========================================================
(function () {
  var filterContainer = document.getElementById('projectFilters');
  if (!filterContainer) return;

  var filterBtns = filterContainer.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.cards .card');
  var repos = document.querySelectorAll('.repo-list .repo-item');

  function applyFilter(category) {
    filterBtns.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-filter') === category);
    });

    cards.forEach(function (card) {
      var itemCat = card.getAttribute('data-category');
      var isMatch = category === 'all' || itemCat === category;
      card.classList.toggle('is-hidden', !isMatch);
    });

    repos.forEach(function (repo) {
      var itemCat = repo.getAttribute('data-category');
      var isMatch = category === 'all' || itemCat === category;
      repo.classList.toggle('is-hidden', !isMatch);
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var category = this.getAttribute('data-filter');
      applyFilter(category);
    });
  });
})();

// ==========================================================
// 8. Live GitHub Repo Sync (Progressive Enhancement)
// ==========================================================
(function () {
  var syncStatus = document.getElementById('repoSyncStatus');
  if (!syncStatus || !window.fetch) return;

  fetch('https://api.github.com/users/farisrizqi')
    .then(function (res) { return res.ok ? res.json() : null; })
    .then(function (user) {
      if (user && typeof user.public_repos === 'number') {
        syncStatus.textContent = '✓ Live GitHub (@farisrizqi · ' + user.public_repos + ' Public Repos)';
      }
    })
    .catch(function () {
      // Keep static fallback gracefully
    });
})();

// ==========================================================
// 9. Copy to Clipboard with Toast Notification
// ==========================================================
(function () {
  var toast = document.getElementById('toast');
  var toastMsg = document.getElementById('toastMsg');
  var copyButtons = document.querySelectorAll('[data-copy]');
  var timer = null;

  function showToast(text) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = text || 'Tersalin ke papan klip!';
    toast.classList.add('is-show');

    clearTimeout(timer);
    timer = setTimeout(function () {
      toast.classList.remove('is-show');
    }, 2400);
  }

  copyButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(
          function () {
            showToast('Tersalin: ' + textToCopy);
          },
          function () {
            fallbackCopy(textToCopy);
          }
        );
      } else {
        fallbackCopy(textToCopy);
      }
    });
  });

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('Tersalin: ' + text);
    } catch (err) {
      showToast('Gagal menyalin otomatis');
    }
    document.body.removeChild(ta);
  }
})();

// ==========================================================
// 10. Back-to-Top Button
// ==========================================================
(function () {
  var backBtn = document.getElementById('backToTop');
  if (!backBtn) return;

  var ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (window.scrollY > 380) {
          backBtn.classList.add('is-visible');
        } else {
          backBtn.classList.remove('is-visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  backBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
