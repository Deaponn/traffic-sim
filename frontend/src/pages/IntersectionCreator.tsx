import IntersectionControls from "../components/controls/IntersectionControls";
import IntersectionCanvas from "../canvas/IntersectionCanvas";
import CreatorLayout from "../components/CreatorLayout";
import { useSimulationStore } from "../store/useSimulationStore";

export default function IntersectionCreator() {
  const { intersectionDescription } = useSimulationStore();

  const handleCopyJson = () => {
    navigator.clipboard.writeText(
      JSON.stringify(intersectionDescription, null, 2),
    );
  };

  return (
    <CreatorLayout
      sidebarContent={<IntersectionControls />}
      mainContent={<IntersectionCanvas mode="edit" />}
      currentStep={2}
      onDownloadJson={handleCopyJson}
      sidebarSizes={{ xs: 12, md: 4 }}
      mainSizes={{ xs: 12, md: 8 }}
    />
  );
}
