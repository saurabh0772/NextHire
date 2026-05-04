import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { MapPin, Briefcase, DollarSign } from 'lucide-react'

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
        <div className='space-y-6 sticky top-24'>
            {filterData.map((filter, index) => (
                <div 
                    key={filter.filterType}
                    className='p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10'
                >
                    <div className='flex items-center gap-2 mb-4 text-white'>
                        {filter.icon}
                        <h3 className='font-medium'>{filter.filterType}</h3>
                    </div>
                    <RadioGroup 
                        onValueChange={changeHandler} 
                        className="space-y-3"
                    >
                        {filter.array.map((item) => (
                            <div 
                                key={item}
                                className='flex items-center space-x-2'
                            >
                                <RadioGroupItem 
                                    value={item} 
                                    id={item}
                                    className="border-white/20 text-blue-400"
                                />
                                <Label 
                                    htmlFor={item}
                                    className="text-slate-400 cursor-pointer hover:text-blue-400 transition-colors"
                                >
                                    {item}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            ))}
        </div>
    )
}

export default FilterCard