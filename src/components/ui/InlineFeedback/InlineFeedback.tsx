interface Props {
  type?: 'error';
  text: string;
  showFeedback?: boolean;
  className?: string;
}

export default function InlineFeedback(props: Props) {
  return props.showFeedback && <span className={`text-danger ${props.className || ''}`}>{props.text}</span>;
}

export type { Props as InlineFeedbackProps };
