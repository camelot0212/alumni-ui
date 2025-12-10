
import React, { useState, useRef } from 'react';
import { Beaker, Calculator, Atom, Languages, Users, Trophy, ScrollText, Share2, MessageCircle, Heart, ArrowLeft, Image as ImageIcon, MapPin } from 'lucide-react';
import { MOCK_COHORTS } from '../constants';
import { Cohort, ClassGroup, PressArticle } from '../types';

const HistoryPage = () => {
  // Department State
  const [selectedMajor, setSelectedMajor] = useState('CHEM');
  
  // Default to user's cohort (K15) or first one
  const defaultCohort = MOCK_COHORTS.find(c => c.id === 'K15') || MOCK_COHORTS[0];
  const [selectedCohort, setSelectedCohort] = useState<Cohort>(defaultCohort);
  const [selectedClass, setSelectedClass] = useState<ClassGroup | null>(null);
  
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const MAJORS = [
    { id: 'CHEM', label: 'Chemistry', icon: Beaker },
    { id: 'MATH', label: 'Mathematics', icon: Calculator },
    { id: 'PHYS', label: 'Physics', icon: Atom },
    { id: 'ENG', label: 'English', icon: Languages },
  ];

  const handleCohortChange = (cohort: Cohort) => {
    if (cohort.id === selectedCohort.id) return;
    setIsAnimating(true);
    setSelectedClass(null); // Reset class selection when changing years
    setTimeout(() => {
      setSelectedCohort(cohort);
      setIsAnimating(false);
    }, 300);
  };

  const handleClassClick = (cls: ClassGroup) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedClass(cls);
  };

  const handleBackToCohort = () => {
    setSelectedClass(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24 md:pb-8 font-sans">
      
      {/* 1. STICKY SUB-HEADER (Major + Cohort Timeline) */}
      <div className="sticky top-16 bg-white/95 backdrop-blur-md border-b border-gray-200 z-30 shadow-sm transition-all">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
           
           {/* Left: Major Selector */}
           <div className="relative group">
              <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-sm font-bold text-gray-900 transition-colors">
                 {(() => {
                    const M = MAJORS.find(m => m.id === selectedMajor) || MAJORS[0];
                    const Icon = M.icon;
                    return <><Icon className="w-4 h-4" /> <span className="hidden sm:inline">{M.label}</span><span className="sm:hidden">{M.id}</span></>;
                 })()}
                 <span className="ml-1 text-xs text-gray-500">▼</span>
              </button>
           </div>

           {/* Right: Cohort Scrubber */}
           <div ref={scrollContainerRef} className="flex-1 flex overflow-x-auto no-scrollbar justify-end gap-1 mask-linear-fade">
              {MOCK_COHORTS.map(cohort => {
                const isActive = cohort.id === selectedCohort.id;
                return (
                  <button
                    key={cohort.id}
                    onClick={() => handleCohortChange(cohort)}
                    className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all whitespace-nowrap ${
                       isActive 
                       ? 'bg-indigo-600 text-white shadow-sm' 
                       : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cohort.id}
                  </button>
                );
              })}
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
         
         {selectedClass ? (
             /* --------------------------------------------------------- */
             /* VIEW MODE: CLASS DETAIL (Event Detail Style)              */
             /* --------------------------------------------------------- */
             <div className="animate-in slide-in-from-bottom-4 duration-500 fade-in">
                
                {/* Hero Image */}
                <div className="relative h-64 md:h-96 w-full">
                    <img src={selectedClass.image} className="w-full h-full object-cover" alt={selectedClass.name} />
                    <div className="absolute inset-0 bg-black/20"></div>
                    
                    {/* Floating Back Button */}
                    <button 
                        onClick={handleBackToCohort}
                        className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg hover:bg-white flex items-center gap-2 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to {selectedCohort.id}
                    </button>
                </div>

                <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-16 relative z-10 pb-12">
                    
                    {/* Floating Info Box */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
                        <div className="p-6 md:p-8">
                           <div className="flex justify-between items-start mb-2">
                                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-indigo-50 text-indigo-700">
                                    {selectedClass.major} Major
                                </span>
                           </div>

                           <h1 className="text-3xl font-black text-gray-900 mb-2">{selectedClass.fullName}</h1>
                           <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-8">
                                <Users className="w-4 h-4" /> {selectedClass.studentCount} Students
                                <span className="mx-2 text-gray-300">|</span>
                                <MapPin className="w-4 h-4" /> {selectedCohort.location}
                           </div>

                           {/* Key Figures Grid */}
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-4">
                                     <img src={selectedClass.formTeacher.image} className="w-14 h-14 rounded-full border-2 border-indigo-100 object-cover" />
                                     <div>
                                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Homeroom Teacher</span>
                                         <p className="font-bold text-base text-gray-900 leading-tight">{selectedClass.formTeacher.name}</p>
                                     </div>
                                </div>
                                {selectedClass.monitor && (
                                     <div className="flex items-center gap-4">
                                         <img src={selectedClass.monitor.image} className="w-14 h-14 rounded-full border-2 border-gray-100 object-cover" />
                                         <div>
                                             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Class Monitor</span>
                                             <p className="font-bold text-base text-gray-900 leading-tight">{selectedClass.monitor.name}</p>
                                         </div>
                                     </div>
                                )}
                           </div>
                        </div>
                    </div>

                    {/* Section: Achievements */}
                    {selectedClass.achievements.length > 0 && (
                        <section className="mb-10">
                            <h3 className="font-bold text-gray-900 text-xl mb-4 flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-amber-500" /> Key Achievements
                            </h3>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {selectedClass.achievements.map((ach, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-amber-200 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0"></div>
                                        <span className="font-medium text-gray-800">{ach}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Section: Gallery */}
                    <section className="mb-10">
                         <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900 text-xl flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-indigo-600" /> Photo Gallery
                            </h3>
                         </div>
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                             <div className="aspect-square rounded-xl bg-gray-200 overflow-hidden">
                                <img src={`https://picsum.photos/seed/${selectedClass.id}1/400/400`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                             </div>
                             <div className="aspect-square rounded-xl bg-gray-200 overflow-hidden">
                                <img src={`https://picsum.photos/seed/${selectedClass.id}2/400/400`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                             </div>
                             <div className="aspect-square rounded-xl bg-gray-200 overflow-hidden flex items-center justify-center bg-gray-100 text-gray-400 font-bold text-sm cursor-pointer hover:bg-gray-200">
                                +12 more
                             </div>
                         </div>
                    </section>
                </div>
             </div>
         ) : (
             /* --------------------------------------------------------- */
             /* VIEW MODE: COHORT OVERVIEW (Netflix Hub Style)            */
             /* --------------------------------------------------------- */
             <div className="animate-in fade-in duration-300">
                
                {/* Cohort Hero Banner */}
                <div className="relative h-64 md:h-80 w-full mb-8">
                     <img src={selectedCohort.heroImage} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                     <div className="absolute bottom-0 left-0 p-6 md:p-8 max-w-2xl">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur text-white text-xs font-bold rounded uppercase mb-3 inline-block">
                           {selectedCohort.years}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
                           Generation {selectedCohort.id}
                        </h1>
                        <p className="text-white/90 text-sm md:text-base line-clamp-2 md:line-clamp-none leading-relaxed">
                           {selectedCohort.description}
                        </p>
                     </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 pb-12">
                    {/* Class Carousel */}
                    {selectedCohort.classes.length > 0 ? (
                        <section className="mb-12">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-xl font-bold text-gray-900">Browse Classes</h2>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {selectedCohort.classes.map(cls => (
                                    <div 
                                        key={cls.id}
                                        onClick={() => handleClassClick(cls)}
                                        className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <img src={cls.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                                        
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-white font-bold text-lg mb-0.5">{cls.name}</h3>
                                            <p className="text-white/70 text-xs font-medium truncate">{cls.fullName}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ) : (
                        <div className="mb-12 p-12 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-400 font-bold">Class data being digitized...</p>
                        </div>
                    )}

                    {/* Principal / Leadership (Short Section) */}
                    <section className="mb-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-5">School Leadership</h2>
                        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
                             <img src={selectedCohort.principal.image} className="w-16 h-16 rounded-full object-cover border border-gray-100" />
                             <div>
                                 <h3 className="font-bold text-gray-900">{selectedCohort.principal.name}</h3>
                                 <p className="text-indigo-600 text-xs font-bold uppercase mb-1">{selectedCohort.principal.role}</p>
                                 <p className="text-sm text-gray-600 italic">"{selectedCohort.principal.bio}"</p>
                             </div>
                        </div>
                    </section>

                    {/* Archive Feed */}
                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Press & Archive</h2>
                            <div className="h-px bg-gray-200 flex-1"></div>
                        </div>

                        <div className="space-y-6">
                        {selectedCohort.press.map(article => (
                            <ArchivePostCard key={article.id} article={article} />
                        ))}
                        {selectedCohort.press.length === 0 && (
                            <p className="text-center text-sm text-gray-400 italic py-8">No archive records available.</p>
                        )}
                        </div>
                    </section>
                </div>
             </div>
         )}
      </div>
    </div>
  );
};

// Vintage "Archive" Post Component
const ArchivePostCard: React.FC<{ article: PressArticle }> = ({ article }) => {
   return (
      <div className="bg-[#fdfbf7] rounded-xl border border-[#e6dbcf] shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
         <div className="flex flex-col md:flex-row">
             {/* Image Left on Desktop */}
             <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden bg-gray-100 border-b md:border-b-0 md:border-r border-[#f0e6da]">
                <img src={article.image} className="w-full h-full object-cover sepia-[.3] opacity-90 group-hover:scale-105 transition-transform duration-700" />
             </div>
             
             {/* Content */}
             <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 bg-[#f0e6da] text-[#8c7b6c] text-[10px] font-bold uppercase tracking-wider rounded">Vintage Press</span>
                        <span className="text-xs text-gray-400 font-serif italic">{article.date}</span>
                    </div>
                    <h3 className="text-gray-900 font-serif text-xl font-medium leading-tight mb-2 group-hover:text-[#8c7b6c] transition-colors">
                    {article.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Source: <span className="font-semibold">{article.source}</span>
                    </p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-[#f0e6da] flex items-center justify-between">
                    <button className="text-xs font-bold text-[#8c7b6c] uppercase tracking-wide flex items-center gap-1 hover:text-[#6b5d52]">
                        Read Article <ArrowLeft className="w-3 h-3 rotate-180" />
                    </button>
                    <div className="flex gap-3 text-gray-300">
                        <Heart className="w-4 h-4 hover:text-red-400 cursor-pointer" />
                        <Share2 className="w-4 h-4 hover:text-gray-500 cursor-pointer" />
                    </div>
                </div>
             </div>
         </div>
      </div>
   );
};

export default HistoryPage;
