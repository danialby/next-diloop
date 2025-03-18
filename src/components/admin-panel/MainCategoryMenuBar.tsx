import useAdminStore from "@/store/adminStore";
type MainCategory = {
    id: number;
    title: string;
}

export function MainCategoryMenuBar() {
    const { selectedMainCategory, setSelectedMainCategory } = useAdminStore()
    const handleSelectMainCategory = (selectedMainCategory: MainCategory) => {
        setSelectedMainCategory(selectedMainCategory)
    }
    return (
        <div className={`relative flex justify-around font-vazir p-0 h-10 gap-0 rounded-full group`}>
            <div className={`absolute bg-red-500 group-hover:bg-red-600 top-0 left-0 w-1/2 rounded-full h-full -z-1 transition-all duration-300 scale-[1.15]  shadow shadow-lg shadow-black/50
                            ${selectedMainCategory?.id === 1 && 'translate-x-full'}`}></div>
            <div
                className={`absolute bg-gray-100 top-0 -z-2 left-0 w-full rounded-full h-full border-gray-200 border-3`}></div>
            <div className={`flex items-center justify-center my-0 w-1/2 rounded-none text-center cursor-pointer`}
                 onClick={() => handleSelectMainCategory({id: 2, title: 'شاغل'})}>
                <span
                    className={`dark:text-black ${selectedMainCategory?.id === 2 && 'transition-color text-xl duration-300 font-black text-white dark:text-white '}`}>شاغل</span>
            </div>
            <div className={`flex items-center justify-center my-0 w-1/2 rounded-none text-center cursor-pointer`}
                 onClick={() => handleSelectMainCategory({id: 1, title: 'بیکار'})}>
                <span
                    className={`dark:text-black ${selectedMainCategory?.id === 1 && 'transition-color text-xl duration-300 font-black text-white dark:text-white '}`}>بیکار</span>
            </div>
        </div>
    )
}
