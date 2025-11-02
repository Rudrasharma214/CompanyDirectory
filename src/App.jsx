import { useState, useMemo } from 'react';
import companiesData from './data/companies.json';

function App() {
  const [selectedLetter, setSelectedLetter] = useState(null);

  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  const sortedCompanies = useMemo(() => {
    return [...companiesData].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filteredCompanies = useMemo(() => {
    if (!selectedLetter) return sortedCompanies;
    return sortedCompanies.filter(company =>
      company.name.toUpperCase().startsWith(selectedLetter)
    );
  }, [selectedLetter, sortedCompanies]);

  const handleLetterClick = (letter) => {
    setSelectedLetter(prev => (prev === letter ? null : letter));
  };

  const handleLinkClick = (e, url) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-blue-500 to-purple-500 drop-shadow-md">
            Company Directory
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Explore top companies and visit their LinkedIn or Career pages
          </p>
        </header>

        {/* Alphabet Filter */}
        <div className=" top-2 bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg px-4 py-3 flex flex-wrap justify-center gap-2">
          {alphabet.map(letter => (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg font-semibold transition-all duration-200 border 
                ${selectedLetter === letter
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/40 scale-110'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-indigo-500 hover:text-white'
                }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Company Cards */}
        {filteredCompanies.length > 0 ? (
          <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredCompanies.map((company, index) => (
              <div
                key={company.id}
                className="group relative bg-gray-800 border border-gray-700 rounded-2xl p-5 flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-600/20 hover:border-indigo-500/50 transition-all duration-300"
              >
                <div>
                  <span className="absolute top-3 right-4 text-xs text-gray-500">
                    #{index + 1}
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-indigo-400 transition-colors duration-200">
                    {company.name}
                  </h3>
                </div>
                <div className="flex items-center justify-between gap-3 mt-auto">
                  <button
                    onClick={(e) => handleLinkClick(e, company.linkedIn)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    LinkedIn
                  </button>
                  <button
                    onClick={(e) => handleLinkClick(e, company.careerPage)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Careers
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-900 border border-gray-700 rounded-2xl">
            <p className="text-gray-400 text-lg">
              No companies found starting with{" "}
              <span className="text-indigo-400 font-semibold">{selectedLetter}</span>
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm pt-8 border-t border-gray-800">
          <p>
            Showing{" "}
            <span className="text-indigo-400 font-semibold">{filteredCompanies.length}</span>{" "}
            {selectedLetter ? "filtered" : "total"} companies
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
