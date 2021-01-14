import { useEffect, useRef, useState } from 'react';
import { TweenLite, Power3 } from 'gsap';
import styles from './loader.module.scss';

export default function Loader({ loading }) {
  let innerRef = useRef(null);
  let loaderRef = useRef(null);
  const [isLoaded, setLoaded] = useState(loading);
  useEffect(() => {
    if (loading) {
      TweenLite.to(innerRef, 0.5, {
        opacity: 1,
        ease: Power3.easeInOut
      })
    } else {
      TweenLite.to(innerRef, 0.5, {
        opacity: 0,
        transform: 'translateY(-25px)',
        ease: Power3.easeInOut,
        onComplete: () => {
          TweenLite.to(loaderRef, 0.7, {
            height: 0,
            ease: Power3.easeInOut,
            onComplete: () => {
              setLoaded(false);
            }
          })
        }
      })
    }
  }, [loading]);
  return (
    <div className={styles.loader} ref={el => loaderRef = el} style={{ display: isLoaded ? 'flex' : 'none' }}>
      <div className={styles.loader__inner} ref={el => innerRef = el}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 100 100" enable-background="new 0 0 0 0" xmlSpace="preserve">
          <rect x="40" y="40%" width="2" height="18" fill="white">
            <animateTransform attributeType="xml"
              attributeName="transform" type="translate"
              values="0 0; 0 10; 0 0"
              begin="0" dur="0.7s" repeatCount="indefinite" />
          </rect>
          <rect x="50" y="40%" width="2" height="18" fill="white">
            <animateTransform attributeType="xml"
              attributeName="transform" type="translate"
              values="0 0; 0 10; 0 0"
              begin="0.2s" dur="0.7s" repeatCount="indefinite" />
          </rect>
          <rect x="60" y="40%" width="2" height="18" fill="white">
            <animateTransform attributeType="xml"
              attributeName="transform" type="translate"
              values="0 0; 0 10; 0 0"
              begin="0.4s" dur="0.7s" repeatCount="indefinite" />
          </rect>
        </svg>
        <p>Loading</p>
      </div>
    </div>
  )
}