<script setup lang="ts">
const lesollLogo = "/projects/lesoll-logo.png";
const modernAcademyLogo = "/projects/modern-academy.png";

const timeline = [
  {
    company: "Lesoll",
    role: "Software Engineer II",
    period: "2023 - 2026",
    logo: lesollLogo,
    logoWidth: 96,
    logoHeight: 96,
    desc: [
      "Leading backend development and architecture decisions for Lesoll and EgyStay, including system design, technology choices, and production operations.",
      "Built and maintained payment integrations with Paymob and Amazon Payment Services, handling around 10K transactions per month with webhook validation, idempotency, and reconciliation processes.",
      "Designed and implemented asynchronous workflows using BullMQ and Redis for notifications, emails, SMS, OTPs, and other background jobs.",
      "Worked on several core business modules including booking, cancellation policies, CoHost management, reporting, employee tools, and internal traffic intelligence systems built with Puppeteer.",
      "Deployed and managed applications on AWS using Docker, EC2, and EKS, while maintaining CI/CD pipelines with GitHub Actions and automated deployments.",
      "Collaborated closely with product and engineering teams to deliver new features, define technical solutions, and ensure platform reliability.",
    ],
    link: "https://lesoll.com",
    color: "bg-[var(--bp-blue)]",
  },
  {
    company: "Modern Academy (CS)",
    role: "B.S. Computer Science",
    period: "2018 - 2022",
    logo: modernAcademyLogo,
    logoWidth: 96,
    logoHeight: 43,
    desc: "Completed B.Sc. in Computing Web applications.",
    color: "bg-[var(--bp-blue-dim)]",
  },
  {
    company: ".md",
    role: "Founder",
    period: "2019 - Present",
    desc: "Freelance software projects built together with a friend from the academy.",
    color: "bg-[var(--bp-muted)]",
  },
];
</script>

<template>
  <div
    max-w-3xl
    mx-auto
    space-y-15
    p1
    text-[var(--bp-blue)]
    flex
    justify-center
    items-start
  >
    <div w-full p="4 md:10">
      <section class="animate-fade-in">
        <h2 text-2xl font-bold mb-8 text-[var(--bp-blue)] tracking-tight>
          Timeline
        </h2>

        <div class="flex flex-col gap-4">
          <div
            v-for="(item, i) in timeline"
            :key="i"
            class="timeline-item group relative flex gap-4"
          >
            <!-- Dot -->
            <div class="flex flex-col items-center">
              <span
                :class="[
                  'w-4 h-4 rounded-full mt-1 shrink-0 transition-all duration-300 group-hover:scale-125',
                  item.color,
                ]"
              >
                <span
                  :class="[
                    'absolute inset-0 w-4 h-4 rounded-full pulse-animation opacity-75',
                    item.color,
                  ]"
                ></span>
              </span>
              <div
                v-if="i < timeline.length - 1"
                class="w-px flex-1 bg-[var(--bp-line-soft)] mt-2"
              ></div>
            </div>

            <!-- Box card -->
            <div
              class="timeline-content flex-1 mb-4 p-4 rounded-xl backdrop-blur-sm bg-[rgba(var(--bp-line-rgb),0.06)] border border-[var(--bp-line-soft)] shadow-md transition-all duration-300 group-hover:shadow-xl"
            >
              <div class="flex flex-wrap items-start justify-between gap-1 mb-1">
                <h3 font-bold text-[var(--bp-blue)] class="flex items-center gap-2">
                  <img
                    v-if="item.logo"
                    :src="item.logo"
                    :alt="`${item.company} logo`"
                    :width="item.logoWidth"
                    :height="item.logoHeight"
                    loading="lazy"
                    decoding="async"
                    class="w-6 h-6 rounded-md object-contain shrink-0"
                  />
                  <a
                    v-if="item.link"
                    :href="item.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-[var(--bp-blue-dim)] transition-colors duration-200"
                    >{{ item.company }}</a
                  >
                  <span v-else>{{ item.company }}</span>
                </h3>
                <span class="text-xs font-medium text-[var(--bp-muted)]">{{
                  item.period
                }}</span>
              </div>

              <p italic text-sm text-[var(--bp-blue-dim)] mb-2>{{ item.role }}</p>

              <ul
                v-if="Array.isArray(item.desc)"
                class="list-disc pl-5 space-y-1 text-sm text-[var(--bp-blue-dim)] leading-relaxed"
              >
                <li v-for="(point, idx) in item.desc" :key="idx">{{ point }}</li>
              </ul>
              <p v-else class="text-sm text-[var(--bp-blue-dim)] leading-relaxed">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.timeline-item {
  animation: slideInLeft 0.6s ease-out backwards;
}

.timeline-item:nth-child(1) {
  animation-delay: 0.1s;
}
.timeline-item:nth-child(2) {
  animation-delay: 0.2s;
}
.timeline-item:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.timeline-item:hover .timeline-content {
  transform: translateX(8px);
}

.pulse-animation {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
