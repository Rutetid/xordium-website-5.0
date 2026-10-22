export default function SectionHeading({
  kicker,
  title,
  blurb,
}: {
  kicker: string;
  title: string;
  blurb?: string;
}) {
  return (
    <div className="cx-sec-head">
      <p className="cx-sec-kicker">{kicker}</p>
      <h2 className="cx-sec-title">{title}</h2>
      <span className="cx-sec-rule" aria-hidden="true" />
      {blurb !== undefined ? <p className="cx-sec-blurb">{blurb}</p> : null}
    </div>
  );
}
