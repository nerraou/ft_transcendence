interface PhotoProps {
  className?: string;
}

function Photo({ className }: PhotoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M15 8h.01"></path>
      <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z"></path>
      <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5"></path>
      <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3"></path>
    </svg>
  );
}

export default Photo;
