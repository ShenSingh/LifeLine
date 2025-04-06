export default function AboutInApp() {
    return (
        <div className="relative flex flex-col-reverse px-4 py-16 mx-auto lg:block lg:flex-col lg:py-32 xl:py-48 md:px-8 sm:max-w-xl md:max-w-full bg-white">
            <div className="z-0 flex justify-center h-full -mx-4 overflow-hidden lg:pt-24 lg:pb-16 lg:pr-8 xl:pr-0 lg:w-1/2 lg:absolute lg:justify-end lg:bottom-0 lg:left-0 lg:items-center">
                <img
                    src="https://kitwind.io/assets/kometa/laptop.png"
                    className="object-cover object-right w-full h-auto lg:w-auto lg:h-full"
                    alt="Blood Donation Illustration"
                />
            </div>
            <div className="relative flex justify-end max-w-xl mx-auto xl:pr-32 lg:max-w-screen-xl">
                <div className="mb-16 lg:pr-5 lg:max-w-lg lg:mb-0">
                    <div className="max-w-xl mb-6">
                        <div>
                            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                                පරිත්‍යාගශීලීන් සම්බන්ධ කිරීම...
                            </p>
                        </div>
                        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                            Welcome to the Sri Lanka <span className="text-red-500">Blood Donation Finder</span>
                    </h2>

                    <p className="text-base text-gray-700 md:text-lg">
                            රුධිර පරිත්‍යාගශීලීන් සහ අවශ්‍යතා ඇති ලබන්නන් අතර පරතරය පියවීම සඳහා කැප වූ තීරණාත්මක වේදිකාවක් වන ශ්‍රී ලංකා රුධිර පරිත්‍යාග සොයන්නා වෙබ් අඩවියට සාදරයෙන් පිළිගනිමු. රුධිරය සඳහා කාලෝචිත ප්‍රවේශය ජීවිතය හා මරණය අතර කාරණයක් විය හැකි රටක, අපගේ වෙබ් අඩවිය පුළුල් විසඳුමක් ලබා දීමට උත්සාහ කරයි. බුද්ධිමය අතුරු මුහුණතක් හරහා, පරිශීලකයින්ට පහසුවෙන් අසල ඇති රුධිර පරිත්‍යාග මධ්‍යස්ථාන සොයා ගත හැකි අතර ඉදිරි සිදුවීම් පිළිබඳව දැනුවත්ව සිටිය හැකිය. පරිශීලක-හිතකාමී විශේෂාංග කෙරෙහි අවධාරණය කිරීම මගින් ක්‍රියාවලිය සරල කිරීම අරමුණු කර ගෙන ඇති අතර, මෙම උතුම් කාර්යයට සහභාගී වීමට වැඩි පුද්ගලයින් දිරිමත් කරයි.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
