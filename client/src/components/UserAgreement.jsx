import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UserAgreementModal = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('userAgreementAccepted');
    if (!accepted) setIsOpen(true);
  }, []);

  const handleAccept = async () => {
    localStorage.setItem('userAgreementAccepted', 'true');
    setIsOpen(false);

    // Send agreement to backend if needed
    // if (user?.email) {
    //   try {
    //     await axios.post('/api/save-agreement', {
    //       email: user.email,
    //       agreedAt: new Date().toISOString(),
    //     });
    //   } catch (error) {
    //     console.error('Agreement save failed:', error);
    //   }
    // }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            style={{ opacity: 0.4 }}
          />

          {/* Centered Modal Wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div
              className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto p-5"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                User Agreement
              </h2>

              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                  By using this platform, you agree to abide by our <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>, <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>, and <a href="/guidelines" className="text-blue-600 hover:underline">Community Guidelines</a>.
                </p>
                <p>
                  You understand that this app is intended for students aged 18 or above and that anonymous posts must not contain hate, abuse, or any illegal content.
                </p>
                <p>
                  All activity may be moderated and stored securely in accordance with our privacy practices. Violating rules may result in bans or restrictions.
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleAccept}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm px-4 py-2 rounded transition w-full sm:w-auto"
                >
                  I Accept
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UserAgreementModal;
