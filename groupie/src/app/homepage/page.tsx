import MusicPlayer from "@/components/MusicPlayer";

const Page = () => {
    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center space-y-4">
            <h1>Homepage</h1>
            <p>Welcome to the homepage</p>
            <MusicPlayer
                trackName="Track Name"
                artistName="Artist Name"
            />
        </div>
    );
};

export default Page;
