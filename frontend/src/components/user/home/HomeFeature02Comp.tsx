import { CloudArrowUpIcon, LockClosedIcon, ArrowPathIcon, FingerPrintIcon } from '@heroicons/react/24/outline';

const features = [
    {
        name: 'ඉක්මනින් ලේ අයදුම් කිරීම',
        description: 'අපැහැදිලි අවස්ථාවල ලේ දායකත්වය ඉක්මනින් අයදුම් කරන්න. පහසු, සාධාරණ, සහ විශ්වාසදායක ක්‍රමවේදයකින් ඔබේ ප්‍රදේශයේ දායකයින් සමඟ සම්බන්ධ වන්න.',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'සුරක්ෂිත දායක පැතිකඩ',
        description: 'සියලු දායක තොරතුරු සුරක්ෂිතව ආරක්ෂා කර ඇත. ඔබේ පෞද්ගලිකත්වය අපට අගයයි.',
        icon: LockClosedIcon,
    },
    {
        name: 'සරල දායකත්ව ක්‍රියාවලිය',
        description: 'ලේ අයදුම් කිරීම සහ පාලනය කිරීම පහසුයි. දායකයින් සහ ප්‍රතිලාභීන් සඳහා පරිශීලක මිතුරන් පද්ධතියක්.',
        icon: ArrowPathIcon,
    },
    {
        name: 'ඉක්මනින් පරීක්ෂා කිරීම',
        description: 'දායකයින් සහ ප්‍රතිලාභීන්ගේ පැතිකඩ තහවුරු කර ඇත. දෙපාර්ශවය සඳහා විශ්වාසය සහ ආරක්ෂාව තහවුරු කිරීම.',
        icon: FingerPrintIcon,
    },
];

export default function SinhalaFeatures() {
    return (
        <div className="bg-white py-24 sm:py-32 font-sinhala">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-lg font-semibold text-red-600">ලේ සොයා ගැනීමට සහ දායකත්වය ලබාදීමට</h2>
                    <p className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        ඔබට අවශ්‍ය සියලු දේ
                    </p>
                    <p className="mt-6 text-lg text-gray-600">
                        ඔබේ අවශ්‍යතාවයට පරිපූර්ණ ලේ දායකයා සොයා ගැනීම සහ දායකත්වය ලබාදීම පහසුයි. විශ්වාසවන්ත සහ සරල ක්‍රමවේදයකින් ඔබට සහය දැක්වීමට අපි සූදානම්.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl lg:mt-24 lg:max-w-4xl">
                    <dl className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative p-6 bg-gray-100 rounded-lg shadow-lg">
                                <div className="absolute -top-5 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-600">
                                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                                </div>
                                <dt className="mt-6 text-xl font-bold text-gray-900">{feature.name}</dt>
                                <dd className="mt-2 text-base text-gray-700">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
