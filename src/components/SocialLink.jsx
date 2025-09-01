export default function SocialLink({
  Icon,
  label,
  outline = false,
  inverse = false,
  filled = false,
  className = '',
}) {
  const base =
    'inline-flex items-center justify-center rounded-full transition hover:scale-[1.06]';
  const size = 'h-11 w-11';

  let style = '';
  if (filled) style = 'bg-black text-white border border-black';
  else if (outline)
    style = `${
      inverse ? 'border-white/50 text-white' : 'border-black/45 text-black'
    } border`;
  else style = inverse ? 'text-white' : 'text-black';

  return (
    <a
      href="#"
      aria-label={label}
      className={`${base} ${size} ${style} ${className}`}
    >
      <Icon className="h-[22px] w-[22px] md:h-[18px] md:w-[18px] lg:h-[18px] lg:w-[18px] xl:h-[22px] xl:w-[22px]" />
    </a>
  );
}
