import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Colombo", "Gampaha", "Kaluthara", "Galle", "Matara", "Hambantota", "Kandy", "Matale", "Nuwara Eliya", "Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya", "Badulla", "Monaragala", "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Kegalle", "Rathnapura", "Ampara", "Batticaloa", "Trincomalee"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Multi Media Designer", "QA Engineer", "Network Engineer", "DevOps Engineer", "Project Manager"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        Location: '',
        Industry: '',
        Salary: ''
    });

    const dispatch = useDispatch();

    const changeHandler = (filterType, value) => {
        setSelectedFilters(prevState => ({
            ...prevState,
            [filterType]: value
        }));
    };

    useEffect(() => {
        // Dispatch the combined filter query
        dispatch(setSearchedQuery(selectedFilters));
    }, [selectedFilters]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            {filterData.map((data, index) => (
                <div key={index}>
                    <h1 className='font-bold text-lg'>{data.filterType}</h1>
                    <RadioGroup value={selectedFilters[data.filterType]} onValueChange={(value) => changeHandler(data.filterType, value)}>
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <div key={itemId} className='flex items-center space-x-2 my-2'>
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </div>
                            );
                        })}
                    </RadioGroup>
                </div>
            ))}
        </div>
    );
};

export default FilterCard;
