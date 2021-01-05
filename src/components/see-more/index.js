import { useEffect, useRef } from 'react';
import { TweenMax, Power3, TweenLite } from 'gsap';
import { Link } from 'react-router-dom';
import styles from './see-more.module.scss';

export default function SeeMore({ href, activeProjectIndex, link, history }) {
  const linkLetters = useRef([]);
  const textLetters = useRef([]);
  let indicator = useRef(null);
  let indicatorContainer = useRef(null);
	useEffect(() => {
		if (window.location.pathname === '/') {
			TweenMax.staggerFromTo(linkLetters.current, 0.25, {
				duration: 1,
				opacity: 1,
				transform: 'translateY(2px)',
				ease: Power3.easeInOut
			}, {
				duration: 1,
				opacity: 0,
				transform: 'translateY(-2px)',
				ease: Power3.easeInOut
			}, 0.1);
			TweenLite.delayedCall(0.75, () => {
				TweenMax.staggerTo(linkLetters.current, 0.25, {
					duration: 1,
					opacity: 1,
					transform: 'translateY(2px)',
					ease: Power3.easeInOut
				}, 0.1);
			})
		} else {
			TweenMax.staggerFromTo(textLetters.current, 0.25, {
				duration: 1,
				opacity: 0,
				transform: 'translateY(4px)',
				ease: Power3.easeInOut
			}, {
				duration: 1,
				opacity: 1,
				transform: 'translateY(0px)',
				ease: Power3.easeInOut
			}, 0.1);
		}
  }, [link, activeProjectIndex]);
  useEffect(() => {
    let isProjectPage = history.location.pathname.match(/project/g);
    let timer;
    if (isProjectPage) {
      TweenLite.to(indicator, 0.25, {
        height: '0%',
        top: '0%',
        ease: Power3.easeInOut
      })
      TweenLite.to(indicatorContainer, 0.5, {
        opacity: '1',
        ease: Power3.easeInOut,
      })
      TweenLite.delayedCall(0.5, () => {
        timer = window.setInterval(() => {
          TweenLite.to(indicator, 0.5, {
            top: '0',
            height: '100%',
            ease: Power3.easeInOut,
            onComplete: () => {
              TweenLite.to(indicator, 0.25, {
                top: '100%',
                ease: Power3.easeInOut,
                onComplete: () => {
                  TweenLite.to(indicator, 0.5, {
                    height: '0%',
                    onComplete: () => {
                      TweenLite.to(indicator, 0.1, {
                        top: '0%'
                      })
                    }
                  })
                }
              })
            }
          })
        }, 1400);
      })
    } else {
      TweenLite.to(indicatorContainer, 0.5, {
        opacity: '0',
        ease: Power3.easeInOut,
        onComplete: () => {
          TweenLite.to(indicator, 0.25, {
            height: '0%',
            top: '0%',
            ease: Power3.easeInOut
          })
        }
      })
    }
    return () => {
      clearInterval(timer);
    }
  }, [history.location.pathname]);
  return (
    <div className={styles.more} style={{position: link ? 'fixed' : 'absolute'}}>
			{link && 
			<Link to={href}>
				{'SeeMore'.split('').map((letter, i) => {
					return (
						<span ref={(el) => linkLetters.current[i] = el} style={{paddingLeft: `${letter === 'M' ? '0.25rem' : ''}`}} key={i}>{letter}</span>
					)
				})}
			</Link>}
			{!link && 
			<Link to={href} onClick={e => {
				e.preventDefault();
			}}>
				{'ScrollDown'.split('').map((letter, i) => {
					return (
						<span ref={(el) => textLetters.current[i] = el} style={{paddingLeft: `${letter === 'D' ? '0.25rem' : ''}`}} key={i}>{letter}</span>
					)
				})}
			</Link>}

      <div className={styles.more__indicator} ref={el => indicatorContainer = el}>
        <div ref={el => indicator = el} className={styles.more__indicator__bar} />
      </div>
		</div>
  )
}