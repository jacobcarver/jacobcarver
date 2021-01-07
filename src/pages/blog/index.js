import React, { useRef, useEffect } from 'react';
import { TweenMax, Linear, TweenLite } from 'gsap';
import SEO from '../../components/seo';
import styles from './blog.module.scss';

const Blog = () => {
	let txt = useRef(null);
	useEffect(() => {
		TweenLite.delayedCall(0.4, () => {
			TweenMax.to(txt, 0.5, {
				opacity: 1,
				transform: 'initial',
				duration: Linear.easeInOut
			}, 0.1);
		})
	}, []);
	return (
		<div className={styles.blog}>
      <SEO title="Jacob Carver" />
			<h1 className={styles.blog__title} ref={el => txt = el}>Coming Soon</h1>
		</div>
	)
}

export default Blog;