--- Script.js (原始)
// ============================================
// KEBUN PAK TANI - SCRIPT.JS
// ============================================

// ⚠️ GANTI URL INI DENGAN URL GOOGLE APPS SCRIPT ANDA
const API_URL = 'https://script.google.com/macros/s/AKfycbxEKdx3NhsG1la5UxH9XDUGifwrKtGs4cEaRNZHfsgWD-0gK8n7GongD7LhP9WnL2uH/exec'; // Masukkan URL Google Apps Script Anda di sini

// ============================================
// MUAT SEMUA DATA SAAT HALAMAN DIBUKA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  loadProfil();
  loadProduk();
});

// ============================================
// FUNGSI: MUAT PROFIL TOKO
// ============================================
async function loadProfil() {
  try {
    const res = await fetch(`${API_URL}?action=profil`);
    const profil = await res.json();

    if (!profil || Object.keys(profil).length === 0) {
      console.warn('Data profil kosong, gunakan default.');
      return;
    }

    // --- Update Nama Toko ---
    const namaToko = profil.Nama_Kebun || 'Kebun Pak Tani';
    document.getElementById('namaToko').textContent = `🌱 ${namaToko}`;
    document.getElementById('footerNama').textContent = namaToko;
    document.title = `🌱 ${namaToko} - Toko Sayur Organik`;

    // --- Update Tagline ---
    if (profil.Tagline) {
      document.getElementById('taglineToko').textContent = profil.Tagline;
    }

    // --- Update Tentang ---
    if (profil.Tentang) {
      document.getElementById('tentangText').textContent = profil.Tentang;
    }

    // --- Update Info Kontak ---
    document.getElementById('infoNama').textContent = namaToko;
    document.getElementById('infoAlamat').textContent = profil.Alamat || '-';
    document.getElementById('infoJam').textContent = profil.Jam_Operasional || '-';

    // --- Update WhatsApp ---
    const noWA = (profil.No_WA || '').replace(/[^0-9]/g, '');
    const waLink = document.getElementById('infoWA');
    if (noWA) {
      waLink.href = `https://wa.me/${noWA}?text=${encodeURIComponent('Halo! Saya ingin bertanya tentang produk organik Anda.')}`;
      waLink.textContent = formatNomor(profil.No_WA);
    } else {
      waLink.textContent = 'Belum diatur';
    }

  } catch (error) {
    console.error('❌ Gagal memuat profil:', error);
    document.getElementById('infoNama').textContent = 'Kebun Pak Tani';
    document.getElementById('infoAlamat').textContent = 'Alamat belum diatur';
    document.getElementById('infoWA').textContent = 'WA belum diatur';
    document.getElementById('infoJam').textContent = 'Jam belum diatur';
  }
}

// ============================================
// FUNGSI: MUAT DAFTAR PRODUK
// ============================================
async function loadProduk() {
  const grid = document.getElementById('produkGrid');

  try {
    const res = await fetch(`${API_URL}?action=produk`);
    const products = await res.json();

    if (!Array.isArray(products) || products.length === 0) {
      grid.innerHTML = `
        <div class="loading">
          😕 Belum ada produk tersedia.
          Silakan cek kembali nanti!
        </div>`;
      return;
    }

    // Hapus loading
    grid.innerHTML = '';

    // Buat kartu produk
    products.forEach(p => {
      const noWA = (p.No_WA || '').replace(/[^0-9]/g, '');
      const pesanTeks = encodeURIComponent(
        `Halo! Saya mau pesan: ${p.Nama_Produk} (${p.Harga}/${p.Satuan}). Apakah masih tersedia?`
      );
      const waUrl = noWA
        ? `https://wa.me/${noWA}?text=${pesanTeks}`
        : '#';

      const card = document.createElement('div');
      card.className = 'produk-card';
      card.innerHTML = `
        <div class="produk-img">${p.Emoji || '🥬'}</div>
        <div class="produk-info">
          <span class="badge-organik">✅ 100% Organik</span>
          <h3>${escapeHTML(p.Nama_Produk || 'Tanpa Nama')}</h3>
          <p class="deskripsi">${escapeHTML(p.Deskripsi || '')}</p>
          <p class="harga">${formatRupiah(p.Harga)} <span class="satuan">/ ${escapeHTML(p.Satuan || 'kg')}</span></p>
          <a href="${waUrl}" target="_blank" class="btn-pesan">🛒 Pesan Sekarang</a>
        </div>`;
      grid.appendChild(card);
    });

  } catch (error) {
    console.error('❌ Gagal memuat produk:', error);
    grid.innerHTML = `
      <div class="error-msg">
        ⚠️ Gagal memuat data produk.
        Pastikan URL Google Apps Script sudah benar dan ter-deploy.
      </div>`;
  }
}

