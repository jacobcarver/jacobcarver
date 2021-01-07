import React, { useRef, useEffect } from 'react';
import { TweenMax, Linear, TweenLite } from 'gsap';
import SEO from '../../components/seo';
import styles from './error.module.scss';
import { Link } from 'react-router-dom';

export default function Error() {
  let txt = useRef([]);
	useEffect(() => {
		TweenLite.delayedCall(0.4, () => {
			TweenMax.staggerTo(txt.current, 0.5, {
				opacity: 1,
				transform: 'initial',
				duration: Linear.easeInOut
			}, 0.1);
		})
	}, []);
  return (
    <div className={styles.error}>
      <SEO title="Error" />
      <h1 className={styles.error__title} ref={el => txt.current[0] = el}>Page Not Found</h1>
      <Link className={styles.error__link} ref={el => txt.current[1] = el} to="/">(Return Home)</Link>
    </div>
  )
}