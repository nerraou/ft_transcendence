"use client"; // Error components must be Client Components

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-light-bg-tertiary dark:bg-dark-bg-primary">
      <div className="flex">
        <Link href="/feed">
          <p className="text-lg text-light-bg-tertiary rounded-2xl border border-dark-fg-primary bg-light-fg-secondary p-4">
            GO HOME
          </p>
        </Link>
        <svg
          width="172"
          height="190"
          viewBox="0 0 172 190"
          fill="none"
          onClick={() => reset()}
        >
          <path
            d="M20.8889 130.4V130.363L20.8861 130.326L12.2906 15.0376C12.1686 13.4013 13.3839 11.9705 15.0184 11.8262L90.1863 5.18859L90.1991 5.18755L142.011 1.27861C143.586 1.15982 144.983 2.2819 145.207 3.84499L165.468 145.385C165.696 146.973 164.633 148.459 163.057 148.758L93.405 161.948C93.221 161.982 93.0341 162 92.8468 162H23.8889C22.232 162 20.8889 160.657 20.8889 159V130.4Z"
            fill="#F4C127"
            stroke="#7E2625"
            strokeWidth="2"
          />
          <path
            d="M119.497 156.346L102.888 179.63L109.021 183.891L124.829 159.17L119.497 156.346Z"
            fill="#FDEECD"
            stroke="#7E2625"
          />
          <path
            d="M83.0369 24.4986L136.535 20.5358L139.001 57.5333L139.002 57.5424L139.003 57.5514L141.952 86.0625L84.4517 93.0022L50.5093 95.498L28.5 93.0525V27.4735L83.0272 24.4993L83.0272 24.4994L83.0369 24.4986Z"
            fill="#956362"
            stroke="#7E2625"
          />
          <path
            d="M108.678 122.987L134.471 93.7915L142.606 101.238L117.963 132.736L108.678 122.987Z"
            fill="#EF9935"
            stroke="#7E2625"
          />
          <path
            d="M79.8984 129.701C79.8984 134.579 76.6244 139.073 71.9905 142.375C67.3648 145.672 61.4898 147.701 56.5 147.701C46.5589 147.701 38.5 139.642 38.5 129.701C38.5 124.717 40.5246 119.325 43.8103 115.18C47.0972 111.034 51.5913 108.201 56.5 108.201C61.4404 108.201 67.3008 111.065 71.9464 115.241C76.5966 119.422 79.8984 124.797 79.8984 129.701Z"
            fill="#EF9935"
            stroke="#7E2625"
          />
          <path
            d="M123.5 120.975C123.5 122.163 122.805 123.291 121.768 124.142C120.73 124.994 119.43 125.5 118.363 125.5C116.294 125.5 114.5 123.543 114.5 120.975C114.5 119.695 114.954 118.299 115.69 117.23C116.432 116.153 117.39 115.5 118.363 115.5C119.374 115.5 120.662 116.193 121.726 117.294C122.784 118.39 123.5 119.766 123.5 120.975Z"
            fill="#E94635"
            stroke="#7E2625"
          />
          <path
            d="M136.5 104.975C136.5 106.163 135.805 107.291 134.768 108.142C133.73 108.994 132.43 109.5 131.363 109.5C129.294 109.5 127.5 107.543 127.5 104.975C127.5 103.695 127.954 102.299 128.69 101.23C129.432 100.153 130.39 99.4999 131.363 99.4999C132.374 99.4999 133.662 100.193 134.726 101.294C135.784 102.39 136.5 103.766 136.5 104.975Z"
            fill="#E94635"
            stroke="#7E2625"
          />
          <path
            d="M8.03125 125.857L19 104.714L18.1562 97L15.0625 101L9.15625 113.857L1 129.571L3.53125 133L8.03125 125.857Z"
            fill="#FDEECD"
            stroke="#7E2625"
          />
          <path
            d="M35.5261 187.776L48.1912 163.581L42.481 161.615L29.3383 184.547L35.5261 187.776Z"
            fill="#FDEECD"
            stroke="#7E2625"
          />
          <path
            d="M83.4523 76.5023L83.4325 76.5042L83.4128 76.5077L36.0307 84.8982L38.4766 35.9799L130 32.0221V72.0456L83.4523 76.5023Z"
            fill="#FDEECD"
            stroke="#7E2625"
          />
          <path
            d="M162.612 85.069L155.371 70L155 70.6552L156.3 84.4138L168.553 108C169.482 107.017 171.264 104.986 170.967 104.724C170.67 104.462 165.273 91.5115 162.612 85.069Z"
            fill="#FDEECD"
            stroke="#7E2625"
          />
          <path
            d="M62.8 119.535C62.8668 119.639 62.9028 119.749 62.908 119.866C62.9731 121.6 62.9851 123.343 62.944 125.095C62.8017 125.343 62.764 125.668 62.8308 126.07C62.8428 126.147 62.8943 126.186 62.9851 126.186C65.3045 126.182 67.63 126.185 69.9614 126.195C70.1962 126.197 70.4234 126.292 70.6428 126.482C70.7011 126.534 70.7414 126.595 70.7637 126.667C70.7997 126.793 70.8674 126.882 70.9668 126.933C71.0011 128.039 71.0088 129.152 70.99 130.272C70.9694 131.498 71.1982 132.331 69.514 132.329C67.3762 132.328 65.2377 132.325 63.0983 132.32C63.0074 132.32 62.962 132.361 62.962 132.443C62.9534 133.883 62.9543 135.307 62.9645 136.716C62.9697 137.632 63.0931 138.989 61.6171 138.994C59.7263 139.001 57.8371 139.002 55.9497 138.996C55.312 138.994 55.1371 138.019 55.1371 137.461C55.1337 135.79 55.1217 134.126 55.1011 132.468C55.1004 132.43 55.0831 132.394 55.0528 132.368C55.0225 132.342 54.9816 132.327 54.9391 132.327C52.762 132.327 50.5703 132.322 48.364 132.313C47.2248 132.309 47.0397 130.978 47.014 130.229C46.9728 129.06 47.0225 127.936 47.1631 126.858C47.5977 126.43 47.9088 126.191 48.6083 126.191C50.7563 126.185 52.9051 126.184 55.0548 126.188C55.1405 126.188 55.1937 126.151 55.2143 126.077C55.3154 125.708 55.2871 125.378 55.1294 125.086C55.0951 122.798 55.0968 121.077 55.1345 119.922C55.1397 119.815 55.1937 119.661 55.2965 119.462C55.2537 119.487 55.2571 119.506 55.3068 119.522C55.3428 119.531 55.3728 119.522 55.3968 119.497C55.6865 119.166 56.128 119 56.7211 119C58.264 119.002 59.8068 119.004 61.3497 119.007C61.9737 119.007 62.4134 119.191 62.6688 119.558C62.6787 119.572 62.6941 119.582 62.7119 119.587C62.7296 119.591 62.7483 119.589 62.764 119.581C62.7845 119.57 62.7965 119.555 62.8 119.535Z"
            fill="#956362"
          />
          <path
            d="M49.44 54.76H41.792C41.28 54.76 40.768 54.5467 40.256 54.12L39.392 53.384C38.944 53.0213 38.72 52.5947 38.72 52.104V45.48C38.72 44.84 38.976 44.3067 39.488 43.88L40.256 43.24C40.768 42.8133 41.28 42.6 41.792 42.6H50.304C50.816 42.6 51.328 42.8133 51.84 43.24L52.608 43.88C53.12 44.3067 53.376 44.84 53.376 45.48V46.76H50.688V46.152C50.688 45.832 50.6667 45.6293 50.624 45.544C50.6027 45.4373 50.496 45.3093 50.304 45.16C50.112 45.0107 49.9627 44.9253 49.856 44.904C49.7493 44.8613 49.504 44.84 49.12 44.84H42.976C42.592 44.84 42.3467 44.8613 42.24 44.904C42.1333 44.9253 41.984 45.0107 41.792 45.16C41.6 45.3093 41.4827 45.4373 41.44 45.544C41.4187 45.6293 41.408 45.832 41.408 46.152V51.208C41.408 51.528 41.4187 51.7413 41.44 51.848C41.4827 51.9333 41.6 52.0507 41.792 52.2C41.984 52.3493 42.1333 52.4453 42.24 52.488C42.3467 52.5093 42.592 52.52 42.976 52.52H50.624C51.136 52.52 51.648 52.7333 52.16 53.16L52.928 53.8C53.44 54.2267 53.696 54.76 53.696 55.4V62.12C53.696 62.76 53.44 63.2933 52.928 63.72L52.16 64.36C51.648 64.7867 51.136 65 50.624 65H41.472C40.96 65 40.448 64.7867 39.936 64.36L39.168 63.72C38.656 63.2933 38.4 62.76 38.4 62.12V60.84H41.088V61.448C41.088 61.768 41.0987 61.9813 41.12 62.088C41.1627 62.1733 41.28 62.2907 41.472 62.44C41.664 62.5893 41.8133 62.6853 41.92 62.728C42.0267 62.7493 42.272 62.76 42.656 62.76H49.44C49.824 62.76 50.0693 62.7493 50.176 62.728C50.2827 62.6853 50.432 62.5893 50.624 62.44C50.816 62.2907 50.9227 62.1733 50.944 62.088C50.9867 61.9813 51.008 61.768 51.008 61.448V56.072C51.008 55.752 50.9867 55.5493 50.944 55.464C50.9227 55.3573 50.816 55.2293 50.624 55.08C50.432 54.9307 50.2827 54.8453 50.176 54.824C50.0693 54.7813 49.824 54.76 49.44 54.76ZM62.7498 49H68.3498C68.8618 49 69.3738 49.2133 69.8858 49.64L70.6538 50.28C71.1658 50.7067 71.4218 51.24 71.4218 51.88V65H68.7338V52.552C68.7338 52.232 68.7124 52.0293 68.6698 51.944C68.6484 51.8373 68.5418 51.7093 68.3498 51.56C68.1578 51.4107 68.0084 51.3253 67.9018 51.304C67.7951 51.2613 67.5498 51.24 67.1658 51.24H63.0698C62.6644 51.24 62.3871 51.2613 62.2378 51.304C62.1098 51.3467 61.8538 51.4853 61.4698 51.72C61.0858 51.9547 60.8618 52.1253 60.7977 52.232C60.7338 52.3387 60.7018 52.552 60.7018 52.872V65H58.0138V41.32H60.7018V50.504H60.8298C60.8298 50.312 61.0644 50.0133 61.5338 49.608C62.0031 49.2027 62.4084 49 62.7498 49ZM78.3678 49H86.0478C86.5598 49 87.0718 49.2133 87.5838 49.64L88.3518 50.28C88.8638 50.7067 89.1198 51.24 89.1198 51.88V62.12C89.1198 62.76 88.8638 63.2933 88.3518 63.72L87.5838 64.36C87.0718 64.7867 86.5598 65 86.0478 65H78.3678C77.8558 65 77.3438 64.7867 76.8318 64.36L76.0638 63.72C75.5518 63.2933 75.2958 62.76 75.2958 62.12V51.88C75.2958 51.24 75.5518 50.7067 76.0638 50.28L76.8318 49.64C77.3438 49.2133 77.8558 49 78.3678 49ZM86.4318 61.448V52.552C86.4318 52.232 86.4104 52.0293 86.3678 51.944C86.3464 51.8373 86.2398 51.7093 86.0478 51.56C85.8558 51.4107 85.7064 51.3253 85.5998 51.304C85.4931 51.2613 85.2478 51.24 84.8638 51.24H79.5518C79.1678 51.24 78.9224 51.2613 78.8158 51.304C78.7091 51.3253 78.5598 51.4107 78.3678 51.56C78.1758 51.7093 78.0584 51.8373 78.0158 51.944C77.9944 52.0293 77.9838 52.232 77.9838 52.552V61.448C77.9838 61.768 77.9944 61.9813 78.0158 62.088C78.0584 62.1733 78.1758 62.2907 78.3678 62.44C78.5598 62.5893 78.7091 62.6853 78.8158 62.728C78.9224 62.7493 79.1678 62.76 79.5518 62.76H84.8638C85.2478 62.76 85.4931 62.7493 85.5998 62.728C85.7064 62.6853 85.8558 62.5893 86.0478 62.44C86.2398 62.2907 86.3464 62.1733 86.3678 62.088C86.4104 61.9813 86.4318 61.768 86.4318 61.448ZM96.0865 49H103.767C104.279 49 104.791 49.2133 105.303 49.64L106.071 50.28C106.583 50.7067 106.839 51.24 106.839 51.88V62.12C106.839 62.76 106.583 63.2933 106.071 63.72L105.303 64.36C104.791 64.7867 104.279 65 103.767 65H96.0865C95.5745 65 95.0625 64.7867 94.5505 64.36L93.7825 63.72C93.2705 63.2933 93.0145 62.76 93.0145 62.12V51.88C93.0145 51.24 93.2705 50.7067 93.7825 50.28L94.5505 49.64C95.0625 49.2133 95.5745 49 96.0865 49ZM104.151 61.448V52.552C104.151 52.232 104.129 52.0293 104.087 51.944C104.065 51.8373 103.959 51.7093 103.767 51.56C103.575 51.4107 103.425 51.3253 103.319 51.304C103.212 51.2613 102.967 51.24 102.583 51.24H97.2705C96.8865 51.24 96.6412 51.2613 96.5345 51.304C96.4278 51.3253 96.2785 51.4107 96.0865 51.56C95.8945 51.7093 95.7772 51.8373 95.7345 51.944C95.7132 52.0293 95.7025 52.232 95.7025 52.552V61.448C95.7025 61.768 95.7132 61.9813 95.7345 62.088C95.7772 62.1733 95.8945 62.2907 96.0865 62.44C96.2785 62.5893 96.4278 62.6853 96.5345 62.728C96.6412 62.7493 96.8865 62.76 97.2705 62.76H102.583C102.967 62.76 103.212 62.7493 103.319 62.728C103.425 62.6853 103.575 62.5893 103.767 62.44C103.959 62.2907 104.065 62.1733 104.087 62.088C104.129 61.9813 104.151 61.768 104.151 61.448ZM114.381 44.52V49H118.477C118.755 49.2133 118.915 49.384 118.957 49.512C119.021 49.6187 119.053 49.9173 119.053 50.408V51.24H114.381V61.448C114.381 61.768 114.392 61.9813 114.413 62.088C114.456 62.1733 114.573 62.2907 114.765 62.44C114.957 62.5893 115.107 62.6853 115.213 62.728C115.32 62.7493 115.565 62.76 115.949 62.76H118.861C119.139 62.9733 119.299 63.144 119.341 63.272C119.405 63.3787 119.437 63.6773 119.437 64.168V65H114.765C114.253 65 113.741 64.7867 113.229 64.36L112.461 63.72C111.949 63.2933 111.693 62.76 111.693 62.12V51.24H110.157C109.88 51.0267 109.709 50.8667 109.645 50.76C109.603 50.632 109.581 50.3227 109.581 49.832V49H111.693V44.52H114.381ZM126.763 63.848V63.112C126.763 62.664 126.678 62.3547 126.507 62.184C126.336 62.0347 125.995 61.96 125.483 61.96H125.355C124.843 61.96 124.512 62.0347 124.363 62.184C124.214 62.312 124.128 62.4187 124.107 62.504C124.086 62.5893 124.075 62.792 124.075 63.112V63.848C124.075 64.296 124.16 64.6053 124.331 64.776C124.502 64.9253 124.843 65 125.355 65H125.515C126.006 65 126.326 64.9253 126.475 64.776C126.624 64.648 126.71 64.5413 126.731 64.456C126.752 64.3707 126.763 64.168 126.763 63.848ZM126.411 58.92H124.427L124.075 50.6V42.6H126.763V50.6L126.411 58.92Z"
            fill="#7E2625"
          />
        </svg>
      </div>
      <span className="text-xxl text-light-fg-link dark:text-dark-bg-secondary">
        Well this is not excpected
      </span>
    </div>
  );
}
