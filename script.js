// ══════════════════════════════════════════
    // LETTER-BY-LETTER "Happy Birthday!" REVEAL
    // ══════════════════════════════════════════
    (function initHBReveal() {
      const titleEl = document.getElementById('hb-title');
      const words = ['Happy', 'Birthday!'];
      const allLetterEls = [];

      words.forEach((word, wi) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'hb-word';

        for (let i = 0; i < word.length; i++) {
          const span = document.createElement('span');
          span.className = 'hb-letter';
          span.textContent = word[i];
          wordSpan.appendChild(span);
          allLetterEls.push(span);
        }

        titleEl.appendChild(wordSpan);

        // Add a <br> between words
        if (wi < words.length - 1) {
          titleEl.appendChild(document.createElement('br'));
        }
      });

      // Stagger the animation: each letter appears 100ms after the previous
      const baseDelay = 500; // initial delay before first letter
      const stagger = 100;   // ms between each letter
      const animDuration = 650; // matches CSS animation duration

      allLetterEls.forEach((el, i) => {
        const delay = baseDelay + i * stagger;
        setTimeout(() => {
          el.classList.add('animate');
          // After the reveal animation ends, switch to the shimmer loop
          setTimeout(() => {
            el.classList.remove('animate');
            el.classList.add('revealed');
          }, animDuration + 50);
        }, delay);
      });
    })();

    // ══════════════════════════════════════════
    // DATA — edit memories here
    // ══════════════════════════════════════════
    const memories = [
      {
        date: "August 2021",
        title: "The Day We Met",
        description: "I still remember how awkward we were before realizing we had the exact same chaotic energy. The rest is history.",
        image_url: "assests/Screenshot (21).png",
        emoji: "🌸"
      },
      {
        date: "December 2022",
        title: "That Late-Night Road Trip",
        description: "Getting completely lost, eating terrible gas station snacks, blasting our playlist until our voices gave out.",
        image_url: "assests/Screenshot (22).png",
        emoji: "🌙"
      },
      {
        date: "July 2023",
        title: "Summer Concert",
        description: "The best night ever. We waited 4 hours in line and it was absolutely worth every second.",
        image_url: "assests/Screenshot (23).png",
        emoji: "✨"
      },
      {
        date: "Right Now",
        title: "To Be Continued…",
        description: "We have so much more to see and do. I can't wait for our next adventure together.",
        image_url: "assests/Screenshot (24).png",
        emoji: "🎀"
      }
    ];

    // Image for the puzzle board
    const IMG_SRC = "assests/bgimage.jpeg"

    // ── RENDER MEMORIES ──
    const container = document.getElementById('memories-container');

    memories.forEach((m, i) => {
      const isEven = i % 2 === 0;

      let mediaHtml = '';
      if (m.video_url) {
        mediaHtml = `
          <div class="relative w-full h-56 md:h-64 overflow-hidden rounded-[2px] bg-black video-container">
            <video src="${m.video_url}" 
                   class="w-full h-full object-cover block memory-video"
                   loop muted playsinline preload="metadata"
                   ${m.image_url ? `poster="${m.image_url}"` : ''}></video>
            
            <!-- Play/Pause Icon Overlay (Visible when video is paused) -->
            <div class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none video-overlay">
              <div class="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[color:var(--rose)] shadow-md transform scale-100 transition-transform duration-300 play-btn-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 ml-0.5">
                  <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>

            <!-- Custom Mute/Unmute Speaker Button -->
            <button class="absolute bottom-2 right-2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 hover:scale-105 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 volume-btn" aria-label="Toggle Volume">
              <!-- Muted Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mute-icon">
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.063.922-2.063 2.063v4.875c0 1.141.922 2.062 2.063 2.062h1.932l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
              </svg>
              <!-- Unmuted Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 unmute-icon hidden">
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.063.922-2.063 2.063v4.875c0 1.141.922 2.062 2.063 2.062h1.932l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06zM18.563 12c0-2.183-1.374-4.05-3.3-4.735a.75.75 0 00-.5 1.414 3.75 3.75 0 010 6.642.75.75 0 10.5 1.414c1.926-.685 3.3-2.551 3.3-4.735z" />
                <path d="M20.125 12c0-3.355-2.11-6.22-5.078-7.14a.75.75 0 00-.437 1.436 5.894 5.894 0 013.765 5.704 5.894 5.894 0 01-3.765 5.704.75.75 0 00.437 1.436c2.968-.92 5.078-3.785 5.078-7.14z" />
              </svg>
            </button>
          </div>
        `;
      } else {
        mediaHtml = `
          <img src="${m.image_url}" alt="${m.title}"
               class="w-full h-56 md:h-64 object-cover block rounded-[2px]"
               loading="lazy" />
        `;
      }

      container.innerHTML += `
        <div class="relative mb-24 flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'} items-center gap-8 fade-up">

          <div class="timeline-dot hidden md:block" style="top:40px;"></div>

          <div class="w-full md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} relative z-10">
            <p class="section-label mb-2">${m.date}</p>
            <h3 class="font-display text-3xl md:text-4xl mb-3" style="color:var(--ink)">${m.emoji} ${m.title}</h3>
            <p class="font-light leading-relaxed opacity-65 text-sm md:text-base">${m.description}</p>
          </div>

          <div class="w-full md:w-1/2 flex ${isEven ? 'md:justify-start' : 'md:justify-end'}">
            <div class="polaroid group" style="transform: rotate(${isEven ? '-2.5deg' : '2.5deg'}); max-width: 320px; width:100%;">
              <div class="polaroid-tape"></div>
              ${mediaHtml}
              <span class="caption">${m.title}</span>
            </div>
          </div>

        </div>
      `;
    });

    // ── VIDEO PLAYERS INITIALIZATION ──
    let bgMusicPausedByVideo = false;

    function pauseBackgroundMusic() {
      const bgMusic = document.getElementById('bg-music');
      if (bgMusic && !bgMusic.paused) {
        bgMusic.pause();
        pauseEq();
        bgMusicPausedByVideo = true;
      }
    }

    function resumeBackgroundMusic() {
      const bgMusic = document.getElementById('bg-music');
      if (bgMusic && bgMusicPausedByVideo) {
        bgMusic.play().catch(() => { });
        playEq();
        bgMusicPausedByVideo = false;
      }
    }

    function initVideoPlayers() {
      const videoContainers = document.querySelectorAll('.video-container');

      videoContainers.forEach(container => {
        const video = container.querySelector('video');
        const polaroid = container.closest('.polaroid');
        const volumeBtn = container.querySelector('.volume-btn');
        const muteIcon = volumeBtn ? volumeBtn.querySelector('.mute-icon') : null;
        const unmuteIcon = volumeBtn ? volumeBtn.querySelector('.unmute-icon') : null;

        if (!video || !polaroid) return;

        polaroid.addEventListener('mouseenter', () => {
          video.play().then(() => {
            container.classList.add('playing');
            if (!video.muted) {
              pauseBackgroundMusic();
            }
          }).catch(err => console.log("Video play failed:", err));
        });

        polaroid.addEventListener('mouseleave', () => {
          video.pause();
          container.classList.remove('playing');
          resumeBackgroundMusic();
        });

        if (volumeBtn) {
          volumeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();

            if (video.muted) {
              video.muted = false;
              if (muteIcon) muteIcon.classList.add('hidden');
              if (unmuteIcon) unmuteIcon.classList.remove('hidden');
              pauseBackgroundMusic();
            } else {
              video.muted = true;
              if (muteIcon) muteIcon.classList.remove('hidden');
              if (unmuteIcon) unmuteIcon.classList.add('hidden');
              resumeBackgroundMusic();
            }
          });
        }
      });
    }

    initVideoPlayers();

    // ── INTERSECTION OBSERVER ──
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

    // ── CUSTOM CURSOR ──
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursor-ring');
    let mx = 0, my = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    (function animateRing() {
      cursorRing.style.left = mx + 'px';
      cursorRing.style.top = my + 'px';
      requestAnimationFrame(animateRing);
    })();

    function updateCursorHoverEvents() {
      document.querySelectorAll('button, a, input[type=range], .tile').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.style.width = '20px'; cursor.style.height = '20px';
          cursorRing.style.transform = 'translate(-50%,-50%) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
          cursor.style.width = '12px'; cursor.style.height = '12px';
          cursorRing.style.transform = 'translate(-50%,-50%) scale(1)';
        });
      });
    }

    // ── SCROLL PROGRESS ──
    const progress = document.getElementById('scroll-progress');
    const vignette = document.getElementById('cinematic-vignette');
    const timelineSec = document.getElementById('timeline');

    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      progress.style.transform = `scaleX(${Math.min(pct, 1)})`;

      // Cinematic vignette: activate when timeline section is in view
      if (timelineSec) {
        const rect = timelineSec.getBoundingClientRect();
        const vh = window.innerHeight;
        // Section is considered "in view" when at least partially visible
        const inView = rect.top < vh * 0.7 && rect.bottom > vh * 0.3;
        if (inView) {
          vignette.classList.add('active');
        } else {
          vignette.classList.remove('active');
        }
      }
    });

    // ── TIMELINE SPARKLING LIGHT ──
    (function initTimelineSparkle() {
      const canvas = document.getElementById('timeline-sparkle-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const container = document.getElementById('memories-container');
      const timelineSection = document.getElementById('timeline');

      let trailParticles = [];
      let burstParticles = [];
      let scrollProgress = 0;
      let prevScrollProgress = 0;
      let smoothOrbY = 0;
      let scrollVelocity = 0;
      let frameTime = 0;
      let animFrameId;

      const sparkleColors = [
        { r: 255, g: 220, b: 230 },  // soft pink
        { r: 212, g: 120, b: 138 },  // rose
        { r: 240, g: 200, b: 130 },  // warm gold
        { r: 255, g: 255, b: 255 },  // white
        { r: 255, g: 240, b: 200 },  // warm light
        { r: 176, g: 104, b: 122 },  // mauve
        { r: 255, g: 180, b: 200 },  // hot pink glow
        { r: 200, g: 170, b: 255 },  // lavender
      ];

      function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }

      function getTimelineX() {
        return canvas.width / 2;
      }

      function updateScrollProgress() {
        const rect = timelineSection.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const scrollStart = sectionTop - viewportHeight;
        const scrollEnd = sectionTop + sectionHeight;
        const scrollRange = scrollEnd - scrollStart;
        if (scrollRange <= 0) { scrollProgress = 0; return; }
        scrollProgress = Math.max(0, Math.min(1, (window.scrollY - scrollStart) / scrollRange));
      }

      // ── Main Glowing Orb with corona & lens flare ──
      class GlowOrb {
        constructor() {
          this.x = 0;
          this.y = 0;
          this.radius = 8;
          this.pulsePhase = 0;
          this.flarePhase = 0;
        }

        update(x, y, velocity) {
          this.x = x;
          this.y = y;
          this.pulsePhase += 0.07;
          this.flarePhase += 0.03;
          this.intensity = Math.min(1, 0.6 + velocity * 8);
        }

        draw(ctx) {
          const pulse = 1 + Math.sin(this.pulsePhase) * 0.35;
          const r = this.radius * pulse;
          const int = this.intensity;

          // Wide ambient glow (big halo)
          const g4 = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 14);
          g4.addColorStop(0, `rgba(212, 120, 138, ${0.08 * int})`);
          g4.addColorStop(0.3, `rgba(255, 180, 200, ${0.04 * int})`);
          g4.addColorStop(1, 'transparent');
          ctx.fillStyle = g4;
          ctx.beginPath();
          ctx.arc(this.x, this.y, r * 14, 0, Math.PI * 2);
          ctx.fill();

          // Corona rays
          ctx.save();
          ctx.translate(this.x, this.y);
          const rayCount = 6;
          for (let i = 0; i < rayCount; i++) {
            const angle = (i / rayCount) * Math.PI * 2 + this.flarePhase;
            const rayLen = r * (5 + Math.sin(this.pulsePhase + i * 1.3) * 2.5);
            const rayWidth = r * 0.4;
            ctx.save();
            ctx.rotate(angle);
            const rayGrad = ctx.createLinearGradient(0, 0, rayLen, 0);
            rayGrad.addColorStop(0, `rgba(255, 255, 255, ${0.25 * int})`);
            rayGrad.addColorStop(0.3, `rgba(255, 200, 220, ${0.12 * int})`);
            rayGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = rayGrad;
            ctx.beginPath();
            ctx.moveTo(0, -rayWidth * 0.15);
            ctx.lineTo(rayLen, 0);
            ctx.lineTo(0, rayWidth * 0.15);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
          }
          ctx.restore();

          // Mid glow
          const g2 = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 4);
          g2.addColorStop(0, `rgba(255, 255, 255, ${0.7 * int})`);
          g2.addColorStop(0.2, `rgba(255, 220, 230, ${0.4 * int})`);
          g2.addColorStop(0.5, `rgba(212, 120, 138, ${0.2 * int})`);
          g2.addColorStop(1, 'transparent');
          ctx.fillStyle = g2;
          ctx.beginPath();
          ctx.arc(this.x, this.y, r * 4, 0, Math.PI * 2);
          ctx.fill();

          // Bright core
          const g1 = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 1.2);
          g1.addColorStop(0, `rgba(255, 255, 255, ${0.98 * int})`);
          g1.addColorStop(0.4, `rgba(255, 240, 245, ${0.8 * int})`);
          g1.addColorStop(0.7, `rgba(242, 196, 196, ${0.3 * int})`);
          g1.addColorStop(1, 'transparent');
          ctx.fillStyle = g1;
          ctx.beginPath();
          ctx.arc(this.x, this.y, r * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Sparkle particle that trails behind ──
      class SparkleParticle {
        constructor(x, y, velocity) {
          const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
          const spread = 30 + velocity * 150;
          this.x = x + (Math.random() - 0.5) * spread;
          this.y = y + (Math.random() - 0.5) * 15;
          this.r = color.r;
          this.g = color.g;
          this.b = color.b;
          this.radius = Math.random() * 3 + 0.8;
          this.life = 1;
          this.decay = 0.005 + Math.random() * 0.012;
          this.vx = (Math.random() - 0.5) * (1.5 + velocity * 4);
          this.vy = (Math.random() - 0.5) * 0.8 - 0.2;
          this.gravity = 0.008 + Math.random() * 0.01;
          this.twinkleSpeed = 0.06 + Math.random() * 0.12;
          this.twinklePhase = Math.random() * Math.PI * 2;
          this.type = Math.random();  // determines visual style
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;
          this.vy += this.gravity;
          this.vx *= 0.97;
          this.life -= this.decay;
          this.twinklePhase += this.twinkleSpeed;
        }

        draw(ctx) {
          if (this.life <= 0) return;
          const twinkle = 0.3 + Math.sin(this.twinklePhase) * 0.7;
          const alpha = this.life * twinkle;

          if (this.type < 0.25) {
            this.drawStar(ctx, alpha);
          } else if (this.type < 0.5) {
            this.drawDiamond(ctx, alpha);
          } else {
            this.drawDot(ctx, alpha);
          }
        }

        drawDot(ctx, alpha) {
          const glowR = this.radius * 5;
          const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowR);
          grd.addColorStop(0, `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha * 0.35})`);
          grd.addColorStop(0.5, `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha * 0.08})`);
          grd.addColorStop(1, 'transparent');
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(this.x, this.y, glowR, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * this.life, 0, Math.PI * 2);
          ctx.fill();
        }

        drawStar(ctx, alpha) {
          const size = this.radius * 3 * this.life;
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.twinklePhase * 0.5);

          // Cross sparkle
          ctx.strokeStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha * 0.9})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-size, 0); ctx.lineTo(size, 0);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, -size); ctx.lineTo(0, size);
          ctx.stroke();

          // Diagonal lines (8-point star)
          const ds = size * 0.65;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(-ds, -ds); ctx.lineTo(ds, ds);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(ds, -ds); ctx.lineTo(-ds, ds);
          ctx.stroke();

          // Center bright dot
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(0, 0, this.radius * 0.7 * this.life, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        drawDiamond(ctx, alpha) {
          const size = this.radius * 2.2 * this.life;
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.twinklePhase * 0.3);

          ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha * 0.7})`;
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(size * 0.5, 0);
          ctx.lineTo(0, size);
          ctx.lineTo(-size * 0.5, 0);
          ctx.closePath();
          ctx.fill();

          // Inner glow
          const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.8);
          grd.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.5})`);
          grd.addColorStop(1, 'transparent');
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // ── Burst particle (explodes on fast scroll) ──
      class BurstParticle {
        constructor(x, y) {
          const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
          const angle = Math.random() * Math.PI * 2;
          const speed = 1 + Math.random() * 4;
          this.x = x;
          this.y = y;
          this.r = color.r;
          this.g = color.g;
          this.b = color.b;
          this.radius = Math.random() * 2 + 1;
          this.life = 1;
          this.decay = 0.015 + Math.random() * 0.025;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
          this.trail = [];
        }

        update() {
          this.trail.push({ x: this.x, y: this.y, life: this.life });
          if (this.trail.length > 6) this.trail.shift();
          this.x += this.vx;
          this.y += this.vy;
          this.vx *= 0.95;
          this.vy *= 0.95;
          this.life -= this.decay;
        }

        draw(ctx) {
          if (this.life <= 0) return;
          // Trail
          this.trail.forEach((t, i) => {
            const a = t.life * (i / this.trail.length) * 0.3;
            ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${a})`;
            ctx.beginPath();
            ctx.arc(t.x, t.y, this.radius * 0.5 * (i / this.trail.length), 0, Math.PI * 2);
            ctx.fill();
          });
          // Head
          ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.life})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * this.life, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Ambient sparkle placed along sinusoidal path ──
      class AmbientSparkle {
        constructor(x, y, idx) {
          const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
          this.baseX = x + Math.sin(idx * 0.6) * 18;
          this.x = this.baseX;
          this.y = y;
          this.r = color.r;
          this.g = color.g;
          this.b = color.b;
          this.radius = Math.random() * 2 + 0.4;
          this.twinkleSpeed = 0.025 + Math.random() * 0.06;
          this.twinklePhase = Math.random() * Math.PI * 2;
          this.baseAlpha = 0.1 + Math.random() * 0.25;
          this.driftPhase = Math.random() * Math.PI * 2;
          this.driftSpeed = 0.008 + Math.random() * 0.015;
          this.driftAmp = 3 + Math.random() * 8;
        }

        update() {
          this.twinklePhase += this.twinkleSpeed;
          this.driftPhase += this.driftSpeed;
          this.x = this.baseX + Math.sin(this.driftPhase) * this.driftAmp;
        }

        draw(ctx, orbY, scrollVel) {
          const distToOrb = Math.abs(this.y - orbY);
          const proximity = Math.max(0, 1 - distToOrb / 250);
          const twinkle = 0.2 + Math.sin(this.twinklePhase) * 0.8;
          // Sparkles light up much more as the orb passes near them
          const excite = proximity * (1 + scrollVel * 6);
          const alpha = (this.baseAlpha + excite * 0.7) * twinkle;

          if (alpha < 0.01) return;

          // Glow halo
          const glowRadius = this.radius * (5 + proximity * 6);
          const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowRadius);
          grd.addColorStop(0, `rgba(${this.r}, ${this.g}, ${this.b}, ${Math.min(alpha * 0.35, 0.5)})`);
          grd.addColorStop(0.5, `rgba(${this.r}, ${this.g}, ${this.b}, ${Math.min(alpha * 0.08, 0.15)})`);
          grd.addColorStop(1, 'transparent');
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();

          // Core
          const coreR = this.radius * (1 + proximity * 1.5);
          ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${Math.min(alpha, 1)})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, coreR, 0, Math.PI * 2);
          ctx.fill();

          // Bright flash when orb is very close
          if (proximity > 0.7) {
            ctx.fillStyle = `rgba(255, 255, 255, ${(proximity - 0.7) * 2 * twinkle})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      const orb = new GlowOrb();
      let ambientSparkles = [];

      function createAmbientSparkles() {
        ambientSparkles = [];
        const x = getTimelineX();
        const h = canvas.height;
        const count = Math.floor(h / 10); // denser
        for (let i = 0; i < count; i++) {
          const y = (i / count) * h;
          ambientSparkles.push(new AmbientSparkle(x, y, i));
        }
      }

      // Draw a glowing energy river instead of a boring straight line
      function drawEnergyTrail(ctx, orbY, velocity) {
        const x = getTimelineX();
        const h = canvas.height;
        const activeY = scrollProgress * h;
        const velFactor = Math.min(1, velocity * 12);

        // ── Lit-up section: glowing river from top to orb position ──
        if (activeY > 2) {
          // Wide soft glow behind the trail
          const wideGlow = ctx.createLinearGradient(x, 0, x, activeY);
          wideGlow.addColorStop(0, 'transparent');
          wideGlow.addColorStop(0.3, `rgba(212, 120, 138, ${0.03 + velFactor * 0.04})`);
          wideGlow.addColorStop(0.8, `rgba(255, 200, 220, ${0.06 + velFactor * 0.06})`);
          wideGlow.addColorStop(1, `rgba(255, 255, 255, ${0.05 + velFactor * 0.05})`);
          ctx.fillStyle = wideGlow;
          ctx.beginPath();
          // Wavy path for the wide glow
          const waveWidth = 20 + velFactor * 15;
          ctx.moveTo(x - waveWidth, 0);
          for (let y = 0; y <= activeY; y += 5) {
            const wave = Math.sin(y * 0.015 + frameTime * 0.002) * (6 + velFactor * 4);
            ctx.lineTo(x - waveWidth + wave, y);
          }
          for (let y = activeY; y >= 0; y -= 5) {
            const wave = Math.sin(y * 0.015 + frameTime * 0.002) * (6 + velFactor * 4);
            ctx.lineTo(x + waveWidth + wave, y);
          }
          ctx.closePath();
          ctx.fill();

          // Inner bright core stream
          ctx.save();
          ctx.lineWidth = 1.5 + velFactor * 1.5;
          ctx.lineCap = 'round';
          const coreGrad = ctx.createLinearGradient(x, 0, x, activeY);
          coreGrad.addColorStop(0, 'transparent');
          coreGrad.addColorStop(0.2, `rgba(242, 196, 196, ${0.2 + velFactor * 0.15})`);
          coreGrad.addColorStop(0.7, `rgba(212, 120, 138, ${0.35 + velFactor * 0.2})`);
          coreGrad.addColorStop(1, `rgba(255, 255, 255, ${0.5 + velFactor * 0.3})`);
          ctx.strokeStyle = coreGrad;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          for (let y = 0; y <= activeY; y += 3) {
            const wave = Math.sin(y * 0.02 + frameTime * 0.003) * (3 + velFactor * 3);
            ctx.lineTo(x + wave, y);
          }
          ctx.stroke();
          ctx.restore();
        }

        // ── Unlit section below orb: very faint dotted path ──
        const remainStart = Math.min(activeY + 20, h);
        if (remainStart < h) {
          ctx.save();
          ctx.setLineDash([2, 12]);
          ctx.strokeStyle = `rgba(212, 120, 138, 0.06)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, remainStart);
          ctx.lineTo(x, h);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();
        }
      }

      function animate(timestamp) {
        animFrameId = requestAnimationFrame(animate);
        if (canvas.width === 0 || canvas.height === 0) return;
        frameTime = timestamp || 0;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateScrollProgress();

        const x = getTimelineX();
        const targetOrbY = scrollProgress * canvas.height;
        // Smooth interpolation for the orb position
        smoothOrbY += (targetOrbY - smoothOrbY) * 0.12;

        const scrollDelta = Math.abs(scrollProgress - prevScrollProgress);
        scrollVelocity += (scrollDelta - scrollVelocity) * 0.15;

        // Draw the energy river trail
        drawEnergyTrail(ctx, smoothOrbY, scrollVelocity);

        // Update and draw ambient sparkles (they light up as orb passes)
        ambientSparkles.forEach(s => {
          s.update();
          s.draw(ctx, smoothOrbY, scrollVelocity);
        });

        // Spawn trailing sparkle particles when scrolling
        if (scrollDelta > 0.0003) {
          const spawnCount = Math.min(8, Math.floor(scrollDelta * 1200) + 1);
          for (let i = 0; i < spawnCount; i++) {
            trailParticles.push(new SparkleParticle(x, smoothOrbY, scrollVelocity));
          }
        }

        // Burst particles on fast scroll
        if (scrollDelta > 0.004) {
          const burstCount = Math.min(12, Math.floor(scrollDelta * 2000));
          for (let i = 0; i < burstCount; i++) {
            burstParticles.push(new BurstParticle(x, smoothOrbY));
          }
        }

        // Ambient trickle even when idle
        if (Math.random() < 0.08) {
          trailParticles.push(new SparkleParticle(x, smoothOrbY, 0));
        }

        prevScrollProgress = scrollProgress;

        // Update and draw trail particles
        trailParticles = trailParticles.filter(p => p.life > 0);
        trailParticles.forEach(p => { p.update(); p.draw(ctx); });
        if (trailParticles.length > 300) trailParticles = trailParticles.slice(-300);

        // Update and draw burst particles
        burstParticles = burstParticles.filter(p => p.life > 0);
        burstParticles.forEach(p => { p.update(); p.draw(ctx); });
        if (burstParticles.length > 150) burstParticles = burstParticles.slice(-150);

        // Draw the main glowing orb (on top of everything)
        orb.update(x, smoothOrbY, scrollVelocity);
        orb.draw(ctx);
      }

      // Initialize
      resizeCanvas();
      createAmbientSparkles();
      requestAnimationFrame(animate);

      const ro = new ResizeObserver(() => {
        resizeCanvas();
        createAmbientSparkles();
      });
      ro.observe(container);

      window.addEventListener('resize', () => {
        resizeCanvas();
        createAmbientSparkles();
      });
    })();

    // ── PETAL RAIN ──
    const petalColors = ['#f2c4c4', '#d4a0a0', '#c8e6c9', '#f8bbd0', '#ffe082'];
    const isMobile = window.innerWidth <= 480;
    function spawnPetal() {
      const p = document.createElement('div');
      p.className = 'petal';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top = '-20px';
      p.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];
      const size = isMobile ? (6 + Math.random() * 5) : (8 + Math.random() * 8);
      p.style.width = size + 'px';
      p.style.height = (size * 1.25) + 'px';
      p.style.animationDuration = (6 + Math.random() * 8) + 's';
      p.style.opacity = 0.5 + Math.random() * 0.4;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 14000);
    }
    // Fewer petals on mobile for performance
    setInterval(spawnPetal, isMobile ? 2500 : 1200);

    // ── PAINT SPLATTER on click ──
    const splatterColors = ['#f2c4c4', '#d4788a', '#8aad9a', '#c89d6a', '#b0687a'];
    document.addEventListener('click', e => {
      if (e.target.closest('#unlock-card') || e.target.closest('a') || e.target.closest('button') || e.target.closest('input') || e.target.closest('.tile')) return;
      const s = document.createElement('div');
      s.className = 'splatter';
      const sz = 30 + Math.random() * 50;
      Object.assign(s.style, {
        position: 'fixed',
        width: sz + 'px', height: sz + 'px',
        left: (e.clientX - sz / 2) + 'px',
        top: (e.clientY - sz / 2) + 'px',
        background: splatterColors[Math.floor(Math.random() * splatterColors.length)],
        borderRadius: `${40 + Math.random() * 30}% ${30 + Math.random() * 40}% ${40 + Math.random() * 30}% ${30 + Math.random() * 40}%`,
        pointerEvents: 'none',
        zIndex: 9995,
        mixBlendMode: 'multiply',
        opacity: 0.6
      });
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 2500);
    });

    // ── SECRET EASTER EGG (10 TAPS) ──
    let secretTapCount = 0;
    let secretTapTimer;
    const secretPopup = document.getElementById('secret-popup');
    const closeSecret = document.getElementById('close-secret');

    document.addEventListener('click', () => {
      secretTapCount++;
      clearTimeout(secretTapTimer);

      if (secretTapCount >= 10) {
        secretPopup.classList.add('active');
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 }, zIndex: 9999999 });
        secretTapCount = 0; // Reset after triggering
      }

      // Reset tap count after 2 seconds of inactivity
      secretTapTimer = setTimeout(() => { secretTapCount = 0; }, 2000);
    });

    closeSecret.addEventListener('click', (e) => {
      e.stopPropagation();
      secretPopup.classList.remove('active');
    });

    // ── CLICK OUTSIDE TO CLOSE ──
    secretPopup.addEventListener('click', (e) => {
      if (e.target === secretPopup) {
        secretPopup.classList.remove('active');
        e.stopPropagation();
      }
    });

    // ── MUSIC TOGGLE ──
    const bgMusic = document.getElementById('bg-music');
    const eqDisplay = document.getElementById('eq-display');
    const musicLabel = document.getElementById('music-label');
    let musicStarted = false;

    bgMusic.volume = 0.25;
    bgMusic.play().then(() => { musicStarted = true; })
      .catch(() => { pauseEq(); musicLabel.textContent = 'Play Music'; });

    document.addEventListener('click', () => {
      if (!musicStarted) {
        bgMusic.play();
        musicStarted = true;
        playEq();
        musicLabel.textContent = 'Now Playing';
      }
    }, { once: true });

    document.getElementById('music-toggle').addEventListener('click', e => {
      e.stopPropagation();
      bgMusicPausedByVideo = false; // Reset video music pause state on manual toggle
      if (bgMusic.paused) {
        bgMusic.play();
        playEq();
        musicLabel.textContent = 'Now Playing';
      } else {
        bgMusic.pause();
        pauseEq();
        musicLabel.textContent = 'Play Music';
      }
    });

    function playEq() { eqDisplay.classList.remove('eq-paused'); }
    function pauseEq() { eqDisplay.classList.add('eq-paused'); }

    // ── IDLE FLOATERS ──
    const nicknames = ['tattt', 'suar', 'bhaisiya', 'gawar', 'gobar', 'gadhi'];
    const floaterText = document.getElementById('floater-text');
    const funkyColors = ['var(--rose)', 'var(--mauve)', 'var(--sage)', 'var(--gold)'];

    function showFloater() {
      const text = nicknames[Math.floor(Math.random() * nicknames.length)];
      const color = funkyColors[Math.floor(Math.random() * funkyColors.length)];
      const w = window.innerWidth, h = window.innerHeight;
      // Keep floaters within bounds on mobile
      const maxLeft = Math.max(50, w - 180);
      const maxTop = Math.max(50, h - 80);

      floaterText.textContent = text;
      floaterText.style.color = color;
      floaterText.style.left = (Math.random() * maxLeft) + 'px';
      floaterText.style.top = (Math.random() * maxTop) + 'px';
      floaterText.style.transform = `rotate(${Math.random() * 40 - 20}deg) scale(${1 + Math.random() * 0.4})`;
      floaterText.style.opacity = '1';

      setTimeout(() => floaterText.style.opacity = '0', 3000);
    }

    floaterText.addEventListener('click', (e) => {
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
      });
      floaterText.style.opacity = '0';
      floaterText.style.transform = 'scale(2)';
      if (swapSound) {
        swapSound.currentTime = 0;
        swapSound.play().catch(() => { });
      }
    });

    // ── CONTINUOUS FLOATERS ──
    // Show a new nickname (slower on mobile)
    setInterval(showFloater, isMobile ? 5000 : 3500);

    // ── PUZZLE MECHANICS ──
    let N = 3;
    let tiles = [];
    let selectedIdx = null;
    let moves = 0;
    let solved = false;
    let hintTimeout = null;

    const grid = document.getElementById('grid');
    const progressFill = document.getElementById('progress-fill');
    const progressPct = document.getElementById('progress-pct');
    const moveCount = document.getElementById('move-count');
    const winReveal = document.getElementById('win-reveal');
    const swapSound = document.getElementById('swap-sound');
    if (swapSound) swapSound.volume = 0.3; // keep it subtle

    const img = new Image();
    img.src = IMG_SRC;
    img.onload = () => initPuzzle();

    function initPuzzle() {
      solved = false;
      moves = 0;
      moveCount.textContent = '0';
      selectedIdx = null;
      winReveal.classList.remove('active');

      const total = N * N;
      tiles = Array.from({ length: total }, (_, i) => i);
      shuffleTiles();
      renderGrid();
      updateProgress();
    }

    function shuffleTiles() {
      const t = tiles.slice();
      do {
        for (let i = t.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [t[i], t[j]] = [t[j], t[i]];
        }
      } while (t.every((v, i) => v === i));
      tiles = t;
    }

    function renderGrid() {
      grid.innerHTML = '';
      grid.style.gridTemplateColumns = `repeat(${N}, 1fr)`;
      grid.style.gridTemplateRows = `repeat(${N}, 1fr)`;

      const gridPadding = isMobile ? 8 : 12; // 4px or 6px each side
      const w = Math.max(grid.offsetWidth - gridPadding, 200);
      const tileW = Math.floor(w / N);
      const tileH = tileW;

      tiles.forEach((solvedPos, idx) => {
        const div = document.createElement('div');
        div.className = 'tile';
        if (solvedPos === idx) div.classList.add('solved-tile');

        const cvs = document.createElement('canvas');
        cvs.width = tileW;
        cvs.height = tileH;
        const ctx = cvs.getContext('2d');

        const col = solvedPos % N;
        const row = Math.floor(solvedPos / N);

        // Center crop the source image to prevent distortion in square tiles
        const size = Math.min(img.naturalWidth, img.naturalHeight);
        const startX = (img.naturalWidth - size) / 2;
        const startY = (img.naturalHeight - size) / 2;
        const srcW = size / N;
        const srcH = size / N;

        ctx.drawImage(img,
          startX + col * srcW, startY + row * srcH, srcW, srcH,
          0, 0, tileW, tileH
        );

        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.font = `bold ${tileW * 0.22}px 'Bebas Neue', sans-serif`;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillText(solvedPos + 1, tileW - 6, tileH - 2);

        div.appendChild(cvs);

        div.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          handleTileClick(idx);
        });

        grid.appendChild(div);
      });
      updateCursorHoverEvents();
    }

    const moveRoastEl = document.getElementById('move-roast');
    const moveRoasts = [
      "(legendary)", "(she's trying)", "(progress??)", "(art degree intensifies)",
      "(almost there, allegedly)", "(this is fine)", "(certified chaos)", "(genius at work 🙄)"
    ];
    function maybeShowMoveRoast() {
      if (!moveRoastEl) return;
      if (moves > 0 && moves % 3 === 0) {
        moveRoastEl.textContent = moveRoasts[Math.floor(Math.random() * moveRoasts.length)];
        moveRoastEl.style.opacity = '1';
      } else {
        moveRoastEl.style.opacity = '0';
      }
    }

    function handleTileClick(idx) {
      if (solved) return;

      if (selectedIdx === null) {
        selectedIdx = idx;
        grid.children[idx].classList.add('selected');
      } else if (selectedIdx === idx) {
        grid.children[idx].classList.remove('selected');
        selectedIdx = null;
      } else {
        grid.children[selectedIdx].classList.remove('selected');
        [tiles[selectedIdx], tiles[idx]] = [tiles[idx], tiles[selectedIdx]];
        if (swapSound) {
          swapSound.currentTime = 0;
          swapSound.play().catch(() => { });
        }
        moves++;
        moveCount.textContent = moves;
        maybeShowMoveRoast();
        selectedIdx = null;
        renderGrid();
        updateProgress();
        checkWin();
      }
    }

    function updateProgress() {
      const correct = tiles.filter((v, i) => v === i).length;
      const pct = Math.round((correct / (N * N)) * 100);
      progressFill.style.width = pct + '%';
      progressPct.textContent = pct + '%';
    }

    function checkWin() {
      if (tiles.every((v, i) => v === i)) {
        solved = true;
        triggerUnlock();
      }
    }

    function triggerUnlock() {
      // Confetti burst elements
      confetti({
        particleCount: 180, spread: 90, origin: { y: 0.6 },
        colors: ['#f2c4c4', '#d4788a', '#8aad9a', '#c89d6a', '#b0687a']
      });
      setTimeout(() => confetti({
        particleCount: 80, spread: 60, origin: { y: 0.55 }, angle: 60,
        colors: ['#f2c4c4', '#c89d6a']
      }), 300);
      setTimeout(() => confetti({
        particleCount: 80, spread: 60, origin: { y: 0.55 }, angle: 120,
        colors: ['#8aad9a', '#d4788a']
      }), 500);

      winReveal.innerHTML = `<img src="${IMG_SRC}" alt="revealed">`;
      winReveal.classList.add('active');

      Array.from(grid.children).forEach((tile, i) => {
        setTimeout(() => tile.classList.add('solved-tile', 'hint-flash'), i * 40);
      });

      setTimeout(() => {
        const unlockSec = document.getElementById('unlock-section');
        unlockSec.style.transition = 'opacity 0.6s ease';
        unlockSec.style.opacity = '0';

        setTimeout(() => {
          unlockSec.classList.add('hidden');
          const letterSec = document.getElementById('letter-section');
          letterSec.classList.remove('hidden');
          setTimeout(() => {
            document.querySelectorAll('#letter-section .fade-up').forEach(el => {
              io.observe(el);
            });
            letterSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 60);
        }, 650);
      }, 1500);
    }

    // ── HINT BUTTON / ROAST POPUP CONTENT ──
    const roastTitleEl = document.getElementById('roast-title');
    const roastLineEl = document.getElementById('roast-line');
    const roastLines = [
      { title: "Chiiii Gawar !!", line: "Dimag nhi hai kya? 🤡" },
      { title: "Bestie, No.", line: "You call yourself an artist and can't even match colors? Couldn't be me." },
      { title: "Ouchhh 🙈", line: "Even your worst painting had more structure than this attempt." },
      { title: "Hint? HINT?", line: "Babe this is a 3x3 grid, not the Mona Lisa. Lock in." },
      { title: "Embarrassing.", line: "I've seen toddlers solve puzzles faster. With crayons. Backwards." },
      { title: "Skill Issue.", line: "Maybe stick to digital art where undo exists, hm?" },
      { title: "Tragic.", line: "This is giving 'forgot how eyes work' energy." }
    ];
    document.getElementById('btn-hint').addEventListener('click', () => {
      if (solved) return;
      const r = roastLines[Math.floor(Math.random() * roastLines.length)];
      if (roastTitleEl) roastTitleEl.textContent = r.title;
      if (roastLineEl) roastLineEl.textContent = r.line;
      document.getElementById('roast-popup').classList.add('active');
    });

    document.getElementById('close-roast').addEventListener('click', () => {
      document.getElementById('roast-popup').classList.remove('active');

      if (hintTimeout) clearTimeout(hintTimeout);

      const wrongIdx = tiles.findIndex((v, i) => v !== i);
      if (wrongIdx === -1) return;

      const correctHolder = tiles.indexOf(wrongIdx);

      [wrongIdx, correctHolder].forEach(i => {
        const el = grid.children[i];
        if (el) {
          el.classList.add('hint-flash');
          hintTimeout = setTimeout(() => el.classList.remove('hint-flash'), 600);
        }
      });
    });

    // ── DIFFICULTY CONFIG ──
    document.querySelectorAll('.diff-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        N = parseInt(btn.dataset.n);
        initPuzzle();
      });
    });

    window.addEventListener('resize', () => {
      if (!solved) renderGrid();
    });

    // ── STICKER INTERACTIONS ──
    document.querySelectorAll('.sticker').forEach(st => {
      st.addEventListener('click', (e) => {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
          colors: ['#f2c4c4', '#d4788a', '#8aad9a', '#c89d6a', '#b0687a']
        });
      });
    });

    // ── DODGING GIFT BUTTON ──
    const giftBtn = document.getElementById('gift-btn');
    const giftMsg = document.getElementById('gift-msg');
    let hoverCount = 0;
    const maxHovers = ('ontouchstart' in window) || (window.innerWidth <= 480) ? 2 : 6;

    if (giftBtn) {
      const moveBtn = () => {
        if (hoverCount >= maxHovers) return;

        hoverCount++;
        const container = giftBtn.parentElement;
        const containerRect = container.getBoundingClientRect();

        const maxX = containerRect.width / 2 - giftBtn.offsetWidth / 2;
        const maxY = 60;

        const randomX = (Math.random() - 0.5) * maxX * 2.5;
        const randomY = (Math.random() - 0.5) * maxY * 2.5;

        giftBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

        const teases = ["Too slow! 🐢", "Almost! 😜", "Try again! 😂", "Missed me! 💨", "You're bad at this 🤡", "Okay fine... 🙄"];
        if (hoverCount <= teases.length) {
          giftBtn.textContent = teases[hoverCount - 1];
        }
      };

      giftBtn.addEventListener('mouseover', moveBtn);
      giftBtn.addEventListener('touchstart', (e) => {
        if (hoverCount < maxHovers) {
          e.preventDefault();
          moveBtn();
        }
      });

      giftBtn.addEventListener('click', () => {
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
        giftBtn.style.display = 'none';
        giftMsg.innerHTML = "Your gift is my presence in your life.<br/>You're welcome. 😎✨";
        giftMsg.style.opacity = '1';
        giftMsg.style.transform = 'translateY(0)';
      });
    }

    // ── CONSOLE EASTER EGG ──
    console.log("%cHey birthday girl! 🎂", "color: #D4788A; font-size: 30px; font-weight: bold; font-family: sans-serif;");
    console.log("%cI knew you'd be snooping around here. Happy Birthday! - Your Best Friend", "color: #B0687A; font-size: 16px; font-style: italic;");