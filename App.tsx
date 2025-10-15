import React, { useState, useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import LoginView from './components/views/LoginView';
import PosView from './components/views/PosView';
import ProductsView from './components/views/ProductsView';
import ReportsView from './components/views/ReportsView';
import UsersView from './components/views/UsersView';
import Header from './components/shared/Header';
import { User, UserRole, View } from './types';

const AppContent: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>(View.POS);
  const { loading, error, fetchInitialData, login } = useAppContext();

  useEffect(() => {
    if (!currentUser) {
      fetchInitialData();
    }
  }, [currentUser, fetchInitialData]);

  const handleLogin = async (username: string, password: string) => {
    const user = await login(username, password);
    if (user) {
      setCurrentUser(user);
      setCurrentView(user.role === UserRole.Admin ? View.REPORTS : View.POS);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const renderView = () => {
    switch (currentView) {
      case View.POS:
        return <PosView />;
      case View.PRODUCTS:
        return <ProductsView />;
      case View.REPORTS:
        return <ReportsView />;
      case View.USERS:
        return <UsersView />;
      default:
        return <PosView />;
    }
  };

  if (loading && !currentUser) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-gray-200">
          <div className="text-center">
             <h2 className="text-2xl font-semibold text-gray-700">Loading Application...</h2>
             <p className="text-gray-500">Connecting to the database.</p>
          </div>
       </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <LoginView onLogin={handleLogin} error={error}/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {error && (
        <div className="bg-yellow-500 border-b-4 border-yellow-600 text-black p-3 text-center" role="alert">
          <p className="font-bold">Warning</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
      <Header 
        userRole={currentUser.role} 
        currentView={currentView}
        setCurrentView={setCurrentView}
        onLogout={handleLogout} 
      />
      <main className="flex-grow p-4 sm:p-6 lg:p-8">
        {renderView()}
      </main>
    </div>
  );
};


const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;