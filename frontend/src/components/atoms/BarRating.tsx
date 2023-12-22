interface BarRatingProps {
  rating: number;
}

function BarRating(props: BarRatingProps) {
  return (
    <div className="flex justify-between  items-center">
      <div className="flex items-center justify-center text-light-fg-link text-xl dark:text-dark-bg-primary border-solid w-16 h-16 border-4 bg-light-bg-tertiary border-light-fg-primary dark:border-dark-fg-primary rounded-full">
        {props.rating}
      </div>
      <div className="bg-light-fg-primary rounded-full h-3 w-5/6 sm:w-3/5" />
    </div>
  );
}

export default BarRating;
