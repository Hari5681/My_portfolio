
export interface RoadmapResource {
  label: string;
  url: string;
}

export interface RoadmapNode {
  type: 'main' | 'sub' | 'option';
  label: string;
  description: string;
  code?: string;
  resources?: RoadmapResource[];
}

export interface RoadmapMilestone {
  type: 'milestone';
  label: string;
  description: string;
  nodes: RoadmapNode[];
}

export const roadmaps = {
  backend: [
      {
        type: 'milestone',
        label: 'Choose a Language',
        description: 'The first step in backend development is choosing a primary programming language. While many languages can be used, Node.js (JavaScript), Python, and Java are among the most popular due to their extensive libraries, frameworks, and community support.',
        nodes: [
          {
            type: 'main',
            label: 'Node.js',
            description: 'A JavaScript runtime ideal for building scalable, non-blocking, event-driven network applications.',
            code: `const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.end('Hello World');\n});\n\nserver.listen(3000, () => {\n  console.log('Server running');\n});`,
            resources: [
              { label: 'Official Node.js Documentation', url: 'https://nodejs.org/en/docs' },
              { label: 'Express.js Framework', url: 'https://expressjs.com/' },
            ]
          },
          {
            type: 'main',
            label: 'Python',
            description: 'A versatile, high-level language known for its readability. Widely used in web development, data science, and AI.',
            code: `from flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef hello_world():\n    return 'Hello, World!'`,
            resources: [
              { label: 'Official Python Documentation', url: 'https://docs.python.org/3/' },
              { label: 'Django Web Framework', url: 'https://www.djangoproject.com/' },
            ]
          },
          {
            type: 'main',
            label: 'Java',
            description: 'A class-based, object-oriented language designed for portability ("write once, run anywhere").',
            code: `import org.springframework.boot.SpringApplication;\n// ... full Spring Boot example`,
            resources: [
              { label: 'Official Java Documentation', url: 'https://docs.oracle.com/en/java/' },
              { label: 'Spring Framework', url: 'https://spring.io/' }
            ]
          },
        ]
      },
      {
        type: 'milestone',
        label: 'Learn Databases',
        description: 'Databases are crucial for storing, retrieving, and managing application data. Understand the difference between relational (SQL) and non-relational (NoSQL) databases.',
        nodes: [
            {
                type: 'main',
                label: 'SQL (PostgreSQL)',
                description: 'SQL is the standard for relational databases. PostgreSQL is a powerful, open-source object-relational system.',
                code: `CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  username VARCHAR(50) NOT NULL\n);`,
                resources: [
                    { label: 'PostgreSQL Official Documentation', url: 'https://www.postgresql.org/docs/' },
                ]
            },
            {
                type: 'main',
                label: 'NoSQL (MongoDB)',
                description: 'NoSQL databases are non-tabular and come in various types. MongoDB is a popular document-based NoSQL database.',
                code: `db.users.insertOne({\n  username: "backenddev"\n})`,
                resources: [
                  { label: 'MongoDB Official Website', url: 'https://www.mongodb.com/' }
                ]
            }
        ]
      },
      {
        type: 'milestone',
        label: 'API Design',
        description: 'APIs are how the frontend communicates with the backend. Understanding how to design and build robust, secure, and scalable APIs is a core backend skill.',
        nodes: [
            {
                type: 'main',
                label: 'REST APIs',
                description: 'REST is an architectural style that defines constraints for creating web services, using standard HTTP methods.',
                resources: [
                    { label: 'MDN: An introduction to REST', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status' },
                ]
            },
            {
                type: 'option',
                label: 'GraphQL',
                description: 'GraphQL is a query language for APIs that allows clients to request exactly the data they need.',
                resources: [
                    { label: 'GraphQL Official Website', url: 'https://graphql.org/' },
                ]
            }
        ]
      },
      {
        type: 'milestone',
        label: 'Authentication',
        description: 'Securing your application by verifying user identities is non-negotiable. Learn different strategies to protect user data and control access.',
        nodes: [
            {
                type: 'main',
                label: 'JWT (JSON Web Tokens)',
                description: 'JWT is an open standard for securely transmitting information between parties as a digitally signed JSON object.',
                resources: [
                    { label: 'JWT Official Website', url: 'https://jwt.io/' },
                ]
            }
        ]
      },
      {
        type: 'milestone',
        label: 'Advanced Topics',
        description: 'Explore advanced topics to build more scalable, resilient, and efficient production-grade systems.',
        nodes: [
            {
                type: 'option',
                label: 'Caching (Redis)',
                description: 'Caching stores frequently accessed data in-memory for faster retrieval. Redis is a popular choice.',
                resources: [
                    { label: 'Redis Official Website', url: 'https://redis.io/' },
                ]
            },
            {
                type: 'option',
                label: 'Containerization (Docker)',
                description: 'Docker packages an application and its dependencies into a standardized unit called a container.',
                resources: [
                    { label: 'Docker Official Website', url: 'https://www.docker.com/' },
                ]
            },
            {
                type: 'option',
                label: 'CI/CD Pipelines',
                description: 'CI/CD automates the stages of app development, enabling frequent and reliable delivery.',
                resources: [
                    { label: 'GitHub Actions Documentation', url: 'https://docs.github.com/en/actions' },
                ]
            }
        ]
      }
  ],
  frontend: [
    {
      type: 'milestone',
      label: 'Internet Basics',
      description: 'Understand the fundamental technologies that power the web, from how browsers render pages to how data is transferred.',
      nodes: [
        { type: 'main', label: 'HTTP/HTTPS', description: 'Learn the protocol for web communication and its secure counterpart.', resources: [{ label: 'MDN: HTTP Overview', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview' }] },
        { type: 'main', label: 'DNS', description: 'How domain names are translated into IP addresses.', resources: [{ label: 'Cloudflare: What is DNS?', url: 'https://www.cloudflare.com/learning/dns/what-is-dns/' }] },
        { type: 'main', label: 'Browsers', description: 'How they render websites and execute code.', resources: [{ label: 'How Browsers Work', url: 'https://web.dev/articles/how-browsers-work' }] },
      ]
    },
    {
        type: 'milestone',
        label: 'HTML, CSS, & JavaScript',
        description: 'The three core technologies of the World Wide Web. Master these to build any website or web application.',
        nodes: [
            { type: 'main', label: 'HTML', description: 'The standard markup language for documents designed to be displayed in a web browser.', resources: [{ label: 'MDN: HTML Basics', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' }] },
            { type: 'main', label: 'CSS', description: 'A style sheet language for describing the presentation of a document written in a markup language.', resources: [{ label: 'MDN: CSS Basics', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' }] },
            { type: 'main', label: 'JavaScript', description: 'A programming language that enables interactive web pages and web applications.', resources: [{ label: 'MDN: JavaScript Basics', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' }] },
        ]
    },
    {
        type: 'milestone',
        label: 'Version Control Systems',
        description: 'Essential tools for tracking changes in code, collaborating with others, and managing projects effectively.',
        nodes: [
            { type: 'main', label: 'Git', description: 'The most widely used modern version control system in the world.', resources: [{ label: 'Official Git Documentation', url: 'https://git-scm.com/doc' }] },
            { type: 'main', label: 'GitHub', description: 'A platform for hosting and collaborating on Git repositories.', resources: [{ label: 'GitHub Docs', url: 'https://docs.github.com/en' }] },
        ]
    },
    {
      type: 'milestone',
      label: 'Choose a Framework',
      description: 'Frameworks provide structure and tools to build complex applications more efficiently. React, Vue, and Angular are the most popular choices.',
      nodes: [
        { type: 'main', label: 'React', description: 'A JavaScript library for building user interfaces, maintained by Meta.', resources: [{ label: 'Official React Docs', url: 'https://react.dev/' }] },
        { type: 'option', label: 'Vue.js', description: 'An approachable, performant and versatile framework for building web user interfaces.', resources: [{ label: 'Official Vue.js Docs', url: 'https://vuejs.org/' }] },
        { type: 'option', label: 'Angular', description: 'A platform and framework for building single-page client applications using HTML and TypeScript.', resources: [{ label: 'Official Angular Docs', url: 'https://angular.dev/' }] },
      ]
    },
    {
      type: 'milestone',
      label: 'Styling & Component Libraries',
      description: 'Modern tools to style your applications consistently and build UIs faster with pre-built components.',
      nodes: [
        { type: 'main', label: 'Tailwind CSS', description: 'A utility-first CSS framework for rapidly building custom user interfaces.', resources: [{ label: 'Official Tailwind CSS Docs', url: 'https://tailwindcss.com/docs' }] },
        { type: 'main', label: 'Shadcn/ui', description: 'Beautifully designed components that you can copy and paste into your apps.', resources: [{ label: 'Shadcn/ui Docs', url: 'https://ui.shadcn.com/docs' }] },
        { type: 'option', label: 'CSS-in-JS (Styled Components)', description: 'A popular library for writing CSS styles in your JavaScript components.', resources: [{ label: 'Styled Components Docs', url: 'https://styled-components.com/docs' }] },
      ]
    }
  ],
  "full-stack": [
    {
      type: 'milestone',
      label: 'Frontend Fundamentals',
      description: 'Start with the client-side technologies. Build what the user sees and interacts with.',
      nodes: [
        { type: 'main', label: 'HTML/CSS/JS', description: 'The building blocks of any website.', resources: [{ label: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Learn' }] },
        { type: 'main', label: 'React & Next.js', description: 'A powerful combination for building modern, server-rendered web applications.', resources: [{ label: 'Next.js Official Docs', url: 'https://nextjs.org/docs' }] },
        { type: 'sub', label: 'State Management (Zustand)', description: 'A small, fast, and scalable state-management solution for React.', resources: [{ label: 'Zustand GitHub Repository', url: 'https://github.com/pmndrs/zustand' }] },
      ]
    },
     {
      type: 'milestone',
      label: 'Backend Fundamentals',
      description: 'Move to the server-side technologies. Build the engine that powers your application.',
      nodes: [
        { type: 'main', label: 'Node.js & Express', description: 'A popular choice for building APIs with JavaScript.', resources: [{ label: 'Express.js Official Website', url: 'https://expressjs.com/' }] },
        { type: 'main', label: 'Databases (SQL/NoSQL)', description: 'Learn how to store and retrieve data. PostgreSQL for SQL, MongoDB for NoSQL.', resources: [{ label: 'PostgreSQL vs. MongoDB', url: 'https://www.mongodb.com/compare/mongodb-vs-postgresql' }] },
        { type: 'sub', label: 'ORM / ODM (Prisma)', description: 'A next-generation ORM for Node.js and TypeScript.', resources: [{ label: 'Prisma Official Docs', url: 'https://www.prisma.io/docs/' }] },
      ]
    },
    {
      type: 'milestone',
      label: 'Deployment & DevOps',
      description: 'Learn how to get your application on the internet and maintain it.',
      nodes: [
        { type: 'main', label: 'Docker', description: 'Containerize your application for consistent environments.', resources: [{ label: 'Docker Official Docs', url: 'https://docs.docker.com/' }] },
        { type: 'main', label: 'CI/CD (GitHub Actions)', description: 'Automate your build, test, and deployment pipeline.', resources: [{ label: 'GitHub Actions Docs', url: 'https://docs.github.com/en/actions' }] },
        { type: 'main', label: 'Cloud Providers (Firebase)', description: 'Host your application on a scalable cloud platform.', resources: [{ label: 'Firebase Hosting Docs', url: 'https://firebase.google.com/docs/hosting' }] },
      ]
    }
  ],
  mobile: [
    {
      type: 'milestone',
      label: 'Choose a Platform',
      description: 'Decide whether to focus on iOS, Android, or cross-platform development. We will focus on native development here.',
      nodes: [
        { type: 'main', label: 'Native Android (Kotlin)', description: 'Build apps specifically for Android devices using Google\'s recommended modern language.', resources: [{ label: 'Android Developer Docs', url: 'https://developer.android.com/docs' }] },
        { type: 'main', label: 'Native iOS (Swift)', description: 'Build apps specifically for Apple devices like iPhone and iPad.', resources: [{ label: 'Apple Developer Docs', url: 'https://developer.apple.com/documentation/' }] },
      ]
    },
    {
      type: 'milestone',
      label: 'Android Development Path',
      description: 'Key concepts and tools for building robust Android applications with Kotlin.',
      nodes: [
        { type: 'main', label: 'Kotlin Language', description: 'Master the fundamentals of the Kotlin programming language.', resources: [{ label: 'Kotlin Docs', url: 'https://kotlinlang.org/docs/home.html' }] },
        { type: 'main', label: 'Jetpack Compose', description: 'Android’s modern toolkit for building native UI declaratively.', resources: [{ label: 'Compose Pathway', url: 'https://developer.android.com/courses/pathways/compose' }] },
        { type: 'main', label: 'MVVM Architecture', description: 'The recommended architecture pattern for modern Android apps.', resources: [{ label: 'Guide to app architecture', url: 'https://developer.android.com/topic/architecture' }] },
        { type: 'sub', label: 'Coroutines & Flow', description: 'Manage background threads and handle asynchronous data streams.', resources: [{ label: 'Kotlin coroutines on Android', url: 'https://developer.android.com/kotlin/coroutines' }] },
      ]
    },
    {
      type: 'milestone',
      label: 'iOS Development Path',
      description: 'Key concepts and tools for building modern iOS applications with Swift.',
      nodes: [
        { type: 'main', label: 'Swift Language', description: 'Learn Apple\'s powerful and intuitive programming language.', resources: [{ label: 'The Swift Programming Language', url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/' }] },
        { type: 'main', label: 'SwiftUI', description: 'Build apps for all Apple platforms with a declarative Swift syntax.', resources: [{ label: 'SwiftUI Tutorials', url: 'https://developer.apple.com/tutorials/swiftui' }] },
        { type: 'main', label: 'MVVM Architecture', description: 'A popular architecture pattern for building scalable and maintainable iOS apps.', resources: [{ label: 'MVVM in SwiftUI', url: 'https://www.avanderlee.com/swift/mvvm-with-combine/' }] },
        { type: 'sub', label: 'Combine Framework', description: 'A declarative Swift API for processing values over time.', resources: [{ label: 'Using Combine', url: 'https://developer.apple.com/documentation/combine' }] },
      ]
    }
  ],
  "ai-ml": [
      {
      type: 'milestone',
      label: 'Math Foundations',
      description: 'A strong mathematical background is essential for understanding the algorithms behind AI and Machine Learning.',
      nodes: [
        { type: 'main', label: 'Linear Algebra', description: 'The study of vectors, matrices, and linear transformations, crucial for data representation.', resources: [{ label: 'Khan Academy: Linear Algebra', url: 'https://www.khanacademy.org/math/linear-algebra' }] },
        { type: 'main', label: 'Calculus', description: 'Used for optimization algorithms like gradient descent.', resources: [{ label: 'Khan Academy: Calculus', url: 'https://www.khanacademy.org/math/calculus-1' }] },
        { type: 'main', label: 'Probability & Statistics', description: 'The foundation for understanding data, uncertainty, and model evaluation.', resources: [{ label: 'Khan Academy: Statistics and probability', url: 'https://www.khanacademy.org/math/statistics-probability' }] },
      ]
    },
    {
      type: 'milestone',
      label: 'Python & Core Libraries',
      description: 'Python is the de facto language for AI/ML. These libraries are the workhorses of any ML project.',
      nodes: [
        { type: 'main', label: 'Python Programming', description: 'Master the language syntax and data structures.', resources: [{ label: 'Official Python Tutorial', url: 'https://docs.python.org/3/tutorial/' }] },
        { type: 'main', label: 'NumPy', description: 'The fundamental package for scientific computing with Python.', resources: [{ label: 'NumPy Docs', url: 'https://numpy.org/doc/stable/' }] },
        { type: 'main', label: 'Pandas', description: 'A powerful data analysis and manipulation library.', resources: [{ label: 'Pandas Docs', url: 'https://pandas.pydata.org/docs/' }] },
        { type: 'main', label: 'Matplotlib & Seaborn', description: 'Libraries for data visualization.', resources: [{ label: 'Matplotlib Docs', url: 'https://matplotlib.org/stable/contents.html' }] },
      ]
    },
    {
      type: 'milestone',
      label: 'Machine Learning Frameworks',
      description: 'High-level frameworks that make building and training models much easier.',
      nodes: [
        { type: 'main', label: 'Scikit-learn', description: 'Simple and efficient tools for predictive data analysis.', resources: [{ label: 'Scikit-learn Docs', url: 'https://scikit-learn.org/stable/user_guide.html' }] },
        { type: 'main', label: 'TensorFlow', description: 'An end-to-end open source platform for machine learning by Google.', resources: [{ label: 'TensorFlow Core', url: 'https://www.tensorflow.org/guide' }] },
        { type: 'main', label: 'PyTorch', description: 'An open source machine learning framework that accelerates the path from research prototyping to production deployment.', resources: [{ label: 'PyTorch Docs', url: 'https://pytorch.org/docs/stable/index.html' }] },
        { type: 'main', label: 'Genkit', description: 'The Genkit framework helps you build, deploy, and monitor production-grade AI-powered apps.', resources: [{ label: 'Genkit Docs', url: 'https://firebase.google.com/docs/genkit' }] },
      ]
    }
  ],
  cybersecurity: [
    {
      type: 'milestone',
      label: 'Networking Fundamentals',
      description: 'Understand how computer networks work to identify vulnerabilities and secure them.',
      nodes: [
        { type: 'main', label: 'OSI Model', description: 'A conceptual framework used to understand network interactions in seven layers.', resources: [{ label: 'Cloudflare: What is the OSI Model?', url: 'https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/' }] },
        { type: 'main', label: 'TCP/IP', description: 'The core protocols of the internet that govern data transmission.', resources: [{ label: 'TCP/IP Guide', url: 'http://www.tcpipguide.com/free/index.htm' }] },
        { type: 'sub', label: 'Common Ports & Protocols', description: 'Learn about HTTP, HTTPS, FTP, SSH, DNS and their associated port numbers.', resources: [{ label: 'List of TCP and UDP port numbers', url: 'https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers' }] },
      ]
    },
    {
      type: 'milestone',
      label: 'Operating Systems & Security',
      description: 'Learn the fundamentals of securing major operating systems.',
      nodes: [
        { type: 'main', label: 'Linux Security', description: 'Master file permissions, user management, and hardening techniques for Linux systems.', resources: [{ label: 'Linux Security Guide', url: 'https://www.linux.org/threads/linux-security-a-practical-guide.43734/' }] },
        { type: 'main', label: 'Windows Security', description: 'Understand Active Directory, Group Policy, and security features in Windows.', resources: [{ label: 'Microsoft Security Documentation', url: 'https://docs.microsoft.com/en-us/security/' }] },
      ]
    },
    {
      type: 'milestone',
      label: 'Ethical Hacking & Penetration Testing',
      description: 'Learn to think like an attacker to find and fix vulnerabilities before malicious actors do.',
      nodes: [
        { type: 'main', label: 'OWASP Top 10', description: 'A standard awareness document for developers and web application security.', resources: [{ label: 'OWASP Top 10 Website', url: 'https://owasp.org/www-project-top-ten/' }] },
        { type: 'main', label: 'Metasploit Framework', description: 'A popular penetration testing tool.', resources: [{ label: 'Metasploit Unleashed', url: 'https://www.offensive-security.com/metasploit-unleashed/' }] },
        { type: 'main', label: 'Nmap', description: 'A free and open-source network scanner.', resources: [{ label: 'Nmap Official Site', url: 'https://nmap.org/' }] },
      ]
    }
  ],
};

export const roadmapDetails = {
  backend: { title: 'Backend Developer Roadmap' },
  frontend: { title: 'Frontend Developer Roadmap' },
  'full-stack': { title: 'Full Stack Developer Roadmap' },
  mobile: { title: 'Mobile Developer Roadmap' },
  'ai-ml': { title: 'AI/ML Developer Roadmap' },
  cybersecurity: { title: 'Cybersecurity Roadmap' },
}
