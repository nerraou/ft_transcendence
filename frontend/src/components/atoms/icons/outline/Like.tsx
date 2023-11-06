interface LikeProps {
  className?: string;
}

function Like({ className }: LikeProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      className={className}
    >
      <path
        d="M5.52051 7.99756V15.9976C5.52051 16.2628 5.41515 16.5171 5.22761 16.7047C5.04008 16.8922 4.78572 16.9976 4.52051 16.9976H2.52051C2.25529 16.9976 2.00094 16.8922 1.8134 16.7047C1.62586 16.5171 1.52051 16.2628 1.52051 15.9976V8.99756C1.52051 8.73234 1.62586 8.47799 1.8134 8.29045C2.00094 8.10292 2.25529 7.99756 2.52051 7.99756H5.52051ZM5.52051 7.99756C6.58137 7.99756 7.59879 7.57613 8.34894 6.82599C9.09908 6.07584 9.52051 5.05842 9.52051 3.99756V2.99756C9.52051 2.46713 9.73122 1.95842 10.1063 1.58334C10.4814 1.20827 10.9901 0.997559 11.5205 0.997559C12.0509 0.997559 12.5596 1.20827 12.9347 1.58334C13.3098 1.95842 13.5205 2.46713 13.5205 2.99756V7.99756H16.5205C17.0509 7.99756 17.5596 8.20827 17.9347 8.58335C18.3098 8.95842 18.5205 9.46713 18.5205 9.99756L17.5205 14.9976C17.3767 15.611 17.1039 16.1378 16.7432 16.4985C16.3824 16.8592 15.9533 17.0344 15.5205 16.9976H8.52051C7.72486 16.9976 6.9618 16.6815 6.39919 16.1189C5.83658 15.5563 5.52051 14.7932 5.52051 13.9976"
        stroke="#FCF9E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Like;
