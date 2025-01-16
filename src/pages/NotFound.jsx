import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 502 253"
                    width="400"
                    height="400"
                    className="w-64 h-64"
                >
                    {/* SVG content */}
                    <g transform="matrix(1,0,0,1,1.1829999685287476,3.837641954421997)" opacity="1">
                        <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                            <path
                                fill="rgb(66,75,95)"
                                fillOpacity="1"
                                d="M235.66900634765625,186.1479949951172 C208.74200439453125,186.1479949951172 194.6750030517578,170.427001953125 194.6750030517578,124.96399688720703 C194.6750030517578,84.84860229492188 209.3179931640625,63.69409942626953 236.2449951171875,63.69409942626953 C263.1719970703125,63.69409942626953 277.8160095214844,77.5896987915039 277.8160095214844,124.96399688720703 C277.8160095214844,169.281005859375 262.59600830078125,186.1479949951172 235.66900634765625,186.1479949951172z"
                            />
                            {/* Other paths and SVG elements */}
                        </g>
                    </g>
                </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
            <p className="text-lg text-gray-600 mb-6">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-purple-600 text-white text-lg rounded-lg hover:bg-purple-700 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
