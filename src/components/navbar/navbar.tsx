import settingsIcon from '../../assets/icons/settingsIcon.svg'

import notficationIcon from '../../assets/icons/notificationIcon.svg'
import Logo from '../atom/login/logo'
import ProfileButton from './profileButton'

const Navbar = () => {
  return (
    <div className="  px-[24px] py-[12px] h-[80px] bg-white flex">
      <div className="w-[50%] h-full flex  items-center">
        <Logo />
      </div>
      <div className="w-[50%] h-full flex gap-[24px] items-center justify-end">
        <img src={notficationIcon} className='cursor-pointer'/>
        <img src={settingsIcon} className='cursor-pointer'/>
        <ProfileButton/>

      </div>
    </div>
  )
}

export default Navbar
