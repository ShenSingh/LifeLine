import { CloudArrowUpIcon, LockClosedIcon, ServerIcon, FingerPrintIcon } from '@heroicons/react/20/solid'
import Img01 from '../../../../public/assets/image/home-img01.png'

const features = [
    {
        name: 'අපැහැදිලි අවස්ථාවල ලේ දායකත්වය ඉක්මනින් අයදුම් කරන්න',
        description: 'පහසු, සාධාරණ, සහ විශ්වාසදායක ක්‍රමවේදයකින් ඔබේ ප්‍රදේශයේ දායකයින් සමඟ සම්බන්ධ වන්න.',
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
        icon: ServerIcon,
    },
    {
        name: 'ඉක්මනින් පරීක්ෂා කිරීම',
        description: 'දායකයින් සහ ප්‍රතිලාභීන්ගේ පැතිකඩ තහවුරු කර ඇත. දෙපාර්ශවය සඳහා විශ්වාසය සහ ��රක්ෂාව තහවුරු කිරීම.',
        icon: FingerPrintIcon,
    },

]

export default function HomeFeature01Comp() {
    return (
        <div className="overflow-hidden bg-blue-100 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pt-4 lg:pr-8">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base/7 font-semibold text-indigo-600">ඉක්මනින් ලේ ලබාදීම</h2>
                            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                                අත්‍යවශ්‍ය සහ විශ්වාසදායක ක්‍රමවේද
                            </p>
                            <p className="mt-6 text-lg/8 text-gray-600">
                                අපගේ පද්ධතිය හරහා ලේ අයදුම් කිරීම සහ දායකත්වය ලබා ගැනීම ඉතා පහසුයි. ඔබට අවශ්‍ය සහය ලබා දීමට අපි සූදානම්.
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-indigo-600" />
                                            {feature.name}
                                        </dt>{' '}
                                        <dd className="inline">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <img
                        alt="Blood donation process"
                        src={Img01}
                        width={2432}
                        height={1442}
                        className="w-[48rem] max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                    />
                </div>
            </div>
        </div>
    )
}
