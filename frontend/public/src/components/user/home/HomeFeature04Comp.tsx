export default function HomeFeature04Comp() {
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-full md:max-w-full lg:max-w-full md:px-24 lg:px-8 lg:py-20 bg-white w-full">
            <div className="max-w-screen-sm sm:text-center sm:mx-auto">
                <a
                    href="/"
                    aria-label="View"
                    className="inline-block mb-5 rounded-full sm:mx-auto"
                >
                    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-100">
                        <svg
                            className="w-12 h-12 text-red-600"
                            stroke="currentColor"
                            viewBox="0 0 52 52"
                        >
                            <polygon
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                                points="29 13 14 29 25 29 23 39 38 23 27 23"
                            />
                        </svg>
                    </div>
                </a>
                <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                    රුධිර දායකයින් හොයන වෙබ් අඩවිය
                </h2>
                <p className="text-base text-gray-700 md:text-lg sm:px-4">
                    අපි ඔබගේ දායම සහ සහයෝගය මගින් රුධිර දායකයින් සොයා ගැනීමට සහ
                    අවශ්‍යතාවයන් ඉටු කිරීමට කටයුතු කරමින් සිටිමු.
                    ඔබේ දායම ජීවිතයක් වෙනස් කළ හැක.
                </p>
                <hr className="w-full my-8 border-gray-300" />
            </div>
        </div>
    );
};
