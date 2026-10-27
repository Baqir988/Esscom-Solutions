import { pageMetadata } from "@/lib/metadata";
import { publishedProjects } from "@/data/projects";
import { publishedSolutions } from "@/data/solutions";
import { PageHero } from "@/components/ui/page-hero";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { ConnectedSystems } from "@/components/ui/connected-systems";
import { ContactCTA } from "@/components/ui/contact-cta";
import { PrimaryButton } from "@/components/ui/buttons";
import { ProjectCollection } from "@/components/projects/project-collection";
import { ProjectEmpty } from "@/components/projects/project-empty";
import { SolutionGrid } from "@/components/solutions/solution-card";
export const metadata = pageMetadata("Projects & Portfolio", "Explore ESSCOM’s project publication area and relevant technology solutions. Attributed installation stories and photographs are published only after approval.", "/projects/");
export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="PROJECTS & PORTFOLIO"
        title="Technology in its working environment."
        description="A place for approved installation stories: the requirement, the technology, and the work involved."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects/" },
        ]}
        visual={<ConnectedSystems />}
        actions={
          <PrimaryButton href="#project-collection">
            Explore the portfolio
          </PrimaryButton>
        }
      />
      <SectionWrapper className="section-white" id="project-collection">
        <div className="section-top">
          <SectionHeading
            eyebrow="PROJECT STORIES"
            title="Context behind every installation."
            description="A useful project reference connects a clear requirement with the approved scope of work and the equipment involved."
          />
        </div>
        {publishedProjects.length ? <ProjectCollection
          items={publishedProjects}
          categories={publishedSolutions.map((item) => ({
            id: item.slug,
            name: item.shortTitle,
          }))}
        /> : <ProjectEmpty />}
      </SectionWrapper>
      <SectionWrapper>
        <div className="section-top">
          <SectionHeading
            eyebrow="RELEVANT TECHNOLOGIES"
            title="Explore the systems behind a project."
            description="These solution categories describe potential applications, rather than a list of completed installations."
          />
        </div>
        <SolutionGrid solutions={publishedSolutions} />
      </SectionWrapper>
      <ContactCTA
        title="Think through your next installation."
        description="Understand the technology categories and consider the requirements of your site before defining a solution."
      />
    </>
  );
}
