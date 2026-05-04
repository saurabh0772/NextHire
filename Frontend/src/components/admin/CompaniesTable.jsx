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
        <Table>
            <TableHeader>
                <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-slate-400">Logo</TableHead>
                    <TableHead className="text-slate-400">Name</TableHead>
                    <TableHead className="text-slate-400">Date</TableHead>
                    <TableHead className="text-right text-slate-400">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filterCompany?.length === 0 ? (
                    <TableRow className="border-white/10">
                        <TableCell colSpan={4} className="text-center text-slate-400 py-10">
                            <div className="flex flex-col items-center gap-2">
                                <Building2 className="h-8 w-8 text-slate-500" />
                                <p>No companies found</p>
                                <Button 
                                    onClick={() => navigate("/recruiter/companies/create")}
                                    variant="link" 
                                    className="text-blue-400 hover:text-blue-300"
                                >
                                    Add your first company
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ) : (
                    filterCompany?.map((company) => (
                        <TableRow key={company._id} className="border-white/10 hover:bg-white/5">
                            <TableCell className="text-white">
                                <Avatar className="ring-2 ring-white/10">
                                    <AvatarImage src={`${company.logo}?t=${new Date().getTime()}`} alt={company.name} />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
                                        {getInitials(company.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell className="text-white font-medium">{company.name}</TableCell>
                            <TableCell className="text-slate-400">{new Date(company.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40 bg-slate-900 border-white/10">
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-slate-400 hover:text-white hover:bg-white/5"
                                            onClick={() => navigate(`/recruiter/companies/${company._id}`)}
                                        >
                                            <Edit2 className="mr-2 h-4 w-4" />
                                            Edit Company
                                        </Button>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
            {filterCompany?.length > 0 && (
                <TableCaption className="text-slate-400 mt-4">
                    Showing {filterCompany.length} {filterCompany.length === 1 ? 'company' : 'companies'}
                </TableCaption>
            )}
        </Table>
    )
}

export default CompaniesTable