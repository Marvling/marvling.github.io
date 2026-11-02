// Site-wide data: sidebar links, page nav and metadata. The only place to edit navigation.
export const site = {
  title: 'Sinan Özer',
  description: 'Portfolio of Sinan Özer: motion design, 3D, games, creative code and photography.',
  email: 'sinan.ozer7@pm.me',
  // each inner array is one line in the sidebar, items joined with " • "
  links: [
    [
      { label: 'Resume', href: '/Assets/SinanOzer_Resume.pdf' },
      { label: 'Behance', href: 'https://www.behance.net/sinanozer' },
      { label: 'Linkedin', href: 'https://www.linkedin.com/in/sinanozer7/' },
    ],
    [
      { label: 'Noun Project', href: 'https://thenounproject.com/Marvling/' },
      { label: 'Github', href: 'https://github.com/Marvling' },
    ],
  ],
  nav: [
    { label: 'Work', href: '/work.html' },
    { label: 'Games', href: '/games.html' },
    { label: 'Music Videos', href: '/videos.html' },
    { label: 'Music', href: '/music.html' },
    { label: 'Code', href: '/code.html' },
    { label: 'Daily Renders', href: '/dailies.html' },
    { label: 'Photography', href: '/photos.html' },
  ],
};
