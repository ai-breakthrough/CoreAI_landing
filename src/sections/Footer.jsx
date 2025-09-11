import SectionContainer from '@/components/SectionContainer';
import SocialLink from '@/components/SocialLink';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black md:py-6 py-12 text-white">
      <SectionContainer>
        <div className="mx-auto max-w-7xl px-5">
          <div
            className="
              flex flex-col items-start gap-6
              md:flex-row md:items-start md:justify-between
            "
          >
            <nav
              aria-label="Footer menu"
              className="font-mono flex flex-col gap-2 text-left"
            >
              {[
                { href: '#top', label: 'Home' },
                { href: '#services', label: 'Read More Cases' },
                { href: '#', label: 'Blog' },
                { href: '#use-cases', label: 'Cases' },
                { href: '#solutions', label: 'Agentic AI Statistics' },
              ].map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  className="inline-block transition will-change-transform hover:scale-[1.03] hover:bg-gradient-to-r hover:from-[#9fd7ff] hover:to-[#f8d364] hover:bg-clip-text hover:text-transparent"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex justify-center md:justify-end gap-4 w-full md:w-auto">
              <SocialLink
                Icon={FaFacebookF}
                label="Facebook"
                className="bg-white text-black border border-black"
              />
              <SocialLink
                Icon={FaInstagram}
                label="Instagram"
                className="bg-white text-black border border-black"
              />
              <SocialLink
                Icon={FaLinkedinIn}
                label="LinkedIn"
                className="bg-white text-black border border-black"
              />
              <SocialLink
                Icon={FaTwitter}
                label="Twitter"
                className="bg-white text-black border border-black"
              />
            </div>
          </div>

          <div className="flex flex-col items-center mt-8 md:mt-1">
            <p className="font-mono text-[clamp(36px,4.5vw,56px)] text-[#9fd7ff] leading-none">
              /CoreAI
            </p>
            <p className="font-mono mt-3 text-xs opacity-80">
              All rights reserved CoreAI 2025
            </p>
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
}
