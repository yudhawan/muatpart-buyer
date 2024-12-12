import SearchNavbarMobile from "./DefaultScreens/SearchNavbarMobile";

export const RegisterDefaultScreen = {
    "navbarMobileDefaultScreen":<SearchNavbarMobile/>
}

function DefaultScreen(type) {
  return RegisterDefaultScreen?.[type]
}

export default DefaultScreen
