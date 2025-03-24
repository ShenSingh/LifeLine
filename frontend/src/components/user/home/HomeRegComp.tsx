const stats = [
    { id: 1, name: 'ලැබුණු දායකයන්', value: '10,000+' },
    { id: 2, name: 'කැඳවුම් කළ දායම්', value: '500,000+' },
    { id: 3, name: 'මෙම වසරේ නව ලියාපදිංචි', value: '20,000+' },
]

export default function HomeRegComp() {
    return (
        <div className="relative bg-gradient-to-bl from-red-500 via-transparent">
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="grid items-center md:grid-cols-2 gap-8 lg:gap-12">
                    <div>
                        <p className="inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-red-600 to-pink-500 text-transparent">
                            රුධිර දායකයින් හොයන වේබ් අඩවිය: ජීවිත හෝ අරමුදල් රැකගැනීමේ ව්‍යාපාරයක්
                        </p>
                        <div className="mt-4 md:mb-12 max-w-2xl">
                            <h1 className="mb-4 font-semibold text-white text-4xl lg:text-5xl">
                                අපගේ මෙහෙවරට එකතු වන්න
                            </h1>
                            <p className="text-white">
                                අපි දායකයින් සහ අවශ්‍යතාවයන් හමුවේ, සැම ද්‍රව්‍යයක් අගයක් ගනී. ඔබගේ දායම ජීවිතයක් වෙනස්
                                කළ හැක.
                            </p>
                        </div>

                    </div>
                    <div>
                        <form>
                            <div className="lg:max-w-lg lg:mx-auto lg:me-0 ms-auto">
                                <div className="p-4 sm:p-7 flex flex-col bg-white rounded-2xl shadow-lg">
                                    <div className="text-center">
                                        <h1 className="block text-2xl font-bold text-gray-800">දායකයෙකු ලෙස ලියාපදිංචි වන්න</h1>
                                        <p className="mt-2 text-sm text-gray-600">
                                            දැනට ලියාපදිංචි වී තිබේද?
                                            <a className="text-red-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium" href="#">
                                                මෙහි ලොගින් වන්න
                                            </a>
                                        </p>
                                    </div>
                                    <div className="mt-5">
                                        <button type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                                            <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                                                <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4"></path>
                                                <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853"></path>
                                                <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05"></path>
                                                <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335"></path>
                                            </svg>
                                            ගූගල් සමඟ සයින් අප් වීම
                                        </button>
                                        <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">අනික්</div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button type="button" className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M19.502 10c0-.582-.049-1.134-.137-1.658H10v3.256h5.034c-.215 1.184-.844 2.188-1.762 2.748v2.285h2.846c1.673-1.543 2.632-3.878 2.632-6.63zM10 6.742V9.998h5.746c-.248-1.179-.974-2.184-1.924-2.848L10 6.742zM3.505 3.555C2.557 4.803 2 6.464 2 8.244c0 1.78.557 3.442 1.505 4.689L3.505 3.555zM5.13 7.697c.72-.658 1.62-1.136 2.6-1.396V5.507H4.266v1.8c1.029-.425 1.964-.848 2.864-1.109z"/></svg>
                                                ෆේස්බුක් සමඟ සයින් අප් වීම
                                            </button>
                                            <button type="button" className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10 20c5.522 0 10-4.478 10-10S15.522 0 10 0 0 4.478 0 10s4.478 10 10 10zm0-18c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm-1 12h2v-2h-2v2zm0-4h2V7h-2v5z"/></svg>
                                                ගූගල් සමඟ සයින් අප් වීම
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
