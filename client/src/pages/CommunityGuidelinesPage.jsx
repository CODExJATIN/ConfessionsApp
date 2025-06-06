import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';

const CommunityGuidelinesPage = () => {
  return (
    <Layout>
      <div className="container-narrow py-12 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Community Guidelines</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our community thrives when it is respectful, inclusive, and safe. These guidelines help maintain the spirit of our platform.
          </p>
        </motion.div>

        <SectionCard title="1. Be Respectful">
          <p className="text-gray-600 dark:text-gray-400">
            Treat others with kindness and consideration. Disagreements are fine, but personal attacks, hate speech, and harassment are not tolerated.
          </p>
        </SectionCard>

        <SectionCard title="2. No Discrimination or Hate Speech">
          <p className="text-gray-600 dark:text-gray-400">
            Do not post content that is racist, sexist, homophobic, transphobic, or discriminatory in any form. Our platform is inclusive of all identities and backgrounds.
          </p>
        </SectionCard>

        <SectionCard title="3. Keep It Legal and Appropriate">
          <p className="text-gray-600 dark:text-gray-400">
            Avoid posting anything illegal, threatening, or sexually explicit. This includes nudity, pornography, and content that promotes violence or criminal activity.
          </p>
        </SectionCard>

        <SectionCard title="4. Maintain Anonymity With Integrity">
          <p className="text-gray-600 dark:text-gray-400">
            Anonymous posting is powerful — use it responsibly. Do not use anonymity to spread misinformation, harm others, or avoid accountability.
          </p>
        </SectionCard>

        <SectionCard title="5. No Bullying or Doxxing">
          <p className="text-gray-600 dark:text-gray-400">
            Bullying, threats, or revealing private information (doxxing) of others is strictly prohibited and may result in a permanent ban.
          </p>
        </SectionCard>

        <SectionCard title="6. Share Meaningfully">
          <p className="text-gray-600 dark:text-gray-400">
            This platform is about real stories and experiences. Low-effort spam, irrelevant self-promotion, and trolling harm the experience for everyone.
          </p>
        </SectionCard>

        <SectionCard title="7. Respect Moderation Decisions">
          <p className="text-gray-600 dark:text-gray-400">
            Moderators are here to keep the space safe. If your content is removed or flagged, review these guidelines. Repeated violations may result in account restrictions or bans.
          </p>
        </SectionCard>

        <SectionCard title="8. Report Responsibly">
          <p className="text-gray-600 dark:text-gray-400">
            If you see content that violates these guidelines, use the reporting tools. False or malicious reports harm the community.
          </p>
        </SectionCard>

        <SectionCard title="9. Feedback Welcome">
          <p className="text-gray-600 dark:text-gray-400">
            We’re building this platform together. Share your suggestions or concerns at <a href="mailto:jatin5140p@gmaqil.com" className="text-primary-600">jatin5140p@gmaqil.com</a>.
          </p>
        </SectionCard>

        <SectionCard title="10. Guideline Updates">
          <p className="text-gray-600 dark:text-gray-400">
            These guidelines may evolve as our community grows. Please check back periodically for updates.
          </p>
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

export default CommunityGuidelinesPage;
