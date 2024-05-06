import React, { useEffect, useState } from "react";

enum InstanceCardScalingType {
  SPOT = "Spot",
  ONDEMAND = "On-Demand",
  AUTO = "Auto",
}

enum InstanceCardState {
  PROVISIONED = "Provisioned",
  PROVISIONING = "Provisioning",
  FAILED = "Failed",
  CLOSED = "Closed",
  DEPRECATED = "Deprecated",
  ACTIVE = "Active",
  STARTING = "Starting",
}

enum InstanceDeploymentType {
  COMPUTE = "compute",
  ACCELERATE = "accelerate",
  MULTISERVICE = "multiservice",
}

enum InstanceCardType {
  DEFAULT = "default",
  SIDEBYSIDE = "side-by-side",
}

interface InstanceCardProps extends React.DOMAttributes<HTMLDivElement> {
  name: string;
  updatedAt: string;
  domainName: string;
  region: string;
  instanceCardType: InstanceCardType;
  id: string;
  scalingType: InstanceCardScalingType;
  instanceState: InstanceCardState;
  instanceType: InstanceDeploymentType;
  totalPrice?: number;
  priceUnit?: string;
  isSelected: boolean;
  onClick: () => void;
  onCheckboxClick: (isSeleted: boolean) => void;
  detailsPage: boolean;
  discountBadgeText?: string;
}

export const InstanceCard: React.FC<InstanceCardProps> = ({
  name,
  updatedAt,
  domainName,
  region,
  instanceCardType,
  id,
  scalingType,
  instanceState,
  instanceType,
  isSelected = false,
  totalPrice,
  priceUnit = "",
  onClick,
  onCheckboxClick,
  detailsPage,
  discountBadgeText,
  ...props
}) => {
  const [copyInstanceIdTooltip, setCopyInstanceIdTooltip] =
    useState<string>("Copy Instance ID");

  useEffect(() => {
    setTimeout(() => {
      setCopyInstanceIdTooltip("Copy Instance ID");
    }, 1000);
  }, [copyInstanceIdTooltip]);

  const instanceSpecifications = [
    {
      id: 1,
      value: region,
    },
    {
      id: 2,
      value: scalingType,
    },
  ];

  const instanceIdSpecification = {
    id: 3,
    value: id,
  };

  const getSelectedStyles = (isSelected: boolean) =>
    isSelected
      ? "!border-cards-link dark:border-dark-cards-link hover:cursor-pointer bg-cards-hover dark:bg-dark-cards-hover"
      : "";

  return (
    <div
      role="presentation"
      onClick={onClick}
      className={`rounded-lg bg-cards-bg dark:bg-dark-cards-bg border border-base-border dark:border-dark-base-border relative
      w-full group ${getSelectedStyles(isSelected)} ${
        !detailsPage
          ? "hover:cursor-pointer hover:border-cards-border dark:hover:border-dark-cards-border"
          : "!border-cards-border dark:!border-dark-cards-border cursor-default"
      }`}
      {...props}
    >
      {instanceCardType !== "side-by-side" && (
        <div
          role="presentation"
          className={`absolute top-1 left-1 z-50 ${
            isSelected ? "" : "group-hover:block hidden"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onCheckboxClick(isSelected);
          }}
        >
          <div className="w-4 h-4 border border-cards-border dark:border-dark-cards-border rounded" />
        </div>
      )}
      <div className="py-5 pl-3 pr-20">
        <div className="flex items-center justify-between">
          <div className="flex items-start justify-start gap-x-3">
            <div className="flex flex-col gap-y-1">
              <div className="flex items-center justify-start gap-x-2">
                <h5 className="text-base font-semibold leading-5 text-base-heading-text-color dark:text-dark-base-heading-text-color">
                  {name}
                </h5>
              </div>
              <div className="flex flex-col gap-y-1 text-sm font-normal text-base-para-text-color dark:text-dark-base-para-text-color">
                <p>Last updated on {updatedAt}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-y-4 w-[55%]">
            <div className="flex items-center justify-start space-x-8">
              {instanceSpecifications.map((specification) => (
                <div
                  key={specification.id}
                  className="flex items-center justify-start gap-x-1"
                >
                  <span className="!text-sm font-normal text-base-heading-text-color dark:text-dark-base-heading-text-color whitespace-nowrap w-16">
                    {specification.value}
                  </span>
                </div>
              ))}
              <div
                key={instanceIdSpecification.id}
                className="flex items-center justify-start gap-x-1"
              >
                <div
                  className="h-7 w-7 rounded-full items-center justify-center p-1
                  bg-base-border dark:bg-dark-base-border flex"
                ></div>
                <span className="!text-sm flex flex-row items-center gap-x-2 font-normal text-base-heading-text-color dark:text-dark-base-heading-text-color whitespace-nowrap min-w-16">
                  <span>{instanceIdSpecification.value}</span>
                </span>
              </div>
            </div>
            {totalPrice && (
              <div className="flex flex-col gap-y-0.5 text-base-heading-text-color dark:text-dark-base-heading-text-color">
                <div className="flex items-center justify-start gap-x-3">
                  <h5 className="text-base font-semibold">
                    ${totalPrice?.toFixed(2)}
                    <span className="text-sm text-base-sub-text-color dark:text-dark-base-sub-text-color">
                      {priceUnit}
                    </span>
                  </h5>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
