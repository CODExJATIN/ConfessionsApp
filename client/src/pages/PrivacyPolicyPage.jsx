import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';

const PrivacyPolicyPage = () => {
  return (
    <Layout>
      <div className="container-narrow py-12 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Effective Date: 6/6/2025 <br />
            Last Updated: 6/6/2025
          </p>
        </motion.div>

        <SectionCard title="1. Information We Collect">
          <h3 className="text-lg font-semibold">A. Anonymous Usage</h3>
          <p className="text-gray-600 dark:text-gray-400">
            When you post anonymously without logging in, we do <strong>not</strong> collect personally identifiable information. However, we may collect:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 mt-2">
            <li>Device type and browser type</li>
            <li>Timestamp and selected college</li>
            <li>Content of the anonymous post</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4">B. Logged-In Users</h3>
          <p className="text-gray-600 dark:text-gray-400">
            If you choose to log in, we collect:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 mt-2">
            <li>Email address</li>
            <li>Display name or handle</li>
            <li>Login method (Google, Email, etc.)</li>
            <li>Your posted comments, public confessions, and interactions</li>
          </ul>
        </SectionCard>

        <SectionCard title="2. How We Use Your Information">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            We use collected data only for purposes essential to the platform:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
            <li>Allowing users to post, comment, and interact with content</li>
            <li>Authentication and account management</li>
            <li>Moderating user content to detect abuse or violations</li>
            <li>Improving app performance and user experience</li>
            <li>Enforcing safety and community standards</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            We do not sell, rent, or share your data with advertisers or third-party marketers.
          </p>
        </SectionCard>

        <SectionCard title="3. Data Retention">
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
            <li>Anonymous posts are retained unless removed through moderation</li>
            <li>Logged-in data is stored until deletion or account removal</li>
            <li>IP addresses and metadata are retained temporarily (30–60 days)</li>
          </ul>
        </SectionCard>

        <SectionCard title="4. Cookies and Tracking">
          <p className="text-gray-600 dark:text-gray-400">
            We use minimal cookies and local storage for:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 mt-2">
            <li>Remembering selected college</li>
            <li>Maintaining logged-in sessions</li>
            <li>Counting non-personal interactions like likes</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            We do not use third-party behavioral tracking or targeted ads.
          </p>
        </SectionCard>

        <SectionCard title="5. Third-Party Services">
          <p className="text-gray-600 dark:text-gray-400">
            We use third-party services for hosting. These services have access to minimal required info and are governed by their own privacy policies. We do not share your personal data with external companies.
          </p>
        </SectionCard>

        <SectionCard title="6. Data Security">
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
            <li>Encrypted communication over HTTPS</li>
            <li>Secure storage of user sessions</li>
            <li>Abuse detection and rate-limiting measures</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            While we take strong precautions, no system is 100% secure. Please use discretion when using the platform.
          </p>
        </SectionCard>

        <SectionCard title="7. Your Rights">
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction or deletion</li>
            <li>Delete your account anytime</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            To request access or deletion, email us at <a className="text-primary-600" href="mailto:jatin5140p@gmail.com">jatin5140p@gmail.com</a>
          </p>
        </SectionCard>

        <SectionCard title="8. Children’s Privacy">
          <p className="text-gray-600 dark:text-gray-400">
            This platform is intended for users aged 18 and above. We do not knowingly collect data from children under 16. If discovered, it will be promptly deleted.
          </p>
        </SectionCard>

        <SectionCard title="9. Changes to This Policy">
          <p className="text-gray-600 dark:text-gray-400">
            We may update this policy over time. Significant changes will be communicated via the platform or email. Latest version will always be available at <a href="https://confessions-app.vercel.app/privacy" className="text-primary-600">confessions-app.vercel.app/privacy</a>
          </p>
        </SectionCard>

        <SectionCard title="10. Contact Us">
          <p className="text-gray-600 dark:text-gray-400">
            For questions or concerns, contact us:
          </p>
          <ul className="text-gray-600 dark:text-gray-400 list-disc list-inside">
            <li>Email: <a href="mailto:support@yourapp.com" className="text-primary-600">jatin5140p@gmail.com</a></li>
          </ul>
        </SectionCard>
      </div>
    </Layout>
  );
};

// Reusable Section Card Component
const SectionCard = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="card p-6 space-y-4"
  >
    <h2 className="text-2xl font-bold">{title}</h2>
    {children}
  </motion.div>
);

export default PrivacyPolicyPage;