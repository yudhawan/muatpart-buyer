import SearchNavbarMobile from "./DefaultScreens/SearchNavbarMobile";

export const RegisterDefaultScreen = {
    "defaultTitleMain":<SearchNavbarMobile/>
}

function DefaultScreen(type) {
  return RegisterDefaultScreen?.[type]
}

export default DefaultScreen
