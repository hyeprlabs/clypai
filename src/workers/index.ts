import { Worker } from "bullmq";
import { getRedisConnection } from "@/lib/queue";
import { processVideoJob, type VideoProcessingData } from "@/jobs/video-processing";
import { processContactJob, type ContactJobData } from "@/jobs/contact";

const connection = getRedisConnection();

const videoWorker = new Worker<VideoProcessingData>(
  "video-processing",
  async (job) => {
    console.log(`[video-processing] Starting job ${job.id}: project ${job.data.projectId}`);
    await processVideoJob(job.data);
    console.log(`[video-processing] Completed job ${job.id}`);
  },
  { connection, concurrency: 2 },
);

const contactWorker = new Worker<ContactJobData>(
  "contact",
  async (job) => {
    console.log(`[contact] Starting job ${job.id}`);
    await processContactJob(job.data);
    console.log(`[contact] Completed job ${job.id}`);
  },
  { connection, concurrency: 5 },
);

videoWorker.on("failed", (job, err) => {
  console.error(`[video-processing] Job ${job?.id} failed:`, err.message);
});

contactWorker.on("failed", (job, err) => {
  console.error(`[contact] Job ${job?.id} failed:`, err.message);
});

console.log("Workers started: video-processing, contact");
