import clsx from "clsx";

interface BarRatingProps {
  rating: number;
}

function BarRating(props: BarRatingProps) {
  return (
    <div className="flex items-center justify-between">
      <p
        className={clsx(
          "flex items-center justify-center text-light-fg-link dark:text-dark-bg-primary border-solid w-16 h-16 border-4 bg-light-bg-tertiary border-light-fg-primary dark:border-dark-fg-primary rounded-full",
          {
            "text-lg": props.rating > 99 && props.rating < 99,
            "text-sm": props.rating > 999 && props.rating < 999,
          },
          { "text-xl": props.rating < 99 && props.rating > -99 },
        )}
      >
        {props.rating}
      </p>
      <div className="bg-light-fg-primary dark:bg-dark-fg-primary rounded-full h-3 w-5/6 sm:w-3/5" />
    </div>
  );
}

export default BarRating;
