import React, { useState, useEffect } from 'react';
import { PageRoute, Tool } from './types';
import { TOOLS_DATA } from './data/toolsData';
import { FloatingShapes } from './components/FloatingShapes';
import { HeaderNavbar } from './components/HeaderNavbar';
import { Footer } from './components/Footer';
import { ToolDetailModal } from './components/ToolDetailModal';

// Pages
import { HomePage } from './pages/HomePage';
import { DirectoryPage } from './pages/DirectoryPage';
import { RecommenderPage } from './pages/RecommenderPage';
import { ComparatorPage } from './pages/ComparatorPage';
import { WorkflowsPage } from './pages/WorkflowsPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal State
  const [activeModalTool, setActiveModalTool] = useState<Tool | null>(null);

  // Bookmarks State (LocalStorage persisted)
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ia_hub_bookmarks');
      return saved ? JSON.parse(saved) : ['gemini', 'claude-code', 'ai-studio-builder'];
    } catch {
      return ['gemini', 'claude-code', 'ai-studio-builder'];
    }
  });

  // Compared Tools State
  const [comparedToolIds, setComparedToolIds] = useState<string[]>(['claude', 'chatgpt', 'gemini']);

  // Sync Bookmarks to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('ia_hub_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks', e);
    }
  }, [bookmarks]);

  // URL Hash Sync for Multi-Page Navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (['home', 'directory', 'recommender', 'comparator', 'workflows', 'about'].includes(hash)) {
        setCurrentPage(hash as PageRoute);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (toolId: string) => {
    setBookmarks(prev => 
      prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId]
    );
  };

  const handleToggleCompare = (toolId: string) => {
    setComparedToolIds(prev => {
      if (prev.includes(toolId)) {
        return prev.filter(id => id !== toolId);
      } else {
        if (prev.length >= 3) {
          return [...prev.slice(1), toolId];
        }
        return [...prev, toolId];
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0d0d11] text-neutral-100 font-sans selection:bg-purple-500 selection:text-white flex flex-col relative overflow-x-hidden">
      
      {/* Background Orbs & Shapes */}
      <FloatingShapes />

      {/* Header Sticky Navigation */}
      <HeaderNavbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        bookmarksCount={bookmarks.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Page View Router */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectCategory={(catId) => setSelectedCategory(catId)}
            onSelectTool={(tool) => setActiveModalTool(tool)}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            comparedToolIds={comparedToolIds}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {currentPage === 'directory' && (
          <DirectoryPage
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectTool={(tool) => setActiveModalTool(tool)}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            comparedToolIds={comparedToolIds}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {currentPage === 'recommender' && (
          <RecommenderPage
            onSelectTool={(tool) => setActiveModalTool(tool)}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            comparedToolIds={comparedToolIds}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {currentPage === 'comparator' && (
          <ComparatorPage
            comparedToolIds={comparedToolIds}
            onToggleCompare={handleToggleCompare}
            onSelectTool={(tool) => setActiveModalTool(tool)}
          />
        )}

        {currentPage === 'workflows' && (
          <WorkflowsPage
            onSelectTool={(tool) => setActiveModalTool(tool)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage />
        )}
      </main>

      {/* Tool Detail Technical Modal */}
      <ToolDetailModal
        tool={activeModalTool}
        onClose={() => setActiveModalTool(null)}
        isBookmarked={activeModalTool ? bookmarks.includes(activeModalTool.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onAddToCompare={handleToggleCompare}
        isCompared={activeModalTool ? comparedToolIds.includes(activeModalTool.id) : false}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
