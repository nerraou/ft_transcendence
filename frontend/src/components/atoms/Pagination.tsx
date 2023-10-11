"use client";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@hooks/useMediaQuery";

type PaginationButtonProps = {
  onClick: (value: string) => void;
  content: string;
  active: boolean;
  disabled?: boolean;
  slider?: boolean;
};

const PaginationButton = (props: PaginationButtonProps) => {
  const { onClick, content, active, disabled, slider } = props;
  return (
    <button
      onClick={() => onClick(content)}
      className={`drop-shadow-lg w-8 h-8 flex items-center justify-center
      ${content.length > 2 ? "text-sm" : ""}
      ${
        slider
          ? "bg-light-bg-tertiary text-light-fg-primary dark:text-dark-fg-primary"
          : active
          ? "bg-light-bg-primary text-light-fg-tertiary dark:bg-dark-fg-link"
          : "bg-light-bg-tertiary text-light-fg-link"
      } rounded-full`}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

type PaginationInfos = {
  size: number;
  total: number;
  step: number;
  start: number;
};

type PaginationProps = {
  page?: number;
  total: number;
  onChange?: (value: number) => void;
};

const Pagination = (props: PaginationProps) => {
  const { page, total } = props;
  const isSmallScreen = useMediaQuery("(max-width: 480px)");
  const isTinyScreen = useMediaQuery("(max-width: 320px)");
  const [paginatinInfos, setPaginationInfos] = useState<PaginationInfos>({
    size: 3,
    total: total,
    step: 1,
    start: 1,
  });

  useEffect(() => {
    setPaginationInfos((prev) => ({
      ...prev,
      size: isTinyScreen ? 1 : isSmallScreen ? 2 : 3,
      step: isTinyScreen ? 1 : isSmallScreen ? 2 : 3,
      start: isTinyScreen
        ? prev.start
        : isSmallScreen
        ? Math.max(1, Math.min(prev.start, total - 1))
        : Math.max(1, Math.min(prev.start, total - 2)),
    }));
  }, [isTinyScreen, isSmallScreen, total]);

  const handleNext = () => {
    setPaginationInfos({
      ...paginatinInfos,
      start: Math.min(
        paginatinInfos.start + paginatinInfos.step,
        paginatinInfos.total - paginatinInfos.step + 1,
      ),
    });
  };

  const handlePrev = () => {
    setPaginationInfos({
      ...paginatinInfos,
      start: Math.max(paginatinInfos.start - paginatinInfos.step, 1),
    });
  };

  const handleClicked = (value: string) => {
    if (props.onChange) {
      props.onChange(parseInt(value));
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <PaginationButton
        onClick={handlePrev}
        content="<"
        active={false}
        disabled={paginatinInfos.start === 1}
        slider={true}
      />
      {Array.from(Array(Math.min(paginatinInfos.size, total)).keys()).map(
        (i) => {
          return (
            <PaginationButton
              key={i}
              onClick={handleClicked}
              content={`${i + paginatinInfos.start}`}
              active={i + paginatinInfos.start === page}
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
        slider={true}
      />
    </div>
  );
};

export default Pagination;
