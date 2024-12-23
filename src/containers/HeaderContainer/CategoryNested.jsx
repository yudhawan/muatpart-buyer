import { categoriesZustand } from '@/store/products/categoriesZustand';
import React, { useEffect, useRef, useState } from 'react';
import { headerProps } from './headerProps';
import IconComponent from '@/components/IconComponent/IconComponent';
import Input from '@/components/Input/Input';

function CategoryNested({ isOpen, setClose }) {
    const { categories } = categoriesZustand();
    const { headerHeight } = headerProps();
    const parentRef = useRef(null);
    const [activeCategories, setActiveCategories] = useState([]); // To store nested categories
    const [search, setSearch] = useState('');
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (parentRef.current && !parentRef.current.contains(event.target)) {
                setClose?.();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setClose]);
    useEffect(() => {
        if (isOpen) {
            setActiveCategories([[categories]]);
        } else {
            setActiveCategories([]);
        }
    }, [isOpen, categories]);
    const handleMouseEnter = (level, children) => {
        if(level==2) return
        if (children && children.length > 0) {
            const newActiveCategories = activeCategories.slice(0, level + 1);
            newActiveCategories.push([children]);
            setActiveCategories(newActiveCategories);
        } else {
            setActiveCategories(activeCategories.slice(0, level + 1));
        }
    };
    const filterCategories = (categoriesList,level) => {
        if(level==2&&search) return categoriesList.filter((cat) => cat.value.toLowerCase().includes(search.toLowerCase()));
        return categoriesList;
    };

    return isOpen ? (
        <div
            ref={parentRef}
            className="w-full h-full z-[92] flex justify-center items-start fixed left-0 top-0"
            onClick={() => setClose?.()}
        >
            <div
                className="z-50 relative max-w-[940px] w-full mx-auto"
                onClick={(e) => e.stopPropagation()} // Prevent click propagation to parent
            >
                <div className="bg-neutral-50 rounded-[10px] p-4 min-w-[262px] absolute top-[95px] flex gap-3">
                    {activeCategories.map((levelCategories, level) => (
                        <div
                            key={level}
                            className="flex flex-col pr-3 border-r border-neutral-400 gap-1 last:border-none"
                        >
                            {level === 2 && (
                                <Input
                                    icon={{ left: '/icons/search.svg' }}
                                    placeholder="Search categories"
                                    value={search}
                                    changeEvent={(e) => setSearch(e.target.value)}
                                />
                            )}
                            {filterCategories(levelCategories?.[0],level).map((category) => (
                                <div
                                    key={category.id}
                                    className="h-8 rounded-md px-[10px] hover:bg-neutral-200 flex justify-between w-[204px] items-center cursor-pointer"
                                    onMouseEnter={() => handleMouseEnter(level, category.children)}
                                >
                                    <span className="medium-xs text-neutral-900">{category.value}</span>
                                    {
                                        (category.children?.length > 0)&(level<=1) ?<IconComponent src={'/icons/chevron-right.svg'} />:''
                                        
                                    }
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div
                style={{
                    top: `${headerHeight}px`,
                    height: `calc(100% - ${headerHeight}px)`,
                }}
                className="bg-neutral-900 opacity-[0.4] w-full h-full fixed"
            />
        </div>
    ) : null;
}

export default CategoryNested;
