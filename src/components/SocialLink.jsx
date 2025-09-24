import PropTypes from 'prop-types';

export default function SocialLink(props) {
  const {
    Icon,
    label,
    href = '#',
    outline = false,
    inverse = false,
    filled = false,
    className = '',
  } = props;
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

  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`${base} ${size} ${style} ${className}`}
    >
      <Icon className="h-[22px] w-[22px] md:h-[18px] md:w-[18px] lg:h-[18px] lg:w-[18px] xl:h-[22px] xl:w-[22px]" />
    </a>
  );
}

SocialLink.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  outline: PropTypes.bool,
  inverse: PropTypes.bool,
  filled: PropTypes.bool,
  className: PropTypes.string,
};
