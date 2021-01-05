import { useState, useReducer, useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { TweenMax, TweenLite, Power1, Power3 } from 'gsap';
import validator from 'email-validator';
import close from '../../images/close.svg';
import loadingImage from '../../images/spinner.svg';
import './about.scss';

export default function About() {
  const API_URL = 'https://whispering-forest-67927.herokuapp.com/contact';
	const [loading, toggleLoading] = useState(false);
	const [modalIsOpen, toggleModal] = useState(false);
	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({
			...state,
			...newState
		}), {
			name: '',
			email: '',
			message: ''
		}
	);
	const { name, email, message } = userInput;
	const [captcha, handleCaptcha] = useState('');
	let modal = useRef(null);
	let row = useRef([]);
	const handleChange = e => {
		var name = e.target.name;
		var newValue = e.target.value;
		setUserInput({ [name]: newValue });
	}
	const handleFormSubmit = (e) => {
		e.preventDefault();
		toggleLoading(true);
		if (captcha.length > 1 && validator.validate(email)) {
			axios.post(API_URL, {
				name: name,
				email: email,
				message: message
			})
			.then(() => {
				toggleLoading(false);
			})
			.then(() => {
				// close modal
				setUserInput({ name: '', email: '', message: '' });
				toggleModal(false);
			})
			.catch((error) => {
					console.error(error);
			});
		}
	}
	// handle modal animations
	useEffect(() => {
		if (modalIsOpen) {
			document.querySelector('body').classList.add('prevent-scroll');
			TweenMax.fromTo(modal, 1, {
				top: '70%',
				opacity: 0,
				ease: Power3.easeInOut
			}, {
				top: '50%',
				opacity: 1,
				ease: Power3.easeInOut
			})
		} else {
			document.querySelector('body').classList.remove('prevent-scroll');
			TweenMax.fromTo(modal, 1, {
				top: '50%',
				opacity: 1,
				ease: Power3.easeInOut
			}, {
				top: '70%',
				opacity: 0,
				ease: Power3.easeInOut
			})
		}
	}, [modalIsOpen]);
	// handle about page content animations
	useEffect(() => {
		window.scroll({top: 0,behavior: 'smooth'});
		TweenLite.delayedCall(0.4, () => {
			TweenMax.staggerTo(row.current, 0.6, {
				opacity: 1,
				transform: 'initial',
				duration: Power1.easeInOut
			}, 0.1);
		})
	}, [])
	return (
		<div className="about">
			<main>
				<div className="content">
					<div ref={el => row.current[0] = el} className="row">
						<h6>About Me</h6>
						<p>Hello! My name is Jacob, and I'm a Front End Developer. I was first introduced to web development in high school while taking
						a web design and coding class. Since then, I have been studying front end development with some backend technologies by taking classes through 
						Galvanize, Udacity, Udemy, and self teaching. While my main focus has been directed towards React, I plan on eventually becoming a full stack 
						developer using a wide range of technologies.
						</p>
						<p>My main skills include taking web designs and turning them into pixel perfect websites using a mix of front end technologies, 
						creating responsive layouts that work on a wide range of devices, using/testing apis, and building web apps
						using React.
						</p>
					</div>
					<div className="row" ref={el => row.current[1] = el}>
						<div className="skills">
							<h6>Skills</h6>
							<ul>
								{['HTML', 'CSS', 'SCSS', 'Javascript', 'jQuery', 'React', 'Redux', 'Git', 'Node', 'Express', 'GSAP', 'MongoDB', "API's", "SEO/PWA"].map((skill, i) => {
									return (
										<li key={i}>
											{skill}
										</li>
									)
								})}
							</ul>
						</div>
						<div className="social">
							<div className="logo"><svg id="logo" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.2918 243.455"><title>Jacob Carver</title><rect width="100%" height="100%" fill="none"></rect><path d="M273.1058,209.7758c9.6553,1.4365,19.172,2.7519,28.6147,4.3a135.73,135.73,0,0,1,13.6724,3.0072,34.6694,34.6694,0,0,1,7.318,3.09,8.4809,8.4809,0,0,1,4.6153,6.441c.5417-.5133,1.03-1.0614,1.6328-1.5348,12.5832-9.8842,26.1985-18.8734,42.3356-25.78a153.0032,153.0032,0,0,1,46.5481-11.6983,47.27,47.27,0,0,1,24.3743,4.4162c1.6828.775,3.3364,1.5962,4.8981,2.4908,7.8858,4.5171,9.6259,9.6007,5.7014,16.3112a12.81,12.81,0,0,1-10.54,6.6657c-5.1634.5495-9.4518-1.2873-10.8055-4.9056a29.4851,29.4851,0,0,1-1.0784-5.8909,26.0324,26.0324,0,0,0-.5068-3.7783c-1.1886-3.8175-5.1351-5.8974-10.4143-4.9438a155.9624,155.9624,0,0,0-16.5847,4.0224A162.6225,162.6225,0,0,0,345.15,232.2309c-.6555.5382-1.4229,1.0056-2.126,1.5145-3.6777,2.6621-7.3792,5.3075-11.02,7.9955-4.9242,3.6357-5.3194,8.0951-4.6353,12.8246,1.48,10.2346,10.9292,15.5824,24.993,17.8875,13.098,2.1468,25.9156.7146,38.8968-1.0355,17.716-2.3885,33.1927-8.2866,48.4821-14.6129,9.3352-3.8627,18.4437-8.0068,27.7591-11.8948,3.9826-1.6622,8.2339-2.9929,12.3614-4.4765,2.2085-.7939,4.4417-1.0922,6.4634.1958,2.095,1.3347,2.96,3.0809,2.5942,5.0762-.5372,2.9329-2.7961,5.2126-5.5331,7.3055-6.2347,4.7673-13.9638,8.1406-21.3368,11.854-19.69,9.9171-41.6158,15.8023-65.0751,19.273-17.2825,2.5569-34.5878,4.462-52.2594,3.8856a103.8067,103.8067,0,0,1-15.3025-1.4817c-14.882-2.7456-22.5255-10.3966-25.7652-20.6794-2.58-8.1893.0769-15.7753,5.6012-22.9911a3.8592,3.8592,0,0,0,.8951-2.6183c-1.2318-9.9709-10.8812-16.1915-25.1285-16.3739-12.9829-.1663-22.9209,3.4351-28.67,12.02-5.0673,7.5679-9.8635,15.229-14.8043,22.8406-16.1869,24.9365-33.8137,49.3-55.8171,71.9107a317.0275,317.0275,0,0,1-57.3263,46.9449A173.1559,173.1559,0,0,1,71.0813,401.45c-10.9823,2.3548-22.1344,3.48-33.1322.4458-13.3715-3.6887-22.8662-10.1434-25.6167-20.6855-1.392-5.3353-.3237-10.6143,1.8972-15.72,8.7665-20.1555,21.91-38.7976,38.6188-56.1283,29.014-30.0931,66.9763-52.8842,111.7523-70.0738,15.1021-5.7978,30.8639-10.5291,46.6105-15.3115a139.1712,139.1712,0,0,0,29.9845-12.6588c14.7731-8.66,23.6291-19.9253,28.1351-33.0873.8245-2.4082,1.5121-4.8456,2.5031-7.2178a31.6,31.6,0,0,1,3.0358-5.7167c3.6568-5.3391,9.0149-6.3875,16.0682-3.278,4.1428,1.8263,5.9742,4.48,4.4595,7.937-2.9516,6.737-6.0272,13.4659-9.6669,20.0222-3.4422,6.2007-7.6718,12.1765-11.56,18.25C273.8237,208.767,273.4373,209.2947,273.1058,209.7758ZM34.1765,369.0038c-.1739,7.45,3.7736,12.6429,11.0741,15.47a43.2077,43.2077,0,0,0,17.2874,3.1034c14.15-.5374,27.0127-3.5929,38.2327-10.13a304.05,304.05,0,0,0,67.2923-52.6024c24.646-25.7783,43.4369-53.7885,61.47-82.1008a16.5314,16.5314,0,0,0,1.9455-4.4c.53-1.8873-.4362-3.1272-2.88-3.859a11.8149,11.8149,0,0,0-4.2153-.6952c-4.3888.41-9.0032.5819-13.0332,1.7383-6.7519,1.9373-13.1239,4.5577-19.649,6.9-5.9843,2.1486-12.1208,4.1089-17.9128,6.4984-38.4264,15.8522-70.6318,36.7836-97.1576,62.1789C63.2163,323.9487,52.0452,337.86,41.0791,351.8283A31.5086,31.5086,0,0,0,34.1765,369.0038Z" transform="translate(-11.7082 -160.2803)"></path></svg></div>
							<ul>
								<li><a href="https://www.linkedin.com/in/jacob-carver/">LinkedIN<span></span><i className="fab fa-linkedin-in"></i></a></li>
								<li><a href="https://github.com/jacobcarver">GitHub<span></span><i className="fab fa-github"></i></a></li>
								<li><a href="/" onClick={e => {
									e.preventDefault();
									toggleModal(true);
								}}>Email<span></span><i className="far fa-paper-plane"></i></a></li>
							</ul>
							<button onClick={() => toggleModal(true)}>Send Message</button>
						</div>
					</div>
				</div>
			</main>

			<div id="modal" className={`${modalIsOpen ? 'active' : ''}`}>
				<div ref={el => modal = el} className="content">
					{loading && (
						<div className="loading">
							<img src={loadingImage} alt="sending message..." />
						</div>
					)}
					<img className="close" onClick={() => toggleModal(false)} src={close} alt="close modal" />
					<h1>Get In Touch</h1>
					<form name="contactForm" onSubmit={handleFormSubmit}>
					<input type="hidden" name="form-name" value="contactForm" />
						<input value={name} onChange={handleChange} placeholder="Name" type="text" name="name" required />
						<input value={email} onChange={handleChange} placeholder="Email" type="email" name="email" required />
						<input value={message} onChange={handleChange} placeholder="Message" name="message" required />
						{name.length > 1 &&
						validator.validate(email) === true &&
						message.length > 1 ?
						<ReCAPTCHA id="captcha"
							sitekey="6LfbeZoUAAAAALQKAAAXwINOh00YLBy8vlIGDCuu"
							onChange={handleCaptcha}
							name="captcha"
						/> : null}
						<button type="submit">Submit</button>
					</form>
				</div>
        <div className="overlay" />
			</div>
		</div>
	)
}