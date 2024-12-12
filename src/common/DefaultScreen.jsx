import SearchNavbarMobile from "./DefaultScreens/SearchNavbarMobile";

export const RegisterDefaultScreen = {
    "navbarMobileDefaultScreen":<SearchNavbarMobile/>
}

function DefaultScreen(type) {
  console.log(type)
  return RegisterDefaultScreen?.[type]
}

export default DefaultScreen
