"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Loader2, Trash2, BookOpen, Lightbulb, Target, ChevronDown, ChevronUp } from "lucide-react";
import { getAllInterviewPreps, generateInterviewPrep, deleteInterviewPrep } from "@/app/services/interview/interview.service";
import toast from "react-hot-toast";

interface InterviewPrep {
  id: string;
  jobId: string;
  userId: string;
  questions: string[];
  tips: string[];
  topics: string[];
  difficulty: string;
  createdAt: string;
  updatedAt: string;
  job: {
    id: string;
    title: string;
    location: string;
    experienceLevel: string;
    category: {
      name: string;
    };
  };
}

export default function InterviewPrep() {
  const [preparations, setPreparations] = useState<InterviewPrep[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchPreparations();
  }, []);

  const fetchPreparations = async () => {
    try {
      const result = await getAllInterviewPreps();
      if (result?.success && result.data) {
        setPreparations(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch interview preparations:", error);
      toast.error("Failed to load interview preparations");
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePrep = async (jobId: string) => {
    setGenerating(true);
    try {
      const result = await generateInterviewPrep(jobId);
      if (result?.success) {
        toast.success("Interview preparation generated successfully!");
        await fetchPreparations();
      } else {
        toast.error(result?.message || "Failed to generate preparation");
      }
    } catch (error) {
      console.error("Failed to generate interview prep:", error);
      toast.error("Failed to generate interview preparation");
    } finally {
      setGenerating(false);
    }
  };

  const handleDeletePrep = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this interview preparation?")) {
      return;
    }

    try {
      const result = await deleteInterviewPrep(jobId);
      if (result?.success) {
        toast.success("Interview preparation deleted successfully!");
        await fetchPreparations();
      } else {
        toast.error(result?.message || "Failed to delete preparation");
      }
    } catch (error) {
      console.error("Failed to delete interview prep:", error);
      toast.error("Failed to delete interview preparation");
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Brain className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Interview Preparation</h1>
          <p className="text-sm text-gray-400 mt-1">
            AI-powered interview questions and tips for your job applications
          </p>
        </div>
      </div>

      {/* Preparations List */}
      {preparations.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 px-4 bg-white/2 border border-white/5 rounded-xl"
        >
          <Brain className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Interview Preparations Yet</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Apply for jobs and generate AI-powered interview preparation materials to help you succeed in your interviews.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {preparations.map((prep, index) => (
            <motion.div
              key={prep.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/2 border border-white/5 rounded-xl overflow-hidden hover:border-primary/20 transition-colors"
            >
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-1 truncate">
                      {prep.job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {prep.job.category.name}
                      </span>
                      <span>•</span>
                      <span>{prep.job.location}</span>
                      <span>•</span>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        {prep.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleExpand(prep.id)}
                      className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
                      title={expandedId === prep.id ? "Collapse" : "Expand"}
                    >
                      {expandedId === prep.id ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeletePrep(prep.jobId)}
                      className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                      title="Delete preparation"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedId === prep.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/5 p-6 space-y-6"
                >
                  {/* Questions Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold text-white">Interview Questions</h4>
                    </div>
                    <ul className="space-y-2">
                      {prep.questions.map((question, qIndex) => (
                        <li
                          key={qIndex}
                          className="flex items-start gap-3 p-3 bg-white/2 rounded-lg border border-white/5"
                        >
                          <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">
                            {qIndex + 1}
                          </span>
                          <span className="text-sm text-gray-300">{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tips Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="w-5 h-5 text-amber-400" />
                      <h4 className="font-semibold text-white">Preparation Tips</h4>
                    </div>
                    <ul className="space-y-2">
                      {prep.tips.map((tip, tIndex) => (
                        <li
                          key={tIndex}
                          className="flex items-start gap-3 p-3 bg-white/2 rounded-lg border border-white/5"
                        >
                          <span className="text-amber-400 mt-0.5">•</span>
                          <span className="text-sm text-gray-300">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Topics Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="w-5 h-5 text-green-400" />
                      <h4 className="font-semibold text-white">Key Topics to Study</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {prep.topics.map((topic, topicIndex) => (
                        <span
                          key={topicIndex}
                          className="px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}