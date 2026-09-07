type ScrubBackProps = {
  index: number;
  count: number;
  onPrevious: () => void;
};

export function ScrubBack({ index, count, onPrevious }: ScrubBackProps) {
  const atStart = index <= 0;
  return (
    <div className="scrub-back">
      <button type="button" className="scrub-back-btn" disabled={atStart} onClick={onPrevious}>
        Previous
      </button>
      <p className="scrub-back-pos" aria-live="polite">
        {index + 1} of {count}
      </p>
    </div>
  );
}
