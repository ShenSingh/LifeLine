export default function BloodRequestSteps() {
    return (
        <div className="px-4 py-16 mx-auto w-full md:px-24 lg:px-8 lg:py-20 bg-white">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                    ලේ ඇයදුම් කිරීමට පහසු පියවර
                </h2>
                <p className="text-base text-gray-700 md:text-lg">
                    ලේ ලබා ගැනීමේ සහ ලබාදීමේ ක්‍රියාවලිය පහසු සහ වේගවත් කිරීමට අපි ඔබට උපකාරී වේ.
                </p>
            </div>
            <div className="relative grid gap-8 row-gap-5 mb-8 md:row-gap-8 lg:grid-cols-4 sm:grid-cols-2">
                <div className="absolute inset-0 flex items-center justify-center sm:hidden lg:flex">
                    <div className="w-px h-full bg-gray-300 lg:w-full lg:h-px" />
                </div>
                <div className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-bold leading-5">ලියාපදිංචි වන්න</p>
                        <p className="flex items-center justify-center w-6 h-6 font-bold rounded text-red-600 bg-red-100">
                            1
                        </p>
                    </div>
                    <p className="text-sm text-gray-900">
                        ඔබේ තොරතුරු ඇතුළත් කර සහ ලේ ලබාදීම සඳහා ලියාපදිංචි වන්න.
                    </p>
                </div>
                <div className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-bold leading-5">දත්ත යාවත්කාලීන කරන්න</p>
                        <p className="flex items-center justify-center w-6 h-6 font-bold rounded text-red-600 bg-red-100">
                            2
                        </p>
                    </div>
                    <p className="text-sm text-gray-900">
                        ඔබේ ලේ වර්ගය සහ පිහිටීම යාවත්කාලීන කර දායකයින්ට ඔබව සොයා ගැනීමට පහසු කරන්න.
                    </p>
                </div>
                <div className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-bold leading-5">ලේ ඉල්ලීමක් කරන්න</p>
                        <p className="flex items-center justify-center w-6 h-6 font-bold rounded text-red-600 bg-red-100">
                            3
                        </p>
                    </div>
                    <p className="text-sm text-gray-900">
                        ඔබට අවශ්‍ය ලේ වර්ගය, ප්‍රදේශය සහ අවශ්‍යතාවය සඳහන් කර ඉල්ලීමක් කරන්න.
                    </p>
                </div>
                <div className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-bold leading-5">දායකයින් සමඟ සම්බන්ධ වන්න</p>
                        <p className="flex items-center justify-center w-6 h-6 font-bold rounded text-red-600 bg-red-100">
                            4
                        </p>
                    </div>
                    <p className="text-sm text-gray-900">
                        ලේ ලබාදිය හැකි දායකයින් සමඟ සම්බන්ධ වී ඔවුන්ගේ සහාය ලබා ගන්න.
                    </p>
                </div>
            </div>
            <div className="text-center">
                <a
                    href="/register"
                    className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-red-600 hover:bg-red-700 focus:shadow-outline focus:outline-none"
                >
                    දැන් ලියාපදිංචි වන්න
                </a>
            </div>
        </div>
    );
}
