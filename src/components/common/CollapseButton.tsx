import React from "react";
import {ChevronDownIcon} from "lucide-react";
import {NewDetailsCard} from "@/components/admin-panel/Categories/NewDetailsCard";
import {IconRenderer} from "@/components/ui/icon-picker";

export function CollapseButton({data, setSelected, selectedParent}) {
    function handleSetSelected(value) {
        if(selectedParent === data?.['id']) {
            setSelected(0);
        }
        else {
        setSelected(value)
        }
    }
    return (
        <div key={data?.['id']} className={`relative cursor-pointer min-h-11`}>
            <div
                    className={`relative justify-start items-start flex flex-col w-full z-0 h-10 overflow-hidden transition transition-all duration-200 
                                ${(selectedParent === data?.['id']) && '!h-50 !z-2 bg-gray-100  shadow shadow-md cursor-pointer'}`} >
                <div className={`relative flex w-full`}  onClick={() => handleSetSelected(data?.['id'])}>
                        <span className={`absolute left-2 top-0 transition z-3 transition-all rotate-0 h-10 flex items-center justify-center w-4 ${selectedParent === data?.['id'] && 'rotate-180'}`}
                              >
                            <ChevronDownIcon />
                        </span>
                        <div className="flex items-center min-h-10 relative right-3 gap-1">
                            {
                                data?.settings &&
                                <span className={`scale-[0.8]`}>
                                    <IconRenderer name={data?.settings[0]?.['icon_name']}  />
                                </span>
                            }
                            <span className={`text-xs`}>{data?.['name_fa']}</span>
                        </div>
                </div>
                <div className={`absolute h-full w-full pt-2 border-t-1 !bg-gray-50   ${selectedParent === data?.['id'] ? 'translate-y-10 opacity-100' : 'translate-y-18  opacity-0'} transition-all duration-200`}>
                <NewDetailsCard data={data} />
                </div>
            </div>
        </div>
    )
}
