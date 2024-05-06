import {
  InstanceCard,
  InstanceCardScalingType,
  InstanceCardType,
} from "@spheron/ui-library";

interface IInstance {
  _id?: any;
  state: any;
  deployments: string[];
  name: string;
  latestUrlPreview: string | null;
  retrievableAkt: number;
  withdrawnAkt: number;
  scalableRunningCost: number;
  computeProject: any;
  activeDeployment: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  topupReport: any;
  defaultDailyTopup: number;
  defaultDailyTopUp: number;
  price: number;
  scalableRunningCostUpdatedAt: string;
  version: number;
  computeType: any;
  region: string;
  type: any;
  scalable?: boolean;
  discount: any;
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

const getInstanceState = (state: string): InstanceCardState => {
  switch (state?.toLowerCase()) {
    case "starting":
      return InstanceCardState.PROVISIONING;
    case "active":
    case "provisioned":
    case "deployed":
      return InstanceCardState.PROVISIONED;
    case "failed-start":
    case "failed":
      return InstanceCardState.FAILED;
    case "closed":
    default:
      return InstanceCardState.CLOSED;
    case "deprecated":
      return InstanceCardState.DEPRECATED;
  }
};

export const InstanceCardUiLib: any = (selectedInstance: any) => {
  return (
    <InstanceCard
      detailsPage
      name={selectedInstance?.name || ""}
      updatedAt="15th August 1947"
      domainName=""
      region={selectedInstance?.region || ""}
      instanceCardType={InstanceCardType.SIDEBYSIDE}
      id={selectedInstance?._id || ""}
      scalingType={InstanceCardScalingType.AUTO}
      instanceState={getInstanceState((selectedInstance as IInstance)?.state)}
      instanceType={
        ((
          selectedInstance as unknown as IInstance
        )?.type?.toLocaleLowerCase() as any) || ""
      }
      totalPrice={
        (selectedInstance as IInstance)?.state.toLowerCase() === "failed" ||
        (selectedInstance as any)?.state.toLowerCase() === "failed-start" ||
        (selectedInstance as IInstance)?.state.toLowerCase() === "closed" ||
        (selectedInstance as IInstance)?.state.toLowerCase() === "deprecated" ||
        (selectedInstance as IInstance)?.state.toLowerCase() === "starting"
          ? undefined
          : (selectedInstance as IInstance)?.defaultDailyTopUp * 30
      }
      priceUnit="/mo"
      onClick={() => {
        // console.log("CLICK HANDLER");
      }}
      onCheckboxClick={() => {}}
      isSelected={false}
      discountBadgeText={`${
        selectedInstance?.discount
          ? `${selectedInstance.discount.discountPercent}% OFF`
          : ""
      }`}
    />
  );
};
