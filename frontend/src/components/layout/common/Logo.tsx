export default function Logo() {
    return (
      <div className="flex items-center gap-3">
        {/* Figma'dan aldığınız SVG Amblem */}
        <div className="w-9 h-9 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
          {<svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.1665 7.54278C15.6614 6.50098 14.0852 7.00721 14.2811 8.14831L22.8418 58.0019C22.9845 58.8327 24.0279 59.1251 24.5815 58.4894L38.3078 42.7296C38.7673 42.2021 39.6124 42.2972 39.9431 42.9135L49.7669 61.2215C50.2922 62.2005 51.7833 61.721 51.6396 60.6193L47.2607 27.0474C47.1522 26.2157 46.1296 25.879 45.5482 26.4836L33.1153 39.4139C32.6329 39.9156 31.7983 39.7833 31.4946 39.1571L16.1665 7.54278Z" fill="#090D16"/>
<path d="M0 1C0 0.447715 0.447715 0 1 0H68C68.5523 0 69 0.447715 69 1V68C69 68.5523 68.5523 69 68 69H1C0.447715 69 0 68.5523 0 68V1ZM24.5815 58.4894C24.0279 59.1251 22.9845 58.8327 22.8418 58.0019L14.2811 8.14831C14.0852 7.00721 15.6614 6.50098 16.1665 7.54278L31.4946 39.1571C31.7983 39.7833 32.6329 39.9156 33.1153 39.4139L45.5482 26.4836C46.1296 25.879 47.1522 26.2157 47.2607 27.0474L51.6396 60.6193C51.7833 61.721 50.2922 62.2005 49.7669 61.2215L39.9431 42.9135C39.6124 42.2972 38.7673 42.2021 38.3078 42.7296L24.5815 58.4894Z" fill-rule="evenodd" clip-rule="evenodd" fill="#BEF264"/>
</svg>
}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 stroke-current text-brand-primary"
          >
            {/* Figma içindeki path kodları */}
          </svg>
        </div>
  
        {/* Tipografi */}
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-bold tracking-tight text-white font-sans">
            Helio<span className="text-brand-primary">Fleet</span>
          </span>
          <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-surface-elevated text-gray-400 border border-surface-border">
            OS
          </span>
        </div>
      </div>
    );
  }