export default function Marquee({ items, className = '', reverse = false, speed = 32, ariaHidden = true }) {
  const sequence = items.map((item, index) => (
    <span className="marquee__item" key={`${item}-${index}`}>
      {item}
      <span className="marquee__star" aria-hidden="true">✦</span>
    </span>
  ));

  return (
    <div className={`marquee ${className}`} aria-hidden={ariaHidden ? 'true' : undefined}>
      <div
        className={`marquee__track ${reverse ? 'is-reverse' : ''}`}
        style={{ '--marquee-duration': `${speed}s` }}
      >
        {sequence}
        {sequence}
      </div>
    </div>
  );
}