// ============================================
// FUNGSI HELPER
// ============================================

// Format angka jadi Rupiah: 15000 → Rp 15.000
function formatRupiah(angka) {
  const num = Number(angka);
  if (isNaN(num)) return angka || '-';
  return 'Rp ' + num.toLocaleString('id-ID');
}

// Format nomor: 081234567890 → 0812-3456-7890
function formatNomor(nomor) {
  const clean = (nomor || '').replace(/[^0-9]/g, '');
  if (clean.length <= 4) return clean;
  if (clean.length <= 8) return clean.slice(0, 4) + '-' + clean.slice(4);
  return clean.slice(0, 4) + '-' + clean.slice(4, 8) + '-' + clean.slice(8);
}

// Cegah XSS
function escapeHTML(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

+++ Script.js (修改后)
// ============================================
// KEBUN PAK TANI - SCRIPT.JS
// ============================================

// ⚠️ GANTI URL INI DENGAN URL GOOGLE APPS SCRIPT ANDA
// Kosongkan jika ingin menggunakan data dummy untuk preview
const API_URL = '';

// ============================================
// DATA DUMMY UNTUK PREVIEW
// Digunakan jika API_URL kosong atau terjadi error
// ============================================
const DUMMY_DATA = {
  profil: {
    Nama_Kebun: "Kebun Pak Tani",
    Tagline: "Sayur Segar Setiap Hari",
    Tentang: "Kami menyediakan sayuran dan buah-buahan organik segar langsung dari petani lokal.",
    Alamat: "Jl. Segar Selalu No. 12, Bandung",
    Jam_Operasional: "Senin - Minggu, 06:00 - 18:00",
    No_WA: "6281234567890"
  },
  produk: [
    { id: 1, Nama_Produk: "Bayam Hijau", Harga: 5000, Satuan: "ikat", Stok: 50, Deskripsi: "Bayam hijau segar kaya zat besi", Emoji: "🥬", No_WA: "6281234567890" },
    { id: 2, Nama_Produk: "Wortel Brastagi", Harga: 12000, Satuan: "kg", Stok: 30, Deskripsi: "Wortel manis dari Brastagi", Emoji: "🥕", No_WA: "6281234567890" },
    { id: 3, Nama_Produk: "Tomat Merah", Harga: 8000, Satuan: "kg", Stok: 45, Deskripsi: "Tomat merah matang sempurna", Emoji: "🍅", No_WA: "6281234567890" },
    { id: 4, Nama_Produk: "Apel Malang", Harga: 25000, Satuan: "kg", Stok: 20, Deskripsi: "Apel manis dari Malang", Emoji: "🍎", No_WA: "6281234567890" },
    { id: 5, Nama_Produk: "Pisang Cavendish", Harga: 18000, Satuan: "sisir", Stok: 15, Deskripsi: "Pisang manis berkualitas", Emoji: "🍌", No_WA: "6281234567890" }
  ]
};

// ============================================
// MUAT SEMUA DATA SAAT HALAMAN DIBUKA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  loadProfil();
  loadProduk();
});

// ============================================
// FUNGSI: MUAT PROFIL TOKO
// ============================================
async function loadProfil() {
  // Jika API_URL kosong, gunakan data dummy
  if (!API_URL || API_URL.trim() === '') {
    console.log('ℹ️ Menggunakan data dummy untuk profil');
    renderProfil(DUMMY_DATA.profil);
    return;
  }

  try {
    const res = await fetch(`${API_URL}?action=profil`);
    const profil = await res.json();

    if (!profil || Object.keys(profil).length === 0) {
      console.warn('Data profil kosong, gunakan default.');
      renderProfil(DUMMY_DATA.profil);
      return;
    }

    renderProfil(profil);

  } catch (error) {
    console.error('❌ Gagal memuat profil:', error);
    console.log('ℹ️ Menggunakan data dummy karena error');
    renderProfil(DUMMY_DATA.profil);
  }
}

