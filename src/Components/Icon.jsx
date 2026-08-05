import { PiToolboxFill } from "react-icons/pi";
function Icon() {
  return (
    <span className="flex text-[1.2rem] items-center">
      <span>
        <PiToolboxFill className="text-[#87bba2]"/>
      </span>
      <p className="ml-2 font-semibold">Tool<span className="text-[#55828b]">Box</span></p>  
    </span>
  )
}

export { Icon }