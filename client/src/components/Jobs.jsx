import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery && typeof searchedQuery === 'object') {
            const filteredJobs = allJobs.filter(job => {
                const locationMatch = searchedQuery.Location 
                    ? job.location?.toLowerCase().includes(searchedQuery.Location.toLowerCase()) 
                    : true;
                    console.log("hi ",job.title)
                // Modify to check industry in job title
                const industryMatch = searchedQuery.Industry 
                    ? job.title?.toLowerCase().includes(searchedQuery.Industry.toLowerCase())
                    : true;

                // Salary range mapping
                const salaryRanges = {
                    "0-40k": [0, 40000],
                    "42-1lakh": [42000, 100000],
                    "1lakh to 5lakh": [100000, 500000]
                };

                let salaryMatch = true;
                if (searchedQuery.Salary) {
                    const [minSalary, maxSalary] = salaryRanges[searchedQuery.Salary] || [0, Infinity];
                    salaryMatch = job.salary >= minSalary && job.salary <= maxSalary;
                }

                return locationMatch && industryMatch && salaryMatch;
            });
            setFilterJobs(filteredJobs);
        } else if (searchedQuery && typeof searchedQuery === 'string') {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase());
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {filterJobs.length <= 0 ? (
                        <span>Job not found</span>
                    ) : (
                        <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                            <div className='grid grid-cols-3 gap-4'>
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
