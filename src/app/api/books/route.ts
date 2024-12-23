import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    {
      title:
        'Machine Learning for Decision Sciences with Case Studies in Python',
      link: {
        href: 'https://www.routledge.com/Machine-Learning-for-Decision-Sciences-with-Case-Studies-in-Python/Sumathi-Rajappa-Kumar-Paneerselvam/p/book/9781003258803',
        label: 'Routledge.com',
      },
      image: {
        src: 'marprez-dev/resources/machine-learning-python-sumathi_tq1x9s.jpg',
        alt: 'Machine Learning for Decision Sciences with Case Studies in Python',
      },
      summary: 'This book provides a detailed description of machine learning algorithms in Data Analytics, Data Science Lifecycle, Python for Machine Learning, Linear Regression, Logistic Regression and so forth.',
      description:
        'This book provides a detailed description of machine learning algorithms in Data Analytics, Data Science Lifecycle, Python for Machine Learning, Linear Regression, Logistic Regression and so forth. It addresses the concepts of machine learning in a practical sense providing complete...',
      category: 'Python',
      authors: 'S. Sumathi, Suresh V. Rajappa,...',
    },
    {
      title:
        'Intro to Python for Computer Science and Data Science - Learning to programm with AI, Big data.',
      link: {
        href: 'https://www.pearson.com/en-us/subject-catalog/p/intro-to-python-for-computer-science-and-data-science-learning-to-program-with-ai-big-data-and-the-cloud/P200000003444/9780135404676',
        label: 'Pearson.com',
      },
      image: {
        src: 'marprez-dev/resources/intro-to-python-deitel_qcse6v.jpg',
        alt: 'Intro to Python for Computer Science and Data Science',
      },
      summary: 'The book aligns with the latest ACM/IEEE CS-and-related computing curriculum initiatives and with the Data Science Undergraduate Curriculum Proposal.',
      description: 'This book aligns with the latest ACM/IEEE CS-and-related computing curriculum initiatives and with the Data Science Undergraduate Curriculum Proposal sponsored by the National Science Foundation. A ground breaking, flexible approach to computer science and data science...',
      category: 'Python',
      authors: 'Paul Deitel, Harvey Deitel',
    },
    {
      title:
        'Python Crash Course. A hands-on, project-based introduction to programming.',
      link: {
        href: 'https://nostarch.com/python-crash-course-3rd-edition',
        label: 'Nostarch.com',
      },
      image: {
        src: 'marprez-dev/resources/python-crash-course-matthes_oqhc6d.jpg',
        alt: 'Python Crash Course. A hands-on, project-based introduction to programming',
      },
      summary: 'The goal of this book is to bring you up to speed with Python as quickly as possible so you can build programs that work',
      description:
        'The goal of this book is to bring you up to speed with Python as quickly as possible so you can build programs that work—games, data visualizations, and web applications—while developing a foundation in programming that will serve you well for the rest of your life...',
      category: 'Python',
      authors: 'Eric Matthes',
    },
  ])
}
