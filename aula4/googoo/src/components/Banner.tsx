type BannerProps = {
    data: {
        title: string;
        text: string;
    }
};

export const Banner: React.FC<BannerProps> = ({data}) => {
    return (
        <div className="banner">
        <h1 className="banner-title">{data.title}</h1>
        <p className="banner-text">{data.text}</p>
        </div>
    )
}

export default Banner