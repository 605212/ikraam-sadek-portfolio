
  // ── NAV TOGGLE ────────────────────────────────────────────────
  document.getElementById('navToggle').addEventListener('click', function() {
    document.getElementById('navLinks').classList.toggle('open');
  });

  // ── PARTICLE CANVAS ───────────────────────────────────────────
  (function() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.r  = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.alphaDir = (Math.random() - 0.5) * 0.008;
    }
    Particle.prototype.update = function() {
      this.x += this.vx; this.y += this.vy;
      this.alpha += this.alphaDir;
      if (this.alpha > 0.8 || this.alpha < 0.1) this.alphaDir *= -1;
      if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
    };
    Particle.prototype.draw = function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(30,144,255,${this.alpha})`;
      ctx.fill();
    };

    for (let i = 0; i < 80; i++) particles.push(new Particle());

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(30,144,255,${0.15 * (1 - dist/120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      requestAnimationFrame(animate);
    }
    animate();
  })();

  // ── TYPEWRITER ────────────────────────────────────────────────
  (function() {
    const text = "Ikraam Sadek is a Junior Lecturer at Belgium Campus iTversity, Johannesburg. Holding an Advanced Diploma in Application Development from Rosebank College, he brings passion, patience, and real-world experience to every class. His teaching style is built on discussion, engagement, and genuine care for every student's success.";
    const el = document.getElementById('typewriter-text');
    let i = 0;
    function type() {
      if (i < text.length) {
        el.innerHTML = text.slice(0, i + 1) + '<span class="cursor"></span>';
        i++;
        setTimeout(type, 28);
      }
    }
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { type(); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
  })();

  // ── SKILL BARS ────────────────────────────────────────────────
  (function() {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.sp-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(document.getElementById('skillBars'));
  })();

  // ── MODULE CARD SCROLL TRIGGER ────────────────────────────────
  (function() {
    const cards = document.querySelectorAll('.flip-card');
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, idx) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), idx * 80);
        }
      });
    }, { threshold: 0.1 });
    cards.forEach(c => obs.observe(c));

    // Keyboard flip support
    cards.forEach(card => {
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') card.classList.toggle('flipped');
      });
    });
  })();

  // ── FUN FACTS REVEAL ─────────────────────────────────────────
  function revealFact(card) {
    card.classList.toggle('revealed');
    const expanded = card.classList.contains('revealed');
    card.setAttribute('aria-expanded', expanded);
  }

  // ── QUOTE CAROUSEL ────────────────────────────────────────────
  let currentQuote = 0;
  const totalQuotes = 4;
  let quoteTimer = null;

  function goToQuote(n) {
    document.getElementById('qs' + currentQuote).classList.remove('active');
    document.querySelectorAll('.q-dot')[currentQuote].classList.remove('active');
    currentQuote = (n + totalQuotes) % totalQuotes;
    document.getElementById('qs' + currentQuote).classList.add('active');
    document.querySelectorAll('.q-dot')[currentQuote].classList.add('active');
    resetTimer();
  }
  function nextQuote() { goToQuote(currentQuote + 1); }
  function prevQuote() { goToQuote(currentQuote - 1); }
  function resetTimer() {
    clearInterval(quoteTimer);
    quoteTimer = setInterval(nextQuote, 5000);
  }
  resetTimer();
