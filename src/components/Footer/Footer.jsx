import React from 'react';
import { Logo } from '../index';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <section className="relative overflow-hidden py-10 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap justify-between">
          <div className="w-full p-6 md:w-1/2 lg:w-4/12">
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <Logo width="100px" />
              </div>
              <p className="text-sm text-gray-200">
                &copy; Copyright 2025. All Rights Reserved by Ishita.
              </p>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="">
              <h3 className="tracking-wider mb-6 text-sm font-semibold uppercase text-gray-300">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base hover:underline" to="/">
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base hover:underline" to="/">
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base hover:underline" to="/">
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link className="text-base hover:underline" to="/">
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="">
              <h3 className="tracking-wider mb-6 text-sm font-semibold uppercase text-gray-300">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base hover:underline" to="/">
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base hover:underline" to="/">
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base hover:underline" to="/">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="text-base hover:underline" to="/">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="">
              <h3 className="tracking-wider mb-6 text-sm font-semibold uppercase text-gray-300">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base hover:underline" to="/">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base hover:underline" to="/">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="text-base hover:underline" to="/">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
