import { wave_animation, gradient_logo, plan_logo } from "./logo"
import Lottie from "lottie-react";

const LandingPage = () => {
    return (
        <div className="h-svh w-full flex justify-center overflow-hidden items-center">
            <h1 className="text-6xl font-bold text-white z-10 relative top-0 decoration-white">Welcome To BlogWave</h1>
            <div className="h-full w-full flex overflow-hidden justify-center items-center absolute flex-col">
          
                
                <Lottie className='w-full absolute z-1' animationData={wave_animation} />
            </div>
        </div>
    )
}

export default LandingPage;