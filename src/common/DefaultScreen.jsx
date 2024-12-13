import LocationNavbarMobile from "@/containers/LocationNavbarMobile/LocationNavbarMobile";
import SearchNavbarMobile from "../containers/SearchNavbarMobile/SearchNavbarMobile";

export const RegisterDefaultScreen = {
    "defaultSearchNavbarMobile":<SearchNavbarMobile/>,
    "defaultLocationNavbarMobile":<LocationNavbarMobile/>,
}

function DefaultScreen(type) {
  return RegisterDefaultScreen?.[type]
}

export default DefaultScreen
