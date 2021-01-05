const importAll = r => r.keys().map(r);
const images = importAll(require.context('./images/projects', false, /\.(png|jpe?g|svg)$/));

const getProjectImages = projectName => {
	let regex = new RegExp(projectName, 'g');
	return images.map(img => img.default).filter(url => url.match(regex));
}

const projects = [
  {
    title: 'Dashboard',
		images: getProjectImages('dashboard'),
    link_local: '/project/dashboard',
		link_code: 'https://github.com/JacobCode/dashboard2.0',
		link_site: 'https://modern-dashboard.netlify.app/',
    colors: ['#FFFFFF', '#F5F5F5', '#545454', '#FE9A1B', '#2196F3'],
    placeholderColor: ['#ffbc66'],
		tech_front: ['React', 'Javascript', 'Redux', 'SCSS', 'Axios', 'Material UI'],
		tech_back: ['Express', 'NodeJS', 'MongoDB', 'JSON Web Token', 'Nodemailer', 'GridFS'],
		tech_other: ['Postman', 'Weatherbit.io (api)', 'Coincap.io (api)'],
		desc: [
			`The dev dashboard is a full stack application that includes features such as a login/signup system with authentication through email,
			helpful widgets such as a calendar where you can categorize upcoming dates, add and complete tasks, upload files and download them on a 
			different device, and more! Don't want to create an account just yet? Use the demo account when on the login page.`,
			`The profile page includes some info about your account, a form to delete your account, and a form to change your password.
			The login/signup page includes a form to login with either your account or the guest account, and a form to signup with basic info.
			The main dashboard has up to 7 different useful widgets where you can customize which ones you want to show.`
		]
  },
  {
    title: 'Interactive Nerd',
		images: getProjectImages('nerd'),
    link_local: '/project/interactive-nerd',
    link_code: 'private',
		link_site: 'https://www.interactivenerd.com/',
    colors: ['#FFFFFF', '#F2F5F9', '#10A7d4', '#170944', '#E01C5F'],
    placeholderColor: ['#8fcfe3'],
		tech_front: ['React', 'NextJS', 'GSAP', 'SCSS', 'Contentful'],
		tech_back: [],
		tech_other: [],
		desc: [
			`Interactive Nerd is a new and upcoming platform to learn coding with a more personalized experience. The project is being built with a team of developers including myself using React, Contentful, GSAP, and SCSS.`,
			`The website will include account authentication, a custom dashboard for users and admins, and many more features coming soon.`
		]
  },
  {
    title: 'Movie Pro',
		images: getProjectImages('movie'),
    link_local: '/project/movie',
    link_code: 'https://github.com/JacobCode/movie-site2.0',
		link_site: 'https://movie-pro.netlify.app/',
    colors: ["#FFFFFF", "#E32F7A", "#7135F2", "#1B1159", "#080327"],
    placeholderColor: ['#db97b4'],
		tech_front: ['React', 'Javascript', 'Redux', 'SCSS', 'Axios'],
		tech_back: [],
		tech_other: [],
		desc: [
			`The Movie Pro website is a front end application built using two external to access a database of movies and tv shows. This project also uses React, Redux, SCSS, and Axios. Users can use this site to search movies, see what's coming out soon, see movie info, and even watch trailers.`,
			`For a full description of the features and technologies used, please view the repo or the live website below.`
		]
  },
  {
    title: 'Just Bank',
		images: getProjectImages('bank'),
    link_local: '/project/bank',
    link_code: 'https://github.com/JacobCode/bank-page',
		link_site: 'https://just-bank.netlify.app/',
    colors: ['#FFFFFF', '#F4F7FF', '#1D1C5E', '#7276D9', '#1598D5'],
    placeholderColor: ['#b6c6f0'],
		tech_front: ['HTML', 'SCSS', 'Javascript'],
		tech_back: [],
		tech_other: [],
		desc: [`The Just Bank landing page was made with HTML, CSS, and Javascript. The page is fully responsive working on a wide range of browsers and devices.`]
  },
  {
    title: 'Shoe Store',
		images: getProjectImages('store'),
    link_local: '/project/store',
    link_code: 'https://github.com/JacobCode/shoe-store',
		link_site: 'https://shoe-store.netlify.app/',
    colors: ['#FFFFFF', '#3567ed', '#f2262c', '#F96D23', '#313131'],
    placeholderColor: ['#6f90e8'],
		tech_front: ['React', 'Redux', 'Stripe', 'GSAP', 'Javascript', 'SCSS', 'Bootstrap'],
		tech_back: ['Express', 'NodeJs', 'MongoDB'],
		tech_other: [],
		desc: [
			`The shoe store was built with react hooks, stripe for card payment verification, and other technologies. It includes a shopping cart where you can add shoes, select sizes, remove items, and remembers what items you had in your cart for later if you leave the page. On the store page, you can filter shoes by price, gender, and brand. You can also change how many items per page are shown with the fully functioning pagination.`,
			`For a full description of the project, technologies, and features, please visit the repo link below, or visit the live site.`
		]
  },
  {
    title: 'Realtor',
		images: getProjectImages('realtor'),
    link_local: '/project/realtor',
    link_code: 'https://admiring-lamarr-e6b0ae.netlify.app/',
		link_site: 'https://admiring-lamarr-e6b0ae.netlify.app/',
    colors: ['#7BCB33', '#EDE356', '#1b1b1b', '#5c5c5c', '#d8d8d8'],
    placeholderColor: ['#9bcc6e'],
		tech_front: ['HTML', 'SCSS', 'Javascript'],
		tech_back: [],
		tech_other: [],
		desc: [
			`Realtor Project Description`
		]
  }
];

const routes = ['/project/dashboard', '/project/interactive-nerd', '/project/movie', '/project/bank', '/project/store', '/project/realtor'];

module.exports = { projects, routes };