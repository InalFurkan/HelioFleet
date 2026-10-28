/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          sans: ["Inter", "sans-serif"],
          mono: ["JetBrains Mono", "monospace"],
        },
        colors: {
          canvas: "#090D16",      // Derin siyah/arduvaz ana zemin
          surface: {
            DEFAULT: "#111827",   // Kart ve panel zeminleri
            elevated: "#1F2937",  // Soket kutuları, hover durumları
            border: "#1F2937",    // İnce çerçeve çizgileri
            hover: "#374151",
          },
          brand: {
            primary: "#BEF264",   // Volt Lime (Logo & Ana Aksiyon Butonları)
            hover: "#A3E635",
            muted: "#BEF2641A",   // %10 saydamlıkta buton/aktif menü arka planı
          },
          status: {
            charging: "#10B981",  // Şarj olan araçlar & Solar üretim (Yeşil)
            available: "#3B82F6", // Boş şarj soketi & Şebeke gücü (Mavi)
            suspended: "#F59E0B", // Trafo limiti beklemesi & Uyarı (Kehribar)
            faulted: "#F43F5E",   // İstasyon arızası (Kırmızı)
          },
        },
      },
    },
    plugins: [],
  };