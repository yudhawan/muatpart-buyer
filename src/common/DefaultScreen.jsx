import SearchNavbarMobile from "../containers/SearchNavbarMobile/SearchNavbarMobile";

export const RegisterDefaultScreen = {
    "defaultSearchNavbarMobile":<SearchNavbarMobile/>,
    "defaultLocationNavbarMobile":<SearchNavbarMobile/>,
}

function DefaultScreen(type) {
  return RegisterDefaultScreen?.[type]
}

export default DefaultScreen
