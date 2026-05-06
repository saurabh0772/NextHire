import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterQuery } from '@/redux/jobSlice'
import { MapPin, Briefcase, DollarSign, Filter } from 'lucide-react'
import { Input } from './ui/input'

const filterData = [
    {
        filterType: "Location",
        icon: <MapPin className="h-4 w-4" />,
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Chennai", "Noida", "Gurugram", "Remote"]
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
    const { filterQuery } = useSelector(store => store.job);
    const safeFilterQuery = filterQuery || { location: "", industry: "", salary: "" };
    const dispatch = useDispatch();
    
    const handleRadioChange = (type, value) => {
        const key = type.toLowerCase();
        dispatch(setFilterQuery({ ...safeFilterQuery, [key]: value }));
    }

    const handleInputChange = (type, value) => {
        const key = type.toLowerCase();
        dispatch(setFilterQuery({ ...safeFilterQuery, [key]: value }));
    }

    const clearFilters = () => {
        dispatch(setFilterQuery({ location: "", industry: "", salary: "" }));
    }

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
                            onValueChange={(value) => handleRadioChange(filter.filterType, value)} 
                            value={safeFilterQuery[filter.filterType.toLowerCase()] || ''}
                            className="space-y-3"
                        >
                            {filter.array.map((item) => (
                                <div 
                                    key={item}
                                    className='flex items-center space-x-3'
                                >
                                    <RadioGroupItem 
                                        value={item} 
                                        id={`${filter.filterType}-${item}`}
                                        className="border-slate-300 dark:border-slate-600 text-brand-600 focus:ring-brand-500"
                                    />
                                    <Label 
                                        htmlFor={`${filter.filterType}-${item}`}
                                        className="text-slate-600 dark:text-slate-400 font-medium cursor-pointer hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-sm"
                                    >
                                        {item}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                        
                        <div className="mt-4">
                            <Input
                                type={filter.filterType === 'Salary' ? 'text' : 'text'}
                                placeholder={`Enter manual ${filter.filterType.toLowerCase()}...`}
                                value={
                                    // Only show value if it's not one of the pre-defined options
                                    (!filter.array.includes(safeFilterQuery[filter.filterType.toLowerCase()]) && safeFilterQuery[filter.filterType.toLowerCase()]) || ''
                                }
                                onChange={(e) => handleInputChange(filter.filterType, e.target.value)}
                                className="h-9 text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                            />
                        </div>
                        
                        {index < filterData.length - 1 && (
                            <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mt-6" />
                        )}
                    </div>
                ))}
            </div>
            
            {(safeFilterQuery.location || safeFilterQuery.industry || safeFilterQuery.salary) && (
                <div className='p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900'>
                    <button 
                        onClick={clearFilters}
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