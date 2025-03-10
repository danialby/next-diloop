import React, { useState } from 'react';
import SearchBar from "@/components/skills/SearchBar";
import NewCategoryDialog from "@/components/admin-panel/NewCategoryDialog";


const CategoryTabs = ({ children, tabs }) => {
    const [activeTab, setActiveTab] = useState(0);
    const parents = [
        { value: "1", text: "همه" },
        { value: "2", text: "کسب و کار بزرگ" },
        { value: "3", text: "متوسط" },
        { value: "4", text: "کوچک" },
        { value: "5", text: "خانگی" },
    ];

    return (
        <div className="mx-auto px-4 md:px-12 py-6 h-full sticky-top">
            {/* Tabs Navigation */}
            <div className="relative">
                <div className="flex flex-row-reverse space-x-4 border-b border-gray-200">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`flex-1 px-4 py-2 text-sm font-medium focus:outline-none ${
                                activeTab === index
                                    ? 'text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                {/* Sliding Underline */}
                <div
                    className="absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 "
                    style={{
                        width: `${100 / tabs.length}%`,
                        transform: `translateX(${activeTab * 100}%)`,
                    }}
                />
            </div>
            <div
                className={`w-full mt-6 flex flex-col gap-4 md:gap-0 md:flex-row md:justify-around items-center justify-center`}>
                <SearchBar placeholder="جستجو در دسته بندی ها"
                           inputClasses={`!rounded-full w-[250px] md:w-[300px]`}/>
                <NewCategoryDialog _parents={parents} />
            </div>
            {/* Tab Content */}
            <div className="mt-4 overflow-x-hidden relative min-h-[calc(100vh_-_320px)] no-scrollbar  shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] rounded-xl">
                {React.Children.map(children, (child, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full transition-transform duration-300 ${
                            activeTab === index ? 'translate-x-0' : index < activeTab ? '-translate-x-full' : 'translate-x-full'
                        }`}
                    >
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryTabs;
