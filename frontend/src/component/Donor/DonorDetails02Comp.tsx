import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid';



export default function HeroBanner() {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse gap-12">
                <div className="w-2/5">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                        className="w-full rounded-lg shadow-2xl"
                        alt="Blood Donation"
                    />
                </div>

                <div className="w-3/5">
                    <h1 className="text-5xl font-bold">Can you donate blood?</h1>
                    <p className="py-6">
                        රුධිර පරිත්‍යාගශීලියෙකු ලෙස පිළිගැනීමට නිර්ණායක කිහිපයක් සපුරාලිය යුතුය.
                        පරිත්‍යාග කරන්නාගේ ආරක්ෂාව මෙන්ම පරිත්‍යාග කරන ලද රුධිරයේ ගුණාත්මකභාවය
                        සහතික කිරීම සඳහා මෙම නිර්ණායක දක්වා ඇත.
                    </p>
                    <p className="py-2">
                        ඔබත් රුධිර දායකයකු වීමට නම්,
                    </p>
                    <ul className="list-disc pl-5">
                        <li>වයස අවුරුදු 18ත් 60ත් අතර (පළමු වර අවුරුදු 55)</li>
                        <li>බර කි.ග්. 50ට වැඩි</li>
                        <li>පෙර අවස්ථාවේදී රුධිරය ලබා දී මාස 4ක් සම්පුර්න</li>
                        <li>රුධිර හිමොග්ලොබින් ප්‍රමාණය 12.5g/dl හෝ ඊට වඩා වැඩි</li>
                        <li>ගර්භ නිභාවයෙන් හෝ රෝග තත්වයකින් නොපෙළෙන</li>
                        <li>විදෙස් ගත වී යලි මෙරටට පැමිණ අවම මාස 3කට වඩා වැඩි</li>
                        <li>අවදානම් හැසිරීම් වලින් තොර පුද්ගලයකු විය යුතුය</li>
                    </ul>
                    <button className="btn btn-primary mt-4">Learn More</button>
                </div>
            </div>
        </div>
    );
}
