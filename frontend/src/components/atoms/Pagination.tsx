import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@hooks/useMediaQuery";

type PaginationButtonProps = {
  onClick: (value: string) => void;
  content: string;
  active: boolean;
  disabled?: boolean;
};

const PaginationButton = (props: PaginationButtonProps) => {
  const { onClick, content, active, disabled } = props;
  return (
    <button
      onClick={() => onClick(content)}
      className={`px-4 py-2 ${
        active
          ? "bg-light-bg-primary text-light-fg-primary"
          : "bg-light-bg-tertiary text-light-fg-secondary"
      } rounded-full`}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

type PaginationInfos = {
  value: number;
  size: number;
  total: number;
  step: number;
  start: number;
};

type PaginationProps = {
  defaultPage?: number;
  total: number;
};

const Pagination = (props: PaginationProps) => {
  const { defaultPage, total } = props;
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const isTinyScreen = useMediaQuery("(max-width: 480px)");
  const [paginatinInfos, setPaginationInfos] = useState<PaginationInfos>({
    value: defaultPage || 1,
    size: 3,
    total: total,
    step: 1,
    start:
      defaultPage && defaultPage <= total
        ? Math.max(1, Math.min(defaultPage - 1, total - 1))
        : 1,
  });

  useEffect(() => {
    setPaginationInfos({
      ...paginatinInfos,
      size: isTinyScreen ? 1 : isSmallScreen ? 2 : 3,
      step: isTinyScreen ? 1 : isSmallScreen ? 2 : 3,
    });
  }, [isTinyScreen, isSmallScreen]);

  const handleNext = (_: any) => {
    setPaginationInfos({
      ...paginatinInfos,
      start: Math.min(
        paginatinInfos.start + paginatinInfos.step,
        paginatinInfos.total - paginatinInfos.step + 1,
      ),
    });
  };

  const handlePrev = (_: any) => {
    setPaginationInfos({
      ...paginatinInfos,
      start: Math.max(paginatinInfos.start - paginatinInfos.step, 1),
    });
  };

  const handleClicked = (value: string) => {
    setPaginationInfos({
      ...paginatinInfos,
      value: parseInt(value),
    });
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <PaginationButton
        onClick={handlePrev}
        content="<"
        active={false}
        disabled={paginatinInfos.start === 1}
      />
      {Array.from(Array(Math.min(paginatinInfos.size, total)).keys()).map(
        (i) => {
          return (
            <PaginationButton
              onClick={handleClicked}
              content={`${i + paginatinInfos.start}`}
              active={i + paginatinInfos.start === paginatinInfos.value}
            />
          );
        },
      )}
      <PaginationButton
        onClick={handleNext}
        content=">"
        active={false}
        disabled={
          paginatinInfos.start + paginatinInfos.size - 1 ===
          paginatinInfos.total
        }
      />
    </div>
  );
};

export default Pagination;
