interface Props {
  type?: 'error';
  text: string;
  showFeedback?: boolean;
  className?: string;
}

export default function InlineFeedback(props: Props) {
  return props.showFeedback && <span className={`text-red-500 ${props.className || ''}`}>{props.text}</span>;
}
