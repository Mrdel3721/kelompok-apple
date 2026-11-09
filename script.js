/* script.js — E-Booklet Fiqih Munakahat (Kelompok Apple) */
(function () {
      // 1. Crossroads Signpost Interactive Feedback (Halaman 1)
      const roadButtons = document.querySelectorAll('.road-choice-btn');
      const roadFeedbackBox = document.getElementById('roadFeedbackBox');
      const roadFeedbackText = document.getElementById('roadFeedbackText');

      roadButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const road = btn.getAttribute('data-road');
          if (road === 'ilmu') {
            roadFeedbackBox.className = 'mt-3 px-4 py-3 rounded-xl bg-[#E6EFE9] text-[#234233] text-xs sm:text-sm font-medium flex items-center justify-between gap-2';
            roadFeedbackText.innerHTML = '<strong>Arah Kesiapan / Ilmu:</strong> Menikah dengan bekal ilmu agama, kematangan mental, finansial, dan fisik melahirkan keluarga <em>Sakinah, Mawaddah, wa Rahmah</em>.';
          } else {
            roadFeedbackBox.className = 'mt-3 px-4 py-3 rounded-xl bg-amber-100 text-amber-950 text-xs sm:text-sm font-medium flex items-center justify-between gap-2';
            roadFeedbackText.innerHTML = '<strong>Arah Tren Semata (Modal Nekat):</strong> Menikah hanya karena romantisasi medsos tanpa <em>Istitha\'ah</em> berisiko memicu konflik rumah tangga, tekanan mental, dan perceraian dini.';
          }
        });
      });

      // 2. Split Screen Comparison Filter (Halaman 2)
      const splitFilterBtns = document.querySelectorAll('.split-filter-btn');
      const medsosCols = document.querySelectorAll('.col-medsos');
      const realitasCols = document.querySelectorAll('.col-realitas');
      const headerMedsos = document.getElementById('headerMedsos');
      const headerRealitas = document.getElementById('headerRealitas');

      splitFilterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const filter = btn.getAttribute('data-split-filter');
          splitFilterBtns.forEach((b) => {
            b.className = 'split-filter-btn px-3.5 py-2 rounded-xl text-stone-600 hover:text-stone-900 transition';
          });
          btn.className = 'split-filter-btn px-3.5 py-2 rounded-xl bg-white text-stone-900 shadow-sm transition';

          if (filter === 'all') {
            medsosCols.forEach((el) => el.classList.remove('hidden'));
            realitasCols.forEach((el) => el.classList.remove('hidden'));
            headerMedsos.classList.remove('opacity-40');
            headerRealitas.classList.remove('opacity-40');
          } else if (filter === 'medsos') {
            medsosCols.forEach((el) => el.classList.remove('hidden'));
            realitasCols.forEach((el) => el.classList.add('hidden'));
            headerMedsos.classList.remove('opacity-40');
            headerRealitas.classList.add('opacity-40');
          } else if (filter === 'realitas') {
            medsosCols.forEach((el) => el.classList.add('hidden'));
            realitasCols.forEach((el) => el.classList.remove('hidden'));
            headerMedsos.classList.add('opacity-40');
            headerRealitas.classList.remove('opacity-40');
          }
        });
      });

      // 3. Copy Hadith Quote Button (Halaman 3)
      const btnCopyHadith = document.getElementById('btnCopyHadith');
      const copyHadithLabel = document.getElementById('copyHadithLabel');
      if (btnCopyHadith) {
        btnCopyHadith.addEventListener('click', () => {
          const text = '"Wahai para pemuda! Barangsiapa di antara kalian telah mampu (al-ba\'ah), maka menikahlah. Karena menikah itu lebih menundukkan pandangan dan lebih menjaga kehormatan. Namun, barangsiapa yang belum mampu, hendaklah ia berpuasa, karena puasa itu akan menjadi perisai baginya." (HR. Bukhari & Muslim)';
          try {
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            copyHadithLabel.textContent = 'Tersalin!';
            setTimeout(() => {
              copyHadithLabel.textContent = 'Salin Kutipan Hadis';
            }, 2000);
          } catch (e) {
            copyHadithLabel.textContent = 'Siap Disalin';
          }
        });
      }

      // 4. Filter 5 Hukum Menikah Cards (Halaman 4)
      const lawFilterBtns = document.querySelectorAll('.law-filter-btn');
      const lawCards = document.querySelectorAll('.law-card');

      lawFilterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const group = btn.getAttribute('data-law-filter');
          lawFilterBtns.forEach((b) => {
            b.classList.remove('bg-white', 'shadow-sm');
          });
          btn.classList.add('bg-white', 'shadow-sm');

          lawCards.forEach((card) => {
            if (group === 'all' || card.getAttribute('data-law-group') === group) {
              card.classList.remove('hidden');
            } else {
              card.classList.add('hidden');
            }
          });
        });
      });

      // 5. Self-Assessment Interactive Checklist (Halaman 6)
      const checkboxes = document.querySelectorAll('.readiness-check');
      const scoreCounterText = document.getElementById('scoreCounterText');
      const scoreProgressBar = document.getElementById('scoreProgressBar');
      const evalCardUnder = document.getElementById('evalCardUnder');
      const evalCardReady = document.getElementById('evalCardReady');
      const badgeActiveUnder = document.getElementById('badgeActiveUnder');
      const badgeActiveReady = document.getElementById('badgeActiveReady');
      const btnCheckAll = document.getElementById('btnCheckAll');
      const btnResetCheck = document.getElementById('btnResetCheck');

      function updateReadinessScore() {
        let count = 0;
        checkboxes.forEach((cb) => {
          if (cb.checked) count++;
        });
        const pct = Math.round((count / checkboxes.length) * 100);
        scoreCounterText.textContent = count + ' dari ' + checkboxes.length + ' Pernyataan Tercentang';
        scoreProgressBar.style.width = pct + '%';

        if (count >= 4) {
          evalCardReady.className = 'rounded-2xl p-5 border-2 border-emerald-600 bg-emerald-50/80 transition-all shadow-sm';
          evalCardUnder.className = 'rounded-2xl p-5 border border-stone-200 bg-stone-50/60 opacity-60 transition-all';
          badgeActiveReady.classList.remove('hidden');
          badgeActiveUnder.classList.add('hidden');
          badgeActiveReady.textContent = count === 5 ? 'Semua Tercentang (Siap)' : '4/5 Tercentang (Bekal Baik)';
        } else {
          evalCardUnder.className = 'rounded-2xl p-5 border-2 border-amber-500 bg-amber-50/75 transition-all shadow-sm';
          evalCardReady.className = 'rounded-2xl p-5 border border-stone-200 bg-stone-50/60 opacity-60 transition-all';
          badgeActiveUnder.classList.remove('hidden');
          badgeActiveReady.classList.add('hidden');
        }
      }

      checkboxes.forEach((cb) => cb.addEventListener('change', updateReadinessScore));

      if (btnCheckAll) {
        btnCheckAll.addEventListener('click', () => {
          checkboxes.forEach((cb) => { cb.checked = true; });
          updateReadinessScore();
        });
      }
      if (btnResetCheck) {
        btnResetCheck.addEventListener('click', () => {
          checkboxes.forEach((cb) => { cb.checked = false; });
          updateReadinessScore();
        });
      }

      // 6. Active QR Code Generator, PNG Downloader, Custom Uploader & Interactive Evaluation Form (Halaman 6)
      const qrFileInput = document.getElementById('qrFileInput');
      const qrCustomPreview = document.getElementById('qrCustomPreview');
      const qrDefaultSvg = document.getElementById('qrDefaultSvg');
      const qrUrlInput = document.getElementById('qrUrlInput');
      const btnGenerateQrUrl = document.getElementById('btnGenerateQrUrl');
      const btnDownloadQrPng = document.getElementById('btnDownloadQrPng');
      const btnOpenEvalModal = document.getElementById('btnOpenEvalModal');
      const btnCloseEvalModal = document.getElementById('btnCloseEvalModal');
      const evalModalPanel = document.getElementById('evalModalPanel');
      const readerEvalForm = document.getElementById('readerEvalForm');
      const evalSubmitResult = document.getElementById('evalSubmitResult');

      function buildQrSvgFromText(text) {
        if (typeof qrcode !== 'function') return null;
        const qr = qrcode(0, 'M');
        qr.addData(text);
        qr.make();
        const count = qr.getModuleCount();
        const quiet = 3;
        const size = count + quiet * 2;
        let rects = '';
        for (let r = 0; r < count; r++) {
          for (let c = 0; c < count; c++) {
            if (qr.isDark(r, c)) {
              rects += '<rect x="' + (c + quiet) + '" y="' + (r + quiet) + '" width="1" height="1" rx="0.15"/>';
            }
          }
        }
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + size + ' ' + size + '" width="100%" height="100%" shape-rendering="crispEdges">' +
               '<rect width="' + size + '" height="' + size + '" fill="#FFFFFF" rx="2"/>' +
               '<g fill="#234233">' + rects + '</g></svg>';
      }

      if (btnGenerateQrUrl && qrUrlInput && qrDefaultSvg) {
        btnGenerateQrUrl.addEventListener('click', () => {
          const val = (qrUrlInput.value || '').trim() || 'https://kelompok-apple.id/#kuis-evaluasi';
          const svgMarkup = buildQrSvgFromText(val);
          if (svgMarkup) {
            qrDefaultSvg.innerHTML = svgMarkup;
            qrCustomPreview.classList.add('hidden');
            qrDefaultSvg.classList.remove('hidden');
          }
          btnGenerateQrUrl.textContent = 'QR Diperbarui!';
          setTimeout(() => {
            btnGenerateQrUrl.textContent = 'Perbarui QR Code';
          }, 1800);
        });
      }

      if (btnDownloadQrPng) {
        btnDownloadQrPng.addEventListener('click', () => {
          const svgEl = qrDefaultSvg ? qrDefaultSvg.querySelector('svg') : null;
          if (!svgEl) return;
          const serializer = new XMLSerializer();
          const svgStr = serializer.serializeToString(svgEl);
          const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(svgBlob);
          const img = new Image();
          img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = 600;
            canvas.height = 600;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            URL.revokeObjectURL(url);
            const a = document.createElement('a');
            a.download = 'QR_Code_Evaluasi_Munakahat_Kelompok_Apple.png';
            a.href = canvas.toDataURL('image/png');
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          };
          img.src = url;
        });
      }

      if (qrFileInput) {
        qrFileInput.addEventListener('change', (e) => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = function (ev) {
            qrCustomPreview.src = ev.target.result;
            qrCustomPreview.classList.remove('hidden');
            qrDefaultSvg.classList.add('hidden');
          };
          reader.readAsDataURL(file);
        });
      }

      if (btnOpenEvalModal && evalModalPanel) {
        btnOpenEvalModal.addEventListener('click', () => {
          evalModalPanel.classList.remove('hidden');
          evalModalPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      }

      if (btnCloseEvalModal && evalModalPanel) {
        btnCloseEvalModal.addEventListener('click', () => {
          evalModalPanel.classList.add('hidden');
        });
      }

      // Nomor WhatsApp Admin Kelompok Apple
const NOMOR_WA_ADMIN = '6285222531288';

if (readerEvalForm && evalSubmitResult) {
  readerEvalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Ambil input pembaca dari formulir
    const name = (document.getElementById('evalName').value || 'Pembaca').trim();
    const age = (document.getElementById('evalAge').value || '-').trim();
    const rating = document.getElementById('evalRating').value;
    const comment = (document.getElementById('evalComment').value || 'Sangat bermanfaat').trim();

    // 2. Hitung skor kuis pemahaman (3 soal)
    const q1 = readerEvalForm.querySelector('input[name="q1"]:checked')?.value === 'correct' ? 1 : 0;
    const q2 = readerEvalForm.querySelector('input[name="q2"]:checked')?.value === 'correct' ? 1 : 0;
    const q3 = readerEvalForm.querySelector('input[name="q3"]:checked')?.value === 'correct' ? 1 : 0;
    const quizScore = q1 + q2 + q3;

    // 3. Hitung jumlah centang Self-Assessment di Halaman 6
    let checkedCount = 0;
    document.querySelectorAll('.readiness-check').forEach((cb) => {
      if (cb.checked) checkedCount++;
    });
    const statusKesiapan = checkedCount >= 4
      ? `Siap / Bekal Awal Baik (${checkedCount}/5)`
      : `Perlu Memantaskan Diri (${checkedCount}/5)`;

    // 4. Susun pesan laporan otomatis ke WhatsApp 6285222531288
    const pesanWA =
      `*LAPORAN KUIS & EVALUASI E-BOOKLET FIQIH MUNAKAHAT*\n` +
      `*(Kelompok Apple — PAI)*\n` +
      `----------------------------------\n` +
      `• *Nama Pembaca:* ${name}\n` +
      `• *Usia / Semester:* ${age}\n` +
      `• *Cek Kesiapan Diri:* ${statusKesiapan}\n` +
      `• *Skor Kuis Pemahaman:* ${quizScore} / 3 Benar\n` +
      `• *Rating E-Booklet:* ${rating}\n` +
      `• *Pesan / Kesan:* ${comment}`;

    const waUrl = `https://wa.me/${NOMOR_WA_ADMIN}?text=${encodeURIComponent(pesanWA)}`;

    // 5. Tampilkan ringkasan skor & tombol kirim langsung ke WhatsApp
    evalSubmitResult.classList.remove('hidden');
    evalSubmitResult.innerHTML = `
      <div class="space-y-3">
        <div>
          <strong>Alhamdulillah, terima kasih ${name}!</strong><br>
          Skor Kuis Anda: <strong>${quizScore} / 3 Benar</strong> • Status Kesiapan: <strong>${statusKesiapan}</strong>.<br>
          Klik tombol di bawah jika WhatsApp belum terbuka otomatis:
        </div>
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1ebe57] text-stone-950 font-extrabold text-xs sm:text-sm shadow-sm transition">
          Kirim Laporan ke WhatsApp (0852-2253-1288)
        </a>
      </div>
    `;

    // 6. Buka WhatsApp secara otomatis di tab baru
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}

      // 7. Landing Scroll Mode vs Booklet Page-by-Page Mode
      const btnModeScroll = document.getElementById('btnModeScroll');
      const btnModeBooklet = document.getElementById('btnModeBooklet');
      const bookletControllerBar = document.getElementById('bookletControllerBar');
      const btnPrevPage = document.getElementById('btnPrevPage');
      const btnNextPage = document.getElementById('btnNextPage');
      const bookletPageIndicator = document.getElementById('bookletPageIndicator');
      const bookletPageTitle = document.getElementById('bookletPageTitle');
      const pageSections = Array.from(document.querySelectorAll('.page-section'));

      let isBookletMode = false;
      let currentPage = 1;

      function renderBookletView() {
        if (!isBookletMode) {
          pageSections.forEach((sec) => sec.classList.remove('hidden'));
          bookletControllerBar.classList.add('hidden');
          btnModeScroll.className = 'px-3 py-1 rounded-full bg-[#234233] text-white shadow-sm transition';
          btnModeBooklet.className = 'px-3 py-1 rounded-full text-stone-700 hover:text-stone-900 transition';
          return;
        }

        btnModeBooklet.className = 'px-3 py-1 rounded-full bg-[#234233] text-white shadow-sm transition';
        btnModeScroll.className = 'px-3 py-1 rounded-full text-stone-700 hover:text-stone-900 transition';
        bookletControllerBar.classList.remove('hidden');

        pageSections.forEach((sec) => {
          const p = parseInt(sec.getAttribute('data-page'), 10);
          if (p === currentPage) {
            sec.classList.remove('hidden');
            bookletPageIndicator.textContent = 'Halaman ' + p + ' dari ' + pageSections.length;
            bookletPageTitle.textContent = sec.getAttribute('data-title') || '';
          } else {
            sec.classList.add('hidden');
          }
        });

        btnPrevPage.disabled = currentPage <= 1;
        btnNextPage.disabled = currentPage >= pageSections.length;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      btnModeScroll.addEventListener('click', () => {
        isBookletMode = false;
        renderBookletView();
      });

      btnModeBooklet.addEventListener('click', () => {
        isBookletMode = true;
        renderBookletView();
      });

      btnPrevPage.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderBookletView();
        }
      });

      btnNextPage.addEventListener('click', () => {
        if (currentPage < pageSections.length) {
          currentPage++;
          renderBookletView();
        }
      });

      // Handle nav anchor clicks when in Booklet Mode
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          const targetId = anchor.getAttribute('href').slice(1);
          const targetEl = document.getElementById(targetId);
          if (targetEl && isBookletMode) {
            const p = parseInt(targetEl.getAttribute('data-page'), 10);
            if (p) {
              e.preventDefault();
              currentPage = p;
              renderBookletView();
            }
          }
        });
      });
    })();
