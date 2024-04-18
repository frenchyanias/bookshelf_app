// Kriteria 1: Menambahkan Data Buku
function tambahkanBuku() {
  const id = +new Date();
  const title = document.getElementById('judul').value;
  const author = document.getElementById('pengarang').value;
  const year = parseInt(document.getElementById('tahun').value); // Mengubah string menjadi number
  const isComplete = document.getElementById('selesai').checked;

  const bukuBaru = {
    id,
    title,
    author,
    year,
    isComplete,
  };

  simpanBuku(bukuBaru);
  refreshRakBuku();
}

// Kriteria 2: Memiliki Dua Rak Buku "Belum selesai dibaca dan Selesai dibaca"
function refreshRakBuku() {
  const rakBelumSelesai = document.getElementById('rak-belum-selesai');
  const rakSelesai = document.getElementById('rak-selesai');

  rakBelumSelesai.innerHTML = '';
  rakSelesai.innerHTML = '';

  const semuaBuku = ambilSemuaBuku();

  semuaBuku.forEach((buku) => {
    const bukuElement = buatElemenBuku(buku);

    if (buku.isComplete) {
      rakSelesai.appendChild(bukuElement);
    } else {
      rakBelumSelesai.appendChild(bukuElement);
    }
  });
}

// Kriteria 3: Memindahkan Buku Antar Rak
function pindahkanBuku(id, status) {
  const buku = cariBukuById(id);
  buku.isComplete = status;

  updateBuku(buku);
  refreshRakBuku();
}

// Kriteria 4: Menghapus Data Buku
function hapusBuku(id) {
  hapusBukuById(id);
  refreshRakBuku();
}

// Kriteria 5: Manfaatkan localStorage dalam Menyimpan Data Buku
function simpanBuku(buku) {
  let semuaBuku = [];
  if (localStorage.getItem('daftarBuku')) {
    semuaBuku = JSON.parse(localStorage.getItem('daftarBuku'));
  }
  semuaBuku.push(buku);
  localStorage.setItem('daftarBuku', JSON.stringify(semuaBuku));
}

function ambilSemuaBuku() {
  return localStorage.getItem('daftarBuku') ? JSON.parse(localStorage.getItem('daftarBuku')) : [];
}

function cariBukuById(id) {
  const semuaBuku = ambilSemuaBuku();
  return semuaBuku.find((buku) => buku.id === id);
}

function updateBuku(buku) {
  const semuaBuku = ambilSemuaBuku();
  const index = semuaBuku.findIndex((item) => item.id === buku.id);
  semuaBuku[index] = buku;
  localStorage.setItem('daftarBuku', JSON.stringify(semuaBuku));
}

function hapusBukuById(id) {
  let semuaBuku = ambilSemuaBuku();
  semuaBuku = semuaBuku.filter((buku) => buku.id !== id);
  localStorage.setItem('daftarBuku', JSON.stringify(semuaBuku));
}

function buatElemenBuku(buku) {
  const li = document.createElement('li');
  li.innerHTML = `
        <strong>${buku.title}</strong> (${buku.year}) by ${buku.author}
        <button onclick="pindahkanBuku(${buku.id}, ${!buku.isComplete})">${buku.isComplete ? 'Belum Selesai' : 'Selesai'}</button>
        <button onclick="hapusBuku(${buku.id})">Hapus</button>
    `;
  return li;
}

// Refresh tampilan saat halaman dimuat
document.addEventListener('DOMContentLoaded', function () {
  refreshRakBuku();
});
