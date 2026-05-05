import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { MapPin, Briefcase, DollarSign, Filter } from 'lucide-react'

const filterData = [
    {
        filterType: "Location",
        icon: <MapPin className="h-4 w-4" />,
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        icon: <Briefcase className="h-4 w-4" />,
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "UI/UX Designer", "Data Scientist"]
    },
    {
        filterType: "Salary",
        icon: <DollarSign className="h-4 w-4" />,
        array: ["3-5 LPA", "5-10 LPA", "10-15 LPA", "15-20 LPA", "20+ LPA"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className='bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24 overflow-hidden'>
            <div className='p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-2'>
                <Filter className="h-5 w-5 text-brand-500" />
                <h2 className='font-bold text-slate-900 dark:text-white text-lg'>Filters</h2>
            </div>
            
            <div className='p-5 space-y-8'>
                {filterData.map((filter, index) => (
                    <div key={filter.filterType}>
                        <div className='flex items-center gap-2 mb-4 text-slate-900 dark:text-white'>
                            <div className="text-brand-500">{filter.icon}</div>
                            <h3 className='font-bold text-sm'>{filter.filterType}</h3>
                        </div>
                        <RadioGroup 
                            onValueChange={changeHandler} 
                            value={selectedValue}
                            className="space-y-3"
                        >
                            {filter.array.map((item) => (
                                <div 
                                    key={item}
                                    className='flex items-center space-x-3'
                                >
                                    <RadioGroupItem 
                                        value={item} 
                                        id={item}
                                        className="border-slate-300 dark:border-slate-600 text-brand-600 focus:ring-brand-500"
                                    />
                                    <Label 
                                        htmlFor={item}
                                        className="text-slate-600 dark:text-slate-400 font-medium cursor-pointer hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-sm"
                                    >
                                        {item}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                        
                        {index < filterData.length - 1 && (
                            <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mt-6" />
                        )}
                    </div>
                ))}
            </div>
            
            {selectedValue && (
                <div className='p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900'>
                    <button 
                        onClick={() => setSelectedValue('')}
                        className="w-full py-2 text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    )
}

export default FilterCard