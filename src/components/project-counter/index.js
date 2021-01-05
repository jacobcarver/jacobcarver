import { useRef, useEffect } from 'react';
import { Power3, TweenMax } from 'gsap';
import styles from './project-counter.module.scss';
import { routes } from '../../api';

export default function ProjectCounter({ activeProjectIndex, history }) {
  let counter = useRef(null);
  useEffect(() => {
		if (history.location.pathname === '/') {
			TweenMax.to(counter, 1, {
        left: window.innerWidth > 480 ? 'calc(4vw * 1)' : 'calc(4vw * 1)',
        opacity: 1,
        ease: Power3.easeInOut
      })
		} else {
			TweenMax.to(counter, 1, {
				left: '-10%',
				opacity: 0,
			});
		}
	}, [history.location.pathname]);
  return (
    <div ref={el => counter = el} className={styles.counter}>
			<div className={styles.counter__overflow}>
				<div className={styles.counter__overflow__swipes} style={{transform: `translateY(-${Number(activeProjectIndex + '00') / routes.length}%)`}}>
					{routes.map((r, i) => {
						return (
								<span className={`${i === activeProjectIndex ? 'active' : ''}`} key={i}>{i + 1}</span>
						)
					})}
				</div>
			</div>
			<span className={styles.counter__length}>{routes.length}</span>
		</div>
  )
}