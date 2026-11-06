import { Section, SectionHeader } from "@/components/section";
import { Terminal } from "@/components/terminal";

const STACK = [
  { term: "Services", items: "FastAPI, Django, microservices" },
  { term: "Messaging", items: "NATS JetStream" },
  { term: "Data", items: "Postgres behind PgBouncer, Dragonfly, S3" },
  { term: "AI", items: "AWS Bedrock, retrieval, AI tools" },
  { term: "Agents", items: "LangGraph, CopilotKit, MCP" },
  { term: "Deploy", items: "AWS, Kubernetes, Helm" },
];

export function Systems() {
  return (
    <Section id="systems">
      <SectionHeader
        index="01"
        title="What I work on"
        intro="At Tutanic I work on backend services and AI systems: the services, the streams between them, the stores behind them, the agents and tools on top, and the AWS and Kubernetes they deploy to. The terminal answers the rest."
      />
      <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="reveal lg:col-span-7">
          <Terminal />
        </div>
        <dl className="reveal border-t border-border lg:col-span-5">
          {STACK.map((row) => (
            <div key={row.term} className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-border py-3.5">
              <dt className="eyebrow pt-0.5">{row.term}</dt>
              <dd className="text-[15px] leading-snug">{row.items}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
