import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Image from "next/image";
import Logo from "@/assets/icon.png";

export default function SplashScreen() {
    return (
        <>
            <Backdrop
                sx={(theme) => ({
                    color: '#fff',
                    zIndex: theme.zIndex.drawer + 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                    background: "rgba(41, 90, 164, 1)",
                })}
                open={true}
            >
                <Image
                    src={Logo}
                    alt="App Logo"
                    width={110}
                    height={110}
                    priority
                    style={{
                        borderRadius: "20px",
                        animation: "pulseGlow 2s infinite ease-in-out",
                    }}
                />

                <CircularProgress color="inherit" size={15} />
            </Backdrop>

            <style jsx>{`
                @keyframes pulseGlow {
                    0% {
                        box-shadow: 0 0 10px rgba(255,255,255,0.4);
                    }
                    50% {
                        box-shadow: 0 0 25px rgba(255,255,255,0.9);
                    }
                    100% {
                        box-shadow: 0 0 10px rgba(255,255,255,0.4);
                    }
                }
            `}</style>
        </>
    );
}
