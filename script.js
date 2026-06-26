document.addEventListener('DOMContentLoaded', () => {
  const linksContainer = document.getElementById('links-container');
  
  // Ambil semua tautan yang diletakkan di bagian bawah HTML (memiliki atribut data-label)
  const sourceLinks = document.querySelectorAll('a[data-label]');
  
  if (!sourceLinks.length) return;

  // Bersihkan container (jika ada konten statis)
  linksContainer.innerHTML = '';

  // Buat tombol dari setiap tautan sumber
  sourceLinks.forEach(link => {
    const originalHref = link.getAttribute('href');
    const originalTarget = link.getAttribute('target') || '_blank';
    const originalRel = link.getAttribute('rel') || 'noopener noreferrer';
    const label = link.getAttribute('data-label') || link.textContent.trim();

    // Buat elemen <a> baru yang akan tampil sebagai tombol
    const newLink = document.createElement('a');
    newLink.href = originalHref;
    newLink.target = originalTarget;
    newLink.rel = originalRel;
    newLink.className = 'link-btn';
    newLink.textContent = label;
    
    // Tambahkan ke container
    linksContainer.appendChild(newLink);
    
    // Sembunyikan tautan asli di bawah halaman agar tidak terlihat
    link.style.display = 'none';
  });

  // Animasi stagger (muncul bertahap)
  const buttons = document.querySelectorAll('.link-btn');
  buttons.forEach((btn, index) => {
    setTimeout(() => {
      btn.classList.add('visible');
    }, index * 140); // jeda 140ms antar tombol
  });
});
