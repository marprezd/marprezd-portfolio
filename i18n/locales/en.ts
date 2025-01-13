export default {
  site: {
    metadata: {
      title: 'Mario Perez | Full Stack Software Developer',
      description: 'I am a Software developer and teach to build modern web apps and slick user interfaces with Python, Nuxt.js, and other web technologies',
      generator: 'Mario Pérez - Personal Website',
      ogDescription: 'I am a Software developer and teach to build modern web apps and slick user interfaces with Python, Next.js, and other web technologies. We have walk through real code examples to build web apps from start to finish.',
    },
    layout: {
      'users': {
        'title': 'Software developer',
        'availability-to-job': {
          'label': 'Availability to job',
          'is-open': 'I am open to job opportunities!',
          'is-busy': 'I am busy, but listen to the job offers!',
        },
      },
      'nav': {
        main: {
          labels: {
            'sidebar-group': 'Main Navigation',
            'sidebar-item': 'Pages',
          },
          items: {
            home: 'Home',
            projects: 'Projects',
            resources: 'Resources',
            about: 'About me',
            hire: 'Hire me',
          },
        },
        tutorials: {
          labels: {
            'sidebar-group': 'Software Development',
            'sidebar-item': 'Tutorials',
          },
          items: {
            courses: 'Courses',
            blog: 'Blog',
          },
        },
        communities: {
          labels: {
            'sidebar-group': 'Join our community',
            'sidebar-item': 'Communities',
          },
          items: {
            'guest-book': 'Guest book',
          },
        },
      },
      'social-networks': 'Social networks',
      'available-languages': 'Available languages',
      'color-mode': {
        label: 'Interface color',
        light: 'Light',
        dark: 'Dark',
        system: 'System',
      },
      'search': {
        'label': 'Search post',
        'placeholder': 'Let\'s find something interesting!',
        'not-result': 'No results found.',
      },
    },
  },
}
