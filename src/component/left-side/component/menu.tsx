import ChatMenuComponent from "./menu item/chatMenu"
import SettingsMenuComponent from "./menu item/SettingsMenu"
import StatusMenuComponent from "./menu item/StatusMenu"

const MenuProfileComponent = () => {

  return(
    <div className='w-2/3 h-full flex flex-row  items-center justify-end gap-4'>
        <ChatMenuComponent />
        <StatusMenuComponent />
        <SettingsMenuComponent />
    </div>
  )
}

export default MenuProfileComponent