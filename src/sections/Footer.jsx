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
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 px-5 md:grid-cols-3">
          <nav aria-label="Footer menu" className="flex flex-col gap-2">
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

          <div className="flex flex-col items-center mt-8 md:mt-12">
            <p className="font-mono text-[clamp(36px,4.5vw,56px)] text-[#9fd7ff] leading-none">
              /CoreAI
            </p>
            <p className="mt-3 text-xs opacity-80">
              All rights reserved CoreAI 2025
            </p>
          </div>

          <div className="flex justify-center gap-4">
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
      </SectionContainer>
    </footer>
  );
}
