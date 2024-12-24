
import ChatMenuComponent from "../menuitem/ChatMenu"
import SettingsMenuComponent from "../menuitem/SettingsMenu"
import StatusMenuComponent from "../menuitem/StatusMenu"

const MenuProfileComponent = () => {

  return (
    <div className='w-2/3 h-full flex flex-row  items-center justify-end gap-4'>
      <ChatMenuComponent />
      <StatusMenuComponent />
      <SettingsMenuComponent />
    </div>
  )
}

export default MenuProfileComponent