const fs = require('fs');

const faqsHTML = `
<details class="os-faq-item" style="border: 1px solid var(--candy-pink); border-radius: var(--radius-md); background: var(--bg-cream-alt); overflow: hidden;">
<summary style="padding: 20px 24px; font-size: 1.1rem; font-weight: 700; color: var(--ink-black); cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; user-select: none;">
Is agentic AI the same thing as an AI agent? <span class="os-faq-icon" style="color: var(--candy-pink); font-size: 1.5rem; font-weight: 300; transition: transform 0.3s ease;">+</span>
</summary>
<div style="padding: 24px; background: var(--candy-pink-soft); font-size: 1.05rem; line-height: 1.7; color: var(--ink-secondary); border-top: 1px solid var(--candy-pink);">
<p style="margin: 0;">Not quite, though the terms are closely related and often used loosely. "Agentic AI" describes the broader architectural approach systems built around perceiving, reasoning, and acting toward a goal. "An AI agent" is typically one specific instance built using that approach, scoped to a particular job. You could have several individual AI agents, all operating on agentic AI principles, working together as one system.</p>
</div>
</details>

<details class="os-faq-item" style="border: 1px solid var(--candy-pink); border-radius: var(--radius-md); background: var(--bg-cream-alt); overflow: hidden;">
<summary style="padding: 20px 24px; font-size: 1.1rem; font-weight: 700; color: var(--ink-black); cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; user-select: none;">
How is agentic AI different from generative AI? <span class="os-faq-icon" style="color: var(--candy-pink); font-size: 1.5rem; font-weight: 300; transition: transform 0.3s ease;">+</span>
</summary>
<div style="padding: 24px; background: var(--candy-pink-soft); font-size: 1.05rem; line-height: 1.7; color: var(--ink-secondary); border-top: 1px solid var(--candy-pink);">
<p style="margin: 0;">Generative AI is about producing new content text, images, code in response to a prompt, and then the interaction ends. Agentic AI goes further: it perceives a situation, plans a sequence of steps, takes real actions using external tools, and keeps that loop running toward a goal, often without a human prompting each individual step. Generative AI is frequently a component inside an agentic system, but the two terms describe different things.</p>
</div>
</details>

<details class="os-faq-item" style="border: 1px solid var(--candy-pink); border-radius: var(--radius-md); background: var(--bg-cream-alt); overflow: hidden;">
<summary style="padding: 20px 24px; font-size: 1.1rem; font-weight: 700; color: var(--ink-black); cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; user-select: none;">
Does Agentic AI mean AI is operating with no human oversight? <span class="os-faq-icon" style="color: var(--candy-pink); font-size: 1.5rem; font-weight: 300; transition: transform 0.3s ease;">+</span>
</summary>
<div style="padding: 24px; background: var(--candy-pink-soft); font-size: 1.05rem; line-height: 1.7; color: var(--ink-secondary); border-top: 1px solid var(--candy-pink);">
<p style="margin: 0;">No, and this is one of the most common and important misconceptions. The pattern that works in real businesses is approval-gated autonomy the agent handles research, drafting, and analysis independently, but anything consequential that leaves the system and touches a customer, a financial record, or the public internet gets routed through a human checkpoint first. Genuine autonomy and complete lack of oversight are not the same thing and confusing them is where real damage tends to happen.</p>
</div>
</details>

<details class="os-faq-item" style="border: 1px solid var(--candy-pink); border-radius: var(--radius-md); background: var(--bg-cream-alt); overflow: hidden;">
<summary style="padding: 20px 24px; font-size: 1.1rem; font-weight: 700; color: var(--ink-black); cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; user-select: none;">
What kinds of businesses benefit most from agentic AI? <span class="os-faq-icon" style="color: var(--candy-pink); font-size: 1.5rem; font-weight: 300; transition: transform 0.3s ease;">+</span>
</summary>
<div style="padding: 24px; background: var(--candy-pink-soft); font-size: 1.05rem; line-height: 1.7; color: var(--ink-secondary); border-top: 1px solid var(--candy-pink);">
<p style="margin: 0;">Any business with recurring, well-defined, currently manual tasks tend to see quick value smaller companies often benefit proportionally more, because they typically lack the headcount to absorb repetitive work the way a larger team can. A five-person company running an agentic system for inbox triage and outbound research is effectively adding capacity it couldn't otherwise afford to hire for outright.</p>
</div>
</details>

<details class="os-faq-item" style="border: 1px solid var(--candy-pink); border-radius: var(--radius-md); background: var(--bg-cream-alt); overflow: hidden;">
<summary style="padding: 20px 24px; font-size: 1.1rem; font-weight: 700; color: var(--ink-black); cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; user-select: none;">
What's the biggest mistake businesses make when adopting agentic AI? <span class="os-faq-icon" style="color: var(--candy-pink); font-size: 1.5rem; font-weight: 300; transition: transform 0.3s ease;">+</span>
</summary>
<div style="padding: 24px; background: var(--candy-pink-soft); font-size: 1.05rem; line-height: 1.7; color: var(--ink-secondary); border-top: 1px solid var(--candy-pink);">
<p style="margin: 0;">Trying to automate a process that was never clearly defined to begin with, and separately, treating "autonomous" as a synonym for "unsupervised" once an agent has proven reliable for a while. Both mistakes tend to compound quietly until something visible goes wrong.</p>
</div>
</details>

<details class="os-faq-item" style="border: 1px solid var(--candy-pink); border-radius: var(--radius-md); background: var(--bg-cream-alt); overflow: hidden;">
<summary style="padding: 20px 24px; font-size: 1.1rem; font-weight: 700; color: var(--ink-black); cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; user-select: none;">
How is agentic AI different from traditional workflow automation? <span class="os-faq-icon" style="color: var(--candy-pink); font-size: 1.5rem; font-weight: 300; transition: transform 0.3s ease;">+</span>
</summary>
<div style="padding: 24px; background: var(--candy-pink-soft); font-size: 1.05rem; line-height: 1.7; color: var(--ink-secondary); border-top: 1px solid var(--candy-pink);">
<p style="margin: 0;">Traditional automation follows fixed, pre-programmed rules if this specific trigger happens, do this specific action, every time, with no real interpretation involved. Agentic AI reasons through situations that weren't explicitly anticipated in advance and decide on a sensible response using judgment rather than a rigid lookup table. That flexibility is exactly what lets an agentic system handle the messy, varied situations that break rigid automation though it's also precisely why oversight matters more here than it does for simpler, rule-based automation.</p>
</div>
</details>

<details class="os-faq-item" style="border: 1px solid var(--candy-pink); border-radius: var(--radius-md); background: var(--bg-cream-alt); overflow: hidden;">
<summary style="padding: 20px 24px; font-size: 1.1rem; font-weight: 700; color: var(--ink-black); cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; user-select: none;">
Is 2026 really different, or is this just the next wave of AI hype? <span class="os-faq-icon" style="color: var(--candy-pink); font-size: 1.5rem; font-weight: 300; transition: transform 0.3s ease;">+</span>
</summary>
<div style="padding: 24px; background: var(--candy-pink-soft); font-size: 1.05rem; line-height: 1.7; color: var(--ink-secondary); border-top: 1px solid var(--candy-pink);">
<p style="margin: 0;">There's a real, measurable difference underneath the hype this time: language models genuinely got better at sustaining long, coherent multi-step reasoning without losing the thread; tool use infrastructure connecting models to real external systems matured significantly; running these longer reasoning chains became economically sane at real business scale; and the governance and audit tooling needed to trust these systems in production caught up enough for risk-conscious teams to actually approve their use. That combination is what separates this moment from earlier rounds of AI enthusiasm that didn't have all the pieces in place yet.</p>
</div>
</details>
`;

let content = fs.readFileSync('src/content/blog/agentic-ai.md', 'utf8');

const target = `<div style="display: flex; flex-direction: column; gap: 16px;">

</div>`;
const replacement = `<div style="display: flex; flex-direction: column; gap: 16px;">
${faqsHTML}
</div>`;

content = content.replace(target, replacement);

fs.writeFileSync('src/content/blog/agentic-ai.md', content);
