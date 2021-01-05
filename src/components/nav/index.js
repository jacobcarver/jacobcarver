import { useEffect, useState, useRef } from 'react';
import { Power2, Power4, TweenLite } from 'gsap';
import { Link } from 'react-router-dom';
import styles from './nav.module.scss';

export default function Nav({ setIndex, history }) {
  const [menuIsOpen, toggleMenu] = useState(false);
  const [hovered, setHover] = useState(window.location.pathname);
	let menuRef = useRef(null);
	let overlayRef = useRef(null);
  let inner = useRef(null);
  let iconsRef = useRef(null);
  let copyRef = useRef(null);
	// handle animation for opening menu
	const openMenuAnimation = () => {
		TweenLite.to(overlayRef, 0.1, {
      right: '0%',
			onComplete: () => {
				TweenLite.to(overlayRef, 0.4, {
          opacity: 1,
          ease: Power4.easeInOut
				})
				TweenLite.to(menuRef, 1, {
          right: '0%',
					ease: Power4.easeInOut
				})
				TweenLite.to(inner, 0.8, {
					opacity: 1,
					ease: Power2.easeInOut,
					delay: 0.6
        })
        TweenLite.to(iconsRef, 0.8, {
					opacity: 1,
					ease: Power2.easeInOut,
					delay: 0.6
        })
        TweenLite.to(copyRef, 0.8, {
					opacity: 1,
					ease: Power2.easeInOut,
					delay: 0.6
				})
			}
		})
	}
	// handle animation for closing menu
	const closeMenuAnimation = () => {
		TweenLite.to(overlayRef, 0.4, {
			opacity: 0,
			onComplete: () => {
				TweenLite.to(overlayRef, 0.1, {
          right: '-100%',
					ease: Power4.easeInOut,
				})
			}
		})
		TweenLite.to(menuRef, 1, {
      right: '-100%',
			ease: Power4.easeInOut
		})
		TweenLite.to(inner, 0.4, {
			opacity: 0,
			ease: Power2.easeInOut
    })
    TweenLite.to(iconsRef, 0.4, {
			opacity: 0,
			ease: Power2.easeInOut
    })
    TweenLite.to(copyRef, 0.4, {
			opacity: 0,
			ease: Power2.easeInOut
		})
	}
	// listen for menu change
	useEffect(() => {
		if (menuIsOpen) {
			document.body.classList.add('prevent-scroll');
			openMenuAnimation();
		} else {
			document.body.classList.remove('prevent-scroll');
			closeMenuAnimation();
		}
  }, [menuIsOpen]);
	const projectRoutes = [
		{
			link: '/project/dashboard',
			name: 'Dashboard'
		},
		{
			link: '/project/interactive-nerd',
			name: 'Interactive Nerd'
		},
		{
			link: '/project/movie',
			name: 'Movie Pro'
		},
		{
			link: '/project/bank',
			name: 'Just Bank'
		},
		{
			link: '/project/store',
			name: 'Shoe Store'
    },
    {
      link: '/project/realtor',
      name: 'Realtor'
    }
	]
  const portfolioRoutes = [{ link: '/', name: 'Home'  }, { link: '/about', name: 'About' }, { link: '/blog', name: 'Blog' }];
  const colors = ['#ffbc66', '#8fcfe3', '#db97b4', '#b6c6f0', '#6f90e8', '#9bcc6e'];
	return (
		<nav className={styles.navbar}>
			<div className={styles.navbar__logo}>
				<Link to="/" onClick={() => toggleMenu(false)}>Jacob<br />Carver</Link>
			</div>
			<div className={styles.navbar__toggler} onClick={() => toggleMenu(!menuIsOpen)}>
				<span className={menuIsOpen ? styles.navbar__toggler_activebar : styles.navbar__toggler_bar}></span>
				<span className={menuIsOpen ? styles.navbar__toggler_activebar : styles.navbar__toggler_bar}></span>
			</div>

			<div ref={el => overlayRef = el} className={styles.navbar__overlay} onClick={() => toggleMenu(!menuIsOpen)}></div>

			<div ref={el => menuRef = el} className={menuIsOpen ? styles.navbar__menu_active : styles.navbar__menu}>
				<div ref={el => inner = el} className={styles.navbar__menu__inner}>

          <div className={styles.navbar__menu__inner__col} 
            onMouseLeave={() => {
              setHover(window.location.pathname);
            }}>
						<h1>Projects</h1>
						<ul>
							{projectRoutes.map(p => {
                return (
                  <li key={p.link}>
                    <Link 
                    onMouseEnter={() => {
                      setHover(p.link)
                    }}
                    onClick={() => {
                      toggleMenu(!menuIsOpen);
                      setIndex(projectRoutes.indexOf(p));
                    }}
                    to={p.link}>{p.name}
                    </Link>
                  </li>
                )
							})}
              <div className={styles.navbar__link__project_active}>
                <div style={{
                  top: projectRoutes.findIndex(r => r.link === hovered) * 48 + 11 + 'px',
                  background: colors[projectRoutes.findIndex(r => r.link === hovered)],
                  display: projectRoutes.findIndex(r => r.link === hovered) >= 0 && window.innerWidth > 480 ? 'initial' : 'none'
                }} />
              </div>
						</ul>
					</div>

					<div className={styles.navbar__menu__inner__col}>
						<h1>Menu</h1>
						<ul>
							{portfolioRoutes.map(r => {
								return <li key={r.link}><Link onClick={() => {
									toggleMenu(!menuIsOpen);
								}} to={r.link} className={window.location.pathname === r.link ? styles.navbar__link__menu_active : ''}>{r.name}</Link></li>
							})}
						</ul>
					</div>

				</div>

				<div className={styles.navbar__menu__footer}>
					<ul ref={el => iconsRef = el}>
						<li><a aria-label="LinkedIN" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/jacob-carver/"><i className="fab fa-linkedin-in"></i></a></li>
						<li><a aria-label="Github" target="_blank" rel="noopener noreferrer" href="https://github.com/jacobcarver"><i className="fab fa-github"></i></a></li>
						<li><a aria-label="Email" href="mailto:contact@jacobcarver.net"><i className="far fa-envelope"></i></a></li>
						<li><a aria-label="Website" href="https://jacobcarver.net"><i className="fas fa-globe"></i></a></li>
					</ul>
          <p ref={el => copyRef = el}>&#169; Copyright 2020</p>
				</div>

			</div>
		</nav>
	)
}