const links = [
  {
    id: 1,
    text: 'Dashboard',
    path: '/',
    roles: ['ADMIN', 'SUBJECT_MANAGER', 'LECTURE', 'STUDENT'],
    sub_links: [],
  },
  {
    id: 2,
    text: 'User',
    path: '/user-manager',
    roles: ['ADMIN'],
    sub_links: [],
  },
  {
    id: 3,
    text: 'Subject',
    path: '/subject-manager',
    roles: ['ADMIN'],
    sub_links: [],
  },
  {
    id: 4,
    text: 'Class',
    path: '/class-manager',
    roles: ['SUBJECT_MANAGER', 'LECTURE'],
    sub_links: [],
  },
  {
    id: 5,
    text: 'System Setting',
    path: '/setting-manager',
    roles: ['ADMIN'],
    sub_links: [],
  },
  {
    id: 6,
    text: 'Project',
    path: '/project',
    roles: ['LECTURE'],
    sub_links: [],
  },
  {
    id: 8,
    text: 'Assigment',
    path: '/assignments',
    roles: ['SUBJECT_MANAGER'],
    sub_links: [],
  },
  {
    id: 9,
    text: 'Issues',
    path: '/issue',
    sub_links: [
      {
        id: 1,
        text: 'Issue List',
        path: '/issue-manager',
      },
      {
        id: 2,
        text: 'Issue Add',
        path: '/new-issue',
      },
      {
        id: 3,
        text: 'Issue Edit',
        path: '/issue-edit/:id',
      },
    ],
  },
]

export default links
