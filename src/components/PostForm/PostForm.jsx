import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button } from "../index";
import { useNavigate } from "react-router-dom";
import { addProject, updateProject } from '../../apirequests/projects';

const PostForm = ({ project }) => {
    const [error, setError] = useState(null);

    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            projectName: project?.projectName || "",
            projectDescription: project?.projectDescription || ""
        }
    });

    const { isSubmitting } = formState;
    const navigate = useNavigate();

    const formSubmitHandler = async (data) => {
        try {
            setError(null);
            if (!project) {
                const response = await addProject(data);
                if (response?.success) navigate("/");
                else throw response;
            } else {
                const response = await updateProject({ ...data, id: project?._id });
                if (response?.success) navigate("/");
                else throw response;
            }
        } catch (error) {
            console.log("Error Creating Project", error);
            setError(error);
        }
    };

    const validationErrorHandler = (error) => {
        setError({ ...error });
    };

    return (
        <form onSubmit={handleSubmit(formSubmitHandler, validationErrorHandler)} className='p-6 bg-purple-100 rounded-lg shadow-lg'>
            <div className='mb-4'>
                {error?.errmessage && <p className="text-purple-600 text-center">{error.errmessage}</p>}
            </div>

            <Input
                label="Project Name"
                placeholder="Enter Project Name"
                className="mb-4 border-purple-300 focus:ring-purple-500 rounded-lg"
                {...register('projectName', {
                    required: {
                        value: true,
                        message: "Project Name required",
                    },
                    validate: {
                        noLeadingTrailingWhitespace: (value) => value.trim().length === value.length || "Project Name cannot have leading or trailing spaces",
                    }
                })}
            />
            <div className='text-purple-500 mb-4'>{error?.projectName?.message}</div>

            <Input
                label="Project Description"
                placeholder="Enter Project Description"
                className="mb-4 border-purple-300 focus:ring-purple-500 rounded-lg"
                {...register('projectDescription', {
                    required: {
                        value: true,
                        message: "Project Description required",
                    },
                    validate: {
                        noLeadingTrailingWhitespace: (value) => value.trim().length === value.length || "Project Description cannot have leading or trailing spaces",
                    }
                })}
            />
            <div className='text-purple-500 mb-4'>{error?.projectDescription?.message}</div>

            <Button
                type="submit"
                className={`w-full py-2 text-white rounded-lg ${project ? "bg-purple-500 hover:bg-gray-600" : "bg-purple-500 hover:bg-purple-600"} disabled:opacity-50`}
                disabled={isSubmitting}
            >
                {project ? "Update" : "Submit"}
            </Button>
        </form>
    );
};

export default PostForm;
