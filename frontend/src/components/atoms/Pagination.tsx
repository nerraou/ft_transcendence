"use client";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@hooks/useMediaQuery";
import clsx from "clsx";
import ChevronLeft from "./icons/outline/ChevronLeft";
import ChevronRight from "./icons/outline/ChevronRight";

type PaginationButtonProps = {
  onClick: (value: string) => void;
  content?: string;
  active: boolean;
  disabled?: boolean;
  slider?: boolean;
  icon?: React.ReactNode;
};

const getStyle = (active: boolean, slider?: boolean) => {
  if (slider) {
    return `bg-light-bg-tertiary text-light-fg-primary dark:text-dark-fg-primary`;
  } else if (active) {
    return `bg-light-bg-primary text-light-fg-tertiary dark:bg-dark-fg-link`;
  } else {
    return `bg-light-bg-tertiary text-light-fg-link`;
  }
};

const PaginationButton = (props: PaginationButtonProps) => {
  const { onClick, content, active, disabled, slider, icon } = props;

  return (
    <button
      onClick={() => onClick(content || "")}
      className={clsx(
        "drop-shadow-light-fg-primary dark:drop-shadow-dark-fg-primary",
        "w-[50px] h-[50px] flex items-center justify-center",
        content && content.length > 4 ? "text-sm" : "text-md",
        getStyle(active, slider),
        "rounded-full",
      )}
      disabled={disabled}
    >
      {icon || content}
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
  page: number;
  total: number;
  onChange: (value: number) => void;
};

const Pagination = (props: PaginationProps) => {
  const { page, total } = props;
  const isSmallScreen = useMediaQuery("(max-width: 480px)");
  const isTinyScreen = useMediaQuery("(max-width: 380px)");
  const [paginatinInfos, setPaginationInfos] = useState<PaginationInfos>({
    size: 3,
    total: total,
    step: 1,
    start: 1,
  });

  const getPaginationInfos = (preg: PaginationInfos) => {
    if (isTinyScreen) {
      return {
        ...preg,
        size: 1,
        step: 1,
        start: preg.start,
      };
    } else if (isSmallScreen) {
      return {
        ...preg,
        size: 2,
        step: 2,
        start: Math.max(1, Math.min(preg.start, total - 1)),
      };
    } else {
      return {
        ...preg,
        size: 3,
        step: 3,
        start: Math.max(1, Math.min(preg.start, total - 2)),
      };
    }
  };

  useEffect(() => {
    setPaginationInfos((prev) => getPaginationInfos(prev));
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
    props.onChange(parseInt(value));
  };

  return (
    <div className="flex items-center justify-center space-x-5">
      <PaginationButton
        onClick={handlePrev}
        icon={<ChevronLeft className="w-5 h-5" />}
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
        icon={<ChevronRight className="w-5 h-5" />}
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
