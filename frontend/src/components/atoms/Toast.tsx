import Check from "@icons/outline/Check";
import X from "@icons/outline/X";

interface ToastCardProps {
  username: string;
  scoreToWin: number;
  token: string;
  onAccept: (token: string) => void;
  onDecline: (token: string) => void;
}

export function ToastChallenge(props: ToastCardProps) {
  return (
    <div className="inline-flex flex-col items-center p-3 rounded-md bg-light-fg-tertiary border-2 border-dark-fg-primary text-lg">
      <output className="text-light-fg-link">
        {props.username} challenged yout to {props.scoreToWin} game
      </output>

      <section className="space-x-16 min-w-max mt-4">
        <button
          className="inline-flex justify-center items-center w-7 h-7 rounded-md bg-light-useless"
          onClick={() => props.onAccept(props.token)}
        >
          <Check width="w-4" height="h-4" color="stroke-light-bg-tertiary" />
        </button>
        <button
          className="inline-flex justify-center items-center w-7 h-7 rounded-md bg-dark-fg-secondary"
          onClick={() => props.onDecline(props.token)}
        >
          <X width="w-4" height="h-4" color="stroke-light-bg-tertiary" />
        </button>
      </section>
    </div>
  );
}
