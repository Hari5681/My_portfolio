
export interface SkillContent {
    title: string;
    progress?: number;
    intro: string;
    details: string;
    roadmap?: Array<{
        title: string;
        status: string;
        points: string[];
    }>;
}

export const skillsContent: Record<string, SkillContent> = {
    kotlin: {
        title: "Kotlin Skills & Journey – Code with Hari",
        progress: 60,
        intro: "My Kotlin Adventure – 60% Complete. Kotlin isn’t just a programming language for me—it’s the language where my app ideas come alive. I’m about 60% through my learning journey, experimenting with everything from simple apps to more interactive UI experiences.",
        details: `
### Why I Chose Kotlin
- **Clean & Modern:** Kotlin makes coding easier and less painful than Java.
- **Jetpack Compose:** Smooth way to design UI without losing sanity.
- **Community & Resources:** Tons of tutorials and libraries that help me level up quickly.
- **Fun Factor:** Because typing \`println("Hello, HariVerse!")\` never gets old.

### My Kotlin Process – How I Actually Code
1.  **Understand the Idea** – Sketch the app, think about user needs, plan logic.
2.  **Build & Experiment** – Write code, test it, break it, fix it, repeat.
3.  **Iterate & Refine** – Improve performance, polish UI, add animations.
4.  **Document & Showcase** – Prepare apps for portfolio, share learnings.

> Life motto in Kotlin: "Write. Break. Debug. Repeat. And maybe add a coffee break in between."
        `,
        roadmap: [
            {
                title: "Phase 1 – Foundation",
                status: "100% Complete",
                points: [
                    "Learned Kotlin basics: variables, loops, conditionals, functions, classes.",
                    "Built simple console apps to understand logic."
                ]
            },
            {
                title: "Phase 2 – App Development",
                status: "60% Complete",
                points: [
                    "Started creating Android apps with Jetpack Compose.",
                    "Integrated layouts, buttons, navigation, and offline features.",
                    "Experimented with animations and interactive UI."
                ]
            },
            {
                title: "Phase 3 – Portfolio-Ready Projects",
                status: "In Progress",
                points: [
                    "Polishing apps with real-world features.",
                    "Adding smooth animations, toggles for online/offline modes, and intuitive navigation.",
                    "Preparing projects to showcase in HariVerse portfolio."
                ]
            },
            {
                title: "Phase 4 – Advanced & AI Integration",
                status: "Future Goals",
                points: [
                    "Integrate AI features into apps.",
                    "Explore Kotlin Multiplatform for web and desktop apps.",
                    "Combine Kotlin with IoT and embedded systems."
                ]
            }
        ]
    },
    mvvm: {
        title: "MVVM Architecture – Coming Soon!",
        intro: "Hang Tight… The Magic is on the Way. I’m currently cooking up some MVVM-powered apps that will make my HariVerse portfolio shine even brighter.",
        details: `
### The Core Components:
- **Model:** The brains behind the app—handling data like a pro.
- **ViewModel:** The bridge connecting your beautiful UI to smart data.
- **View:** The part you see and love—the interface that feels alive.

> Fun fact: MVVM might sound like a robot, but don’t worry—this robot will make your apps smarter and cleaner.
        `,
    },
    firebase: {
        title: "Firebase Skills – Work in Progress",
        progress: 25,
        intro: "I’ve dipped my toes into Firebase, and it’s already changing the way I think about apps. Right now, I’m at about 25% progress, mostly exploring databases, authentication, and basic cloud features.",
        details: `
### Why I Chose Firebase
- **Realtime Features:** Because users love apps that feel alive.
- **Scalability:** My apps grow with me (and hopefully one day with users!).
- **Integration:** Works perfectly with Kotlin, MVVM, and my HariVerse apps.
- **Fun Factor:** Watching data sync instantly is oddly satisfying.

### My Firebase Process – How I Work
1.  **Explore & Understand** – Read docs, try tutorials, break things on purpose.
2.  **Integrate & Test** – Connect Firebase with Kotlin apps, test features thoroughly.
3.  **Iterate & Improve** – Add real-world app features, handle errors, polish UI.
4.  **Document & Showcase** – Keep a clear record for my portfolio and future reference.

> Motto: "Firebase 25% today, 100% magic tomorrow."
        `,
        roadmap: [
            {
                title: "Phase 1 – Basics",
                status: "25% Done",
                points: [
                    "Setting up Firebase in Android Studio",
                    "Learning Firestore database structure",
                    "Implementing simple login/authentication"
                ]
            },
            {
                title: "Phase 2 – Intermediate Features",
                status: "In Progress",
                points: [
                    "Offline data sync for apps",
                    "Uploading and retrieving files (like MP3 or images)",
                    "Adding push notifications and cloud functions"
                ]
            },
            {
                title: "Phase 3 – Portfolio-Ready Integration",
                status: "Future Goals",
                points: [
                    "Full integration with HariVerse apps",
                    "Dynamic content updates for users",
                    "AI + Firebase powered features"
                ]
            }
        ]
    },
    'shared-preferences': {
        title: "Shared Preferences & Room",
        progress: 10,
        intro: "I’ve just started exploring Shared Preferences and Room Database, so consider this the 'first steps' phase of my journey.",
        details: `
### Why I’m Learning This
- **Shared Preferences:** To remember what users like, even if they close the app.
- **Room Database:** For offline-first apps that store bigger data locally.
- **Combined:** Helps me make apps more responsive, reliable, and user-friendly.

### My Process – How I’m Learning
1.  **Understand & Explore** – Read docs, watch tutorials, experiment.
2.  **Build Small Projects** – Test Shared Preferences for settings, Room for local storage.
3.  **Iterate & Improve** – Handle errors, optimize queries, refine structure.
4.  **Document & Showcase** – Keep code neat and ready for portfolio.

> Motto: "Start small, store smart, scale fast."
        `,
        roadmap: [
            {
                title: "Phase 1 – Basics",
                status: "Just Started",
                points: [
                    "Learn Shared Preferences syntax and usage.",
                    "Understand Room entities, DAOs, and database creation."
                ]
            },
            {
                title: "Phase 2 – Intermediate Integration",
                status: "Coming Soon",
                points: [
                    "Save user settings and app states.",
                    "Store and retrieve complex objects in Room database.",
                    "Combine Room + ViewModel for clean architecture."
                ]
            },
            {
                title: "Phase 3 – Portfolio-Ready Projects",
                status: "Future Goals",
                points: [
                    "Offline-capable HariVerse features.",
                    "Smooth, persistent data storage in apps.",
                    "Showcase clean MVVM + Room + Shared Preferences workflow."
                ]
            }
        ]
    },
    'android-studio': {
        title: "Android Studio – My Learning Journey",
        progress: 40,
        intro: "I’m currently 40% through my Android Studio learning journey, experimenting with app layouts, navigation, offline features, and interactive UI. Some days I feel like a coding wizard, other days the emulator laughs at me—but that’s all part of the fun!",
        details: `
### Why I’m Using Android Studio
- **All-in-One IDE:** Code, design, test, and debug in one place.
- **Jetpack Compose Friendly:** Modern, smooth, and fun for UI building.
- **Integrates With Everything:** Kotlin, Firebase, Room, Shared Preferences, and MVVM.
- **Learning by Doing:** Every bug is a tiny adventure, every fix is a small victory.

### My Android Studio Process – How I Work
1.  **Plan & Sketch** – Decide app screens, navigation, and features.
2.  **Build & Experiment (40% Done)** – Write code, tweak UI, test features, break and fix.
3.  **Iterate & Refine** – Improve functionality, fix bugs, polish UI.
4.  **Document & Showcase** – Prepare portfolio-ready apps and track learning.

> Motto: "Code, break, debug, design, repeat… now 40% mastered, more fun to come!"
        `,
        roadmap: [
            {
                title: "Phase 1 – Basics",
                status: "80% Done",
                points: ["Navigating the IDE, building simple apps, understanding Gradle & dependencies.", "Learning XML layouts and basic Jetpack Compose components."]
            },
            {
                title: "Phase 2 – Intermediate Features",
                status: "40% Done",
                points: ["Building apps with BottomNavigationView and Fragments.", "Integrating Shared Preferences and Room Database for offline functionality.", "Adding basic animations and interactive UI elements."]
            },
            {
                title: "Phase 3 – Portfolio-Ready",
                status: "Upcoming",
                points: ["Combine MVVM + Kotlin + Firebase + polished UI/UX.", "Make HariVerse apps fully functional, interactive, and visually appealing."]
            },
            {
                title: "Phase 4 – Future Goals",
                status: "Future Goals",
                points: ["Add AI-powered features to apps.", "Explore Kotlin Multiplatform for web and desktop.", "Optimize apps for performance, offline use, and scalability."]
            }
        ]
    },
    'git-github': {
        title: "Git & GitHub – Version Control Adventure",
        progress: 20,
        intro: "I’m dipping my toes into Git and GitHub, the dynamic duo that keeps my code organized, backed up, and ready for collaboration. At 20% progress, I’m learning the basics of version control and feeling like a captain navigating a sea of commits.",
        details: `
### Why I’m Learning Git & GitHub
- **Version Control:** Track every change, because every fix counts.
- **Collaboration:** Work with teammates or contribute to open-source projects.
- **Backup & Safety:** Never lose code again (goodbye lost files!).
- **Professional Skills:** Git + GitHub is essential for any developer’s toolkit.

### My Git & GitHub Process – How I Work
1.  **Plan Changes** – Know what I want to change before touching the code.
2.  **Commit Often (20% Done)** – Save progress, write clear commit messages.
3.  **Branch & Experiment** – Try new features safely without breaking main code.
4.  **Push & Document** – Upload to GitHub, track progress, and share work.

> Motto: "Commit early, commit often, push confidently, merge carefully!"
        `,
        roadmap: [
            {
                title: "Phase 1 – Basics",
                status: "20% Done",
                points: ["Initialize repositories, make commits, track changes locally.", "Learn essential Git commands and workflows."]
            },
            {
                title: "Phase 2 – Intermediate",
                status: "Upcoming",
                points: ["Work with branches, merge without conflicts, and manage pull requests.", "Push and pull code from GitHub repositories.", "Fork, clone, and contribute to other projects."]
            },
            {
                title: "Phase 3 – Advanced / Portfolio Integration",
                status: "Future Goals",
                points: ["Apply Git & GitHub to HariVerse projects for version control.", "Maintain clean commit history and documentation.", "Collaborate on real-world projects, showcasing teamwork skills."]
            }
        ]
    },
    'debugging': {
        title: "Logcat – Debugging Adventure",
        progress: 5,
        intro: "I’ve just started exploring Logcat in Android Studio, the magical window that shows what my app is really doing behind the scenes. At 5% progress, it’s mostly me staring at colorful logs, learning to tell errors from warnings… and sometimes ignoring info messages.",
        details: `
### Why I’m Learning Logcat
- **Debugging:** Essential for finding and fixing bugs.
- **Learning App Behavior:** See exactly how the app behaves in real-time.
- **Efficiency:** Quickly spot errors without guessing.
- **Professional Practice:** Every Android developer should know their Logcat well.

### My Logcat Process – How I Work
1.  **Observe Logs (5% Done)** – Check for errors, warnings, and relevant info.
2.  **Investigate** – Trace the source of crashes or unexpected behavior.
3.  **Fix & Test** – Apply fixes, re-run the app, verify results.
4.  **Document & Learn** – Keep track of lessons learned for future debugging.

> Motto: "Log it, find it, fix it… repeat!"
        `,
        roadmap: [
            {
                title: "Phase 1 – Basics",
                status: "5% Done",
                points: ["Learn to open Logcat in Android Studio.", "Identify errors, warnings, and info logs."]
            },
            {
                title: "Phase 2 – Intermediate",
                status: "Upcoming",
                points: ["Filter logs by app, tag, or severity.", "Understand stack traces and exceptions.", "Use Logcat to debug app crashes and UI issues."]
            },
            {
                title: "Phase 3 – Advanced / Portfolio-Ready",
                status: "Future Goals",
                points: ["Integrate Logcat debugging into HariVerse projects.", "Efficiently fix errors, optimize performance, and monitor app behavior.", "Document important fixes and lessons learned for portfolio."]
            }
        ]
    },
    'ms-office': {
        title: "MS Office – Basics Complete",
        progress: 100,
        intro: "I’ve completed the basic skills in MS Office, and now I can confidently create documents, spreadsheets, and presentations that actually make sense (and don’t look like total chaos).",
        details: `
### Why I Learned MS Office
- **Productivity:** Helps me organize work and present ideas clearly.
- **Professional Skills:** Every office or college project expects these skills.
- **Portfolio Ready:** Useful for documenting projects, reports, and app ideas.
- **Efficiency:** Save time with templates, formulas, and smart formatting.

### My MS Office Process – How I Work
1.  **Plan the Content** – Decide what to write, calculate, or present.
2.  **Build Documents / Sheets / Slides** – Apply formatting and structure.
3.  **Refine & Polish** – Check alignment, readability, and visuals.
4.  **Save & Share** – Export, share, and keep files organized.

> Motto: "Organize, format, present, repeat!"
        `,
        roadmap: [
            {
                title: "Phase 1 – Basics",
                status: "Done",
                points: ["Word: text formatting, tables, headers, footers", "Excel: simple formulas, basic charts, data entry", "PowerPoint: slides, images, transitions"]
            },
            {
                title: "Phase 2 – Intermediate",
                status: "Upcoming",
                points: ["Excel: advanced formulas, pivot tables, conditional formatting", "Word: mail merge, references, advanced formatting", "PowerPoint: animations, multimedia integration, design themes"]
            },
            {
                title: "Phase 3 – Advanced / Portfolio-Ready",
                status: "Future Goals",
                points: ["Integrate Excel charts and Word reports into presentations", "Use MS Office efficiently to document HariVerse projects", "Collaborate using OneDrive / cloud tools"]
            }
        ]
    }
};
