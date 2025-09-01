import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa';
import SocialLink from '@/components/SocialLink';

export default function Header() {
  return (
    <header className="border-b border-black w-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-[68%_32%]">
        {/* yellow part */}
        <div className="bg-[#fef3b0] w-full">
          <div className="mx-auto max-w-7xl px-5 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-center gap-3">
              <aside className="font-mono text-base lowercase leading-tight">
                <p>
                  humans <br className="hidden sm:block" />
                  working <br className="hidden sm:block" />
                  side-by-side <br className="hidden sm:block" />
                  with <br className="hidden sm:block" />
                  ai agents
                </p>
              </aside>

              <a
                href="#top"
                aria-label="CoreAI Home"
                className="flex items-center"
              >
                <h1 className="font-mono text-[56px] sm:text-[64px] leading-none tracking-tight -ml-2 sm:-ml-4">
                  /CoreAI
                </h1>
              </a>
            </div>
          </div>
        </div>

        {/* blue part */}
        <div className="hidden md:flex bg-[#9fd7e5] border-l border-black items-center justify-center">
          <div className="flex flex-col items-center justify-center p-4 max-w-[380px]">
            <p className="text-[15px] leading-snug text-black/90 text-center">
              Copenhagen-based consultancy specializing in advanced Generative
              AI and Agentic AI solutions.
            </p>

            <nav
              aria-label="Social media"
              className="mt-3 flex gap-3 justify-center md:justify-start"
            >
              <SocialLink
                Icon={FaFacebookF}
                label="Facebook"
                filled
                className="md:h-9 md:w-9 lg:h-10 lg:w-10 xl:h-11 xl:w-11"
              />
              <SocialLink
                Icon={FaInstagram}
                label="Instagram"
                filled
                className="md:h-9 md:w-9 lg:h-10 lg:w-10 xl:h-11 xl:w-11"
              />
              <SocialLink
                Icon={FaLinkedinIn}
                label="LinkedIn"
                filled
                className="md:h-9 md:w-9 lg:h-10 lg:w-10 xl:h-11 xl:w-11"
              />
              <SocialLink
                Icon={FaTwitter}
                label="Twitter"
                filled
                className="md:h-9 md:w-9 lg:h-10 lg:w-10 xl:h-11 xl:w-11"
              />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
