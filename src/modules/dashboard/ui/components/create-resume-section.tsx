import { useCreateResume } from "@/modules/resume/queries/use-create-resume";
import { useNavigate } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import type { ReactNode } from "react";

export function CreateResumeSection() {
  return (
    <section className="bg-muted">
      <div className="text-muted-foreground px-4 py-2 space-y-4 max-w-5xl mx-auto">
        <h1 className="text-lg font-medium">New resume</h1>
        <ul className="flex gap-4">
          <TemplateListItem
            template={{
              markdown: "",
              css: "",
              title: "Blank",
            }}
          >
            <div className="w-[220px] h-[300px] bg-white flex items-center justify-center">
              <PlusIcon className="size-10" />
            </div>
          </TemplateListItem>
          {resumeTemplates.map((t, i) => (
            <TemplateListItem key={i} template={t} />
          ))}
        </ul>
      </div>
    </section>
  );
}

type TemplateListItemProps = {
  template: ResumeTemplate;
  children?: ReactNode;
};

function TemplateListItem({ template, children }: TemplateListItemProps) {
  const { mutateAsync, isPending } = useCreateResume();
  const navigate = useNavigate();

  async function handleCreate() {
    await mutateAsync(
      {
        title: template.title,
        css: template.css,
        markdown: template.markdown,
      },
      {
        onSuccess: (id) => {
          navigate({
            to: "/resume/$id",
            params: {
              id,
            },
          });
        },
      },
    );
  }

  return (
    <li className="hover:bg-accent/50 hover:cursor-pointer">
      <button
        type={"button"}
        className="border-2 border-border rounded hover:border-primary disabled:opacity-60"
        disabled={isPending}
        onClick={handleCreate}
      >
        {template.image && (
          <img
            src={template.image}
            alt="Default template"
            className="w-[220px] h-[300px]"
          />
        )}
        {children}
      </button>
      <h2 className="text-lg font-semibold">{template.title}</h2>
      {template.description && (
        <p className="text-sm font-normal">{template.description}</p>
      )}
    </li>
  );
}

type ResumeTemplate = {
  title: string;
  image?: string;
  description?: string;
  markdown: string;
  css: string;
};

