import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from 'react-icons/fa';
import SocialLink from '@/components/SocialLink';
import LanguageFlags from '@/components/LanguageFlags';

export default function Header() {
  return (
    <header className="border-b border-black w-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-[68%_32%] h-[108px] md:h-[140px] lg:h-[140px]">
        {/* YELLOW */}
        <div className="relative bg-[#fef3b0] w-full overflow-hidden">
          <LanguageFlags className="absolute top-5 right-2 z-10" />

          <div className="mx-auto max-w-7xl pl-3 pr-0 h-full">
            <div className="grid grid-cols-[120px_minmax(0,1fr)] sm:grid-cols-[170px_minmax(0,1fr)] items-stretch gap-3 h-full">
              <aside className="font-mono lowercase h-full">
                <ul className="flex flex-col justify-start gap-[2px] sm:gap-1 text-[11px] leading-[0.95rem] sm:text-base sm:leading-tight pl-5 pt-3">
                  <li>humans</li>
                  <li>working</li>
                  <li>side-by-side</li>
                  <li>with</li>
                  <li>ai agents</li>
                </ul>
              </aside>

              <div className="relative flex items-end justify-end pb-3 pr-1 h-full">
                <a href="#top" aria-label="CoreAI Home" className="block">
                  <h2 className="font-mono text-[44px] sm:text-[60px] leading-none tracking-tight text-right">
                    /CoreAI
                  </h2>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BLUE */}
        <div className="hidden md:flex bg-[#9fd7e5] border-l border-black overflow-hidden">
          <div className="flex flex-col w-full h-full pl-6 lg:pl-7 pr-5 py-2 md:py-2">
            <p
              className="
                font-mono text-left text-black/90 text-balance hyphens-auto
                md:max-w-[520px] lg:max-w-[560px] xl:max-w-[600px] pt-2
                md:text-[12px] md:leading-[1.05rem]
                lg:text-[clamp(13px,1vw,16px)] lg:leading-snug
                lg:line-clamp-3
              "
            >
              Copenhagen-based consultancy specializing in advanced Generative
              AI and Agentic AI solutions.
            </p>

            <nav aria-label="Social media" className="mt-auto pb-2 flex gap-3">
              <SocialLink
                Icon={FaFacebookF}
                label="Facebook"
                filled
                className="h-11 w-11 md:h-10 md:w-10"
              />
              <SocialLink
                Icon={FaInstagram}
                label="Instagram"
                filled
                className="h-11 w-11 md:h-10 md:w-10"
              />
              <SocialLink
                Icon={FaLinkedinIn}
                label="LinkedIn"
                filled
                className="h-11 w-11 md:h-10 md:w-10"
              />
              <SocialLink
                Icon={FaTiktok}
                label="TikTok"
                filled
                className="h-11 w-11 md:h-10 md:w-10"
              />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
