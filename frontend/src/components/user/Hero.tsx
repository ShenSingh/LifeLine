
const links = [
    { name: 'Home', href: '/' },
    { name: 'Find Donor', href: '/findDonor' },
    { name: 'About Us', href: '/aboutUs' },
    { name: 'Donor', href: '/donor' },
]
const stats = [
    { name: 'Hospitals partnered', value: '50+' },
    { name: 'Donors registered', value: '10,000+' },
    { name: 'Lives saved', value: '1,000+' },
    { name: 'Successful donations', value: '5,000+' },
]


export default function Example() {

    return (
        <div className="relative isolate overflow-hidden min-h-screen text-white">
            <video
                autoPlay
                muted
                playsInline
                className="absolute inset-0 -z-10 w-full h-full object-cover"
            >
                <source src="../../../public/assets/video/homeBackground.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div
                aria-hidden="true"
                className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="aspect-1097/845 w-[68.5625rem] bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                />
            </div>
            <div
                aria-hidden="true"
                className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="aspect-1097/845 w-[68.5625rem] bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                />
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 ml-10 mt-32">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                        රුධිර දායකයින් සම්බන්ධ කිරීම
                    </h2>
                    <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
                        ලේ බිඳක් දායක වන්න, ජීවිතයක් බේරා ගන්න...!
                    </p>
                </div>

                <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                    <div
                        className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                        {links.map((link) => (
                            <a key={link.name} href={link.href}>
                                {link.name} <span aria-hidden="true">&rarr;</span>
                            </a>
                        ))}
                    </div>
                    <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.name} className="flex flex-col-reverse gap-1">
                                <dt className="text-base/7 text-gray-300">{stat.name}</dt>
                                <dd className="text-4xl font-semibold tracking-tight text-white">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