// Fungsi helper untuk render profil
function renderProfil(profil) {
  // --- Update Nama Toko ---
  const namaToko = profil.Nama_Kebun || 'Kebun Pak Tani';
  document.getElementById('namaToko').textContent = `🌱 ${namaToko}`;
  document.getElementById('footerNama').textContent = namaToko;
  document.title = `🌱 ${namaToko} - Toko Sayur Organik`;

  // --- Update Tagline ---
  if (profil.Tagline) {
    document.getElementById('taglineToko').textContent = profil.Tagline;
  }

  // --- Update Tentang ---
  if (profil.Tentang) {
    document.getElementById('tentangText').textContent = profil.Tentang;
  }

  // --- Update Info Kontak ---
  document.getElementById('infoNama').textContent = namaToko;
  document.getElementById('infoAlamat').textContent = profil.Alamat || '-';
  document.getElementById('infoJam').textContent = profil.Jam_Operasional || '-';

  // --- Update WhatsApp ---
  const noWA = (profil.No_WA || '').replace(/[^0-9]/g, '');
  const waLink = document.getElementById('infoWA');
  if (noWA) {
    waLink.href = `https://wa.me/${noWA}?text=${encodeURIComponent('Halo! Saya ingin bertanya tentang produk organik Anda.')}`;
    waLink.textContent = formatNomor(profil.No_WA);
  } else {
    waLink.textContent = 'Belum diatur';
  }
}

// ============================================
// FUNGSI: MUAT DAFTAR PRODUK
// ============================================
async function loadProduk() {
  const grid = document.getElementById('produkGrid');

  try {
    const res = await fetch(`${API_URL}?action=produk`);
    const products = await res.json();

    if (!Array.isArray(products) || products.length === 0) {
      grid.innerHTML = `
        <div class="loading">
          😕 Belum ada produk tersedia.
          Silakan cek kembali nanti!
        </div>`;
      return;
    }

    // Hapus loading
    grid.innerHTML = '';

    // Buat kartu produk
    products.forEach(p => {
      const noWA = (p.No_WA || '').replace(/[^0-9]/g, '');
      const pesanTeks = encodeURIComponent(
        `Halo! Saya mau pesan: ${p.Nama_Produk} (${p.Harga}/${p.Satuan}). Apakah masih tersedia?`
      );
      const waUrl = noWA
        ? `https://wa.me/${noWA}?text=${pesanTeks}`
        : '#';

      const card = document.createElement('div');
      card.className = 'produk-card';
      card.innerHTML = `
        <div class="produk-img">${p.Emoji || '🥬'}</div>
        <div class="produk-info">
          <span class="badge-organik">✅ 100% Organik</span>
          <h3>${escapeHTML(p.Nama_Produk || 'Tanpa Nama')}</h3>
          <p class="deskripsi">${escapeHTML(p.Deskripsi || '')}</p>
          <p class="harga">${formatRupiah(p.Harga)} <span class="satuan">/ ${escapeHTML(p.Satuan || 'kg')}</span></p>
          <a href="${waUrl}" target="_blank" class="btn-pesan">🛒 Pesan Sekarang</a>
        </div>`;
      grid.appendChild(card);
    });

  } catch (error) {
    console.error('❌ Gagal memuat produk:', error);
    grid.innerHTML = `
      <div class="error-msg">
        ⚠️ Gagal memuat data produk.
        Pastikan URL Google Apps Script sudah benar dan ter-deploy.
      </div>`;
  }
}

// ============================================
// FUNGSI HELPER
// ============================================

// Format angka jadi Rupiah: 15000 → Rp 15.000
function formatRupiah(angka) {
  const num = Number(angka);
  if (isNaN(num)) return angka || '-';
  return 'Rp ' + num.toLocaleString('id-ID');
}

// Format nomor: 081234567890 → 0812-3456-7890
function formatNomor(nomor) {
  const clean = (nomor || '').replace(/[^0-9]/g, '');
  if (clean.length <= 4) return clean;
  if (clean.length <= 8) return clean.slice(0, 4) + '-' + clean.slice(4);
  return clean.slice(0, 4) + '-' + clean.slice(4, 8) + '-' + clean.slice(8);
}

// Cegah XSS
function escapeHTML(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
