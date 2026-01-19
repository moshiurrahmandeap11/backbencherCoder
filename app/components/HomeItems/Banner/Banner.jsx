"use client"
import { ArrowRight, Code2, Cpu, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const Banner = () => {
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Floating particles effect - adjust for mobile
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    // Reduce particle count on mobile for better performance
    const particleCount = isMobile ? 40 : isTablet ? 60 : 80;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (isMobile ? 1 : 2) + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = Math.random() > 0.7 ? '#D9FDA3' : '#ffffff';
        this.alpha = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;

        // Mouse interaction - only on desktop
        if (!isMobile) {
          const dx = mousePosition.x - this.x;
          const dy = mousePosition.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 100;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            this.x -= dx * force * 0.02;
            this.y -= dy * force * 0.02;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop with performance optimization for mobile
    let animationFrameId;
    let lastTime = 0;
    const fps = isMobile ? 30 : 60; // Reduce FPS on mobile

    const animate = (currentTime) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;

      if (deltaTime > 1000 / fps) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#051320');
        gradient.addColorStop(0.5, '#0a1a2d');
        gradient.addColorStop(1, '#051320');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(particle => {
          particle.update();
          particle.draw();
        });

        // Draw connections between particles - reduce on mobile for performance
        if (!isMobile) {
          ctx.globalAlpha = 0.1;
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x;
              const dy = particles[i].y - particles[j].y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = '#D9FDA3';
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
              }
            }
          }
        }

        lastTime = currentTime;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition, isMobile, isTablet]);

  // Mouse move effect - disable on mobile for better performance
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Text typing animation
  useEffect(() => {
    const text = "Backbencher Coder";
    let index = 0;
    let isDeleting = false;
    const speed = 100;

    const typeWriter = () => {
      const currentText = isDeleting 
        ? text.substring(0, index - 1)
        : text.substring(0, index + 1);

      if (textRef.current) {
        textRef.current.innerHTML = currentText;
        
        // Add cursor
        const cursor = document.createElement('span');
        cursor.className = 'ml-1 w-1 h-8 bg-[#D9FDA3] inline-block animate-pulse';
        textRef.current.appendChild(cursor);
      }

      if (!isDeleting && currentText === text) {
        setTimeout(() => {
          isDeleting = true;
        }, 2000);
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        index = 0;
        return setTimeout(typeWriter, 500);
      }

      index = isDeleting ? index - 1 : index + 1;
      const delay = isDeleting ? speed / 2 : speed + Math.random() * 50;
      setTimeout(typeWriter, delay);
    };

    typeWriter();
  }, []);

  return (
    <div className="relative w-full min-h-screen h-auto md:h-screen overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-[#051320]" />

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 py-8 md:py-0">
        <div className="text-center space-y-4 md:space-y-6 max-w-6xl mx-auto w-full">
          {/* Animated Icons - Adjust for mobile */}
          <div className="flex justify-center gap-4 md:gap-6 mb-4 md:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-[#D9FDA3] rounded-full blur-lg opacity-30 animate-pulse" />
              <Code2 className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-[#D9FDA3] relative animate-float" />
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[#D9FDA3] rounded-full blur-lg opacity-30 animate-pulse delay-300" />
              <Cpu className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-[#D9FDA3] relative animate-float delay-300" />
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[#D9FDA3] rounded-full blur-lg opacity-30 animate-pulse delay-600" />
              <Zap className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-[#D9FDA3] relative animate-float delay-600" />
            </div>
          </div>

          {/* Animated Text - Responsive font sizes */}
          <div className="mb-2 md:mb-4 px-2">
            <span className="text-sm md:text-lg lg:text-xl text-gray-300 font-mono mb-1 md:mb-2 block">
              Welcome To
            </span>
            <h1
              ref={textRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#D9FDA3] via-white to-[#D9FDA3] tracking-tight wrap-break"
            >
              {/* Text will be filled by JS */}
            </h1>
          </div>

          {/* Subtitle with animated underline */}
          <div className="relative inline-block px-4">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 font-light mb-4 md:mb-8 leading-relaxed">
              Crafting digital experiences with code and creativity
            </p>
            <div className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-[#D9FDA3] to-transparent animate-shimmer" />
          </div>

          {/* Animated Cards - Stack on mobile, grid on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12 px-2">
            <div className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-6 hover:border-[#D9FDA3]/30 transition-all duration-300 hover:scale-[1.02] md:hover:scale-105">
              <div className="absolute inset-0 bg-linear-to-r from-[#D9FDA3]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-[#D9FDA3] mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">Innovative Solutions</h3>
              <p className="text-gray-300 text-sm md:text-base">Building cutting-edge applications with modern technologies</p>
            </div>

            <div className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-6 hover:border-[#D9FDA3]/30 transition-all duration-300 hover:scale-[1.02] md:hover:scale-105">
              <div className="absolute inset-0 bg-linear-to-r from-[#D9FDA3]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Zap className="w-6 h-6 md:w-8 md:h-8 text-[#D9FDA3] mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">Fast Performance</h3>
              <p className="text-gray-300 text-sm md:text-base">Optimized code for blazing fast user experiences</p>
            </div>

            <div className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-6 hover:border-[#D9FDA3]/30 transition-all duration-300 hover:scale-[1.02] md:hover:scale-105">
              <div className="absolute inset-0 bg-linear-to-r from-[#D9FDA3]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Code2 className="w-6 h-6 md:w-8 md:h-8 text-[#D9FDA3] mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">Clean Code</h3>
              <p className="text-gray-300 text-sm md:text-base">Maintainable and scalable code architecture</p>
            </div>
          </div>

          {/* CTA Buttons - Responsive padding and font */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-8 md:mt-12 px-2">
            <Link 
              href="/products" 
              className="group relative overflow-hidden px-6 py-3 md:px-8 md:py-4 bg-[#D9FDA3] text-[#051320] rounded-full font-semibold hover:scale-[1.02] md:hover:scale-105 transition-all duration-300 text-sm md:text-base"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Projects
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hide on mobile */}
      {!isMobile && (
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center animate-bounce">
            <span className="text-white/60 text-xs md:text-sm mb-1 md:mb-2 font-mono">Scroll to explore</span>
            <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-2 md:h-3 bg-[#D9FDA3] rounded-full mt-1 md:mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes float-md {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @media (min-width: 768px) {
          .animate-float {
            animation: float-md 3s ease-in-out infinite;
          }
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        /* Performance optimizations for mobile */
        @media (max-width: 768px) {
          .backdrop-blur-sm {
            backdrop-filter: blur(4px);
          }
        }
      `}</style>
    </div>
  );
};

export default Banner;