# 🌱 Kebun Pak Tani - Toko Sayur Organik

Website toko sayur dan buah organik segar langsung dari kebun!

## 📋 Deskripsi
Proyek ini adalah website sederhana untuk menampilkan produk sayur dan buah organik dari "Kebun Pak Tani". Website ini menggunakan Google Sheets sebagai backend database dan Google Apps Script sebagai API.

## 🚀 Cara Menggunakan

### 1. Setup Google Sheet
1. Buat Google Sheet baru
2. Buat sheet bernama **Profil** dengan kolom:
   - Nama_Kebun
   - Tagline
   - Tentang
   - Alamat
   - No_WA
   - Jam_Operasional

3. Buat sheet bernama **Produk** dengan kolom:
   - Nama_Produk
   - Deskripsi
   - Harga
   - Satuan
   - Emoji
   - Status (isi dengan "Tersedia" untuk menampilkan produk)
   - No_WA (opsional, untuk nomor WhatsApp penjual)

### 2. Deploy Google Apps Script
1. Buka [script.google.com](https://script.google.com)
2. Buat project baru
3. Copy-paste kode dari file `Code.gs` ke editor
4. Ganti `SHEET_ID` di baris 9 dengan ID Google Sheet Anda
5. Klik **Deploy** → **New Deployment** → Pilih type **Web App**
6. Set **Execute as**: Me
7. Set **Who has access**: Anyone
8. Klik **Deploy** dan copy URL yang diberikan

### 3. Konfigurasi Website
1. Buka file `Script.js`
2. Ganti `API_URL` di baris 6 dengan URL Google Apps Script yang sudah di-deploy
3. Buka `Index.html` di browser

## 📁 Struktur File
- `Index.html` - Halaman utama website
- `Style.css` - Styling CSS
- `Script.js` - JavaScript untuk fetch data dari API
- `Code.gs` - Kode Google Apps Script untuk backend

## ✨ Fitur
- ✅ Menampilkan profil toko dari Google Sheet
- ✅ Menampilkan daftar produk organik
- ✅ Tombol pesan via WhatsApp
- ✅ Desain responsif untuk mobile
- ✅ 100% gratis menggunakan Google Sheets & Apps Script

## 📝 License
Free to use and modify.
