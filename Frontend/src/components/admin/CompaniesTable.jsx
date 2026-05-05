import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Building2, Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    // Get company initials for avatar fallback
    const getInitials = (name) => {
        if (!name) return "C";
        return name.split(" ").map(n => n[0]).join("").toUpperCase();
    };

    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                    <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                        <TableHead className="text-slate-600 dark:text-slate-400 font-bold w-20">Logo</TableHead>
                        <TableHead className="text-slate-600 dark:text-slate-400 font-bold">Name</TableHead>
                        <TableHead className="text-slate-600 dark:text-slate-400 font-bold">Registered Date</TableHead>
                        <TableHead className="text-right text-slate-600 dark:text-slate-400 font-bold">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany?.length === 0 ? (
                        <TableRow className="border-slate-200 dark:border-slate-800">
                            <TableCell colSpan={4} className="text-center py-16">
                                <div className="flex flex-col items-center justify-center space-y-3">
                                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-2">
                                        <Building2 className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                                    </div>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">No companies found</p>
                                    <p className="text-slate-500 font-medium max-w-sm">You haven't registered any companies yet or none match your search.</p>
                                    <Button 
                                        onClick={() => navigate("/recruiter/companies/create")}
                                        className="mt-4 bg-brand-50 text-brand-600 hover:bg-brand-100 dark:bg-brand-900/30 dark:text-brand-400 dark:hover:bg-brand-900/50 font-bold rounded-xl"
                                    >
                                        Add your first company
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterCompany?.map((company) => (
                            <TableRow key={company._id} className="border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                <TableCell>
                                    <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700 shadow-sm">
                                        <AvatarImage src={`${company.logo}?t=${new Date().getTime()}`} alt={company.name} className="object-contain p-1" />
                                        <AvatarFallback className="bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 font-bold">
                                            {getInitials(company.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="font-bold text-slate-900 dark:text-white text-base">
                                    {company.name}
                                </TableCell>
                                <TableCell className="text-slate-500 font-medium text-sm">
                                    {new Date(company.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" className="h-9 w-9 p-0 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-1 mr-4">
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start text-slate-600 dark:text-slate-300 hover:text-brand-600 hover:bg-brand-50 dark:hover:text-brand-400 dark:hover:bg-brand-900/20 font-medium rounded-lg"
                                                onClick={() => navigate(`/recruiter/companies/${company._id}`)}
                                            >
                                                <Edit2 className="mr-2 h-4 w-4" />
                                                Edit Profile
                                            </Button>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
                {filterCompany?.length > 0 && (
                    <TableCaption className="text-slate-500 font-medium my-4">
                        Showing {filterCompany.length} {filterCompany.length === 1 ? 'company' : 'companies'}
                    </TableCaption>
                )}
            </Table>
        </div>
    )
}

export default CompaniesTable