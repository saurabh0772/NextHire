import React, { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';
const BASE_URL = import.meta.env.VITE_API_URL;

const PastRecruiters = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/company/past-recruiters`, {
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error('Failed to fetch companies');
        }
        const data = await response.json();
        setCompanies(data.companies || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
        <div className="bg-slate-50 dark:bg-slate-950 py-16 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
            <p className="mt-4 text-slate-500 font-medium">Loading past recruiters...</p>
        </div>
    );
  }

  if (error) {
    return <div className="bg-slate-50 dark:bg-slate-950 py-16 text-red-500 text-center font-medium">Error: {error}</div>;
  }

  if (companies.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Top <span className="text-brand-600 dark:text-brand-400">Recruiters</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 font-medium">Discover companies actively hiring on our platform</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {companies.map(company => (
            <div
              key={company._id}
              className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-brand-300 dark:hover:border-brand-700 transition-all cursor-pointer hover:-translate-y-1"
            >
              <div className="w-20 h-20 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center p-3 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                {company.logo ? (
                  <img
                    src={`${company.logo}?t=${new Date().getTime()}`}
                    alt={company.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-brand-500" />
                )}
              </div>
              <h3 className="text-center text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{company.name}</h3>
              {company.location && (
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1 text-center">{company.location}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastRecruiters;
