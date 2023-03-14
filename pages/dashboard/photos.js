import LayoutDashboard from "../../components/dashboard/layouts/LayoutDashboard";
import LayoutPhotos from "../../components/dashboard/layouts/LayoutPhotos";
import PhotoContextProvider from "../../context/photoContext";


export default function Photos() {
  return (
    <PhotoContextProvider>

    <LayoutDashboard>
      <LayoutPhotos />
    </LayoutDashboard>
    </PhotoContextProvider>
  );
}
