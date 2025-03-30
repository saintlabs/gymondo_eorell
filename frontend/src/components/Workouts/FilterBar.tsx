import React, { useState, useMemo, CSSProperties, useRef, useEffect } from 'react';
import { allowedCategories, Category } from '../../types';

interface FilterBarProps {
  onFiltersChange: (filters: { startDateMonthYear: string | null; categories: Category[] }) => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  initialMonth?: string;
  initialCategories?: Category[];
}

const getCategoryColorClass = (category: string): string => {
  const cat = category.toLowerCase();
  
  switch (cat) {
    case 'c1': return 'bg-red-500 text-white';
    case 'c2': return 'bg-orange-500 text-white';
    case 'c3': return 'bg-yellow-500 text-white';
    case 'c4': return 'bg-emerald-500 text-white';
    case 'c5': return 'bg-cyan-500 text-white';
    case 'c6': return 'bg-blue-500 text-white';
    case 'c7': return 'bg-violet-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

const generateMonthOptions = (): { value: string; label: string }[] => {
  const options: { value: string; label: string }[] = [{ value: '', label: 'Start date' }];
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });

  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    options.push({
      value: `${year}-${month}`,
      label: formatter.format(date),
    });
  }
  return options;
};

const FilterBar: React.FC<FilterBarProps> = ({
  onFiltersChange,
  viewMode,
  onViewModeChange,
  initialMonth = '',
  initialCategories = []
}) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(initialMonth);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(initialCategories);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const monthOptions = useMemo(() => generateMonthOptions(), []);
  
  const hasActiveFilters = selectedMonth !== '' || selectedCategories.length > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedMonth(value);
    onFiltersChange({ startDateMonthYear: value || null, categories: selectedCategories });
  };

  const handleCategoryToggle = (category: Category) => {
    let newCategories: Category[];
    if (selectedCategories.includes(category)) {
      newCategories = selectedCategories.filter(c => c !== category);
    } else {
      newCategories = [...selectedCategories, category];
    }
    setSelectedCategories(newCategories);
    onFiltersChange({ startDateMonthYear: selectedMonth || null, categories: newCategories });
  };
  
  const handleClearFilters = () => {
    setSelectedMonth('');
    setSelectedCategories([]);
    onFiltersChange({ startDateMonthYear: null, categories: [] });
  };

  const handleClearCategories = () => {
    setSelectedCategories([]);
    onFiltersChange({ startDateMonthYear: selectedMonth || null, categories: [] });
  };

  const handleRemoveCategory = (category: Category) => {
    const newCategories = selectedCategories.filter(c => c !== category);
    setSelectedCategories(newCategories);
    onFiltersChange({ startDateMonthYear: selectedMonth || null, categories: newCategories });
  };

  const handleRemoveMonth = () => {
    setSelectedMonth('');
    onFiltersChange({ startDateMonthYear: null, categories: selectedCategories });
  };

  return (
    <div className="bg-white p-5 rounded-xl mb-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Workouts</h1>
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-4">
        <div className="flex flex-col gap-4 flex-grow">
          <div className="flex flex-wrap items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <select
                  id="startDateFilter"
                  name="startDateFilter"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  className="appearance-none block w-full min-w-max bg-white border border-gray-200 text-gray-800 py-2 pl-3 pr-10 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236B7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                >
                  {monthOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative flex-shrink-0" ref={dropdownRef}>
                <button
                  className="flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-200 py-2 px-3 rounded-md text-sm cursor-pointer min-w-max hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                >
                  <span>Categories</span>
                  {selectedCategories.length > 0 && (
                    <span className="flex items-center justify-center bg-blue-500 text-white rounded-full text-xs px-1.5 py-0.5 ml-1 font-medium">
                      {selectedCategories.length}
                    </span>
                  )}
                </button>
                
                {isCategoryDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-50 p-3 w-fit">
                    <div className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
                      Filter by Category
                    </div>
                    <div className="flex flex-col gap-1.5 whitespace-nowrap">
                      {allowedCategories.map(category => {
                        const isChecked = selectedCategories.includes(category);
                        const colorClass = getCategoryColorClass(category);
                        
                        return (
                          <div
                            key={category}
                            className="flex items-center gap-2 cursor-pointer py-1 group"
                            onClick={() => handleCategoryToggle(category)}
                          >
                            <div
                              className={`w-4 h-4 rounded border border-gray-300 flex items-center justify-center cursor-pointer ${isChecked ? 'bg-blue-500 border-blue-500' : 'bg-white'}`}
                            >
                              {isChecked && <span className="text-white text-xs font-bold">✓</span>}
                            </div>
                            <div className="text-sm flex items-center gap-2 text-gray-600 cursor-pointer group-hover:text-gray-800">
                              <div className={`w-2 h-2 rounded-full ${colorClass.split(' ')[0]}`} />
                              {category.toUpperCase()}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {selectedCategories.length > 0 && (
                      <button
                        onClick={handleClearCategories}
                        className="bg-transparent border-none text-blue-500 text-xs p-0 cursor-pointer font-medium w-full text-center mt-2 border-t border-gray-200 pt-2 hover:text-blue-600"
                      >
                        Clear Categories
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                title="Grid View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => onViewModeChange('table')}
                className={`p-2 rounded-md ${viewMode === 'table' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                title="Table View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            {selectedMonth && (
              <div className="group flex items-center bg-indigo-100 border border-indigo-200 rounded-full pl-3 pr-1.5 py-0.5 text-xs text-indigo-700 gap-2 hover:bg-indigo-200 transition-colors">
                {monthOptions.find(opt => opt.value === selectedMonth)?.label}
                <button
                  onClick={handleRemoveMonth}
                  className="flex items-center justify-center w-5 h-5 rounded-full hover:bg-indigo-200/50 transition-colors"
                >
                  <svg className="w-3 h-3 text-gray-500" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
            {selectedCategories.map(category => {
              const colorClass = getCategoryColorClass(category);
              return (
                <div
                  key={category}
                  className={`group flex items-center shadow-sm rounded-full pl-3 pr-1.5 py-0.5 text-xs gap-2 transition-colors ${colorClass} hover:opacity-90`}
                >
                  {category.toUpperCase()}
                  <button
                    onClick={() => handleRemoveCategory(category)}
                    className="flex items-center justify-center w-5 h-5 rounded-full hover:bg-white/20 transition-colors ml-auto"
                  >
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              );
            })}
            {hasActiveFilters && (
              <div
                onClick={handleClearFilters}
                className="group flex items-center bg-indigo-100 border border-indigo-200 rounded-full pl-3 pr-1.5 py-0.5 text-xs text-indigo-700 gap-2 hover:bg-indigo-200 transition-colors cursor-pointer"
              >
                Clear all
                <div className="flex items-center justify-center w-5 h-5 rounded-full">
                  <svg className="w-3 h-3 text-gray-500" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;