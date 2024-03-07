import profile from "../assets/profile.svg"
import linkedIn from "../assets/linkedin.svg"
import discord from "../assets/discord.svg"
import twitter from "../assets/twitter.svg"
import github from "../assets/github.svg"

const About = () => {
    return <>

        <section className="py-3 py-md-5">
            <div className="container">
                <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
                    <div className="col-12 col-lg-6 col-xl-5">
                        <img src={profile} style={{ height: "400px" }} alt="" />
                    </div>
                    <div className="col-12 col-lg-6 col-xl-7">
                        <div className="row justify-content-xl-center">
                            <div className="col-12 col-xl-11">
                                <h2 className="mb-3">Who Are We?</h2>
                                <p className="lead fs-4 text-secondary mb-3">Piyush is a full stack developer guy who uses the lastest MERN technologies to build responsive website.</p>
                                <p className="mb-5">

                                    He is a dedicated developer having expertise in the MERN stack, Bootstrap, Tailwind, TypeScript, and Firebase, to deliever, high-quality, scalable websites.
                                </p>
                                <div className="row gy-4 gy-md-0 gx-xxl-5X">
                                    <div className="col-12 col-md-6">
                                        <div className="d-flex">
                                            <div className="me-4 text-primary">

                                            </div>
                                            <div>
                                                <h2 className="h4 mb-3">Responsive dynamic websites</h2>
                                                <p className="text-secondary mb-0">He is crafting a digital method that subsists life across all mediums.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="d-flex">
                                            <div className="me-4 text-primary">

                                            </div>
                                            <div>
                                                <h2 className="h4 mb-3">Latest technologies</h2>
                                                <p className="text-secondary mb-0">He believes in innovation by merging primary with elaborate ideas.</p>
                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="container p-4">
                <span>Connect</span>
                <a href="https://www.linkedin.com/in/piyush-kumar-jha-a29619239/" target="_blank">
                    <img className="m-2" src={linkedIn} height={30} width={30} alt="" />
                </a>

                <a href="https://github.com/Piyush5784" target="_blank">
                    <img className="m-2" src={github} height={30} width={30} alt="" />
                </a>

                <a href="https://twitter.com/Piyush5784" target="_blank">
                    <img className="m-2" src={twitter} height={30} width={30} alt="" />
                </a>
                <a href="https://discord.com/" target="_blank">
                    <img className="m-2" src={discord} height={30} width={30} alt="" />
                </a>
            </div>

        </section>
    </>
};

export default About;

