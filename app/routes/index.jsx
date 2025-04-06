import React from 'react'

export default function MainHome() {
  return (
    <div>

    <div className="preloader">
        <img src="../assets/logo.svg" alt="Preloader Logo" />
    </div>

<header className="d2c_navbar sticky-top">
    <div className="container">
 
        <nav className="navbar navbar-expand-lg" id="d2c_main_nav">
   
            <a className="navbar-brand" href="./index.html"><img src="../assets/logo.svg" className="w-100" alt="Logo" /></a>
        
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span><i className="fas fa-bars"></i></span>
            </button>
    

            
            <div className="collapse navbar-collapse js-clone-nav justify-content-end">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active" href="./index.html">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="./pages/about.html">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="./pages/service.html">service</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="./pages/project.html">Project</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="./pages/blog.html">Blog</a>
                    </li>
                    <li className="nav-item">
                        <a className="btn d2c_nav_btn" href="./pages/contact.html">Contact Me</a>
                    </li>
                </ul>
            </div>
   
        </nav>
 

        
        <div className="collapse navbar-collapse d2c_mobile_view" id="navbarSupportedContent">
            <div className="show_width container">
                <div className="text-right">
                    <button className="navbar-toggler d2c_cross_btn p-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span><i className="fa fa-times"></i></span>
                    </button>
                </div>
                
                <div className="navbar d2c_mobile_view_body"></div>
            </div>
        </div>

    </div>
</header>



<section className="d2c_hero_wrapper">
    <div className="container">
        <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-start order-1 order-lg-0 wow fadeInLeft">
                <h6>Welcome to ReactProx</h6>
                <h1>I am <span>Flordir Forhed</span></h1>
                <h5>React Developer</h5>
                <p className="pe-0 pe-xl-5">Welcome to ReactProx, where i am innovation meets React development. Explore my portfolio web solutions.</p>
                <a href="./pages/contact.html" className="btn">Hire Me</a>
                <a href="./pages/about.html" className="btn secondary_btn">Learn More</a>
            </div>
            <div className="col-lg-6 order-0 order-lg-1 mb-5 mb-lg-0 wow fadeInRight">
                <div className="d2c_hero_img_wrapper mx-auto">
                    <div className="d2c_img_wrapper">
                        <img src="../assets/hero_img.jpg" className="w-100 h-100 rounded-3" alt="Hero Image" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>



<section className="d2c_about_wrapper">
    <div className="container">
        <div className="row align-items-center">
            <div className="col-lg-6 wow fadeInLeft">
                <div className="d2c_about_img_wrapper mb-5 mb-lg-0 mx-auto mx-lg-0">
                    <div className="d2c_img_wrapper">
                        <img src="../assets/about_img.jpg" className="w-100 h-100 rounded-3" alt="Hero Image" />
                    </div>
                </div>
            </div>
            <div className="col-lg-6 text-center text-lg-start wow fadeInRight">
                <h2>Get to Know Me</h2>
                <p className="mb-2">Curious about the person behind ReactProx? Dive into my story, skills, and the journey that led me to the world of best for the React development. Let's connect on a personal level.</p>
                <p className="d2c_about_content">I've been part of the team that has built the front-end for an enterprise level web application in AngularJS. I've been a part of a team that has built a social network from scratch in Meteor.</p>
                <h5>How can i help you</h5>
                <p>I've diverse background in technology, which mean I'm always learning new skills. I've worked with a wide range of technologies, including MS SQL Server and Python. One of my favorite characteristics of an employer is their passion for the work they are doing.</p>
                <a href="./pages/contact.html" className="btn mt-3">Hire Me</a>
            </div>
        </div>
    </div>
</section>



<section className="d2c_services_wrapper text-center">
    <div className="container">
        <div className="row">
            <div className="col-md-10 col-lg-8 col-xl-6 offset-md-1 offset-lg-2 offset-xl-3 text-center wow fadeInDown">
                <h2>What do i offer</h2>
                <p>Curious about the person behind ReactProx? Dive into my story, skills, and the journey that led me to the world of React development.</p>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 col-lg-4 mb-4 wow fadeInLeft">
                <div className="d2c_service_card">
                    <div className="d2c_img_wrapper d-flex justify-content-center align-items-center">
                        <img src="../assets/service_icon_one.png" className="img-fluid" alt="haha" />
                    </div>
                    <h5>Web Application</h5>
                    <p className="mb-0">Designing and developing interactive and web applications using React</p>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 wow fadeInDown">
                <div className="d2c_service_card">
                    <div className="d2c_img_wrapper d-flex justify-content-center align-items-center">
                        <img src="../assets/service_icon_two.png" className="img-fluid" alt="haha" />
                    </div>
                    <h5>Single Page Applications</h5>
                    <p className="mb-0">Building SPAs that provide a seamless and fluid user experience</p>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 wow fadeInRight">
                <div className="d2c_service_card">
                    <div className="d2c_img_wrapper d-flex justify-content-center align-items-center">
                        <img src="../assets/service_icon_three.png" className="img-fluid" alt="haha" />
                    </div>
                    <h5>Custom Component</h5>
                    <p className="mb-0">Developing reusable and modular UI components using React'sre.</p>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0 wow fadeInLeft">
                <div className="d2c_service_card">
                    <div className="d2c_img_wrapper d-flex justify-content-center align-items-center">
                        <img src="../assets/service_icon_four.png" className="img-fluid" alt="haha" />
                    </div>
                    <h5>Integration with APIs</h5>
                    <p className="mb-0">Integrating web applications with various APIs to fetch</p>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 mb-md-0 wow fadeInUp">
                <div className="d2c_service_card">
                    <div className="d2c_img_wrapper d-flex justify-content-center align-items-center">
                        <img src="../assets/service_icon_five.png" className="img-fluid" alt="haha" />
                    </div>
                    <h5>State Management</h5>
                    <p className="mb-0">Implementing state management using React's built-in state or external</p>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 wow fadeInRight">
                <div className="d2c_service_card">
                    <div className="d2c_img_wrapper d-flex justify-content-center align-items-center">
                        <img src="../assets/service_icon_six.png" className="img-fluid" alt="haha" />
                    </div>
                    <h5>UI Design and Optimization</h5>
                    <p className="mb-0">Creating visually appealing user interfaces with a focus on usability</p>
                </div>
            </div>
        </div>
        <a href="./pages/service.html" className="btn secondary_btn">View More</a>
    </div>
</section>

<section className="d2c_project_wrapper text-center">
    <div className="container">
        <h2>recent Projects</h2>
        <p>I've diverse background in technology, which mean I'm always learning new skills.</p>
        <div className="row">
            <div className="col-md-6 col-lg-4 mb-4 wow fadeInLeft">
                <div className="d2c_img_wrapper">
                    <img src="../assets/project_img_one.jpg" className="w-100 h-100 rounded-3" alt="Project Image"/>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 mb-md-0 wow fadeInDown">
                <div className="d2c_img_wrapper">
                    <img src="../assets/project_img_two.jpg" className="w-100 h-100 rounded-3" alt="Project Image"/>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0 wow fadeInRight">
                <div className="d2c_img_wrapper">
                    <img src="../assets/project_img_three.jpg" className="w-100 h-100 rounded-3" alt="Project Image"/>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 mb-md-0 wow fadeInLeft">
                <div className="d2c_img_wrapper">
                    <img src="../assets/project_img_four.jpg" className="w-100 h-100 rounded-3" alt="Project Image"/>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 mb-md-0 wow fadeInUp">
                <div className="d2c_img_wrapper">
                    <img src="../assets/project_img_five.jpg" className="w-100 h-100 rounded-3" alt="Project Image"/>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 wow fadeInRight">
                <div className="d2c_img_wrapper">
                    <img src="../assets/project_img_six.jpg" className="w-100 h-100 rounded-3" alt="Project Image"/>
                </div>
            </div>
        </div>
        <a href="./pages/project.html" className="btn">See more</a>
    </div>
</section>



<section className="d2c_testimonial_wrapper">
    <div className="container">
        <h2 className="text-center">What the People Thinks About me</h2>
        <div className="row d2c_testimonial_slider">
            <div className="col">
                <div className="d2c_card">
                    <div className="d2c_customer_info_wrapper d-flex align-items-center">
                        <div className="d2c_img_wrapper">
                            <img src="../assets/testimonial_img_one.jpg" className="w-100 h-100" alt="Testimonial One" />
                        </div>
                        <div className="d2c_customer_info">
                            <h5>Nattasha Mith</h5>
                            <p className="mb-0"><span>Alaska, USA</span></p>
                        </div>
                    </div>
                    <p className="d2c_testimonial_content">I'm a very particular person who likes to order a site done. I just told him an idea without any clear plan he did</p>
                </div>
            </div>
            <div className="col">
                <div className="d2c_card">
                    <div className="d2c_customer_info_wrapper d-flex align-items-center">
                        <div className="d2c_img_wrapper">
                            <img src="../assets/testimonial_img_two.jpg" className="w-100 h-100" alt="Testimonial One" />
                        </div>
                        <div className="d2c_customer_info">
                            <h5>ray galario</h5>
                            <p className="mb-0"><span>Sydney, Australia</span></p>
                        </div>
                    </div>
                    <p className="d2c_testimonial_content">Reactprox did a great job creating our site for us. He was a very good  responsive, answered all of our QA.</p>
                </div>
            </div>
            <div className="col">
                <div className="d2c_card">
                    <div className="d2c_customer_info_wrapper d-flex align-items-center">
                        <div className="d2c_img_wrapper">
                            <img src="../assets/testimonial_img_three.jpg" className="w-100 h-100" alt="Testimonial One"/>
                        </div>
                        <div className="d2c_customer_info">
                            <h5>Benny Roll</h5>
                            <p className="mb-0"><span>NewYork, USA</span></p>
                        </div>
                    </div>
                    <p className="d2c_testimonial_content">Tanahair is the friendliest and most efficient company I have ever used. The whole thing takes time</p>
                </div>
            </div>
            <div className="col">
                <div className="d2c_card">
                    <div className="d2c_customer_info_wrapper d-flex align-items-center">
                        <div className="d2c_img_wrapper">
                            <img src="../assets/testimonial_img_three.jpg" className="w-100 h-100" alt="Testimonial One"/>
                        </div>
                        <div className="d2c_customer_info">
                            <h5>Benny Roll</h5>
                            <p className="mb-0"><span>NewYork, USA</span></p>
                        </div>
                    </div>
                    <p className="d2c_testimonial_content">Tanahair is the friendliest and most efficient company I have ever used. The whole thing takes time</p>
                </div>
            </div>
        </div>
    </div>
</section>



<section className="d2c_c2a_wrapper text-center">
    <div className="container">
        <div className="d2c_c2a_box wow fadeInUp">
            <h2>Wanna join with me?</h2>
            <p>It is a long established fact will be distracted.</p>
            <a href="./pages/contact.html" className="btn">Contact with me</a>
        </div>
    </div>
</section>


<section className="d2c_blog_wrapper text-center">
    <div className="container">
        <div className="row">
            <div className="col-md-8 offset-md-2 text-center wow fadeInDown">
                <h2>Articles & News</h2>
                <p>It is a long established fact that a reader will be distracted by the of readable content of a page when lookings at its layouts the points of using.</p>
            </div>
        </div>
        <div className="row wow fadeInUp">
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="d2c_card">
                    <div className="d2c_img_wrapper">
                        <img src="../assets/blog_img_one.jpg" className="w-100 h-100" alt="Blog Image"/>
                    </div>
                    <div className="row d2c_blog_title_wrapper align-items-center">
                        <div className="col-9 col-xl-10">
                            <a href="#"><p className="mb-0">Let's Get Solution For Building Construction Work</p></a>
                        </div>
                        <div className="col-3 col-xl-2">
                            <div className="d2c_icon_wrapper">
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="d2c_card">
                    <div className="d2c_img_wrapper">
                        <img src="../assets/blog_img_two.jpg" className="w-100 h-100" alt="Blog Image"/>
                    </div>
                    <div className="row d2c_blog_title_wrapper align-items-center">
                        <div className="col-9 col-xl-10">
                            <a href="#"><p className="mb-0">Quick Tips for Time-Strapped Individuals solutions</p></a>
                        </div>
                        <div className="col-3 col-xl-2">
                            <div className="d2c_icon_wrapper">
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-0">
                <div className="d2c_card">
                    <div className="d2c_img_wrapper">
                        <img src="../assets/blog_img_three.jpg" className="w-100 h-100" alt="Blog Image"/>
                    </div>
                    <div className="row d2c_blog_title_wrapper align-items-center">
                        <div className="col-9 col-xl-10">
                            <a href="#"><p className="mb-0">DataAI - Free Tailwind App Landing Page Template</p></a>
                        </div>
                        <div className="col-3 col-xl-2">
                            <div className="d2c_icon_wrapper">
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a href="./pages/blog.html" className="btn">View More</a>
    </div>
</section>



<footer className="d2c_footer_wrapper">
    <div className="container">
        <div className="row">
            <div className="col-md-10 col-lg-4 mb-4 mb-lg-0 wow fadeInLeft">
                <a href="./index.html"><img src="../assets/footer_logo.svg" alt="Footer Logo"/></a>
                <p className="mb-0">I've been working as web developer for the past two years, and have experience</p>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 mb-md-0 wow fadeInUp">
                <div className="d2c_contact_details">
                    <h5>Contact Details</h5>
                    <div className="d2c_info_wrapper d-flex align-items-center mb-2">
                        <a href="tel:882195550114" className="d2c_icon_wrapper"><i className="fas fa-phone-alt"></i></a>
                        <p className="mb-0">+88 219 555-0114</p>
                    </div>
                    <div className="d2c_info_wrapper d-flex align-items-center mb-2">
                        <a href="mailto:reactprox@mail.com" className="d2c_icon_wrapper"><i className="fas fa-envelope"></i></a>
                        <p className="mb-0">reactprox@mail.com</p>
                    </div>
                    <div className="d2c_info_wrapper d-flex align-items-center">
                        <a href="https://www.google.com/maps/search/Royal+2464+Ln.+Mesa,+New+Jersey/@40.0677546,-76.0433962,8z/data=!3m1!4b1?entry=ttu" target="_blank" className="d2c_icon_wrapper"><i className="fas fa-map-marker-alt"></i></a>
                        <p className="mb-0">Royal 2464 Ln. Mesa, New Jersey</p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 wow fadeInRight">
                <div className="d2c_footer_newsletter">
                    <h5>Newsletter</h5>
                    <form className="needs-validation" novalidate>
                        <div className="input-group h-100">
                            <input type="email" className="form-control" placeholder="input your email:" aria-describedby="newsletter_btn" autoComplete="on" required/>
                            <button className="btn" type="submit" id="newsletter_btn"><i className="fas fa-paper-plane"></i></button>
                        </div>
                    </form>
                    <ul className="list-group list-group-horizontal">
                        <li>
                            <a href="https://www.facebook.com/Designtocodes" target="_blank" className="d2c_icon_wrapper"><i className="fab fa-facebook-f"></i></a>
                        </li>
                        <li>
                            <a href="https://twitter.com/DesignToCodes" target="_blank" className="d2c_icon_wrapper"><i className="fab fa-twitter"></i></a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/company/designtocodes/" target="_blank" className="d2c_icon_wrapper"><i className="fab fa-linkedin-in"></i></a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/designtocodes/" target="_blank" className="d2c_icon_wrapper"><i className="fab fa-instagram"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </footer>
    </div>
  )
}
