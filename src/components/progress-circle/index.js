import { useEffect, useState, useCallback } from 'react';
import { routes } from '../../api';
import styles from './progress-circle.module.scss';

export default function ProgressCircle({ setIndex, activeProjectIndex, history }) {
  const [pagePercent, handleScroll] = useState(0);
  const [projectSwitchPercent, handleSwitchPercent] = useState(0);
  // if on home page, show timer percent
  let activeEffect = window.location.pathname === '/' ? projectSwitchPercent : pagePercent;
  // calculate page percent
  const getPagePercent = () => {
		var h = document.documentElement,
			b = document.body,
			st = 'scrollTop',
			sh = 'scrollHeight';
		var percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
		return percent;
  }
  // timer
	const handleTimer = useCallback(
		(i) => {
			let path = window.location.pathname;
			if (path === '/') {
				let x = i + 1;
				if (x >= 100) {
					x = 0;
          handleSwitchPercent(x);
					if (activeProjectIndex + 1 < routes.length) {
            setIndex(activeProjectIndex + 1);
					} else {
						setIndex(0);
					}
				} else {
					handleSwitchPercent(x);
				}
			}
    },[activeProjectIndex, setIndex]);
  // scroll event
	const scroll = useCallback(
		(e) => {
			e.preventDefault();
			handleScroll(Number(getPagePercent().toFixed(0)));
		}, []);
	useEffect(() => {
		let path = window.location.pathname;
		if (path === '/') {
			var projectTimer = setInterval(() => {
				handleTimer(projectSwitchPercent);
			}, 100);
		} else {
			clearInterval(projectTimer);
		}
		return () => {
			clearInterval(projectTimer);
		}
	}, [projectSwitchPercent, handleTimer, history.location.pathname]);
	useEffect(() => {
		handleSwitchPercent(0);
		handleScroll(0);
		if (window.location.pathname !== '/') {
			window.addEventListener('scroll', scroll);
		}
		return () => {
			window.removeEventListener('scroll', scroll);
		}
	}, [activeProjectIndex, scroll, history.location.pathname]);
  return (
    <div className={styles.progress}>
			<svg className={styles.progress__circle} width="40" height="40" viewBox="0 0 120 120">
				<circle strokeWidth="5" cx="60" cy="60" r="54" style={{opacity: 0.2}} fill="none" stroke="#fff" />
				<circle strokeWidth="5" className={styles.progress__circle_value} style={{strokeDashoffset: `${((100 - activeEffect) * 339.292) / 100}`}} data-progress={50} cx="60" cy="60" r="54" fill="none" stroke="#fff" />
			</svg>
		</div>
  )
}