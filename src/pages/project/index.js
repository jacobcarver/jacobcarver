import { useEffect, useRef } from 'react';
import { TweenLite, Power2 } from 'gsap';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import './project.scss';

// Components
import SEO from '../../components/seo';
import NextProject from '../../components/next-project';

const ProjectPage = ({ setIndex, i, history, project, scrollPosition }) => {
  let images = useRef([]);
  const afterLoad = num => {
    TweenLite.to(images.current[num], 1, {
      opacity: 1,
      ease: Power2.easeInOut,
      onComplete: () => {
        console.log(`image ${num} loaded`)
      }
    })
  }
  useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div id="project-page">
      <SEO title={`Jacob Carver | ${project.title}`} />
			<section>
				<main>
					<div className="project-technology">
						<div className="inner">
							{project.tech_front.length > 0 ?
							<div className="col">
								<h6>Front End</h6>
								<ul>
									{project.tech_front.map((t, i) => {
										return (
											<li key={t}>{t}</li>
										)
									})}
								</ul>
							</div> : null}
							{project.tech_back.length > 0 ?
							<div className="col">
								<h6>Back End</h6>
								<ul>
									{project.tech_back.map((t, i) => {
										return (
											<li key={t}>{t}</li>
										)
									})}
								</ul>
							</div> : null}
							{project.tech_other.length > 0 ?
							<div className="col">
								<h6>Other</h6>
								<ul>
									{project.tech_other.map((t, i) => {
										return (
											<li key={t}>{t}</li>
										)
									})}
								</ul>
							</div> : null}
						</div>
					</div>
					<div className="project-screenshots">
						<div className="inner">
							{project.images.slice(0, 4).map((image, num) => {
								return (
									<div className="row" ref={el => images.current[num] = el} key={num}>
										<div className="image-container" style={{backgroundColor: project.placeholderColor}}>
                      <LazyLoadImage
                        alt={`${image}`}
                        scrollPosition={scrollPosition}
                        src={image}
                        height="100%"
                        width="100%"
                        threshold={0}
                        afterLoad={() => afterLoad(num)} />
										</div>
                    <p>Desktop Preview - {num + 1}</p>
									</div>
								)
							})}
						</div>
					</div>
					<div className="project-info">
						<div className="inner">
							<h1>Info</h1>
							<p>{project.desc[0]}</p>
							{project.desc[1] !== undefined ? <p>{project.desc[1]}</p> : null}
							<div className="btns">
								<a href={project.link_site}>Website</a>
								<a className={project.link_code === 'private' ? 'disable' : ''} href={project.link_code === 'private' ? '' : project.link_code}>{project.link_code === 'private' ? 'Private Repo' : 'Code'}</a>
							</div>
						</div>
					</div>
					<div className="project-screenshots-mobile" id="mobile-sc">
						<div className="inner">
							<div className="boxes">
								{project.images.slice(4).map((image, num) => {
									return (
										<div className="image-box" ref={el => images.current[num + 4] = el} key={num}>
											<div className="box" style={{backgroundColor: project.placeholderColor}}>
                        <LazyLoadImage
                          alt={`${image}`}
                          scrollPosition={scrollPosition}
                          src={image}
                          height="100%"
                          width="100%"
                          threshold={0}
                          afterLoad={() => afterLoad(num + 4)} />
											</div>
                      <p>Mobile Preview - {num + 1}</p>
										</div>
									)
								})}
							</div>
						</div>
					</div>
					<div className="project-colors">
						<div className="inner">
							{project.colors.map(color => {
								return (
									<div key={color} className="col" style={{width: `${100 / project.colors.length}%`}}>
										<div className="color">
											<div className="color-preview" style={{background: `${color}`}}></div>
											<h6 className="color-value">{color}</h6>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</main>
				<NextProject history={history} currentPage={window.location.pathname} setIndex={setIndex} />
			</section>
		</div>
	)
}

export default trackWindowScroll(ProjectPage);