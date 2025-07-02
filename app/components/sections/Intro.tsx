import { KprButton } from "../KprButton";

const Intro = () => {
    return (
        <section className="entrance-message">
            <div className="h-full col-center gap-10">
                <img src="/images/kpr-logo.png" alt="logo" className="entrance-logo"/>
                <div className="text-wrapper">
                    <h3 className="gradient-title">
                    THE EVOLUTION OF MODERN BILLIARDS
                    </h3>
                </div>
                <div className="flex-center gap-10">
                    {/* <KprButton variant="primary">Traditional</KprButton>
                    <KprButton variant="secondary">Hybrid</KprButton>
                    <KprButton variant="primary">Modern</KprButton> */}
                    <img src="/images/ps-logo.svg" alt="ps" className="md:w-32 w-20" />
                    <img src="/images/x-logo.svg" alt="ps" className="md:w-58 w-40" />
                    
                </div>
            </div>
        </section>
    )
}

export default Intro;