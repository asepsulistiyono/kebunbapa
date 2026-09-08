// ============================================
// KEBUN PAK TANI - SCRIPT.JS
// ============================================

// ⚠️ GANTI URL INI DENGAN URL GOOGLE APPS SCRIPT ANDA
const API_URL = 'https://script.google.com/macros/s/AKfycbxEKdx3NhsG1la5UxH9XDUGifwrKtGs4cEaRNZHfsgWD-0gK8n7GongD7LhP9WnL2uH/exec';

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
