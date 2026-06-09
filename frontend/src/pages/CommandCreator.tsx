import CommandControls from "../components/controls/CommandControls";
import IntersectionCanvas from "../canvas/IntersectionCanvas";
import CreatorLayout from "../components/CreatorLayout";
import { useSimulationStore } from "../store/useSimulationStore";

export default function Screen3CommandCreator() {
  const { intersectionDescription, controllerType, commands } =
    useSimulationStore();

  const handleCopyPayload = () => {
    const payload = { intersectionDescription, controllerType, commands };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
  };

  return (
    <CreatorLayout
      sidebarContent={<CommandControls />}
      mainContent={<IntersectionCanvas mode="command" />}
      currentStep={3}
      onDownloadJson={handleCopyPayload}
      sidebarSizes={{ xs: 12, md: 5, lg: 4 }}
      mainSizes={{ xs: 12, md: 7, lg: 8 }}
    />
  );
}
