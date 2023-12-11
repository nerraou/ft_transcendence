import clsx from "clsx";

interface LoadingProps {
  bgColor?: string;
  width?: string;
  height?: string;
}

function Loading(props: LoadingProps) {
  return (
    <div
      className={clsx(
        "flex flex-col justify-center items-center",
        props.bgColor,
        props.height,
        props.width,
      )}
    >
      <svg
        width="164"
        height="191"
        viewBox="0 0 164 191"
        fill="none"
        className="animate-bounce"
      >
        <path
          d="M21.2621 130.4V130.365L21.2597 130.331L13.2672 14.9978C13.1547 13.3747 14.3565 11.9578 15.9763 11.8039L85.6137 5.18815L85.6273 5.18695L133.464 1.30415C135.056 1.17494 136.47 2.31551 136.681 3.89863L155.516 145.459C155.724 147.022 154.687 148.479 153.141 148.794L88.6201 161.94C88.423 161.98 88.2223 162 88.0212 162H24.2621C22.6053 162 21.2621 160.657 21.2621 159V130.4Z"
          fill="#F4C127"
          stroke="#7E2625"
          strokeWidth="2"
        />
        <path
          d="M125 155.974L130.702 184L138 182.421L130.702 154L125 155.974Z"
          fill="#FDEECD"
          stroke="#7E2625"
        />
        <path
          d="M78.0369 24.4986L131.535 20.5358L134.001 57.5333L134.002 57.5424L134.003 57.5514L136.952 86.0625L79.4517 93.0022L45.5093 95.498L23.5 93.0525V27.4735L78.0272 24.4993L78.0272 24.4994L78.0369 24.4986Z"
          fill="#956362"
          stroke="#7E2625"
        />
        <path
          d="M103.678 122.987L129.471 93.7915L137.606 101.238L112.963 132.736L103.678 122.987Z"
          fill="#EF9935"
          stroke="#7E2625"
        />
        <path
          d="M74.8984 129.701C74.8984 134.579 71.6244 139.073 66.9905 142.375C62.3648 145.672 56.4898 147.701 51.5 147.701C41.5589 147.701 33.5 139.642 33.5 129.701C33.5 124.717 35.5246 119.325 38.8103 115.18C42.0972 111.034 46.5913 108.201 51.5 108.201C56.4404 108.201 62.3008 111.065 66.9464 115.241C71.5966 119.422 74.8984 124.797 74.8984 129.701Z"
          fill="#EF9935"
          stroke="#7E2625"
        />
        <path
          d="M118.5 120.975C118.5 122.163 117.805 123.291 116.768 124.142C115.73 124.994 114.43 125.5 113.363 125.5C111.294 125.5 109.5 123.543 109.5 120.975C109.5 119.695 109.954 118.299 110.69 117.23C111.432 116.153 112.39 115.5 113.363 115.5C114.374 115.5 115.662 116.193 116.726 117.294C117.784 118.39 118.5 119.766 118.5 120.975Z"
          fill="#E94635"
          stroke="#7E2625"
        />
        <path
          d="M131.5 104.975C131.5 106.163 130.805 107.291 129.768 108.142C128.73 108.994 127.43 109.5 126.363 109.5C124.294 109.5 122.5 107.543 122.5 104.975C122.5 103.695 122.954 102.299 123.69 101.23C124.432 100.153 125.39 99.4999 126.363 99.4999C127.374 99.4999 128.662 100.193 129.726 101.294C130.784 102.39 131.5 103.766 131.5 104.975Z"
          fill="#E94635"
          stroke="#7E2625"
        />
        <path
          d="M8.03125 127.857L19 106.714L18.1562 99L15.0625 103L9.15625 115.857L1 131.571L3.53125 135L8.03125 127.857Z"
          fill="#FDEECD"
          stroke="#7E2625"
        />
        <path
          d="M55.902 190L60 163H53.9608L49 188.962L55.902 190Z"
          fill="#FDEECD"
          stroke="#7E2625"
        />
        <path
          d="M78.4523 76.5023L78.4325 76.5042L78.4128 76.5077L31.0307 84.8982L33.4766 35.9799L125 32.0221V72.0456L78.4523 76.5023Z"
          fill="#FDEECD"
          stroke="#7E2625"
        />
        <path
          d="M154.612 85.069L147.371 70L147 70.6552L148.3 84.4138L160.553 108C161.482 107.017 163.264 104.986 162.967 104.724C162.67 104.462 157.273 91.5115 154.612 85.069Z"
          fill="#FDEECD"
          stroke="#7E2625"
        />
        <path
          d="M57.8 118.555C57.8668 118.662 57.9028 118.776 57.908 118.897C57.9731 120.694 57.9851 122.501 57.944 124.317C57.8017 124.573 57.764 124.91 57.8308 125.327C57.8428 125.407 57.8943 125.447 57.9851 125.447C60.3045 125.443 62.63 125.446 64.9614 125.457C65.1962 125.458 65.4234 125.558 65.6428 125.754C65.7011 125.808 65.7414 125.872 65.7637 125.946C65.7997 126.076 65.8674 126.168 65.9668 126.222C66.0011 127.367 66.0088 128.521 65.99 129.682C65.9694 130.952 66.1982 131.816 64.514 131.814C62.3762 131.812 60.2377 131.809 58.0983 131.804C58.0074 131.804 57.962 131.847 57.962 131.932C57.9534 133.424 57.9543 134.9 57.9645 136.36C57.9697 137.309 58.0931 138.716 56.6171 138.721C54.7263 138.729 52.8371 138.729 50.9497 138.723C50.312 138.721 50.1371 137.71 50.1371 137.132C50.1337 135.401 50.1217 133.676 50.1011 131.958C50.1004 131.919 50.0831 131.882 50.0528 131.854C50.0225 131.827 49.9816 131.811 49.9391 131.811C47.762 131.811 45.5703 131.807 43.364 131.797C42.2248 131.793 42.0397 130.414 42.014 129.637C41.9728 128.426 42.0225 127.261 42.1631 126.144C42.5977 125.7 42.9088 125.452 43.6083 125.452C45.7563 125.446 47.9051 125.445 50.0548 125.45C50.1405 125.45 50.1937 125.411 50.2143 125.334C50.3154 124.952 50.2871 124.609 50.1294 124.307C50.0951 121.936 50.0968 120.152 50.1345 118.956C50.1397 118.844 50.1937 118.685 50.2965 118.479C50.2537 118.504 50.2571 118.525 50.3068 118.541C50.3428 118.55 50.3728 118.541 50.3968 118.515C50.6865 118.172 51.128 118 51.7211 118C53.264 118.002 54.8068 118.004 56.3497 118.007C56.9737 118.007 57.4134 118.197 57.6688 118.578C57.6787 118.593 57.6941 118.604 57.7119 118.608C57.7296 118.612 57.7483 118.61 57.764 118.602C57.7845 118.591 57.7965 118.575 57.8 118.555Z"
          fill="#956362"
        />
        <path
          d="M76.608 53.112V53.848C76.608 54.168 76.5973 54.3707 76.576 54.456C76.5547 54.5413 76.4693 54.648 76.32 54.776C76.1707 54.9253 75.8507 55 75.36 55H75.2C74.688 55 74.3467 54.9253 74.176 54.776C74.0053 54.6053 73.92 54.296 73.92 53.848V53.112C73.92 52.792 73.9307 52.5893 73.952 52.504C73.9733 52.4187 74.0587 52.312 74.208 52.184C74.3573 52.0347 74.688 51.96 75.2 51.96H75.328C75.84 51.96 76.1813 52.0347 76.352 52.184C76.5227 52.3547 76.608 52.664 76.608 53.112ZM83.1393 53.112V53.848C83.1393 54.168 83.1286 54.3707 83.1073 54.456C83.0859 54.5413 83.0006 54.648 82.8513 54.776C82.7019 54.9253 82.3819 55 81.8913 55H81.7313C81.2193 55 80.8779 54.9253 80.7073 54.776C80.5366 54.6053 80.4513 54.296 80.4513 53.848V53.112C80.4513 52.792 80.4619 52.5893 80.4833 52.504C80.5046 52.4187 80.5899 52.312 80.7393 52.184C80.8886 52.0347 81.2193 51.96 81.7313 51.96H81.8593C82.3713 51.96 82.7126 52.0347 82.8833 52.184C83.0539 52.3547 83.1393 52.664 83.1393 53.112ZM89.6705 53.112V53.848C89.6705 54.168 89.6598 54.3707 89.6385 54.456C89.6172 54.5413 89.5318 54.648 89.3825 54.776C89.2332 54.9253 88.9132 55 88.4225 55H88.2625C87.7505 55 87.4092 54.9253 87.2385 54.776C87.0678 54.6053 86.9825 54.296 86.9825 53.848V53.112C86.9825 52.792 86.9932 52.5893 87.0145 52.504C87.0358 52.4187 87.1212 52.312 87.2705 52.184C87.4198 52.0347 87.7505 51.96 88.2625 51.96H88.3905C88.9025 51.96 89.2438 52.0347 89.4145 52.184C89.5852 52.3547 89.6705 52.664 89.6705 53.112Z"
          fill="#956362"
        />
      </svg>

      <span className="text-xxl text-light-fg-link">LOADING...</span>
    </div>
  );
}

export default Loading;
