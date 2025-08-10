interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeColor = '';
  let badgeText = '';

  if (score > 70) {
    badgeColor = 'bg-badge-green text-green-700';
    badgeText = 'Strong';
  } else if (score > 49) {
    badgeColor = 'bg-badge-yellow text-yellow-700';
    badgeText = 'Good Start';
  } else {
    badgeColor = 'bg-badge-red text-red-700';
    badgeText = 'Needs Work';
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${badgeColor}`}>
      <span className="text-sm font-semibold">{badgeText}</span>
      <span className="text-xs opacity-80">({score}/100)</span>
    </div>
  );
};

export default ScoreBadge;