const resumeTemplates: ResumeTemplate[] = [
  {
    title: "Soft Gray",
    image: "/default_pdf_showcase.png",
    markdown: `

<center>

# JOHN DOE
[johndoe.dev](https://johndoe.dev) | [john.doe@example.com](mailto:john.doe@example.com) | [linkedin.com/in/johndoe](https://linkedin.com/in/johndoe) | [github.com/johndoe](https://github.com/johndoe)

</center>

---

<div class="resume-section">

## Objective
Full Stack Developer skilled in PHP, Java, and JavaScript/TypeScript. Seeking opportunities to apply my expertise to innovative projects, enhance team collaboration, and deliver robust technical solutions.

</div>

---

<div class="resume-section">

## Education

### Generic University - Anywhere, USA
  _Computer Science_
  September 2021 - June 2024

</div>

---

<div class="resume-section">

## Technical Skills

- **Programming Languages**: Java, JavaScript/TypeScript, Python, PHP

- **Frameworks**: Spring Boot, Next.js, React, Svelte, Laravel

- **Databases**: PostgreSQL, MySQL, SQLite, MongoDB

- **Tools**: Git, Docker, Node.js, Tailwind CSS, CI/CD (GitHub Actions)

- **Markup**: HTML, CSS, Markdown

</div>

---

<div class="resume-section">

## Experience

### Software Development Intern
  _Tech Solutions Inc., New York, NY_
  June 2023 - August 2023
  - Collaborated with a team to develop and optimize web applications using React and Node.js.
  - Assisted in creating RESTful APIs and integrating third-party services.
  - Implemented front-end enhancements, ensuring responsiveness and cross-browser compatibility.
  - Conducted software testing and debugging, improving code quality and performance.

### Customer Support Representative
  _Global Assist Co., Los Angeles, CA_
  July 2022 - April 2023
  - Provided technical support to resolve customer issues efficiently and effectively.
  - Created documentation and guides to streamline problem resolution processes.
  - Assisted in training new hires on customer interaction protocols and tools.

</div>

---

<div class="resume-section">

## Projects

### Generic Clinic Management System
  [GitHub](https://github.com/johndoe/clinic-management-system)
  _PHP, Laravel, Livewire, Alpine.js, MySQL_

  - Designed and developed a backend system for managing patient, doctor, and appointment records.
  - Implemented CRUD operations for efficient handling of clinical data.
  - Automated appointment scheduling with doctor availability verification.
  - Built a responsive and interactive interface using Alpine.js and Livewire.
  - Ensured secure data storage with MySQL integration.
  - Successfully deployed the application, achieving high uptime and user satisfaction.

### Task Tracker App
  [GitHub](https://github.com/johndoe/task-tracker)
  _React, Node.js, PostgreSQL_

  - Created a task management application for personal and team use.
  - Developed a feature-rich front end with React, allowing dynamic task updates.
  - Integrated PostgreSQL for reliable data management and retrieval.
  - Implemented authentication and role-based access controls.

</div>

---

<div class="resume-section">

## Certifications

- [Full Stack Web Development - Coursera](https://example.com)
- [Java Programming Masterclass - Udemy](https://example.com)
- [Advanced JavaScript - Pluralsight](https://example.com)
- [Database Management with SQL - Codecademy](https://example.com)

<br>

</div>
    `,
    css: `
:root {
  --resume-background: #eff1f5;
  --resume-foreground: #4c4f69;

  --title-color: #000;
  --subtitle-color: #5c5f77;
  --link-color: #1e66f5;

  --fs-xs: 14px;
  --fs-sm: 16px;
  --fs-md: 18px;
  --fs-lg: 20px;
}

body {
  margin: 0 auto;
  padding: 1em;
  background: var(--resume-background);
  color: var(--resume-foreground);
  font-family: Arial, Helvetica, sans-serif;
  font-size: var(--fs-xs);
  line-height: 1.5;
  max-width: 1200px;
}

a {
  color: var(--link-color);
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  font-weight: bold;
}

h1 {
  text-align: center;
  font-size: var(--fs-lg);
  margin-bottom: 0.8rem;
  color: var(--title-color);
}

h2 {
  font-size: var(--fs-md);
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: var(--title-color);
}

h3 {
  font-size: var(--fs-sm);
  color: var(--subtitle-color);
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.resume-section {
  padding: 0.7rem;
}

ul {
  list-style-type: disc;
  margin-top: 0.5rem;
}

li {
  margin-bottom: 0.5rem;
}

em {
  font-style: italic;
}

strong {
  font-weight: bold;
}
    `,
  },
  {
    title: "Simple resume",
    image: "/simple_resume_showcase.png",
    markdown: `
<center>

# John A. Doe

123 Main Street, Cambridge, MA 02138

(123) 456-7890  [john.doe@email.com](mailto:john.doe@email.com)  [linkedin.com/in/johndoe](linkedin.com/in/johndoe)  [github.com/johndoe](github.com/johndoe)

</center>

---

## Education

**Harvard University**, Cambridge, MA
_Bachelor of Science in Computer Science_  May 2024
- GPA: 3.8/4.0
- Relevant Coursework: Algorithms, Machine Learning, Systems Programming, Data Structures

---

## Experience

**Google**, Mountain View, CA
_Software Engineering Intern_  Summer 2023
- Designed and implemented a dashboard to visualize system health metrics, improving team monitoring by 35%
- Contributed to backend services using Go and Protocol Buffers

**Harvard Student Agencies**, Cambridge, MA
_Frontend Developer_  Sep 2021  May 2023
- Developed internal tools for student-run businesses using React and Tailwind CSS
- Improved site performance by 22% by refactoring legacy code

---

## Projects

**PathFinder**  Visual algorithm simulator
- Created an interactive pathfinding visualizer using Dijkstra and A*
- Over 10,000 users in the first month on GitHub Pages

---

## Leadership & Activities

**Harvard Computer Society**  Events Chair
- Organized weekly workshops on web development and interview prep
- Coordinated HackHarvard 2022 with 300+ attendees

**Teaching Fellow, CS50: Introduction to Computer Science**
- Led weekly sections of 15+ students, hosted office hours, and graded assignments

---

## Skills

- **Languages**: JavaScript, TypeScript, Python, Go, SQL
- **Frameworks/Tools**: React, Next.js, Node.js, Tailwind, Git, Docker
- **Languages**: English (fluent), Spanish (conversational)  
    `,
    css: `
html,
body {
  margin: 0 auto;
  padding: 1em;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  max-width: 900px;
}
    `,
  },
];
