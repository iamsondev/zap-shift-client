import React from "react";

const ProfasAccordionSection = () => {
  return (
    <section data-aos="fade-up"
     data-aos-duration="3000" className="full mx-auto py-20 px-6 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Everything you need to know about working with Profas Courier as a merchant or rider.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {/* Item 1 */}
        <div className="collapse collapse-plus bg-base-200 dark:bg-gray-800">
          <input type="radio" name="accordion-profas" defaultChecked />
          <div className="collapse-title text-xl font-semibold text-gray-900 dark:text-white">
            How can I become a Profas Courier merchant?
          </div>
          <div className="collapse-content text-gray-700 dark:text-gray-300">
            <p>
              Simply click on the "Become Merchant" button, fill out your business details, and our team will reach out
              to verify and onboard you within 24 hours.
            </p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="collapse collapse-plus bg-base-200 dark:bg-gray-800">
          <input type="radio" name="accordion-profas" />
          <div className="collapse-title text-xl font-semibold text-gray-900 dark:text-white">
            What are the benefits of delivering with Profas?
          </div>
          <div className="collapse-content text-gray-700 dark:text-gray-300">
            <p>
              Riders enjoy flexible schedules, guaranteed earnings per delivery, route optimization tools, and a strong
              support team to assist with queries.
            </p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="collapse collapse-plus bg-base-200 dark:bg-gray-800">
          <input type="radio" name="accordion-profas" />
          <div className="collapse-title text-xl font-semibold text-gray-900 dark:text-white">
            How does Profas ensure package safety and tracking?
          </div>
          <div className="collapse-content text-gray-700 dark:text-gray-300">
            <p>
              All packages are scanned at every checkpoint, with real-time tracking available to customers and merchants
              via the Profas dashboard and mobile app.
            </p>
          </div>
        </div>

        {/* Item 4 */}
        <div className="collapse collapse-plus bg-base-200 dark:bg-gray-800">
          <input type="radio" name="accordion-profas" />
          <div className="collapse-title text-xl font-semibold text-gray-900 dark:text-white">
            Is there a fee to join as a merchant or rider?
          </div>
          <div className="collapse-content text-gray-700 dark:text-gray-300">
            <p>
              No. Onboarding with Profas is completely free. We value partnerships and aim to grow with you — not charge
              you up front.
            </p>
          </div>
        </div>

        {/* Item 5 */}
        <div className="collapse collapse-plus bg-base-200 dark:bg-gray-800">
          <input type="radio" name="accordion-profas" />
          <div className="collapse-title text-xl font-semibold text-gray-900 dark:text-white">
            Can I track my earnings as a rider in real-time?
          </div>
          <div className="collapse-content text-gray-700 dark:text-gray-300">
            <p>
              Yes! The Profas Rider App displays your completed deliveries, current earnings, bonuses, and payout
              history, all updated in real-time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfasAccordionSection;
