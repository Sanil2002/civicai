import NCSlogo from '../../../assets/images/ncs.png'

interface LogoProps {
  cl?: string,
}
const Logo: React.FC<LogoProps> = ({ cl }) => {  return (
    <div className={`flex gap-[6px] ${cl}`}>
        <img src={NCSlogo} className='size-6'/>
      <span className="font-mono font-semibold text-lg text-orange-700">Civic.ai</span>
    </div>
  )
}

export default Logo
