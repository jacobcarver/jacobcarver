import { useRef, useEffect, useState } from 'react';
import { Power3, TweenMax } from 'gsap';
import { routes } from '../../api';
import styles from './project-toggler.module.scss';

export default function ProjectToggler({ activeProjectIndex, setIndex, history }) {
  const [time, setTime] = useState(0);
  let toggler = useRef(null);
	function throttle(fn) {
		if ((time + 1250 - Date.now()) < 0) {
			fn();
			setTime(Date.now());
		}
	}
	function handleUp() {
		if (activeProjectIndex - 1 >= 0) {
			setIndex(activeProjectIndex - 1)
		} else {
			setIndex(routes.length - 1)
		}
	}
	function handleDown() {
		if (activeProjectIndex + 1 <= routes.length - 1) {
			setIndex(activeProjectIndex + 1)
		} else {
			setIndex(0)
		}
  }
  useEffect(() => {
		if (history.location.pathname === '/') {
			TweenMax.to(toggler, 1, {
        right: window.innerWidth > 480 ? 'calc(4vw * 1)' : 'calc(4vw * 1)',
        opacity: 1,
        ease: Power3.easeInOut
      })
		} else {
			TweenMax.to(toggler, 1, {
				right: '-10%',
				opacity: 0,
			});
		}
	}, [history.location.pathname]);
  return (
    <div ref={el => toggler = el} className={styles.toggler}>
			<div className={styles.toggler__button}>
        <svg onClick={() => throttle(handleUp)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
			</div>
			<div className={styles.toggler__button}>
        <svg onClick={() => throttle(handleDown)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>
			</div>
		</div>
  )
}