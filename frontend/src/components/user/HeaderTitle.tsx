interface HeaderTitleProps {
    title: string;
    img?: string;
    description: string;
}
export default function HeaderTitle({ title, img, description }: HeaderTitleProps) {
    const imgPath = img || "https://source.unsplash.com/1600x900/?nature,water";

    return (
        <div
            className="hero h-[500px] bg-cover bg-center"
            style={{ backgroundImage: `url(${imgPath})` }}
        >
            <div className="hero-overlay bg-opacity-50"></div>
            <div className="hero-content flex items-center justify-center text-center text-black">
                <div>
                    <h1 className="text-5xl text-red-50 font-bold">{title}</h1>
                    <p className="py-6">{description}</p>
                </div>
            </div>
        </div>
    );
}
