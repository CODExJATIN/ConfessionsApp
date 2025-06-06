import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';

const TermsOfServicePage = () => {
  return (
    <Layout>
      <div className="container-narrow py-12 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Effective Date: 6/6/2025 <br />
            Last Updated: 6/6/2025
          </p>
        </motion.div>

        <SectionCard title="1. Acceptance of Terms">
          <p className="text-gray-600 dark:text-gray-400">
            By accessing or using College Confessions, you agree to be bound by these Terms of Service 
            and our Privacy Policy. If you do not agree, please do not use the platform.
          </p>
        </SectionCard>

        <SectionCard title="2. Eligibility">
          <p className="text-gray-600 dark:text-gray-400">
            You must be at least 18 years old to use the platform. By using it, you represent that you meet this requirement.
          </p>
        </SectionCard>

        <SectionCard title="3. User Conduct">
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
            <li>Do not post hateful, abusive, or illegal content</li>
            <li>Do not impersonate others or provide false information</li>
            <li>Do not harass, threaten, or bully other users</li>
            <li>Do not attempt to hack, spam, or disrupt the platform</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Violations may result in removal of content, suspension, or permanent ban from the platform.
          </p>
        </SectionCard>

        <SectionCard title="4. Account Responsibility">
          <p className="text-gray-600 dark:text-gray-400">
            You are responsible for maintaining the security of your account. Do not share your login credentials with others.
          </p>
        </SectionCard>

        <SectionCard title="5. Content Ownership and License">
          <p className="text-gray-600 dark:text-gray-400">
            You retain ownership of the content you submit. However, by posting, you grant [Your App Name] a non-exclusive, 
            royalty-free, worldwide license to use, display, and distribute your content on the platform.
          </p>
        </SectionCard>

        <SectionCard title="6. Moderation Rights">
          <p className="text-gray-600 dark:text-gray-400">
            We reserve the right to moderate, edit, or remove content that violates these terms or community standards, 
            at our sole discretion.
          </p>
        </SectionCard>

        <SectionCard title="7. Disclaimers">
          <p className="text-gray-600 dark:text-gray-400">
            The platform is provided "as is." We make no warranties regarding availability, accuracy, or reliability. 
            We are not responsible for content posted by users.
          </p>
        </SectionCard>

        <SectionCard title="8. Limitation of Liability">
          <p className="text-gray-600 dark:text-gray-400">
            To the fullest extent permitted by law, College Confessions shall not be liable for any indirect, incidental, 
            or consequential damages resulting from your use of the platform.
          </p>
        </SectionCard>

        <SectionCard title="9. Termination">
          <p className="text-gray-600 dark:text-gray-400">
            We may terminate or suspend your access to the platform at any time, with or without notice, 
            for any reason including violations of these terms.
          </p>
        </SectionCard>

        <SectionCard title="10. Changes to Terms">
          <p className="text-gray-600 dark:text-gray-400">
            We may revise these Terms of Service from time to time. Any updates will be posted here. 
            Continued use after changes implies acceptance of the updated terms.
          </p>
        </SectionCard>

        <SectionCard title="11. Contact Us">
          <p className="text-gray-600 dark:text-gray-400">
            If you have questions about these Terms, contact us at:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
            <li>Email: <a href="mailto:jatin5140p@gmaqil.com" className="text-primary-600">jatin5140p@gmail.com</a></li>
          </ul>
        </SectionCard>
      </div>
    </Layout>
  );
};

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

export default TermsOfServicePage;
