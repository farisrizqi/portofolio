# Portofolio — Faris Nur Rizqiawan

Website portofolio statis (HTML/CSS/JS murni, tanpa framework/build step) — siap deploy ke Vercel.

## Struktur
```
portfolio/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── img-000.jpg                     (foto profil)
    └── CV_Faris_Nur_Rizqiawan.pdf      (CV yang bisa diunduh dari tombol "Unduh CV")
```

## Cara deploy ke Vercel

**Opsi 1 — lewat dashboard (paling gampang, tanpa install apa pun)**
1. Buka https://vercel.com → login/daftar (bisa pakai akun GitHub/Google).
2. Klik **Add New → Project**.
3. Pilih tab **"Deploy without Git"** lalu drag-and-drop folder `portfolio` ini (atau upload isinya).
4. Vercel otomatis mendeteksi ini sebagai static site — tidak perlu build command apa pun. Klik **Deploy**.
5. Selesai — kamu akan dapat URL seperti `nama-project.vercel.app`.

**Opsi 2 — lewat Vercel CLI**
```bash
npm i -g vercel      # sekali saja kalau belum terinstall
cd portfolio
vercel               # ikuti instruksi, pilih "no framework / static"
vercel --prod        # untuk deploy ke production
```

**Opsi 3 — lewat GitHub (paling enak untuk update jangka panjang)**
1. Push folder ini ke repo GitHub baru.
2. Di Vercel, **Add New → Project → Import Git Repository**, pilih repo tersebut.
3. Framework Preset: pilih **"Other"** (static). Build command & output directory dikosongkan saja.
4. Deploy. Setiap kali kamu `git push`, Vercel otomatis re-deploy.

## Kustomisasi cepat
- **Ganti foto**: timpa `assets/img-000.jpg` dengan foto lain (nama file boleh diganti, tinggal sesuaikan `src` di `index.html` bagian `<section class="about">`).
- **Ganti CV**: timpa `assets/CV_Faris_Nur_Rizqiawan.pdf` dengan versi terbaru (nama file harus sama, atau update link di `index.html`).
- **Warna**: semua warna diatur lewat variabel di baris atas `style.css` (`:root { --paper, --ink, --tarn, --ochre ... }`), tinggal ubah di satu tempat.
- **Domain sendiri**: di dashboard Vercel → Project → Settings → Domains, tambahkan domain kamu (misalnya farisrizqiawan.com) dan arahkan DNS-nya sesuai instruksi yang muncul.
# portofolio
# portofolio
