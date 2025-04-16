import { useState } from 'react';

export default function DonorRegForm() {
        const [step, setStep] = useState(1);

        // State to manage form data
        const [formData, setFormData] = useState({
                age: '',
                gender: '',
                bloodType: '',
                donateRegularly: '',
                longTermIllness: '',
                takingMedicine: '',
                hadSurgery: '',
        });

        // Handle change for form inputs
        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                const { name, value } = e.target;
                setFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                }));
        };

        // Handle form step change
        const nextStep = () => {
                if (step < 3) {
                        setStep(step + 1);
                }
        };

        const prevStep = () => {
                if (step > 1) {
                        setStep(step - 1);
                }
        };

        return (
            <div className="max-w-[85rem] px-[75px] py-10 sm:px-[75px] lg:px-[75px] lg:py-14 mx-auto bg-gradient-to-r from-white to-blue-500">
                    {/* Grid Layout */}
                    <div className="grid md:grid-cols-2 items-center gap-12">
                            {/* Left Section - Information */}
                            <div>
                                    <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl lg:text-6xl lg:leading-tight">
                                            Register as a Blood Donor
                                    </h1>
                                    <p className="mt-4 md:text-xl text-gray-700 leading-relaxed">
                                            Fill out the form to become a lifesaving donor.
                                    </p>

                                    <div className="mt-10">
                                            <h2 className="text-2xl font-semibold text-gray-800">
                                                    What to Expect?
                                            </h2>
                                            <ul className="mt-4 space-y-3 text-lg">
                                                    {[
                                                            'Priority assistance for donation requests',
                                                            'Support from a dedicated community',
                                                            'Simple and low-cost process',
                                                            'Community-driven support',
                                                    ].map((item, index) => (
                                                        <li key={index} className="flex gap-x-4 items-center">
                                                                <svg
                                                                    className="w-6 h-6 text-gray-600"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                >
                                                                        <polyline points="20 6 9 17 4 12" />
                                                                </svg>
                                                                <span className="text-gray-700">{item}</span>
                                                        </li>
                                                    ))}
                                            </ul>
                                    </div>
                            </div>
                            {/* End Left Section */}

                            {/* Right Section - Form */}
                            <div className="relative">
                                    <div className="flex flex-col border border-gray-200 rounded-xl p-[75px] lg:p-[75px] bg-white">
                                            <h2 className="text-xl font-semibold text-gray-800">Fill in the form</h2>

                                            {/* Steps Indicator */}
                                            <div className="flex items-center justify-between mb-8">
                                                    {['Step 1', 'Step 2', 'Step 3'].map((_label, index) => (
                                                        <div key={index} className="flex items-center">
                                                                <div
                                                                    className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
                                                                        step === index + 1
                                                                            ? 'bg-blue-600'
                                                                            : step > index + 1
                                                                                ? 'bg-green-500'
                                                                                : 'bg-gray-300'
                                                                    }`}
                                                                >
                                                                        {step > index + 1 ? '✓' : index + 1}
                                                                </div>
                                                                {index < 2 && (
                                                                    <div
                                                                        className={`h-1 w-10 sm:w-20 ${
                                                                            step > index + 1 ? 'bg-green-500' : 'bg-gray-300'
                                                                        }`}
                                                                    ></div>
                                                                )}
                                                        </div>
                                                    ))}
                                            </div>

                                            <form className="mt-6 space-y-4">
                                                    {/* Step 1 */}
                                                    {step === 1 && (
                                                        <div>
                                                                <div>
                                                                        <label htmlFor="age" className="block text-sm font-medium text-red-500">
                                                                                Age
                                                                        </label>
                                                                        <input
                                                                            type="number"
                                                                            id="age"
                                                                            name="age"
                                                                            value={formData.age}
                                                                            onChange={handleChange}
                                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-transparent rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                                                        />
                                                                </div>

                                                                <div>
                                                                        <label htmlFor="gender" className="block text-sm font-medium text-red-500">
                                                                                Gender
                                                                        </label>
                                                                        <select
                                                                            id="gender"
                                                                            name="gender"
                                                                            value={formData.gender}
                                                                            onChange={handleChange}
                                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-transparent rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                                                        >
                                                                                <option value="">Select Gender</option>
                                                                                <option value="Male">Male</option>
                                                                                <option value="Female">Female</option>
                                                                        </select>
                                                                </div>

                                                                <div>
                                                                        <label htmlFor="bloodType" className="block text-sm font-medium text-red-500">
                                                                                Blood Type
                                                                        </label>
                                                                        <select
                                                                            id="bloodType"
                                                                            name="bloodType"
                                                                            value={formData.bloodType}
                                                                            onChange={handleChange}
                                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-transparent rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                                                        >
                                                                                <option value="">Select your blood type</option>
                                                                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
                                                                                    <option key={type} value={type}>
                                                                                            {type}
                                                                                    </option>
                                                                                ))}
                                                                        </select>
                                                                </div>
                                                        </div>
                                                    )}

                                                    {/* Step 2 */}
                                                    {step === 2 && (
                                                        <div>
                                                                <div>
                                                                        <label
                                                                            htmlFor="donateRegularly"
                                                                            className="block text-sm font-medium text-red-500"
                                                                        >
                                                                                I would like to Donate Blood
                                                                        </label>
                                                                        <select
                                                                            id="donateRegularly"
                                                                            name="donateRegularly"
                                                                            value={formData.donateRegularly}
                                                                            onChange={handleChange}
                                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-transparent rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                                                        >
                                                                                <option value="">Select Option</option>
                                                                                <option value="Every 4 Months">Every 4 Months</option>
                                                                                <option value="Every 6 Months">Every 6 Months</option>
                                                                        </select>
                                                                </div>

                                                                <div>
                                                                        <label
                                                                            htmlFor="longTermIllness"
                                                                            className="block text-sm font-medium text-red-500"
                                                                        >
                                                                                Are you suffering from any long-term illness?
                                                                        </label>
                                                                        <select
                                                                            id="longTermIllness"
                                                                            name="longTermIllness"
                                                                            value={formData.longTermIllness}
                                                                            onChange={handleChange}
                                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-transparent rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                                                        >
                                                                                <option value="">Select Option</option>
                                                                                <option value="Yes">Yes</option>
                                                                                <option value="No">No</option>
                                                                        </select>
                                                                </div>
                                                        </div>
                                                    )}

                                                    {/* Step 3 */}
                                                    {step === 3 && (
                                                        <div>
                                                                <div>
                                                                        <label
                                                                            htmlFor="takingMedicine"
                                                                            className="block text-sm font-medium text-red-500"
                                                                        >
                                                                                Are you taking any medicine?
                                                                        </label>
                                                                        <select
                                                                            id="takingMedicine"
                                                                            name="takingMedicine"
                                                                            value={formData.takingMedicine}
                                                                            onChange={handleChange}
                                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-transparent rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                                                        >
                                                                                <option value="">Select Option</option>
                                                                                <option value="Yes">Yes</option>
                                                                                <option value="No">No</option>
                                                                        </select>
                                                                </div>

                                                                <div>
                                                                        <label htmlFor="hadSurgery" className="block text-sm font-medium text-red-500">
                                                                                Have you undergone any surgery?
                                                                        </label>
                                                                        <select
                                                                            id="hadSurgery"
                                                                            name="hadSurgery"
                                                                            value={formData.hadSurgery}
                                                                            onChange={handleChange}
                                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-transparent rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                                                        >
                                                                                <option value="">Select Option</option>
                                                                                <option value="Yes">Yes</option>
                                                                                <option value="No">No</option>
                                                                        </select>
                                                                </div>
                                                        </div>
                                                    )}

                                                    {/* Navigation Buttons */}
                                                    <div className="flex justify-between mt-6">
                                                            {step > 1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={prevStep}
                                                                    className="w-full py-3 px-4 text-sm font-medium rounded-lg bg-gray-300 text-black hover:bg-gray-400"
                                                                >
                                                                        Previous
                                                                </button>
                                                            )}

                                                            <button
                                                                type="button"
                                                                onClick={nextStep}
                                                                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                                                            >
                                                                    {step === 3 ? 'Submit' : 'Next'}
                                                            </button>
                                                    </div>
                                            </form>
                                    </div>
                            </div>
                            {/* End Right Section */}
                    </div>
                    {/* End Grid */}
            </div>
        );
}
