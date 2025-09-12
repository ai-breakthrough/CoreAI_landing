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
      <div className="w-full grid grid-cols-1 md:grid-cols-[68%_32%]">
        {/* YELLOW */}
        <div className="relative bg-[#fef3b0] w-full">
          <LanguageFlags className="absolute top-2 right-2 z-10" />

          <div className="mx-auto max-w-7xl pl-3 pr-0">
            <div className="grid grid-cols-1 sm:grid-cols-[170px_minmax(0,1fr)] items-stretch gap-3">
              <aside className="hidden sm:block font-mono text-base lowercase leading-tight h-full">
                <p className="sm:hidden">
                  humans working side-by-side with ai agents
                </p>
                <ul className="flex h-full flex-col justify-between">
                  <li>humans</li>
                  <li>working</li>
                  <li>side-by-side</li>
                  <li>with</li>
                  <li>ai agents</li>
                </ul>
              </aside>

              <div className="relative flex items-end justify-end pb-2 pr-1 min-h-[120px]">
                <a href="#top" aria-label="CoreAI Home" className="block">
                  <h2 className="font-mono text-[56px] sm:text-[64px] leading-none tracking-tight text-right">
                    /CoreAI
                  </h2>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BLUE */}
        <div className="hidden md:flex bg-[#9fd7e5] border-l border-black">
          <div className="flex flex-col items-start justify-start w-full px-3 py-3">
            <p className="font-mono text-[15px] leading-snug text-black/90 text-left max-w-[520px]">
              Copenhagen-based consultancy specializing in advanced Generative
              AI and Agentic AI solutions.
            </p>

            <nav
              aria-label="Social media"
              className="mt-3 flex gap-3 justify-start"
            >
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
