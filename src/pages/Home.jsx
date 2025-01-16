import React, { useEffect, useState } from 'react';
import { Container } from '../components';
import { getAllProjects } from '../apirequests/projects';
import { PostCard } from '../components';

function Home() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 8;

    useEffect(() => {
        getAllProjects().then((data) => {
            setProjects(data?.data);
            if (data?.success) {
                setLoading(false);
            }
        });
    }, []);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(projects.length / projectsPerPage)) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const startIndex = (currentPage - 1) * projectsPerPage;
    const currentProjects = projects.slice(startIndex, startIndex + projectsPerPage);

    if (loading) {
        return (
            <div className="w-full py-16 text-center bg-purple-100">
                <Container>
                    <div className="flex justify-center items-center h-64">
                        <h1 className="text-3xl font-bold text-purple-600">Loading...</h1>
                    </div>
                </Container>
            </div>
        );
    } else if (projects?.length === 0) {
        return (
            <div className="w-full py-16 text-center bg-purple-100">
                <Container>
                    <div className="flex justify-center items-center h-64">
                        <h1 className="text-3xl font-bold text-purple-600">No Projects Yet</h1>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen py-16 bg-purple-50">
            <Container>
                <div className="flex flex-wrap justify-center gap-6">
                    {currentProjects.map((project) => (
                        <div key={project._id} className="w-full sm:w-1/2 lg:w-1/4 p-4">
                            <PostCard {...project} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-8">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === Math.ceil(projects.length / projectsPerPage)}
                        className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </Container>
        </div>
    );
}

export default Home;
