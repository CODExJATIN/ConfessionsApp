import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';


const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pb-40 md:pb-0 ">
        {children}
      </main>
      <Footer className="hidden md:block" />
      <BottomNav />
    </div>
  );
};

export default Layout;