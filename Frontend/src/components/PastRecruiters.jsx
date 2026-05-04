import React, { useEffect, useState } from 'react';
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
    return <div className="text-white text-center py-4">Loading past recruiters...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">Error: {error}</div>;
  }

  if (companies.length === 0) {
    return <div className="text-white text-center py-4">No past recruiters found.</div>;
  }

  return (
    <section className="bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Past Recruiters
            </span>
          </h2>
          <p className="text-slate-400 mt-2">Companies who posted jobs on our portal</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {companies.map(company => (
            <div
              key={company._id}
              className="relative p-6 rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-white/5 hover:border-white/10 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              {company.logo ? (
                <img
                  src={`${company.logo}?t=${new Date().getTime()}`}
                  alt={company.name}
                  className="w-full h-32 object-contain mb-4 rounded-lg"
                />
              ) : (
                <div className="w-full h-32 bg-gray-600 flex items-center justify-center mb-4 rounded-lg">
                  <span className="text-gray-300 text-lg">{company.name.charAt(0)}</span>
                </div>
              )}
              <h3 className="text-lg font-semibold text-white">{company.name}</h3>
              {company.location && <p className="text-sm text-slate-400">{company.location}</p>}
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-sm"
                >
                  Visit Website
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastRecruiters;
