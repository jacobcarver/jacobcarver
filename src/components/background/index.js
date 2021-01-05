import Particles from 'react-particles-js';
import './background.scss';

const Background = () => {
	return (
		<div id="bg">
			<Particles width="100" params={{
				"particles": {
					"number": {
						"value": window.innerWidth > 768 ? 25 : 17,
						"density": {
							"enable": false
						}
					},
					"size": {
						"value": 2,
						"random": true,
						"anim": {
							"speed": 2,
							"size_min": 0.5
						}
					},
					"opacity": {
						"value": 0.4,
						"random": true,
						"anim": {
							"enable": true,
							"opacity_min": 0.3
						}
					},
					"color": {
						"value": '#fff'
					},
					"shape": {
						"type": "circle",
						"stroke": {
							"width": 0,
							"color": "#000000"
						},
						"polygon": {
							"nb_sides": 3
						}
					},
					"line_linked": {
						"distance": 150,
						"enable": true,
						"color": '#fff',
						"opacity": 0.6
					},
					"move": {
						"random": true,
						"speed": 2,
						"direction": "random",
						"out_mode": "out",
						"bounce": false
					}
				},
				"interactivity": {
					"detect_on": "window",
					"events": {
						"resize": true,
						"onhover": {
							"enable": false,
							"mode": "repulse"
						},
					},
					"modes": {
						"repulse": {
							"distance": 100,
							"duration": 2
						}
					},
					"retina_detect": true
				}
			}} />
		</div>
	)
}

export default Background;