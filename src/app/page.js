// src/app/page.js
import styles from "./page.module.css";
const baseURL = process.env.BASE_URL;

export default async function Home() {
    
    const res = await fetch(`${baseURL}/videos`, {
        cache:'no-store'
    });

    if (!res.ok) {
        console.error("Failed to fetch videos:", res.status, res.statusText);
        throw new Error("Failed to fetch videos"); 
    }

    const data = await res.json();
    const videoFeeds = data.videos || []; 
    const totalSlots = 9;
    const placeholderCount = totalSlots - videoFeeds.length;


    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1 className={styles.neonHeader}> ::. NETWORK VIEW .::</h1>

                <div className={styles.container}>
                    {videoFeeds.map((video) => (
                        <div key={video.id} className={styles.videos}>
                            <video 
                                src={video.video_files[0]?.link} 
                                className={styles.videoFeed}
                                autoPlay 
                                loop 
                                muted
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ))}
                    
                    {Array.from({ length: placeholderCount }).map((_, index) => (
                        <div key={`placeholder-${index}`} className={styles.videos}>
                           <p style={{ color: '#ff4444', fontSize: '1.5em', margin: 'auto' }}>[NODE OFFLINE]</p>
                        </div>
                    ))}

                </div>
            </main>
        </div>
    );
}