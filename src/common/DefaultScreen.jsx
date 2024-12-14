import LocationNavbarMobile from "@/containers/LocationNavbarMobile/LocationNavbarMobile";
import SearchNavbarMobile from "../containers/SearchNavbarMobile/SearchNavbarMobile";
import OtherNavbarMobile from "@/containers/OtherNavbarMobile/OtherNavbarMobile";

export const RegisterDefaultScreen = {
    "default_search_navbar_mobile":<SearchNavbarMobile/>,
    "default_location_navbar_mobile":<LocationNavbarMobile/>,
    "default_other_navbar_mobile":<OtherNavbarMobile/>,
}

function DefaultScreen(type) {
  return RegisterDefaultScreen?.[type]
}

export default DefaultScreen
