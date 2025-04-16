import { Component } from 'react';

class DonorDetails01Comp extends Component {
    render() {
        return (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 bg-white shadow-lg rounded-lg p-8 lg:p-12">
                    {/* Image Section */}
                    <div className="w-full lg:w-2/5">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCoWSGI9i_h2JoKrWz6lBYKKeNgPUuO0QXmA&s"
                            className="w-full rounded-lg shadow-md"
                            alt="Blood Donation"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="w-full lg:w-3/5">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                            Can you donate blood?
                        </h1>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            රුධිර පරිත්‍යාගශීලියෙකු ලෙස පිළිගැනීමට නිර්ණායක කිහිපයක් සපුරාලිය යුතුය.
                            පරිත්‍යාග කරන්නාගේ ආරක්ෂාව මෙන්ම පරිත්‍යාග කරන ලද රුධිරයේ ගුණාත්මකභාවය
                            සහතික කිරීම සඳහා මෙම නිර්ණායක දක්වා ඇත.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            ඔබත් රුධිර දායකයකු වීමට නම්,
                        </p>
                        <ul className="list-disc pl-5 text-gray-700 space-y-2">
                            <li>වයස අවුරුදු 18ත් 60ත් අතර (පළමු වර අවුරුදු 55)</li>
                            <li>බර කි.ග්. 50ට වැඩි</li>
                            <li>පෙර අවස්ථාවේදී රුධිරය ලබා දී මාස 4ක් සම්පුර්න</li>
                            <li>රුධිර හිමොග්ලොබින් ප්‍රමාණය 12.5g/dl හෝ ඊට වඩා වැඩි</li>
                            <li>ගර්භ නිභාවයෙන් හෝ රෝග තත්වයකින් නොපෙළෙන</li>
                            <li>විදෙස් ගත වී යලි මෙරටට පැමිණ අවම මාස 3කට වඩා වැඩි</li>
                            <li>අවදානම් හැසිරීම් වලින් තොර පුද්ගලයකු විය යුතුය</li>
                        </ul>

                    </div>
                </div>
            </div>
        );
    }
}

export default DonorDetails01Comp;
