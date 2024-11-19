import React, { useEffect } from "react";

export const AdDisplay = () => {
    useEffect(() => {
        const pushAd = () => {
            try {
                const adsbygoogle = window.adsbygoogle;
                console.log({ adsbygoogle });
                adsbygoogle.push({});
            } catch (e) {
                console.error(e);
            }
        };

        let interval = setInterval(() => {
            // Check if Adsense script is loaded every 300ms
            if (window.adsbygoogle) {
                pushAd();
                // clear the interval once the ad is pushed so that function isn't called indefinitely
                clearInterval(interval);
            }
        }, 300);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%", height: "100%" }}
            data-ad-client="ca-pub-3661072753763430"
            data-ad-slot="3619707119"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
    );
};
