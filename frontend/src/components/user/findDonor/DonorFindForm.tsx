export default function DonorFindForm() {
        return (
            <div className="max-w-[85rem] px-[75px] py-10 sm:px-[75px] lg:px-[75px] lg:py-14 mx-auto bg-gradient-to-r from-white to-blue-500">
                    {/* Grid Layout */}
                    <div className="grid md:grid-cols-2 items-center gap-12">
                            {/* Left Section - Information */}
                            <div>
                                    <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl lg:text-6xl lg:leading-tight">
                                            අපව අමතන්න
                                    </h1>
                                    <p className="mt-4 md:text-xl text-gray-700 leading-relaxed">
                                            අපි ඔබේ ලේ අවශ්‍යතාවය සපුරාලීමට සහාය වන්නෙමු.
                                    </p>

                                    <div className="mt-10">
                                            <h2 className="text-2xl font-semibold text-gray-800">
                                                    මට බලාපොරොත්තු විය හැක්කේ කුමක්ද?
                                            </h2>
                                            <ul className="mt-4 space-y-3 text-lg">
                                                    {[
                                                            "කාර්මික ප්‍රමුඛතාවය",
                                                            "සංවර්ධක ප්‍රජාවෙන් සහාය",
                                                            "සරල සහ අඩු වියදම්",
                                                            "ප්‍රජාවෙන් සහාය",
                                                            "සහාය සහ සහයෝගය",
                                                            "සහාය සහ සහයෝගය",
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
                                                                        <polyline points="20 6 9 17 4 12"/>
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

                                            <form className="mt-6 space-y-4 ">
                                                    {/* Blood Type */}
                                                    <div>
                                                            <label htmlFor="bloodType" className="block text-sm font-medium text-red-500">
                                                                    Blood Type
                                                            </label>
                                                            <select
                                                                id="bloodType"
                                                                name="bloodType"
                                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-transparent rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                                            >
                                                                    <option value="">Select your blood type</option>
                                                                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                                                                        <option key={type} value={type}>
                                                                                {type}
                                                                        </option>
                                                                    ))}
                                                            </select>
                                                    </div>

                                                    {/* Email */}
                                                    <div>
                                                            <label htmlFor="email" className="block text-sm font-medium text-red-500">
                                                                    Email
                                                            </label>
                                                            <input
                                                                type="email"
                                                                id="email"
                                                                name="email"
                                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-transparent rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                                            />
                                                    </div>

                                                    {/* Number & Province */}
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div>
                                                                    <label htmlFor="number" className="block text-sm font-medium text-red-500">
                                                                            Number
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        id="number"
                                                                        name="number"
                                                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-transparent rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                                                    />
                                                            </div>
                                                            <div>
                                                                    <label htmlFor="province" className="block text-sm font-medium text-red-500">
                                                                            Province
                                                                    </label>
                                                                    <select
                                                                        id="province"
                                                                        name="province"
                                                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-transparent rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                                                    >
                                                                            <option value="">Select your province</option>
                                                                            {[
                                                                                    "Central",
                                                                                    "Eastern",
                                                                                    "Northern",
                                                                                    "Southern",
                                                                                    "Western",
                                                                                    "North Western",
                                                                                    "North Central",
                                                                                    "Uva",
                                                                                    "Sabaragamuwa",
                                                                            ].map((province) => (
                                                                                <option key={province} value={province}>
                                                                                        {province}
                                                                                </option>
                                                                            ))}
                                                                    </select>
                                                            </div>
                                                    </div>

                                                    {/* Checkbox */}
                                                    <div className="flex items-center mt-3">
                                                            <input
                                                                id="agree"
                                                                name="agree"
                                                                type="checkbox"
                                                                className="shrink-0 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500"
                                                            />
                                                            <label htmlFor="agree" className="ml-3 text-sm text-gray-600">
                                                                    By submitting this form, I acknowledge the{" "}
                                                                    <a
                                                                        href="#"
                                                                        className="text-blue-600 decoration-2 hover:underline font-medium"
                                                                    >
                                                                            Privacy Policy
                                                                    </a>
                                                            </label>
                                                    </div>

                                                    {/* Submit Button */}
                                                    <div className="mt-6">
                                                            <button
                                                                type="submit"
                                                                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                                                            >
                                                                    Send Inquiry
                                                            </button>
                                                    </div>

                                                    {/* Message */}
                                                    <div className="mt-3 text-center">
                                                            <p className="text-sm text-gray-500">We'll get back to you in 1-2 business days.</p>
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
