interface Props {
  type?: 'error';
  text: string;
  showFeedback?: boolean;
  className?: string;
}

export default function InlineFeedback(props: Props) {
  return props.showFeedback && <p className={`text-danger ${props.className || ''}`}>{props.text}</p>;
}

export type { Props as InlineFeedbackProps };
